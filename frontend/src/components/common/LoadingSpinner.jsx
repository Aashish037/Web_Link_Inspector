export default function LoadingSpinner({ text = "Processing..." }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "40px 0",
      }}
    >
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid var(--color-cyber-border)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid transparent",
            borderTopColor: "var(--color-cyber-green)",
          }}
          className="animate-spin"
        />
        <div
          style={{
            position: "absolute",
            inset: 6,
            borderRadius: "50%",
            border: "1px solid rgba(0,230,118,0.15)",
          }}
        />
      </div>
      <p
        style={{
          color: "var(--color-cyber-green)",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.12em",
        }}
        className="animate-fadeIn"
      >
        {text}
      </p>
    </div>
  );
}
