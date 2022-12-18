import { useRef, useState } from "react";
import VideoPlayer from "./modules/common/components/VideoPlayer";
import Select from "react-select";
const Video =
  "http://192.168.0.185:5555/Alan Walker Best Songs Of All Time - Alan Walker Full Album 2022.mp4";
const Video1 =
  "http://192.168.0.185:5555/Đi Về Nhà, Năm Qua Đã Làm Gì - LK Nhạc Xuân 2023 - Nhạc Tết 2023 Nghe Là Nghiện.mp4";
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
            "Hi friend! Before you go, just wanted to let you know that in Jan 2023 I will be launching the Web"
          }
        />
      </div>
    </div>
  );
}

export default App;
