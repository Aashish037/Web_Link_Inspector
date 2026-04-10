const VALUE_COLORS = {
  "-1": "var(--color-cyber-red)",
  0: "var(--color-cyber-yellow)",
  1: "var(--color-cyber-green)",
};
const VALUE_LABELS = { "-1": "Suspicious", 0: "Neutral", 1: "Safe" };

export default function FeatureToggle({ name, info, value, onChange, isAuto }) {
  const borderColor =
    VALUE_COLORS[String(value)] ?? "var(--color-cyber-border)";
    {info?.icon && (
    <span style={{ color: borderColor, flexShrink: 0 }}>
        {info.icon}
    </span>
    )}

  return (
    <div
      style={{
        background: "var(--color-cyber-card-2)",
        border: `1px solid ${borderColor}`,
        borderRadius: "8px",
        padding: "0.875rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        transition: "border-color 0.2s",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flex: 1,
            minWidth: 0,
          }}
        >
          {info?.icon && (
            <span
              style={{ color: borderColor, flexShrink: 0, fontSize: "1rem" }}
            >
              {typeof info.icon === "string" ? info.icon : <info.icon size={14} />}
            </span>
          )}
          <span
            style={{
              fontSize: "0.72rem",
              fontFamily: "monospace",
              fontWeight: 600,
              color: "var(--color-cyber-text)",
              wordBreak: "break-all",
            }}
          >
            {info?.label ?? name}
          </span>
        </div>
        {isAuto && (
          <span
            className="badge-gray"
            style={{ fontSize: "0.6rem", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            auto
          </span>
        )}
      </div>

      {/* Description */}
      {info?.desc && (
        <p
          style={{
            fontSize: "0.65rem",
            color: "var(--color-cyber-text-muted)",
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {info.desc}
        </p>
      )}

      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.25rem" }}>
        {[-1, 0, 1].map((v) => {
          const col = VALUE_COLORS[String(v)];
          const isActive = value === v;
          return (
            <button
              key={v}
              onClick={() => !isAuto && onChange(name, v)}
              disabled={isAuto}
              title={VALUE_LABELS[String(v)]}
              style={{
                flex: 1,
                padding: "0.3rem 0",
                borderRadius: "4px",
                border: `1px solid ${isActive ? col : col + "44"}`,
                background: isActive ? col + "22" : "transparent",
                color: isActive ? col : col + "88",
                fontSize: "0.7rem",
                fontFamily: "monospace",
                fontWeight: 700,
                cursor: isAuto ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {v === 1 ? "+1" : v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
