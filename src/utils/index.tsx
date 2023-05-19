import Notification from './notification';
import newGuid from './guid';
import { Country, TCountry } from '../db/country';
import { ESportStatus, ESportType } from '../api/matchesApi';
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { formatDateTime } from '../components/Input/DatePicker';

export interface WindowDimentions {
    width: number,
    height: number
}

export interface IExecelProps<T> {
    data: T,
    name: string,
    fieldsOmit?: string[]
    fieldsToFormat?: { [key: string]: string }
}

export interface WindowEvent<TypeMessageKey, IData> extends Event {
    data: WindowEventData<TypeMessageKey, IData>
}
export interface WindowEventData<TypeMessageKey, IData> {
    key: TypeMessageKey,
    data: IData
}

export interface IUtils {
    newGuid: typeof newGuid,
    notification: {
        success: (message: string, description?: string) => void,
        info: (message: string, description?: string) => void,
        error: (message: string, description?: string) => void,
        warning: (message: string, description?: string) => void
    },
    renderStatus: (data: ESportStatus) => string,
    renderSport: (data: ESportType) => string,
    rendereCountries: (data: string | undefined) => TCountry,
    excel: <T, >(data: IExecelProps<T[]>) => void
    convertCurrencyWithCommas: <T, >(data: number) => string
}
const Utils: IUtils = {
    newGuid: newGuid,
    notification: {
        success: (message: string, description?: string) =>
            Notification(message, 'success', description),
        info: (message: string, description?: string) =>
            Notification(message, 'info', description),
        error: (message: string, description?: string) =>
            Notification(message, 'error', description),
        warning: (message: string, description?: string) =>
            Notification(message, 'warning', description)
    },
    renderStatus: (data: ESportStatus) => {
        switch (data) {
            case ESportStatus.PROCESS:
                return 'Game PROCESS'

            case ESportStatus.NOT_STARTED:
                return 'Game NOT STARTED'

            case ESportStatus.END:
                return 'Game Over'
        }
    },
    renderSport: (data: ESportType) => {
        switch (data) {
            case ESportType.SOCCER:
                return 'Soccer'

            case ESportType.BASEBALL:
                return 'BASEBALL'

            case ESportType.BASKETBALL:
                return 'BASKETBALL'

            case ESportType.VOLLEYBALL:
                return 'VOLLEYBALL'

            case ESportType.HOCKEY:
                return 'HOCKEY'

            case ESportType.FOOTBALL:
                return 'FOOTBALL'
        }
    },
    convertCurrencyWithCommas: (amount: number): string => {
        // Chuyển đổi số tiền thành chuỗi và loại bỏ các dấu phẩy (nếu có)
        const amountString = String(amount).replace(/,/g, '');

        // Tách phần nguyên và phần thập phân của số tiền
        const [integerPart, decimalPart] = amountString.split('.');

        // Thêm dấu phẩy vào phần nguyên
        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Tạo chuỗi kết quả bằng cách kết hợp phần nguyên và phần thập phân (nếu có)
        const resultString = decimalPart ? `${integerWithCommas}.${decimalPart}` : integerWithCommas;

        return resultString;
    },
    rendereCountries: (data: string | undefined) => Country.find(i => i.id === data)!,
    excel: <T,>(data: IExecelProps<T[]>) => {
        const fieldsToOmit = data.fieldsOmit ?? [];
        const fieldsToFormat = data.fieldsToFormat ?? {};

        if (!data.data)
            return null;

        const filteredData = data.data.map((obj: any) => {
            return Object.keys(obj)
                .filter(key => !fieldsToOmit.includes(key))
                .reduce((acc: any, key) => {
                    if (fieldsToFormat[key]) {
                        acc[key] = dayjs(obj[key]).format(formatDateTime);
                    } else {
                        acc[key] = obj[key];
                    }
                    return acc;
                }, {});
        });
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        const blob = new Blob([excelData], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data-' + data.name ?? '' + '.xlsx';
        link.click();
    }
}

export default Utils