import React from 'react';
import Form, { Rule } from 'antd/es/form';
import Input from 'antd/es/input';

interface AreaProps {
    row?: number,
    label?: string
    style?: React.CSSProperties
    rules?: Rule[]
    name?: string
    placeholder?: string
    initialValue?: string,
    autoSize?: boolean,
    onClick?: () => void,
    autoFocus?: boolean
}

export interface AreaComponent extends React.FC<AreaProps> {
    TextArea: typeof Input.TextArea
}

const InputArea: AreaComponent = props => {

    const {
        row,
        label,
        style,
        rules,
        name,
        placeholder,
        initialValue,
        autoSize,
        onClick,
        autoFocus
    } = props

    return <Form.Item
        label={label}
        name={name}
        initialValue={initialValue}
        rules={rules}
        style={style}>
        <Input.TextArea
            autoSize={autoSize}
            placeholder={placeholder}
            onClick={onClick}
            autoFocus={autoFocus}>
            {label}
        </Input.TextArea>
    </Form.Item>
}

InputArea.TextArea = Input.TextArea

export default InputArea