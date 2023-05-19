import React, { useState, useEffect } from "react";

import "./TableMatchScore.scss";
import Components from "../../../../components";
import { queryBuilderFunc } from "../../../../service/queryFunction";
import { isEmpty } from "lodash";

interface ITableMatchScore {
  matchID: string;
}

const TableMatchScore: React.FC<ITableMatchScore> = ({ matchID }) => {
  const [match, setMatch] = useState<any>();

  const getMatch = async () => {
    const responseMatches: any = await queryBuilderFunc("matches", [
      ["id", "==", matchID],
    ]);

    setMatch(responseMatches?.[0]);
  };

  useEffect(() => {
    getMatch();
  }, []);

  let scores: {
    title: string;
    key: string | number;
    dataIndex: string | number;
  }[] = [];

  let dataTable: any = {};

  if (!isEmpty(match?.scores)) {
    Object?.entries?.(match?.scores)?.map?.((item: any) => {
      scores = [
        ...scores,
        {
          key: item?.[0],
          dataIndex: item?.[0],
          title: `${item?.[0]}In`,
        },
      ];

      dataTable = {
        ...dataTable,
        [item?.[0]]: `${item?.[1]?.home}:${item?.[1]?.away}`,
      };
    });
  }

  const columns = [...scores, { key: "FT", dataIndex: "FT", title: "FT" }];

  dataTable = { ...dataTable, FT: match?.ss };

  return (
    <div className="TableMatchScore">
      <Components.ListingTable columns={columns} datas={[dataTable]} />
    </div>
  );
};

export default TableMatchScore;
