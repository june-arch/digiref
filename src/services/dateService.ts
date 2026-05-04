import { utcToZonedTime } from "date-fns-tz";
import { format as dateFormat } from "date-fns";

/**
 * 
 * @param date 
 * @param timeZone 
 * @param format 
 * @returns 
 */
export const formater = (
  date: Date,
  timeZone: string = "Asia/Jakarta",
  format: string = "dd-MMM-yyyy HH:mm:ss"
) => {
  const timeInJakarta = utcToZonedTime(date, timeZone);
  return dateFormat(timeInJakarta, format);
};
