import { Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import React from "react"
import { ESportStatus, ESportType, IMatchesResponse } from "../../../../api/matchesApi"
import Popup, { PopupRef } from "../../../../components/Popup"
import Utils from "../../../../utils"
import ContentUpdate from "../../ContentUpdate"

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
        },
        {
            title: '종목',
            align: 'left',
            dataIndex: 'sport_id',
            key: 'sport_id',
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
            render: () => <p>cc</p>
        },
        {
            title: '리그',
            align: 'left',
            render: (_, data) => {
                return <p>{data.league.name}</p>
            }
        },
        {
            title: '시간',
            dataIndex: 'time',
            key: 'time',
            align: 'left',
        },
        {
            title: 'HOME',
            dataIndex: 'home',
            key: 'home',
            align: 'left',
            render: (data) => {
                return <p>{data?.name}</p>
            }
        },
        {
            title: 'AWAY',
            dataIndex: 'away',
            key: 'away',
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
            render: (data) => {
                return <p>{Utils.renderStatus(status)}</p>
            }
        },
        {
            title: status === ESportStatus.END && 'Score(H : A)',
            dataIndex: 'ss',
            key: 'ss',
            align: 'left',
            width: status === ESportStatus.END ? 150 : 0,

            render: (score) => {
                return status === ESportStatus.END && <p>{score}</p>
            }
        },
        {
            title: status === ESportStatus.END && 'Betting total', //유저배팅
            dataIndex: 'ss',
            key: 'ss',
            align: 'left',
            width: status === ESportStatus.END ? 150 : 0,
            render: (total) => {
                return status === ESportStatus.END && <p>{total}</p>
            }
        },
        {
            fixed: 'right',
            width: 170,
            render: (_, data) => {
                const btnEditRef = React.createRef<PopupRef>()
                return <div>
                    <Popup
                        ref={btnEditRef}
                        title='정보 변경'
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