import { Button, Form, FormInstance } from "antd";
import React from "react";
import setting, { TValueSetting } from "../../../../api/settingApi";
import Components from "../../../../components";
import Utils from "../../../../utils";

interface ISelectItem {
  bettingCancelRefund: TValueSetting[];
}

const handleSubmit = (
  values: TValueSetting,
  bettingCancelRefund: TValueSetting[]
) => {
  const data = bettingCancelRefund.map((_, index) => ({
    time: values[`time${index}`] ? values[`time${index}`] : 0,
    value: values[`value${index}`],
  }));
  setting.bettingCancelRefund(data).then((i) => {
    if (i) return Utils.notification.success("성공");
    Utils.notification.error("실패한");
  });
};

const SelectItem: React.FC<ISelectItem> = (props) => {
  const { bettingCancelRefund } = props;
  const [form] = Form.useForm();

  return (
    bettingCancelRefund && (
      <Form form={form} onFinish={(e: TValueSetting) => handleSubmit(e, bettingCancelRefund)}>
        <div style={{ display: "flex", gap: 20, margin: "50px 0" }}>
          {bettingCancelRefund.map((_, index) => (
            <SelectOption
              key={index}
              index={index}
              isFirst={index === 0}
              form={form}
              bettingCancelRefund={bettingCancelRefund}
            />
          ))}
        </div>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "0.5px solid gray",
            paddingTop: 50,
          }}
        >
          <Button htmlType="submit">저장</Button>
        </Form.Item>
      </Form>
    )
  );
};

export default SelectItem;

const SelectOption: React.FC<{
  isFirst?: boolean;
  index: number;
  form: FormInstance<TValueSetting>;
  bettingCancelRefund: TValueSetting[];
}> = ({ isFirst, index, form, bettingCancelRefund }) => {
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "column",
        display: "flex",
        gap: 20,
      }}
    >
      <Components.Input.Select
        style={{ width: 100 }}
        name={"time" + index}
        placeholder="Date"
        initialValue={bettingCancelRefund[index].time}
        disabled={isFirst}
        data={Array(13)
          .fill(0)
          .map((_, index) => ({
            text: isFirst ? "0" : index * 5 + "분 후",
            value: isFirst ? 0 : index * 5,
            key: isFirst ? 0 : index * 5,
          }))}
        label=""
        rules={[
          {
            validator: (_, value) => {
              if (index === 1) {
                return Promise.resolve();
              }
              const previousValue = !isFirst
                ? form.getFieldValue(`time${index - 1}`)
                : undefined;
              if (previousValue && previousValue < value) {
                return Promise.resolve();
              }
              return isFirst
                ? Promise.resolve()
                : Promise.reject("시간은 이전 시간보다 커야합니다");
            },
          },
        ]}
      />

      <Components.Input.Select
        style={{ width: "100%" }}
        placeholder="여기에 입력"
        name={"value" + index}
        initialValue={bettingCancelRefund[index].value}
        rules={[
          {
            validator: (_, value) => {
              if (index === 0) {
                return Promise.resolve();
              }
              const previousValue = form.getFieldValue(`value${index - 1}`);
              if (previousValue > value) {
                return Promise.resolve();
              }
              return Promise.reject("값은 이전 값보다 작아야합니다");
            },
          },
        ]}
        data={Array(11)
          .fill(0)
          .map((_, index) => ({
            text:
              index !== 10
                ? (10 - index) * 10 + "% 환불하다"
                : "취소 할 수 없습니다",
            value: index !== 10 ? (10 - index) * 10 : 0,
            key: index !== 10 ? (10 - index) * 10 : 0,
          }))}
        label=""
      />
    </div>
  );
};
