import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { ClassDivision } from "..";
import { IPartnerManageMent, PartnerUpsertDto } from "../../../../api/partnersApi";
import Popup, { PopupRef } from "../../../../components/Popup";
import { IUser } from "../../../../features/auth";
import Utils from "../../../../utils";
import Recharge from "../Recharge";
import FormEdit from "../SaveGame";

const getColumns = (user: IUser[], partners: IPartnerManageMent[]): ColumnsType<IPartnerManageMent> => {

  return [
    {
      title: "구분",
      align: "center",
      dataIndex: 'division',
      key: 'division',
      render: (a) => ClassDivision(a)
    },
    {
      title: "파트너명",
      align: "center",
      key: 'partner_name',
      dataIndex: 'partner_name' // name
    },
    {
      title: "상태",
      align: "center",
      render: () => <p>정상</p>
    },
    {
      title: "정산방식",
      align: "center",
      key: 'settlement_method',
      dataIndex: 'settlement_method'

    },
    {
      title: "출금방식",
      align: "center",
      key: 'withdraw_type',
      dataIndex: 'withdraw_type',// --
    },
    {
      title: "보유머니",
      align: "center",
      key: 'balance',
      dataIndex: 'balance', // balance
      render: (b) => <p>{Utils.convertCurrencyWithCommas(b)}</p>
    },
    {
      title: "회원수 (ON/ALL)",
      align: "center",
      render: (a, b, c) => {
        return <p>0/{user.filter(u => u.partner_id === b.partner_name).length}</p>
      }
    },
    {
      title: "설정",
      align: "center",
      fixed: 'right',
      render: (_, data) => {
        const saveRef = React.createRef<PopupRef>()
        const rechargeRef = React.createRef<PopupRef>()
        return <Space>
          <Popup
            width={700}
            ref={saveRef}
            footer
            content={<FormEdit value={data as unknown as PartnerUpsertDto} popup={saveRef} isEdit partners={partners} />}
            title='파트너 수정'
            selector={<Button onClick={() => saveRef.current?.open()}>Edit</Button>}
          />
          <Popup
            title='처리'
            ref={rechargeRef}
            selector={<Button onClick={() => rechargeRef.current?.open()}>보유머니 관리</Button>}
            content={<Recharge />}
          />
        </Space>
      }
    },
  ]
};
export { getColumns };
