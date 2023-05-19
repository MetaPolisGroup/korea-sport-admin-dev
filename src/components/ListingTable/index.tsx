import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React from 'react';
import Utils from '../../utils';
import ListingPagination, { ListingPaginationChange, ListingPaginationOptions } from './ListingPagination';

interface ListingTableProps<T extends object> {
    columns: ColumnsType<T>,
    datas: T[] | undefined,
    loading?: boolean,
    pagination?: boolean,
    paginationOptions?: ListingPaginationOptions,
    paginationChange?: (change: ListingPaginationChange) => void,
    render?: (data: T, value: any, indexRow: number, indexColumn: number) => React.ReactNode,
    renderFooter?: React.ReactNode
    rowClassName?: string
    bordered?: boolean,
    expandable?: (data: T) => React.ReactNode,
    rowSelection?: TableRowSelection<T> | undefined,
    srollX?: number | string,
    srollY?: number | string,
}

function ListingTable<T extends object>(props: ListingTableProps<T>) {

    const {
        columns,
        datas,
        loading,
        pagination,
        paginationOptions,
        paginationChange,
        renderFooter,
        rowClassName,
        bordered,
        expandable,
        rowSelection,
        srollX,
        srollY
    } = props

    initColumns<T>(props)
    initDatas<T>(props)
    return <Table<T>
        columns={columns}
        rowClassName={rowClassName}
        pagination={false}
        loading={loading}
        bordered={bordered ?? false}
        dataSource={datas}
        rowSelection={rowSelection}
        expandable={expandable && {
            expandedRowRender: (data: T) => expandable?.(data),
        }}
        scroll={
            datas
                && datas.length > 0
                ? { x: srollX ?? 1500, y: srollY ?? 500 }
                : undefined}
        footer={() =>
            <React.Fragment>
                {renderFooter}
                {pagination
                    && <ListingPagination
                        options={paginationOptions}
                        onChange={paginationChange} />}
            </React.Fragment>} />
}

function initColumns<T extends object>(props: ListingTableProps<T>) {

    const { columns, render } = props

    if (columns && columns.length > 0 && render)
        for (let i = 0; i < columns.length; i++)
            if (!columns[i].render)
                columns[i].render = (value: any, record: T, indexRow: number) =>
                    render(record, value, indexRow, i)
}

function initDatas<T extends object>(props: ListingTableProps<T>) {

    const { datas } = props

    if (datas && datas.length > 0)
        for (let i = 0; i < datas.length; i++)
            if (!datas[i].hasOwnProperty('key')) {
                Object.assign(datas[i], { key: Utils.newGuid() })
            }
}

export default ListingTable