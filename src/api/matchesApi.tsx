import axiosClient from "./axiosClient";

interface IMatchesResponse {
    away: IInfo;
    home: IInfo;
    league: IInfo;
    bet365_id?: string;
    nation?:string,

    confirmed_at?: string;
    ev_id?: string;
    events?: {
        id: string;
        text: string;
    }[];
    extra?: object;
    has_lineup?: number;

    inplay_created_at?: string;
    inplay_updated_at?: string;

    id: string;
    main_odd?: boolean;
    our_event_id?: string;
    r_id?: string;
    scores?: IScores;
    sport_id: string;
    ss?: string;
    stats?: IStats;
    time: string;
    time_status: string;
    timer?: object;
    updated_at: string;
}

interface IInfo {
    cc?: string;
    id?: string;
    name: string;
    image_id?: string;
}

interface IScores {
    away: string;
    home: string;
    hit?: {
        away: string;
        home: string;
    };
    run?: {
        away: string;
        home: string;
    };
    [key: number]: {
        away: string;
        home: string;
    };
}

interface IStats {
    action_area?: {
        0: string;
        1: string;
    };
    attacks?: {
        0: string;
        1: string;
    };
    ball_safe?: {
        0: string;
        1: string;
    };
    corner_f?: {
        0: string;
        1: string;
    };
    corner_h?: {
        0: string;
        1: string;
    };
    corners?: {
        0: string;
        1: string;
    };
    crosses?: {
        0: string;
        1: string;
    };
    crossing_accuary?: {
        0: string;
        1: string;
    };
    dangerous_attack?: {
        0: string;
        1: string;
    };
    fouls?: {
        0: string;
        1: string;
    };
    goalattempts?: {
        0: string;
        1: string;
    };
    goals?: {
        0: string;
        1: string;
    };
    injuries?: {
        0: string;
        1: string;
    };
    offsides?: {
        0: string;
        1: string;
    };
    off_target?: {
        0: string;
        1: string;
    };
    on_target?: {
        0: string;
        1: string;
    };
    passing_accuracy?: {
        0: string;
        1: string;
    };
    penalties?: {
        0: string;
        1: string;
    };
    possessions_rt?: {
        0: string;
        1: string;
    };
    redcards?: {
        0: string;
        1: string;
    };
    saves?: {
        0: string;
        1: string;
    };
    shots_blocked?: {
        0: string;
        1: string;
    };
    substitutions?: {
        0: string;
        1: string;
    };
    xg?: {
        0: string;
        1: string;
    };
    yellowcards?: {
        0: string;
        1: string;
    };
    yellowred_cards?: {
        0: string;
        1: string;
    };
}

export enum ESportType {
    SOCCER = '1', // Soccer
    BASKETBALL = '18', // Basketball
    VOLLEYBALL = '91', // Volleyball
    BASEBALL = '16', // Baseball
    HOCKEY = '17', // Ice Hockey
    FOOTBALL = '12', // American Football
}

export enum ESportStatus {
    NOT_STARTED = '0',
    PROCESS = '1',
    END = '3'
}

interface IBetslipRequest {
    timeStatus: 
    ESportStatus,
    ss: string,
    id: string,
    scores: {
        home: string,
        away: string,
    }[]
}


const matchesAPI = {
    updateBetResult(value: IBetslipRequest): Promise<any> {
        const url = '/sports-bet/update-score/' + value.id
        return axiosClient.post(url, { ...value });
    },
};

export default matchesAPI;


export type {
    IMatchesResponse,
    IInfo,
    IScores,
    IStats,
}

