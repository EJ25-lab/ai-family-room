/* @ds-bundle: {"format":3,"namespace":"EdJusticeCollectiveDesignSystem_f6e555","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BulletList","sourcePath":"components/core/BulletList.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"DocFooter","sourcePath":"components/core/DocFooter.jsx"},{"name":"DocHeader","sourcePath":"components/core/DocHeader.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"FindingCard","sourcePath":"components/core/FindingCard.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"PacketCover","sourcePath":"ui_kits/board_packet/PacketCover.jsx"},{"name":"PacketPage","sourcePath":"ui_kits/board_packet/PacketPage.jsx"},{"name":"Hero","sourcePath":"ui_kits/website/Hero.jsx"},{"name":"SiteNav","sourcePath":"ui_kits/website/SiteNav.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"d0c340b96efd","components/core/BulletList.jsx":"4ae64349b63e","components/core/Button.jsx":"953ca54c368f","components/core/Callout.jsx":"f0567a09261c","components/core/DocFooter.jsx":"9ae9e4b5bf49","components/core/DocHeader.jsx":"ea5044dabdd4","components/core/Eyebrow.jsx":"a73387477dc7","components/core/FindingCard.jsx":"06d2bb838a68","components/core/SectionHeading.jsx":"ac9ed2e5376b","ui_kits/board_packet/PacketCover.jsx":"4417459c7df0","ui_kits/board_packet/PacketPage.jsx":"943c5e9f9099","ui_kits/website/Hero.jsx":"72f84c5ab8e6","ui_kits/website/SiteNav.jsx":"71e25dcdd960"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EdJusticeCollectiveDesignSystem_f6e555 = window.EdJusticeCollectiveDesignSystem_f6e555 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC Badge — a small pill label. Tones: teal (default/brand), proof (green),
 * caution (orange), neutral. Used sparingly for status/meta tags.
 */
function Badge({
  children,
  tone = 'teal',
  style = {},
  ...rest
}) {
  const tones = {
    teal: {
      background: 'var(--ejc-teal-pale)',
      color: 'var(--ejc-teal-deep)'
    },
    proof: {
      background: 'rgba(52,199,138,0.14)',
      color: '#1f8a5b'
    },
    caution: {
      background: 'rgba(242,140,56,0.15)',
      color: '#b5651a'
    },
    neutral: {
      background: 'var(--ejc-off)',
      color: 'var(--ejc-mid)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '4px 11px',
      borderRadius: 999,
      lineHeight: 1.4,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BulletList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC BulletList — teal-dot bullets for any 3+ parallel items.
 * Each item: bold lead-in + plain explanation. Pass an array of strings (with
 * optional **bold** lead-in via the `lead` field on an object), or children <li>s.
 */
function BulletList({
  items = [],
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({
    style: {
      listStyle: 'none',
      margin: '4px 0 12px',
      padding: 0,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), items.map((item, i) => {
    const lead = typeof item === 'object' ? item.lead : null;
    const text = typeof item === 'object' ? item.text : item;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        position: 'relative',
        paddingLeft: 24,
        marginBottom: 12,
        fontSize: 15,
        lineHeight: 1.65,
        color: 'var(--ejc-text)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 5,
        top: 9,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--ejc-teal)'
      }
    }), lead && /*#__PURE__*/React.createElement("strong", {
      style: {
        fontWeight: 700
      }
    }, lead, " "), text);
  }));
}
Object.assign(__ds_scope, { BulletList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BulletList.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC Button — pill, teal-forward. Primary fills teal and darkens on hover;
 * secondary is a teal outline; ghost is text-only. Never centered text blocks —
 * this is for actions (CTAs in landing pages, "scan to access", etc).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 13
    },
    md: {
      padding: '12px 22px',
      fontSize: 14
    },
    lg: {
      padding: '15px 30px',
      fontSize: 16
    }
  };
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    letterSpacing: '0.01em',
    borderRadius: 'var(--radius-pill)',
    border: '1.5px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
    lineHeight: 1,
    transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)',
    transform: active && !disabled ? 'translateY(1px)' : 'none',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: hover ? 'var(--ejc-teal-dark)' : 'var(--ejc-teal)',
      color: '#fff'
    },
    secondary: {
      background: hover ? 'var(--ejc-teal-pale)' : 'transparent',
      color: 'var(--ejc-teal-deep)',
      borderColor: 'var(--ejc-teal)'
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--ejc-teal-dark)' : 'var(--ejc-teal-deep)'
    }
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    disabled: Tag === 'button' ? disabled : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC Callout — the teal-pale panel with a teal left border for the one line
 * that must land (a thesis, a stake, an invitation). One per section at most.
 */
