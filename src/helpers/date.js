const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

const leftZero = number => number < 10 ? `0${number}` : number;

const getDateString = function getDateString(separator = '/') {
  const date = new Date();

  return `${leftZero(date.getDay())}${separator}${months[date.getMonth()]}${separator}${date.getFullYear()}`;
};

const getTimeString = function getTimeString(separator = ':') {
  const date = new Date();

  return `${leftZero(date.getHours())}${separator}${leftZero(date.getMinutes())}${separator}${leftZero(date.getSeconds())}`;
};

module.exports = {
  getDateString,
  getTimeString,
};