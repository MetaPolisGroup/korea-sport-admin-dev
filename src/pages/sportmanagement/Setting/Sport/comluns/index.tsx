import { Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import { FormInstance } from "rc-field-form/lib/interface"
import React from "react"
import noticeApi, { IResponseSportSetting } from "../../../../../api/noticeApi"
import Input from "../../../../../components/Input"
import { PopupConfirm, PopupRef } from "../../../../../components/Popup"
import Utils from "../../../../../utils"

const getColumns = (
    form: FormInstance
): ColumnsType<IResponseSportSetting> => {

    return [
        {
            title: '번호',
            align: 'center',
            defaultSortOrder: 'ascend',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (_, data, idx) => <Input.Text name={'id' + idx} initialValue={data.id} />
        },
        {
            title: '영문명',
            align: 'left',
            dataIndex: 'name',
            key: 'name',
            render: (_, data, idx) => <Input.Text name={'name' + idx} initialValue={data.name} />
        },
        {
            title: '한글명',
            align: 'left',
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
                            noticeApi.EditSport({ id: data.id, name: i[field] }).then(u => {
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
