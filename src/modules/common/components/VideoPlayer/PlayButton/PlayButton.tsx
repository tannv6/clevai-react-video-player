import { Context } from "../../../utils/hooks";
import { useContext } from "react";
import styled from "styled-components";
type Props = {
  onClick: any;
};
function PlayButton({ onClick }: Props) {
  const { controlsShow, isPlay, loaded, device } = useContext(Context).state;
  const show = device === "TOUCH" && loaded && (controlsShow || !isPlay);
  return show ? (
    <PlayButtonContainer onClick={onClick}>
      <PlayIcon theme={{ isPlay }}>
        <div></div>
        <div></div>
      </PlayIcon>
    </PlayButtonContainer>
  ) : (
    <></>
  );
}

export default PlayButton;
const PlayButtonContainer = styled.div`
  width: 2.5em;
  height: 2.5em;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(closest-side, #3333332c, #3333332c, #3333331c);
  box-shadow: 0 0 5em 1px #3333334a;
  z-index: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const PlayIcon = styled.div`
  ${(props) =>
    !props.theme.isPlay
      ? ` border-style: solid;
    border-width: 0.5em 0px 0.5em 0.85em;
    border-color: transparent transparent transparent white;
    transform: translateX(2px);`
      : ` width: 1em;
    height: 1em;
    display: flex;
    justify-content: space-between;
    * {
      width: 0.3em;
      height: 100%;
      background-color: white;
      border-radius: 0.15em;
    }`}
`;
