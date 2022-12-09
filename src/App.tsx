import { useState } from "react";
import "./App.css";
import VideoPlayer from "./modules/common/components/VideoPlayer";
const videos = [
  "https://r73troypb4obj.vcdn.cloud/video/gioithieu-1666667902489.mp4",
  "https://r73troypb4obj.vcdn.cloud/video/G4_W1_C11-1657602420040.mp4",
  "https://vjs.zencdn.net/v/oceans.mp4",
];
function App() {
  const [video, setVideo] = useState(1);
  return (
    <div className="App">
      <div className="heading">
        <select
          name="video"
          id="select-video"
          onChange={(e) => {
            setVideo(Number(e.target.value));
          }}
          value={video}
        >
          {videos.map((e, i) => (
            <option value={i}>{i}</option>
          ))}
        </select>
      </div>
      <div className="video-area">
        <VideoPlayer key={video} url={videos[video]} />
      </div>
    </div>
  );
}

export default App;
