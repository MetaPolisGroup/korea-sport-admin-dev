import { Button, FormInstance, Space, Tag, Typography } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import React from "react"
import ReactHtmlParser from 'react-html-parser'
import noticeApi, { CreatingFormRef, IData } from "../../../api/noticeApi"
import { formatDateTime } from "../../../components/Input/DatePicker"
import { PopupConfirm, PopupRef } from "../../../components/Popup"
import FormPopupInfo, { IFormData } from "../FormPopup/content"
import Utils from "../../../utils"

const getColumns = (
    form: FormInstance<any>,
    id: string,
    isPopup?: boolean
): ColumnsType<IData> => {

    return [
        {
            title: '번호',
            align: 'center',
            width: 100,
            render: (_, data, index) => index + 1,
        },
        {
            title: '등록자',
            align: 'left',
            dataIndex: 'registrant',
            key: 'registrant',
            render: (registrant) => <p>{registrant ?? '---'}</p>

        },
        {
            title: '제목',
            align: 'left',
            dataIndex: 'title',
            key: 'title',
            render: (title) => <Typography.Paragraph
                ellipsis={{ rows: 2, tooltip: `${title}` }}
            >
                {title ?? '---'}
            </Typography.Paragraph>
        },
        {
            title: '콘텐츠',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
            render: (content) => ReactHtmlParser(content) ?? '---'
        },
        {
            title: '날짜',
            dataIndex: 'created_at',
            key: 'created_at',
            align: 'left',
            render: (data) => <p>{dayjs(data).format(formatDateTime) ?? '---'}</p>
        },
        {
            title: '등록자',
            align: 'left',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color
                let text
                switch (status) {
                    case 'Active':
                        color = '#87d068'
                        text = '활동적인'
                        break;
                    case 'Inactive':
                        color = '#f50'
                        text = '비활성'
                        break
                    default:
                        break;
                }
                return <Tag color={color}>{text ?? status ?? '---'}</Tag>
            }
        },
        {
            fixed: 'right',
            align: 'center',
            width: 180,
            render: (_, data) => {
                const btnEditRef = React.createRef<PopupRef>()
                const btDeleteRef = React.createRef<PopupRef>()
                const infoFormRef = React.createRef<CreatingFormRef>()
                return <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <PopupConfirm
                        ref={btnEditRef}
                        width={700}
                        onSubmit={() => {
                            infoFormRef.current
                                ?.onSubmit<IFormData>((value) => {
                                    if (value)
                                        noticeApi.Edit({
                                            status: !value.status ? 'Active' : 'Inactive',
                                            content: value.content,
                                            title: value.title,
                                            registrant: id!,
                                            type: data.type,
                                            id: data.id
                                        }).then(i => {
                                            if (i)
                                                undefined

                                            btnEditRef.current?.close()
                                            Utils.notification.success('성공')
                                        })

                                })
                        }}
                        selector={<Button type="primary" onClick={() => btnEditRef.current?.open()}>
                            수정
                        </Button>}
                        title={'수정 ' + data.title}
                        content={<FormPopupInfo ref={infoFormRef} isPopup={isPopup} data={data} />}

                    />
                    <PopupConfirm
                        onSubmit={() => noticeApi.Delete(data.id).then(i => {
                            if (i)
                                Utils.notification.success('성공')
                            else Utils.notification.error('실패한')
                        })}
                        ref={btDeleteRef}
                        selector={<Button type="primary" danger onClick={() => btDeleteRef.current?.open()}>
                            삭제
                        </Button>}
                        title='삭제'
                        content={'삭제를 원하십니까  ' + data.title ?? ''}
                    />
                </Space>
            }
        }
    ]
}
export { getColumns }
