import axiosClient from "./axiosClient";

export interface IPartnerManageMent {
    balance: number;
    bank: {
        account_holer: string;
        account_number: string;
        name: string;
    };
    bankbook: string;
    bill_betting_CA: string;
    bill_betting_slot: string;
    block: boolean;
    every_charge: boolean;
    first_bullet_everyday: boolean;
    id?: string;
    password: string;
    join_message: string;
    lower_recovery: string;
    memo: string;
    name: string;
    phone: string;
    recommender: string;
    settlement_method: partnerSettlementMethod;
    signup_firstcharge: boolean;
    sub_code: string;
    top_partner: string;
    user_payment: string;
    user_recall: string;
    withdraw_type: partnerWithdrawalType;
    last_login: number;
    cash_history: ICashHistoryPartner[];
    role: Role[];
    notification?: INotifyPartner[];
    partner_name?: string
    partner_id?: string
    partner_top?:string
    partner_code?:string

}

export interface ICashHistoryPartner {
    division: partnerDivisions;
    date_time: number;
    before_amount: number;
    transaction_amount: number;
    after_amount: number;
    note: string;
}

export interface INotifyPartner {
    id: string;
    note: string;
    created_at: number;
}


export enum Role {
    Admin = 'admin',
    User = 'user',
}
export type partnerDivisions = 'User Deposit' | 'User Withdraw' | 'User Bet' | 'User Win Bet' | 'User Cancel Bet' | 'User Support';
export type partnerWithdrawalType = 'Withdrawal only' | 'Only payable to users' | "Withdrawal + user" | 'Impossible';
export type partnerSettlementMethod = 'Profit distribution' | 'Rolling' | 'None' | 'Profit distribution + Rolling';

export interface INotifyPartner {
    id: string;
    note: string;
    created_at: number;
}

interface BankInfo {
    account_holer: string;

    account_number: string;

    name: string;
}

interface Rollings {
    name: string;
    value: number;
}

export interface PartnerUpsertDto {
    top_partner: string;
    partner_code: string;
    password: string;
    bankbook_setting: string;
    partner_name: string;
    sub_code: string;
    phone: string;
    block: boolean;
    signup_firstcharge: boolean;
    first_bullet_everyday: boolean;
    every_charge: boolean;
    recommender: boolean;
    withdraw_type: partnerWithdrawalType;
    bank: BankInfo;
    user_payment: boolean;
    user_recall: boolean;
    lower_payment: boolean;
    lower_recovery: boolean;
    join_message: string;
    settlement_method: partnerSettlementMethod;
    ball_betting_CA: string;
    ball_betting_slot: string;
    revenue_share_rate: number;
    sports_rolling: Rollings[];
    live_rolling: Rollings[];
    game_rolling: Rollings[];
    memo: string;
    [key: string]: string | number | Rollings[] | boolean | BankInfo
}

export interface PartnerFormRef {
    onSubmit: <T>(onFinish: (value?: T) => void) => void;
}

const partnerApi = {
    branch(value: PartnerUpsertDto): Promise<any> {
        let url = "/partner/upsert";
        return axiosClient.put(url, { ...value });
    },
};

export default partnerApi;