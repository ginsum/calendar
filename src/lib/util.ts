export const padStartNum = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const generatorCalendar = (year: number) => {
  const months: Record<number, { date: string; day: number }[]> = {};

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: `${year}-${padStartNum(month + 1)}-${padStartNum(day)}`,
        day,
      });
    }

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const lastMonthLastDate = new Date(year, month, 0).getDate();

    const lastMonthDays = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      lastMonthDays.push({
        date: `${year}-${padStartNum(month)}-${padStartNum(
          lastMonthLastDate - i
        )}`,
        day: lastMonthLastDate - i,
      });
    }

    for (let j = 1; j + lastDay < 7; j++) {
      days.push({
        date: `${year}-${padStartNum(month + 2)}-${padStartNum(j)}`,
        day: j,
      });
    }

    months[month + 1] = [...lastMonthDays, ...days];
  }

  return months;
};

export const formattedDate = (date: string) => {
  if (!date) {
    return;
  }
  const newDate = new Date(date);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(newDate);
};

export const moveDate = (date: string, moveNumber: number) => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + moveNumber);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
