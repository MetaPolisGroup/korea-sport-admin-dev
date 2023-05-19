import React, { useState, useEffect, useRef } from "react";

import "./userList.scss";
import { COLUMNS } from "./columns";
import { Button, Modal } from "antd";
import CreateMember from "./createMember";

import Components from "../../../components";
import axiosClient from "../../../api/axiosClient";
import { useAppSelector } from "../../../app/hook";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getAllDocuments,
  queryBuilderFunc,
} from "../../../service/queryFunction";
import debounce from "lodash.debounce";

import dayjs from "dayjs";
import Utils from "../../../utils";
import { formatDateTime } from "../../../components/Input/DatePicker";
import { IUser } from "../../../features/auth";

interface TModal {
  isOpen: boolean;
  type: string;
  callback: () => void;
}

const MemberList: React.FC = () => {
  const [dataTable, setDataTable] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [refresh, setRefresh] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [btnActive, setBtnActive] = useState<string>("all_members");
  const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<TModal>({
    isOpen: false,
    type: "",
    callback: () => {},
  });

  const searchValue = useRef<string>("");

  const { auth } = useAppSelector((state) => state.auth);

  const LIST_BTN = [
    {
      id: "btn1",
      type: "Excel",
      title: "Excel",
      action: () => {
        handleExportFile();
      },
    },
    {
      id: "btn2",
      type: "new_writing",
      title: "신규작성",
      action: () => setIsShowModalCreate(true),
    },
    {
      id: "btn3",
      type: "Normal",
      title: "접속회원",
      action: () => {
        handleFilterData("Normal");
      },
    },
    {
      id: "btn4",
      type: "Blocked",
      title: "차단회원",
      action: () => {
        handleFilterData("Blocked");
      },
    },
    {
      id: "btn5",
      type: "all_members",
      title: "전체회원",
      action: () => {
        handleFilterData("all_members");
      },
    },
  ];

  // const getIPUser = async (idUser: string) => {
  //   const response: any = await queryBuilderFunc("logs", [
  //     ["user_id", "==", idUser],
  //   ]);

  //   return response?.[0]?.ip ?? "";
  // };

  const getData = async () => {
    let response: any = await queryBuilderFunc("users", []);

    const formatData = await Promise.all(
      response?.map?.(async (data: any) => {
        // const logUserIP = await getIPUser(data?.id);

        const dateTimeLogin = dayjs(data?.last_login).format(formatDateTime);

        const dateTimeCreate = dayjs(data?.created_at).format(formatDateTime);

        const id_layout = <div className="user-id">{data?.id}</div>;

        const last_login_layout = (
          <div>
            <div>{dateTimeLogin}</div>
            {/* <div>{logUserIP}</div> */}
          </div>
        );

        const cumulative_settlement_layout = (
          <span className="cumulative-settlement">
            {data?.cumulative_settlement.toLocaleString("en-US")}
          </span>
        );

        const setting_layout =
          data?.situation === "Normal" ? (
            <button
              className="btn-setting-block"
              onClick={() =>
                setShowModal({
                  isOpen: true,
                  type: "Blocked",
                  callback: () => handleChangeStatusUser(data?.id, "Blocked"),
                })
              }
            >
              차단
            </button>
          ) : data?.situation === "Blocked" ? (
            <button
              className="btn-setting-unblock"
              onClick={() =>
                setShowModal({
                  isOpen: true,
                  type: "Normal",
                  callback: () => handleChangeStatusUser(data?.id, "Normal"),
                })
              }
            >
              차단해제
            </button>
          ) : null;

        return {
          ...data,
          id_layout,
          setting_layout,
          dateTimeLogin,
          dateTimeCreate,
          last_login_layout,
          cumulative_settlement_layout,
          point: data?.point.toLocaleString("en-US"),
          balance: data?.balance.toLocaleString("en-US"),
          cumulative_deposit: data?.cumulative_deposit.toLocaleString("en-US"),
          cumulative_withdraw:
            data?.cumulative_withdraw.toLocaleString("en-US"),
        };
      })
    );

    setIsLoading(false);
    setDataTable(formatData as any);
  };

  useEffect(() => {
    getData();
   
  }, [refresh]);

  useEffect(() => {
    if ((dataTable as any)?.length !== 0) {
      return handleFilterData(btnActive);
    }
  }, [dataTable]);

  const handleFilterData = (type: string) => {
    const valueSearch = searchValue?.current;

    if (type !== "all_members") {
      const _dataFilter =
        (dataTable as any)?.filter(
          (user: any) =>
            (user?.id?.includes(valueSearch) ||
              user?.nickname?.includes(valueSearch)) &&
            user?.situation === type
        ) ?? [];
      return setDataFilter(_dataFilter);
    }

    const _dataFilter =
      (dataTable as any)?.filter(
        (user: any) =>
          user?.id?.includes(valueSearch) ||
          user?.nickname?.includes(valueSearch)
      ) ?? [];
    return setDataFilter(_dataFilter);
  };

  const handleExportFile = () => {
    const dataOrigin = dataFilter ?? [];

    const dataExport =
      dataOrigin?.map?.((item: any) => ({
        situation: item?.situation,
        partner_id: item?.partner_id,
        dateTimeCreate: item?.dateTimeCreate,
        dateTimeLogin: item?.dateTimeLogin,
        level: item?.level,
        user_id: item?.id,
        nickname: item?.nickname,
        phone: item?.phone,
        recommend_id: item?.recommend_id,
        balance: item?.balance,
        point: item?.point,
        cumulative_deposit: item?.cumulative_deposit,
        cumulative_withdraw: item?.cumulative_withdraw,
        cumulative_settlement_layout: item?.cumulative_settlement_layout,
      })) ?? [];

    Utils.excel({ data: dataExport, name: "ListMember" });
  };

  const handleCloseModal = () => {
    return setShowModal({ ...showModal, isOpen: false });
  };

  const handleChangeStatusUser = (userID: string, status: string) => {
    const url = `/member/situations/${userID}`;
    const inputApi = {
      status,
      admin_id: auth?.id,
      note: "note",
    };

    axiosClient.put(url, inputApi).then(() => {
      setRefresh(!refresh);
      return handleCloseModal();
    });
  };

  const handleSearch = (value: string) => {
    searchValue.current = value;
    handleFilterData(btnActive);
  };

  const delayedHandleChange = debounce(
    (valueInput) => handleSearch(valueInput),
    300
  );

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h2>유저 목록</h2>
      </div>
      <div className="user-list__content">
        <div className="content-header">
          <div className="list-btn">
            {LIST_BTN?.map?.((btn) => {
              return (
                <Button
                  key={btn?.id}
                  onClick={() => {
                    setBtnActive(btn?.type);
                    btn?.action?.();
                  }}
                  className={btn?.type === btnActive ? "active" : ""}
                >
                  {btn?.title}
                </Button>
              );
            })}
          </div>
          {/* <div className="search">
            <span>Search:</span>
            <Components.Input.Text
              onChange={(e: any) => {
                let inputValue = e?.target?.value;

                delayedHandleChange(inputValue);
              }}
            />
          </div> */}
        </div>

        <Components.ListingTable
          loading={isLoading}
          srollX={2000}
          columns={COLUMNS()}
          datas={dataFilter}
        />
      </div>

      <Modal
        open={showModal?.isOpen}
        onCancel={() => handleCloseModal()}
        footer={false}
        className="modal-member-list"
      >
        <ExclamationCircleOutlined />

        <p>
          {showModal?.type === "Blocked"
            ? "해당 유저를 차단 하시겠습니까?"
            : "해당 유저를 정상 전환 하시겠습니까?"}
        </p>
        <div className="box-btn">
          <button
            onClick={() => {
              setIsLoading(true);
              showModal?.callback?.();
            }}
          >
            확인
          </button>
          <button onClick={() => handleCloseModal()}>Cancel</button>
        </div>
      </Modal>

      <CreateMember
        isOpen={isShowModalCreate}
        onClose={() => {
          setIsShowModalCreate(false);
          setRefresh(!refresh);
        }}
      />
    </div>
  );
};

export default MemberList;

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
      date_time: "date_time",
    },
  });
