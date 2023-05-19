import React, { useState, useEffect } from "react";

import "./realtime.scss";
import dayjs from "dayjs";
import { Button } from "antd";
import { getColumns } from "./columns";

import Components from "../../../components";
import { formatDateTime } from "../../../components/Input/DatePicker";
import { queryBuilderFunc } from "../../../service/queryFunction";

const RealTime = () => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    queryBuilderFunc(
      "partners",
      [["block", "==", false]],
      undefined,
      undefined,
      (docs) => {
        setDatas(docs as any);
      }
    );
  }, []);
  // let responseUser: any = await queryBuilderFunc("users", []);

  // const _fillterData = response?.map((item: any) => {
  //   const dataTimeCreate = dayjs(item?.created_at).format(formatDateTime);

  //   const member_introduced = responseUser?.filter(
  //     (user: any) => user?.partner_id === item?.id
  //   )?.length;

  //   return {
  //     ...item,
  //     created_at_layout: dataTimeCreate,
  //     member_introduced,

  //     empty1: 0,
  //     empty2: 0,
  //     empty3: 0,
  //     empty4: 0,
  //     empty5: 0,
  //     empty6: 0,
  //     empty7: 0,
  //     empty8: 0,
  //     empty9: 0,
  //     empty10: 0,
  //     empty11: 0,

  //     hardMount0: "정상",
  //     hardMount1: "수익+롤링",
  //     hardMount2: "커미션",
  //   };
  // });

  // setData(_fillterData);
  return (
    <div className="Real-time">
      <div className="Real-time__header">
        <h3>실시간 결제금액</h3>
        <div className="filter-date">
          <div>
            <p>~에서</p>
            <Components.Input.DatePicker name="date" label="" />
          </div>
          <Button>확인하다</Button>
        </div>
      </div>
      <div className="Real-time__content">
        <Components.ListingTable<any>
          datas={datas}
          bordered={true}
          columns={getColumns()}
          render={(data, value, indexRow, indexColumn) => {
            return <span>{value}</span>;
          }}
        />
      </div>
    </div>
  );
};

export default RealTime;
