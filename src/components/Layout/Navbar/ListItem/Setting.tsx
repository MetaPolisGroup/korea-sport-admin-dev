import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemSetting: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name="사이트 기본설정" router="/basic-setting" />,
  },
  {
    key: "2",
    label: <NavItem name="지급 포인트 설정" router="/level-setting" />,
  },
  {
    key: "3",
    label: <NavItem name="통장관리" router="/bank-info" />,
  },
  {
    key: "4",
    label: <NavItem name="SMS 설정 " router="/sms-setting" />,
  },
  {
    key: "5",
    label: <NavItem name="게임별 옵션 설정" router="/game-bet-setting" />,
  },
  {
    key: "6",
    label: <NavItem name="도메인관리" router="/domain-setting" />,
  },
];

export default itemSetting;
