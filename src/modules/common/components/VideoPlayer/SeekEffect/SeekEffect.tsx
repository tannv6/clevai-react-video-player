import { useContext } from "react";
import { Context } from "../../../utils/hooks";
import "./seekEffect.scss";
type Props = {
  time: number;
  timeUnit: "MINUTE" | "SECOND";
};
function SeekEffect({ time, timeUnit }: Props) {
  const {
    state: { seekEffect },
  } = useContext(Context);
  return seekEffect.show ? (
    <div
      className={`seek-effect-container  ${
        seekEffect.type === "BACKWARD" ? "seek-effect-container-backward" : ""
      }`}
    >
      <div
        className={`seek-effect-wrapper ${
          seekEffect.type === "BACKWARD" ? "seek-effect-wrapper-backward" : ""
        }`}
      >
        <span className="seek-triangle"></span>
        <span className="seek-triangle"></span>
        <span className="seek-triangle"></span>
      </div>
      <div className="seeked-time">
        {time} {timeUnit === "MINUTE" ? "phút" : "giây"}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default SeekEffect;
