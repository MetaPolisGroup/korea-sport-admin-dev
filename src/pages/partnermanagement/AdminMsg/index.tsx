import React from "react";
import Components from "../../../components";
import { getColumns } from "./comluns";
import { HeaderContent } from "../../../components/Layout";
import { Button, Space } from "antd";

const AdminMsg = () => {
  const [data, setData] = React.useState<any[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div>
      {loading ? (
        <Components.Loading />
      ) : (
        <>
          <HeaderContent
            styleSearch={{ marginTop: 130 }}
            leftItem={
              <Space size={20} direction="vertical">
                <h1>관리자 메세지 내역</h1>
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
                    <Button>메세지 작성</Button>
                  </Space>
                </Space>
              </Space>
            }
          />

          <Components.ListingTable<any>
            columns={getColumns()}
            datas={data}
          ></Components.ListingTable>
        </>
      )}
    </div>
  );
};

export default AdminMsg;
