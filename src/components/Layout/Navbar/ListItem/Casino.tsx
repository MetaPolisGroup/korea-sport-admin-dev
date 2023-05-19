import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemCasino: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name="게임사관리 " router="/slot-provider-list" />,
  },
  {
    key: "2",
    label: <NavItem name="SLOT 게임리스트" router="/slot-game-list" />,
  },
  {
    key: "3",
    label: <NavItem name="게임기록" router="/slot-game-history" />,
  },
  {
    key: "4",
    label: (
      <NavItem name="머니 이동내역" router="/slot-game-money-trans-history" />
    ),
  },
];

export default itemCasino;
