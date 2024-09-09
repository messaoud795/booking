import { isEqual } from "lodash";
import moment from "moment";
import { toast } from "react-toastify";

export const arePropsEqual = (previousProps, nextProps) =>
  isEqual(previousProps, nextProps);

// Format the start and end dates to ISO 8601 format
export const formatDateToISO8601 = (date) => {
  return moment(date).format("YYYY-MM-DDTHH:mm:ss");
};

export const formatDateToISOStringWithTimezone = (date) => {
  return moment(date).format("YYYY-MM-DDTHH:mm:ssZ");
};

export const convertToLocalTime = (date) => {
  return moment.utc(date).local().toDate();
};

export const toastEmitter = (text, type = "default", fontSize = "16px") => {
  toast(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    type,
    style: { fontSize },
  });
};

export function getNextDay(date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay;
}

export const formatDateForUserDispaly = (date) => {
  return moment(date).format("HH:mm | DD-MM-YYYY");
};
