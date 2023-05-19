import type { MenuProps } from "antd";
import NavItem from "../NavItem";



const itemsPartner: MenuProps['items'] = [
  {
    key: '1',
    label: <NavItem name='파트너 관리' router='/partner-branch-list' />
  },
  {
    key: '2',
    label: <NavItem name='관리자 목록' router='/partner-admin-list' />
  },
  {
    key: "3",
    label: <NavItem name="관리자기록" router="/partner-admin-hist" />,
  },
  {
    key: "4",
    label: <NavItem name="쪽지함" router="/partner-admin-msg" />,
  },
  {
    key: '5',
    label: <NavItem name='파트너 출금관리' router='/partner-brc-withdraw-list' />
  },
  {
    key: '6',
    label: <NavItem name='파트너 캐쉬내역' router='/partner-brc-money-history' />

  },
];

export default itemsPartner;
