import React from "react";
import { RouteObject } from "react-router-dom";
import { store } from "../app/store";
import Components from "../components";
import { HandleLogin, Me } from "../features/auth";
import Page from "../pages";
import Theme from "../themes";
import PrivateRoutes from "./protected";
const PATH_HOME = "/";

// Notice management
const PATH_NOTICE_ANOUNMENT = "/notice-list-announcement";
const PATH_NOTICE_EVENT = "/notice-list-event";
const PATH_BETTING_RULES = "/notice-list-betting-rules";
const PATH_TEAMPLATE_LIST = "/notice-list-template";
const PATH_SENDING_NOTE = "/notice-send-msg";
const PATH_MESSAGE_LIST = "/notice-message-list";
const PATH_NOTICE_MESSAGE_SCHEDULED = "/notice-message-scheduled";
const PATH_QNALIST = "/notice-qna-list";

// Preferences
const PATH_BASIC_SETTING = "/basic-setting";
const PATH_BET_SETTTING = "/game-bet-setting";
const PATH_LEVEL_SETTTING = "/level-setting";
const PATH_BANK_INFO = "/bank-info";
const PATH_SMS_SETTING = "/sms-setting";
const PATH_DOMAIN_SETTING = "domain-setting";

// Deposit and withdraw management
const PATH_DEPOSIT_LIST = "/payment-deposit";
const PATH_WITHDRAW_LIST = "/payment-withdraw";
const PATH_USER_MONEY_HIST = "/user-money-hist";
const PATH_USER_POINT_HIST = "/user-point-hist";
const PATH_AUTO_DEPOSIT_LIST = "/auto-deposit-list";

const PATH_LIST_POPUP = "/notice-list-popup";
const PATH_MEMBER_STATUS = "/member-status";
const PATH_MEMBER_RECORD = "/member-record";
const PATH_MEMBER_LIST = "/member-list";

const PATH_PARTNER_BRANCH_LIST = "/partner-branch-list";
const PATH_ADMIN_LIST = "/partner-admin-list";
const PATH_ADMIN_MSG = "/partner-admin-msg";
const PATH_WITHDRAW_ADMIN_LIST = "/partner-brc-withdraw-list";
const PATH_MONEY_HISTORY = "/partner-brc-money-history";
const PATH_ADMIN_HIST = "/partner-admin-hist";
const PATH_DEPOSIT_ADMIN_LIST = "/partner-brc-deposit-list";

// Sport management
const PATH_MATCH_REALTIME = "/sport-live";
const PATH_EXCEL_IMPORT = "/sport-excel-import";
const PATH_MATCH_GERISTRATION = "/sport-match-list";
const PATH_MATCH_PRE = "/sport-pre";
const PATH_SPORT_SETTING = "/sport-setting";
const PATH_NATION_SETTING = "/sport-nation-setting";
const PATH_LEAGUES_SETTING = "/sport-leagues-setting";
const PATH_TEAM_SETTING = "/sport-team-setting";
const PATH_MANUAL_LIST = "/sport-manual-list";
const PATH_BETTING_HISTORY = "/sport-bet-list";
const PATH_SPORT_BET_HISTORY = "/sport-bet-his";
const PATH_SPORT_MARKET_SETTING = "/sport-market-setting";

const PATH_REVENUE = "/revenue";
const PATH_REVENUE_HISTORY = "/revenue-history";
const PATH_REVENUE_REALTIME = "/revenue-realtime-forsystem";

const PATH_BET_HISTORY_1 = "/bet-history/1";
const PATH_BET_HISTORY_2 = "/bet-history/2";
const PATH_BET_STATIC = "/bet-statistics";

const PATH_SLOT_PROVIDER_LIST = "/slot-provider-list";
const PATH_SLOT_GAME_LIST = "/slot-game-list";
const PATH_SLOT_GAME_HISTORY = "/slot-game-history";
const PATH_SLOT_MONEY_TRANS = "/slot-game-money-trans-history";

const LOGIN = "/login";

