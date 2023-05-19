import React from "react";
import {
  Col,
  Layout,
  Row,
  Avatar,
  Space,
  MenuProps,
  Dropdown,
  Button,
} from "antd";
import {
  SoundOutlined,
  FileTextOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/useTheme";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { Logout } from "../../../features/auth";

import "./index.scss";

const Header: React.FC = () => {
  const { handleChangeTheme, theme } = React.useContext(ThemeContext);
  const { name } = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            dispatch(Logout());
            localStorage.clear();
            navigate("/login");
          }}
        >
          로그아웃
        </span>
      ),
    },
    {
      key: "2",
      label: <span>주야간 모드 변경</span>,
      onClick: () => handleChangeTheme(),
    },
    {
      key: "3",
      label: <NavLink to="/">버전</NavLink>,
    },
  ];
  return (
    <Layout.Header className="wrapper-header">
      <Row>
        <Col xl={2} xxl={3}>
          <NavLink to="/" className="header-left">
            <img
              src="/vite.svg"
              style={{ objectFit: "cover", width: "100%" }}
            />
          </NavLink>
        </Col>
        <Col xl={19} xxl={18} className="header-right">
          <Space size={25} style={{ fontSize: 20 }}>
            <SoundOutlined />
            <FileTextOutlined />
          </Space>
          <Space className="wrapper-list" size={13}>
            {listNav.map((it, idx) => (
              <div key={idx} className="item-list">
                <NavLink to={it.path} style={{ color: it.color }}>
                  {it.name}
                </NavLink>
                <span>{it.value}</span>
              </div>
            ))}
          </Space>
        </Col>
        <Col
          xl={3}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: 30,
          }}
        >
          <Dropdown
            menu={{ items }}
            overlayStyle={{ top: "65px" }}
            trigger={["click"]}
            placement="bottom"
          >
            <Space align="center" style={{ cursor: "pointer" }}>
              <Avatar size={40} icon={<UserOutlined />} />
              <strong style={{ color: theme === "dark" ? "white" : "black" }}>
                {name}
              </strong>
              <DownOutlined size={20} />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default React.memo(Header);

const listNav = [
  { name: "입금 신청: ", value: 0, path: "/payment-deposit", color: "#43B1E5" },
  {
    name: "출금 신청: ",
    value: 0,
    path: "/payment-withdraw",
    color: "#FF504F",
  },
  { name: "신규가입: ", value: 0, path: "/member-list", color: "#A2E8BE" },
  { name: "1:1문의: ", value: 0, path: "/notice-qna-list", color: "#6F7CD2" },
  {
    name: "스포츠 베팅: ",
    value: 0,
    path: "/sport-bet-list",
    color: "#A2E8BE",
  },
  {
    name: "실시간 베팅: ",
    value: 0,
    path: "/sport-live",
    color: "#FF504F",
  },
  {
    name: "미니게임 베팅: ",
    value: 0,
    path: "/bet-history/1",
    color: "#6F7CD2",
  },
  {
    name: "영상게임 베팅: ",
    value: 0,
    path: "/bet-history/2",
    color: "#43B1E5",
  },
  {
    name: "파트너 출금 신청: ",
    value: 0,
    path: "/partner-brc-withdraw-list",
    color: "#43B1E5",
  },
  {
    name: "파트너 입금 신청: ",
    value: 0,
    path: "/partner-brc-deposit-list",
    color: "#43B1E5",
  },
];
