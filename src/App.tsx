import { useState } from "react";
import VideoPlayer from "./modules/common/components/VideoPlayer";
import Select from "react-select";
const videos = [
  "https://r73troypb4obj.vcdn.cloud/video/gioithieu-1666667902489.mp4",
  "https://r73troypb4obj.vcdn.cloud/video/G4_W1_C11-1657602420040.mp4",
  "https://vjs.zencdn.net/v/oceans.mp4",
];
function App() {
  const [video, setVideo] = useState<any>(0);
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
        <VideoPlayer url={videos[video]} autoPlay={true} />
      </div>
    </div>
  );
}

export default App;
