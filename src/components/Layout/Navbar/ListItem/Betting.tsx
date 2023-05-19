import type { MenuProps } from 'antd';
import NavItem from '../NavItem';


const itemsBetting: MenuProps['items'] = [
    {
        key: '1',
        label: <NavItem name='미니 게임 베팅' router='/bet-history/1' />
    },
    {
        key: '2',
        label: <NavItem name='비디오 게임 베팅' router='/bet-history/2' />
    },
    {
        key: '3',
        label: <NavItem name='베팅 집계' router='/bet-statistics' />
    },
];

export default itemsBetting