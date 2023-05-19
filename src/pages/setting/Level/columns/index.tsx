import type { ColumnsType } from "antd/es/table";
import React from "react";
import Input from "../../../../components/Input";
import { TLevel } from "../../Basic/BettingCancel/data";

const getColumns = (

): ColumnsType<TLevel> => [
        {
            title: '수준',
            align: 'center',
            width: 100,
            key: 'level',
            dataIndex: 'level',
            render: (_, data, idx) => <Input.Text type="number" name={'level' + idx} initialValue={data.level} />
        },
        {
            title: '1회 최대 지급가능 포인트',
            align: 'center',
            width: 100,
            key: 'join_points',
            dataIndex: 'join_points',
            render: (_, data, idx) => <Input.Text type="number" name={'join_points' + idx} initialValue={data.join_points} />
        },
        {
            title: '가입 첫충 P(%)',
            align: 'center',
            width: 100,
            key: 'first_depo_points',
            dataIndex: 'first_depo_points',
            render: (_, data, idx) => <Input.Text type="number" name={'first_depo_points' + idx} initialValue={data.first_depo_points} />
        },
        {
            title: '매충 P(%)',
            align: 'center',
            width: 100,
            key: 'every_depo_points',
            dataIndex: 'every_depo_points',
            render: (_, data, idx) => <Input.Text type="number" name={'every_depo_points' + idx} initialValue={data.every_depo_points} />
        },
        {
            title: '추천인 매일첫충 포인트(%)',
            align: 'center',
            width: 100,
            key: 'recom_first_depo_point',
            dataIndex: 'recom_first_depo_point',
            render: (_, data, idx) => <Input.Text type="number" name={'recom_first_depo_point' + idx} initialValue={data.recom_first_depo_point} />
        },
        {
            title: '단폴 배팅액',
            align: 'center',
            width: 100,
            key: 'recom_every_depo_point',
            dataIndex: 'recom_every_depo_point',
            render: (_, data, idx) => <Input.Text type="number" name={'recom_every_depo_point' + idx} initialValue={data.recom_every_depo_point} />
        },
        {
            title: '하루 최대 루징 P(점)',
            align: 'center',
            width: 100,
            key: 'daily_max_losing_points',
            dataIndex: 'daily_max_losing_points',
            render: (_, data, idx) => <Input.Text type="number" name={'daily_max_losing_points' + idx} initialValue={data.daily_max_losing_points} />
        },
        {
            title: '하루에 최대 충전 P (포인트)',
            align: 'center',
            width: 100,
            key: 'daily_max_depo_points',
            dataIndex: 'daily_max_depo_points',
            render: (_, data, idx) => <Input.Text type="number" name={'daily_max_depo_points' + idx} initialValue={data.daily_max_depo_points} />
        },
        {
            title: '하루 최대 추천인 루징 P(점)',
            align: 'center',
            width: 100,
            key: 'daily_max_recommend_points',
            dataIndex: 'daily_max_recommend_points',
            render: (_, data, idx) => <Input.Text type="number" name={'daily_max_recommend_points' + idx} initialValue={data.daily_max_recommend_points} />
        },
        {
            title: '출석체크 P(점)',
            align: 'center',
            width: 100,
            key: 'attendance_check',
            dataIndex: 'attendance_check',
            render: (_, data, idx) => <React.Fragment>
                <Input.Text type="number" name={'attendance_check' + idx} initialValue={data.attendance_check} />
                <div style={{ display: 'none' }} >
                    <Input.Text type="number" name={'reg_admin_id' + idx} initialValue={data.reg_admin_id} />
                </div>
            </React.Fragment>
        },
    ]

export { getColumns };
