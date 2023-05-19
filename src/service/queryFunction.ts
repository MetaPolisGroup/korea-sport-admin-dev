import { WhereFilterOp } from "@firebase/firestore-types";
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
    QueryConstraint,
    DocumentData,
    onSnapshot,
    Unsubscribe,
    collectionGroup,
} from "firebase/firestore";
import { db } from "../db/db-config";
export const queryBuilderFunc = async (
    nameCollection: string,
    filters: [string, WhereFilterOp, string | number | boolean][],
    orderByFields?: { field?: string, direction?: 'asc' | 'desc' }[],
    limitNumber?: number,
    onSnapshotCallback?: (docs: DocumentData[]) => void,
    subCollectionName?: string | null,
) => {
    const collectionRef = subCollectionName
        ? collection(db, nameCollection, subCollectionName)
        : collection(db, nameCollection)

    const queryFilters = filters.reduce((acc: QueryConstraint[], [field, operator, conditional]) => {
        acc.push(where(field, operator, conditional));
        return acc;
    }, []);

    if (orderByFields && orderByFields[0].direction) {

        orderByFields.forEach((orderByField) => {
            queryFilters.push(orderBy(orderByField.field!, orderByField.direction));
        });
    }
    if (limitNumber) {
        queryFilters.push(limit(limitNumber))
    }

    let unsubscribe: Unsubscribe | undefined | DocumentData[];

    if (onSnapshotCallback) {

        unsubscribe = onSnapshot(query(collectionRef, ...queryFilters), (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data())
            onSnapshotCallback(data)
        })
    } else {
        const querySnapshot = await getDocs(query(collectionRef, ...queryFilters));
        unsubscribe = querySnapshot.docs.map((doc) => {
            return doc.data()
        });
    }

    return unsubscribe
};

export const getDataCollectionGroup = async (
    collectionA: string,
    collectionB: string,
    filters?: [string, WhereFilterOp, any][],
    onChange?: (data: any[]) => void
) => {
    const collectionAQuery = collection(db, collectionA);

    // Create an array of QueryConstraint objects based on the `filters` array
    const queryConstraints = filters?.map(([field, operator, value]) => where(field, operator, value)) ?? [];

    const collectionASnapshot = await getDocs(query(collectionAQuery, ...queryConstraints));

    const collectionBQuery = query(collectionGroup(db, collectionB), orderBy('created_at', 'asc'));

    const collectionBUnsubscribe = onSnapshot(collectionBQuery, (snapshot) => {
        const result: any[] = [];
        collectionASnapshot.forEach((doc) => {
            const data = doc.data();
            const subCollectionDocs = snapshot.docs.filter((subDoc) => subDoc.ref.parent.parent?.id === doc.id);
            result.push({
                id: doc.id,
                ...data,
                collectionBData: subCollectionDocs.map((subDoc) => ({ id: subDoc.id, ...subDoc.data() })),
            });
        });
        onChange && onChange(result);
    });
    return () => {
        collectionBUnsubscribe();
    };
};


export const getAllDocuments = async (
    nameCollection: string,
    onSnapshotCallback?: (docs: DocumentData[]) => void,
    callback?: (isLoading: boolean) => void
) => {
    const collectionRef = collection(db, nameCollection);
    let unsubscribe: DocumentData;
    callback?.(true)
    if (onSnapshotCallback) {
        unsubscribe = onSnapshot(query(collectionRef), (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data())
            onSnapshotCallback(data)
            callback?.(false)
        });
    } else {
        const querySnapshot = await getDocs(collectionRef);
        unsubscribe = querySnapshot.docs.map((doc) => {
            callback?.(false)
            return doc.data()
        });
    }
    callback?.(false)
    return unsubscribe;
};