import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemDeposit: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name="입금관리" router="/payment-deposit" />,
  },
  {
    key: "2",
    label: <NavItem name="출금관리" router="/payment-withdraw" />,
  },
  {
    key: "3",
    label: <NavItem name="캐쉬내역" router="/user-money-hist" />,
  },
  {
    key: "4",
    label: <NavItem name="포인트내역" router="/user-point-hist" />,
  },
  {
    key: "5",
    label: <NavItem name="자동 입금 처리 내역" router="/auto-deposit-list" />,
  },
];

export default itemDeposit;
