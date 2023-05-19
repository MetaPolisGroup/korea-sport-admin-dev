import React, { useRef } from "react";

import { Modal } from "antd";
import { IUser } from "../../../../features/auth";
import { isEmpty } from "lodash";
import Components from "../../../../components";

interface IModalPreviewMember {
  data: IUser | undefined;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const ModalPreviewMember: React.FC<IModalPreviewMember> = ({
  data,
  isModalOpen,
  handleCancel,
}) => {
  const modalRef = useRef<any>();

  if (isEmpty(data)) return null;

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1200}
    >
      <Components.Member user={data} popupRef={modalRef} />
    </Modal>
  );
};

export default ModalPreviewMember;
