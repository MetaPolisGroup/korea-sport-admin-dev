import type { MenuProps } from "antd";
import NavItem from "../NavItem";

const itemPost: MenuProps["items"] = [
  {
    key: "1",
    label: <NavItem name="1:1문의" router="/notice-qna-list" />,
  },
  {
    key: "2",
    label: <NavItem name="고객센터 메크로" router="/notice-list-template" />,
  },
  {
    key: "3",
    label: <NavItem name="공지사항" router="/notice-list-announcement" />,
  },
  {
    key: "4",
    label: <NavItem name="이벤트" router="/notice-list-event" />,
  },
  {
    key: "5",
    label: <NavItem name="베팅규정" router="/notice-list-betting-rules" />,
  },
  {
    key: "6",
    label: <NavItem name="팝업관리" router="/notice-list-popup" />,
  },
  {
    key: "7",
    label: <NavItem name="쪽지 발송" router="/notice-send-msg" />,
  },
  {
    key: "8",
    label: <NavItem name="쪽지예약발송" router="/notice-message-scheduled" />,
  },
  {
    key: "9",
    label: <NavItem name="쪽지발송내역" router="/notice-message-list" />,
  },
];

export default itemPost;
