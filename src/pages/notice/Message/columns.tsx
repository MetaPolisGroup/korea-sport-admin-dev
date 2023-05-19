import { ColumnsType } from "antd/es/table";
import ReactHtmlParser from "react-html-parser";

export const COLUMNS: ColumnsType = [
  {
    key: "number",
    dataIndex: "number",
    title: "번호",
  },
  {
    key: "specify_date_layout",
    dataIndex: "specify_date_layout",
    title: "예약시각",
  },
  {
    key: "registrant",
    dataIndex: "registrant",
    title: "등록자",
  },
  {
    key: "send_type_layout",
    dataIndex: "send_type_layout",
    title: "전송타입",
    render: (data) => {
      let color;
      let text;
      switch (data?.props.children) {
        case "All users":
          color = "";
          text = "모든 사용자들";
          break;
        case "Level":
          color = "";
          text = "수준";
          break;
        case "Selected users":
          color = "";
          text = "선택한 사용자";
          break;
        default:
          break;
      }
      return <p>{text ?? "--"}</p>;
    },
  },
  {
    key: "title",
    dataIndex: "title",
    title: "제목",
  },
  {
    key: "content",
    dataIndex: "content",
    title: "내용",
    render: (content: string) => {
      return ReactHtmlParser(content);
    },
  },
  {
    key: "sending_status",
    dataIndex: "sending_status",
    title: "상태",
    render: (data) => {
      let color;
      let text;
      switch (data?.props.children) {
        case "Now":
          color = "";
          text = "지금";
          break;
        case "Waiting":
          color = "";
          text = "대기 중";
          break;
        case "Shipment Completed":
          color = "";
          text = "배송 완료";
          break;
        default:
          break;
      }
      return <p>{text ?? "--"}</p>;
    },
  },
  {
    key: "setting",
    dataIndex: "setting",
    title: "설정",
    fixed: "right",
  },
];
