import React, { useState, useEffect, useRef } from "react";

import "./message.scss";
import { COLUMNS } from "./columns";
import { Button, Modal } from "antd";
import debounce from "lodash.debounce";

import SendingNote from "../SendingNote";
import Components from "../../../components";
import axiosClient from "../../../api/axiosClient";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { queryBuilderFunc } from "../../../service/queryFunction";
import { handleExcel } from "..";

const MessageList: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [dataTable, setDataTable] = useState<any>();
  const [currentNotification, setCurrentNotification] = useState<any>();
  const [showModal, setShowModal] = useState<{ isShow: boolean; type: string }>(
    { isShow: false, type: "" }
  );

  const searchValue = useRef<string>("");

  const LIST_BTN = [
    {
      id: "btn1",
      title: "뛰어나다",
      action: () => handleExcel(dataTable, "template"),
    },
    {
      id: "btn2",
      title: "신규작성",
      action: () => handleToggleModal("CREATE_NOTI"),
    },
  ];

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    const valueSearch = searchValue?.current;

    let response: any = await queryBuilderFunc(
      "notifications",
      [
        ["type", "==", "Send note"],
        ["status", "in", ["Active", "Inactive"] as any],
      ]
      // [{ field: 'status', direction: 'asc' }, { field: 'created_at', direction: 'desc' }]
    );

    if (response?.length === 0) return null;

    if (valueSearch !== undefined || valueSearch !== "") {
      response = response?.filter(
        (noti: any) =>
          noti?.title?.includes(valueSearch) ||
          noti?.content?.includes(valueSearch)
      );
    }

    setDataTable(
      response?.map((data: any, index: number) => {
        const date = new Date(data?.specify_date);

        const specify_date_layout = !Number.isNaN(date?.getFullYear())
          ? `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDate()} ${date?.getHours()}:${date?.getMinutes()}`
          : "--:--:--";

        const send_type_layout = (
          <div className="transmission-type">{data?.send_type}</div>
        );

        const sending_status = (
          <div className={data?.sending_status}>{data?.sending_status}</div>
        );

        // Check value
        const setting =
          data?.sending_status !== "Waiting" ? (
            <div className="setting">
              <button
                className="btn-edit"
                onClick={() => handleToggleModal("EDIT_NOTI", data)}
              >
                수정
              </button>
              <button
                className="btn-delete"
                onClick={() => handleToggleModal("CONFIRM_DELETE", data)}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className="setting">
              <button
                className="btn-delete"
                onClick={() => handleToggleModal("CONFIRM_DELETE", data)}
              >
                삭제
              </button>
            </div>
          );

        return {
          ...data,
          number: index + 1,
          specify_date_layout,
          send_type_layout,
          sending_status,
          setting,
        };
      })
    );
  };

  const handleDeleteNotification = () => {
    const url = `/notification/${currentNotification?.id}/delete`;
    axiosClient.get(url)?.then(() => setRefresh(!refresh));
    setCurrentNotification({});
    handleToggleModal();
  };

  const handleToggleModal = (type: string = "", notifications: any = {}) => {
    setCurrentNotification(notifications);
    setShowModal({
      type,
      isShow: !showModal.isShow,
    });
  };

  const handleSearch = (value: string) => {
    searchValue.current = value;
    setRefresh(!refresh);
  };

  const delayedHandleChange = debounce(
    (valueInput) => handleSearch(valueInput),
    500
  );

  const renderModal = () => {
    if (showModal?.isShow === false) return null;

    const renderContentModal = () => {
      if (showModal?.type === "CONFIRM_DELETE") {
        return (
          <div className="comfirm-delete">
            <ExclamationCircleOutlined />
            <h4>해당 데이터를 삭제처리 하시겠습니까?</h4>
            <p>삭제시 복구가 불가능 합니다.</p>
            <div className="footer">
              <button onClick={() => handleDeleteNotification()}>확인</button>
              <button onClick={() => handleToggleModal()}>Cancel</button>
            </div>
          </div>
        );
      }

      return (
        <div>
          <SendingNote
            mode={showModal?.type}
            dataDefault={currentNotification}
            onCloseModal={() => {
              handleToggleModal();
              setRefresh(!refresh);
            }}
          />
        </div>
      );
    };

    return (
      <Modal
        open={showModal?.isShow}
        onCancel={() => {
          handleToggleModal();
        }}
        footer={false}
        className={`message-modal ${
          showModal?.type !== "CONFIRM_DELETE"
            ? "message-form"
            : "message-confirm"
        }`}
      >
        {renderContentModal()}
      </Modal>
    );
  };

  return (
    <div className="message">
      <div className="message__header">
        <h2>메세지 예약 발송</h2>
      </div>
      <div className="message__content">
        <div className="box-btn">
          {LIST_BTN?.map?.((item) => {
            return (
              <Button key={item?.id} onClick={item?.action}>
                {item?.title}
              </Button>
            );
          })}
        </div>
        {/* <div className="search">
          <p>Search:</p>
          <Components.Input.Text
            onChange={(e) => {
              let inputValue = e
              delayedHandleChange(inputValue);
            }}
          />
        </div> */}
      </div>
      <div className="box-table">
        <Components.ListingTable<any> columns={COLUMNS} datas={dataTable} />
      </div>

      {renderModal()}
    </div>
  );
};

export default MessageList;
