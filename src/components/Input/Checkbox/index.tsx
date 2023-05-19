import React from 'react';
import Form, { Rule } from 'antd/es/form';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

interface InputCheckboxProps {
    label?: string,
    rules?: Rule[],
    name?: string,
    initialValue?: any,
    style?: React.CSSProperties,
    onChange?: ((e: boolean) => void) | undefined
}

export interface InputCheckboxComponent extends React.FC<InputCheckboxProps> { }

const InputCheckbox: InputCheckboxComponent = props => {

    const {
        label,
        rules,
        name,
        initialValue,
        style,
        onChange
    } = props

    return <Form.Item
        name={name}
        rules={rules}
        style={style}
        initialValue={initialValue}
        valuePropName='checked'>
        <Checkbox onChange={e => onChange?.(e.target.checked)}>{label}</Checkbox>
    </Form.Item>
}

export default InputCheckbox