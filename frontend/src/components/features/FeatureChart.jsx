import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { FEATURE_INFO } from "../../utils/featureLabels";

const getColor = (v) => {
  if (v === -1) return "#ff5252";
  if (v === 0) return "#ffd740";
  return "#00e676";
};

const VALUE_LABELS = { "-1": "Suspicious", 0: "Neutral", 1: "Safe" };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  const info = FEATURE_INFO[name];
  const col = getColor(value);
  return (
    <div
      style={{
        background: "#071407",
        border: `1px solid ${col}`,
        borderRadius: "6px",
        padding: "0.75rem",
        maxWidth: "220px",
        boxShadow: `0 0 12px ${col}44`,
      }}
    >
      <p
        style={{
          color: col,
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: "0.8rem",
          margin: "0 0 0.25rem",
        }}
      >
        {info?.label ?? name}
      </p>
      <p
        style={{
          color: "#a5d6a7",
          fontSize: "0.7rem",
          margin: "0 0 0.375rem",
          lineHeight: 1.4,
        }}
      >
        {info?.desc ?? ""}
      </p>
      <p
        style={{
          color: col,
          fontFamily: "monospace",
          fontSize: "0.75rem",
          margin: 0,
        }}
      >
        {value} — {VALUE_LABELS[String(value)]}
      </p>
    </div>
  );
}

export default function FeatureChart({ features }) {
  const data = Object.entries(features).map(([name, value]) => ({
    name,
    shortName: (FEATURE_INFO[name]?.label ?? name).slice(0, 10),
    value,
  }));

  return (
    <div className="cyber-card animate-fadeIn" style={{ padding: "1.5rem" }}>
      <p className="section-title" style={{ marginBottom: "1.25rem" }}>
        ▸ Feature Value Distribution
      </p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 80 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1c3d1c44"
            vertical={false}
          />
          <XAxis
            dataKey="shortName"
            tick={{ fill: "#558b2f", fontSize: 10, fontFamily: "monospace" }}
            angle={-45}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            domain={[-1, 1]}
            ticks={[-1, 0, 1]}
            tick={{ fill: "#558b2f", fontSize: 11, fontFamily: "monospace" }}
          />
          <ReferenceLine y={0} stroke="#1c3d1c" strokeWidth={2} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#00e67611" }} />
          <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={28}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          justifyContent: "center",
          marginTop: "0.5rem",
        }}
      >
        {[
          ["#00e676", "Safe (+1)"],
          ["#ffd740", "Neutral (0)"],
          ["#ff5252", "Suspicious (−1)"],
        ].map(([col, lbl]) => (
          <div
            key={lbl}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: col,
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                color: "var(--color-cyber-text-muted)",
                fontFamily: "monospace",
              }}
            >
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
