import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  Link2,
  Loader2,
  LockKeyhole,
  MousePointerClick,
  QrCode,
  Sparkles,
  Wand2,
} from "lucide-react";
import { apiFetch } from "../utils/auth";
import { cn } from "../lib/utils";
import { shortDomain, shortUrl } from "../lib/brand";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { FieldHint, Input, Label } from "./ui/input";

const LOGO_URL =
  "https://res.cloudinary.com/sggs/image/upload/v1731136210/user_profile_photos/logo_yqftnr.png";

function ShortenLink({ compact = false, returnTo = "/shortenlink" }) {
  const [longURL, setLongURL] = useState("");
  const [customURL, setCustomURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortenedURL, setShortenedURL] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pasting, setPasting] = useState(false);
  const qrRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setShortenedURL("");
    setCopied(false);

    try {
      const response = await apiFetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: longURL,
          customURL: customURL.trim(),
        }),
      });

      if (response.status === 401) {
        navigate("/login", {
          state: { from: { pathname: returnTo, search: "", hash: "" } },
        });
        return;
      }

      const result = await response.json();

      if (result.id) {
        const newURL = shortUrl(result.id);
        toast.success("Short link created");
        setShortenedURL(newURL);
      } else {
        toast.error(result.error || "Could not create that link");
        setError(result.error || "Failed to generate URL. Please try again.");
      }
    } catch (fetchError) {
      setError(
        fetchError.message === "Failed to fetch"
          ? "Could not reach the server. Check your connection and try again."
          : `Something went wrong: ${fetchError.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedURL);
      setCopied(true);
      toast.success("Copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy. Select the link and copy it manually.");
    }
  };

  const pasteFromClipboard = async () => {
    try {
      setPasting(true);
      const text = await navigator.clipboard.readText();
      if (text) setLongURL(text.trim());
    } catch {
      toast.error("Clipboard access was blocked. Paste with Ctrl/Cmd + V.");
    } finally {
      setPasting(false);
    }
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas") || document.getElementById("shorten-qr");
    if (!canvas) return;
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "sggs-qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const resetForm = () => {
    setLongURL("");
    setCustomURL("");
    setShortenedURL("");
    setError(null);
    setCopied(false);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-card",
        compact ? "max-w-xl" : "max-w-3xl"
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-ink/10 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Link2 className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">Create a short link</p>
            <p className="text-[11px] text-muted">Paste, customise, share.</p>
          </div>
        </div>
        <Badge variant="brand" className="hidden sm:inline-flex">
          <Sparkles className="h-3 w-3" /> Free
        </Badge>
      </div>

      <div className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="longurl" required>
                Destination URL
              </Label>
              <button
                type="button"
                onClick={pasteFromClipboard}
                disabled={pasting}
                className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 transition hover:text-brand-700 disabled:opacity-50"
              >
                <Copy className="h-3 w-3" /> {pasting ? "Pasting..." : "Paste"}
              </button>
            </div>
            <div className="relative">
              <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <Input
                id="longurl"
                type="url"
                inputMode="url"
                autoComplete="url"
                className="pl-10"
                placeholder="https://your-long-url.com/a-very-long-path"
                value={longURL}
                onChange={(event) => setLongURL(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customtext">Custom back-half</Label>
            <div className="flex overflow-hidden rounded-xl border border-ink/15 bg-white shadow-sm transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10">
              <span className="flex shrink-0 items-center border-r border-ink/10 bg-ink/[0.035] px-3 text-[11px] font-medium text-ink/45 sm:px-3.5 sm:text-[13px]">
                {shortDomain()}/
              </span>
              <input
                id="customtext"
                type="text"
                className="h-12 min-w-0 flex-1 bg-transparent px-3.5 text-sm text-ink outline-none placeholder:text-ink/30"
                placeholder="summer-sale"
                value={customURL}
                onChange={(event) => setCustomURL(event.target.value.replace(/\s+/g, "-"))}
                maxLength={32}
              />
            </div>
            <FieldHint>Optional. Letters, numbers and hyphens work best.</FieldHint>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700" role="alert">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 text-[11px] text-muted">
              <LockKeyhole className="h-3.5 w-3.5 text-emerald-500" />
              Your links stay private until you share them.
            </p>
            <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {loading ? "Creating..." : "Shorten link"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </form>

        <AnimatePresence initial={false}>
          {shortenedURL && (
            <motion.div
              initial={{ opacity: 0, y: 16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      <Check className="h-3.5 w-3.5" /> Link ready
                    </p>
                    <a
                      href={shortenedURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block truncate font-display text-xl font-semibold tracking-[-0.03em] text-ink hover:text-brand-600"
                    >
                      {shortenedURL.replace(/^https?:\/\//, "")}
                    </a>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button size="sm" variant="primary" onClick={copyToClipboard}>
                        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? "Copied" : "Copy link"}
                      </Button>
                      <a
                        href={shortenedURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink/15 bg-white px-3.5 text-[13px] font-semibold text-ink transition hover:border-ink/25"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Open
                      </a>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold text-ink/55 transition hover:bg-white hover:text-ink"
                      >
                        Create another
                      </button>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3 rounded-xl border border-ink/10 bg-white p-2.5">
                    <div ref={qrRef} className="rounded-lg bg-white p-1">
                      <QRCodeCanvas
                        id="shorten-qr"
                        value={shortenedURL}
                        size={78}
                        bgColor="#ffffff"
                        fgColor="#0b0b10"
                        level="H"
                        imageSettings={{
                          src: LOGO_URL,
                          height: 16,
                          width: 16,
                          excavate: true,
                        }}
                        includeMargin={false}
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-muted">QR included</p>
                      <button
                        type="button"
                        onClick={downloadQRCode}
                        className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                      >
                        <Download className="h-3 w-3" /> Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!shortenedURL && (
          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-ink/10 pt-4">
            {[
              { icon: MousePointerClick, label: "Click tracking" },
              { icon: QrCode, label: "QR included" },
              { icon: Sparkles, label: "Custom alias" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-muted">
                <item.icon className="h-3.5 w-3.5 text-brand-500" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortenLink;
