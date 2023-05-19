import React, { useState } from "react";
import Components from "../../../components";
import { Button, Space } from "antd";
import Utils from "../../../utils";
import Popup, { PopupRef } from "../../../components/Popup";
import { queryBuilderFunc } from "../../../service/queryFunction";
import FormPopupInfo from "./FormPopup/content";
import { getColumns } from "./columns";

export interface IBankbooksProps {
  content: string;
  created_at: number;
  deleted: boolean;
  id: string;
  title: string;
  updated_at: number;
  user_id: string;
}

const BankInfo: React.FC = () => {
  const [datas, setDatas] = useState<IBankbooksProps[]>([]);
  const popupRef = React.createRef<PopupRef>();
  const infoFormRef = React.createRef<any>();

  const handleSubmitForm = () => { };

  React.useEffect(() => {
    queryBuilderFunc(
      "bankbooks",
      [["deleted", "==", false]],
      undefined,
      undefined,
      (docs) => {
        setDatas(docs as IBankbooksProps[]);
      }
    );
  }, []);

  console.log({ datas });

  return (
    datas && (
      <div className="wraper-betting-level">
        <h2 style={{ marginBottom: "20px" }}>통장관리</h2>
        <Space style={{ marginBottom: 20 }}>
          <Button onClick={() => handleExcel(datas, "cash")}>뛰어나다</Button>
          <Space>
            <Popup
              width={700}
              title="신규 생성"
              ref={popupRef}
              onSubmit={handleSubmitForm}
              selector={
                <Button onClick={() => popupRef.current?.open()}>
                  신규작성
                </Button>
              }
              content={<FormPopupInfo ref={infoFormRef} />}
            />
            <Popup
              width={700}
              title="신규 생성"
              ref={popupRef}
              onSubmit={handleSubmitForm}
              selector={
                <Button onClick={() => popupRef.current?.open()}>삭제</Button>
              }
              content={<FormPopupInfo ref={infoFormRef} />}
            />
          </Space>
        </Space>
        <Components.ListingTable<any>
          datas={datas}
          bordered={true}
          columns={getColumns()}
          render={(data, value, indexRow, indexColumn) => {
            return <span>{value}</span>;
          }}
        />
      </div>
    )
  );
};

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
      date_time: "date_time",
    },
  });

export default BankInfo;
