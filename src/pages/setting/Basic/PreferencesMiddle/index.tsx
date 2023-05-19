import Col from 'antd/es/col';
import Row from 'antd/es/row';
import React from 'react'
import { IDataResponsSetting, } from '../BettingCancel/data';
import BettingSite from './BettingSite';
import BigBettingAlert from './BigBettingAlert';
import DepositWithdraw from './DepositWithdraw';

interface IGeneralProps {
    preferences: IDataResponsSetting
}

const PreferencesMiddle: React.FC<IGeneralProps> = ({ preferences }) => {

    return <Row className='wraper-setting' >
        <Col span={9} >
            <BettingSite data={preferences.general} />
        </Col>
        <Col span={1} style={{ borderRight: '1px solid gray' }} />
        <Col span={12} className='wrapper-right'>
            <DepositWithdraw data={preferences} />
            <BigBettingAlert data={preferences.big_bet_alert} />
        </Col>
    </Row>
}

export default PreferencesMiddle