import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import Box from "../../../../components/Box";
import { IUser } from "../../../../features/auth";
import { PopupRef } from "../../../../components/Popup";
import Components from "../../../../components";
import { formatDateTime } from "../../../../components/Input/DatePicker";

const getColumns = (): ColumnsType<any> => {
    return [
        {
            title: "번호",
            align: "center",
            render: (_, data, index) => index + 1,
            defaultSortOrder: "descend",
            sorter: (a, b) => a.created_at - b.created_at,
        },
        {
            title: "은행명",
            align: "left",
            dataIndex: "",
            key: "",
            render: (_, data) => {
                return (
                    <Box<{ partner_id: string }>
                        id={data.user_id}
                        collectionName="users"
                        filters={[["id", "==", data.user_id]]}
                        render={(item) => {
                            return <div>{item?.partner_id}</div>;
                        }}
                    />
                );
            },
        },
        {
            title: "입금일자",
            align: "left",
            dataIndex: "",
            key: "",
            render: (user_id) => {
                return (
                    <Box<IUser>
                        id={user_id}
                        collectionName="users"
                        filters={[["id", "==", user_id]]}
                        render={(item) => {
                            const popupRef = React.createRef<PopupRef>();
                            return (
                                <Components.Popup
                                    ref={popupRef}
                                    footer
                                    width={1300}
                                    title={"유저 " + item?.id}
                                    content={
                                        <Components.Member
                                            user={item as IUser}
                                            popupRef={popupRef}
                                        />
                                    }
                                    selector={
                                        <Tag
                                            style={{ cursor: "pointer" }}
                                            onClick={() => popupRef.current?.open()}
                                        >
                                            {item?.id}
                                        </Tag>
                                    }
                                />
                            );
                        }}
                    />
                );
            },
        },
        {
            title: "계좌",
            dataIndex: "",
            key: "",
            align: "center",
        },
        {
            title: "입금자명",
            dataIndex: "",
            key: "",
            align: "center",
        },
        {
            title: "입금액",
            dataIndex: "",
            key: "",
            align: "center",
        },
        {
            title: "통장잔액",
            dataIndex: "",
            key: "",
            align: "center",
        },
        {
            title: "처리결과",
            dataIndex: "",
            key: "",
            align: "center",
            render: (note) => <p>{note ?? '--'}</p>
        },
        {
            title: "처리",
            dataIndex: "",
            key: "",
            align: "left",
            render: (created_at) => {
                const date = dayjs(created_at).format(formatDateTime);
                return <span>{date}</span>;
            },
        },
    ];
};
export { getColumns };