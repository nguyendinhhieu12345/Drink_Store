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
  fillInput: "Please fill out all fields completely!"
}

export const isNumber = (str: string) => {
  if (str.length === 10)
    return /^[0-9]+$/.test(str);
  else
    return false
}

export const isEmail = (str: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(str);
}