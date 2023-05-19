import React from "react";
import { HeaderContent } from "../../../components/Layout";
import { Button, Form, Space } from "antd";

import noticeApi, { CreatingFormRef, IData } from "../../../api/noticeApi";
import Popup, { PopupRef } from "../../../components/Popup";
import { useAppSelector } from "../../../app/hook";
import FormPopup, { IFormData } from "../FormPopup/content";
import Utils from "../../../utils";
import dayjs from "dayjs";
import Components from "../../../components";
import { getColumns } from "./columns";
import { queryBuilderFunc } from "../../../service/queryFunction";

const NoticeMessageScheduled = () => {
  const [datas, setDatas] = React.useState<IData[]>([]);
  const [old, setOld] = React.useState<IData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const popupRef = React.createRef<PopupRef>();
  const infoFormRef = React.createRef<CreatingFormRef>();
  const [form] = Form.useForm();
  const { id } = useAppSelector((state) => state.auth.auth);

  React.useEffect(() => {
    (async () =>
      queryBuilderFunc(
        "notifications",
        [
          ["status", "==", "Active"],
          ["type", "==", "Send note"],
          ["sending_status", "in", ["Waiting", "Shipment Completed"] as any],
        ],
        [{ field: "created_at", direction: "desc" }],
        undefined,
        (docs) => {
          setDatas(docs as IData[]);
        }
      ))();
  }, []);

  console.log({ datas });

  return (
    <div className="wrapper-managerticket">
      <h2 style={{ marginBottom: "20px" }}>메세지 예약 발송</h2>
      <HeaderContent
        leftItem={
          <Space style={{ marginBottom: 20 }}>
            <Popup
              width={700}
              title="신규 생성"
              ref={popupRef}
              onSubmit={(e) => handleSubmitForm(infoFormRef, popupRef, id!)}
              selector={
                <Button onClick={() => popupRef.current?.open()}>만들다</Button>
              }
              content={<FormPopup ref={infoFormRef} isPopup={true} />}
            />
          </Space>
        }
        loading={setLoading}
        callback={(search) => {
          if (!search.trim() || !datas) {
            return setDatas(old);
          }
          const filter = datas.filter(
            (i) =>
              i.registrant?.toLowerCase().includes(search.toLowerCase()) ||
              i.id?.toString().toLowerCase().includes(search.toLowerCase())
          );
          setDatas(filter);
        }}
      />

      <Components.ListingTable<IData>
        columns={getColumns(form, id!, true)}
        datas={datas}
        loading={loading}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </div>
  );
};

const handleSubmitForm = (
  infoFormRef: React.RefObject<CreatingFormRef>,
  popupRef: React.RefObject<PopupRef>,
  id: string
) => {
  infoFormRef.current?.onSubmit<IFormData>((value) => {
    popupRef.current?.close();
    if (value)
      noticeApi
        .Create({
          status: !value.status ? "Active" : "Inactive",
          content: value.content,
          title: value.title,
          registrant: id!,
          type: "Popup",
          display: value.display, // 'Before', 'After', 'Both'
          display_start: dayjs(value?.display_start).unix(),
          display_end: dayjs(value?.display_end).unix(),
        })
        .then((i) => {
          if (undefined) return Utils.notification.error("실패한");
          Utils.notification.success("성공을 창출하십시오");
        });
  });
};

export default NoticeMessageScheduled;
