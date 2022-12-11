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
  handleExitFull,
  isFullScreen,
}: any) {
  const timerInputRange = useRef<any>(null);
  const inputRangeRef = useRef<HTMLDivElement>(null);
  const [timeClock, setTimeClock] = useState(0);
  const [isHoldingInRange, setIsHoldingInRange] = useState(false);
  const [isHoverProgress, setIsHoverProgress] = useState(false);
  const [shouldShowProgressTitle, setShouldShowProgressTitle] = useState(false);
  const timerHoverProgress = useRef<any>(null);
  useEffect(() => {
    const clock = setInterval(() => {
      setTimeClock(videoRef.current?.currentTime || 0);
    }, 1000);
    timerInputRange.current = setInterval(() => {
      const total = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / total!) * 100;
      setRange(pro1);
    }, 1000);
    return () => {
      clearInterval(clock);
      clearInterval(timerInputRange.current);
    };
  }, []);
  const handleSetMute = () => {
    if (mute) {
      setMute(false);
      setVolume(videoRef.current?.volume! * 100);
    } else {
      setMute(true);
      setVolume(0);
    }
  };

  const handleVolumeChange = (e: any) => {
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
    setIsHoldingInRange(false);
    if (videoRef.current?.currentTime || videoRef.current?.currentTime === 0) {
      const sliderWidth = inputRangeRef.current?.offsetWidth!;
      const sliderOffsetX =
        inputRangeRef.current?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      const currentMouseXPos =
        event.clientX + window.pageXOffset - sliderOffsetX + 0.5;
      let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
      if (sliderValAtPos < 0) {
        sliderValAtPos = 0;
      }
      if (sliderValAtPos > 100) sliderValAtPos = 100;
      const total = videoRef.current?.duration;
      const time = (sliderValAtPos * total) / 100;
      videoRef.current.currentTime = time;
      setRange(sliderValAtPos);
      setTimeClock(time);
    }
    timerInputRange.current = setInterval(() => {
      const total = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / total!) * 100;
      setRange(pro1);
    }, 1000);
  };

  const handleRangeTouchEnd = (event: any) => {
    setIsHoldingInRange(false);
    setShouldShowProgressTitle(false);
    timerHoverProgress.current = setTimeout(() => {
      setIsHoverProgress(false);
    }, 2000);
    if (videoRef.current?.currentTime || videoRef.current?.currentTime === 0) {
      const sliderWidth = inputRangeRef.current?.offsetWidth!;
      const sliderOffsetX =
        inputRangeRef.current?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      var touch = event.touches[0] || event.changedTouches[0];
      const clientX = touch.clientX;
      const currentMouseXPos =
        clientX + window.pageXOffset - sliderOffsetX + 0.5;
      let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
      const total = videoRef.current?.duration;
      const time = (sliderValAtPos * total) / 100;
      videoRef.current.currentTime = time;
      setRange(sliderValAtPos);
      setTimeClock(time);
    }
    timerInputRange.current = setInterval(() => {
      const total = videoRef.current?.duration;
      const pro1 = (videoRef.current?.currentTime! / total!) * 100;
      setRange(pro1);
    }, 1000);
  };

  const handleRangeMouseDown = () => {
    setIsHoldingInRange(true);
    setShouldShowProgressTitle(true);
    clearTimeout(timerHoverProgress.current);
    setIsHoverProgress(true);
    if (timerInputRange.current) {
      clearInterval(timerInputRange.current);
      timerInputRange.current = null;
    }
  };

  const handlePip = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.current?.requestPictureInPicture();
      setIsPip(true);
    }
  };
  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const sliderTitle = document.getElementById("slider-title");
      const sliderWidth = inputRangeRef.current?.offsetWidth!;
      const sliderOffsetX =
        inputRangeRef.current?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      const currentMouseXPos =
        event.clientX + window.pageXOffset - sliderOffsetX + 0.5;
      let sliderValAtPos = Math.round((currentMouseXPos / sliderWidth) * 100);
      if (sliderValAtPos < 0) {
        sliderValAtPos = 0;
      }
      if (sliderValAtPos > 100) sliderValAtPos = 100;
      const total = videoRef.current?.duration;
      const time = (sliderValAtPos * total) / 100;
      if (sliderTitle) {
        sliderTitle.innerHTML = formatTime(time);
        sliderTitle.style.left = currentMouseXPos + "px";
      }
    };
    inputRangeRef.current?.addEventListener("mousemove", handleMouseMove);
    return () => {
      inputRangeRef.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      <div
        className={`controls ${
          controlsShow ? "controls-show" : "controls-hide"
        }`}
      >
        <div
          className={`player-progress ${
            isHoverProgress ? "player-progress-hover" : ""
          }`}
          ref={inputRangeRef}
          onMouseUp={handleRangeMouseUp}
          onMouseDown={handleRangeMouseDown}
          onMouseMove={(e) => {
            e.preventDefault();
            if (isHoldingInRange) {
              const sliderWidth = inputRangeRef.current?.offsetWidth!;
              const sliderOffsetX =
                inputRangeRef.current?.getBoundingClientRect()?.left! -
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
              setRange(sliderValAtPos);
            }
          }}
          onMouseEnter={() => {
            setIsHoverProgress(true);
            setShouldShowProgressTitle(true);
          }}
          onMouseLeave={() => {
            setIsHoverProgress(false);
            setShouldShowProgressTitle(false);
          }}
          onTouchStart={handleRangeMouseDown}
          onTouchEnd={handleRangeTouchEnd}
          onTouchMove={(e) => {
            const sliderTitle = document.getElementById("slider-title");
            const sliderWidth = inputRangeRef.current?.offsetWidth!;
            const sliderOffsetX =
              inputRangeRef.current?.getBoundingClientRect()?.left! -
              document.documentElement.getBoundingClientRect().left;
            var touch = e.touches[0] || e.changedTouches[0];
            const clientX = touch.clientX;
            const currentMouseXPos =
              clientX + window.pageXOffset - sliderOffsetX + 0.5;
            let sliderValAtPos = Math.round(
              (currentMouseXPos / sliderWidth) * 100
            );
            const total = videoRef.current?.duration;
            const time = (sliderValAtPos * total) / 100;
            if (sliderTitle) {
              sliderTitle.innerHTML = formatTime(time);
              sliderTitle.style.left = currentMouseXPos + "px";
            }
            setRange(sliderValAtPos);
          }}
        >
          <div
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #1877f2 ${range}%, #deebff ${range}%)`,
            }}
          ></div>
          <span
            className="circle-range-point"
            style={{ left: `${range}%` }}
          ></span>
          <span
            id="slider-title"
            className={shouldShowProgressTitle ? "slider-title-show" : ""}
          ></span>
        </div>
        <div className="main-controls">
          <div className="main-controls_left">
            <button
              onClick={() => handleSeek("BACKWARD")}
              className="btn-rewind"
            >
              <span className="icon-rewind">
                <span></span>
                <span></span>
              </span>
            </button>
            <button
              onClick={handlePlayVideo}
              className="btn-play-pause"
              id="btn-play-pause"
            >
              {videoRef.current?.paused ? (
                <div className="play-icon"></div>
              ) : (
                <div className="pause-icon">
                  <div></div>
                  <div></div>
                </div>
              )}
            </button>
            <button
              onClick={() => handleSeek("FORWARD")}
              className="btn-fast-forward"
            >
              <span className="icon-rewind">
                <span></span>
                <span></span>
              </span>
            </button>
            <button className="btn-volume">
              <img
                src={mute ? IconMute : IconVolume}
                alt=""
                onClick={handleSetMute}
              />
              <input
                type="range"
                value={volume}
                onChange={handleVolumeChange}
                className="input-volume"
                max={100}
                min={0}
                style={{
                  background: `linear-gradient(to right, #00b2ff ${volume}%,#ffffff  ${volume}%)`,
                }}
              />
            </button>
            <span className="clock">
              {formatTime(timeClock)} /{" "}
              {formatTime(videoRef.current?.duration || 0)}
            </span>
          </div>
          <div className="main-controls_right">
            <button className="btn-setting">
              <img src={IconSetting} alt="" />
            </button>
            <button onClick={handlePip} className="btn-pip">
              <img src={isPip ? IconEXitPip : IconPip} alt="" />
            </button>
            <button onClick={handleExitFull} className="btn-full-screen">
              <img
                src={isFullScreen ? IconExitFullScreen : IconFullScreen}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
