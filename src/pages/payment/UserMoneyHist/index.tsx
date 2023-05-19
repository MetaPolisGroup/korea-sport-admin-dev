import { Button, DatePicker, Form, Space } from "antd";
import React from "react";
import { HeaderContent } from "../../../components/Layout";
import { handleExcel } from "..";
import Components from "../../../components";
import { getColumns } from "./columns";
import { PopupRef } from "../../../components/Popup";
import { useAppSelector } from "../../../app/hook";
import dayjs from "dayjs";
import { formatDate } from "../../../components/Input/DatePicker";
import Input from "../../../components/Input";
import { EUserMoneyHist } from "../../../api/payment";
import { queryBuilderFunc } from "../../../service/queryFunction";

interface ICashHistories {
  after_amount: number;
  before_amount: number;
  created_at: number;
  id: string;
  note: string;
  transaction_amount: number;
  type: {
    account_id: string;
    division: string;
    type: string;
  }[];
}

const now = new Date();

const start = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 2
).getTime();
const end = new Date(now).getTime();

const UserMoneyHist = () => {
  const [datas, setDatas] = React.useState<ICashHistories[]>([]);
  const [form] = Form.useForm();
  const { id } = useAppSelector((state) => state.auth.auth);
  const [old, setOld] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [startDay, setStartDay] = React.useState<dayjs.Dayjs | number>(start);
  const [endDay, setEndDay] = React.useState<dayjs.Dayjs | number>(end);

  React.useEffect(() => {
    (async () => {
      if (status.trim().length === 0) {
        await queryBuilderFunc(
          "cash_histories",
          [["type.type", "==", "user"]],
          [{ field: "created_at", direction: "desc" }],
          undefined,
          (docs) => {
            setDatas(docs as ICashHistories[]);
            if (old.length === 0) setOld(docs as ICashHistories[]);
          }
        );
      } else {
        await queryBuilderFunc(
          "cash_histories",
          [
            ["type.type", "==", "user"],
            ["type.division", "==", status],
          ],
          [{ field: "created_at", direction: "desc" }],
          undefined,
          (docs) => {
            setDatas(docs as ICashHistories[]);
            if (old.length === 0) setOld(docs as ICashHistories[]);
          }
        );
      }
    })();
  }, [status]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas.slice(startIndex, endIndex);
  };

  const onChangeValue = (value: string) => {
    setStatus(value);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <HeaderContent
        styleSearch={{ marginTop: 130 }}
        leftItem={
          <Space size={20} direction="vertical">
            <h1>철회하다</h1>
            <Space direction="vertical">
              {/* <Space>
                            <PopupConfirm
                                ref={btnReject}
                                onSubmit={() => handleButton('Rejected')}
                                title='거부'
                                content='당신은 모든 것을 바꾸고 싶습니까 거부 ?'
                                selector={<Button disabled={select?.length === 0} onClick={() => btnReject.current?.open()}>배치 취소 선택</Button>}
                            />
                            <PopupConfirm
                                ref={btnAcept}
                                onSubmit={() => handleButton('Approved')}
                                title='승인'
                                content='당신은 모든 것을 바꾸고 싶습니까? 승인 ?'
                                selector={<Button disabled={select?.length === 0} onClick={() => btnAcept.current?.open()}>선택의 대량 승인</Button>}
                            />
                        </Space> */}
              <Space>
                <DatePicker.RangePicker
                  onChange={(e) => {
                    setStartDay(dayjs(e?.[0]!).unix());
                    setEndDay(dayjs(e?.[1]!).unix());
                  }}
                  format={formatDate}
                  clearIcon={false}
                />
              </Space>
              <Input.Select
                label="내역구분"
                data={options}
                onChange={onChangeValue}
              />
              <Space>
                <Button onClick={() => handleExcel(datas, "withdraw")}>
                  Excel
                </Button>
              </Space>
            </Space>
          </Space>
        }
        loading={setLoading}
        callback={(search) => {
          if (!search.trim() || !datas) {
            return setDatas(old);
          }
          // const filter = datas.filter(
          //   (i) =>
          //     i.user_id?.toLowerCase().includes(search.toLowerCase()) ||
          //     i.nickname?.toLowerCase().includes(search.toLowerCase()) ||
          //     i.partner_id
          //       ?.toString()
          //       .toLowerCase()
          //       .includes(search.toLowerCase())
          // );
          // setDatas(filter);
        }}
      />

      <Components.ListingTable<any>
        columns={getColumns(form, id!)}
        loading={loading}
        pagination
        datas={getCurrentPageData()}
        paginationOptions={{
          page: { current: currentPage },
          total: datas.length,
        }}
        paginationChange={(change) => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        srollX={1200}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </Space>
  );
};

const filterDatas = (callback: () => void) => {
  callback?.();
};

const options = [
  {
    key: EUserMoneyHist.전체,
    text: "전체",
    value: EUserMoneyHist.전체,
  },
  {
    key: EUserMoneyHist.입금승인,
    text: "입금승인",
    value: EUserMoneyHist.입금승인,
  },
  {
    key: EUserMoneyHist["입+출"],
    text: "입+출",
    value: EUserMoneyHist["입+출"],
  },
  {
    key: EUserMoneyHist.베팅취소,
    text: "베팅취소",
    value: EUserMoneyHist.베팅취소,
  },
  {
    key: EUserMoneyHist.입금승인취소,
    text: "입금승인취소",
    value: EUserMoneyHist.입금승인취소,
  },
  {
    key: EUserMoneyHist["적중특례 베팅금 지급"],
    text: "적중특례 베팅금 지급",
    value: EUserMoneyHist["적중특례 베팅금 지급"],
  },
  {
    key: EUserMoneyHist["롤벡처리 당첨금 회수"],
    text: "롤벡처리 당첨금 회수",
    value: EUserMoneyHist["롤벡처리 당첨금 회수"],
  },
  {
    key: EUserMoneyHist["롤벡 - 적특 회수"],
    text: "롤벡 - 적특 회수",
    value: EUserMoneyHist["롤벡 - 적특 회수"],
  },
  {
    key: EUserMoneyHist["출금 취소"],
    text: "출금 취소",
    value: EUserMoneyHist["출금 취소"],
  },
  {
    key: EUserMoneyHist.출금승인,
    text: "출금승인",
    value: EUserMoneyHist.출금승인,
  },
  {
    key: EUserMoneyHist.포인트캐쉬전환,
    text: "포인트캐쉬전환",
    value: EUserMoneyHist.포인트캐쉬전환,
  },
  {
    key: EUserMoneyHist["게임머니 이동(충전)"],
    text: "게임머니 이동(충전)",
    value: EUserMoneyHist["게임머니 이동(충전)"],
  },
  {
    key: EUserMoneyHist["게임머니 이동(회수)"],
    text: "게임머니 이동(회수)",
    value: EUserMoneyHist["게임머니 이동(회수)"],
  },
  {
    key: EUserMoneyHist["관리자 충전"],
    text: "관리자 충전",
    value: EUserMoneyHist["관리자 충전"],
  },
  {
    key: EUserMoneyHist["관리자 회수"],
    text: "관리자 회수",
    value: EUserMoneyHist["관리자 회수"],
  },
  {
    key: EUserMoneyHist.베팅,
    text: "베팅",
    value: EUserMoneyHist.베팅,
  },
  {
    key: EUserMoneyHist.베팅당첨,
    text: "베팅당첨",
    value: EUserMoneyHist.베팅당첨,
  },
];

export default UserMoneyHist;
