import React from "react";
import Utils from "../../utils";

const BranchList = React.lazy(() => import("./BranchList"));
const AdminList = React.lazy(() => import("./AdminList"));
const WithdrawPartner = React.lazy(() => import("./PartnerWithdraw"));
const AdminMsg = React.lazy(() => import("./AdminMsg"));
const Money = React.lazy(() => import("./Money"));
const Record = React.lazy(() => import("./Record"));
const PartnerDeposit = React.lazy(() => import("./PartnerDeposit"));

interface IPartnerManageMent extends React.FC {
  BranchList: typeof BranchList;
  AdminList: typeof AdminList;
  WithdrawPartner: typeof WithdrawPartner;
  AdminMsg: typeof AdminMsg;
  Money: typeof Money;
  Record: typeof Record;
  PartnerDeposit: typeof PartnerDeposit;
}

const PartnerManageMent: IPartnerManageMent = () => null;
PartnerManageMent.BranchList = BranchList;
PartnerManageMent.AdminList = AdminList;
PartnerManageMent.WithdrawPartner = WithdrawPartner;
PartnerManageMent.AdminMsg = AdminMsg;
PartnerManageMent.Money = Money;
PartnerManageMent.Record = Record;
PartnerManageMent.PartnerDeposit = PartnerDeposit;

export default PartnerManageMent;

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
    },
  });
