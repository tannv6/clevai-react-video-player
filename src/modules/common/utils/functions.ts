export const formatTime = (time: number) => {
  let sec_num = parseInt(String(time), 10); // don't forget the second param
  let hours: string | number = Math.floor(sec_num / 3600);
  let minutes: string | number = Math.floor((sec_num - hours * 3600) / 60);
  let seconds: string | number = sec_num - hours * 3600 - minutes * 60;
  const hoursDisplay = hours < 10 ? `0${hours}` : hours;
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
  const secondDisplay = seconds < 10 ? `0${seconds}` : seconds;
  return hours === 0
    ? minutesDisplay + ":" + secondDisplay
    : hoursDisplay + ":" + minutesDisplay + ":" + secondDisplay;
};

export const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};
