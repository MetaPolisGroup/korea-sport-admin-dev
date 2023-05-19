import React from "react";
import Space from "antd/es/space";
import BettingCancel from "./BettingCancel";
import PreferencesMiddle from "./PreferencesMiddle";
import DepositMessage from "./DepositMessage";
import { IDataResponsSetting } from "./BettingCancel/data";
import { getAllDocuments } from "../../../service/queryFunction";
import "./index.scss";
import Components from "../../../components";
const Setting = () => {
  const [data, setData] = React.useState<IDataResponsSetting>();

  React.useEffect(() => {
    (async () =>
      await getAllDocuments("preferences", (value) =>
        setData(value[0] as IDataResponsSetting)
      ))();
  }, []);

  return (
    <React.Fragment>
      {!data ? (
        <Components.Loading />
      ) : (
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          {/* <BettingCancel data={data.betting_cancel_refund} /> */}
          <PreferencesMiddle preferences={data} />
          {/* <DepositMessage data={data.deposit.deposit_message} /> */}
        </Space>
      )}
    </React.Fragment>
  );
};

export default Setting;
