import { AxiosError } from "axios";
import { toast, ToastPosition } from "react-toastify";

export const formatVND = (value: number): string => {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

export const convertTime = (value: number): string => {
    return value / 60 / 60 < 1
        ? `${value / 60} phút`
        : `${Math.floor(value / 60 / 60)} giờ ${value / 60 - Math.floor(value / 60) * 60
        } phút`;
};

export const convertTimeToTemplate = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let formattedTime: string;
    if (hours === 0) {
        formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    } else {
        formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    return formattedTime;
};

export const formatTimeStamp = (utcTimestamp: string): string => {
    const date = new Date(utcTimestamp);
    const localDateString = date.toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
    });
    return localDateString;
};

export const formatBirthDay = (utcTimestamp: string): string => {
    const date = new Date(utcTimestamp);
    const localDateString = date.toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
    });
    return localDateString.split(",")[0];
};

export const checkTypeImage = (file: FileList) => {
    const type: string[] = ["jpeg", "png", "jpg"];
    return type.some((ty) => ty === file[0]?.type.split("/")[1].toString());
};

// convert link image to image
export const imageUrlToFile = async (imageUrl: string): Promise<File | null> => {
    try {
        // Fetch the image data
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Extract file name from URL
        const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        // Create a File object
        const file = new File([blob], fileName, { type: blob.type });

        return file;
    } catch (error) {
        console.error("Error converting image URL to file:", error);
        return null;
    }
};

export const dataInitResponseApi = {
    timestamp: '',
    success: false,
    message: ''
}

export const messageToast = {
    fillInput: "Please fill in all the fields completely and in the correct format!"
}

export const isPhone = (str: string) => {
    if (str.length === 10)
        return /^[0-9]+$/.test(str);
    else
        return false
}

export const isEmail = (str: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(str);
}

export const getToday = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();

    // Đảm bảo rằng tháng và ngày luôn có hai chữ số
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

// src/utils/dateUtils.ts
export const getNextDay = () => {
    const date = new Date();
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const year = nextDay.getFullYear();
    const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
    const day = nextDay.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};


export const getOneWeekAgo = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const year = oneWeekAgo.getFullYear();
    let month = (oneWeekAgo.getMonth() + 1).toString();
    let day = oneWeekAgo.getDate().toString();

    // Đảm bảo rằng tháng và ngày luôn có hai chữ số
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

export const generateRandomString = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const getOneMonthAgo = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const year = oneMonthAgo.getFullYear();
    let month = (oneMonthAgo.getMonth() + 1).toString();
    let day = oneMonthAgo.getDate().toString();

    // Đảm bảo rằng tháng và ngày luôn có hai chữ số
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

export function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${(now.getMonth() + 1) < 10 ? '0' : ''}${now.getMonth() + 1}`;
    const day = `${now.getDate() < 10 ? '0' : ''}${now.getDate()}`;
    const hours = `${now.getHours() < 10 ? '0' : ''}${now.getHours()}`;
    const minutes = `${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const toastError = (error: unknown, position: ToastPosition) => {
    if (error instanceof AxiosError && error.response) {
        if (error?.response?.data?.error?.subErrorMessage) {
            toast.error(error?.response?.data?.error?.subErrorMessage, {
                position: position
            })
        }
        else {
            toast.error("Server Error. Please try again!", {
                position: position
            })
        }
    }
}