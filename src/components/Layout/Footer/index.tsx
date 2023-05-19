import { Layout } from "antd";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ display: "flex", justifyContent: "center" }}>
      저작권 © 2023 다낭. 판권 소유
    </Layout.Footer>
  );
};

export default React.memo(Footer);
