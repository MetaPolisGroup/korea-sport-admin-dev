import React from "react";
import Setting from "./setting";
import PostManagement from "./notice";
import Payment from "./payment";
import Sport from "./sportmanagement";
import Member from "./membermanagement";
import Settlement from "./settlementmanagement";
import PartnerManageMent from "./partnermanagement";
import BetHistory from "./betHistory";
import Casino from "./casino";

const Login = React.lazy(() => import("./login"));
const DashBoard = React.lazy(() => import("./dashboard"));

interface IPage extends React.FC {
  DashBoard: typeof DashBoard;
  PartnerManageMent: typeof PartnerManageMent;
  PostManagement: typeof PostManagement;
  Login: typeof Login;
  Payment: typeof Payment;
  Setting: typeof Setting
  SportManagement: typeof Sport;
  Member: typeof Member;
  Settlement: typeof Settlement;
  BetHistory: typeof BetHistory;
  Casino: typeof Casino;
}

const Page: IPage = () => null;
Page.PostManagement = PostManagement;
Page.Payment = Payment;
Page.DashBoard = DashBoard;
Page.PartnerManageMent = PartnerManageMent;
Page.Login = Login;
Page.Setting = Setting;
Page.SportManagement = Sport;
Page.Member = Member;
Page.Settlement = Settlement;
Page.BetHistory = BetHistory;
Page.Casino = Casino;

export default Page;
