export const generatorCalendar = (year: number) => {
  const months: Record<number, { month: number; day: number }[]> = {};

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ month: month + 1, day });
    }

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDay();
    const lastMonthLastDate = new Date(year, month, 0).getDate();

    const lastMonthDays = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      lastMonthDays.push({ month: month, day: lastMonthLastDate - i });
    }

    for (let j = 1; j + lastDay < 7; j++) {
      days.push({ month: month + 2, day: j });
    }

    months[month + 1] = [...lastMonthDays, ...days];
  }

  return months;
};
