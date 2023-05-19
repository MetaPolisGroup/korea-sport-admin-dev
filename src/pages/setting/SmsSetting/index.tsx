import { Form, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Components from "../../../components";

const SMSSetting = () => {
  return <React.Fragment>
    <h2>SMS 설정</h2>
    <Form style={{ marginTop: 50 }}>
      <Space direction="vertical">
        <Space size={50}>
          <span>아이코드 서비스 신청</span>
          <div>
            <Link to='http://icodekorea.com/res/join_company_fix_a.php?sellid=sir2'>http://icodekorea.com/res/join_company_fix_a.php?sellid=sir2</Link>
            <span> (한국IP로 접속!, 건당 16원)</span>
          </div>
        </Space>
        <Space size={50}>
          <span>아이코드 회원아이디</span>
          <Components.Input.Text style={{ width: 150 }} name="id" />
        </Space>
        <Space size={50}>
          <span>아이코드 패스워드</span>
          <Components.Input.Text style={{ width: 150, marginLeft: 12 }} name="password" />
        </Space>
        <Space size={50}>
          <span>요금제</span>
        </Space>
        <Space size={50}>
          <span>회신번호</span>
          <Components.Input.Text name="contact" style={{ marginLeft: 65, width: 150 }} />
        </Space>
      </Space>
    </Form>
  </React.Fragment>;
};

export default SMSSetting;
