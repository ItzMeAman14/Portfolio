import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div className="section-heading-tag" style={{ marginBottom: "16px" }}>
        <span className="mono-label">404 // NOT FOUND</span>
      </div>
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          marginBottom: "16px",
          color: "var(--text-primary)",
        }}
      >
        Void Coordinate
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          maxWidth: "460px",
          marginBottom: "32px",
          lineHeight: 1.6,
        }}
      >
        The cyberspace sector you requested does not exist or has been shifted
        into another dimension.
      </p>
      <Link href="/" className="btn-lime">
        Return to Safety &rarr;
      </Link>
    </div>
  );
}
