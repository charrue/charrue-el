import dayjs from "dayjs";

export function isPrimary(obj) {
  return (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  );
}

export const formatTime = (date, showHour = false) => dayjs(date).format(`YYYY-MM-DD${showHour ? " HH:mm:ss" : ""}`);

export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
