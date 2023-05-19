import React from "react";
import { Tabs } from "antd";
import { IUser } from "../../features/auth";
import Components from "..";
import { PopupRef } from "../Popup";
import { getAllDocuments } from "../../service/queryFunction";
import Info from "./UserInfo";
import Page from "../../pages";

const Cash = React.lazy(() => import("./Cash"));
const PointComponent = React.lazy(() => import("./Point"));
const GameSetting = React.lazy(() => import("./GameSetting"));
const Daily = React.lazy(() => import("./Daily"));
const BetOther = React.lazy(() => import("./BetOther"));
const Referral = React.lazy(() => import("./Referral"));
const ManuaList = React.lazy(() => import("./Manua"));
const Casino = React.lazy(() => import("./Casino"));

interface IUserProps {
  user: IUser;
  popupRef: React.RefObject<PopupRef>;
}

const Information: React.FC<IUserProps> = (props) => {
  const { user, popupRef } = props;
  const [partner, setPartner] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    (async () => {
      await getAllDocuments("partners", (pn) => setPartner(pn as IUser[]));
    })();
  }, []);

  console.log({ user });

  const initialItems = React.useCallback(() => {
    return [
      {
        label: "기본정보",
        children: <Info popupRef={popupRef} user={user} partner={partner} />,
        key: "1",
      },
      { label: "게임설정", children: <GameSetting />, key: "2" },
      {
        label: "캐쉬내역",
        children: <Cash id={user.id!} />,
        key: "3",
      },
      {
        label: "포인트내역",
        children: <PointComponent point={user.id!} />,
        key: "4",
      },
      { label: "일별 입/출", children: <Daily />, key: "5" },
      {
        label: "베팅-Sports",
        children: <Page.SportManagement.BettingHistory id={user.id!} />,
        key: "6",
      },
      {
        label: "기록",
        children: <Page.Member.Record id={user.id!} />,
        key: "7",
      },
      {
        label: "1:1 문의기록",
        children: <Page.PostManagement.ManagerTicket user_id={user.id!} />,
        key: "8",
      },
      { label: "베팅-CASINO/SLOT", children: <Casino />, key: "9" },
      { label: "베팅-Other", children: <BetOther />, key: "10" },
      {
        label: "쪽지전송",
        children: <Page.PostManagement.SendingNote />,
        key: "11",
      },
      {
        label: "추천인 목록",
        children: <Referral user_id={user.id!} />,
        key: "12",
      },
      { label: "수동 내역", children: <ManuaList />, key: "13" },
    ];
  }, [user, popupRef]);

  const [activeKey, setActiveKey] = React.useState(initialItems()[0].key);
  const [items, setItems] = React.useState(initialItems);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };
  return (
    <React.Suspense fallback={<Components.Loading />}>
      <Tabs
        tabBarGutter={0}
        type="card"
        onChange={onChange}
        activeKey={activeKey}
        items={items}
      />
    </React.Suspense>
  );
};
export default Information;
