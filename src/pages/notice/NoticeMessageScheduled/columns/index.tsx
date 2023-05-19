import { Button, FormInstance, Space, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { formatDateTime } from "../../../../components/Input/DatePicker";
import { PopupConfirm, PopupRef } from "../../../../components/Popup";
import noticeApi, { CreatingFormRef } from "../../../../api/noticeApi";
import FormPopupInfo, { IFormData } from "../../FormPopup/content";
import Utils from "../../../../utils";

const getColumns = (
  form: FormInstance<any>,
  id: string,
  isPopup?: boolean
): ColumnsType<any> => {
  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      render: (_, data, index) => index + 1,
    },
    {
      title: "예약시각",
      align: "left",
      dataIndex: "created_at",
      key: "created_at",
      width: 150,
      render: (created_at) => (
        <p>{dayjs(created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
      ),
    },
    {
      title: "등록자",
      align: "left",
      dataIndex: "registrant",
      key: "registrant",
      width: 150,
      render: (registrant) => <p>{registrant}</p>,
    },
    {
      title: "전송타입",
      dataIndex: "send_type",
      key: "send_type",
      align: "center",
      width: 200,
      render: (send_type) => <p>{send_type}</p>,
    },
    {
      title: "제목",
      dataIndex: "title",
      key: "title",
      align: "left",
      width: 200,
      render: (title) => <p>{title}</p>,
    },
    {
      title: "내용",
      dataIndex: "content",
      key: "content",
      align: "left",
      width: 500,
      render: (content) => ReactHtmlParser(content),
    },
    {
      title: "상태",
      align: "left",
      dataIndex: "sending_status",
      key: "sending_status",
      width: 150,
      render: (sending_status) => {
        let color;
        let text;
        switch (sending_status) {
          case "Shipment Completed":
            color = "#87d068";
            text = "발송완료";
            break;
          case "Waiting":
            color = "#f50";
            text = "대기 중";
            break;
          default:
            break;
        }
        return <Tag color={color}>{text ?? sending_status ?? "---"}</Tag>;
      },
    },
    {
      title: "설정",
      fixed: "right",
      align: "center",
      width: 150,
      render: (_, data) => {
        const btnEditRef = React.createRef<PopupRef>();
        const btDeleteRef = React.createRef<PopupRef>();
        const infoFormRef = React.createRef<CreatingFormRef>();
        return (
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <PopupConfirm
              ref={btnEditRef}
              width={700}
              onSubmit={() => {
                infoFormRef.current?.onSubmit<IFormData>((value) => {
                  if (value)
                    noticeApi
                      .Edit({
                        status: !value.status ? "Active" : "Inactive",
                        content: value.content,
                        title: value.title,
                        registrant: id!,
                        type: data.type,
                        id: data.id,
                      })
                      .then((i) => {
                        if (i) undefined;

                        btnEditRef.current?.close();
                        Utils.notification.success("성공");
                      });
                });
              }}
              selector={
                <Button
                  type="primary"
                  onClick={() => btnEditRef.current?.open()}
                >
                  수정
                </Button>
              }
              title={"수정 " + data.title}
              content={
                <FormPopupInfo
                  ref={infoFormRef}
                  isPopup={isPopup}
                  data={data}
                />
              }
            />
            <PopupConfirm
              onSubmit={() =>
                noticeApi.Delete(data.id).then((i) => {
                  if (i) Utils.notification.success("성공");
                  else Utils.notification.error("실패한");
                })
              }
              ref={btDeleteRef}
              selector={
                <Button
                  type="primary"
                  danger
                  onClick={() => btDeleteRef.current?.open()}
                >
                  삭제
                </Button>
              }
              title="삭제"
              content={"삭제를 원하십니까  " + data.title ?? ""}
            />
          </Space>
        );
      },
    },
  ];
};
export { getColumns };
