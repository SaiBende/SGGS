import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  ImageUp,
  Link2,
  Loader2,
  Plus,
  QrCode,
  Save,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { apiFetch } from "../utils/auth";
import { cn } from "../lib/utils";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { Badge } from "../components/ui/badge";
import { Button, buttonVariants } from "../components/ui/button";
import { FieldHint, Input, Label, Textarea } from "../components/ui/input";
import { SocialIcon, platformLabel } from "../components/ui/social-icon";
import { BackgroundBeams } from "../components/ui/background-beams";

const platformSuggestions = [
  "Instagram",
  "YouTube",
  "TikTok",
  "X",
  "GitHub",
  "LinkedIn",
  "Facebook",
  "Website",
  "Portfolio",
  "Newsletter",
];

function LinkTree() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [description, setDescription] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newLink, setNewLink] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [authorized, setAuthorized] = useState(true);
  const [profilephoto, setProfilephoto] = useState(null);
  const [profilephotoUrl, setProfilephotoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [savingDescription, setSavingDescription] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [deletingPlatform, setDeletingPlatform] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (profileUsername) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/u/${profileUsername}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSocialMediaLinks(data.socialMediaLinks || {});
        setDescription(data.description || "");
      }
    } catch (profileError) {
      console.error("Error fetching user profile:", profileError);
      setError("Unable to load your public profile.");
    }
  };

  const loadUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFetch("/user/dashboard", { method: "POST" });

      if (response.status === 401) {
        setAuthorized(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        setUser(result.user);
        setUsername(result.user.username);
        setProfilephotoUrl(result.user.profilephoto);
        await fetchUserProfile(result.user.username);
        setAuthorized(true);
      } else {
        setError(result.error || "Error fetching user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setProfilephoto(file);
    setError(null);
  };

  const uploadProfilePhoto = async () => {
    if (!profilephoto) {
      setError("Choose a photo before uploading.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("profilephoto", profilephoto);

    try {
      const response = await apiFetch(`/u/${username}/updateprofilephoto`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 401) {
        setAuthorized(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        const nextPhoto = result.profilePhotoUrl || result.user?.profilephoto;
        setSuccessMessage("Profile photo updated.");
        toast.success("Profile photo updated");
        setUser((previous) => ({ ...previous, profilephoto: nextPhoto }));
        setProfilephotoUrl(nextPhoto);
        setProfilephoto(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setError(result.error || "Failed to upload profile photo.");
      }
    } catch (uploadError) {
      console.error("Error uploading profile photo:", uploadError);
      setError(uploadError.message || "Failed to upload profile photo.");
    } finally {
      setUploading(false);
    }
  };

  const addSocialMediaLink = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage("");
    setAddingLink(true);

    try {
      const response = await apiFetch(`/u/${username}/social-media/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: newPlatform.trim(),
          link: newLink.trim(),
        }),
      });

      if (response.status === 401) {
        setAuthorized(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        setSocialMediaLinks(result.socialMediaLinks || {});
        setNewPlatform("");
        setNewLink("");
        setSuccessMessage(`${platformLabel(newPlatform)} link added.`);
        toast.success("Social link added");
      } else {
        setError(result.error || "Failed to add social media link.");
      }
    } catch (addError) {
      console.error("Error adding social media link:", addError);
      setError(addError.message || "Failed to add social media link.");
    } finally {
      setAddingLink(false);
    }
  };

  const deleteSocialMediaLink = async (platform) => {
    setError(null);
    setSuccessMessage("");
    setDeletingPlatform(platform);

    try {
      const response = await apiFetch(`/u/${username}/social-media/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform }),
      });

      if (response.status === 401) {
        setAuthorized(false);
        return;
      }

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to delete social media link.");
      }

      setSocialMediaLinks(result.socialMediaLinks || {});
      setSuccessMessage(`${platformLabel(platform)} link removed.`);
      toast.success("Link removed");
    } catch (deleteError) {
      console.error("Error deleting social media link:", deleteError);
      setError(deleteError.message || "Failed to delete social media link.");
    } finally {
      setDeletingPlatform(null);
    }
  };

  const updateDescription = async () => {
    setError(null);
    setSuccessMessage("");
    setSavingDescription(true);

    try {
      const response = await apiFetch(`/u/${username}/description`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (response.status === 401) {
        setAuthorized(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        setSuccessMessage("Description updated.");
        toast.success("Description updated");
      } else {
        setError(result.error || "Failed to update description.");
      }
    } catch (saveError) {
      console.error("Error updating description:", saveError);
      setError(saveError.message || "Failed to update description.");
    } finally {
      setSavingDescription(false);
    }
  };

  const profileUrl = username ? `${import.meta.env.VITE_FRONTEND_URL}/u/${username}` : "";

  const copyProfileUrl = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success("Profile URL copied");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy the profile URL.");
    }
  };

  if (loading) {
    return (
      <section className="container-page py-20">
        <Loading message="Loading your page..." className="min-h-[60vh]" />
      </section>
    );
  }

  if (!authorized) {
    return (
      <section className="container-page py-20">
        <ErrorState
          title="Your page is waiting"
          message="Sign in to edit your link-in-bio page."
          className="min-h-[50vh]"
        >
          <Button onClick={() => navigate("/login")} variant="primary" size="md">
            Sign in
          </Button>
        </ErrorState>
      </section>
    );
  }

  if (error && !user) {
    return (
      <section className="container-page py-20">
        <ErrorState title="Couldn't load your page" message={error} onRetry={loadUser} className="min-h-[50vh]" />
      </section>
    );
  }

  const links = Object.entries(socialMediaLinks || {}).filter(([, link]) => link);

  return (
    <div className="pb-20">
      <div className="container-page pt-10 sm:pt-14">
        <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="brand" className="mb-4 gap-1.5">
              <UserRound className="h-3 w-3" /> Link in bio
            </Badge>
            <h1 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-ink sm:text-4xl lg:text-5xl">
              Your corner of the internet.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              Add your photo, a short bio, and the links that matter. Your public
              page updates as you type.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="md" onClick={copyProfileUrl}>
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy page URL"}
            </Button>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              View live <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {(error || successMessage) && (
          <div className="mt-5 space-y-2">
            {error && (
              <div className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] leading-5 text-red-700" role="alert">
                <span>{error}</span>
                <button type="button" onClick={() => setError(null)} aria-label="Dismiss error">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {successMessage && (
              <div className="flex items-start justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[12px] leading-5 text-emerald-700" role="status">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> {successMessage}</span>
                <button type="button" onClick={() => setSuccessMessage("")} aria-label="Dismiss message">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
          <div className="space-y-4">
            <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">Profile</h2>
                  <p className="mt-1 text-[11px] text-muted">The first thing people see.</p>
                </div>
                <Badge variant="outline" className="max-w-[45%] shrink-0" title={`@${username}`}>
                  <span className="truncate">@{username}</span>
                </Badge>
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-sky-400 text-xl font-bold text-white shadow-card">
                  {profilephotoUrl && (
                    <img
                      src={profilephotoUrl}
                      alt="Your profile"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {!profilephotoUrl && String(username || "S").slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <label
                      htmlFor="profile-photo"
                      className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "cursor-pointer")}
                    >
                      <ImageUp className="h-3.5 w-3.5" /> Choose photo
                    </label>
                    {profilephoto && (
                      <Button size="sm" variant="primary" onClick={uploadProfilePhoto} disabled={uploading}>
                        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                        {uploading ? "Uploading..." : "Save photo"}
                      </Button>
                    )}
                    <input
                      ref={fileInputRef}
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleProfilePhotoChange}
                    />
                  </div>
                  <p className="mt-2 truncate text-[10px] text-muted">
                    {profilephoto ? profilephoto.name : "PNG or JPG, up to a few MB."}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea
                  id="bio"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="A sentence about you, your work, or what you are building."
                  className="min-h-[96px]"
                  maxLength={240}
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <FieldHint>{description.length}/240 characters</FieldHint>
                  <Button size="sm" variant="primary" onClick={updateDescription} disabled={savingDescription}>
                    {savingDescription ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                    {savingDescription ? "Saving..." : "Save bio"}
                  </Button>
                </div>
              </div>
            </section>

            <section className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-card sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-ink">Links</h2>
                  <p className="mt-1 text-[11px] text-muted">The places you want people to go.</p>
                </div>
                <Badge variant="outline">{links.length}</Badge>
              </div>

              {links.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-ink/15 bg-canvas px-5 py-8 text-center">
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-500 shadow-sm">
                    <Link2 className="h-4 w-4" />
                  </span>
                  <p className="mt-3 text-[12px] font-semibold text-ink">No links yet</p>
                  <p className="mt-1 text-[11px] text-muted">Add your first one below.</p>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-ink/[0.07]">
                  {links.map(([platform, link]) => (
                    <div key={platform} className="flex items-center gap-3 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/[0.04] text-ink/55">
                        <SocialIcon platform={platform} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold text-ink">{platformLabel(platform)}</p>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block truncate text-[10px] text-muted transition hover:text-brand-600"
                        >
                          {link}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteSocialMediaLink(platform)}
                        disabled={deletingPlatform === platform}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/30 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        aria-label={`Remove ${platformLabel(platform)} link`}
                      >
                        {deletingPlatform === platform ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={addSocialMediaLink} className="mt-5 rounded-2xl border border-ink/10 bg-canvas p-4">
                <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <Label htmlFor="new-platform" className="text-[11px]">Platform</Label>
                    <Input
                      id="new-platform"
                      list="platform-suggestions"
                      value={newPlatform}
                      onChange={(event) => setNewPlatform(event.target.value)}
                      placeholder="Instagram"
                      className="h-10 bg-white text-[12px]"
                      required
                    />
                    <datalist id="platform-suggestions">
                      {platformSuggestions.map((platform) => (
                        <option key={platform} value={platform} />
                      ))}
                    </datalist>
                  </div>
                  <div>
                    <Label htmlFor="new-link" className="text-[11px]">URL</Label>
                    <Input
                      id="new-link"
                      type="url"
                      value={newLink}
                      onChange={(event) => setNewLink(event.target.value)}
                      placeholder="https://..."
                      className="h-10 bg-white text-[12px]"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-muted">Use the full URL, including https://</p>
                  <Button type="submit" size="sm" variant="primary" disabled={addingLink}>
                    {addingLink ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                    {addingLink ? "Adding..." : "Add link"}
                  </Button>
                </div>
              </form>
            </section>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-[#111118] p-5 shadow-float sm:p-7">
              <BackgroundBeams className="opacity-25" />
              <div className="relative z-10 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">Live preview</span>
                </div>
                <Badge variant="dark-outline" className="text-[9px]">Updates as you type</Badge>
              </div>

              <div className="relative z-10 mx-auto max-w-[330px] rounded-[2.2rem] border border-white/10 bg-[#0b0b10] p-2.5 shadow-2xl">
                <div className="rounded-[1.75rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,#26263a_0%,#121218_60%)] px-5 pb-6 pt-5">
                  <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-white/10" />
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-br from-brand-500 to-sky-400 text-xl font-bold text-white">
                      {profilephotoUrl && (
                        <img
                          src={profilephotoUrl}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      {!profilephotoUrl && String(username || "S").slice(0, 1).toUpperCase()}
                    </div>
                    <h2 className="mt-3 font-display text-xl font-semibold tracking-[-0.04em] text-white">
                      @{username || "yourname"}
                    </h2>
                    <p className="mt-1.5 max-w-[230px] text-[11px] leading-5 text-white/45">
                      {description || "Your short bio will appear here."}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2">
                    {links.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-white/15 px-4 py-4 text-center text-[10px] text-white/30">
                        Your links will appear here
                      </div>
                    ) : (
                      links.map(([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09]"
                        >
                          <SocialIcon platform={platform} className="h-3.5 w-3.5 text-white/45 transition group-hover:text-white" />
                          <span className="flex-1 text-left text-[11px] font-medium text-white/75">{platformLabel(platform)}</span>
                          <ExternalLink className="h-3 w-3 text-white/25 transition group-hover:text-white/60" />
                        </a>
                      ))
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-1.5 text-[9px] text-white/20">
                    <Sparkles className="h-3 w-3" /> Made with SGGS
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                {profileUrl && (
                  <div className="rounded-lg bg-white p-1.5">
                    <QRCodeCanvas
                      value={profileUrl}
                      size={54}
                      bgColor="#ffffff"
                      fgColor="#0b0b10"
                      level="M"
                      includeMargin={false}
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-white/65">
                    <QrCode className="h-3 w-3" /> Scan to open
                  </p>
                  <p className="mt-1 truncate text-[9px] text-white/30">{profileUrl.replace(/^https?:\/\//, "")}</p>
                </div>
                <button
                  type="button"
                  onClick={copyProfileUrl}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/55 transition hover:bg-white/15 hover:text-white"
                  aria-label="Copy profile URL"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Link2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-ink">One URL for everywhere</p>
                  <p className="mt-1 text-[10px] leading-5 text-muted">
                    Add this link to your social profiles. Update the page later
                    and the URL stays the same.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkTree;
