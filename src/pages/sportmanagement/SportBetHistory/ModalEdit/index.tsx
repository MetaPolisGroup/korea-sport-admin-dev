import React, { useState, useEffect } from "react";

import { isEmpty } from "lodash";
import "./ModalEditSportBet.scss";
import { Form, Modal } from "antd";
import Components from "../../../../components";
import { queryBuilderFunc } from "../../../../service/queryFunction";
import dayjs from "dayjs";
import form from "antd/es/form";
import { formatDateTime } from "../../../../components/Input/DatePicker";

interface IModalPreviewMember {
  data: any;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const LIST_BTN = [
  {
    id: "btn1",
    title: "스코어 저장",
    onAction: () => {},
  },
  {
    id: "btn2",
    title: "적특처리",
    onAction: () => {},
  },
  {
    id: "btn3",
    title: "경기정보 저장",
    onAction: () => {},
  },
  {
    id: "btn4",
    title: "닫기",
    onAction: () => {},
  },
];

const ModalEditSportBet: React.FC<IModalPreviewMember> = ({
  data,
  isModalOpen,
  handleCancel,
}) => {
  const [match, setMatch] = useState<any>();

  const [homeTeam, setHomeTeam] = useState<any>();
  const [awayTeam, setAwayTeam] = useState<any>();
  const [leagueName, setLeagueName] = useState<any>();
  const [countryleague, setCountryleague] = useState<any>();

  const [form] = Form.useForm();

  const getMatch = async () => {
    const responseMatches: any = await queryBuilderFunc("matches", [
      ["id", "==", data?.match_id],
    ]);

    setMatch(responseMatches?.[0]);
  };

  const getData = async (
    table: string,
    value: string,
    setValue: (res: any) => void
  ) => {
    const response: any = await queryBuilderFunc(table, [["id", "==", value]]);

    setValue(response?.[0]);
  };

  useEffect(() => {
    getMatch();
  }, []);

  useEffect(() => {
    if (!isEmpty(match)) {
      getData("leagues", match?.league?.id, setLeagueName);
      getData("countries", match?.league?.cc, setCountryleague);
      getData("team", match?.home?.id, setHomeTeam);
      getData("team", match?.away?.id, setAwayTeam);
    }
  }, [match]);

  useEffect(() => {
    form?.setFieldsValue({
      countryK: countryleague?.korean_name,
      countryE: countryleague?.name,
      leagueK: leagueName?.korean_name,
      leagueE: leagueName?.name,
      homeK: homeTeam?.korea_name,
      homeE: homeTeam?.name,
      awayK: awayTeam?.korea_name,
      awayE: awayTeam?.name,
      matchTime: dayjs(match?.time * 1000),
    });
  }, [leagueName, homeTeam, awayTeam, countryleague]);

  const renderListBtn = () => {
    return LIST_BTN?.map((btn) => {
      return (
        <button key={btn?.id} className={btn?.id} onClick={btn?.onAction}>
          {btn?.title}
        </button>
      );
    });
  };

  const renderScores = () => {
    if (isEmpty(match?.scores)) return "경기는 아직 끝나지 않았다";

    let scores: {
      title: string;
      key: string | number;
      dataIndex: string | number;
    }[] = [
      {
        key: "title",
        dataIndex: "title",
        title: "구분",
      },
    ];
    let home: any = { title: "HOME" };
    let away = { title: "AWAY" };

    Object?.entries?.(match?.scores)?.map?.((item: any) => {
      scores = [
        ...scores,
        {
          key: item?.[0],
          dataIndex: item?.[0],
          title: `${item?.[0]}In`,
        },
      ];

      home = {
        ...home,
        [item?.[0]]: (
          <Components.Input.Text
            name={`${item?.[0]}Home`}
            initialValue={item?.[1]?.home}
          />
        ),
      };
      away = {
        ...away,
        [item?.[0]]: (
          <Components.Input.Text
            name={`${item?.[0]}Away`}
            initialValue={item?.[1]?.away}
          />
        ),
      };
    });

    const columns = [...scores, { key: "FT", dataIndex: "FT", title: "FT" }];

    const dataTable = [
      {
        ...home,
        FT: (
          <Components.Input.Text
            name="FTHome"
            initialValue={match?.ss?.split("-")?.[0] || "-"}
          />
        ),
      },
      {
        ...away,
        FT: (
          <Components.Input.Text
            name="FTAway"
            initialValue={match?.ss?.split("-")?.[1] || "-"}
          />
        ),
      },
    ];

    return (
      <div>
        <Components.ListingTable columns={columns} datas={dataTable} />
      </div>
    );
  };

  return (
    <Modal
      className="edit-sport-bet"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={700}
    >
      <h3>정보변경</h3>
      <Form form={form}>
        <div className="content">
          <div className="title">국가명(한/영)</div>
          <div>
            <Components.Input.Text name="countryK" />
          </div>
          <div>
            <Components.Input.Text name="countryE" />
          </div>

          <div className="title">리그명(한/영)</div>
          <div>
            <Components.Input.Text name="leagueK" />
          </div>
          <div>
            <Components.Input.Text name="leagueE" />
          </div>

          <div className="title">홈팀(한/영)</div>
          <div>
            <Components.Input.Text name="homeK" />
          </div>
          <div>
            <Components.Input.Text name="homeE" />
          </div>

          <div className="title">원정팀(한/영)</div>
          <div>
            <Components.Input.Text name="awayK" />
          </div>
          <div>
            <Components.Input.Text name="awayE" />
          </div>

          <div className="title">경기시간</div>
          <div>
            <Components.Input.DatePicker
              showTime
              label=""
              name="matchTime"
              initialValue={match?.time}
            />
          </div>
          <div />

          <div className="title">경기/진행 상태</div>
          <div>
            <Components.Input.Select
              label=""
              data={[
                { value: 1, text: "Ended" },
                { value: 2, text: "Closed" },
                { value: 3, text: "Cancelled" },
              ]}
              initialValue={1}
              name="matchProgress1"
            />
          </div>
          <div>
            <Components.Input.Select
              label=""
              data={[
                { value: 1, text: "게임종료" },
                { value: 2, text: "4세트" },
                { value: 3, text: "연장종료" },
              ]}
              initialValue={1}
              name="matchProgress2"
            />
          </div>

          <div className="title">스코어</div>
          <div className="score">{renderScores()}</div>
        </div>
      </Form>

      <div className="footer">{renderListBtn()}</div>
    </Modal>
  );
};

export default ModalEditSportBet;
