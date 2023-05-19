import axiosClient from "./axiosClient";


export interface IResponseSportSetting {
  korean_name: string,
  name: string
  id: string
}
interface IRequest {
  status: "Active" | "Inactive" | "Deleted";
  title: string;
  content: string;
  type:
  | "Template"
  | "Announcement"
  | "Event"
  | "Betting rules"
  | "Popup"
  | "Send note";
  registrant?: string;
  id?: string;
  force_reading?: boolean;
  send_type?: string;
  users?: string[];
  user_level?: number;
  sending_status?: "Now" | "Waiting";
  specify_date?: number;
  display?: string; // 'Before', 'After', 'Both'
  display_start?: number;
  display_end?: number;
}

type IData = {
  content: string;
  type:
  | "Template"
  | "Announcement"
  | "Event"
  | "Betting rules"
  | "Popup"
  | "Send note";
  user: string[];
  created_at: number;
  registrant: string;
  title: string;
  status: "Active" | "Inactive" | "Deleted";
  id: string;
  display?: string;
  display_start?: number
  display_end?: number;
};

interface ISendingNoteReq {
  sending_status: "Now" | "Waiting";
  title: string;
  content: string;
  status: "Active" | "Inactive" | "Deleted";
  force_reading: boolean;
  user_level: number;
  send_type: string;
  specify_date: number;
  users: string[];
  id: string;
  type: string;
}

interface CreatingFormRef {
  onSubmit: <T>(onFinish: (value?: T) => void) => void;
}

const noticeApi = {
  Create(value: IRequest): Promise<any> {
    const url = "/notification";
    return axiosClient.post(url, { ...value });
  },
  Edit(value: IRequest): Promise<any> {
    const url = "/notification/" + value.id;
    return axiosClient.put(url, { ...value });
  },
  Delete(id: string): Promise<any> {
    const url = "/notification/" + id + "/delete";
    return axiosClient.get(url);
  },
  EditSendingNote(value: ISendingNoteReq): Promise<any> {
    const url = "/notification/" + value.id;
    return axiosClient.put(url, { ...value });
  },
  EditSetting(value: { id: string, name: string, page: string }): Promise<any> {
    const url = "/sports-bet/setting/" + value.page + "/" + value.id;
    return axiosClient.put(url, { name: value.name });
  },
  EditSport(value: { id: string, name: string }): Promise<any> {
    const url = "/sports-bet/setting/sport/" + value.id;
    return axiosClient.put(url, { name: value.name });
  },
};

export default noticeApi;

export type { IData, CreatingFormRef, IRequest, ISendingNoteReq };
