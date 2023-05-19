import { Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import React from "react"
import { ESportStatus, ESportType, IMatchesResponse } from "../../../../api/matchesApi"
import Popup, { PopupRef } from "../../../../components/Popup"
import ContentUpdate from "../../ContentUpdate"
import Utils from "../../../../utils"
import dayjs from "dayjs"
import { formatDateTime } from "../../../../components/Input/DatePicker"

const getColumns = (
    status: ESportStatus,
    type: ESportType
): ColumnsType<IMatchesResponse> => {

    return [
        {
            title: '경기번호',
            align: 'left',
            dataIndex: 'id',
            key: 'id',
            width: 200,
        },
        {
            title: '종목',
            align: 'left',
            dataIndex: 'sport_id',
            key: 'sport_id',
            width: 150,
            render: (status) => {
                let sport
                switch (status) {
                    case ESportType.SOCCER:
                        sport = 'Soccer'
                        break;
                    case ESportType.BASKETBALL:
                        sport = 'BASKETBALL'
                        break
                    case ESportType.VOLLEYBALL:
                        sport = 'VOLLEYBALL'
                        break
                    case ESportType.BASEBALL:
                        sport = 'BASEBALL'
                        break
                    case '17':
                        sport = 'HOCKEY'
                        break
                    case ESportType.HOCKEY:
                        sport = 'FOOTBALL'
                        break
                    default:
                        break;
                }
                return <p>{sport}</p>
            }
        },
        {
            title: '국가',
            align: 'left',
            dataIndex: 'nation',
            key: 'nation',
            width: 150,
            render: () => <p>cc</p>
        },
        {
            title: '리그',
            align: 'left',
            width: 200,
            render: (_, data) => {
                return <p>{data.league.name}</p>
            }
        },
        {
            title: '시간',
            dataIndex: 'time',
            key: 'time',
            width: 200,
            align: 'left',
            render: (time) => <p>{dayjs(time * 1000).format(formatDateTime)}</p>
        },
        {
            title: 'HOME',
            dataIndex: 'home',
            key: 'home',
            width: 200,
            align: 'left',
            render: (data) => {
                return <p>{data?.name}</p>
            }
        },
        {
            title: 'AWAY',
            dataIndex: 'away',
            key: 'away',
            width: 200,
            align: 'left',
            render: (data) => {
                return <p>{data?.name}</p>
            }
        },
        {
            title: 'process', //진행상태
            dataIndex: 'time_status',
            key: 'time_status',
            align: 'left',
            width: 150,
            render: (data) => {
                return <p>{Utils.renderStatus(status)}</p>
            }
        },
        {
            title: status === ESportStatus.END && 'Score(H : A)',
            dataIndex: 'ss',
            key: 'ss',
            align: 'left',
            width: 150,
            render: (score) => {
                return status === ESportStatus.END && <p>{score}</p>
            }
        },
        {
            title: status === ESportStatus.END && 'Betting total', //유저배팅
            dataIndex: 'ss',
            key: 'ss',
            align: 'left',
            width: 150,
            render: (total) => {
                return status === ESportStatus.END && <p>{total}</p>
            }
        },
        {
            width: 170,
            fixed: 'right',
            render: (_, data) => {
                const btnEditRef = React.createRef<PopupRef>()
                return <div>
                    <Popup
                        ref={btnEditRef}
                        title='정보 변경'
                        width={700}
                        footer
                        content={<ContentUpdate status={status} type={type} data={data} onCancel={() => btnEditRef.current?.close()} />}
                        selector={<div>
                            <Button onClick={e => btnEditRef.current?.open()}>
                                결과를 입력하십시오
                            </Button>
                        </div>}
                    />
                </div>
            }
        }
    ]
}

export { getColumns }


// userbetting 

// total amount of array list 

// lenght of array