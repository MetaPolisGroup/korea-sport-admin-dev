import React from "react";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import Form, { Rule } from "antd/es/form";
import dayjs from "dayjs";

interface InputDatePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  rules?: Rule[];
  suffixIcon?: React.ReactNode;
  showTime?: boolean;
  disabledDate?: (currentDate: dayjs.Dayjs) => boolean;
  picker?: "date" | "week" | "month" | "quarter" | "year" | "time";
  onChange?: (value: dayjs.Dayjs | null, dateString: string) => void;
  disabled?: boolean;
  initialValue?: dayjs.Dayjs | null;
  defaultValue?: any;
}

export interface InputDatePickerComponent
  extends React.FC<InputDatePickerProps> {}

export const formatDate = "DD-MM-YYYY";
export const formatDateTime = "DD-MM-YYYY HH:mm:ss";
export const formatDateTimeDisplay = "Do MMMM YYYY, hh:mm:ss A";
export const formatTimeDisplay = "hh:mm A";

const InputDatePicker: InputDatePickerComponent = (props) => {
  const {
    label,
    name,
    placeholder,
    rules,
    disabledDate,
    suffixIcon,
    showTime,
    picker,
    initialValue,
    onChange,
    disabled,
    defaultValue,
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
    >
      <DatePicker
        suffixIcon={
          suffixIcon ??
          (showTime ? <ClockCircleOutlined /> : <CalendarOutlined />)
        }
        format={showTime ? formatDateTime : formatDate}
        placeholder={placeholder ?? (showTime ? "시간" : "날짜")}
        bordered={true}
        allowClear={false}
        disabledDate={disabledDate}
        showTime={showTime ?? false}
        picker={picker}
        onChange={onChange}
        disabled={disabled ?? false}
        defaultValue={defaultValue}
      />
    </Form.Item>
  );
};

export default InputDatePicker;
