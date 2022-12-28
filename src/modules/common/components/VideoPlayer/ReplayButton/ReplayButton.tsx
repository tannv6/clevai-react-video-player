import { IconReplay } from "../../../assets/icons";
import { useContext } from "react";
import { Context } from "../../../utils/hooks";
import styled from "styled-components";
type Props = {
  onReplay: any;
};
function ReplayButton({ onReplay }: Props) {
  const { isEnded, device } = useContext(Context).state;
  const isTouchAble = device === "TOUCH";
  const show = !isTouchAble;
  return isEnded && show ? (
    <ReplayButtonContainer onClick={onReplay}>
      <img src={IconReplay} alt="" />
    </ReplayButtonContainer>
  ) : (
    <></>
  );
}

export default ReplayButton;
const ReplayButtonContainer = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  border-radius: 50%;
  z-index: 5;
  background: radial-gradient(closest-side, #33333336, #3333331f, #33333300);
  cursor: pointer;
  img {
    width: 2.5em;
    height: 2.5em;
    display: block;
  }
`;
