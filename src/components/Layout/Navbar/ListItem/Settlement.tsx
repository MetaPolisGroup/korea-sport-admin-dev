import type { MenuProps } from 'antd';
import NavItem from '../NavItem';


const itemsSettlement: MenuProps['items'] = [
    {
        key: '1',
        label: <NavItem name='실시간 정산금액' router='/revenue' />
    },
    {
        key: '2',
        label: <NavItem name='파트너 정산내역' router='/revenue-history' />
    },
    {
        key: '3',
        label: <NavItem name='실시간 입/출(전체)' router='/revenue-realtime-forsystem' />
    },
];

export default itemsSettlement