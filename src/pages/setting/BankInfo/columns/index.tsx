import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import React from "react";
import { PopupConfirm, PopupRef } from "../../../../components/Popup";
import { CreatingFormRef } from "../../../../api/noticeApi";
import { Button, Space } from "antd";
import FormPopupInfo, { IFormData } from "../FormPopup/content";

const getColumns = (isPopup?: boolean): ColumnsType<any> => [
  {
    title: "번호",
    align: "center",
    width: 100,
    render: (_, data, index) => index + 1,
    defaultSortOrder: "descend",
    sorter: (a, b) => a.created_at - b.created_at,
  },
  {
    title: "별칭",
    align: "center",
    width: 100,
    key: "title",
    dataIndex: "title",
    render: (title) => <p>{title}</p>,
  },
  {
    title: "내용",
    align: "center",
    width: 500,
    key: "content",
    dataIndex: "content",
    render: (content) => <p>{content}</p>,
  },
  {
    title: "등록시각",
    align: "center",
    width: 100,
    key: "created_at",
    dataIndex: "created_at",
    render: (created_at) => dayjs(created_at).format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    title: "마지막수정",
    align: "center",
    width: 100,
    key: "updated_at",
    dataIndex: "updated_at",
    render: (updated_at) => (
      <p>{dayjs(updated_at).format("YYYY-MM-DD HH:mm:ss")}</p>
    ),
  },
  {
    title: "수정",
    align: "center",
    width: 100,
    fixed: 'right',
    render: (_, data, idx) => {
      const btnEditRef = React.createRef<PopupRef>();
      const infoFormRef = React.createRef<CreatingFormRef>();
      return (
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <PopupConfirm
            ref={btnEditRef}
            width={700}
            onSubmit={() => {
              //   infoFormRef.current?.onSubmit<IFormData>((value) => {
              //     if (value)
              //       noticeApi
              //         .Edit({
              //           status: !value.status ? "Active" : "Inactive",
              //           content: value.content,
              //           title: value.title,
              //           registrant: id!,
              //           type: data.type,
              //           id: data.id,
              //         })
              //         .then((i) => {
              //           if (i) undefined;
              //           btnEditRef.current?.close();
              //           Utils.notification.success("성공");
              //         });
              //   });
            }}
            selector={
              <Button type="primary" onClick={() => btnEditRef.current?.open()}>
                수정
              </Button>
            }
            title={"신규 생성 "}
            content={
              <FormPopupInfo ref={infoFormRef} isPopup={isPopup} data={data} />
            }
          />
        </Space>
      );
    },
  },
  {
    title: "변경이력",
    align: "center",
    width: 100,
    key: "daily_max_losing_points",
    dataIndex: "daily_max_losing_points",
    fixed: 'right',
    render: (_, data, idx) => {
      const btnEditRef = React.createRef<PopupRef>();
      const infoFormRef = React.createRef<CreatingFormRef>();
      return (
        <Space style={{ display: "flex", justifyContent: "center" }}>
          <PopupConfirm
            ref={btnEditRef}
            width={700}
            onSubmit={() => {
              //   infoFormRef.current?.onSubmit<IFormData>((value) => {
              //     if (value)
              //       noticeApi
              //         .Edit({
              //           status: !value.status ? "Active" : "Inactive",
              //           content: value.content,
              //           title: value.title,
              //           registrant: id!,
              //           type: data.type,
              //           id: data.id,
              //         })
              //         .then((i) => {
              //           if (i) undefined;
              //           btnEditRef.current?.close();
              //           Utils.notification.success("성공");
              //         });
              //   });
            }}
            selector={
              <Button type="primary" onClick={() => btnEditRef.current?.open()}>
                변경이력
              </Button>
            }
            title={"수정 " + data.title}
            content={
              <FormPopupInfo ref={infoFormRef} isPopup={isPopup} data={data} />
            }
          />
        </Space>
      );
    },
  },
];

export { getColumns };
