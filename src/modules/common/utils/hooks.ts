/* eslint-disable react-hooks/exhaustive-deps */
import { MOBILE_WIDTH } from "./constants";
import { useEffect, useState, useRef } from "react";
import { isTouchDevice } from "./functions";
export const useInitEffect = ({ ref, muted }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const videoRef = ref ? ref : useRef<HTMLVideoElement>(null);
  const timerShowControls = useRef<any>(null);
  const timeStart = useRef(0);
  const [controlsShow, setControlsShow] = useState(false);
  const [range, setRange] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mute, setMute] = useState(muted);
  const [isPip, setIsPip] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlay, setIsPlay] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_WIDTH);
  const [isError, setIsError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [timeClock, setTimeClock] = useState(0);
  const [device, setDevice] = useState<"TOUCH" | "NO_TOUCH">(
    isTouchDevice() ? "TOUCH" : "NO_TOUCH"
  );
  const timerClickRef = useRef<any>(null);
  const [showEffect, setShowEffect] = useState(false);
  const timerShowPlayEffectRef = useRef<any>(null);
  const playEffect = () => {
    setShowEffect(true);
    clearTimeout(timerShowPlayEffectRef.current);
    timerShowPlayEffectRef.current = setTimeout(() => {
      setShowEffect(false);
    }, 500);
  };
  const [seekEffect, setSeekEffect] = useState<{
    show: boolean;
    type: "BACKWARD" | "FORWARD" | "";
    key: number;
  }>({
    show: false,
    type: "",
    key: 0,
  });

  const isTouchAble = device === "TOUCH";
  const shouldIsMobile = isTouchAble || isMobile;
  // const mustIsMobile = isTouchAble && isMobile;

  useEffect(() => {
    if (controlsShow) {
      if (isTouchDevice()) {
        setDevice("TOUCH");
      } else {
        setDevice("NO_TOUCH");
      }
    }
  }, [controlsShow]);
  const handlePlayVideo = () => {
    holdControlsShow();
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
      playEffect();
    } else {
      videoRef.current?.pause();
      playEffect();
    }
  };

  const handleReplayVideo = () => {
    holdControlsShow();
    videoRef.current?.play();
  };

  const handleShowControls = () => {
    clearTimeout(timerShowControls.current);
    setControlsShow(true);
  };

  const handleClickVideo = (e: any) => {
    e.preventDefault();
    holdControlsShow();
    if (showSetting) {
      setShowSetting(false);
    } else {
      if (controlsShow && !shouldIsMobile) {
        if (videoRef.current?.paused || videoRef.current?.ended) {
          videoRef.current?.play();
          playEffect();
        } else {
          videoRef.current?.pause();
          playEffect();
        }
      } else {
        if (e.detail === 1) {
          timerClickRef.current = setTimeout(() => {
            if (controlsShow && shouldIsMobile) {
              clearTimeout(timerShowControls.current);
              setControlsShow(false);
            } else if (!controlsShow && shouldIsMobile) {
              setControlsShow(true);
            }
          }, 250);
        } else {
          clearTimeout(timerClickRef.current);
        }
      }
    }
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else if (!document.fullscreenElement) {
      if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
        setIsFullScreen(true);
      } else if ((wrapperRef?.current as any)?.webkitRequestFullscreen) {
        (wrapperRef?.current as any)?.webkitRequestFullscreen();
        setIsFullScreen(true);
      } else {
        wrapperRef?.current?.requestFullscreen();
        setIsFullScreen(true);
      }
    }
  };

  const holdControlsShow = () => {
    clearTimeout(timerShowControls.current);
    if (!showSetting && !videoRef.current?.paused) {
      timeStart.current = Date.now();
      timerShowControls.current = setTimeout(() => {
        setControlsShow(false);
      }, 6000);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!(e.target.id || "")?.includes("progress")) {
      if (!controlsShow) {
        setControlsShow(true);
        holdControlsShow();
      } else if (Date.now() - timeStart.current < 6000) {
        holdControlsShow();
      }
    }
  };

  const handleMouseLeave = () => {
    if (!showSetting && !videoRef.current?.paused) {
      clearTimeout(timerShowControls.current);
      setControlsShow(false);
    }
  };

  const handleSeek = (type: "FORWARD" | "BACKWARD") => {
    holdControlsShow();
    const total = videoRef.current?.duration;
    if (type === "FORWARD") {
      if (
        (videoRef.current?.currentTime ||
          videoRef.current?.currentTime === 0) &&
        videoRef.current?.currentTime < total
      ) {
        videoRef.current.currentTime = videoRef.current?.currentTime! + 10;
        setTimeClock(videoRef.current.currentTime || 0);
        setRange((range) => range + (10 / total) * 100);
        setSeekEffect({
          show: true,
          type: "FORWARD",
          key: Math.random(),
        });
      }
    } else {
      if (videoRef.current?.currentTime) {
        videoRef.current.currentTime = videoRef.current?.currentTime! - 10;
        setTimeClock(videoRef.current.currentTime || 0);
        setRange((range) => range - (10 / total) * 100);
        setSeekEffect({
          show: true,
          type: "BACKWARD",
          key: Math.random(),
        });
      }
    }
  };

  useEffect(() => {
    if (isPlay) {
      setIsEnded(false);
    }
  }, [isPlay]);

  useEffect(() => {
    const handleDOMFocusOut = (e: any) => {
      if (
        !containerRef.current?.contains(e.target) &&
        e.target.tagName === "INPUT"
      ) {
        window.removeEventListener("keydown", handleKeyDown);
        window.addEventListener("keydown", handleKeyDown);
      }
    };
    const handleDOMFocusIn = (e: any) => {
      if (
        !containerRef.current?.contains(e.target) &&
        e.target.tagName === "INPUT"
      ) {
        window.removeEventListener("keydown", handleKeyDown);
      }
    };
    const handleResize = () => {
      if (containerRef.current?.offsetWidth! <= MOBILE_WIDTH) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight") {
        e.preventDefault();
        setControlsShow(true);
        handleSeek("FORWARD");
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setControlsShow(true);
        handleSeek("BACKWARD");
      } else if (e.code === "Space") {
        e.preventDefault();
        setControlsShow(true);
        handlePlayVideo();
      }
    };

    const onFullScreenChange = (e: any) => {
      if (
        !(document as any).webkitIsFullScreen &&
        !(document as any).mozFullScreen &&
        !(document as any).msFullscreenElement
      ) {
        setIsFullScreen(false);
      }
    };

    const handleClickOutSite = (e: any) => {
      if (!containerRef.current?.contains(e.target as any)) {
        clearTimeout(timerShowControls.current);
        setControlsShow(false);
        setShowSetting(false);
      }
    };

    window.addEventListener("focusout", handleDOMFocusOut);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleDOMFocusIn);
    const handleLeavePip = () => {
      setIsPip(false);
    };
    videoRef.current?.addEventListener("leavepictureinpicture", handleLeavePip);
    window.addEventListener("click", handleClickOutSite);
    document.addEventListener("fullscreenchange", onFullScreenChange, false);
    document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
    document.addEventListener("MSFullscreenChange", onFullScreenChange, false);
    document.addEventListener(
      "webkitfullscreenchange",
      onFullScreenChange,
      false
    );

    return () => {
      window.removeEventListener("focusout", handleDOMFocusOut);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleDOMFocusIn);
      document.removeEventListener("fullscreenchange", onFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        onFullScreenChange,
        false
      );
      document.removeEventListener(
        "MSFullscreenChange",
        onFullScreenChange,
        false
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        onFullScreenChange,
        false
      );
      videoRef.current?.removeEventListener(
        "leavepictureinpicture",
        handleLeavePip
      );
      window.removeEventListener("click", handleClickOutSite);
    };
  }, []);

  const handleClickSetting = () => {
    if (showSetting) {
      setShowSetting(false);
    } else {
      setShowSetting(true);
      clearTimeout(timerShowControls.current);
    }
  };

  const handleDoubleClick = (e: any) => {
    if (!shouldIsMobile) {
      handleFullScreen();
    } else {
      const videoOffsetX =
        e.target?.getBoundingClientRect()?.left! -
        document.documentElement.getBoundingClientRect().left;
      if (e.clientX < videoOffsetX + e.target.clientWidth / 2) {
        handleSeek("BACKWARD");
      } else {
        handleSeek("FORWARD");
      }
    }
  };
  return [
    range,
    isFullScreen,
    mute,
    setMute,
    isPip,
    loading,
    setLoading,
    setIsPlay,
    isError,
    setIsError,
    loaded,
    setLoaded,
    handleMouseMove,
    handleClickSetting,
    handleDoubleClick,
    handleReplayVideo,
    handleMouseLeave,
    handleShowControls,
    handleClickVideo,
    isEnded,
    timeClock,
    showEffect,
    seekEffect,
    containerRef,
    shouldIsMobile,
    wrapperRef,
    controlsShow,
    handleFullScreen,
    handlePlayVideo,
    isPlay,
    videoRef,
    setIsEnded,
    showSetting,
    handleSeek,
    setRange,
    holdControlsShow,
    setIsPip,
    setShowSetting,
    device,
    setDevice,
    setTimeClock,
  ];
};
