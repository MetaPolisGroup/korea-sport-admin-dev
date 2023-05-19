import React from "react";

import "./index.scss";
import ItemList from "./ListItem";
import { Dropdown, Space } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { DashboardOutlined } from "@ant-design/icons";

interface INavbarProps { }
interface ComponentNav extends React.FC<INavbarProps> { }


const Navbar: ComponentNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const handleCheckNavActive = (UrlNav: string[]) => {
    const urlFilter = UrlNav.filter((url) => pathname?.includes(url));

    return urlFilter?.length > 0 ? "active" : "";
  };

  return (
    <nav className="nav-wrapper">
      <Space
        align="center"
        style={{ fontSize: 16 }}
        className={pathname === "/" ? "active" : ""}
      >
        <DashboardOutlined />
        <NavLink to='/'>
          <p>Dashboard</p>
        </NavLink>
      </Space>
      {ItemList.map((it, idx) => {
        const { items, icon, name, urlActive } = it;
        return (
          <Dropdown
            key={idx}
            menu={{ items, className: "custom-menu-item" }}
            placement="bottom"
          >
            <Space
              style={{ fontSize: 16 }}
              className={handleCheckNavActive(urlActive)}
            >
              {icon}
              {name}
            </Space>
          </Dropdown>
        );
      })}
    </nav>
  );
};

export default React.memo(Navbar);
