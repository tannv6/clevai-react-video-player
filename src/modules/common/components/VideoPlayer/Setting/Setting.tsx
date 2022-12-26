import { useContext, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { IconCheck } from "../../../assets/icons";
import { Context } from "../../../utils/hooks";
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

  const handleChange =
    (type: "SPEED" | "QUALITY", speed: number | string) => () => {
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

  const LIST = SETTING_LIST[settingType];

  const activeItem = {
    SPEED: videoRef.current?.playbackRate,
    QUALITY: "Auto",
  };

  const height = showList ? LIST.length * 36 + 42 : 72;
  const maxHeight = `calc(100% - ${isMobile ? 36 : 72}px)`;
  const bottom = isMobile ? 36 : 72;
  const display = showSetting ? "flex" : "none";
  const titleText =
    settingType === "SPEED"
      ? "Speed"
      : settingType === "QUALITY"
      ? "Quality"
      : "";

  const handleChooseSettingType = (type: "SPEED" | "QUALITY") => () => {
    setSettingType(type);
    setShowList(true);
  };

  return (
    <SettingWrapper theme={{ height, maxHeight, bottom, display }}>
      <Tabs theme={{ right: showList ? "100%" : 0 }}>
        <TabElement onClick={handleChooseSettingType("SPEED")}>
          <TabElementTitle>Speed</TabElementTitle>
          <TabElementValue>
            {SPEED_DISPLAY[videoRef.current?.playbackRate]} <Arrow />
          </TabElementValue>
        </TabElement>
        <TabElement onClick={handleChooseSettingType("QUALITY")}>
          <TabElementTitle>Quality</TabElementTitle>
          <TabElementValue>
            Auto <Arrow />
          </TabElementValue>
        </TabElement>
      </Tabs>
      <SelectValueWrapper theme={{ left: showList ? 0 : "100%" }}>
        <SelectValueTitle>
          <ButtonBack onClick={() => setShowList(false)}>
            <BtnArrow />
          </ButtonBack>
          <TitleText onClick={() => setShowList(false)}>{titleText}</TitleText>
        </SelectValueTitle>
        <ListSelection>
          {LIST.map((e, i) => (
            <ListSelectionE key={i} onClick={handleChange(settingType, e)}>
              {activeItem[settingType] === e && <ImgCheck src={IconCheck} />}
              {SPEED_DISPLAY[e] || e}
            </ListSelectionE>
          ))}
        </ListSelection>
      </SelectValueWrapper>
    </SettingWrapper>
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

const SettingWrapper = styled.div`
  position: absolute;
  right: 20px;
  border-radius: 4px;
  width: 150px;
  height: auto;
  font-family: Arial, Helvetica, sans-serif;
  padding: 5px 0;
  box-sizing: border-box;
  background-color: #333333d6;
  color: #fff;
  overflow: hidden;
  transition: height 0.1s ease-in;
  flex-direction: column;
  z-index: 1;
  display: ${(props) => props.theme.display};
  height: ${(props) => props.theme.height}px;
  max-height: ${(props) => props.theme.maxHeight};
  bottom: ${(props) => props.theme.bottom}px;
`;

const Tabs = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  transition: 0.1s ease-in;
  right: ${(props) => props.theme.right};
`;

const TabElement = styled.div`
  padding: 10px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: #b1b1b133;
  }
`;

const TabElementTitle = styled.div`
  font-size: 14px;
`;

const TabElementValue = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const Arrow = styled.span`
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-color: transparent transparent transparent white;
  display: inline-block;
  margin-left: 5px;
`;

const SelectValueWrapper = styled.div`
  font-size: 14px;
  width: 100%;
  position: absolute;
  top: 0;
  transition: 0.1s ease-in;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 5px 0;
  box-sizing: border-box;
  left: ${(props) => props.theme.left};
`;

const SelectValueTitle = styled.div`
  padding: 5px;
  cursor: default;
  border-bottom: 1px solid #5b5a5a;
`;

const ButtonBack = styled.button`
  padding: 5px 20px 5px 10px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

const BtnArrow = styled.span`
  border-style: solid;
  border-width: 5px 5px 5px 0;
  border-color: transparent white transparent transparent;
  display: inline-block;
`;

const TitleText = styled.span`
  cursor: pointer;
`;

const ListSelection = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b1b1b1ae;
    width: 5px;
  }
`;

const ListSelectionE = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background-color: #b1b1b133;
  }
`;

const ImgCheck = styled.img`
  width: 14px;
  margin-right: 10px;
`;
