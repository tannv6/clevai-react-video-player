import { useRef, useState, useContext, useEffect } from "react";
import { formatTime } from "../../utils/functions";
import { ACTIONS_TYPE, Context } from "../../utils/hooks";

function Progress({
  videoRef,
  timerProgress,
  handleShowControls,
  holdControlsShow,
}: any) {
  const {
    dispatch,
    state: { range },
  } = useContext(Context);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isHoldingInRange, setIsHoldingInRange] = useState(false);
  const [isHoverProgress, setIsHoverProgress] = useState(false);
  const [shouldShowProgressTitle, setShouldShowProgressTitle] = useState(false);
  const timerHoverProgress = useRef<any>(null);
  const progressTitleRef = useRef<HTMLSpanElement>(null);
  const handleRangeMouseUp = (event: any) => {
    dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: false });
    setIsHoldingInRange(false);
    if (videoRef.current?.currentTime || videoRef.current?.currentTime === 0) {
      const sliderWidth = progressRef.current?.offsetWidth!;
      const sliderOffsetX =
        progressRef.current?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      const currentMouseXPos =
        event.clientX + window.pageXOffset - sliderOffsetX + 0.5;
      let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
      if (sliderValAtPos < 0) {
        sliderValAtPos = 0;
      }
      if (sliderValAtPos > 100) sliderValAtPos = 100;
      const totalDuration = videoRef.current?.duration;
      const time = (sliderValAtPos * totalDuration) / 100;
      videoRef.current.currentTime = time;
      dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: sliderValAtPos });
      dispatch({ type: ACTIONS_TYPE.SET_TIME_CLOCK, res: time });
    }
    timerProgress.current = setInterval(() => {
      const totalDuration = videoRef.current?.duration;
      const progressValue =
        (videoRef.current?.currentTime! / totalDuration!) * 100;
      dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: progressValue });
    }, 200);
  };

  const handleRangeTouchStart = () => {
    handleShowControls();
    setIsHoldingInRange(true);
    clearTimeout(timerHoverProgress.current);
    setIsHoverProgress(true);
    clearInterval(timerProgress.current);
  };

  const handleRangeTouchEnd = (event: any) => {
    holdControlsShow();
    dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: false });
    setIsHoldingInRange(false);
    setShouldShowProgressTitle(false);
    timerHoverProgress.current = setTimeout(() => {
      setIsHoverProgress(false);
    }, 1500);
    if (videoRef.current?.currentTime || videoRef.current?.currentTime === 0) {
      const sliderWidth = progressRef.current?.offsetWidth!;
      const sliderOffsetX =
        progressRef.current?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      var touch = event.touches[0] || event.changedTouches[0];
      const clientX = touch.clientX;
      const currentMouseXPos =
        clientX + window.pageXOffset - sliderOffsetX + 0.5;
      let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
      const totalDuration = videoRef.current?.duration;
      const time = (sliderValAtPos * totalDuration) / 100;
      videoRef.current.currentTime = time;
      dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: sliderValAtPos });
      dispatch({ type: ACTIONS_TYPE.SET_TIME_CLOCK, res: time });
    }
    timerProgress.current = setInterval(() => {
      const totalDuration = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / totalDuration!) * 100;
      dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: pro1 });
    }, 200);
  };

  const handleRangeMouseDown = () => {
    holdControlsShow();
    setIsHoldingInRange(true);
    clearInterval(timerProgress.current);
  };

  const handleTouchMove = (e: any) => {
    !shouldShowProgressTitle && setShouldShowProgressTitle(true);
    const sliderTitle = progressTitleRef.current;
    const sliderWidth = progressRef.current?.offsetWidth!;
    const sliderOffsetX =
      progressRef.current?.getBoundingClientRect()?.left! -
      document.documentElement.getBoundingClientRect().left;
    var touch = e.touches[0] || e.changedTouches[0];
    const clientX = touch.clientX;
    const currentMouseXPos = clientX + window.pageXOffset - sliderOffsetX + 0.5;
    let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
    const totalDuration = videoRef.current?.duration;
    const time = (sliderValAtPos * totalDuration) / 100;
    if (sliderTitle) {
      const timeString = formatTime(time);
      if (currentMouseXPos < timeString.length * 3) {
        sliderTitle.style.left = timeString.length * 3 + "px";
      } else if (currentMouseXPos > sliderWidth - timeString.length * 3) {
        sliderTitle.style.left = `${sliderWidth - timeString.length * 3}px`;
      } else {
        sliderTitle.style.left = currentMouseXPos + "px";
      }
      sliderTitle.innerHTML = formatTime(time);
    }
    dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: sliderValAtPos });
  };

  const handleMouseMove = (e: any) => {
    const sliderWidth = progressRef.current?.offsetWidth!;
    const sliderOffsetX =
      progressRef.current?.getBoundingClientRect()?.left! -
      document.documentElement.getBoundingClientRect().left;
    const currentMouseXPos =
      e.clientX + window.pageXOffset - sliderOffsetX + 0.5;
    let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
    if (sliderValAtPos < 0) {
      sliderValAtPos = 0;
    }
    if (sliderValAtPos > 100) sliderValAtPos = 100;
    const totalDuration = videoRef.current?.duration;
    const time = (sliderValAtPos * totalDuration) / 100;
    const sliderTitle = progressTitleRef.current;
    if (sliderTitle) {
      const timeString = formatTime(time);
      if (currentMouseXPos < timeString.length * 3) {
        sliderTitle.style.left = timeString.length * 3 + "px";
      } else if (currentMouseXPos > sliderWidth - timeString.length * 3) {
        sliderTitle.style.left = `${sliderWidth - timeString.length * 3}px`;
      } else {
        sliderTitle.style.left = currentMouseXPos + "px";
      }
      sliderTitle.innerHTML = timeString;
    }
    if (isHoldingInRange) {
      dispatch({ type: ACTIONS_TYPE.SET_RANGE, res: sliderValAtPos });
    }
  };
  useEffect(() => {
    if (!isHoldingInRange) {
      setShouldShowProgressTitle(false);
    }
  }, [isHoldingInRange]);
  return (
    <div
      className={`player-progress ${
        isHoverProgress ? "player-progress-hover" : ""
      }`}
      id="player-progress"
      ref={progressRef}
      onMouseUp={handleRangeMouseUp}
      onMouseDown={handleRangeMouseDown}
      onMouseMove={handleMouseMove}
      onMouseOver={() => {
        !shouldShowProgressTitle && setShouldShowProgressTitle(true);
      }}
      onMouseEnter={(e) => {
        setIsHoverProgress(true);
        handleShowControls();
      }}
      onMouseLeave={() => {
        setIsHoverProgress(false);
        setShouldShowProgressTitle(false);
        holdControlsShow();
      }}
      onTouchStart={handleRangeTouchStart}
      onTouchEnd={handleRangeTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <div
        className="progress-bar"
        style={{
          background: `linear-gradient(to right, #1877f2 ${range}%, #deebff ${range}%)`,
        }}
      ></div>
      <span className="circle-range-point" style={{ left: `${range}%` }}></span>
      <span
        ref={progressTitleRef}
        className={`slider-title ${
          shouldShowProgressTitle ? "slider-title-show" : ""
        }`}
      ></span>
    </div>
  );
}

export default Progress;
