import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-BC8DNmFm.js";
import { a as Button, B as Badge } from "./button-DRTZ0JvA.js";
import { I as Input } from "./input-C7KJYqwe.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-DMwnWbnd.js";
import { C as CircleHelp } from "./circle-help-K4ok-L1o.js";
import { S as Search } from "./search-D2wkfLBZ.js";
import { C as ChevronDown } from "./chevron-down-C6iEBiSY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const FAQ_DATA = [
  {
    id: "arbitrage",
    title: "Understanding Arbitrage Trading",
    icon: "📈",
    items: [
      {
        id: "what-is-arbitrage",
        question: "What is arbitrage trading?",
        answer: "Arbitrage trading is the practice of simultaneously buying and selling the same asset across different markets to profit from temporary price discrepancies. At GoNext, our AI engines monitor thousands of market pairs in real time — across crypto exchanges, forex venues, and commodity markets — and execute trades within milliseconds when a profitable spread is detected. Because positions are opened and closed almost instantaneously, the strategy carries minimal directional market risk."
      },
      {
        id: "ai-arbitrage",
        question: "How does AI-powered arbitrage work?",
        answer: "Our proprietary AI system continuously scans over 40 exchanges and trading pairs using machine-learning models trained on years of historical price data. The engine identifies mispriced assets, calculates net profit after fees and slippage, and routes the trade through our low-latency execution layer. The entire cycle — from signal detection to trade confirmation — completes in under 50 milliseconds. The AI also dynamically adjusts position sizes and risk parameters based on current market volatility."
      },
      {
        id: "markets",
        question: "What markets does GoNext operate in?",
        answer: "GoNext operates across three primary asset classes: (1) Cryptocurrency markets — major pairs on Binance, Coinbase Pro, Kraken, Bybit, and 20+ additional exchanges; (2) Foreign exchange (Forex) — spot and derivatives for G10 and emerging-market currency pairs; (3) Precious metals and commodities — gold, silver, and energy futures traded on CME and LME venues. Diversifying across uncorrelated markets allows our algorithm to stay active regardless of which asset class is experiencing favorable spread conditions."
      },
      {
        id: "returns",
        question: "How consistent are the returns?",
        answer: "GoNext has maintained positive monthly returns every month since inception. Our blended portfolio strategy targets a daily ROI of 1.0%–1.28% depending on the chosen investment package (Genesis, Momentum, or Velocity). Historical back-tested data shows a Sharpe ratio above 3.2, indicating strong risk-adjusted performance. While no investment is completely without risk, arbitrage strategies are far less correlated with broader market crashes than directional trading, making returns more stable and predictable over time."
      },
      {
        id: "risks",
        question: "What are the risks?",
        answer: "Primary risks include: execution risk (slippage during high-volatility events), liquidity risk (temporary inability to close a leg of the trade), counterparty risk (exchange downtime or insolvency), and smart-contract risk for on-chain arbitrage. GoNext mitigates these through exchange diversification, liquidity buffers, multi-sig custodial arrangements, and a dedicated risk-management desk that monitors positions 24/7. A portion of each package fee is allocated to an insurance reserve fund that covers platform-level losses."
      }
    ]
  },
  {
    id: "security",
    title: "Security and Transparency",
    icon: "🔒",
    items: [
      {
        id: "investment-secured",
        question: "How is my investment secured?",
        answer: "Investor capital is held in segregated wallets — we never commingle client funds with operational capital. Hot-wallet balances are kept to a minimum (≤5% of AUM) for active trading; the remainder sits in multi-signature cold storage requiring three independent keys to authorise a withdrawal. All wallet addresses are published on-chain for independent verification. Additionally, GoNext maintains a dedicated insurance reserve funded by 2% of gross trading profits each month."
      },
      {
        id: "audited",
        question: "Is GoNext audited?",
        answer: "Yes. GoNext engages independent third-party auditors on a quarterly basis. Smart-contract code is audited by CertiK before every major update. Financial statements are reviewed by an accredited accounting firm and published in our quarterly transparency report available in the investor dashboard. Our trading algorithms are also subject to annual independent back-testing and performance attribution analysis to verify reported returns."
      },
      {
        id: "verify-earnings",
        question: "How can I verify my earnings?",
        answer: "Every profit allocation is recorded on-chain. From your dashboard you can view the transaction hash for each daily payout, trace it on a public blockchain explorer, and confirm the amount credited to your wallet address. We also provide a downloadable CSV export of your full earnings history and a live portfolio tracker that updates in real time. Our commitment to on-chain transparency means any third party can independently verify the flow of funds."
      },
      {
        id: "ceases-operations",
        question: "What happens if GoNext ceases operations?",
        answer: "In the event of a wind-down, all investor capital held in segregated wallets is returned to investors in full before any operational expenses are settled. The smart contracts governing fund custody include an emergency withdrawal function that investors can trigger directly on-chain if GoNext becomes unreachable for more than 30 days, ensuring no third-party action is required to recover funds. A detailed business-continuity plan is reviewed by our board of directors every six months."
      }
    ]
  },
  {
    id: "financial",
    title: "Financial and Profit Distribution",
    icon: "💰",
    items: [
      {
        id: "profits-credited",
        question: "When are profits credited?",
        answer: "Profits are calculated and credited to your GoNext wallet every 24 hours at 00:00 UTC. You will receive an in-app notification and an email summary as soon as the daily settlement is complete. Credited profits are immediately available for reinvestment or withdrawal — there is no additional holding period after the daily credit."
      },
      {
        id: "roi-rates",
        question: "What are the exact ROI rates per package?",
        answer: "GoNext offers three investment tiers: Genesis ($50–$4,999) — 1.0% daily ROI; Momentum ($5,000–$24,999) — 1.14% daily ROI; Velocity ($25,000+) — 1.28% daily ROI. All packages include daily profit crediting directly to your wallet balance with no lock-in period beyond the active investment term."
      },
      {
        id: "binary-bonus",
        question: "How is the binary bonus calculated?",
        answer: "The binary bonus is paid on matching volume between your left and right network legs. Each week, GoNext calculates the weaker leg's total investment volume and pays you 10% of that amount as a binary bonus, up to a weekly cap determined by your current rank. For example, if your weaker leg has $10,000 in new investment volume, you earn $1,000 that week. Unmatched volume carries over to the following week and does not expire."
      },
      {
        id: "withdrawals",
        question: "When are withdrawal requests processed?",
        answer: "Withdrawal requests are processed within 24–48 business hours. Requests submitted before 18:00 UTC on a business day are typically processed the same day; requests after that cutoff are processed the following business day. Minimum withdrawal amount is $50 equivalent. For amounts above $10,000, an additional security verification step (document upload and 2FA confirmation) is required, and processing may take up to 72 hours."
      },
      {
        id: "fees",
        question: "Are there any fees?",
        answer: "GoNext charges no deposit fees and no management fees on daily profits. The only applicable charges are: (1) a one-time 1% platform onboarding fee deducted from your first deposit; (2) a 1% withdrawal processing fee on each withdrawal; (3) standard blockchain network gas fees, which vary by network congestion and are charged at cost with no markup. There are no hidden fees of any kind."
      }
    ]
  },
  {
    id: "network",
    title: "Network Structure",
    icon: "🌐",
    items: [
      {
        id: "referral-system",
        question: "How does the referral system work?",
        answer: "When you refer a new investor to GoNext using your unique referral link, you earn a direct referral commission of 10% on their deposit. This commission is credited instantly upon the referred investor's deposit confirmation. Referral commissions are paid indefinitely for the lifetime of the referred investor's active account, creating a sustainable passive income stream alongside your investment returns."
      },
      {
        id: "binary-structure",
        question: "What is the binary bonus structure?",
        answer: "GoNext's binary network is a two-legged structure: every investor has a left leg and a right leg beneath them. You place new direct referrals in whichever leg needs strengthening, and your upline may also place investors under you (spillover). Binary bonuses are paid weekly on the matching volume of your weaker leg at a 10% rate, with rank-based weekly caps ranging from $500 (Associate) up to $25,000 (Elite). The structure rewards balanced leg building over rapid one-sided recruitment."
      },
      {
        id: "ranks",
        question: "How are ranks determined?",
        answer: "Ranks advance based on two criteria: (1) your own active investment package must be at or above the qualifying tier; (2) your network must meet minimum volume thresholds in both legs. The ranks are Associate, Silver, Gold, Platinum, Diamond, and Elite. Rank upgrades are evaluated in real time — as soon as both criteria are met, your rank and associated benefits (higher weekly caps, additional bonuses, account manager access) are activated immediately."
      },
      {
        id: "multiple-accounts",
        question: "Can I have multiple accounts?",
        answer: "No. GoNext enforces a strict one-account-per-person policy to maintain network integrity and regulatory compliance. Each account is linked to a verified government ID and a unique Internet Identity. Duplicate accounts detected by our KYC system will have their funds frozen pending review, and both accounts may be permanently suspended. If you believe you have accidentally created a duplicate account, contact support immediately to merge or close the duplicate before our automated review flags it."
      }
    ]
  },
  {
    id: "operations",
    title: "General Operations",
    icon: "⚙️",
    items: [
      {
        id: "sign-up",
        question: "How do I sign up?",
        answer: "Signing up takes less than two minutes. Click 'Get Started' on any page to authenticate with Internet Identity — a secure, privacy-preserving login built on the Internet Computer blockchain. No email or password is required; your device's biometric (fingerprint or Face ID) creates a cryptographic key pair. Once authenticated, complete the brief onboarding form, choose your investment package, deposit crypto, and your account is active."
      },
      {
        id: "cryptocurrencies",
        question: "What cryptocurrencies are accepted?",
        answer: "GoNext currently accepts deposits in Bitcoin (BTC), Ethereum (ETH), USDT (ERC-20 and TRC-20), USDC (ERC-20), BNB (BEP-20), and ICP (Internet Computer Protocol). All deposits are automatically converted to USD equivalent at the prevailing market rate at time of receipt and credited to your account balance. Additional currencies are added periodically — check the deposit page for the latest list of supported assets."
      },
      {
        id: "deposit-confirmation",
        question: "How long does deposit confirmation take?",
        answer: "Confirmation times depend on the network: Bitcoin typically requires 3 confirmations (~30 minutes); Ethereum and ERC-20 tokens require 12 confirmations (~3 minutes); BNB/BEP-20 requires 15 confirmations (~45 seconds); TRC-20 USDT requires 20 confirmations (~1 minute); ICP confirms instantly (1–2 seconds). Your balance is credited as soon as the required confirmations are reached. You can track confirmation progress in real time on the Deposits tab of your dashboard."
      },
      {
        id: "contact-support",
        question: "How do I contact support?",
        answer: "GoNext offers multiple support channels: (1) Live chat — available 24/7 directly from your dashboard for account-related queries; (2) Email — support@gonext.finance, with a guaranteed response within 4 business hours; (3) Telegram community — @GoNextOfficial for general questions and community discussion; (4) Dedicated account manager — available for Platinum and Elite investors, reachable via direct message in the dashboard. Please never share your private keys, seed phrases, or Internet Identity anchor with any support representative."
      }
    ]
  }
];
function AccordionItem({
  item,
  isOpen,
  onToggle,
  categoryId,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `border border-border rounded-xl overflow-hidden transition-smooth ${isOpen ? "border-primary/40 shadow-gold bg-card" : "bg-card/60 hover:border-border/80 hover:bg-card"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group",
            onClick: onToggle,
            "aria-expanded": isOpen,
            "data-ocid": `faq.${categoryId}.item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-medium text-base leading-snug transition-smooth ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"}`,
                  children: item.question
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-smooth ${isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/60 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.answer })
            ] })
          },
          "content"
        ) })
      ]
    }
  );
}
function FaqSection({
  category,
  openItems,
  onToggle,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.1 },
      className: "space-y-3",
      "data-ocid": `faq.${category.id}.section`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-lg", children: category.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-foreground", children: category.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "ml-auto text-xs bg-muted text-muted-foreground",
              children: [
                category.items.length,
                " questions"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: category.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          AccordionItem,
          {
            item,
            isOpen: openItems.has(item.id),
            onToggle: () => onToggle(item.id),
            categoryId: category.id,
            index: i
          },
          item.id
        )) })
      ]
    }
  );
}
function FaqPage() {
  const [search, setSearch] = reactExports.useState("");
  const [openItems, setOpenItems] = reactExports.useState(/* @__PURE__ */ new Set());
  const filteredData = reactExports.useMemo(() => {
    if (!search.trim()) return FAQ_DATA;
    const q = search.toLowerCase();
    return FAQ_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      )
    })).filter((cat) => cat.items.length > 0);
  }, [search]);
  const totalResults = filteredData.reduce((acc, c) => acc + c.items.length, 0);
  function toggleItem(id) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function expandAll() {
    const allIds = filteredData.flatMap((c) => c.items.map((i) => i.id));
    setOpenItems(new Set(allIds));
  }
  function collapseAll() {
    setOpenItems(/* @__PURE__ */ new Set());
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 py-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4" }),
            "Help Center"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: [
            "Frequently Asked ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-text", children: "Questions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto mb-8", children: "Everything you need to know about GoNext — from how our AI arbitrage engine works to withdrawals and security." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-lg mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "text",
                placeholder: "Search questions…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-12 h-12 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-xl text-base",
                "data-ocid": "faq.search_input"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth text-xs",
                onClick: () => setSearch(""),
                "data-ocid": "faq.search_clear_button",
                children: "Clear"
              }
            )
          ] }),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: totalResults === 0 ? "No questions matched your search." : `Found ${totalResults} question${totalResults !== 1 ? "s" : ""} matching "${search}"` })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filteredData.length,
          " categor",
          filteredData.length !== 1 ? "ies" : "y",
          " · ",
          totalResults,
          " question",
          totalResults !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: expandAll,
              className: "text-xs border-border text-muted-foreground hover:text-foreground",
              "data-ocid": "faq.expand_all_button",
              children: "Expand all"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: collapseAll,
              className: "text-xs border-border text-muted-foreground hover:text-foreground",
              "data-ocid": "faq.collapse_all_button",
              children: "Collapse all"
            }
          )
        ] })
      ] }),
      filteredData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "text-center py-24",
          "data-ocid": "faq.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: "🔍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-2", children: "No results found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-6", children: [
              "No questions matched “",
              search,
              "”. Try a different search term."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setSearch(""),
                "data-ocid": "faq.clear_search_button",
                children: "Clear search"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: filteredData.map((category, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        FaqSection,
        {
          category,
          openItems,
          onToggle: toggleItem,
          index: i
        },
        category.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "mt-16 rounded-2xl border border-primary/20 bg-card p-8 md:p-12 text-center relative overflow-hidden",
          "data-ocid": "faq.cta_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-foreground mb-3", children: "Still have questions?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto mb-7", children: "Our support team is available 24/7. Reach out and we’ll get back to you within a few hours." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    className: "gold-gradient text-primary-foreground font-semibold hover:opacity-90 transition-smooth",
                    "data-ocid": "faq.contact_primary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Contact Support" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    className: "border-border text-foreground hover:border-primary/40 hover:text-primary transition-smooth",
                    "data-ocid": "faq.community_secondary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "https://t.me/GoNextOfficial",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "Join Telegram Community"
                      }
                    )
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  FaqPage as default
};
