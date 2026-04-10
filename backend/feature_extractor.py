import re
from urllib.parse import urlparse

SHORTENERS = {
    "bit.ly", "tinyurl.com", "goo.gl", "ow.ly", "t.co",
    "buff.ly", "adf.ly", "is.gd", "cli.gs", "yfrog.com",
    "migre.me", "ff.im", "tiny.cc", "url4.eu", "twit.ac",
    "su.pr", "twurl.nl", "snipurl.com", "short.to", "budurl.com",
    "ping.fm", "post.ly", "just.as", "bkite.com", "snipr.com",
    "fic.kr", "loopt.us", "doiop.com", "short.ie", "kl.am",
    "wp.me", "rubyurl.com", "om.ly", "to.ly", "bit.do",
    "t2mio.com", "qr.ae", "cutt.ly", "shorturl.at"
}

FULL_COLUMN_ORDER = [
    "Index", "UsingIP", "LongURL", "ShortURL", "Symbol@",
    "Redirecting//", "PrefixSuffix-", "SubDomains", "HTTPS", "DomainRegLen",
    "Favicon", "NonStdPort", "HTTPSDomainURL", "RequestURL", "AnchorURL",
    "LinksInScriptTags", "ServerFormHandler", "InfoEmail", "AbnormalURL",
    "WebsiteForwarding", "StatusBarCust", "DisableRightClick",
    "UsingPopupWindow", "IframeRedirection", "AgeofDomain", "DNSRecording",
    "WebsiteTraffic", "PageRank", "GoogleIndex", "LinksPointingToPage",
    "StatsReport"
]


def extract_features(url: str) -> dict:
    try:
        parsed = urlparse(url if url.startswith("http") else "http://" + url)
        domain = parsed.netloc.lower().replace("www.", "")
        full   = url.lower()
    except Exception:
        domain, full = "", url.lower()

    f = {}

    ip_pat = re.compile(r"^(\d{1,3}\.){3}\d{1,3}$|0x[0-9a-f]{2}(\.\d+){3}|\d{8,10}")
    f["UsingIP"]        = -1 if ip_pat.search(domain) else 1
    f["LongURL"]        = -1 if len(url) > 75 else (0 if len(url) >= 54 else 1)
    f["ShortURL"]       = -1 if domain in SHORTENERS else 1
    f["Symbol@"]        = -1 if "@" in url else 1
    after_scheme        = url.split("://", 1)[-1]
    f["Redirecting//"]  = -1 if "//" in after_scheme else 1
    f["PrefixSuffix-"]  = -1 if "-" in domain else 1
    dots               = domain.count(".")
    f["SubDomains"]     = 1 if dots == 1 else (0 if dots == 2 else -1)
    f["HTTPS"]          = 1 if url.startswith("https") else -1
    f["DomainRegLen"]   = -1 if len(domain) < 6 else 1
    f["Favicon"]        = 1
    port = parsed.port
    f["NonStdPort"]     = -1 if port and port not in (80, 443) else 1
    f["HTTPSDomainURL"] = -1 if "https" in domain else 1
    f["RequestURL"]     = 1
    f["AnchorURL"]      = 1
    f["LinksInScriptTags"]  = 1
    f["ServerFormHandler"]  = 1
    f["InfoEmail"]          = -1 if "mailto:" in full else 1
    f["AbnormalURL"]        = -1 if len(domain) < 4 else 1
    f["WebsiteForwarding"]  = 1
    f["StatusBarCust"]      = 1
    f["DisableRightClick"]  = 1
    f["UsingPopupWindow"]   = 1
    f["IframeRedirection"]  = 1
    f["AgeofDomain"]          = 1
    f["DNSRecording"]         = 1
    f["WebsiteTraffic"]       = 1
    f["PageRank"]             = -1  
    f["GoogleIndex"]          = 1
    f["LinksPointingToPage"]  = 1
    f["StatsReport"]          = 1

    return f   


def features_to_list(features: dict, column_order: list) -> list:
    """
    Build the full 31-value list that the scaler expects.
    Index=0 is prepended (it was col 0 in training but has no real meaning).
    column_order should be FULL_COLUMN_ORDER (31 items).
    """
    result = []
    for col in column_order:
        if col == "Index":
            result.append(0)          
        elif col == "class":
            continue
        else:
            result.append(features.get(col, 1))
    return result