import "./playButton.scss";
type Props = {
  isPlay: boolean;
  onClick: any;
};
function PlayButton({ isPlay, onClick }: Props) {
  return (
    <div className="play-button-container" onClick={onClick}>
      {isPlay ? (
        <div className="pause-button">
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="play-button"></div>
      )}
    </div>
  );
}

export default PlayButton;
