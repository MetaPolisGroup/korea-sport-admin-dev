import axiosClient from "./axiosClient";

export interface IResponseBet {
    amount: number;
    match_ids: string[];
    betting: IBettingElement[];
    bonus: number;
    id?: string;
    status: BettingStatus;
    time: number;
    total_odds: number;
    user_id: string;
    winning_amount: number;
    delete: boolean;
    deleted_at?: number;
    updated_at?: number;
    created_at?: number;
}

export interface IBettingElement {
    match_id: string;
    sport_id: string;
    league: string;
    home_team: string;
    away_team: string;
    match_status: string;
    time: string;
    score: string;
    bet_result: BetItemResult;
    created_at: number;
    odd_id: string;
    odd_type: string;
    odd: IOddElement;
    [key: string]: string | IOddElement | number
}

export type BetItemResult = 'Waiting' | 'Win' | 'Lose' | 'Draw' | 'Half win' | 'Half lose';
export interface IOddElement {
    id?: string;
    name?: string;
    header?: string;
    handicap?: string;
    team?: string;
    odds?: number;
    match_status?:string
}
export type BettingStatus = 'Waiting for settlement' | 'Cancel' | 'Win' | 'Lose';

interface IRequest {
    FI: string
    betslip: {
        betResult: string,
        id: string
    }[]
}

const bettingApi = {
    saveBettingHistory(value: IRequest): Promise<any> {
        const url = "/sports-bet/update-bet-result"
        return axiosClient.post(url, { ...value });
    },
};

export default bettingApi;