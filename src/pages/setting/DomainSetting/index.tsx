import { Button, Form, Space } from "antd";
import React from "react";
import { handleExcel } from "..";
import { IPartnerManageMent } from "../../../api/partnersApi";
import setting, { CreateDomainDto, DomainFormRef, IResponseDomain } from "../../../api/settingApi";
import { useAppSelector } from "../../../app/hook";
import Components from "../../../components";
import { HeaderContent } from "../../../components/Layout";
import { PopupRef } from "../../../components/Popup";
import { queryBuilderFunc } from "../../../service/queryFunction";
import Utils from "../../../utils";
import { getColumns } from "./columns";
import FormContent from "./Form";

export interface IDomainSettingProps { }

const DomainSetting = () => {
  const [datas, setDatas] = React.useState<IResponseDomain[]>([]);
  const [form] = Form.useForm();
  const { id } = useAppSelector((state) => state.auth.auth);
  const [old, setOld] = React.useState<IResponseDomain[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const btnAcept = React.createRef<PopupRef>()
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [partners, setPartners] = React.useState<IPartnerManageMent[]>([]);
  const valueRef = React.createRef<DomainFormRef>()

  React.useEffect(() => {
    (async () => {
      await queryBuilderFunc(
        "partners", [],
        undefined,
        undefined,
        (docs) => {
          setPartners(docs as IPartnerManageMent[]);
        })
      await queryBuilderFunc(
        "domains", [["deleted", "==", false]],
        [{ direction: 'desc', field: 'created_at' }],
        undefined,
        (docs) => {
          setDatas(docs as IResponseDomain[]);
          if (old.length === 0)
            setOld(docs as IResponseDomain[])
        })
    })()
  }, [])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas.slice(startIndex, endIndex);
  };

  const handleButton = (title: string, handleClose: () => void) => {

  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <HeaderContent styleSearch={{ marginTop: 70 }}
        isSearch
        leftItem={<Space size={20} direction="vertical" >
          <h1>도메인관리</h1>
          <Space direction='vertical'>
            <Space>
              <Button onClick={() => handleExcel(datas, 'deposit')}>Excel</Button>
              <Components.Popup
                ref={btnAcept}
                onSubmit={() => {
                  valueRef.current?.onSubmit((value) => {
                    if (value)
                      setting.DomainCreate(value as CreateDomainDto).then(i => {
                        if (i)
                          Utils.notification.success('성공')
                        else
                          Utils.notification.error('실패한')
                      })
                    btnAcept.current?.close()
                  })
                }}
                title='신규 생성'
                closable
                width={600}
                content={<FormContent partners={partners} ref={valueRef} />}
                selector={<Button onClick={() => btnAcept.current?.open()}>신규작성</Button>}
              />
            </Space>
          </Space>
        </Space>}
        loading={setLoading} callback={search => {
          if (!search.trim() || !datas) {
            return setDatas(old)
          }
          const filter = datas.filter((i) =>
            i.partner_with_domain?.toLowerCase().includes(search.toLowerCase()) ||
            i.domain?.toLowerCase().includes(search.toLowerCase())
          );
          setDatas(filter)
        }} />

      <Components.ListingTable<IResponseDomain>
        columns={getColumns(partners)}
        pagination
        datas={getCurrentPageData()}
        paginationOptions={{
          page: { current: currentPage },
          total: datas.length
        }}
        paginationChange={change => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        loading={loading}
        srollX={1200}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </Space>
  );
};
export default DomainSetting;
