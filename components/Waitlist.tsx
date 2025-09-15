// components/Waitlist.tsx
"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import Particles from "./unisection/Particles";
import Unisection from "./Unisection";
import { useLang } from "@/components/locale";
import { Cpu, Cloud, UserPlus, Handshake } from "lucide-react";
import UniHeader from "@/components/blocks/Uniheader";
import ElectricBorder from "@/components/blocks/ElectricBorder";

// locale
import dicts from "./waitlist/locale";
import { ROUTES as R } from "@/app/routes";
import RLink from "./rlink";

type WaitlistContextValue = {
  openWaitlist: () => void;
  closeWaitlist: () => void;
  toggleWaitlist: () => void;
  isOpen: boolean;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlistModal() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlistModal must be used within <WaitlistProvider/>");
  return ctx;
}

type WaitlistProviderProps = {
  children: React.ReactNode;
  renderContent?: () => React.ReactNode;
};

export function WaitlistProvider({ children, renderContent }: WaitlistProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = useCallback(() => setIsOpen(true), []);
  const closeWaitlist = useCallback(() => setIsOpen(false), []);
  const toggleWaitlist = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <WaitlistContext.Provider value={{ isOpen, openWaitlist, closeWaitlist, toggleWaitlist }}>
      {children}
      <WaitlistModal mount={true} renderContent={renderContent} />
    </WaitlistContext.Provider>
  );
}

type WaitlistModalProps = {
  mount?: boolean;
  renderContent?: () => React.ReactNode;
};

