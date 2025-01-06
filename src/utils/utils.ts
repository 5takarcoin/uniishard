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
