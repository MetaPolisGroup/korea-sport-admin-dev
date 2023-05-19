import {
  CalculatorOutlined,
  ClusterOutlined,
  FormOutlined,
  HistoryOutlined,
  MoneyCollectOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import itemsBetting from "./Betting";
import itemCasino from "./Casino";
// import itemCasino from "./Casino";
import itemDeposit from "./Deposit";
import itemMember from "./Member";
import itemsPartner from "./Partner";
import itemPost from "./Post";
import itemSetting from "./Setting";
import itemsSettlement from "./Settlement";
import itemSports from "./Sports";

interface Item {
  name: string;
  icon: JSX.Element;
  items?: MenuProps["items"];
  urlActive: string[];
}

const ItemList: Item[] = [
  {
    name: "파트너 관리",
    icon: <ClusterOutlined />,
    items: itemsPartner,
    urlActive: ["/partner"],
  },
  {
    name: "정산관리",
    icon: <CalculatorOutlined />,
    items: itemsSettlement,
    urlActive: ["/revenue"],
  },
  {
    name: "베팅 관리",
    icon: <HistoryOutlined />,
    items: itemsBetting,
    urlActive: ["/bet-history", "/bet-statistics"],
  },
  {
    name: "스포츠 관리",
    icon: <UserOutlined />,
    items: itemSports,
    urlActive: ["/sport-"],
  },
  {
    name: "회원관리",
    icon: <UsergroupAddOutlined />,
    items: itemMember,
    urlActive: ["/member"],
  },
  {
    name: "입출금관리",
    icon: <MoneyCollectOutlined />,
    items: itemDeposit,
    urlActive: ["/payment", "user-", "auto-"],
  },
  {
    name: "게시물관리 ",
    icon: <FormOutlined />,
    items: itemPost,
    urlActive: ["/notice"],
  },
  {
    name: "CASINO/SLOT",
    icon: <PlayCircleOutlined />,
    items: itemCasino,
    urlActive: ["/slot"],
  },
  {
    name: "환경설정",
    icon: <SettingOutlined />,
    items: itemSetting,
    urlActive: [
      "/game-bet-setting",
      "/basic-setting",
      "/level-setting",
      "/bank-info",
      "/sms-setting",
      "/domain-setting",
    ],
  },
];

export default ItemList;
