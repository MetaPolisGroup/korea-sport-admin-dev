import { Button, Col, Form, FormInstance, Space, Switch } from 'antd';
import React from 'react';
import Components from '../..';
import './index.scss';

const GameSetting = () => {
    const [form] = Form.useForm();

    return (
        <React.Fragment>
            <Col span={12} className="gamesetting_wrapper">
                <Form form={form}>
                    <Space size={50} style={{ borderBottom: '0.2px solid gray', paddingBottom: 20 }}>
                        <p style={{ width: 100, marginRight: 20 }}>게임</p>
                        <p>베팅가능</p>
                        <p>베팅알람</p>
                        <p>본인콤프(%)</p>
                        <p>추천인콤프(%)</p>
                    </Space>
                    {Object.entries(gameItems).map(([name, label]) => (
                        <Item key={name} name={name} label={label} />
                    ))}
                </Form>
            </Col>
            <Col span={24} style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={() => handleSubmit(form)} type="primary">
                    변경사항 저장
                </Button>
            </Col>
        </React.Fragment>
    );
};

const handleSubmit = (form: FormInstance<any>) => {
    const formData: { [key: string]: any } = {};
    form.validateFields().then(data => {
        Object.entries(data).forEach(([name, value]) => {
            const [category, property] = name.split('_');
            if (!formData[category]) {
                formData[category] = {};
            }
            formData[category][property] = value;
        });

        console.log(formData); // In ra để kiểm tra kết quả lưu trữ
        console.log(data)
    });
};

interface IFormSwitchProps {
    name: string;
    label?: string;
}

type TItemProps = {
    label: string;
    name: string;
    isLast?: boolean;
};

const Item: React.FC<TItemProps> = ({ isLast, label, name }) => {
    return (
        <div style={{ borderBottom: isLast ? 'none' : '0.2px solid gray', display: 'flex', gap: 46, marginTop: 10 }}>
            <p style={{ width: 120 }}>{label}</p>
            <FormSwitch name={name + '_available'} />
            <FormSwitch name={name + '_alarm'} />
            <Components.Input.Text name={name + '_seft'} initialValue='0'/>
            <Components.Input.Text name={name + '_referral'} initialValue='0'/>
        </div>
    );
};

const FormSwitch: React.FC<IFormSwitchProps> = ({ name, label }) => {
    return (
        <Form.Item name={name} label={label} valuePropName="checked">
            <Switch />
        </Form.Item>
    );
};

const gameItems = {
    sports: '스포츠',
    realtime: '실시간',
    sipping: '로투스홀짝',
    baccarat: '로투스 바카라',
    powerball: '파워볼',
    powerladder: '파워사다리',
    kinoladder: '키노사다리',
    speedkeno: '스피드키노',
    virtualfootball: '가상축구',
    gaegyeongju: '개경주',
    livecasino: 'LIVE CASINO',
    slotgame: '슬롯게임',
    bosscore: '보스코어1분파워볼',
    threeminutes: '코인 파워볼 3분',
    fiveminutes: '코인 파워볼 5분',
    ladderthreeminutes: '코인 파워사다리 3분',
    ladderfiveminutes: '코인 파워사다리 5분',
    beteastfootball: '벳이스트 축구',
    betbaseball: '벳이스트 야구',
    beteastbasketball: '벳이스트 농구',
    betcricket: '벳이스트 크리켓',
    beteastdice: '벳이스트 주사위',
    gangwonlandbaccarat: '강원랜드바카라',
    lasvegasbaccarat: '라스베가스바카라',
    bungseotda: '오야붕섯다',
    marioracing: '마리오레이싱',
    boomladder: '붐붐붐사다리',
    bitcoin: 'FX비트코인',
};

export default GameSetting;