function Callout({
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--ejc-teal-pale)',
      borderLeft: '4px solid var(--ejc-teal)',
      padding: '20px 24px',
      margin: '6px 0 22px',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ejc-teal-deep)',
      lineHeight: 1.65,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/DocFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC DocFooter — the thin dark footer bar (the only dark field in the system).
 * Centered teal text: org · tagline · contact · page. Keep it slim.
 */
function DocFooter({
  org = 'EdJustice Collective',
  tagline = 'Build Systems. Promote Justice.',
  contact = 'chief@tieredjusticenow.com',
  page,
  style = {},
  ...rest
}) {
  const parts = [org, tagline, contact, page].filter(Boolean);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--ejc-dark)',
      color: 'var(--ejc-teal)',
      fontFamily: 'var(--font-sans)',
      fontSize: 9.5,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: 9,
      ...style
    }
  }, rest), parts.join('\u00A0\u00A0·\u00A0\u00A0'));
}
Object.assign(__ds_scope, { DocFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DocFooter.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC Eyebrow — the uppercase, wide-tracked teal label that sits above titles
 * and section headings. Use ' · ' to separate segments (SECTION · CONTEXT · LABEL).
 */
function Eyebrow({
  children,
  color = 'var(--ejc-teal)',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
      lineHeight: 1.5,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/DocHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC DocHeader — the canonical light document header: eyebrow + subline on the
 * left, teal logo mark top-right, a 2.5px teal rule underneath. Never a dark band.
 */
function DocHeader({
  eyebrow,
  subline,
  logoSrc = 'assets/logo-color.svg',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '2.5px solid var(--ejc-teal)',
      paddingBottom: 16,
      marginBottom: 30,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow), subline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--ejc-text)',
      marginTop: 7,
      lineHeight: 1.6
    }
  }, subline)), logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "EdJustice Collective",
    style: {
      width: 118,
      height: 'auto',
      flexShrink: 0,
      marginLeft: 24
    }
  }));
}
Object.assign(__ds_scope, { DocHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/DocHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/FindingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC FindingCard — bordered card: teal eyebrow, dark sentence headline, gray
 * body, hairline, then a teal-deep insight line (prefixed ✦). Reserve for what
 * must stand apart; boxes are rare.
 */
function FindingCard({
  eyebrow,
  headline,
  children,
  insight,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: '1px solid var(--ejc-warm)',
      borderRadius: 10,
      padding: '22px 24px',
      marginBottom: 16,
      background: '#fff',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ejc-teal)',
      marginBottom: 9
    }
  }, eyebrow), headline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.02rem',
      fontWeight: 700,
      color: 'var(--ejc-text)',
      marginBottom: 8,
      lineHeight: 1.3
    }
  }, headline), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--ejc-mid)',
      lineHeight: 1.65
    }
  }, children), insight && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--ejc-warm)',
      marginTop: 14,
      paddingTop: 13,
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--ejc-teal-deep)',
      lineHeight: 1.55
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 6
    }
  }, "\u2726"), insight));
}
Object.assign(__ds_scope, { FindingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FindingCard.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EJC SectionHeading — teal rounded-square marker + uppercase teal-deep heading
 * with a teal rule underneath. One marker per heading; this is the document's
 * primary structural device.
 */
function SectionHeading({
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      borderBottom: '1.5px solid var(--ejc-teal)',
      paddingBottom: 8,
      marginBottom: 16,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 5,
      background: 'var(--ejc-teal)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: '1.12rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--ejc-teal-deep)'
    }
  }, children));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/board_packet/PacketCover.jsx
