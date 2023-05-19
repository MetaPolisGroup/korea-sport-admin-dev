import { Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import { FormInstance } from "rc-field-form/lib/interface"
import React from "react"
import noticeApi, { IResponseSportSetting } from "../../../../../api/noticeApi"
import Input from "../../../../../components/Input"
import { PopupConfirm, PopupRef } from "../../../../../components/Popup"
import Utils from "../../../../../utils"

const getColumns = (
    form: FormInstance,
    page: string,
): ColumnsType<IResponseSportSetting> => {
    return [
        {
            title: '번호',
            align: 'center',
            width: 150,
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: page !== 'nation' && '종목',
            width: page === 'nation' ? 0 : 150,
            dataIndex: 'sport_id',
            key: 'sport_id',
            render: (sport) => {
                return <p>{Utils.renderSport(sport)}</p>
            }
        },
        {
            title: '원본명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '표시 이름',
            dataIndex: 'korean_name',
            key: 'korean_name',
            render: (_, data, idx) => <Input.Text name={'korean_name' + idx} initialValue={data.korean_name} />
        },
        {
            width: 100,
            render: (_, data, idx) => {
                const btAcepeRef = React.createRef<PopupRef>();
                const field = 'korean_name' + idx
                return <PopupConfirm
                    onSubmit={() => {
                        form.validateFields().then(i => {
                            noticeApi.EditSetting({ id: data.id, name: i[field], page }).then(u => {
                                if (u)
                                    Utils.notification.success('성공')
                                else
                                    Utils.notification.error('실패한')
                            })
                        })
                    }}
                    ref={btAcepeRef}
                    selector={
                        <Button
                            type="primary"
                            onClick={() => btAcepeRef.current?.open()}
                        >
                            저장
                        </Button>
                    }
                    title="승인"
                    content={"당신이 원하십니까 승인"}
                />
            }
        }
    ]
}
export { getColumns }
