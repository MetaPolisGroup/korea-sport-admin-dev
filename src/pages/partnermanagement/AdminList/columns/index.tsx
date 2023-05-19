import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React from "react";
import { IPartnerManageMent } from "../../../../api/partnersApi";
import { formatDateTime } from "../../../../components/Input/DatePicker";
import Popup, { PopupRef } from "../../../../components/Popup";
import Create from "../create";

const getColumns = (partners: IPartnerManageMent[]): ColumnsType<IPartnerManageMent> => {

  return [
    {
      title: "번호",
      align: "center",
      width: 100,
      render: (a, b, c) => <span>{c + 1}</span>
    },
    {
      title: "소속",
      align: "center",
      key: 'partner_id',
      dataIndex: 'partner_id',
    },
    {
      title: "아이디",
      align: "center",
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: "이름",
      align: "center",
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: "상태",
      align: "center",
      key: 'situation',
      dataIndex: 'situation'
    },
    {
      title: "최근로그인",
      align: "center",
      key: 'last_login',
      dataIndex: 'last_login',
      render: (a) => <p>{dayjs(a).format(formatDateTime)}</p>
    },
    {
      title: "생성일",
      align: "center",
      key: 'created_at',
      dataIndex: 'created_at',
      render: (a) => <p>{dayjs(a * 1000).format(formatDateTime)}</p>
    },
    {
      title: "설정",
      align: "center",
      render: () => {
        const editRef = React.createRef<PopupRef>()

        return <Space>
          <Popup
            ref={editRef}
            selector={<Button onClick={() => editRef.current?.open()}>Edit</Button>}
            content={<Create partners={partners} />}
          />
          <Button>보유머니 관리</Button>
        </Space>
      }
    },
  ]
};
export { getColumns };
