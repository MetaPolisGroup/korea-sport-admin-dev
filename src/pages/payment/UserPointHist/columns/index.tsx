import { Button, FormInstance, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import Box from "../../../../components/Box";
import { IUser } from "../../../../features/auth";
import { PopupRef } from "../../../../components/Popup";
import Components from "../../../../components";
import Utils from "../../../../utils";
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
            title: "소속",
            align: "left",
            dataIndex: "partner_id",
            key: "partner_id",
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
            title: "아이디",
            align: "left",
            dataIndex: "user_id",
            key: "user_id",
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
            title: "구분",
            dataIndex: "division",
            key: "division",
            align: "center",
        },
        {
            title: "이전포인트",
            dataIndex: "before_point",
            key: "before_point",
            align: "center",
        },
        {
            title: "변동포인트",
            dataIndex: "transaction_point",
            key: "transaction_point",
            align: "center",
        },
        {
            title: "이후포인트",
            dataIndex: "after_point",
            key: "after_point",
            align: "center",
        },
        {
            title: "비고",
            dataIndex: "note",
            key: "note",
            align: "center",
            render: (note) => <p>{note ?? '--'}</p>
        },
        {
            title: "생성일",
            dataIndex: "created_at",
            key: "created_at",
            align: "left",
            render: (created_at) => {
                const date = dayjs(created_at).format(formatDateTime);
                return <span>{date}</span>;
            },
        },
    ];
};
export { getColumns };