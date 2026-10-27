/* eslint-disable react-refresh/only-export-components -- platform metadata and the icon renderer share one lookup table. */
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchatGhost,
  FaTiktok,
  FaTwitch,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Globe2, Mail, MessageCircle } from "lucide-react";

const iconMap = {
  facebook: FaFacebookF,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  mail: Mail,
  email: Mail,
  pinterest: FaPinterestP,
  snapchat: FaSnapchatGhost,
  threads: MessageCircle,
  tiktok: FaTiktok,
  twitch: FaTwitch,
  twitter: FaTwitter,
  x: FaTwitter,
  website: Globe2,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  portfolio: Globe2,
  blog: Globe2,
};

export function SocialIcon({ platform, className }) {
  const Icon = iconMap[String(platform || "").toLowerCase()] || Globe2;
  return <Icon className={className} strokeWidth={1.8} aria-hidden="true" />;
}

export function platformLabel(platform) {
  const value = String(platform || "").trim();
  if (!value) return "Link";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export { iconMap };
