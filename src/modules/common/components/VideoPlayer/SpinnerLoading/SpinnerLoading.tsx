import styled from "styled-components";
import { useContext } from "react";
import { Context } from "../../../utils/hooks";

function SpinnerLoading() {
  const { loading, isPlay, loaded } = useContext(Context).state;
  const show = (loading && isPlay) || !loaded;
  return show ? (
    <SpinnerElement>
      {Array(12)
        .fill(1)
        .map((e, k) => (
          <SpinnerChild
            key={k}
            theme={{ rotate: `${k * 30}deg`, delay: `${k * 0.1 - 1.1}s` }}
          />
        ))}
    </SpinnerElement>
  ) : (
    <></>
  );
}

export default SpinnerLoading;

const SpinnerElement = styled.div`
  display: inline-block;
  width: 4em;
  height: 4em;
  animation: delay-appear 2s linear forwards;
  visibility: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @keyframes delay-appear {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    50% {
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const SpinnerChild = styled.div`
  transform-origin: 2em 2em;
  animation: lds-spinner 1.2s linear infinite;
  transform: rotate(${(props) => props.theme.rotate});
  animation-delay: ${(props) => props.theme.delay};
  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: 0.15em;
    left: 1.85em;
    width: 0.3em;
    height: 0.9em;
    border-radius: 20%;
    background: #fff;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
