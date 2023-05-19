import React from 'react';
import { DocumentData, WhereFilterOp } from 'firebase/firestore';
import { queryBuilderFunc, getDataCollectionGroup } from '../../service/queryFunction';

export interface IdBoxData<T> {
    id: string | number;
    data?: T;
}

interface IdBoxProps<T> {
    id: string | number | undefined;
    collectionName?: string;
    subCollectionName?: string;
    filters?: [string, WhereFilterOp, string | number | boolean][];
    orderByField?: string;
    orderByDirection?: 'asc' | 'desc';
    limitNumber?: number;
    onReceivedData?: (data: DocumentData | T | undefined) => void;
    map?: (value: DocumentData | T) => void;
    render: (value: DocumentData | T) => React.ReactElement | null;
    isCollectionGroup?: boolean;
    fieldsId?: boolean;
    fieldsName?: string
}

const Box = <T,>(
    props: IdBoxProps<T>
): React.ReactElement | null => {
    const { onReceivedData, render, id, collectionName } = props;
    const getData = React.useCallback(async () => {
        const data = await get(props);
        onReceivedData?.(data);
        setData(data);
    }, [onReceivedData, props]);

    const [data, setData] = React.useState<DocumentData | T | undefined>(() => {
        const box = idBoxDatas.find((a) => a.id === props.id);
        return box?.data;
    });

    React.useEffect(() => {
        getData();
    }, [getData]);

    return React.useMemo(() => {
        return render(data!);
    }, [data, render]);
};

async function get<T>(
    props: IdBoxProps<T>
): Promise<DocumentData | T | undefined> {
    const {
        id,
        collectionName,
        filters,
        orderByField,
        orderByDirection,
        limitNumber,
        map,
        subCollectionName,
        isCollectionGroup,
        fieldsId,
        fieldsName
    } = props;

    if (!id || !collectionName) return;

    let box = idBoxDatas.find((a) => a.id === id);
    if (box) {

        if (box.data) {
            return box.data;
        }
        const waitPromise = new Promise((resolve) =>
            setTimeout(() => resolve(null), 200)
        );
        await Promise.race([waitPromise]);
        return get(props);
    }
    box = { id };
    idBoxDatas.push(box);
    let data: any;
    if (isCollectionGroup) {
        data = await getDataCollectionGroup(collectionName, subCollectionName!, props.filters, async (result) => {
            if (props.onReceivedData) {
                props.onReceivedData(result);
                props.render(result)
            }
        });
    } else {
        data = await queryBuilderFunc(
            collectionName,
            filters || [],
            [{
                field: orderByField,
                direction: orderByDirection,
            }],
            limitNumber,
            undefined,
            subCollectionName
        );
    }

    const matchedData = handleData(data, id, fieldsId,fieldsName)

    if (matchedData) {
        if (map) {
            map?.(matchedData)
        };
        box.data = matchedData;
        return matchedData;
    }
}
const idBoxDatas: IdBoxData<DocumentData>[] = [];
const handleData = <T,>(data: T, id: string | number, fieldsId?: boolean, fieldName?: string) => {
    return Array.isArray(data) ? fieldsId ? data.filter((d: any) => d.user_id === id) : fieldName ? data.find((d: any) => d[fieldName] === id) : data.find((d: any) => d.id === id) : undefined;
}
export default Box;
