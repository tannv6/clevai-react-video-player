/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, createContext } from "react";
import { isTouchDevice } from "./functions";
export const useInitEffect = (ref: any, state: TStates, dispatch: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = ref || useRef<HTMLVideoElement>(null);
  const timerShowControls = useRef<any>(null);
  const timeStart = useRef(0);
  const { controlsShow, showSetting, device, isPlay, range } = state;
  const timerClickPlay = useRef<any>({});
  const timerClickRef = useRef<any>(null);
  const timerShowPlayEffectRef = useRef<any>(null);
  const playEffect = (isPlay: boolean) => {
    dispatch({ type: ACTIONS_TYPE.SET_SHOW_EFFECT, res: true }); //
    dispatch({ type: ACTIONS_TYPE.SET_IS_EFFECT_PLAY, res: isPlay }); //
    clearTimeout(timerShowPlayEffectRef.current);
    timerShowPlayEffectRef.current = setTimeout(() => {
      dispatch({ type: ACTIONS_TYPE.SET_SHOW_EFFECT, res: false }); //
    }, 500);
  };

  const isTouchAble = device === "TOUCH";

  useEffect(() => {
    if (controlsShow) {
      if (isTouchDevice()) {
        dispatch({ type: ACTIONS_TYPE.SET_DEVICE, res: "TOUCH" }); //
      } else {
        dispatch({ type: ACTIONS_TYPE.SET_DEVICE, res: "NO_TOUCH" }); //
      }
    }
  }, [controlsShow]);
  const handlePlayVideo = () => {
    holdControlsShow();
    if (videoRef.current?.paused || videoRef.current?.ended) {
      videoRef.current?.play();
      playEffect(true);
    } else {
      videoRef.current?.pause();
      playEffect(false);
    }
  };

  const handleReplayVideo = () => {
    holdControlsShow();
    videoRef.current?.play();
  };

  const handleShowControls = () => {
    clearTimeout(timerShowControls.current);
    dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
  };

  const handleClickVideo = (e: any) => {
    e.preventDefault();
    holdControlsShow();
    if (showSetting) {
      dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: false });
    } else {
      if (controlsShow && !isTouchAble) {
        if (videoRef.current?.paused || videoRef.current?.ended) {
          if (
            timerClickPlay.current?.time &&
            timerClickPlay.current.time - Date.now() < 250
          ) {
            clearTimeout(timerClickPlay.current.timer);
            timerClickPlay.current["time"] = null;
          } else {
            if (timerClickPlay.current) {
              timerClickPlay.current.time = Date.now();
              timerClickPlay.current.timer = setTimeout(() => {
                timerClickPlay.current["time"] = null;
                videoRef.current?.play();
              }, 250);
            }
          }
          playEffect(true);
        } else {
          if (
            timerClickPlay.current?.time &&
            timerClickPlay.current.time - Date.now() < 250
          ) {
            clearTimeout(timerClickPlay.current.timer);
            timerClickPlay.current.time = null;
          } else {
            if (timerClickPlay.current) {
              timerClickPlay.current.time = Date.now();
              timerClickPlay.current.timer = setTimeout(() => {
                timerClickPlay.current.time = null;
                videoRef.current?.pause();
              }, 250);
            }
          }
          playEffect(false);
        }
      } else {
        if (e.detail === 1) {
          timerClickRef.current = setTimeout(() => {
            if (controlsShow && isTouchAble) {
              clearTimeout(timerShowControls.current);
              dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: false }); //
            } else if (!controlsShow && isTouchAble) {
              dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
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
      dispatch({ type: ACTIONS_TYPE.SET_IS_FULLSCREEN, res: false });
    } else if (!document.fullscreenElement) {
      if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
        dispatch({ type: ACTIONS_TYPE.SET_IS_FULLSCREEN, res: true });
      } else if ((wrapperRef?.current as any)?.webkitRequestFullscreen) {
        (wrapperRef?.current as any)?.webkitRequestFullscreen();
        dispatch({ type: ACTIONS_TYPE.SET_IS_FULLSCREEN, res: true });
      } else {
        wrapperRef?.current?.requestFullscreen();
        dispatch({ type: ACTIONS_TYPE.SET_IS_FULLSCREEN, res: true });
      }
    }
  };

  const holdControlsShow = () => {
    clearTimeout(timerShowControls.current);
    if (!showSetting && !videoRef.current?.paused) {
      timeStart.current = Date.now();
      timerShowControls.current = setTimeout(() => {
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: false }); //
      }, 6000);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!(e.target.id || "")?.includes("progress")) {
      if (!controlsShow) {
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
        holdControlsShow();
      } else if (Date.now() - timeStart.current < 6000) {
        holdControlsShow();
      }
    }
  };

  const handleMouseLeave = () => {
    if (!showSetting && !videoRef.current?.paused) {
      clearTimeout(timerShowControls.current);
      dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: false }); //
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
        dispatch({
          type: ACTIONS_TYPE.SET_TIME_CLOCK,
          res: videoRef.current.currentTime || 0,
        }); //
        dispatch({
          type: ACTIONS_TYPE.SET_RANGE,
          res: range + (10 / total) * 100,
        });
        dispatch({
          type: ACTIONS_TYPE.SET_SEEK_EFFECT,
          res: {
            show: true,
            type: "FORWARD",
            key: Math.random(),
          },
        }); //
      }
    } else {
      if (videoRef.current?.currentTime) {
        videoRef.current.currentTime = videoRef.current?.currentTime! - 10;
        dispatch({
          type: ACTIONS_TYPE.SET_TIME_CLOCK,
          res: videoRef.current.currentTime || 0,
        }); //
        dispatch({
          type: ACTIONS_TYPE.SET_RANGE,
          res: range - (10 / total) * 100,
        });
        dispatch({
          type: ACTIONS_TYPE.SET_SEEK_EFFECT,
          res: {
            show: true,
            type: "BACKWARD",
            key: Math.random(),
          },
        }); //
      }
    }
  };

  useEffect(() => {
    if (isPlay) {
      dispatch({ type: ACTIONS_TYPE.SET_IS_ENDED, res: false });
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
      dispatch({
        type: ACTIONS_TYPE.SET_CONTAINER_WIDTH,
        res: containerRef.current?.offsetWidth!,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight") {
        e.preventDefault();
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
        handleSeek("FORWARD");
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
        handleSeek("BACKWARD");
      } else if (e.code === "Space") {
        e.preventDefault();
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: true }); //
        handlePlayVideo();
      }
    };

    const onFullScreenChange = (e: any) => {
      if (
        !(document as any).webkitIsFullScreen &&
        !(document as any).mozFullScreen &&
        !(document as any).msFullscreenElement
      ) {
        dispatch({ type: ACTIONS_TYPE.SET_IS_FULLSCREEN, res: false });
      }
    };

    const handleClickOutSite = (e: any) => {
      if (!containerRef.current?.contains(e.target as any)) {
        clearTimeout(timerShowControls.current);
        dispatch({ type: ACTIONS_TYPE.SET_CONTROLS_SHOW, res: false }); //
        dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: false }); //
      }
    };

    window.addEventListener("focusout", handleDOMFocusOut);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleDOMFocusIn);
    const handleLeavePip = () => {
      dispatch({ type: ACTIONS_TYPE.SET_IS_PIP, res: false });
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
      dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: false });
    } else {
      dispatch({ type: ACTIONS_TYPE.SET_SHOW_SETTING, res: true });
      clearTimeout(timerShowControls.current);
    }
  };

  const handleDoubleClick = (e: any) => {
    if (!isTouchAble) {
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
    handleMouseMove,
    handleDoubleClick,
    handleReplayVideo,
    handleMouseLeave,
    handleShowControls,
    handleClickVideo,
    containerRef,
    wrapperRef,
    handleFullScreen,
    handlePlayVideo,
    videoRef,
    handleSeek,
    holdControlsShow,
    handleClickSetting,
  ];
};

