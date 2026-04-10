export const FEATURE_INFO = {
  UsingIP: {
    label: "IP in URL",
    desc: "URL uses raw IP instead of domain name",
    icon: "🌐",
    category: "auto",
  },
  LongURL: {
    label: "Long URL",
    desc: "URL length exceeds 75 characters",
    icon: "📏",
    category: "auto",
  },
  ShortURL: {
    label: "Shortened URL",
    desc: "Uses a URL shortening service (bit.ly etc)",
    icon: "✂️",
    category: "auto",
  },
  "Symbol@": {
    label: "@ Symbol",
    desc: "Contains @ — browser ignores everything before it",
    icon: "@",
    category: "auto",
  },
  "Redirecting//": {
    label: "Double Slash",
    desc: "Double slash appears after the protocol scheme",
    icon: "//",
    category: "auto",
  },
  "PrefixSuffix-": {
    label: "Hyphen in Domain",
    desc: "Domain contains a hyphen/dash character",
    icon: "—",
    category: "auto",
  },
  SubDomains: {
    label: "Sub Domains",
    desc: "URL has more than two subdomains",
    icon: "🔗",
    category: "auto",
  },
  HTTPS: {
    label: "HTTPS",
    desc: "Website uses secure HTTPS connection",
    icon: "🔒",
    category: "auto",
  },
  DomainRegLen: {
    label: "Domain Length",
    desc: "Domain name is very short (suspicious)",
    icon: "📐",
    category: "auto",
  },
  Favicon: {
    label: "Favicon Source",
    desc: "Favicon loaded from external domain",
    icon: "🖼️",
    category: "auto",
  },
  NonStdPort: {
    label: "Non-Std Port",
    desc: "URL uses unusual port number (not 80/443)",
    icon: "🔌",
    category: "auto",
  },
  HTTPSDomainURL: {
    label: '"https" in Domain',
    desc: '"https" word appears inside the domain name itself',
    icon: "⚠️",
    category: "auto",
  },
  RequestURL: {
    label: "Request URL %",
    desc: "High % of objects loaded from external domains",
    icon: "📡",
    category: "manual",
  },
  AnchorURL: {
    label: "Anchor URL %",
    desc: "Anchor tags mostly point to external sites",
    icon: "⚓",
    category: "manual",
  },
  LinksInScriptTags: {
    label: "Script Tags",
    desc: "Links in script/meta tags point external",
    icon: "📜",
    category: "manual",
  },
  ServerFormHandler: {
    label: "Form Handler",
    desc: "Form submits to suspicious or empty URL",
    icon: "📝",
    category: "manual",
  },
  InfoEmail: {
    label: "Email in URL",
    desc: "URL contains mailto: address",
    icon: "📧",
    category: "auto",
  },
  AbnormalURL: {
    label: "Abnormal URL",
    desc: "Domain does not match site identity",
    icon: "🔀",
    category: "auto",
  },
  WebsiteForwarding: {
    label: "Redirects",
    desc: "Page redirects more than twice",
    icon: "↩️",
    category: "manual",
  },
  StatusBarCust: {
    label: "Status Bar Spoofed",
    desc: "JS used to display fake URL in status bar",
    icon: "🎭",
    category: "manual",
  },
  DisableRightClick: {
    label: "Right Click Off",
    desc: "Right-click functionality disabled on page",
    icon: "🖱️",
    category: "manual",
  },
  UsingPopupWindow: {
    label: "Popup Windows",
    desc: "Page uses popup windows with text fields",
    icon: "🪟",
    category: "manual",
  },
  IframeRedirection: {
    label: "iFrame Redirect",
    desc: "Page uses invisible iframes for redirection",
    icon: "📦",
    category: "manual",
  },
  AgeofDomain: {
    label: "Domain Age",
    desc: "Domain registered less than 12 months ago",
    icon: "📅",
    category: "manual",
  },
  DNSRecording: {
    label: "DNS Record",
    desc: "No DNS record found for the domain",
    icon: "📋",
    category: "manual",
  },
  WebsiteTraffic: {
    label: "Website Traffic",
    desc: "Site ranks low or absent in Alexa",
    icon: "📊",
    category: "manual",
  },
  PageRank: {
    label: "Page Rank",
    desc: "Google PageRank is very low",
    icon: "⭐",
    category: "manual",
  },
  GoogleIndex: {
    label: "Google Indexed",
    desc: "Page is not indexed by Google",
    icon: "🔍",
    category: "manual",
  },
  LinksPointingToPage: {
    label: "Backlinks",
    desc: "Very few links pointing to this page",
    icon: "🔗",
    category: "manual",
  },
  StatsReport: {
    label: "Stats Report",
    desc: "Domain flagged in spam databases",
    icon: "🚩",
    category: "manual",
  },
};

export const AUTO_KEYS = new Set(
  Object.entries(FEATURE_INFO)
    .filter(([, v]) => v.category === "auto")
    .map(([k]) => k),
);
