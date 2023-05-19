import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemSports: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name="프리매치등록" router="/sport-match-list" />,
  },
  {
    key: "2",
    label: <NavItem name="경기관리 - PRE" router="/sport-pre" />,
  },
  {
    key: "3",
    label: <NavItem name="경기관리 - 실시간" router="/sport-live" />,
  },
  {
    key: "4",
    label: <NavItem name="배팅내역" router="/sport-bet-his" />,
  },
  {
    key: "5",
    label: <NavItem name="베팅 내역(신규)" router="/sport-bet-list" />,
  },
  {
    key: "6",
    label: <NavItem name="스포츠 종목 셋팅" router="/sport-setting" />,
  },
  {
    key: "7",
    label: <NavItem name="마켓 셋팅" router="/sport-market-setting" />,
  },
  {
    key: "8",
    label: <NavItem name="국가명 설정" router="/sport-nation-setting" />,
  },
  {
    key: "9",
    label: <NavItem name="리그명 설정" router="/sport-leagues-setting" />,
  },
  {
    key: "10",
    label: <NavItem name="팀명 설정" router="/sport-team-setting" />,
  },
  {
    key: "11",
    label: <NavItem name="수동 경기 등록" router="/sport-excel-import" />,
  },
  {
    key: "12",
    label: <NavItem name="수동 경기 관리" router="/sport-manual-list" />,
  },
];

export default itemSports;
