import { useRef, useState } from "react";
import VideoPlayer from "./modules/common/components/VideoPlayer";
import Select from "react-select";
const Video =
  "https://mdn.github.io/dom-examples/picture-in-picture/assets/bigbuckbunny.mp4";
const Video1 =
  "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4";
const videos = [Video, Video1];
function App() {
  const [video, setVideo] = useState<any>(0);
  const videoRef = useRef<any>(null);
  return (
    <div className="App">
      <div className="heading">
        <Select
          options={videos.map((e, i) => ({ value: i, label: `Chọn ${i}` }))}
          value={video}
          onChange={(e) => {
            setVideo(e.value);
          }}
          placeholder="Chọn video"
          className="select-video"
        />
      </div>
      <div className="video-area">
        <VideoPlayer
          url={videos[video]}
          autoPlay
          ref={videoRef}
          title={
            "Hi friend! Before you go, just wanted to let you know that in Jan 2023 I will be launching the Hi friend! Before you go, just wanted to let you know that in Jan 2023 I will be launching the"
          }
        />
        {/* <video style={{ width: "100%" }} controls>
          <source src={videos[video]} />
        </video> */}
      </div>
    </div>
  );
}

export default App;
