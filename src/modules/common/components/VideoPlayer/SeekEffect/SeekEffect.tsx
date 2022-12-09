import "./seekEffect.scss";
type Props = {
  time: number;
  timeUnit: "MINUTE" | "SECOND";
  className: string;
  type: "BACKWARD" | "FORWARD";
};
function SeekEffect({ time, timeUnit, className, type }: Props) {
  return (
    <div className={`seek-effect-container ${className}`}>
      <div
        className={`seek-effect-wrapper ${
          type === "BACKWARD" ? "seek-effect-wrapper-backward" : ""
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
  );
}

export default SeekEffect;
