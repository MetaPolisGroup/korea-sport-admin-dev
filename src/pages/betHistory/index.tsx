import React from "react";

const History1 = React.lazy(() => import("./history1"));
const History2 = React.lazy(() => import("./history2"));
const BetStatistics = React.lazy(() => import("./betStatistics"));

interface IComponentBetHistory extends React.FC {
  History1: typeof History1;
  History2: typeof History2;
  BetStatistics: typeof BetStatistics;
}

const BetHistory: IComponentBetHistory = () => null;

BetHistory.History1 = History1;
BetHistory.History2 = History2;
BetHistory.BetStatistics = BetStatistics;

export default BetHistory;
