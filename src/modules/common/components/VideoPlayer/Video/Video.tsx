function Video({
  videoRef,
  handleDoubleClick,
  handleClickVideo,
  mute,
  setLoading,
  setIsError,
  autoPlay,
  setIsPlay,
  setLoaded,
  setIsEnded,
  url,
}: any) {
  return (
    <video
      ref={videoRef}
      onDoubleClick={handleDoubleClick}
      onClick={handleClickVideo}
      onContextMenu={(e) => e.preventDefault()}
      muted={mute}
      onLoadStart={() => {
        setLoading(true);
      }}
      onCanPlay={() => {
        setLoading(false);
        setIsError(false);
      }}
      autoPlay={autoPlay}
      onWaiting={() => {
        setLoading(true);
      }}
      onPlay={() => {
        setIsPlay(true);
      }}
      onPause={() => {
        setIsPlay(false);
      }}
      onError={() => {
        setIsError(true);
      }}
      onLoadedMetadata={() => {
        setLoaded(true);
      }}
      onEnded={() => {
        setIsEnded(true);
      }}
    >
      <source src={url} type="video/mp4" />
    </video>
  );
}

export default Video;
