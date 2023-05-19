import React from "react"
import Utils from "../../../../../utils";
import setting, { TGeneralFormData } from "../../../../../api/settingApi";
import { InputEditorRef } from "../../../../../components/Input/Editor";
import { TGeneral } from "../../BettingCancel/data";
import { Button, Form, Space, Switch } from "antd";
import Components from "../../../../../components";

interface IBettingSiteProps {
    data: TGeneral
}

const BettingSite: React.FC<IBettingSiteProps> = ({ data }) => {
    const [form] = Form.useForm<TGeneralFormData>();
    const [block, setBlock] = React.useState(data.ip_block ?? [{ id: 1, value: '' }])

    const editorRef = React.createRef<InputEditorRef>()

    const handleAddBlock = () => {
        const lastIndex = block.length > 0 ? block[block.length - 1].index : -1;
        const newBlock = [...block, { index: lastIndex + 1, value: '' }];
        setBlock(newBlock);
    };

    const handleSubmit = (value: TGeneralFormData) => {
        const ip = block.map((_, index) => (value[`ip${index}`]))
        setting.general({
            system_check: value.system_check,
            system_check_message: editorRef.current?.getValue().html!,
            ip_block: ip as string[],
            per_acc_issuance_message: value.per_acc_issuance_message
        }).then(i => {
            if (i)
                Utils.notification.success('성공')
            else
                Utils.notification.error('실패한')
        })
    }
    return <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item label="점검시 체크해주세요" valuePropName="checked" name='system_check' initialValue={data.system_check}>
            <Switch />
        </Form.Item>
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
            <h1 style={{ marginRight: 10 }}>차단 아이피</h1>
            <Button onClick={handleAddBlock}>+</Button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', height: 160, overflowY: 'scroll' }}>
            {block.map((data, index) => <BlockIPItem
                key={index}
                handleRemoveBlock={(idx) => {
                    const newBlock = block.filter((item) => item.index !== data.index);
                    const updatedBlock = newBlock.map((item, i) => ({
                        ...item,
                        index: i,
                    }));
                    setBlock(updatedBlock);
                }}
                data={data}
            />)}
        </div>
        <Components.Input.TextArea rules={[{ required: true, message: '이 학교는 입장해야합니다' }]}
            label="개인계좌 발급 메세지"
            initialValue={data.per_acc_issuance_message}
            name='per_acc_issuance_message' style={{ width: '100%', margin: '20px 0' }} />
        <label>점검 메세지 내용</label>
        <Components.Input.Editor key={Utils.newGuid()} ref={editorRef} label='' initialValue={data.system_check_message} />
        <Form.Item style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <Button htmlType="submit" type="primary">Send</Button>
        </Form.Item>
    </Form >
}

export default BettingSite

const BlockIPItem: React.FC<{
    handleRemoveBlock: (data: number) => void,
    data: {
        value: string;
        index: number;
    }
}> = ({ handleRemoveBlock, data }) => {
    return <Space align="center" style={{ margin: '5px 10px' }}>
        <Components.Input.Text
            name={'ip' + data.index}
            initialValue={data.value}
            rules={[
                { required: true, message: 'Please enter IP address' },
                {
                    pattern: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
                    message: 'Please enter a valid IP address',
                },
            ]}
        />
        <Button onClick={() => handleRemoveBlock(data.index)}>
            x
        </Button>
    </Space>
}