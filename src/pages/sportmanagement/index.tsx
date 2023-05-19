import React from "react";
import Utils from "../../utils";
import Setting from "./Setting";

const ListMess = React.lazy(() => import("./ManuaList"));
const MatchPre = React.lazy(() => import("./MatchPre"));
const MatchRealtime = React.lazy(() => import("./MatchRealtime"));
const Registration = React.lazy(() => import("./Registration"));
const Export = React.lazy(() => import("./excel"));
const BettingHistory = React.lazy(() => import("./BettingHistory"));
const SportBetHistory = React.lazy(() => import("./SportBetHistory"));
const SportMarketSetting = React.lazy(() => import("./SportMarketSetting"));

interface ComponentSport extends React.FC {
  Manua: typeof ListMess;
  Pre: typeof MatchPre;
  MatchRealtime: typeof MatchRealtime;
  Registration: typeof Registration;
  Export: typeof Export;
  BettingHistory: typeof BettingHistory;
  Setting: typeof Setting;
  SportBetHistory: typeof SportBetHistory;
  SportMarketSetting: typeof SportMarketSetting;
}

const Sport: ComponentSport = () => null;

Sport.Manua = ListMess;
Sport.Pre = MatchPre;
Sport.MatchRealtime = MatchRealtime;
Sport.Registration = Registration;
Sport.Export = Export;
Sport.BettingHistory = BettingHistory;
Sport.Setting = Setting;
Sport.SportBetHistory = SportBetHistory;
Sport.SportMarketSetting = SportMarketSetting;

export default Sport;
export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
      time: "time",
    },
  });
