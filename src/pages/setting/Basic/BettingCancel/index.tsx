import { Typography } from "antd";
import SelectItem from "./SelectItem";

interface IBettingCancelProps {
  data: {
    time: number;
    value: number;
  }[];
}

const BettingCancel: React.FC<IBettingCancelProps> = ({ data }) => {
  return (
    <div className="wraper-betting-cancel">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h2>
          스포츠 배팅취소 타임 및 환급 옵션(실시간, 미니게임, 라이브게임 제외)
        </h2>
        <Typography.Text type="secondary">
          스포츠 배팅후 회원이 취소할때 배팅시간/경기시간 을 기준으로 취소가능한
          타임 및 환급률 설정
        </Typography.Text>
      </div>
      <SelectItem bettingCancelRefund={data} />
    </div>
  );
};

export default BettingCancel;
