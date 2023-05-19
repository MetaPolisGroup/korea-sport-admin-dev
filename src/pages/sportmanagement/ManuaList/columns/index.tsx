import { Button, FormInstance, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import Input from "../../../../components/Input";
import Popup, { PopupRef } from "../../../../components/Popup";
import Box from "../../../../components/Box";
import dayjs from "dayjs";

const getColumns = (form: any): ColumnsType<any> => {
  return [
    // Table.SELECTION_COLUMN,
    // Table.EXPAND_COLUMN,
    {
      title: "경기번호",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_, data) => {
        return <p>{data.id}</p>;
      },
    },
    {
      title: "종목",
      dataIndex: "sport_id",
      key: "sport_id",
      align: "center",
      render: (_, data) => {
        return (
          <Box<{ korean_name: string }>
            id={data.sport_id}
            collectionName="sports"
            filters={[["id", "==", data.sport_id]]}
            render={(item) => {
              return <span>{item?.korean_name}</span>;
            }}
          />
        );
      },
    },
    {
      title: "국가",
      dataIndex: "league",
      key: "league",
      align: "center",
      render: (_, data, idx) => {
        return (
          <Box<{ korean_name: string }>
            id={data.league.cc}
            collectionName="countries"
            filters={[["id", "==", data.league.cc]]}
            render={(item) => {
              return <Input.Text value={item?.korean_name} />;
            }}
          />
        );
      },
    },
    {
      title: "리그",
      dataIndex: "league",
      key: "league",
      align: "center",
      render: (_, data, idx) => (
        <Box<{ korean_name: string }>
          id={data.league.id}
          collectionName="leagues"
          filters={[["id", "==", data.league.id]]}
          render={(item) => {
            return <Input.Text value={item?.korean_name} />;
          }}
        />
      ),
    },
    {
      title: "홈팀",
      dataIndex: "home",
      key: "home",
      align: "center",
      render: (_, data, idx) => (
        <Input.Text name={"home" + idx} initialValue={data?.home.name} />
      ),
    },
    {
      title: "원정팀",
      dataIndex: "away",
      key: "away",
      align: "center",
      render: (_, data, idx) => (
        <Input.Text name={"away" + idx} initialValue={data?.away.name} />
      ),
    },
    {
      title: "시작시간",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (_, data, idx) => {
        return (
          <Input.Text
            name={"time" + idx}
            initialValue={dayjs(+data.time).format("YYYY-MM-DD HH:mm:ss")}
          />
        );
      },
    },
    {
      title: "설정",
      dataIndex: "",
      key: "",
      align: "center",
      render: (_, data, idx) => {
        const btnEditRef = React.createRef<PopupRef>();
        return (
          <div>
            <Popup
              ref={btnEditRef}
              title="정보 변경"
              width={650}
              footer
              // content={<ContentUpdate status={status} type={type} data={data} onCancel={() => btnEditRef.current?.close()} />}
              selector={
                <div>
                  <Button onClick={(e) => btnEditRef.current?.open()}>
                    결과를 입력하십시오
                  </Button>
                </div>
              }
            />
          </div>
        );
      },
    },
  ];
};
export { getColumns };
