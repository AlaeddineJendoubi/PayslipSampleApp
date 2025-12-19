export const convertDateToReadableString = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

export const convertStringIsoDateToTimestamp = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getTime();
};
