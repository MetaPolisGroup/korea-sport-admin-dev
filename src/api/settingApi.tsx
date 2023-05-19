import { TBigBetAlert, TDepositMessage, TPointRules } from "../pages/setting/Basic/BettingCancel/data";
import axiosClient from "./axiosClient";

const setting = {
    bettingCancelRefund(value: TValueSetting[]): Promise<boolean> {
        let url = '/preferences/cancel-refund'
        return axiosClient.put(url, { betting_cancel_refund: value });
    },
    general(value: TGeneralFormData): Promise<boolean> {
        let url = '/preferences/general'
        return axiosClient.put(url, { ...value });
    },
    depositWithdraw(value: TFormDataDepositWithdraw): Promise<boolean> {
        let url = '/preferences/deposit-withdraw'
        return axiosClient.put(url, { ...value });
    },
    message(value: TDepositMessage[]): Promise<boolean> {
        let url = '/preferences/deposit-message'
        return axiosClient.put(url, { deposit_message: value });
    },
    bigbet(value: TBigBetAlert): Promise<boolean> {
        let url = '/preferences/big-bet-alert'
        return axiosClient.put(url, { ...value });
    },
    gamespecific(value: IGameSpecificDto): Promise<boolean> {
        let url = '/preferences/game-specific'
        return axiosClient.put(url, { ...value });
    },
    pointlevel(value: TPointRules): Promise<boolean> {
        let url = '/preferences/payment-point'
        return axiosClient.put(url, {
            level: value.level,
            withdraw_with_condition: value.withdraw_with_condition
        });
    },
    // --------------------------------------- Domain  ---------------------------------------
    DomainCreate(value: CreateDomainDto): Promise<boolean> {
        let url = '/domain/create'
        return axiosClient.post(url, value);
    },
    DomainUpdate(value: UpdateDomainDto): Promise<boolean> {
        let url = '/domain/update'
        return axiosClient.put(url, value);
    },
    DomainDelete(id: string): Promise<boolean> {
        let url = '/domain/delete/' + id
        return axiosClient.put(url);
    },
};

export interface IResponseDomain {
    id: string;
    domain: string;
    reg_admin_id: string;
    unauth_sub_code: boolean;
    partner_with_domain: string;
    situation: boolean;
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    deleted: boolean;
}

export interface CreateDomainDto {
    domain: string;
    reg_admin_id: string;
    partner_with_domain: string;
    unauth_sub_code: boolean;
    situation: boolean;
}
export interface UpdateDomainDto {
    id: string;
    domain: string;
    reg_admin_id: string;
    partner_with_domain: string;
    unauth_sub_code: boolean;
    situation: boolean;
}

type Bonus = {
    available: boolean;
    three: number;
    five: number;
    seven: number;
}
type RuleByLevel = {
    level: number;
    member_lost: number;
    referrer_lost: number;
    member_rolling: number;
    referrer_rolling: number;
    danpole_betting_amount: number;
    doupol_betting_amount: number;
    min_bet: number;
    max_bet: number;
    max_winning: number;
    odd_by_level: number;
    max_dividend: number;
    cancel_bet_day: number;
}
type IGameSpecificDto = {
    game: string;
    betting_available: boolean;
    stop_betting_message: string;
    betting_closing: number;
    number_duplicate_bets: number;
    number_items_betslip: number;
    min_odd_bet: number;
    odd_before_login: number;
    auto_pay_bet: boolean;
    rolling_amount: number;
    bonus: Bonus;
    rules_by_level: RuleByLevel[];
    [key: string]: string | number | boolean | Bonus | RuleByLevel[]
}

type TValueSetting = {
    time: number
    value: number
    [key: string]: number
}

type TGeneralFormData = {
    system_check: boolean;
    system_check_message: string;
    ip_block: string[];
    per_acc_issuance_message: string;
    [key: string]: string | string[] | boolean;
}

type TFormDataDepositWithdraw = {
    bank_check_hours_start: string;
    bank_check_hours_end: string;
    available: boolean;
    sms_verify_signup: boolean;
    confirm_password_when_edit_bet: boolean;
    per_acc_no1: boolean;
    per_acc_no2: boolean;
    deposit_available: boolean;
    re_deposit_interval: number;
    withdraw_available: boolean;
    re_withdraw_interval: number;
    max_number_withdraw_day: number;
    max_withdraw_amount_day: number;
    max_withdraw_amount_onetime: number;
}


export default setting;
export type {
    TValueSetting,
    TGeneralFormData,
    TFormDataDepositWithdraw,
    Bonus,
    RuleByLevel,
    IGameSpecificDto,
}
export interface DomainFormRef {
    onSubmit: <T>(onFinish: (value?: T) => void) => void;
}
