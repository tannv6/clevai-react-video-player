import { useEffect, useState } from "react";
import VideoPlayer from "./modules/common/components/VideoPlayer";

function App() {
  const [url, setUrl] = useState("");
  const handleSelectFile = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUrl(url);
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);
  return (
    <div className="App">
      <div className="heading">
        <input id="input-file" type="file" onChange={handleSelectFile} />
        <label htmlFor="input-file" id="label-input-file">
          Select File Video Mp4
        </label>
      </div>
      <div className="video-area">
        <VideoPlayer
          url={url}
          autoPlay
          title={
            "Hi friend! Before you go, just wanted to let you know that in Jan 2023 I will be launching the Web"
          }
        />
      </div>
    </div>
  );
}

export default App;