const MyRoutes: RouteObject[] = [
  {
    loader: () => {
      Theme.CssVariables.setCssVariables();
      return store.dispatch(Me());
    },
    children: [
      {
        element: (
          <React.Suspense fallback={<Components.Loading />}>
            <Page.Login />
          </React.Suspense>
        ),
        path: LOGIN,
        action: async ({ request }) => {
          const form = await request.formData();
          const formObject: { [key: string]: string | Blob } = {};
          form.forEach((value, key) => (formObject[key] = value));
          return store.dispatch(HandleLogin(formObject as any));
        },
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            element: <Components.Layout />,
            children: [
              // PARTNER
              {
                element: <Page.PartnerManageMent.BranchList />,
                path: PATH_PARTNER_BRANCH_LIST,
              },
              {
                element: <Page.PartnerManageMent.AdminList />,
                path: PATH_ADMIN_LIST,
              },
              {
                element: <Page.PartnerManageMent.WithdrawPartner />,
                path: PATH_WITHDRAW_ADMIN_LIST,
              },
              {
                element: <Page.PartnerManageMent.AdminMsg />,
                path: PATH_ADMIN_MSG,
              },
              {
                element: <Page.PartnerManageMent.Record />,
                path: PATH_ADMIN_HIST,
              },
              {
                element: <Page.PartnerManageMent.Money />,
                path: PATH_MONEY_HISTORY,
              },
              {
                element: <Page.PartnerManageMent.PartnerDeposit />,
                path: PATH_DEPOSIT_ADMIN_LIST,
              },
              // CASINO-GAME
              {
                element: <Page.Casino.GameManagement />,
                path: PATH_SLOT_PROVIDER_LIST,
              },
              {
                element: <Page.Casino.CompanyGame />,
                path: PATH_SLOT_GAME_LIST,
              },
              {
                element: <Page.Casino.Record />,
                path: PATH_SLOT_GAME_HISTORY,
              },
              {
                element: <Page.Casino.TransMoney />,
                path: PATH_SLOT_MONEY_TRANS,
              },
              // BETTING
              {
                element: <Page.BetHistory.History1 />,
                path: PATH_BET_HISTORY_1,
              },
              {
                element: <Page.BetHistory.History2 />,
                path: PATH_BET_HISTORY_2,
              },
              {
                element: <Page.BetHistory.BetStatistics />,
                path: PATH_BET_STATIC,
              },
              // REVENUE
              {
                element: <Page.Settlement.RealTime />,
                path: PATH_REVENUE,
              },
              {
                element: <Page.Settlement.Detail />,
                path: PATH_REVENUE_HISTORY,
              },
              {
                element: <Page.Settlement.EntryExit />,
                path: PATH_REVENUE_REALTIME,
              },

              {
                element: <Page.DashBoard />,
                path: PATH_HOME,
              },
              // MEMBER
              {
                element: <Page.Member.Status />,
                path: PATH_MEMBER_STATUS,
              },
              {
                element: <Page.Member.Record />,
                path: PATH_MEMBER_RECORD,
              },
              {
                element: <Page.Member.MemberList />,
                path: PATH_MEMBER_LIST,
              },

              //MATCH
              {
                element: <Page.SportManagement.MatchRealtime />,
                path: PATH_MATCH_REALTIME,
              },
              {
                element: <Page.SportManagement.SportBetHistory />,
                path: PATH_SPORT_BET_HISTORY,
              },
              {
                element: <Page.SportManagement.BettingHistory />,
                path: PATH_BETTING_HISTORY,
              },
              {
                element: <Page.SportManagement.Pre />,
                path: PATH_MATCH_PRE,
              },
              {
                element: <Page.SportManagement.SportMarketSetting />,
                path: PATH_SPORT_MARKET_SETTING,
              },
              {
                element: <Page.SportManagement.Export />,
                path: PATH_EXCEL_IMPORT,
              },
              {
                element: <Page.SportManagement.Registration />,
                path: PATH_MATCH_GERISTRATION,
              },
              {
                element: <Page.SportManagement.Setting.Sport />,
                path: PATH_SPORT_SETTING,
              },
              {
                element: <Page.SportManagement.Setting.Nation />,
                path: PATH_NATION_SETTING,
              },
              {
                element: <Page.SportManagement.Setting.Leagues />,
                path: PATH_LEAGUES_SETTING,
              },
              {
                element: <Page.SportManagement.Setting.Team />,
                path: PATH_TEAM_SETTING,
              },
              // Setting
              {
                element: <Page.Setting.Basic />,
                path: PATH_BASIC_SETTING,
              },
              {
                element: <Page.Setting.Game />,
                path: PATH_BET_SETTTING,
              },
              {
                element: <Page.Setting.Level />,
                path: PATH_LEVEL_SETTTING,
              },
              {
                element: <Page.Setting.BankInfo  />,
                path: PATH_BANK_INFO,
              },
              {
                element: <Page.Setting.SMSSetting />,
                path: PATH_SMS_SETTING,
              },
              {
                element: <Page.Setting.DomainSetting />,
                path: PATH_DOMAIN_SETTING,
              },
              // Notice
              {
                element: <Page.PostManagement.ManagerTicket />,
                path: PATH_QNALIST,
              },
              {
                element: <Page.PostManagement.Popup />,
                path: PATH_LIST_POPUP,
              },
              {
                element: <Page.PostManagement.ListMess />,
                path: PATH_MANUAL_LIST,
              },
              {
                element: <Page.PostManagement.Template />,
                path: PATH_TEAMPLATE_LIST,
              },
              {
                element: <Page.PostManagement.Event />,
                path: PATH_NOTICE_EVENT,
              },
              {
                element: <Page.PostManagement.BettingRules />,
                path: PATH_BETTING_RULES,
              },
              {
                element: <Page.PostManagement.Announcement />,
                path: PATH_NOTICE_ANOUNMENT,
              },
              {
                element: <Page.PostManagement.SendingNote />,
                path: PATH_SENDING_NOTE,
              },
              {
                element: <Page.PostManagement.Message />,
                path: PATH_MESSAGE_LIST,
              },
              {
                element: <Page.PostManagement.NoticeMessageScheduled />,
                path: PATH_NOTICE_MESSAGE_SCHEDULED,
              },
              // DEPOSIT AND WITHDRAW
              {
                element: <Page.Payment.Deposit />,
                path: PATH_DEPOSIT_LIST,
              },
              {
                element: <Page.Payment.Withdraw />,
                path: PATH_WITHDRAW_LIST,
              },
              {
                element: <Page.Payment.UserMoneyHist />,
                path: PATH_USER_MONEY_HIST,
              },
              {
                element: <Page.Payment.UserPointHist />,
                path: PATH_USER_POINT_HIST,
              },
              {
                element: <Page.Payment.AutoDepositList />,
                path: PATH_AUTO_DEPOSIT_LIST,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default MyRoutes;
