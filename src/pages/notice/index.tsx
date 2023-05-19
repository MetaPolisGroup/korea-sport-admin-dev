import React from "react";
import Utils from "../../utils";
import ListMess from "../sportmanagement/ManuaList";

const Event = React.lazy(() => import("./Event"));
const Announcement = React.lazy(() => import("./AnnounceMent"));
const BettingRules = React.lazy(() => import("./BettingRules"));
const Teamplate = React.lazy(() => import("./Template"));
const Popup = React.lazy(() => import("./Popup"));
const Message = React.lazy(() => import("./Message"));
const ManagerTicket = React.lazy(() => import("./ManagerTicket"));
const SendingNote = React.lazy(() => import("./SendingNote"));
const NoticeMessageScheduled = React.lazy(() => import("./NoticeMessageScheduled"));

interface IPostsManagementProps extends React.FC {
  Announcement: typeof Announcement;
  BettingRules: typeof BettingRules;
  Event: typeof Event;
  ListMess: typeof ListMess;
  SendingNote: typeof SendingNote;
  Template: typeof Teamplate;
  Popup: typeof Popup;
  Message: typeof Message;
  ManagerTicket: typeof ManagerTicket;
  NoticeMessageScheduled: typeof NoticeMessageScheduled;
}

const PostManagement: IPostsManagementProps = () => null;
PostManagement.Template = Teamplate;
PostManagement.Announcement = Announcement;
PostManagement.Event = Event;
PostManagement.BettingRules = BettingRules;
PostManagement.ListMess = ListMess;
PostManagement.SendingNote = SendingNote;
PostManagement.Popup = Popup;
PostManagement.Message = Message;
PostManagement.ManagerTicket = ManagerTicket;
PostManagement.NoticeMessageScheduled = NoticeMessageScheduled;
export default PostManagement;

export const handleExcel = <T,>(datas: T[], name: string) =>
  Utils.excel({
    data: datas,
    name: name,
    fieldsOmit: ["key"],
    fieldsToFormat: {
      created_at: "created_at",
      updated_at: "updated_at",
      deleted_at: "deleted_at",
    },
  });
