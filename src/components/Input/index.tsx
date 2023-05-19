import React from 'react';
import { Input as RawInput } from 'antd';
import InputSelect from './Select';

const InputCheckbox = React.lazy(() => import('./Checkbox'));
const InputText = React.lazy(() => import('./Text'));
const InputTextArea = React.lazy(() => import('./TextArea'));
const InputDatePicker = React.lazy(() => import('./DatePicker'));
const InputTimePicker = React.lazy(() => import('./TimePicker'));
const InputEditor = React.lazy(() => import('./Editor'));

export interface InputComponent extends React.FC {
    Checkbox: typeof InputCheckbox,
    Text: typeof InputText,
    Select: typeof InputSelect,
    TextArea: typeof InputTextArea,
    Editor: typeof InputEditor,
    DatePicker: typeof InputDatePicker,
    TimePicker: typeof InputTimePicker,
    Group: typeof RawInput.Group
}

const Input: InputComponent = () => null

Input.Checkbox = InputCheckbox
Input.Text = InputText
Input.Select = InputSelect
Input.TextArea = InputTextArea
Input.Editor = InputEditor
Input.DatePicker = InputDatePicker
Input.TimePicker = InputTimePicker
Input.Group = RawInput.Group

export default Input