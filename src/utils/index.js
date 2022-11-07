const showFormattedDate = (date, format) => {
  const getLocal = format;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(`${getLocal === 'id' ? 'id-ID' : 'en-US'}`, options);
};

export { showFormattedDate };
