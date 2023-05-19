import React from "react";
import Form, { Rule, FormItemProps } from "antd/es/form";
import debounce from "lodash.debounce";
import Loading from "../../Loading";
import Select from "antd/es/select";

export interface IData {
  key?: string | number | boolean;
  text?: string;
  value?: string | number | boolean;
}

export type InputSelectProps = FormItemProps & {
  label: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: Rule[];
  name?: string;
  data?: IData[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showSearch?: boolean;
  onSearch?: (search: string) => void;
  searchDebounce?: boolean;
  autoFocus?: boolean;
  mode?: "multiple" | "tags" | undefined;
  initialValue?: any;
  onChange?: (value: any) => void;
  showArrow?: boolean;
  disabled?: boolean;
  loading?: boolean;
  renderDropdown?: (menu: React.ReactElement) => React.ReactElement;
  renderOption?: (option: IData, index: number) => React.ReactNode;
  dropdownContainerId?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  className?: string;
  defaultValue?: string | number;
};

export interface InputComponent extends React.FC<InputSelectProps> {
  Option: typeof Select.Option;
  OptGroup: typeof Select.OptGroup;
}

const InputSelect: InputComponent = ({
  data,
  mode,
  label,
  placeholder,
  rules,
  initialValue,
  style,
  name,
  open,
  onOpenChange,
  showSearch,
  onSearch,
  searchDebounce = true,
  autoFocus,
  onChange,
  showArrow,
  disabled,
  loading,
  renderDropdown,
  renderOption,
  dropdownContainerId,
  onKeyDown,
  className,
  defaultValue,
  ...props
}) => {
  const dropdownContainer = dropdownContainerId
    ? document.getElementById(dropdownContainerId)
    : undefined;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={initialValue}
      className={className}
      {...props}
    >
      <Select
        onKeyDown={onKeyDown}
        disabled={disabled}
        mode={mode}
        open={open}
        onDropdownVisibleChange={onOpenChange}
        showSearch={showSearch}
        onSearch={
          showSearch
            ? (value) => {
                if (onSearch) {
                  if (searchDebounce) debounceSearch(value, onSearch);
                  else onSearch(value);
                }
              }
            : undefined
        }
        autoFocus={autoFocus}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
        showArrow={showArrow}
        loading={loading}
        notFoundContent={loading ? <Loading /> : null}
        filterOption={onSearch === undefined}
        dropdownRender={renderDropdown}
        getPopupContainer={
          dropdownContainer ? () => dropdownContainer : undefined
        }
        defaultValue={defaultValue}
      >
        {data?.map((item, index) => {
          if (renderOption) return renderOption(item, index);

          const value = item.key ?? item.value;
          const display = item.text ?? value;

          return (
            <Select.Option
              key={item.value + "|" + item.key + "|" + index}
              value={value}
            >
              {display}
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

const debounceSearch = debounce(
  (search: string, onSearch?: (search: string) => void) => {
    onSearch?.(search);
  },
  650
);

InputSelect.Option = Select.Option;
InputSelect.OptGroup = Select.OptGroup;

export default InputSelect;
