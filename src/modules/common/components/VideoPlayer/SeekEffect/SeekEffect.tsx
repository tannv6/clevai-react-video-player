import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../utils/hooks";
type Props = {
  time: number;
  timeUnit: "MINUTE" | "SECOND";
};
function SeekEffect({ time, timeUnit }: Props) {
  const {
    state: { seekEffect },
  } = useContext(Context);
  const ibw = seekEffect.type === "BACKWARD";
  const tSk = `${time} ${timeUnit === "MINUTE" ? "phút" : "giây"};`;
  return seekEffect.show ? (
    <SeekEffectContainer theme={{ ibw }}>
      <SeekEffectWrapper theme={{ ibw }}>
        <SeekTriangle />
        <SeekTriangle />
        <SeekTriangle />
      </SeekEffectWrapper>
      <SeekEffectTime>{tSk}</SeekEffectTime>
    </SeekEffectContainer>
  ) : (
    <></>
  );
}

export default SeekEffect;
const SeekEffectContainer = styled.div`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background: #00000070;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: just-show 1s linear forwards;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.theme.ibw ? "left: 2.5em;" : "right: 2.5em;")};
  @keyframes just-show {
    0% {
      visibility: hidden;
    }
    1% {
      visibility: visible;
    }
    100% {
      visibility: hidden;
    }
  }
`;
const SeekEffectWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: center;
  ${(props) => (props.theme.ibw ? "transform: rotate(180deg);" : "")};
  .seek-triangle {
    border-color: transparent transparent transparent white;
    border-style: solid;
    border-width: 0.5em 0 0.5em 0.75em;
    opacity: 0.2;
    animation: opacity-show 1s linear forwards;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;
const SeekTriangle = styled.span`
  border-color: transparent transparent transparent white;
  border-style: solid;
  border-width: 0.5em 0 0.5em 0.75em;
  opacity: 0.2;
  animation: opacity-show 1s linear forwards;
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes opacity-show {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }
`;
const SeekEffectTime = styled.div`
  color: white;
`;
