import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table"
import React from "react";
import Components from "../../../components";
import Popup, { PopupRef } from "../../../components/Popup";

export default {};

const COLUMNS = (): ColumnsType<any> => [
  {
    key: "situation",
    dataIndex: "situation",
    title: "상태",
    width: 100
  },
  {
    key: "partner_id",
    dataIndex: "partner_id",
    title: "파트너명",
    width: 200,
  },
  {
    key: "dateTimeCreate",
    dataIndex: "dateTimeCreate",
    title: "가입일/승인일",
    width: 200,
  },
  {
    key: "last_login_layout",
    dataIndex: "last_login_layout",
    title: "접속일/아이피",
    width: 200,
  },
  {
    key: "level",
    dataIndex: "level",
    title: "레벨",
    width: 200,
  },
  {
    key: "id_layout",
    dataIndex: "id_layout",
    align: 'center',
    title: "아이디",
    width: 200,
    render: (_, data) => {
      const popupRef = React.createRef<PopupRef>()
      return <Popup
        ref={popupRef}
        footer
        width={1300}
        title={'유저 ' + data.id}
        content={<Components.Member user={data} popupRef={popupRef} />}
        selector={<Tag style={{ cursor: 'pointer' }} onClick={() => popupRef.current?.open()}>{data.id}</Tag>}
      />
    }
  },
  {
    key: "nickname",
    dataIndex: "nickname",
    title: "별명/이름",
    width: 200,
  },
  {
    key: "phone",
    dataIndex: "phone",
    title: "연락처",
    width: 200,
  },
  {
    key: "recommend_id",
    dataIndex: "recommend_id",
    title: "추천인",
    width: 200,
  },
  {
    key: "balance",
    dataIndex: "balance",
    title: "보유머니",
    width: 200,
  },
  {
    key: "point",
    dataIndex: "point",
    title: "포인트",
    width: 200,
  },
  {
    key: "cumulative_deposit",
    dataIndex: "cumulative_deposit",
    title: "누적입금",
    width: 200,
  },
  {
    key: "cumulative_withdraw",
    dataIndex: "cumulative_withdraw",
    title: "누적출금",
    width: 200,
  },
  {
    key: "cumulative_settlement_layout",
    dataIndex: "cumulative_settlement_layout",
    title: "누적정산",
    width: 200,
  },
  {
    key: "setting_layout",
    dataIndex: "setting_layout",
    title: "설정",
    align: 'center',
    width: 100,
    fixed: 'right'
  },
];

export { COLUMNS }