import React from "react";
import Utils from "../../utils";

const RealTime = React.lazy(() => import("./Realtime"));
const Detail = React.lazy(() => import("./Details"));
const EntryExit = React.lazy(() => import("./Entryexit"));

interface IComponentSettlement extends React.FC {
  RealTime: typeof RealTime;
  Detail: typeof Detail;
  EntryExit: typeof EntryExit;
}

const Settlement: IComponentSettlement = () => null;

Settlement.RealTime = RealTime;
Settlement.Detail = Detail;
Settlement.EntryExit = EntryExit;

export default Settlement;

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
    },
  });
