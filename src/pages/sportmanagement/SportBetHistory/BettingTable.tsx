import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import { Form } from "antd";
import "./SportBetHistory.scss";
import Components from "../../../components";
import { EyeOutlined } from "@ant-design/icons";

import TableMatchScore from "./TableMatchScore";
import { BET_RESULT, COLUMNS_DETAILS } from "./constants";
import { formatDateTime } from "../../../components/Input/DatePicker";
import { queryBuilderFunc } from "../../../service/queryFunction";

interface IBettingTable {
  data: any;
  setShowModal: (modal: string) => void;
  setBetSelected: (betting: any) => void;
}

const BettingTable: React.FC<IBettingTable> = (props) => {
  const { data, setShowModal, setBetSelected } = props;

  const [sports, setSports] = useState();

  const getSports = async () => {
    const responseSports: any = await queryBuilderFunc("sports", []);

    return setSports(responseSports);
  };

  useEffect(() => {
    getSports();
  }, []);

  const _dataTable = data?.betting?.map((betting: any) => {
    const matchDate = dayjs(betting?.time).format(formatDateTime);

    const sportCountry = (sports as any)?.filter(
      (item: any) => item?.id === betting?.sport_id
    )?.[0]?.korean_name;

    const event = (
      <>
        {sportCountry}
        <br /> {betting?.league}
      </>
    );
    const homeTeam = betting?.home_team;
    const awayTeam = betting?.away_team;
    const oddType = betting?.odd_type;
    const oddTeam = betting?.odd?.team;
    const odds = betting?.odd?.odds;

    const score = <TableMatchScore matchID={betting?.match_id} />;

    const matchStatus = betting?.match_status === 0 ? "upcoming" : "Ended";

    const progress = (
      <div className="progress">
        게임종료 <EyeOutlined />
      </div>
    );

    const result = (
      <Form>
        <Components.Input.Select
          label=""
          name="result"
          initialValue={betting?.bet_result}
          data={BET_RESULT}
        />
      </Form>
    );

    const setting = (
      <div className="setting">
        <button onClick={() => setShowModal("CONFIRM")}>저장</button>
        <button
          onClick={() => {
            setBetSelected(betting);
            setShowModal("EDIT");
          }}
        >
          수정
        </button>
      </div>
    );

    return {
      odds,
      event,
      score,
      result,
      oddTeam,
      setting,
      oddType,
      homeTeam,
      awayTeam,
      progress,
      matchDate,
      matchStatus,
    };
  });

  return (
    <div className="betting-table">
      <Components.ListingTable
        datas={_dataTable}
        columns={COLUMNS_DETAILS()}
        srollX={"none"}
        srollY={"none"}
      />
      <div className="betting-table__footer">
        <div>배팅시간 : {data?.created_at_layout}</div>
        <div>
          [배팅금액 : <span>{data?.amount.toLocaleString("en-US")}</span> 배당 :{" "}
          <span>{data?.total_odds_layout}</span>] <span>{data?.status}</span>
          당첨금액 : <span>{data?.winning_amount_layout}</span>
        </div>
      </div>
    </div>
  );
};

export default BettingTable;
