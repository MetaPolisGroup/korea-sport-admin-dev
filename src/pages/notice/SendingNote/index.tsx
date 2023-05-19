import React from "react";

import "./sendingNote.scss";
import { Form, Button, FormInstance, Radio } from "antd";
import Components from "../../../components";
import noticeApi, { IData, ISendingNoteReq } from "../../../api/noticeApi";
import {
  getAllDocuments,
  queryBuilderFunc,
} from "../../../service/queryFunction";
import Utils from "../../../utils";

import dayjs from "dayjs";
import type { RadioChangeEvent } from "antd";
import { useAppSelector } from "../../../app/hook";

interface TProps {
  mode?: string;
  onCloseModal?: () => void;
  dataDefault?: any;
}

type TUser = {
  id: string;
  nickname: string;
};

const SendingNote: React.FC<TProps> = (props) => {
  const [datas, setDatas] = React.useState<IData[]>([]);
  const [form] = Form.useForm<ISendingNoteReq>();
  const [template, setTemplate] = React.useState<
    { title: string; type: string }[]
  >([]);
  const [user, setUser] = React.useState<TUser[]>([]);
  const [isDate, setIsDate] = React.useState(false);
  const [sendType, setSendType] = React.useState<string>(
    props?.dataDefault?.send_type ?? "Level"
  );
  const { id } = useAppSelector((state) => state.auth.auth);
  const LIST_BTN = [
    {
      id: "Level",
      title: "레벨별 발송",
      action: (id: string, form: FormInstance) => handleSubmit(id, form),
    },

    {
      id: "Selected users",
      title: "선택유저 발송",
      action: (id: string, form: FormInstance) => handleSubmit(id, form),
    },
    {
      id: "All users",
      title: "전체 유저 발송",
      action: (id: string, form: FormInstance) => handleSubmit(id, form),
    },
  ];

  React.useEffect(() => {
    (async () => {
      queryBuilderFunc(
        "notifications",
        [
          ["type", "==", "Template"],
          ["status", "==", "Active"],
        ],
        [{ field: "created_at", direction: "desc" }],
        undefined,
        (docs) => {
          setTemplate(
            docs.map((item) => ({ title: item?.title, type: item?.id }))
          );
          setDatas(docs as IData[]);
        }
      );
      getAllDocuments("users").then((i) => setUser(i as TUser[]));
    })();
  }, []);

  const handleSubmit = (
    action: string,
    form: FormInstance<ISendingNoteReq>
  ) => {
    form.validateFields().then((i) => {
      if (props?.mode === "CREATE_NOTI") {
        return noticeApi
          .Create({
            type: "Send note",
            title: i.title,
            content: i.content,
            status: "Active",
            sending_status: i.specify_date ? "Waiting" : "Now",
            force_reading: i.force_reading,
            user_level: Number(i.user_level),
            users: i.users,
            send_type: action,
            specify_date: dayjs(i.specify_date).unix() * 1000,
            registrant: id!,
          })
          .then((i) => {
            props?.onCloseModal?.();
          });
      }

      if (props?.mode === "EDIT_NOTI") {
        return noticeApi
          .Edit({
            content: i.content,
            type: "Send note",
            force_reading: i.force_reading,
            id: props?.dataDefault?.id,
            send_type: action,
            users: i.users,
            user_level: Number(i.user_level),
            sending_status: i.specify_date ? "Waiting" : "Now",
            specify_date: dayjs(i.specify_date).unix() * 1000,
            status: "Active",
            title: i.title,
          })
          .then(() => {
            props?.onCloseModal?.();
          });
      }

      return noticeApi
        .Create({
          content: i.content,
          type: "Send note",
          force_reading: i.force_reading,
          // id: i.id,
          send_type: action,
          users: i.users,
          user_level: Number(i.user_level),
          sending_status: i.specify_date ? "Waiting" : "Now",
          specify_date: dayjs(i.specify_date).unix(),
          status: "Active",
          title: i.title,
          registrant: id!,
        })
        .then((i) => {
          if (i) return Utils.notification.success("성공");
          Utils.notification.error("실패한");
        });
    });
  };

  const renderBtnMode = () => {
    if (props?.mode === "") return null;

    return (
      <>
        <Button
          className="btn-modal-ok"
          onClick={() => {
            handleSubmit(sendType, form);
          }}
        >
          저장
        </Button>
        <Button
          className="btn-modal-close"
          onClick={() => props?.onCloseModal?.()}
        >
          닫기
        </Button>
      </>
    );
  };

  const renderGroupRadioForMode = () => {
    if (props?.mode === "") return null;

    return (
      <div>
        <div />
        <div>
          <Radio.Group
            value={sendType}
            onChange={(e: RadioChangeEvent) => {
              setSendType(e.target.value);
            }}
          >
            <Radio value="Level">레벨별 발송</Radio>
            <Radio value="Selected users">선택유저 발송</Radio>
            <Radio value="All users">전체 유저 발송</Radio>
          </Radio.Group>
        </div>
      </div>
    );
  };
  return (
    <div className="SendingNote">
      <h2>쪽지 발송</h2>
      <Form className="form" form={form}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>날짜를 사용하십시오</span>
            <input
              type="checkbox"
              onChange={(e) => setIsDate(e.target.checked)}
            />
          </div>
          <Components.Input.DatePicker
            label=""
            name="specify_date"
            showTime
            disabled={!isDate}
          />
        </div>
        <div>
          <div>
            <span>템플릿</span>
          </div>
          <div>
            <Components.Input.Select
              rules={[
                {
                  required: true,
                  message: "비어 있지 않습니다",
                },
              ]}
              name="type"
              label=""
              placeholder={"템플릿을 선택해 주세요"}
              data={template.map((item) => ({
                key: item?.type,
                value: item?.type,
                text: item?.title,
              }))}
              onChange={(e) => {
                const item = datas.find((item) => item.id === e);
                form.setFieldsValue({
                  title: item?.title,
                  content: item?.content,
                  id: item?.id,
                });
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <span>제목</span>
          </div>
          <div>
            <Components.Input.Text
              name="title"
              initialValue={props?.dataDefault?.title}
              label=""
            />
          </div>
        </div>
        <div>
          <div>
            <span>내용</span>
          </div>
          <div>
            <Components.Input.TextArea
              name="content"
              label=""
              initialValue={props?.dataDefault?.content}
            />
          </div>
        </div>
        <div>
          <div>
            <span>강제읽기</span>
          </div>
          <div>
            <Components.Input.Select
              name="force_reading"
              label=""
              initialValue={props?.dataDefault?.force_reading ?? false}
              data={Array(2)
                .fill(0)
                .map((_, idx) => ({
                  key: idx === 0 ? true : false,
                  value: idx === 0 ? true : false,
                  text: idx === 0 ? "YES" : "NO",
                }))}
            />
          </div>
        </div>
        <div>
          <div>
            <span>유저레벨</span>
          </div>
          <div>
            <Components.Input.Select
              name="user_level"
              label=""
              initialValue={props?.dataDefault?.user_level ?? 1}
              data={Array(5)
                .fill(0)
                .map((_, idx) => ({
                  key: idx + 1,
                  value: idx + 1,
                  text: `${idx + 1}`,
                }))}
            />
          </div>
        </div>
        <div>
          <div>
            <span>유저선택</span>
          </div>
          <div>
            <Components.Input.Select
              label=""
              name="users"
              mode="multiple"
              showSearch={true}
              initialValue={props?.dataDefault?.users}
              data={user.map((i) => ({
                key: i.id,
                value: i.id,
                text: i.nickname,
              }))}
            />
            <Components.Input.Text name="id" style={{ display: "none" }} />
          </div>
        </div>

        {renderGroupRadioForMode()}

        <div>
          <div />
          <div
            className={props?.mode === "" ? "box-btn" : "box-btn box-btn-mode"}
          >
            {renderBtnMode()}

            {LIST_BTN.map((item) => (
              <Button key={item.id} onClick={() => item.action(item.id, form)}>
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SendingNote;

SendingNote.defaultProps = {
  mode: "",
  dataDefault: {},
  onCloseModal: () => {},
};
