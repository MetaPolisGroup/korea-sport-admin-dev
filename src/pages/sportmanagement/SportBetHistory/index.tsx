import React, { useEffect, useRef, useState } from "react";

import dayjs from "dayjs";
import { Form } from "antd";
import { Button } from "antd";
import "./SportBetHistory.scss";

import BettingTable from "./BettingTable";
import ModalConfirm from "./ModalConfirm";
import ModalEditSportBet from "./ModalEdit";
import ModalPreviewMember from "./ModalPreviewMember";

import Components from "../../../components";
import { IUser } from "../../../features/auth";
import { formatDateTime } from "../../../components/Input/DatePicker";
import { queryBuilderFunc } from "../../../service/queryFunction";

import { COLUMNS, SELECT_OPTION, LIST_BTN } from "./constants";

interface ISportBetHistory {}

const SportBetHistory: React.FC<ISportBetHistory> = () => {
  const [data, setData] = useState<any>([]);
  const [refresh, setRefresh] = useState<boolean>();
  const [showModal, setShowModal] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [betSelected, setBetSelected] = useState();
  const [userSelected, setUserSelected] = useState<IUser>();
  const [modePreView, setModePreview] = useState<string>(
    "waitingForSettlement"
  );

  const dateFillter = useRef<any>({
    from: dayjs().add(-1, "day"),
    to: dayjs(),
  });

  const handleGetStatus = () => {
    let status = ["status", "==", "Waiting for settlement"];
    if (modePreView === "redSpecial" || modePreView === "betCancellation")
      status = ["status", "==", "Cancel"];

    if (modePreView === "lost") status = ["status", "==", "Lose"];

    if (modePreView === "win") status = ["status", "==", "Win"];

    if (modePreView === "settlementComplete")
      status = ["status", "!=", "Waiting for settlement"];

    return status;
  };

  const getData = async () => {
    const status = handleGetStatus();

    const dateFrom = dayjs(dateFillter?.current?.from).unix() * 1000;
    const dateTo = dayjs(dateFillter?.current?.to).unix() * 1000;

    const responseBets: any = await queryBuilderFunc("bets", [
      status as any,
      ["created_at", ">=", dateFrom],
      ["created_at", "<=", dateTo],
    ]);

    const dataFormat = responseBets?.map?.((item: any) => {
      const status_layout = <div className={item?.status}>{item?.status}</div>;

      const created_at_layout = dayjs(item?.created_at).format(formatDateTime);

      return {
        ...item,
        betType: "프리매치",
        payment: "지급완료",
        status_layout,
        created_at_layout,
        total_odds_layout: item?.total_odds?.toLocaleString("en-US"),
        winning_amount_layout: item?.winning_amount?.toLocaleString("en-US"),

        setUserSelected,
        setShowModal: (modal: string) => setShowModal([...showModal, modal]),
      };
    });

    setIsLoading(false);
    setData(dataFormat);
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const renderListBtn = () => {
    return (
      <div className="box-btn">
        {LIST_BTN?.map?.((btn) => (
          <Button
            key={btn?.id}
            className={modePreView === btn?.id ? "active" : ""}
            onClick={() => {
              if (btn?.id === "Excel") return;

              setModePreview(btn?.id);
              setIsLoading(true);
              setRefresh(!refresh);
              return btn?.onAction();
            }}
          >
            {btn?.title}
          </Button>
        ))}
      </div>
    );
  };

  const renderModal = () => {
    if (showModal?.includes("EDIT")) {
      return (
        <ModalEditSportBet
          data={betSelected}
          isModalOpen
          handleCancel={() =>
            setShowModal(showModal?.filter((item) => item !== "EDIT"))
          }
        />
      );
    }

    if (showModal?.includes("CONFIRM")) {
      return (
        <ModalConfirm
          isModalOpen
          handleCancel={() =>
            setShowModal(showModal?.filter((item) => item !== "CONFIRM"))
          }
        />
      );
    }
    if (showModal?.includes("PREVIEW_USER")) {
      return (
        <ModalPreviewMember
          isModalOpen
          data={userSelected}
          handleCancel={() =>
            setShowModal(showModal?.filter((item) => item !== "PREVIEW_USER"))
          }
        />
      );
    }

    return null;
  };

  return (
    <div className="sport-bet-his">
      <div className="sport-bet-his__header">
        <h3>스포츠 베팅내역</h3>

        <div className="box-filter">
          <div>
            <p>From</p>
            <Form>
              <Components.Input.DatePicker
                label=""
                name="from"
                initialValue={dayjs(dateFillter?.current?.from) ?? ""}
                onChange={(date) => {
                  dateFillter.current.from = date;
                  setRefresh(!refresh);
                }}
              />
            </Form>
          </div>
          <div>
            <p>To</p>
            <Form>
              <Components.Input.DatePicker
                label=""
                name="to"
                initialValue={dayjs(dateFillter?.current?.to) ?? ""}
                onChange={(date) => {
                  dateFillter.current.to = date;
                  setRefresh(!refresh);
                }}
              />
            </Form>
          </div>
          <div>
            <p>LIVE / PRE</p>
            <Components.Input.Select
              initialValue={1}
              defaultValue="전체"
              data={SELECT_OPTION}
              label=""
            />
          </div>
        </div>
      </div>

      <div className="sport-bet-his__content">
        <div className="header">
          {renderListBtn()}
          <div>
            search:
            <Components.Input.Text />
          </div>
        </div>

        <Components.ListingTable
          loading={isLoading}
          columns={COLUMNS()}
          datas={data}
          srollX={2000}
          pagination
          expandable={(dataRow) => (
            <BettingTable
              data={dataRow}
              setShowModal={(modal) => {
                setShowModal([...showModal, modal]);
              }}
              setBetSelected={setBetSelected}
            />
          )}
        />
      </div>

      {renderModal()}
    </div>
  );
};

export default SportBetHistory;