function WaitlistModal({ mount = true, renderContent }: WaitlistModalProps) {
  const ctx = useContext(WaitlistContext);
  const [ready, setReady] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // locale resolve
  const lang = useLang();
  const t = (dicts as any)[lang] ?? dicts.en;

  // form state
  const [email, setEmail] = useState("");
  const [pickNode, setPickNode] = useState(false);
  const [nodeCount, setNodeCount] = useState<"1" | "2" | "3+" | null>("1");
  const [pickAPI, setPickAPI] = useState(false);
  const [pickReferrals, setPickReferrals] = useState(false);
  const [pickPartnership, setPickPartnership] = useState(false);

  // ux state
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const [message, setMessage] = useState("");

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ctx?.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.closeWaitlist();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ctx]);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const anyInterest = pickNode || pickAPI || pickReferrals || pickPartnership;
  const formValid = isValidEmail(email) && anyInterest && (!pickNode || nodeCount !== null);

  // public IP for Telegram payload
  const getPublicIP = useCallback(async (): Promise<string | null> => {
    try {
      const r = await fetch("https://api.ipify.org?format=json", { cache: "no-store" });
      if (!r.ok) return null;
      const j = (await r.json()) as { ip?: string };
      return j.ip ?? null;
    } catch {
      return null;
    }
  }, []);

  // submit to Telegram
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!formValid) {
        setSent("err");
        setMessage(t.feedback.error);
        return;
      }

      setSending(true);
      setSent(null);
      setMessage("");

      try {
        const BOT_TOKEN = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
        const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
          setSent("err");
          setMessage("Missing NEXT_PUBLIC_TG_BOT_TOKEN or NEXT_PUBLIC_TG_CHAT_ID.");
          setSending(false);
          return;
        }

        const ip = await getPublicIP();
        const ua = navigator.userAgent;
        const tz = Intl.DateTimeFormat()?.resolvedOptions?.().timeZone || "Unknown";

        const interests: string[] = [];
        if (pickNode) interests.push("node");
        if (pickAPI) interests.push("api");
        if (pickReferrals) interests.push("referrals");
        if (pickPartnership) interests.push("partnership");

        const textLines = [
          "WAITLIST SUBMISSION",
          `email: ${email.trim()}`,
          `lang: ${lang}`,
          `interests: ${interests.join(", ") || "-"}`,
          pickNode ? `node_count: ${nodeCount ?? "-"}` : null,
          `ip: ${ip ?? "unknown"}`,
          `tz: ${tz}`,
          `ua: ${ua}`,
          `ts: ${new Date().toISOString()}`,
        ].filter(Boolean) as string[];

        const tgUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const res = await fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: CHAT_ID, text: textLines.join("\n"), disable_web_page_preview: true }),
        });

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          setSent("err");
          setMessage(`Telegram API error: ${res.status} ${res.statusText} ${body}`.trim());
        } else {
          setSent("ok");
          setMessage(t.feedback.sent);
          setPickNode(false);
          setNodeCount(null);
          setPickAPI(false);
          setPickReferrals(false);
          setPickPartnership(false);
        }
      } catch (err: any) {
        setSent("err");
        setMessage(err?.message || "Unknown error");
      } finally {
        setSending(false);
      }
    },
    [formValid, email, pickNode, nodeCount, pickAPI, pickReferrals, pickPartnership, lang, getPublicIP, t.feedback.error, t.feedback.sent]
  );

  const toggleWithKeyboard = (fn: () => void) => (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fn();
    }
  };

  if (!mount || !ctx || !ready) return null;

  const emailHelpText =
    email.length === 0 ? t.emailHelp.empty : isValidEmail(email) ? t.emailHelp.ok : t.emailHelp.bad;

  const EB = ({ active, children }: { active: boolean; children: React.ReactNode }) =>
    active ? (
      <ElectricBorder className="p-1" color="#f9a729" chaos={0.1} thickness={3} speed={0.5}>
        {children}
      </ElectricBorder>
    ) : (
      <>{children}</>
    );

  const btnClass = (active: boolean) => `button is-medium is-fullwidth ${active ? "is-black" : "is-dark"}`;

  const modal = (
    <div className={`modal ${ctx.isOpen ? "is-active" : ""}`} aria-hidden={!ctx.isOpen} role="dialog" aria-modal="true">
      <div className="modal-background" onClick={ctx.closeWaitlist} />

      <div
        className="modal-content"
        style={{
          width: "95vw",
          height: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "95vw",
          maxHeight: "95vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={boxRef}
          className="box"
          style={{ width: "100%", height: "100%", padding: 0, overflow: "auto", position: "relative" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Close waitlist"
            onClick={ctx.closeWaitlist}
            className="delete is-large"
            style={{ position: "absolute", top: "0.75rem", right: "0.75rem", width: "4rem", height: "4rem", transform: "scale(1.2)", zIndex: 2 }}
          />

          <Unisection>
            <Particles />
            <Particles />
            <Particles />

            <section className="hero is-medium">
              <div className="hero-body">
                <div className="container is-max-tablet">
                  <UniHeader
                    align="center"
                    as="h1"
                    header={t.hero.h1}
                    subheader={t.hero.sub}
                    colorText="white"
                    colorLine="primary"
                  />

                  <form onSubmit={onSubmit}>
                    {/* Row 1: node operator with inline count selector */}
                    <div className="columns is-vcentered is-multiline is-variable is-3">
                      <div className="column is-12">
                        <EB active={pickNode}>
                          <div
                            className={btnClass(pickNode)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={pickNode}
                            onClick={() => setPickNode((v) => !v)}
                            onKeyDown={toggleWithKeyboard(() => setPickNode((v) => !v))}
                            style={{ display: "block" }}
                          >
                            <div className="columns is-vcentered is-multiline">
                              <div className="column is-12-mobile is-6-tablet">
                                <span className="is-flex is-align-items-center">
                                  <span className="icon mr-3">
                                    <Cpu size={20} aria-hidden="true" />
                                  </span>
                                  <span className="has-text-weight-semibold">{t.choices.nodes.title}</span>
                                </span>
                              </div>

                              <div
                                className="column is-12-mobile is-6-tablet"
                                aria-disabled={!pickNode}
                                style={{
                                  opacity: pickNode ? 1 : 0.2,
                                  pointerEvents: pickNode ? "auto" : "none",
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="is-flex is-justify-content-flex-end is-align-items-center is-flex-wrap-wrap">
                                  <span className="mr-3 is-size-7 has-text-weight-light">{t.labels.howMany}</span>
                                  <div className="buttons has-addons">
                                    <button
                                      type="button"
                                      className={`button is-small ${nodeCount === "1" ? "is-primary is-selected" : ""}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNodeCount("1");
                                      }}
                                      aria-pressed={nodeCount === "1"}
                                      disabled={!pickNode}
                                      title="Run 1 device"
                                    >
                                      {t.choices.nodes.counts.one}
                                    </button>
                                    <button
                                      type="button"
                                      className={`button is-small ${nodeCount === "2" ? "is-primary is-selected" : ""}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNodeCount("2");
                                      }}
                                      aria-pressed={nodeCount === "2"}
                                      disabled={!pickNode}
                                      title="Run 2 devices"
                                    >
                                      {t.choices.nodes.counts.two}
                                    </button>
                                    <button
                                      type="button"
                                      className={`button is-small ${nodeCount === "3+" ? "is-primary is-selected" : ""}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNodeCount("3+");
                                      }}
                                      aria-pressed={nodeCount === "3+"}
                                      disabled={!pickNode}
                                      title="Run 3+ devices"
                                    >
                                      {t.choices.nodes.counts.threePlus}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </EB>
                      </div>

                      {/* Row 2: three compact options */}
                      <div className="column is-12-mobile is-4-tablet">
                        <EB active={pickAPI}>
                          <button
                            type="button"
                            className={btnClass(pickAPI)}
                            onClick={() => setPickAPI((v) => !v)}
                            aria-pressed={pickAPI}
                          >
                            <span className="is-flex is-align-items-center is-justify-content-center">
                              <span className="icon mr-2">
                                <Cloud size={18} aria-hidden="true" />
                              </span>
                              <span className="has-text-weight-medium">{t.choices.api.title}</span>
                            </span>
                          </button>
                        </EB>
                      </div>

                      <div className="column is-12-mobile is-4-tablet">
                        <EB active={pickReferrals}>
                          <button
                            type="button"
                            className={btnClass(pickReferrals)}
                            onClick={() => setPickReferrals((v) => !v)}
                            aria-pressed={pickReferrals}
                          >
                            <span className="is-flex is-align-items-center is-justify-content-center">
                              <span className="icon mr-2">
                                <UserPlus size={18} aria-hidden="true" />
                              </span>
                              <span className="has-text-weight-medium">{t.choices.affiliate.title}</span>
                            </span>
                          </button>
                        </EB>
                      </div>

                      <div className="column is-12-mobile is-4-tablet">
                        <EB active={pickPartnership}>
                          <button
                            type="button"
                            className={btnClass(pickPartnership)}
                            onClick={() => setPickPartnership((v) => !v)}
                            aria-pressed={pickPartnership}
                          >
                            <span className="is-flex is-align-items-center is-justify-content-center">
                              <span className="icon mr-2">
                                <Handshake size={18} aria-hidden="true" />
                              </span>
                              <span className="has-text-weight-medium">{t.choices.partnership.title}</span>
                            </span>
                          </button>
                        </EB>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field">
                      <label className="label has-text-white">{t.labels.email}</label>
                      <div className="control has-icons-left">
                        <input
                          className={`input ${email.length > 0 ? (isValidEmail(email) ? "is-success" : "is-danger") : ""}`}
                          type="email"
                          placeholder={t.labels.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <span className="icon is-small is-left">
                          <Cloud size={16} aria-hidden="true" />
                        </span>
                      </div>
                      <p className={`help ${email.length === 0 ? "" : isValidEmail(email) ? "is-success" : "is-danger"}`}>{emailHelpText}</p>
                    </div>

                    {/* Actions */}
                    <div className="field mt-4">
                      <div className="columns">
                        <div className="column is-6">
                          <div className="py-1 px-3">
                            <p className="is-size-7 has-text-greys">
                              {t.notices.privacy} &bull;{" "}
                              <RLink route={R.privacy.href} onClick={ctx.closeWaitlist} className="has-text-white is-size-7 is-underlined">
                                {t.notices.privacyLink}
                              </RLink>
                            </p>
                          </div>
                        </div>
                        <div className="column is-offset-1 is-5">
                          <div className="has-text-centered">
                            <div className="buttons">
                              <button
                                type="submit"
                                className={`button is-fullwidth is-outlined is-rounded is-primary ${sending ? "is-loading" : ""}`}
                                disabled={!formValid || sending}
                              >
                                {t.actions.submit}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {sent === "ok" && <p className="has-text-success mt-3">{t.feedback.sent}</p>}
                      {sent === "err" && <p className="has-text-danger mt-3">{message}</p>}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </Unisection>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default WaitlistProvider;
