import { useRef } from "react";
import { IconExpand } from "../../../assets/icons";
import "./videoTitle.scss";

type Props = {
  title: string;
  controlsShow: boolean;
  isFullScreen: boolean;
  handleFullScreen: any;
};
function VideoTitle({
  title,
  controlsShow,
  isFullScreen,
  handleFullScreen,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <div
      className={`video-title ${
        controlsShow && isFullScreen ? "video-title-show" : ""
      }`}
    >
      <button className="video-title__btn-exit-full" onClick={handleFullScreen}>
        <img src={IconExpand} alt="" />
      </button>
      <div className="video-title__text">
        {/* ts-ignore */}
        <p
          ref={ref}
          style={
            {
              "--left-need": `-${
                (ref.current?.offsetWidth || 0) -
                (ref.current?.parentElement?.offsetWidth || 0) +
                30
              }px`,
              "--time": `${
                ((ref.current?.offsetWidth || 0) /
                  (ref.current?.parentElement?.offsetWidth || 1)) *
                10
              }s`,
            } as any
          }
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export default VideoTitle;
