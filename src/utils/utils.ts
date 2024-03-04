export function getTimeNow(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function getTimeAndDay(): string {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = getTimeNow();
  return `Today is ${day}. The time is ${time}.`;
}

export const calculateTimePassed = (time: number | string): string => {
  const unit: { [key: string]: number } = {
    năm: 12 * 30 * 7 * 24 * 60 * 60 * 1000,
    tháng: 30 * 7 * 24 * 60 * 60 * 1000,
    tuần: 7 * 24 * 60 * 60 * 1000,
    ngày: 24 * 60 * 60 * 1000,
    giờ: 60 * 60 * 1000,
    phút: 60 * 1000,
  };
  const date = new Date(typeof time === "string" ? parseInt(time) : time);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const convertedDate = new Date(formattedDate);
  const diff = Date.now() - convertedDate.getTime();
  for (const key in unit) {
    if (diff > unit[key]) {
      const value = unit[key];
      const timePassed = Math.floor(diff / value);
      return `${timePassed} ${key}${timePassed > 1 ? "" : ""}`;
    }
  }
  return "Just now";
};

export function insertArrayElements<T>(
  arr: T[],
  dragIndex: number,
  hoverIndex: number
): T[] {
  const newLessonList = [...arr];
  const draggedLesson = arr[dragIndex];
  newLessonList.splice(dragIndex, 1); // xóa lesson đang drag khỏi list
  newLessonList.splice(hoverIndex, 0, draggedLesson); // chèn lesson đang drag vào vị trí mới
  return newLessonList;
}

export const isUrl = (str: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
