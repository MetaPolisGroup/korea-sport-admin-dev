import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemMember: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name='회원관리' router='/member-list' />
  },
  {
    key: "2",
    label: <NavItem name='회원기록' router='/member-record' />
  },
  {
    key: "3",
    label: <NavItem name='회원접속현황' router='/member-status' />
  },
];

export default itemMember;
