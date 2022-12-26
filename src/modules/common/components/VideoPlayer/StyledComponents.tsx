import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  padding-top: 56.25%;
  position: relative;
  font-size: 20px;
  button,
  input {
    font-size: inherit;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    border-radius: 0;
  }
`;
const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #000000;
`;
const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  display: block;
`;
const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, #00000090, #00000000);
  z-index: 3;
  padding: 1em 0.5em 1.5em;
  transform: translateY(${(props) => (props.theme.show ? "0%" : "-100%")});
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;
const BtnExitFull = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0.25em 1em 0.25em 0.25em;
  cursor: pointer;
`;
const TextWrapper = styled.div`
  color: white;
  font-size: 1.2em;
  flex: 1;
  overflow: hidden;
  position: relative;
  height: 1.4em;
  line-height: 1.4em;
`;
const Text = styled.p`
  position: absolute;
  white-space: nowrap;
  margin: 0;
  animation: slide-left-to-right ${(props) => props.theme.time}s linear infinite;
  @keyframes slide-left-to-right {
    0% {
      left: 0;
    }
    10% {
      left: 0;
    }
    90% {
      left: -${(props) => props.theme.leftNeed}px;
    }
    99% {
      left: -${(props) => props.theme.leftNeed}px;
    }
    100% {
      left: 0;
    }
  }
`;
export {
  VideoContainer,
  VideoWrapper,
  VideoElement,
  TitleContainer,
  BtnExitFull,
  TextWrapper,
  Text,
};
