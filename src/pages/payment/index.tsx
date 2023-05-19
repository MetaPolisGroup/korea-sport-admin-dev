import React from "react";
import Utils from "../../utils";

const Deposit = React.lazy(() => import("./Deposit"));
const Withdraw = React.lazy(() => import("./Withdraw"));
const UserMoneyHist = React.lazy(() => import("./UserMoneyHist"));
const UserPointHist = React.lazy(() => import("./UserPointHist"));
const AutoDepositList = React.lazy(() => import("./AutoDepositList"));

interface IDepositAndWithdrawProps extends React.FC {
  Deposit: typeof Deposit;
  Withdraw: typeof Withdraw;
  UserMoneyHist: typeof UserMoneyHist;
  UserPointHist: typeof UserPointHist;
  AutoDepositList: typeof AutoDepositList;
}

const Payment: IDepositAndWithdrawProps = () => null;

Payment.Deposit = Deposit;
Payment.Withdraw = Withdraw;
Payment.UserMoneyHist = UserMoneyHist;
Payment.UserPointHist = UserPointHist;
Payment.AutoDepositList = AutoDepositList;

export default Payment;
export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
      proces_at: "proces_at",
      processing_at: "processing_at",
    },
  });
