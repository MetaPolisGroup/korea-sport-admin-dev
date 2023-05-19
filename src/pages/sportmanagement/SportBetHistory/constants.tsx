import Box from "../../../components/Box";
import { IUser } from "../../../features/auth";
import type { ColumnsType } from "antd/es/table";

// interface IUser {
//   id: string;
//   level: number;
//   balance: number;
//   partner_id: string;
//   cumulative_deposit: number;
//   cumulative_withdraw: number;
//   cumulative_settlement: number;
// }

export const COLUMNS = (): ColumnsType<any> => [
  {
    key: "id",
    dataIndex: "id",
    title: "베팅번호",
  },
  {
    key: "betType",
    dataIndex: "betType",
    title: "베팅타입",
  },
  {
    key: "created_at_layout",
    dataIndex: "created_at_layout",
    title: "베팅일시",
  },
  {
    key: "user_id",
    dataIndex: "user_id",
    title: "유저정보",
    width: 400,
    render: (user_id, data) => {
      return (
        <Box<IUser>
          id={user_id}
          collectionName="users"
          filters={[["id", "==", user_id]]}
          render={(item) => {
            const deposit = item?.cumulative_deposit.toLocaleString("en-US");
            const withdraw = item?.cumulative_withdraw.toLocaleString("en-US");
            const settlement =
              item?.cumulative_settlement.toLocaleString("en-US");

            return (
              <div className="profile">
                [소속: {item?.partner_id}] [Lv: {item?.level}] 아이디:{" "}
                <span
                  onClick={() => {
                    data?.setUserSelected(item);
                    data?.setShowModal("PREVIEW_USER");
                  }}
                >
                  {item?.id}
                </span>
                <br />
                입금: <span>{deposit}</span> 출금:
                <span>{withdraw}</span> 누적정산:
                <span>{settlement}</span>
              </div>
            );
          }}
        />
      );
    },
  },
  {
    key: "ip",
    dataIndex: "ip",
    title: "베팅아이피",
  },
  {
    key: "amount",
    dataIndex: "amount",
    title: "베팅금액",
  },
  {
    key: "total_odds_layout",
    dataIndex: "total_odds_layout",
    title: "배당률",
  },
  {
    key: "winning_amount_layout",
    dataIndex: "winning_amount_layout",
    title: "적중금액",
  },
  {
    key: "payment",
    dataIndex: "payment",
    title: "금액지급",
  },
  {
    key: "status_layout",
    dataIndex: "status_layout",
    title: "결과",
  },
];

export const COLUMNS_DETAILS = (): ColumnsType<any> => [
  {
    key: "matchDate",
    dataIndex: "matchDate",
    title: "경기일시",
  },
  {
    key: "event",
    dataIndex: "event",
    title: "종목",
  },
  {
    key: "homeTeam",
    dataIndex: "homeTeam",
    title: "홈팀",
  },
  {
    key: "awayTeam",
    dataIndex: "awayTeam",
    title: "원정",
  },
  {
    key: "oddType",
    dataIndex: "oddType",
    title: "경기타입",
  },
  {
    key: "oddTeam",
    dataIndex: "oddTeam",
    title: "배팅종류/기준",
  },
  {
    key: "odds",
    dataIndex: "odds",
    title: "배당률",
  },
  {
    key: "score",
    dataIndex: "score",
    title: "스코어",
    width: 700,
  },
  {
    key: "matchStatus",
    dataIndex: "matchStatus",
    title: "경기상태",
  },
  {
    key: "progress",
    dataIndex: "progress",
    title: "진행상태",
  },
  {
    key: "result",
    dataIndex: "result",
    title: "결과",
  },
  {
    key: "setting",
    dataIndex: "setting",
    title: "설정",
  },
];

export const SELECT_OPTION = [
  { text: "전체", value: 1 },
  { text: "프리매치", value: 2 },
  { text: "실시간", value: 3 },
];

export const BET_RESULT = [
  {
    text: "취소",
    value: "Cancel",
  },
  {
    text: "대기 중",
    value: "Waiting",
  },
  {
    text: "이기다",
    value: "Win",
  },
  {
    text: "잃다",
    value: "Lose",
  },
  {
    text: "그리다",
    value: "Draw",
  },
  {
    text: "절반의 승리",
    value: "Half win",
  },
  {
    text: "반패",
    value: "Half lose",
  },
];

export const LIST_BTN = [
  {
    id: "Excel",
    title: "Excel",
    onAction: () => {},
  },
  {
    id: "expandCollapseAll",
    title: "전체 펼치기/접기",
    onAction: () => {},
  },
  {
    id: "waitingForSettlement",
    title: "정산대기",
    onAction: () => {},
  },
  {
    id: "win",
    title: "당첨",
    onAction: () => {},
  },
  {
    id: "lost",
    title: "낙첨",
    onAction: () => {},
  },
  {
    id: "redSpecial",
    title: "적특",
    onAction: () => {},
  },
  {
    id: "betCancellation",
    title: "베팅취소",
    onAction: () => {},
  },
  {
    id: "settlementComplete",
    title: "정산완료",
    onAction: () => {},
  },
];

export default {};
