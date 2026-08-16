import type { ComponentType } from "react";
import {
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiReactquery,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiSequelize,
  SiFirebase,
  SiRazorpay,
  SiStripe,
  SiPaypal,
  SiSocketdotio,
  SiSwagger,
  SiPostman,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiNginx,
  SiPm2,
  SiLinux,
  SiUbuntu,
  SiWhatsapp,
} from "react-icons/si";
import {
  Shield,
  Lock,
  KeyRound,
  Network,
  Layers,
  Building2,
  Store,
  Webhook,
  Cloud,
} from "lucide-react";

type IconType = ComponentType<{ size?: number; className?: string }>;

/**
 * Canonical tech-name -> icon map.
 *
 * Keys are normalized (lowercased, punctuation stripped) so that variants like
 * "Node.js", "NodeJS" and "node js" all resolve to the same entry. Abstract
 * concepts without a real brand mark fall back to a generic lucide glyph, and
 * anything genuinely unmapped renders with no icon at all — we never force a
 * misleading brand logo onto a non-brand term.
 */
const ICON_MAP: Record<string, IconType> = {
  // --- Backend / runtime ---
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  expressjs: SiExpress,
  express: SiExpress,

  // --- Frontend ---
  reactjs: SiReact,
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  javascriptes2022: SiJavascript,
  reduxtoolkit: SiRedux,
  redux: SiRedux,
  reactquery: SiReactquery,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,

  // --- Data ---
  mysql: SiMysql,
  mongodb: SiMongodb,
  redis: SiRedis,
  sequelize: SiSequelize,
  sequelizeorm: SiSequelize,
  firebase: SiFirebase,

  // --- Payments ---
  razorpay: SiRazorpay,
  razorpayintegration: SiRazorpay,
  stripe: SiStripe,
  stripeintegration: SiStripe,
  paypal: SiPaypal,
  paypalintegration: SiPaypal,

  // --- Realtime / API ---
  socketio: SiSocketdotio,
  swagger: SiSwagger,
  swaggeropenapi: SiSwagger,
  postman: SiPostman,
  restapis: Network,
  restapi: Network,
  webhooks: Webhook,
  webhookhandling: Webhook,
  whatsappbusinessapi: SiWhatsapp,
  whatsapp: SiWhatsapp,

  // --- Auth / security (no brand marks — generic glyphs) ---
  jwt: KeyRound,
  jwtauthentication: KeyRound,
  oauth: Lock,
  oauth20: Lock,
  rbac: Shield,
  rbacsystems: Shield,
  apisecurity: Shield,

  // --- DevOps ---
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  nginx: SiNginx,
  pm2: SiPm2,
  linux: SiLinux,
  ubuntu: SiUbuntu,
  linuxubuntu: SiLinux,
  vpshosting: Cloud,

  // --- Architecture / domain (no brand marks — generic glyphs) ---
  multitenant: Building2,
  multitenantsystems: Building2,
  multitenantdatabases: Building2,
  saas: Layers,
  saasarchitecture: Layers,
  erp: Layers,
  pos: Store,
  possystems: Store,
};

/** Normalize a display name into a map key. */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // drop parenthetical qualifiers
    .replace(/[^a-z0-9]/g, "");
}

/** Look up the icon component for a tech name, or null when unmapped. */
export function getTechIcon(name: string): IconType | null {
  return ICON_MAP[normalize(name)] ?? null;
}

export function hasTechIcon(name: string): boolean {
  return getTechIcon(name) !== null;
}

/**
 * Renders the brand/concept icon for a tech name. Renders nothing when the
 * name has no sensible icon, so callers can drop it inline unconditionally.
 */
export function TechIcon({
  name,
  size = 12,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = getTechIcon(name);
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      className={`shrink-0 opacity-90 ${className}`}
      aria-hidden="true"
    />
  );
}

export default TechIcon;
