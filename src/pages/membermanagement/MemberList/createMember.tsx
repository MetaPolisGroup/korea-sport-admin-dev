import React from "react";

import "./createMember.scss";
import { Form, Modal } from "antd";
import Components from "../../../components";
import { useAppSelector } from "../../../app/hook";

import axiosClient from "../../../api/axiosClient";
import { queryBuilderFunc } from "../../../service/queryFunction";

interface TCreateMember {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMember: React.FC<TCreateMember> = (props) => {
  const { isOpen, onClose } = props;

  const { auth } = useAppSelector((state) => state.auth);

  const handleCheckFieldInDB = async (
    fieldName: string,
    value: string | undefined,
    table: string = "users"
  ) => {
    if (value === "") return false;

    const response = await queryBuilderFunc(table, [
      [fieldName, "==", value as string]
    ]);

    return response?.length > 0 ? false : true;
  };

  const handleSubmit = (data: any) => {
    delete data?.affiliated_partner;
    const url = "/member/create";
    axiosClient
      .post(url, {
        ...data,
        subCode: auth?.sub_code as string,
        recommendId: "",
      })
      .then(() => {
        onClose?.();
      });
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={false}
      title="신규 생성"
      width={780}
      className="create-member"
    >
      <Form className="from-create-member" onFinish={handleSubmit}>
        <div className="lable">소속파트너</div>
        <Components.Input.Text
          name="affiliated_partner"
          initialValue={auth?.id as string}
          disabled
        />

        <div className="lable">유저아이디 *</div>
        <Components.Input.Text
          name="id"
          rules={[
            {
              required: true,
              validator: async (_, value) => {
                if (value?.length === 0)
                  return Promise.reject("사용자 이름을 입력하세요!");

                const isNotHaveData = await handleCheckFieldInDB("id", value);
                if (!isNotHaveData)
                  return Promise.reject("이미 존재하는 정보!");
              },
            },
          ]}
        />

        <div className="lable">닉네임 *</div>
        <Components.Input.Text
          name="nickname"
          rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
        />

        <div className="lable">핸드폰 *</div>
        <Components.Input.Text
          name="phone"
          rules={[
            {
              required: true,
              message: "필드가 필요합니다",
              validator: async (_, value) => {
                if (value?.length === 0)
                  return Promise.reject("전화번호를 입력해주세요!");

                const isNotHaveData = await handleCheckFieldInDB(
                  "phone",
                  value
                );
                if (!isNotHaveData)
                  return Promise.reject("이미 존재하는 정보!");
              },
            },
          ]}
        />

        <div className="lable">비밀번호 *</div>
        <Components.Input.Text
          name="password"
          type="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
        />

        <div className="lable">은행 *</div>
        <Components.Input.Text
          name="bankName"
          rules={[{ required: true, message: "은행명을 입력해주세요!" }]}
        />

        <div className="lable">계좌명 *</div>
        <Components.Input.Text
          name="bankAccountHolder"
          rules={[{ required: true, message: "계정 이름을 입력하세요!" }]}
        />

        <div className="lable">계좌번호 *</div>
        <Components.Input.Text
          name="bankAccountNumber"
          rules={[
            {
              required: true,
              message: "필드가 필요합니다",
              validator: async (_, value) => {
                if (value?.length === 0)
                  return Promise.reject("계좌번호를 입력해주세요!");

                const isNotHaveData = await handleCheckFieldInDB(
                  "bank.account_number",
                  value
                );
                if (!isNotHaveData)
                  return Promise.reject("이미 존재하는 정보!");
              },
            },
          ]}
        />

        <div className="box-btn">
          <button onClick={onClose}>닫기</button>
          <button className="submit" type="submit">
            저장
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateMember;

CreateMember.defaultProps = {
  isOpen: false,
  onClose: () => { },
};
