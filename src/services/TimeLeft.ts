import dayjs from "dayjs";
export const getTimeLeft = (date: string): string => {
    const now = dayjs();
    const diff = dayjs(date).diff(now);

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff / (60 * 60 * 1000)) % 24);
    const minutes = Math.floor((diff / (60 * 1000)) % 60);
    return `${days}:${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
};
