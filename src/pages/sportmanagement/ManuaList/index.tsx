import React, { useEffect, useState } from "react";
import Form from "antd/es/form";
import Input from "../../../components/Input";
import Components from "../../../components";
import { Button } from "antd";
import { getColumns } from "./columns";
import {
  getAllDocuments,
  queryBuilderFunc,
} from "../../../service/queryFunction";
import { DocumentData } from "firebase/firestore";
import { useForm } from "antd/es/form/Form";

interface IManualListData {
  away: {
    name: string;
  };
  home: {
    name: string;
  };
  id: string;
  league: {
    id: string;
    sport_id: string;
    name: string;
    cc: string;
  };
  manual: boolean;
  sport_id: string;
  time: string;
  time_status: string;
  update_at: string;
}

const ListMess = () => {
  const [options, setOptions] = useState<DocumentData>([]);
  const [datas, setDatas] = useState<IManualListData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [form] = useForm();

  useEffect(() => {
    getAllDocuments("sports").then((dataReturn) => {
      setOptions(dataReturn);
    });

    queryBuilderFunc(
      "matches",
      [
        ["time_status", "==", "0"],
        ["manual", "==", true],
      ],
      undefined,
      undefined,
      (docs: any) => {
        setDatas(docs as IManualListData[]);
      }
    );
  }, []);

  const optionsEdited = options.reduce(
    (acc: any, option: DocumentData) => [
      ...acc,
      { key: option.id, text: option.korean_name, value: option.value },
    ],
    []
  );

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas.slice(startIndex, endIndex);
  };

  return (
    <div>
      <div>
        <h2>스포츠 경기를 선택하세요</h2>
      </div>
      <div>
        <div style={{ margin: "20px 0" }}>
          <Form>
            <Input.Select data={optionsEdited} label="미선택시 전체 스포츠" />
          </Form>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button>선택 경기 삭제</Button>
          <Button>선택 배당 삭제</Button>
          <Button>조회</Button>
        </div>
        <div>
          <Form form={form}>
            <Components.ListingTable<IManualListData>
              columns={getColumns(form)}
              datas={getCurrentPageData()}
              loading={loading}
              paginationOptions={{
                page: { current: currentPage },
                total: datas.length,
              }}
              paginationChange={(change) => {
                setCurrentPage(change.page);
                setPageSize(change.pageSize);
              }}
              render={(data, value, indexRow, indexCol) => {
                return <span>{value}</span>;
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ListMess;
