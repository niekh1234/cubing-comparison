export const getTimeInSeconds = (time: string) => {
  if (!time) {
    return 0;
  }

  if (time.match(/[^0-9:.,]/)) {
    return 0;
  }

  // if colon is present, split time into minutes and seconds
  if (/:/.test(time)) {
    const [minutes, seconds] = time.split(':').map(Number);
    return seconds + minutes * 60;
  }

  return parseFloat(time);
};

export const getTimeString = (seconds: number): string => {
  if (seconds === 0) {
    return '';
  }

  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const secondsLeftString =
    secondsLeft < 10 ? `0${secondsLeft.toFixed(2)}` : secondsLeft.toFixed(2);

  if (minutes === 0) {
    return secondsLeftString;
  }

  const minutesWithPrependedZero = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${minutesWithPrependedZero}:${secondsLeftString}`;
};

export const getPrettyTime = (time: string) => {
  const inSeconds = getTimeInSeconds(time);
  return getTimeString(inSeconds);
};
