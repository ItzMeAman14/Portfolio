export default function Loading() {
  return (
    <div id="loader" role="status" aria-live="polite">
      <div className="loader-panel loader-top"></div>
      <div className="loader-panel loader-bottom"></div>
      <div className="loader-content">
        <div className="loader-counter">000</div>
        <div className="loader-status">Loading Blog</div>
      </div>
    </div>
  );
}