import { memo, useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../utils/hooks";

function PlayEffect() {
  const { loaded, isEffectPlay, isEnded, showEffect, device } =
    useContext(Context).state;
  const show = device !== "TOUCH" && loaded && !isEnded && showEffect;
  return show ? (
    <PlayEffectContainer>
      <PlayEffectWrapper>
        <PlayIcon theme={{ isEffectPlay }}>
          <div></div>
          <div></div>
        </PlayIcon>
      </PlayEffectWrapper>
    </PlayEffectContainer>
  ) : (
    <></>
  );
}

export default memo(PlayEffect);
const PlayEffectContainer = styled.div`
  width: 2em;
  height: 2em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PlayEffectWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: "center";
  animation: play-effect 0.8s ease-out;
  background-color: #0000006e;
  border-radius: 50%;
  @keyframes play-effect {
    0% {
      transform: scale(1);
      opacity: 1;
      visibility: visible;
    }
    80% {
      transform: scale(2);
      opacity: 0;
      visibility: hidden;
    }
    100% {
      transform: scale(2);
      opacity: 0;
      visibility: hidden;
    }
  }
`;
const PlayIcon = styled.div`
  ${(props) =>
    props.theme.isEffectPlay
      ? `border-style: solid;
    border-width: 0.5em 0 0.5em 0.85em;
    border-color: transparent transparent transparent white;
    transform: translateX(2px);`
      : `width: 1em;
    height: 1em;
    display: flex;
    justify-content: space-around;
    * {
      width: 0.3em;
      height: 100%;
      background-color: white;
      border-radius: 0.15em;
    }`}
`;
