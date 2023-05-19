import { Space, Tag } from 'antd'
import dayjs from 'dayjs'
import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { IBettingElement, IResponseBet } from '../../../../api/bettingApi'
import Components from '../../../../components'
import { formatDateTime } from '../../../../components/Input/DatePicker'
import Popup, { PopupRef } from '../../../../components/Popup'
import { IUser } from '../../../../features/auth'
import Utils from '../../../../utils'
import { getColumns } from '../comluns'

interface IPropsComponent {
  data: IResponseBet[]
  user: IUser | DocumentData
  item: IResponseBet,
}

const ItemHistory: React.FC<IPropsComponent> = ({ data, user, item }) => {
  const [bet, setBet] = React.useState(item.betting.map(i => i))
  const refInfor = React.createRef<PopupRef>()
  const infor = <Popup
    width={1500}
    footer
    selector={<span onClick={() => refInfor.current?.open()}>{user.id}</span>} ref={refInfor}
    content={<Components.Member popupRef={refInfor} user={user as IUser} />}
  />

  return (
    <Space direction='vertical' size={20} style={{ margin: '20px 0', background: 'black', width: '100%', padding: 10, borderRadius: 10 }}>
      {item ? <React.Fragment>
        <Space style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
          <h2>
            [Affiliation: {user.partner_id}] [Level: {user.level}] [ID: {infor}] [ Deposit: {Utils.convertCurrencyWithCommas(user.cumulative_deposit)} ] [ Withdrawal:{Utils.convertCurrencyWithCommas(user.cumulative_withdraw)} ] [ Accumulation: {Utils.convertCurrencyWithCommas(user.cumulative_settlement)}]
          </h2>
          <Tag color='gold-inverse'>
            {item.status}
          </Tag>
        </Space>
        <Components.ListingTable<IBettingElement>
          datas={bet}
          srollX={1700}
          columns={getColumns(item)}
        />
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span>프리매치 배팅시간 {dayjs(item.created_at).format(formatDateTime)} 베팅번호:{item.id}</span>
          </div>
          <div>
            <span>예상당첨금액 (배팅금 {item.amount} X 배당률 {item.total_odds}) = {Number(item.amount * item.total_odds)}원 당첨금액 : {Number(item.amount * item.total_odds)}원 보너스: {item.bonus}</span>
          </div>
        </Space>
      </React.Fragment> : <p>emty</p>}
    </Space>
  )
}

export default ItemHistory