import { Form, Switch } from "antd";
import dayjs from "dayjs";
import React from "react";
import Components from "../../../../components";
import { InputEditorRef } from "../../../../components/Input/Editor";

interface IFormProps {
  isPopup?: boolean;
  data?: any;
}

export interface IFormData {
  title: string;
  content: string;
  status: boolean;
  display?: string; // 'Before', 'After', 'Both'
  display_start?: number;
  display_end?: number;
}

const FormPopup: React.ForwardRefRenderFunction<any, IFormProps> = (
  props,
  ref
) => {
  const [form] = Form.useForm<IFormData>();
  const { isPopup, data } = props;
  const editorRef = React.createRef<InputEditorRef>();

  React.useImperativeHandle(ref, () => ({
    onSubmit: function handleSubmit<IFormData>(
      onFinish: (value?: IFormData) => void
    ) {
      form.validateFields().then((value: any) => {
        onFinish({
          title: value.title,
          content: editorRef.current?.getValue().html,
          status: value.status,
          display: value.display,
          display_start: value?.display_start,
          display_end: value?.display_end,
        } as IFormData);
      });
    },
  }));

  return (
    <Form form={form}>
      {isPopup && (
        <React.Fragment>
          <Components.Input.Select
            label="로그인전 표시"
            name="display"
            initialValue={data?.display}
            data={Array(3)
              .fill(0)
              .map((_, idx) => ({
                key: idx === 0 ? "Before" : idx === 1 ? "After" : "Both",
                value: idx === 0 ? "Before" : idx === 1 ? "After" : "Both",
                text:
                  idx === 0
                    ? "로그인 전에만 표시"
                    : idx === 1
                    ? "로그인 후에만 표시"
                    : "로그인 전/후 표시",
              }))}
            rules={[
              {
                message: "제목은 비워둘 수 없습니다.",
                required: true,
              },
            ]}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Components.Input.DatePicker
              label="시작일시"
              name="display_start"
              initialValue={dayjs.unix(data?.display_start!) ?? ""}
            />
            <Components.Input.DatePicker
              label="종료일시"
              name="display_end"
              initialValue={dayjs.unix(data?.display_end!) ?? ""}
            />
          </div>
        </React.Fragment>
      )}
      <Components.Input.Text
        label="등록자"
        initialValue={data?.title}
        name="registrant"
        rules={[
          {
            message: "제목은 비워둘 수 없습니다.",
            required: true,
          },
          { whitespace: true, message: "그렇게 입력하지 마십시오" },
        ]}
      />
      <div style={{ width: "100%" }}>
        <Components.Input.DatePicker
          label="작성시각"
          name="date"
          rules={[
            {
              message: "제목은 비워둘 수 없습니다.",
              required: true,
            },
            { whitespace: true, message: "그렇게 입력하지 마십시오" },
          ]}
        />
      </div>

      <Components.Input.Text
        label="제목"
        initialValue={data?.title}
        name="title"
        rules={[
          {
            message: "제목은 비워둘 수 없습니다.",
            required: true,
          },
          { whitespace: true, message: "그렇게 입력하지 마십시오" },
        ]}
      />

      <Components.Input.Editor
        ref={editorRef}
        label="내용"
        initialValue={data?.content}
      />
    </Form>
  );
};
const FormPopupInfo = React.forwardRef<any, IFormProps>(FormPopup);
export default FormPopupInfo;
