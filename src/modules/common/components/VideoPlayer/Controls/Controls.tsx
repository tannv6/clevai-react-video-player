/* eslint-disable react-hooks/exhaustive-deps */
import "./controls.scss";
import { useRef, useContext } from "react";

import { Context } from "../../../utils/hooks";
import styled from "styled-components";
import Progress from "../Progress";
import MainControls from "../MainControls";
function Controls({
  handleSeek,
  videoRef,
  mute,
  setMute,
  setVolume,
  holdControlsShow,
  handlePlayVideo,
  volume,
  handleFullScreen,
  handleShowControls,
  handleClickSetting,
}: any) {
  const timerProgress = useRef<any>(null);

  const {
    state: { controlsShow },
  } = useContext(Context);

  return (
    <ControlsContainer theme={{ controlsShow }}>
      <Progress
        videoRef={videoRef}
        timerProgress={timerProgress}
        handleShowControls={handleShowControls}
        holdControlsShow={holdControlsShow}
      />
      <MainControls
        holdControlsShow={holdControlsShow}
        videoRef={videoRef}
        timerProgress={timerProgress}
        handleSeek={handleSeek}
        mute={mute}
        setMute={setMute}
        setVolume={setVolume}
        handlePlayVideo={handlePlayVideo}
        volume={volume}
        handleFullScreen={handleFullScreen}
        handleClickSetting={handleClickSetting}
      />
    </ControlsContainer>
  );
}

export default Controls;
const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: ${(props) => (props.theme.controlsShow ? "visible" : "hidden")};
  opacity: ${(props) => (props.theme.controlsShow ? "1" : "0")};
  transition: 0.3s ease-in-out;
  padding: 0.5em 0.25em;
  background: linear-gradient(to bottom, #00000000, #00000090);
`;
