import axiosClient from "./axiosClient";
type IPayment = {
  amount: number;
  created_at: number;
  delete: boolean;
  id: string;
  processer_id?: string | undefined;
  proccessing_at?: number | undefined;
  status: string;
  type: string;
  user_id: string;
  partner_id?: string;
  nickname?: string;
  winning_amount?: number;
};

interface IRequest {
  ticket_id: string;
  action: "Approved" | "Rejected" | "Cancelled" | "Refund"; // must in
  admin_id: string;
}

export enum EUserMoneyHist {
  "전체" = "all divisions",
  "입금승인" = "Deposit",
  "입+출" = "Deposit" + "Withdraw",
  "베팅취소" = "Cancel Bet",
  "입금승인취소" = "",
  "적중특례 베팅금 지급" = "",
  "롤벡처리 당첨금 회수" = "",
  "롤벡 - 적특 회수" = "",
  "출금 취소" = "Reject Withdraw",
  "출금승인" = "Withdraw",
  "포인트캐쉬전환" = "",
  "게임머니 이동(충전)" = "",
  "게임머니 이동(회수)" = "",
  "관리자 충전" = "",
  "관리자 회수" = "",
  "베팅" = "",
  "베팅당첨" = "",
}

const paymentApi = {
  process(value: IRequest): Promise<any> {
    let url = "/ticket/transaction/process";
    return axiosClient.put(url, { ...value });
  },
  processMutiple(value: {
    ticket_id: string[];
    action: string;
    admin_id: string;
  }): Promise<any> {
    let url = "/ticket/transaction/processMulti";
    return axiosClient.put(url, { ...value });
  },
};

export default paymentApi;

export type { IPayment as IDepositData };
