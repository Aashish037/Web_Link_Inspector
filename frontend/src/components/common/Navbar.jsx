import { Link, useLocation } from "react-router-dom";
import { Shield, Search, BarChart2, Info, Menu, X } from "lucide-react";
import { useState } from "react";

/* eslint-disable no-unused-vars */

const LINKS = [
  { to: "/", label: "Home", icon: Shield },
  { to: "/analyzer", label: "Analyzer", icon: Search },
  { to: "/features", label: "Features", icon: BarChart2 },
  { to: "/about", label: "About", icon: Info },
];

const S = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottom: "1px solid var(--color-cyber-border)",
    background: "rgba(2,12,2,0.92)",
    backdropFilter: "blur(12px)",
  },
  inner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 16px",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "var(--color-cyber-green-dark)",
    border: "1px solid rgba(0,230,118,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  links: { display: "flex", gap: 4 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "var(--color-cyber-green)",
    display: "inline-block",
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11,
    fontFamily: "monospace",
    color: "var(--color-cyber-text-muted)",
  },
};

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const linkStyle = (to) => ({
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "monospace",
    textDecoration: "none",
    transition: "all 0.2s",
    background:
      pathname === to ? "var(--color-cyber-green-dark)" : "transparent",
    color:
      pathname === to
        ? "var(--color-cyber-green)"
        : "var(--color-cyber-text-dim)",
    border:
      pathname === to
        ? "1px solid rgba(0,230,118,0.3)"
        : "1px solid transparent",
    boxShadow: pathname === to ? "0 0 15px rgba(0,230,118,0.1)" : "none",
  });

  return (
    <nav style={S.nav}>
      <div style={S.inner}>
        <Link to="/" style={S.logo}>
          <div style={S.logoBox}>
            <Shield size={15} color="var(--color-cyber-green)" />
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--color-cyber-green)",
            }}
          >
            PHISH<span style={{ color: "var(--color-cyber-text)" }}>GUARD</span>
          </span>
        </Link>

        <div
          style={{ ...S.links, display: open ? "none" : "flex" }}
          className="hidden-mobile"
        >
          {LINKS.map(({ to, label, icon: NavIcon }) => (
            <Link key={to} to={to} style={linkStyle(to)}>
              <NavIcon size={13} />
              {label}
            </Link>
          ))}
        </div>

        <div style={S.status} className="hidden-mobile">
          <span style={S.dot} className="animate-glow" />
          SYSTEM ONLINE
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-cyber-text-dim)",
            display: "none",
          }}
          className="mobile-menu-btn"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          style={{
            borderTop: "1px solid var(--color-cyber-border)",
            background: "var(--color-cyber-card)",
            padding: "8px 16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {LINKS.map(({ to, label, icon: NavIcon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              style={{ ...linkStyle(to), justifyContent: "flex-start" }}
            >
              <NavIcon size={14} />
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
