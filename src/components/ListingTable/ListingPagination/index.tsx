import React from 'react';
import { Pagination } from 'antd';

export interface ListingPaginationChange {
    page: number,
    pageSize: number
}
export interface ListingPaginationOptions {
    pageSize?: {
        default?: number,
        showChanger?: boolean,
        changerOptions?: number[]
    },
    page?: {
        default?: number,
        current?: number
    },
    total?: number
}

interface ListingPaginationProps {
    options?: ListingPaginationOptions,
    onChange?: (change: ListingPaginationChange) => void,
    disabled?: boolean
}

const ListingPagination = (props: ListingPaginationProps) => {

    const { onChange, disabled } = props
    let { options } = props
    options = initOptions(options)

    React.useEffect(() => {

        if (onChange
            && options?.page?.current
            && options.pageSize?.default)
            onChange({
                page: options.page.current,
                pageSize: options.pageSize.default
            })
    }, [])

    return <Pagination
        defaultPageSize={options.pageSize?.default}
        showSizeChanger={options.pageSize?.showChanger}
        pageSizeOptions={options.pageSize?.changerOptions}
        current={options.page?.current}
        defaultCurrent={options.page?.default}
        total={options.total}
        onChange={(page, pageSize) => onChange?.({ page: page, pageSize: pageSize })}
        disabled={disabled} />
}

const initOptions = (options: ListingPaginationOptions | undefined): ListingPaginationOptions => {

    if (!options) options = {}

    if (!options.pageSize) options.pageSize = {}
    if (options.pageSize.default === undefined) options.pageSize.default = 10
    if (options.pageSize.showChanger === undefined) options.pageSize.showChanger = true
    if (options.pageSize.changerOptions === undefined) options.pageSize.changerOptions = [5, 10, 20, 50]

    if (options.pageSize.changerOptions.length > 0
        && options.pageSize.changerOptions.indexOf(options.pageSize.default) < 0)
        options.pageSize.default = options.pageSize.changerOptions[0]

    if (!options.page) options.page = {}
    if (options.page.default === undefined) options.page.default = 1
    if (options.page.current === undefined) options.page.current = 1

    return options
}

export default ListingPagination