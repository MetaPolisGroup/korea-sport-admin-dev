import React from "react";
import Form, { Rule } from "antd/es/form";
import { SizeType } from "antd/es/config-provider/SizeContext";
import Input, { InputProps, InputRef, } from "antd/es/input";
import TypedInputNumber, { InputNumberProps } from "antd/es/input-number";

type InputTextProps = InputProps & InputNumberProps & {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "tel" | "color" | "password";
  size?: SizeType;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  hidden?: boolean;
  rules?: Rule[];
  className?: string;
  style?: React.CSSProperties;
  styleForm?: React.CSSProperties;
  value?: string | ReadonlyArray<string> | number | undefined;
  initialValue?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  readOnly?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
}

const InputTextRender: React.ForwardRefRenderFunction<
  InputRef,
  InputTextProps
> = (props, ref) => {
  const {
    label,
    name,
    placeholder,
    rules,
    className,
    type,
    size,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    hidden,
    style,
    styleForm,
    value,
    initialValue,
    onChange,
    readOnly,
    disabled,
    min,
    max,
    showCount,
    formatter,
    parser
  } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      hidden={hidden}
      rules={rules}
      style={styleForm}
      initialValue={initialValue}
    >
      {type === 'number'
        ? <TypedInputNumber
          type='text'
          size={size}
          formatter={formatter}
          parser={parser}
          prefix={prefix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          placeholder={placeholder}
          style={{ ...style, }}
          className={className}
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
        />
        : <Input
          showCount={showCount}
          ref={ref}
          type={type}
          size={size}
          prefix={prefix}
          suffix={suffix}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          placeholder={placeholder}
          style={style}
          className={className}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
        />
      }
    </Form.Item>
  );
};

const InputText = React.forwardRef<InputRef, InputTextProps>(InputTextRender);

export default InputText;
