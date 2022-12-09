import "./spinnerLoading.scss";
type Props = {
  className: string;
};
function SpinnerLoading({ className }: Props) {
  return (
    <div className={`spinner-loading ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default SpinnerLoading;
