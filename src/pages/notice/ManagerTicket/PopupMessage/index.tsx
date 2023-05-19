import React from 'react'
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Space, Tag } from "antd";
import { ICollectionB, IGetColumnsTicket } from "..";
import customer from "../../../../api/custommerApi";
import Popup, { PopupConfirm, PopupRef } from "../../../../components/Popup";
import Utils from "../../../../utils";
import { getDataCollectionGroup } from '../../../../service/queryFunction';
import './index.scss'

interface IPopupMessage {
    data: IGetColumnsTicket
    form: FormInstance<any>,
    id: string,
}

const PopupMessage: React.FC<IPopupMessage> = (props) => {
    const { data, form, id } = props
    const btDeleteRef = React.createRef<PopupRef>();
    const btReplyRef = React.createRef<PopupRef>();
    const [message, setMessage] = React.useState<IGetColumnsTicket[]>([]);
    React.useEffect(() => {
        (async () => {
            await getDataCollectionGroup('tickets', 'messages', [
                ["type", "==", "Support"],
                ["delete", "==", false],
            ], (result) => {
                setMessage(result)
            });
        })()
    }, [])

    return (
        <div style={{ display: "flex", gap: 10 }}>
            <Popup
                title={"Reply " + data.title}
                ref={btReplyRef}
                width={600}
                footer
                selector={
                    <Button
                        type="text"
                        onClick={() => btReplyRef.current?.open()}
                    >
                        피드백
                    </Button>
                }
                content={
                    message.length > 0 ?
                        <div className="box-mes" key={Utils.newGuid()}>
                            {message?.map((a, idx) => {
                                return a.collectionBData?.map((b: ICollectionB, index: number) =>
                                    a.id === data.id && (
                                        <Messages key={index} message={b} />
                                    )
                                )
                            })}
                            <Form
                                onFinish={(value: { content: string }) => {
                                    customer
                                        .replyTicket({
                                            content: value.content,
                                            admin_id: id,
                                            ticket_id: data.id,
                                        })
                                        .then((i) => {
                                            if (i) Utils.notification.success("성공");
                                            else Utils.notification.error("실패한");
                                        });
                                    form.resetFields();
                                }}
                                form={form}
                                layout="vertical"
                            >
                                <Space className="boxInput">
                                    <Form.Item
                                        name="content"
                                        rules={[
                                            {
                                                required: true,
                                                message: "내용이 필요합니다",
                                            },
                                            { type: "string" },
                                            {
                                                type: "string",
                                                min: 20,
                                                max: 200,
                                                message: "20 자 이상의 필수 작문",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="입력 자리 표시 자" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            보내다
                                        </Button>
                                    </Form.Item>
                                </Space>
                            </Form>
                        </div>
                        : <p>Failed</p>
                }
            />
            <PopupConfirm
                onSubmit={() =>
                    customer
                        .closed({ admin_id: id, ticket_id: data.id })
                        .then((i) => {
                            if (i) Utils.notification.success("성공");
                            else Utils.notification.error("실패한");
                        })
                }
                ref={btDeleteRef}
                selector={
                    <Button
                        type="primary"
                        danger
                        onClick={() => btDeleteRef.current?.open()}
                    >
                        <CloseOutlined />
                    </Button>
                }
                title="Delete"
                content={"삭제를 원하십니까 " + data.title ?? ""}
            />
        </div>
    )
}

export default PopupMessage


interface IMessagesProps {
    message: ICollectionB;
}

const Messages: React.FC<IMessagesProps> = (props) => {
    const { message } = props;
    if (message?.sender_id?.includes("admin")) {
        return (
            <div className="message-admin">
                <div>
                    <p>{message.content}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="message-user">
            <div>
                <strong>{message.name}:</strong> {message.content}
            </div>
        </div>
    );
};
