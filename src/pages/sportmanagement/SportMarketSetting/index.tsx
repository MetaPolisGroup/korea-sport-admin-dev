import { Button, Space } from 'antd';
import React from 'react'
import { handleExcel } from '../../membermanagement/MemberList';
import { getColumns } from './columns';
import { HeaderContent } from '../../../components/Layout';
import Components from '../../../components';

export interface ISportMarketSetting {
}

const SportMarketSetting: React.FC<ISportMarketSetting> = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [loading, setLoading] = React.useState<boolean>(false)
  const [old, _] = React.useState<[]>([])
  const [datas, setDatas] = React.useState<[]>([])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return datas?.slice(startIndex, endIndex);
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <h2>마켓 셋팅</h2>
      <HeaderContent isSearch leftItem={<Button onClick={() => handleExcel(datas, 'point')}>뛰어나다</Button>}
        loading={setLoading} callback={search => {
          if (!search.trim() || !datas) {
            return setDatas(old)
          }
          // const filter = datas.filter((i) =>
          //     i.division?.toLowerCase().includes(search.toLowerCase()) ||
          //     i.date_time?.toString().toLowerCase().includes(search.toLowerCase())
          // );
          // setDatas(filter)
        }} />
      <Components.ListingTable<ISportMarketSetting>
        columns={getColumns()}
        pagination={datas?.length !== 0}
        loading={loading}
        bordered
        datas={getCurrentPageData()}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
        paginationOptions={{
          page: { current: currentPage },
          total: datas?.length
        }}
        paginationChange={change => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
      />
    </Space>
  )
}

export default SportMarketSetting