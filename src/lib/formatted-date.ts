const newDate = new Date('2023-12-03T09:00:00');

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  // hour and minute removed
};

export const formattedDate = new Intl.DateTimeFormat('en-US', options).format(newDate);
