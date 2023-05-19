import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useAppSelector } from "../../app/hook";
import "./index.scss";
import Components from "../../components";

interface FormValues {
  id: string;
  password: string;
}

const Login = () => {
  const { auth, isLogging } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const submit = useSubmit();

  const onFinish = (values: FormValues) => {
    submit({ ...values }, { method: "post" });
  };

  React.useEffect(() => {
    if (auth.id) navigate("/sport-match-list");
  }, [auth.id]);

  console.log(auth.id);

  return (
    <div className="wrapper-login-page">
      <div className="form-login">
        <Form name="basic" onFinish={onFinish} layout="vertical">
          <h2>로그인</h2>
          <Form.Item
            label="사용자 이름"
            name="id"
            rules={[
              {
                required: true,
                message: "사용자 이름을 입력하세요 !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요 !",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            {isLogging ? (
              <Components.Loading
                style={{ justifyContent: "flex-start", marginLeft: 10 }}
              />
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{
                  marginTop: 10,
                }}
              >
                로그인
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
