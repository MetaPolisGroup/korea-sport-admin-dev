import axiosClient from "./axiosClient";

interface IReply {
    ticket_id: string,
    content?: string
    admin_id: string
}

const customer = {
    replyTicket(value: IReply): Promise<any> {
        let url = '/ticket/solo/response'
        return axiosClient.put(url, { ...value });
    },
    closed(value: IReply): Promise<any> {
        let url = '/ticket/solo/close'
        return axiosClient.put(url, { ...value });
    },
};

export default customer;