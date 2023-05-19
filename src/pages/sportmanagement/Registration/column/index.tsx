import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { IMatchesResponse } from "../../../../api/matchesApi";
import Input from "../../../../components/Input";
import { formatDateTime } from "../../../../components/Input/DatePicker";
import Utils from "../../../../utils";

const getColumn = (): ColumnsType<IMatchesResponse> => [
    {
        title: "경기번호",
        dataIndex: "id",
        key: "id",
        width: 150,
        align: 'center',
    },
    {
        title: "종목",
        dataIndex: "sport_id",
        key: "sport_id",
        render: (sport) => {

            return <p>{Utils.renderSport(sport)}</p>
        }
    },
    {
        title: "국가",
        dataIndex: "nation",
        key: "nation",
        align: 'center',
        render: (_, data, idx) => <Input.Text name={`nation${idx}`} initialValue={Utils.rendereCountries(data?.league?.cc)?.name} />
    },
    {
        title: "리그",
        dataIndex: "league",
        key: "league",
        align: 'center',
        render: (_, data, idx) => <Input.Text name={`leagues${idx}`} initialValue={data?.league?.name} />
    },
    {
        title: "홈팀",
        dataIndex: "homeTeam",
        key: "homeTeam",
        align: 'center',
        render: (_, data, idx) => <Input.Text name={`home${idx}`} initialValue={data?.home?.name} />
    },
    {
        title: "원정팀",
        dataIndex: "awayTeam",
        key: "awayTeam",
        align: 'center',
        render: (_, data, idx) => <Input.Text name={`away${idx}`} initialValue={data?.away?.name} />
    },
    {
        title: "시작시간",
        dataIndex: "time",
        key: "time",
        render: (time, _, idx) => <p>{dayjs(time * 1000).format(formatDateTime)}</p>
    },
    {
        render: () => {
            return <p></p>
        }
    },
];

export default getColumn

