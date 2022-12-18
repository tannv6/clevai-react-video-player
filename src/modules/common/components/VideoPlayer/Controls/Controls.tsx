/* eslint-disable react-hooks/exhaustive-deps */
import "./controls.scss";
import { formatTime } from "../../../utils/functions";
import { useState, useEffect, useRef } from "react";
import {
  IconExitFullScreen,
  IconEXitPip,
  IconFullScreen,
  IconMute,
  IconPip,
  IconRewind,
  IconSetting,
  IconVolume,
} from "../../../assets/icons";
function Controls({
  controlsShow,
  range,
  handleSeek,
  videoRef,
  mute,
  setMute,
  setVolume,
  setRange,
  holdControlsShow,
  setIsPip,
  handlePlayVideo,
  volume,
  isPip,
  handleFullScreen,
  isFullScreen,
  handleClickSetting,
  showSetting,
  setShowSetting,
  device,
  timeClock,
  setTimeClock,
  handleShowControls,
}: any) {
  const timerProgress = useRef<any>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isHoldingInRange, setIsHoldingInRange] = useState(false);
  const [isHoverProgress, setIsHoverProgress] = useState(false);
  const [shouldShowProgressTitle, setShouldShowProgressTitle] = useState(false);
  const [shouldShowVolume, setShouldShowVolume] = useState(false);
  const timerHoverProgress = useRef<any>(null);
  const [isHoverVolume, setIsHoverVolume] = useState(false);
  const progressTitleRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const clock = setInterval(() => {
      setTimeClock(videoRef.current?.currentTime || 0);
    }, 500);
    timerProgress.current = setInterval(() => {
      const totalDuration = videoRef.current?.duration;
      const progressValue =
        (videoRef.current?.currentTime! / totalDuration!) * 100;
      setRange(progressValue);
    }, 200);
    return () => {
      clearInterval(clock);
      clearInterval(timerProgress.current);
    };
  }, []);
  const handleSetMute = () => {
    holdControlsShow();
    if (mute) {
      setMute(false);
      setVolume(videoRef.current?.volume! * 100);
    } else {
      setMute(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: any) => {
    holdControlsShow();
    setVolume(e.target.value);
    if (videoRef.current?.volume || videoRef.current?.volume === 0) {
      videoRef.current.volume = e.target.value / 100;
    }
    if (Number(e.target.value) === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
  };

  const handleRangeMouseUp = (event: any) => {
    setShowSetting(false);
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
      setRange(sliderValAtPos);
      setTimeClock(time);
    }
    timerProgress.current = setInterval(() => {
      const totalDuration = videoRef.current?.duration;
      const progressValue =
        (videoRef.current?.currentTime! / totalDuration!) * 100;
      setRange(progressValue);
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
    setShowSetting(false);
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
      setRange(sliderValAtPos);
      setTimeClock(time);
    }
    timerProgress.current = setInterval(() => {
      const totalDuration = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / totalDuration!) * 100;
      setRange(pro1);
    }, 200);
  };

  const handleRangeMouseDown = () => {
    holdControlsShow();
    setIsHoldingInRange(true);
    clearInterval(timerProgress.current);
  };

  const handlePip = async () => {
    holdControlsShow();
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.current?.requestPictureInPicture();
      setIsPip(true);
    }
  };

  useEffect(() => {
    if (!isHoldingInRange) {
      setShouldShowProgressTitle(false);
    }
  }, [isHoldingInRange]);

  return (
    <>
      <div
        className={`controls ${
          controlsShow ? "controls-show" : "controls-hide"
        }`}
        onMouseLeave={() => setShouldShowVolume(false)}
      >
        <div
          className={`player-progress ${
            isHoverProgress ? "player-progress-hover" : ""
          }`}
          id="player-progress"
          ref={progressRef}
          onMouseUp={handleRangeMouseUp}
          onMouseDown={handleRangeMouseDown}
          onMouseMove={(e: any) => {
            const sliderWidth = progressRef.current?.offsetWidth!;
            const sliderOffsetX =
              progressRef.current?.getBoundingClientRect()?.left! -
              document.documentElement.getBoundingClientRect().left;
            const currentMouseXPos =
              e.clientX + window.pageXOffset - sliderOffsetX + 0.5;
            let sliderValAtPos = Math.round(
              (currentMouseXPos / sliderWidth) * 100
            );
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
              } else if (
                currentMouseXPos >
                sliderWidth - timeString.length * 3
              ) {
                sliderTitle.style.left = `${
                  sliderWidth - timeString.length * 3
                }px`;
              } else {
                sliderTitle.style.left = currentMouseXPos + "px";
              }
              sliderTitle.innerHTML = timeString;
            }
            if (isHoldingInRange) {
              setRange(sliderValAtPos);
            }
          }}
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
          onTouchMove={(e) => {
            !shouldShowProgressTitle && setShouldShowProgressTitle(true);
            const sliderTitle = progressTitleRef.current;
            const sliderWidth = progressRef.current?.offsetWidth!;
            const sliderOffsetX =
              progressRef.current?.getBoundingClientRect()?.left! -
              document.documentElement.getBoundingClientRect().left;
            var touch = e.touches[0] || e.changedTouches[0];
            const clientX = touch.clientX;
            const currentMouseXPos =
              clientX + window.pageXOffset - sliderOffsetX + 0.5;
            let sliderValAtPos = Math.round(
              (currentMouseXPos / sliderWidth) * 100
            );
            const totalDuration = videoRef.current?.duration;
            const time = (sliderValAtPos * totalDuration) / 100;
            if (sliderTitle) {
              const timeString = formatTime(time);
              if (currentMouseXPos < timeString.length * 3) {
                sliderTitle.style.left = timeString.length * 3 + "px";
              } else if (
                currentMouseXPos >
                sliderWidth - timeString.length * 3
              ) {
                sliderTitle.style.left = `${
                  sliderWidth - timeString.length * 3
                }px`;
              } else {
                sliderTitle.style.left = currentMouseXPos + "px";
              }
              sliderTitle.innerHTML = formatTime(time);
            }
            setRange(sliderValAtPos);
          }}
        >
          <div
            className="progress-bar"
            id="player-progress__bar"
            style={{
              background: `linear-gradient(to right, #1877f2 ${range}%, #deebff ${range}%)`,
            }}
          ></div>
          <span
            className="circle-range-point"
            id="player-progress__point"
            style={{ left: `${range}%` }}
          ></span>
          <span
            ref={progressTitleRef}
            className={`slider-title ${
              shouldShowProgressTitle ? "slider-title-show" : ""
            }`}
            id="player-progress__title"
          ></span>
        </div>
        <div className="main-controls">
          <div className="main-controls_left">
            <button
              onClick={() => handleSeek("BACKWARD")}
              className="btn-rewind"
            >
              <img src={IconRewind} alt="" />
            </button>
            <button
              onClick={handlePlayVideo}
              className="btn-play-pause"
              id="btn-play-pause"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {!videoRef.current?.paused ? (
                  <path
                    d="M9.99998 17.5V8.5M16 17.5V8.5M13 25C6.37256 25 1 19.6274 1 13C1 6.37259 6.37256 1 13 1C19.6274 1 25 6.37259 25 13C25 19.6274 19.6274 25 13 25Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M17.4143 13.9928L16.7451 12.9649L16.7281 12.9761L16.7113 12.9877L17.4143 13.9928ZM17.4143 12.305L16.687 13.2925L16.7417 13.3328L16.8006 13.3668L17.4143 12.305ZM10.65 7.32412L11.3772 6.33655L11.3426 6.31108L11.3063 6.28807L10.65 7.32412ZM9.23198 8.06807L10.4584 8.06451L10.4584 8.05378L10.4581 8.04305L9.23198 8.06807ZM9.26035 17.8521L8.03394 17.8556L8.03404 17.8903L8.0361 17.9249L9.26035 17.8521ZM10.7304 18.6674L11.3243 19.7405L11.3806 19.7093L11.4333 19.6724L10.7304 18.6674ZM13 23.5472C7.17495 23.5472 2.45283 18.8251 2.45283 13H0C0 20.1797 5.82029 26 13 26V23.5472ZM23.5472 13C23.5472 18.8251 18.825 23.5472 13 23.5472V26C20.1797 26 26 20.1797 26 13H23.5472ZM13 2.45283C18.825 2.45283 23.5472 7.17497 23.5472 13H26C26 5.8203 20.1797 0 13 0V2.45283ZM13 0C5.82029 0 0 5.8203 0 13H2.45283C2.45283 7.17497 7.17495 2.45283 13 2.45283V0ZM18.0833 15.0205C18.616 14.6738 19.2894 14.0552 19.2882 13.1227C19.2869 12.163 18.579 11.5616 18.0278 11.2431L16.8006 13.3668C16.929 13.441 16.9525 13.4795 16.9347 13.4568C16.9082 13.423 16.8356 13.3068 16.8354 13.1261C16.8351 12.9499 16.9039 12.8462 16.9147 12.8317C16.9199 12.8247 16.8821 12.8757 16.7451 12.9649L18.0833 15.0205ZM18.1414 11.3173L11.3772 6.33655L9.92286 8.31168L16.687 13.2925L18.1414 11.3173ZM11.3063 6.28807C10.7292 5.92246 9.91867 5.71299 9.15213 6.0709C8.31787 6.46043 7.98963 7.29957 8.00583 8.0931L10.4581 8.04305C10.4567 7.97123 10.4716 7.99445 10.4339 8.06661C10.3914 8.14793 10.3084 8.23806 10.1898 8.2934C9.9618 8.39989 9.86977 8.28162 9.99377 8.36016L11.3063 6.28807ZM8.00557 8.07162L8.03394 17.8556L10.4868 17.8485L10.4584 8.06451L8.00557 8.07162ZM8.0361 17.9249C8.07511 18.5802 8.30292 19.4539 9.12514 19.8929C9.93469 20.3254 10.7775 20.043 11.3243 19.7405L10.1366 17.5944C10.015 17.6616 9.96721 17.6654 9.98641 17.6627C10.0154 17.6586 10.1352 17.6517 10.2807 17.7294C10.4282 17.8081 10.492 17.9152 10.5075 17.9482C10.5177 17.9699 10.4934 17.928 10.4846 17.7792L8.0361 17.9249ZM11.4333 19.6724L18.1171 14.9977L16.7113 12.9877L10.0275 17.6624L11.4333 19.6724Z"
                    fill="white"
                  />
                )}
              </svg>
            </button>
            <button
              onClick={() => handleSeek("FORWARD")}
              className="btn-fast-forward"
            >
              <img src={IconRewind} alt="" />
            </button>
            <button
              className="btn-volume"
              onMouseEnter={() => setShouldShowVolume(true)}
            >
              <img
                src={mute ? IconMute : IconVolume}
                alt=""
                onClick={handleSetMute}
              />
              <input
                type="range"
                value={volume}
                onChange={handleVolumeChange}
                className={`input-volume ${
                  isHoverVolume ? "input-volume-hover" : ""
                }`}
                max={100}
                min={0}
                style={{
                  background: `linear-gradient(to right, #ffffff ${volume}%,#ffffff1a  ${volume}%)`,
                  width: shouldShowVolume || device === "TOUCH" ? undefined : 0,
                }}
                onTouchStart={() => setIsHoverVolume(true)}
                onTouchEnd={() => setIsHoverVolume(false)}
              />
            </button>
            <span className="clock">
              {formatTime(timeClock)} /{" "}
              {formatTime(videoRef.current?.duration || 0)}
            </span>
          </div>
          <div className="main-controls_right">
            {document.pictureInPictureEnabled && (
              <button onClick={handlePip} className="btn-pip">
                <img src={isPip ? IconEXitPip : IconPip} alt="" />
              </button>
            )}
            <button onClick={handleFullScreen} className="btn-full-screen">
              <img
                src={isFullScreen ? IconExitFullScreen : IconFullScreen}
                alt=""
              />
            </button>
            <button
              className={`btn-setting ${
                showSetting ? "btn-setting-show" : "btn-setting-hide"
              }`}
              onClick={handleClickSetting}
            >
              <img src={IconSetting} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