try { (() => {
const MARK = '../../assets/mark-teal.png';

/**
 * PacketCover — the read-ahead cover page: large mark, eyebrow, the "prepared
 * for you" lead, a teal-pale callout invitation, and the section index.
 */
function PacketCover({
  items = []
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "cover",
    style: {
      background: 'var(--ejc-white)',
      width: 'min(860px, 100%)',
      margin: '0 auto 28px',
      padding: '56px 58px 64px',
      position: 'relative',
      minHeight: 1080,
      boxShadow: 'var(--shadow-page)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 540
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "EdJustice Collective\xA0\xB7\xA0Prepared for the Oshkosh Area School District Board"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--ejc-text)',
      marginTop: 10
    }
  }, "Governance Lab\xA0\xB7\xA0Read-Ahead Packet\xA0\xB7\xA0Confidential")), /*#__PURE__*/React.createElement("img", {
    src: MARK,
    alt: "EJC mark",
    style: {
      width: 84,
      height: 84,
      flexShrink: 0,
      marginLeft: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '2.5px solid var(--ejc-teal)',
      margin: '22px 0 34px'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '2.4rem',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
      color: 'var(--ejc-text)',
      margin: '0 0 24px',
      maxWidth: 640
    }
  }, "Build the instrument this board has been governing without."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.7,
      color: 'var(--ejc-text)',
      maxWidth: 660,
      marginBottom: 16
    }
  }, "This packet was prepared specifically for you \u2014 not for your board collectively, not for your district generally, but for you as an elected official who has been carrying something heavy for a long time without the right instrument in your hands."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--ejc-mid)',
      maxWidth: 660,
      marginBottom: 28
    }
  }, "What you will find inside: what your board has done well, named with precision. The headlines your community has been reading, held with honesty and grace. What those headlines reveal about a systems gap \u2014 not a governance failure. And what one day with EJC gives you that nothing in your current toolkit provides."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ejc-teal-pale)',
      borderLeft: '4px solid var(--ejc-teal)',
      padding: '20px 24px',
      margin: '0 0 36px',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ejc-teal-deep)',
      lineHeight: 1.65,
      maxWidth: 660
    }
  }, "You were elected to serve the children of Oshkosh. What comes next is not about the deficit. It is about what your board can see from here \u2014 and what becomes possible for those kids when you can see more clearly."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ejc-teal)',
      marginBottom: 16
    }
  }, "What is inside this packet"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      maxWidth: 700
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 16,
      padding: '13px 0',
      borderBottom: '1px solid var(--ejc-warm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 26,
      height: 26,
      borderRadius: 6,
      background: 'var(--ejc-teal)',
      color: '#fff',
      fontWeight: 800,
      fontSize: 13,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--ejc-text)'
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--ejc-mid)',
      lineHeight: 1.6,
      marginTop: 2
    }
  }, it.desc))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DocFooter, {
    page: "Page 1 of 5"
  })));
}
Object.assign(__ds_scope, { PacketCover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/board_packet/PacketCover.jsx", error: String((e && e.message) || e) }); }

// ui_kits/board_packet/PacketPage.jsx
try { (() => {
const LOGO = '../../assets/logo-color.svg';

/**
 * PacketPage — a single ~8.5×11 page of an EJC board packet: white field,
 * canonical DocHeader, content, thin dark DocFooter pinned to the bottom.
 */
function PacketPage({
  id,
  eyebrow,
  subline,
  page,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    "data-screen-label": id,
    style: {
      background: 'var(--ejc-white)',
      width: 'min(860px, 100%)',
      margin: '0 auto 28px',
      padding: '48px 58px 64px',
      position: 'relative',
      minHeight: 1080,
      boxShadow: 'var(--shadow-page)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DocHeader, {
    eyebrow: eyebrow,
    subline: subline,
    logoSrc: LOGO
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 40
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DocFooter, {
    page: page
  })));
}
Object.assign(__ds_scope, { PacketPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/board_packet/PacketPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/**
 * Hero — light landing hero: eyebrow, large left-aligned display title, lead,
 * two CTAs, with the teal mark to the right. Clean and light; no dark band.
 */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "hero",
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '72px 32px 56px',
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "K\u201312 Leadership Infrastructure Studio"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: '3.1rem',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      lineHeight: 1.08,
      color: 'var(--ejc-text)',
      margin: '18px 0 22px'
    }
  }, "Build Systems.", /*#__PURE__*/React.createElement("br", null), "Promote Justice."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.7,
      color: 'var(--ejc-mid)',
      maxWidth: 520,
      marginBottom: 30
    }
  }, "EJC builds the governance instruments that let principals, superintendents, and boards see what is coming before it becomes a headline \u2014 named as a systems gap, never a deficit."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    href: "#book"
  }, "Book the Governance Lab"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "lg",
    href: "#work"
  }, "See how we read a record"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ejc-teal-pale)',
      borderRadius: 20,
      padding: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mark-teal.png",
    alt: "EJC mark",
    style: {
      width: 200,
      height: 200
    }
  }))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteNav.jsx
try { (() => {
/**
 * SiteNav — light marketing top bar: logo left, links + teal CTA right.
 * No dark band; a hairline under it on scroll.
 */
function SiteNav() {
  const links = ['The Work', 'Governance Lab', 'Frameworks', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--ejc-warm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-color.svg",
    alt: "EdJustice Collective",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ejc-mid)',
      textDecoration: 'none'
    }
  }, l)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    href: "#book"
  }, "Book the Lab"))));
}
Object.assign(__ds_scope, { SiteNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteNav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BulletList = __ds_scope.BulletList;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.DocFooter = __ds_scope.DocFooter;

__ds_ns.DocHeader = __ds_scope.DocHeader;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.FindingCard = __ds_scope.FindingCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.PacketCover = __ds_scope.PacketCover;

__ds_ns.PacketPage = __ds_scope.PacketPage;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.SiteNav = __ds_scope.SiteNav;

})();
