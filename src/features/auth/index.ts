import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";
import { DocumentData } from "firebase/firestore";
import authApi from "../../api/authApi";
import { queryBuilderFunc } from "../../service/queryFunction";
import Utils from "../../utils";

type Divisions =
  | "Refund"
  | "Deposit"
  | "Withdraw"
  | "Bet"
  | "Winning Bet"
  | "Losing Bet"
  | "Support"
  | "Entry";

export interface ICashHistory {
  division: Divisions;
  date_time: number;
  before_amount: number;
  transaction_amount: number;
  after_amount: number;
  note: string;
}
export type PointDivisions = "Deposit" | "Recommend" | "Exchange";
export interface PointHistoryType {
  division: PointDivisions;
  date_time: number;
  transaction_point: number;
  before_point: number;
  after_point: number;
  before_amount?: number;
  after_amount?: number;
  deleted: boolean;
  delete_at?: number;
}
export interface IUser {
  token: string | null;
  id: string | null;
  name: string;
  level: number;
  point: number;
  balance: number;
  last_login_at: number;
  last_login?: number;
  cumulative_deposit: number;
  cumulative_settlement: number;
  cumulative_withdraw: number;
  sub_code: string;
  situation: string;
  nickname?: string;
  cash_history?: ICashHistory[];
  point_history?: PointHistoryType[];
  partner_id?: string;
  created_at?: Dayjs;
  recommend_id?: string;
  recommender_available?: boolean;
  role?: string[];
  bank?: {
    bank_name?: string;
    account_holder?: string;
    account_number?: string;
  };
  phone?: string;
}

export interface TUserProfile {
  auth: IUser;
  isLogging: boolean;
}

const initialState: TUserProfile = {
  auth: {
    token: "",
    id: "",
    name: "",
    level: 0,
    balance: 0,
    point: 0,
    last_login_at: 0,
    cumulative_deposit: 0,
    cumulative_settlement: 0,
    cumulative_withdraw: 0,
    sub_code: "",
    situation: "",
  },
  isLogging: false,
};

export const Me = createAsyncThunk(
  "users/me",
  async (value, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");
      if (!id) return null;
      const response: DocumentData = await queryBuilderFunc("administrators", [
        ["id", "==", id],
      ]);

      return response[0];
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const HandleLogin = createAsyncThunk(
  "users/login",
  async (
    data: {
      id: string;
      password: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await authApi.login({ ...data });
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("id", response.id);
        dispatch(Me());
      }

      return response;
    } catch (err: any) {
      if (err?.response?.data?.statusCode === 400) {
        return Utils.notification.error(err?.response?.data?.message);
      }

      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    Logout: (state) => {
      return (state = initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Me.pending, (state, action) => {
      state.isLogging = true;
    });
    builder.addCase(Me.fulfilled, (state, action) => {
      state.auth = { ...action.payload };
      state.isLogging = false;
    });
  },
});

export const { Logout } = authSlice.actions;
export default authSlice.reducer;
