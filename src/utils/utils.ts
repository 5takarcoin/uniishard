import { recType, slotType, tableStyleType } from "./types";

export function formatHHMM(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 100 + minutes;
}

export function minFromMidnight(time: number) {
  const hours = Math.floor(time / 100);
  const mins = time % 100;
  return hours * 60 + mins;
}

export function minutesToHHMM(time: number) {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return hours * 100 + mins;
}

export const removeIthElement = (arr: string[], i: number) => {
  if (i >= 0 && i < arr.length) {
    arr.splice(i, 1);
  }
  return arr;
};

export function dateInNumber(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return Number(`${year}${month}${day}`);
}

export function strTimeFromMidnight12(mins: number) {
  let hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  const isPm = Math.floor(hours / 12) > 0;
  if (isPm) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${isPm ? "PM" : "AM"}`;
}

export function formatTimeInMinutes(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours * 60 + minutes;
}

export function calculateSlots(schema: tableStyleType) {
  const { start, end, duration, interval } = schema;

  const startInMin = minFromMidnight(start);
  const endInMin = minFromMidnight(end);
  let t = interval + duration;
  if (interval + duration === 0) t = 1;

  const numberOfSlots = (endInMin - startInMin) / t;
  const slots: string[] = [];
  const numSlots: number[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const timeSlot = `${strTimeFromMidnight12(
      startInMin + i * (interval + duration)
    )} to ${strTimeFromMidnight12(
      startInMin + (i + 1) * (interval + duration) - interval
    )}`;
    slots.push(timeSlot);
    numSlots.push(minutesToHHMM(startInMin + i * (interval + duration)));
  }

  return { slots, numSlots };
}

export function reshapeSlots(
  arr?: slotType[]
): Record<string, { title: string; infos: string[] }> {
  if (arr) {
    const newArr = arr.reduce(
      (
        res: Record<string, { title: string; infos: string[] }>,
        { date, infos, title }
      ) => {
        res[date] = { title, infos };
        return res;
      },
      {}
    );
    return newArr;
  }
  return {};
}

export function dayFromToday(date1: Date) {
  const d1 = new Date(date1);
  const d2 = new Date();

  const timeDiff = d1.getTime() - d2.getTime();

  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export function calcSlotDay(i: number) {
  const today = new Date();
  today.setDate(today.getDate() + i);
  return today;
}

export function slotReshaper(
  arr?: slotType[]
): Record<string, { title: string; infos: string[] }> {
  if (arr) {
    const newArr = arr.reduce(
      (
        res: Record<string, { title: string; infos: string[] }>,
        { date, infos, title }
      ) => {
        res[`${convertToMilliseconds(date)}${date.substring(8)}`] = {
          title,
          infos,
        };
        return res;
      },
      {}
    );
    return newArr;
  }
  return {};
}

export function weeklyReshaper(
  arr?: slotType[]
): Record<string, { title: string; infos: string[] }> {
  if (arr) {
    const newArr = arr.reduce(
      (
        res: Record<string, { title: string; infos: string[] }>,
        { date, infos, title }
      ) => {
        res[processWeekly(date)] = { title, infos };
        return res;
      },
      {}
    );
    return newArr;
  }
  return {};
}

function convertToMilliseconds(str: string): number {
  const year: number = parseInt(str.substring(0, 4), 10);
  const month: number = parseInt(str.substring(4, 6), 10) - 1;
  const day: number = parseInt(str.substring(6, 8), 10);

  // const timePart: string = str.substring(8);

  // let hour: number = 0;
  // let minute: number = 0;

  // if (timePart.length === 1 || timePart.length === 2) {
  //   hour = parseInt(timePart, 10);
  // } else if (timePart.length === 3 || timePart.length === 4) {
  //   hour = parseInt(timePart.substring(0, timePart.length - 2), 10);
  //   minute = parseInt(timePart.substring(timePart.length - 2), 10);
  // }

  const date: Date = new Date(year, month, day);

  return date.getTime();
}

function processWeekly(s: string): string {
  const today: Date = new Date();
  const toCompare: number = today.getDay();
  const diff =
    toCompare > Number(s[0])
      ? 7 + Number(s[0]) - toCompare
      : Number(s[0]) - toCompare;
  today.setDate(today.getDate() + diff);
  today.setHours(0, 0, 0, 0);

  return today.getTime() + s.substring(1);
}

function addOneWeek(item: string) {
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
  const [timestamp, suffix] = [item.slice(0, 13), item.substring(13)];
  const updatedTimestamp = Number(timestamp) + millisecondsInAWeek;
  return `${updatedTimestamp}${suffix}`;
}

export function duplicateWeeklyObject(obj: recType | undefined): recType {
  const updatedObject: recType | undefined = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = addOneWeek(key);
      updatedObject[newKey] = { ...obj[key] };
    }
  }

  return { ...obj, ...updatedObject };
}
