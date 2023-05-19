import React from "react";
import Utils from "../../utils";

const Basic = React.lazy(() => import("./Basic"));
const Game = React.lazy(() => import("./GameBetting"));
const Level = React.lazy(() => import("./Level"));
const BankInfo = React.lazy(() => import("./BankInfo"));
const SMSSetting = React.lazy(() => import("./SmsSetting"));
const DomainSetting = React.lazy(() => import("./DomainSetting"));

interface ISettingComponent extends React.FC {
  Basic: typeof Basic;
  Game: typeof Game;
  Level: typeof Level;
  BankInfo: typeof BankInfo;
  SMSSetting: typeof SMSSetting;
  DomainSetting: typeof DomainSetting;
}

const Setting: ISettingComponent = () => null;
Setting.Basic = Basic;
Setting.Game = Game;
Setting.Level = Level;
Setting.BankInfo = BankInfo;
Setting.SMSSetting = SMSSetting;
Setting.DomainSetting = DomainSetting;

export default Setting;

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
    },
  });