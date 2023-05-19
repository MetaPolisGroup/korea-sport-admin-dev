import { Button, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { handleExcel } from '..'
import Components from '../../../components'
import { formatDate } from '../../../components/Input/DatePicker'
import { getAllDocuments, queryBuilderFunc } from '../../../service/queryFunction'
import { getColumns } from './columns'

export type TResponsiveMemberStatus = {
  browser: string
  change: boolean
  created_at: number
  delete: number
  id: string
  ip: string
  nation: string
  os: string
  type: string
  updated_at: number
  url: string
  user_id: string
}

const MemberStatus = () => {
  const [data, setData] = React.useState<TResponsiveMemberStatus[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(30);

  React.useEffect(() => {
    (async () => await queryBuilderFunc('logs', [
      ["type", "==", "Status"],], [{ field: 'created_at', direction: 'desc' }], undefined, doc => {
        setData(doc as TResponsiveMemberStatus[])
        setLoading(false)
      }))()
  }, [])

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  return (
    <React.Fragment>
      <Space>
        <Button onClick={() => handleExcel(data, 'record')}>뛰어나다</Button>
      </Space>
      <Components.ListingTable<TResponsiveMemberStatus>
        columns={getColumns()}
        datas={getCurrentPageData()}
        pagination
        paginationOptions={{
          page: { current: currentPage },
          total: data.length
        }}
        paginationChange={change => {
          setCurrentPage(change.page);
          setPageSize(change.pageSize);
        }}
        loading={loading}
        render={(data, value, indexRow, indexColumn) => {
          return <span>{value}</span>;
        }}
      />
    </React.Fragment>
  )
}

export default MemberStatus