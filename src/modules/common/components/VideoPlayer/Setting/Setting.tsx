import { useContext, useLayoutEffect, useState } from "react";
import { IconCheck } from "../../../assets/icons";
import { Context } from "../../../utils/hooks";
import "./setting.scss";
type Props = {
  videoRef: any;
};
function Setting({ videoRef }: Props) {
  const {
    state: { showSetting, device },
  } = useContext(Context);
  const isMobile = device === "TOUCH";
  const [settingType, setSettingType] = useState<"SPEED" | "QUALITY">("SPEED");
  const [showList, setShowList] = useState(false);
  const handleChange = (type: "SPEED" | "QUALITY", speed: number | string) => {
    if (videoRef.current?.playbackRate && type === "SPEED") {
      videoRef.current.playbackRate = speed;
    } else if (type === "QUALITY") {
    }
    setShowList(false);
  };
  useLayoutEffect(() => {
    if (showSetting) {
      setShowList(false);
    }
  }, [showSetting]);
  const list = SETTING_LIST[settingType];
  const activeItem = {
    SPEED: videoRef.current?.playbackRate,
    QUALITY: "Auto",
  };

  return (
    <div
      className={`setting-wrapper ${
        showSetting ? "setting-wrapper-show" : "setting-wrapper-hide"
      }`}
      style={{
        height: showList ? list.length * 35 + 41 : 75,
        maxHeight: `calc(100% - ${isMobile ? 35 : 75}px)`,
        bottom: isMobile ? 35 : 75,
      }}
    >
      <div
        className="tabs"
        style={{
          right: showList ? "100%" : 0,
        }}
      >
        <div
          className="st-opt"
          onClick={() => {
            setSettingType("SPEED");
            setShowList(true);
          }}
        >
          <div className="st-otp__title">Speed</div>
          <div className="st-otp__current-value">
            {SPEED_DISPLAY[videoRef.current?.playbackRate]}
            <span className="st-otp__current-value__arrow"></span>
          </div>
        </div>
        <div
          className="st-opt"
          onClick={() => {
            setSettingType("QUALITY");
            setShowList(true);
          }}
        >
          <div className="st-otp__title">Quality</div>
          <div className="st-otp__current-value">
            Auto
            <span className="st-otp__current-value__arrow"></span>
          </div>
        </div>
      </div>
      <div
        className="speed-setting"
        style={{
          left: showList ? 0 : "100%",
        }}
      >
        <div className="title">
          <button
            className="title__btn-back"
            onClick={() => setShowList(false)}
          >
            <span className="title__btn-back__arrow"></span>
          </button>
          <span className="title__text" onClick={() => setShowList(false)}>
            {settingType === "SPEED"
              ? "Speed"
              : settingType === "QUALITY"
              ? "Quality"
              : ""}
          </span>
        </div>
        <ul>
          {list.map((e, i) => (
            <li key={i} onClick={() => handleChange(settingType, e)}>
              {activeItem[settingType] === e && (
                <img className="icon-check" src={IconCheck} alt="" />
              )}
              {SPEED_DISPLAY[e] || e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Setting;
const SETTING_LIST = {
  SPEED: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  QUALITY: ["Auto"],
};
const SPEED_DISPLAY: any = {
  "0.25": "0.25",
  "0.5": "0.5",
  "0.75": "0.75",
  1: "Normal",
  "1.25": "1.25",
  "1.5": "1.5",
  "1.75": "1.75",
  2: "2",
};
