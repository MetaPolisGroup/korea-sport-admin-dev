import React from "react";

import "./ModalConfirm.scss";
import { Form, Modal } from "antd";
import Components from "../../../../components";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface IModalConfirm {
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalConfirm: React.FC<IModalConfirm> = ({
  isModalOpen,
  handleCancel,
}) => {
  return (
    <Modal width={500} open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form className="modal-confirm">
        <QuestionCircleOutlined />
        <p>베팅 결과를 수정하시는게 맞으신가요?</p>
        <Components.Input.Text
          type="password"
          name="password"
          placeholder="설정된 비밀번호를 입력해주세요."
        />
        <div className="box-btn">
          <button>확인</button>
          <button>Cancel</button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalConfirm;