export const Context = createContext({} as any);
type TStates = {
  showSetting: boolean;
  controlsShow: boolean;
  isFullScreen: boolean;
  range: number;
  isPip: boolean;
  loading: boolean;
  isPlay: any;
  containerWidth: number;
  isError: boolean;
  loaded: boolean;
  isEnded: boolean;
  timeClock: number;
  isEffectPlay: boolean;
  device: "TOUCH" | "NO_TOUCH";
  seekEffect: any;
  showEffect: boolean;
};
export const initState: TStates = {
  showSetting: false,
  controlsShow: false,
  isFullScreen: false,
  range: 0,
  isPip: false,
  loading: true,
  isPlay: null,
  containerWidth: window.innerWidth,
  isError: false,
  loaded: false,
  isEnded: false,
  timeClock: 0,
  isEffectPlay: false,
  showEffect: false,
  seekEffect: {
    show: false,
    type: "",
    key: 0,
  },
  device: isTouchDevice() ? "TOUCH" : "NO_TOUCH",
};
export const reducer = (state: TStates, action: any): TStates => {
  switch (action.type) {
    case ACTIONS_TYPE.SET_SHOW_SETTING:
      return {
        ...state,
        showSetting: action.res,
      };
    case ACTIONS_TYPE.SET_CONTROLS_SHOW:
      return {
        ...state,
        controlsShow: action.res,
      };
    case ACTIONS_TYPE.SET_CONTAINER_WIDTH:
      return {
        ...state,
        containerWidth: action.res,
      };
    case ACTIONS_TYPE.SET_IS_FULLSCREEN:
      return {
        ...state,
        isFullScreen: action.res,
      };
    case ACTIONS_TYPE.SET_IS_EFFECT_PLAY:
      return {
        ...state,
        isEffectPlay: action.res,
      };
    case ACTIONS_TYPE.SET_IS_ENDED:
      return {
        ...state,
        isEnded: action.res,
      };
    case ACTIONS_TYPE.SET_IS_PIP:
      return {
        ...state,
        isPip: action.res,
      };
    case ACTIONS_TYPE.SET_IS_ERROR:
      return {
        ...state,
        isError: action.res,
      };
    case ACTIONS_TYPE.SET_IS_PLAY:
      return {
        ...state,
        isPlay: action.res,
      };
    case ACTIONS_TYPE.SET_LOADED:
      return {
        ...state,
        loaded: action.res,
      };
    case ACTIONS_TYPE.SET_LOADING:
      return {
        ...state,
        loading: action.res,
      };
    case ACTIONS_TYPE.SET_RANGE:
      return {
        ...state,
        range: action.res,
      };
    case ACTIONS_TYPE.SET_TIME_CLOCK:
      return {
        ...state,
        timeClock: action.res,
      };
    case ACTIONS_TYPE.SET_SHOW_EFFECT:
      return {
        ...state,
        showEffect: action.res,
      };
    case ACTIONS_TYPE.SET_DEVICE:
      return {
        ...state,
        device: action.res,
      };
    case ACTIONS_TYPE.SET_SEEK_EFFECT:
      return {
        ...state,
        seekEffect: action.res,
      };
    default:
      return state;
  }
};
export const ACTIONS_TYPE = {
  SET_SHOW_SETTING: "SET_SHOW_SETTING",
  SET_CONTROLS_SHOW: "SET_CONTROLS_SHOW",
  SET_RANGE: "SET_RANGE",
  SET_IS_FULLSCREEN: "SET_IS_FULLSCREEN",
  SET_IS_PIP: "SET_IS_PIP",
  SET_LOADING: "SET_LOADING",
  SET_IS_PLAY: "SET_IS_PLAY",
  SET_CONTAINER_WIDTH: "SET_CONTAINER_WIDTH",
  SET_IS_ERROR: "SET_IS_ERROR",
  SET_LOADED: "SET_LOADED",
  SET_IS_ENDED: "SET_IS_ENDED",
  SET_TIME_CLOCK: "SET_TIME_CLOCK",
  SET_IS_EFFECT_PLAY: "SET_IS_EFFECT_PLAY",
  SET_EFFECT: "SET_EFFECT",
  SET_SHOW_EFFECT: "SET_SHOW_EFFECT",
  SET_SEEK_EFFECT: "SET_SEEK_EFFECT",
  SET_DEVICE: "SET_DEVICE",
};
