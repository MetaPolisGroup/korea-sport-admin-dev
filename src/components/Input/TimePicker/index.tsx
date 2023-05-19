import React from 'react';
import {
    ClockCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import Form, { Rule } from 'antd/es/form';
import TimePicker from 'antd/es/time-picker';

interface InputTimePickerProps {
    label: string,
    name: string,
    placeholder?: string,
    rules?: Rule[],
    suffixIcon?: React.ReactNode,
    onChange?: (value: dayjs.Dayjs | null, dateString: string) => void,
    disabled?: boolean,
    initialValue?: string,
    style?: React.CSSProperties
}

export interface InputTimePickerComponent extends React.FC<InputTimePickerProps> { }

export const formatTime = 'HH:mm:ss'

const InputTimePicker: InputTimePickerComponent = props => {

    const {
        label,
        name,
        placeholder,
        rules,
        suffixIcon,
        onChange,
        disabled,
        initialValue,
        style
    } = props

    return <Form.Item
        name={name}
        label={label}
        rules={rules}
        initialValue={dayjs(parseInt(initialValue!))}
    >
        <TimePicker
            style={style}
            suffixIcon={suffixIcon ?? <ClockCircleOutlined />}
            format={formatTime}
            placeholder={placeholder ?? '시간을 선택하십시오'}
            bordered={true}
            allowClear={false}
            onChange={onChange}
            disabled={disabled ?? false} />
    </Form.Item>
}

export default InputTimePicker