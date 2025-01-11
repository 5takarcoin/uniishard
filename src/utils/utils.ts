import { slotType, tableStyleType } from "./types";

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

  const timeDiff = Math.abs(d1.getTime() - d2.getTime());

  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}
