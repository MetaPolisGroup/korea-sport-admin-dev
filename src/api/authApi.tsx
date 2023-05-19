import axiosClient from "./axiosClient";

export interface IRequest {
    password: string | undefined;
    id: string | undefined;
}

export interface IRequestChange {
    edit: {
        id: string,
        level: number,
        point: number,
        role: string[],
        bank: {
            bank_name: string,
            account_holder: string,
            account_number: string
        },
        partner_id: string
        nickname: string
        social_number: number
        agency: string
        password: string
        phone: string
        ability:boolean
        ability_registration:boolean
        ability_customer:boolean
        signle_ability_amount:string
        signle_ability:boolean
        double_ability:boolean,
        double_ability_amount:string,
        cross_ability:boolean,
        cross_ability_amount:string
        recommend_id: string,
        minimum_betting_odd:number,
        casino:string,
        slot:string,
        note:string,
        money_withdraw:string,
        balance:number,
    },

    admin_id: string,
    note: string
}

const authApi = {
    login(value: {
        id: string,
        password: string
    }): Promise<{ token: string, id: string }> {
        const url = '/partner/login'
        return axiosClient.post(url, value);
    },
    update(value: IRequestChange): Promise<any> {
        const url = '/member/edit/' + value.edit.id
        return axiosClient.put(url, value);
    },
    block(value: {
        status: string,
        admin_id: string,
        user_id: string,
        note?: string
    }): Promise<any> {
        const url = '/member/situations/' + value.user_id
        return axiosClient.put(url, value);
    },
};

export default authApi;