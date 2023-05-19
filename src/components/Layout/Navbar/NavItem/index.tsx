import React from "react";
import { NavLink } from "react-router-dom";

interface ItemProps {
    name: string, router: string
}

const NavItem: React.FC<ItemProps> = ({ name, router }) => {
    return <NavLink style={({ isActive, isPending }) => {
        return {
            color: isActive ? "#2BABE3" : "",
            fontWeight: isActive ? "bold" : "",
        };
    }} to={router} >
        <span>{name}</span>
    </NavLink >
}

export default NavItem