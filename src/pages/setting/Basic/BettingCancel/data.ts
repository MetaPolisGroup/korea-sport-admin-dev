
export type TIPBlock = {
  value: string,
  index: number
}

export type TGeneral = {
  system_check: boolean;
  system_check_message: string;
  ip_block: TIPBlock[];
  per_acc_issuance_message: string;
  bank_check_hours_start: string;
  bank_check_hours_end: string;
  available: boolean;
  sms_verify_signup: boolean;
  confirm_password_when_edit_bet: boolean;
  per_acc_no1: boolean;
  per_acc_no2: boolean;
};

export type TBigBetAlert = {
  sports: number;
  real_time: number;
  mini_game: number;
  video_game: number;
}

export type TDepositMessage = {
  level: number | string;
  content: string | number;
  [key: string]: string | number

}

export type TDeposit = {
  deposit_available: boolean;
  re_deposit_interval: number;
  deposit_message: TDepositMessage[]
}

export type TWithdraw = {
  withdraw_available: boolean;
  re_withdraw_interval: number;
  max_number_withdraw_day: number;
  max_withdraw_amount_day: number;
  max_withdraw_amount_onetime: number;
}

export interface IBettingRules {
  game: string;
  betting_available: boolean;
  stop_betting_message: string;
  betting_closing: number;
  number_duplicate_bets: number;
  number_items_betslip: number;
  bonus: {
    available: boolean;
    three: number;
    five: number;
    seven: number;
  }
  min_odd_bet: number;
  odd_before_login: number;
  auto_pay_bet: boolean;
  rolling_amount: number;
  rules_by_level: IRuleByLevel[];
};

export interface IDataResponsSetting {
  id?: string;
  betting_cancel_refund: {
    time: number;
    value: number;
  }[];
  general: TGeneral,
  deposit: TDeposit
  withdraw: TWithdraw
  big_bet_alert: TBigBetAlert;
  betting_rules: IBettingRules
  updated_at: number;
  point_rules: TPointRules
  [key: number]: number
}

export interface IRuleByLevel {
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
  [key: number]: number
}

export type TPointRules = {
  level: TLevel[]
  withdraw_with_condition: number
  upd_admin_id: string,
  [key: number]: number
}

export type TLevel = {
  level: number;
  join_points: number;
  upd_admin_id: number;
  daily_max_depo_points: number;
  daily_max_losing_points: number;
  daily_max_recommend_points: number;
  first_depo_points: number;
  every_depo_points: number;
  recom_first_depo_point: number;
  recom_every_depo_point: number;
  attendance_check: number;
  [key: string]: string | number
}