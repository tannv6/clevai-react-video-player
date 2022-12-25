import { useRef, useContext } from "react";
import { IconExpand } from "../../../assets/icons";
import { Context } from "../../../utils/hooks";
import {
  BtnExitFull,
  TextWrapper,
  TitleContainer,
  Text,
} from "../StyledComponents";

type Props = {
  title: string;
  handleFullScreen: any;
};
function VideoTitle({ title, handleFullScreen }: Props) {
  const {
    state: { controlsShow, isFullScreen },
  } = useContext(Context);
  const ref = useRef<HTMLParagraphElement>(null);
  const show = controlsShow && isFullScreen;
  const time =
    ((ref.current?.offsetWidth || 0) /
      (ref.current?.parentElement?.offsetWidth || 1)) *
    10;
  const leftNeed =
    (ref.current?.offsetWidth || 0) -
    (ref.current?.parentElement?.offsetWidth || 0) +
    30;
  return (
    <TitleContainer theme={{ show }}>
      <BtnExitFull onClick={handleFullScreen}>
        <img src={IconExpand} alt="" />
      </BtnExitFull>
      <TextWrapper>
        <Text ref={ref} theme={{ leftNeed, time }}>
          {title}
        </Text>
      </TextWrapper>
    </TitleContainer>
  );
}

export default VideoTitle;
