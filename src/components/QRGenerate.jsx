import { useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import {
  ArrowDownToLine,
  Check,
  ImagePlus,
  Palette,
  QrCode,
  RotateCcw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { PageHero } from "../components/ui/section-heading";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Checkbox, FieldHint, Input, Label, Select } from "../components/ui/input";
import { cn } from "../lib/utils";

const tabs = [
  { id: "design", label: "Design", icon: Palette },
  { id: "logo", label: "Logo", icon: ImagePlus },
  { id: "advanced", label: "Advanced", icon: Settings2 },
];

const colorPresets = [
  { fg: "#0b0b10", bg: "#ffffff", label: "Ink" },
  { fg: "#4c3bcc", bg: "#eef0ff", label: "Iris" },
  { fg: "#0f766e", bg: "#ecfdf5", label: "Mint" },
  { fg: "#9f1239", bg: "#fff1f2", label: "Rose" },
  { fg: "#1e3a8a", bg: "#eff6ff", label: "Ocean" },
  { fg: "#854d0e", bg: "#fffbeb", label: "Honey" },
];

const defaults = {
  url: "",
  size: 256,
  bgColor: "#ffffff",
  fgColor: "#0b0b10",
  level: "H",
  logoSrc: null,
  logoName: "",
  logoWidth: 42,
  logoHeight: 42,
  logoOpacity: 1,
  removeQrCodeBehindLogo: true,
  logoPadding: 6,
  logoPaddingStyle: "circle",
  qrStyle: "squares",
  quietZone: 12,
  enableCORS: false,
};

function QRCodeGenerator() {
  const [url, setUrl] = useState(defaults.url);
  const [size, setSize] = useState(defaults.size);
  const [bgColor, setBgColor] = useState(defaults.bgColor);
  const [fgColor, setFgColor] = useState(defaults.fgColor);
  const [level, setLevel] = useState(defaults.level);
  const [logoSrc, setLogoSrc] = useState(defaults.logoSrc);
  const [logoName, setLogoName] = useState(defaults.logoName);
  const [logoWidth, setLogoWidth] = useState(defaults.logoWidth);
  const [logoHeight, setLogoHeight] = useState(defaults.logoHeight);
  const [logoOpacity, setLogoOpacity] = useState(defaults.logoOpacity);
  const [removeQrCodeBehindLogo, setRemoveQrCodeBehindLogo] = useState(defaults.removeQrCodeBehindLogo);
  const [logoPadding, setLogoPadding] = useState(defaults.logoPadding);
  const [logoPaddingStyle, setLogoPaddingStyle] = useState(defaults.logoPaddingStyle);
  const [qrStyle, setQrStyle] = useState(defaults.qrStyle);
  const [quietZone, setQuietZone] = useState(defaults.quietZone);
  const [enableCORS, setEnableCORS] = useState(defaults.enableCORS);
  const [activeTab, setActiveTab] = useState("design");

  const qrCodeRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoSrc(reader.result);
      setLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoSrc(null);
    setLogoName("");
  };

  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download("png", "sggs-qr.png");
    }
  };

  const reset = () => {
    setUrl(defaults.url);
    setSize(defaults.size);
    setBgColor(defaults.bgColor);
    setFgColor(defaults.fgColor);
    setLevel(defaults.level);
    setLogoSrc(defaults.logoSrc);
    setLogoName(defaults.logoName);
    setLogoWidth(defaults.logoWidth);
    setLogoHeight(defaults.logoHeight);
    setLogoOpacity(defaults.logoOpacity);
    setRemoveQrCodeBehindLogo(defaults.removeQrCodeBehindLogo);
    setLogoPadding(defaults.logoPadding);
    setLogoPaddingStyle(defaults.logoPaddingStyle);
    setQrStyle(defaults.qrStyle);
    setQuietZone(defaults.quietZone);
    setEnableCORS(defaults.enableCORS);
  };

  const hasUrl = Boolean(url.trim());

  return (
    <div className="pb-20">
      <PageHero
        compact
        eyebrow="QR studio"
        title={
          <>
            A QR code that looks{" "}
            <span className="text-gradient">like your brand.</span>
          </>
        }
        description="Choose a colour, add a logo, and download a scan-ready code. Everything happens in your browser."
      />

      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="rounded-[1.75rem] border border-ink/10 bg-white shadow-card">
            <div className="flex items-center justify-between gap-2 border-b border-ink/10 p-4 sm:gap-3 sm:p-5">
              <div className="flex min-w-0 gap-1 rounded-xl bg-ink/[0.04] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] font-semibold transition sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[12px]",
                      activeTab === tab.id
                        ? "bg-white text-ink shadow-sm"
                        : "text-ink/45 hover:text-ink"
                    )}
                  >
                    <tab.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> {tab.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-ink/40 transition hover:bg-ink/[0.04] hover:text-ink sm:px-2.5 sm:py-2"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {activeTab === "design" && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="qr-url" required>
                      Destination URL or text
                    </Label>
                    <div className="relative">
                      <QrCode className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
                      <Input
                        id="qr-url"
                        type="text"
                        className="pl-10"
                        placeholder="https://your-link.com or a short message"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                      />
                    </div>
                    <FieldHint>The preview updates as you type. No account data is stored.</FieldHint>
                  </div>

                  <div>
                    <Label>Colour direction</Label>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {colorPresets.map((preset) => {
                        const selected = fgColor === preset.fg && bgColor === preset.bg;
                        return (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => {
                              setFgColor(preset.fg);
                              setBgColor(preset.bg);
                            }}
                            className={cn(
                              "group rounded-xl border p-2 transition",
                              selected
                                ? "border-brand-400 bg-brand-50/50 ring-2 ring-brand-500/10"
                                : "border-ink/10 hover:border-ink/25"
                            )}
                            aria-pressed={selected}
                          >
                            <span
                              className="flex h-8 w-full items-center justify-center rounded-lg border border-ink/10"
                              style={{ backgroundColor: preset.bg, color: preset.fg }}
                            >
                              <QrCode className="h-4 w-4" />
                            </span>
                            <span className="mt-1.5 block text-[9px] font-medium text-ink/45">{preset.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="qr-fg">Foreground</Label>
                      <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-2 py-1.5">
                        <input
                          id="qr-fg"
                          type="color"
                          value={fgColor}
                          onChange={(event) => setFgColor(event.target.value)}
                          className="h-9 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                        />
                        <span className="font-mono text-[11px] uppercase text-ink/45">{fgColor}</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="qr-bg">Background</Label>
                      <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-2 py-1.5">
                        <input
                          id="qr-bg"
                          type="color"
                          value={bgColor}
                          onChange={(event) => setBgColor(event.target.value)}
                          className="h-9 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                        />
                        <span className="font-mono text-[11px] uppercase text-ink/45">{bgColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="qr-style">Pattern</Label>
                      <Select id="qr-style" value={qrStyle} onChange={(event) => setQrStyle(event.target.value)}>
                        <option value="squares">Squares</option>
                        <option value="dots">Dots</option>
                        <option value="fluid">Fluid</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="qr-level">Error correction</Label>
                      <Select id="qr-level" value={level} onChange={(event) => setLevel(event.target.value)}>
                        <option value="L">L — Low</option>
                        <option value="M">M — Medium</option>
                        <option value="Q">Q — Quartile</option>
                        <option value="H">H — High</option>
                      </Select>
                      <FieldHint>High is best when using a logo.</FieldHint>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="qr-size" className="mb-0">Size</Label>
                      <span className="rounded-full bg-ink/[0.04] px-2.5 py-1 font-mono text-[10px] text-ink/50">{size}px</span>
                    </div>
                    <input
                      id="qr-size"
                      type="range"
                      min="128"
                      max="420"
                      step="4"
                      value={size}
                      onChange={(event) => setSize(Number(event.target.value))}
                      className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-brand-600"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-ink/30">
                      <span>Small</span><span>Large</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "logo" && (
                <div className="space-y-6">
                  <div>
                    <Label>Logo image</Label>
                    {logoSrc ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-canvas p-3">
                        <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-ink/10 bg-white">
                          <img src={logoSrc} alt="Uploaded logo preview" className="max-h-10 max-w-10 object-contain" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] font-semibold text-ink">{logoName || "Your logo"}</p>
                          <p className="mt-0.5 text-[10px] text-muted">Centered in the QR code</p>
                        </div>
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/35 transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove logo"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-ink/20 bg-canvas px-5 py-8 text-center transition hover:border-brand-300 hover:bg-brand-50/30">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm">
                          <Upload className="h-4 w-4" />
                        </span>
                        <span className="mt-3 text-[12px] font-semibold text-ink">Upload a logo</span>
                        <span className="mt-1 text-[10px] text-muted">PNG, JPG or SVG · stays in your browser</span>
                        <input type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                      </label>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="logo-width">Logo width</Label>
                      <Input id="logo-width" type="number" min="12" max="120" value={logoWidth} onChange={(event) => {
                        setLogoWidth(Number(event.target.value));
                        setLogoHeight(Number(event.target.value));
                      }} />
                    </div>
                    <div>
                      <Label htmlFor="logo-padding">Logo padding</Label>
                      <Input id="logo-padding" type="number" min="0" max="40" value={logoPadding} onChange={(event) => setLogoPadding(Number(event.target.value))} />
                    </div>
                    <div>
                      <Label htmlFor="logo-opacity">Opacity</Label>
                      <Input id="logo-opacity" type="number" min="0.1" max="1" step="0.05" value={logoOpacity} onChange={(event) => setLogoOpacity(Number(event.target.value))} />
                    </div>
                    <div>
                      <Label htmlFor="logo-padding-style">Padding shape</Label>
                      <Select id="logo-padding-style" value={logoPaddingStyle} onChange={(event) => setLogoPaddingStyle(event.target.value)}>
                        <option value="square">Square</option>
                        <option value="circle">Circle</option>
                      </Select>
                    </div>
                  </div>

                  <Checkbox
                    checked={removeQrCodeBehindLogo}
                    onChange={(event) => setRemoveQrCodeBehindLogo(event.target.checked)}
                    label="Clear the pattern behind the logo so it stays readable"
                  />
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-ink/10 bg-canvas p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-ink">Generated locally</p>
                        <p className="mt-1 text-[11px] leading-5 text-muted">
                          Your URL, colours, and logo never leave this browser tab. Download when you are happy with it.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="qr-quiet" className="mb-0">Quiet zone</Label>
                      <span className="rounded-full bg-ink/[0.04] px-2.5 py-1 font-mono text-[10px] text-ink/50">{quietZone}px</span>
                    </div>
                    <input
                      id="qr-quiet"
                      type="range"
                      min="0"
                      max="40"
                      value={quietZone}
                      onChange={(event) => setQuietZone(Number(event.target.value))}
                      className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-brand-600"
                    />
                    <FieldHint>The blank border around the code. 8–16px usually scans comfortably.</FieldHint>
                  </div>

                  <Checkbox
                    checked={enableCORS}
                    onChange={(event) => setEnableCORS(event.target.checked)}
                    label="Enable CORS for a logo loaded from an external URL"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#111118] shadow-float">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                    <QrCode className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold text-white">Live preview</p>
                    <p className="text-[10px] text-white/35">Scan with any camera</p>
                  </div>
                </div>
                <Badge variant={hasUrl ? "success" : "dark-outline"} className="text-[9px]">
                  {hasUrl ? <><Check className="h-3 w-3" /> Ready</> : "Waiting for a link"}
                </Badge>
              </div>

              <div className="relative flex min-h-[350px] flex-col items-center justify-center p-6 sm:p-8">
                <div aria-hidden="true" className="absolute inset-0 bg-grid-dark-fade opacity-50" />
                {hasUrl ? (
                  <div className="relative rounded-2xl border border-white/10 bg-white p-3 shadow-2xl">
                    <QRCode
                      ref={qrCodeRef}
                      value={url}
                      ecLevel={level}
                      size={size}
                      quietZone={quietZone}
                      bgColor={bgColor}
                      fgColor={fgColor}
                      logoImage={logoSrc}
                      logoWidth={logoWidth}
                      logoHeight={logoHeight}
                      logoOpacity={logoOpacity}
                      removeQrCodeBehindLogo={removeQrCodeBehindLogo}
                      logoPadding={logoPadding}
                      logoPaddingStyle={logoPaddingStyle}
                      qrStyle={qrStyle}
                      enableCORS={enableCORS}
                      id="sggs-qr-studio"
                      style={{ width: "100%", height: "auto", maxWidth: `${size}px` }}
                      onContextMenu={(event) => event.preventDefault()}
                    />
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center text-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04]">
                      <QrCode className="h-14 w-14 text-white/15" strokeWidth={1.2} />
                    </div>
                    <p className="mt-5 text-[12px] font-semibold text-white/70">Your code will appear here</p>
                    <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-white/35">
                      Add a destination URL in the design tab to bring it to life.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 p-4 sm:p-5">
                <Button
                  type="button"
                  variant="white"
                  size="lg"
                  onClick={downloadQRCode}
                  disabled={!hasUrl}
                  className="w-full"
                >
                  <ArrowDownToLine className="h-4 w-4" /> Download PNG
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-white/30">
                  <Sparkles className="h-3 w-3" /> High-resolution, ready for print
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "No uploads", value: "100% local" },
                { label: "Format", value: "PNG" },
                { label: "Level", value: level },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-center">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-ink/30">{item.label}</p>
                  <p className="mt-1 text-[11px] font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeGenerator;
