import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Menu,
  Search,
  Coins,
  Plus,
  ArrowLeft,
  Share2,
  MoreVertical,
  LayoutGrid,
  List,
  Send,
  Paperclip,
  Globe,
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  ClipboardPaste,
  Cloud,
  FileText,
  Sparkles,
  Brain,
  Mic,
  Video,
  Layers,
  BookOpen,
  MessageSquare,
  Users,
  Trophy,
  Flame,
  Award,
  Lock,
  Gift,
  Clock,
  CheckCircle2,
  Edit3,
  Trash2,
  Download,
  Folder,
  FolderOpen,
  Pencil,
  Palette,
  PlayCircle,
  HelpCircle,
  Presentation,
  Network,
  StickyNote,
  GraduationCap,
  UserCircle2,
  Star,
  Settings2,
  Timer,
  ThumbsUp,
  ThumbsDown,
  Rocket,
  Files,
  Eraser,
  Pause,
  PenSquare,
  MapPin,
  MessageCircle,
  Calendar,
  ChevronUp,
  Loader2,
  BadgeCheck,
  Calculator,
  ScanLine,
} from "lucide-react";
import bg from "./backg.jpg";
import adb from "./adobe_appicon.svg";

/* ============================================================================
   MOCK DATA
============================================================================ */

let uid = 1000;
const genId = (p = "id") => `${p}-${uid++}`;

const TOOL_TYPES = [
  { key: "flashcards", label: "Flashcards", icon: Layers, color: "#FA0F00" },
  { key: "quiz", label: "Quiz", icon: HelpCircle, color: "#E0552B" },
  { key: "studyguide", label: "Study guide", icon: BookOpen, color: "#16A34A" },
  { key: "studypacket", label: "Study packet", icon: Files, color: "#7C3AED" },
  {
    key: "mathbundle",
    label: "Math Bundle",
    icon: Calculator,
    color: "#B3131B",
  },
  { key: "podcast", label: "Podcast", icon: Mic, color: "#F5A623" },
  {
    key: "videosummary",
    label: "Video summary",
    icon: Video,
    color: "#0EA5E9",
  },
  {
    key: "presentation",
    label: "Presentation",
    icon: Presentation,
    color: "#DB2777",
  },
  { key: "mindmap", label: "Mind Map", icon: Network, color: "#FA0F00" },
  { key: "notes", label: "Notes", icon: StickyNote, color: "#F5A623" },
];
const toolInfo = (key) =>
  TOOL_TYPES.find((t) => t.key === key) || TOOL_TYPES[0];

const QUICK_ACTIONS = [
  { key: "mindmap", label: "Mind Map", icon: Network },
  { key: "podcast", label: "Podcast", icon: Mic, big: true },
  { key: "videosummary", label: "Video Summary", icon: Video },
  { key: "flashcards", label: "Flashcards", icon: Layers },
  { key: "mathbundle", label: "Math Bundle", icon: Calculator },
];

const LANGUAGES = [
  { code: "en", label: "English", sample: "Sure, let's dive in." },

  { code: "hi", label: "हिन्दी", sample: "ज़रूर, चलिए शुरू करते हैं।" },

  { code: "bn", label: "বাংলা", sample: "ঠিক আছে, শুরু করা যাক।" },

  { code: "ta", label: "தமிழ்", sample: "சரி, தொடங்கலாம்." },

  { code: "te", label: "తెలుగు", sample: "సరే, ప్రారంభిద్దాం." },

  { code: "mr", label: "मराठी", sample: "नक्की, चला सुरुवात करूया." },

  { code: "gu", label: "ગુજરાતી", sample: "બરાબર, ચાલો શરૂઆત કરીએ." },

  { code: "kn", label: "ಕನ್ನಡ", sample: "ಸರಿ, ಆರಂಭಿಸೋಣ." },

  { code: "ml", label: "മലയാളം", sample: "ശരി, നമുക്ക് തുടങ്ങാം." },

  { code: "pa", label: "ਪੰਜਾਬੀ", sample: "ਠੀਕ ਹੈ, ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ।" },
];

const PERSONAS = [
  { key: "student", label: "Student", blurb: "casual, quick, to the point" },
  {
    key: "educator",
    label: "Educator",
    blurb: "structured, with clear headers",
  },
  { key: "researcher", label: "Researcher", blurb: "formal, evidence-minded" },
];

function mkSource(name, module, type, pages, addedDate) {
  return {
    id: genId("src"),
    name,
    module,
    type,
    pages,
    addedDate,
    addedBy: "You",
    included: true,
  };
}
function mkAid(type, title, meta, date, completed = false) {
  return { id: genId("aid"), type, title, meta, date, completed };
}
function mkNote(title, preview, editedDate, kind = "note", folder = "General") {
  return {
    id: genId("note"),
    title,
    preview,
    editedDate,
    editedBy: "You",
    kind,
    folder,
    thumb: null,
  };
}

function seedSpace(name, updatedAt, seedIdx) {
  const sourcesSets = [
    [
      mkSource(
        "Segmentation Strategy Deck.pptx",
        "Module 1 · Foundations",
        "pptx",
        24,
        "Jul 14",
      ),
      mkSource(
        "Consumer Behaviour Notes.docx",
        "Module 1 · Foundations",
        "docx",
        9,
        "Jul 14",
      ),
      mkSource(
        "Case Study - Nova Retail.pdf",
        "Module 2 · Case Studies",
        "pdf",
        18,
        "Jul 16",
      ),
      mkSource(
        "Lecture 04 Transcript.vtt",
        "Module 2 · Case Studies",
        "vtt",
        1,
        "Jul 17",
      ),
      mkSource(
        "Positioning Frameworks.pdf",
        "Module 3 · Frameworks",
        "pdf",
        12,
        "Jul 18",
      ),
    ],
    [
      mkSource(
        "Plate Tectonics Overview.pdf",
        "Unit 1 · Structure",
        "pdf",
        15,
        "Jul 10",
      ),
      mkSource(
        "Rock Cycle Diagram Set.pptx",
        "Unit 1 · Structure",
        "pptx",
        8,
        "Jul 11",
      ),
      mkSource(
        "Field Trip Notes.txt",
        "Unit 2 · Fieldwork",
        "txt",
        3,
        "Jul 13",
      ),
      mkSource(
        "Seismic Activity Report.pdf",
        "Unit 3 · Hazards",
        "pdf",
        22,
        "Jul 15",
      ),
    ],
    [
      mkSource("Limits and Continuity.pdf", "Chapter 1", "pdf", 11, "Jul 12"),
      mkSource(
        "Derivatives Practice Set.docx",
        "Chapter 2",
        "docx",
        7,
        "Jul 13",
      ),
      mkSource("Integrals Cheat Sheet.pdf", "Chapter 3", "pdf", 5, "Jul 15"),
      mkSource("Past Paper 2024.pdf", "Revision", "pdf", 14, "Jul 19"),
    ],
  ][seedIdx];

  const aidSets = [
    [
      mkAid(
        "quiz",
        "Marketing Segmentation Quiz",
        "21 Questions",
        "Jul 18",
        true,
      ),
      mkAid("flashcards", "Positioning Terms", "32 Cards", "Jul 17", false),
      mkAid(
        "studyguide",
        "Foundations Study Guide",
        "6 sections",
        "Jul 15",
        false,
      ),
      mkAid("mindmap", "STP Framework Mind Map", "14 nodes", "Jul 14", false),
    ],
    [
      mkAid("quiz", "Plate Tectonics Quiz", "15 Questions", "Jul 13", false),
      mkAid(
        "studyguide",
        "Rock Cycle Study Guide",
        "4 sections",
        "Jul 12",
        true,
      ),
    ],
    [
      mkAid("flashcards", "Derivative Rules", "26 Cards", "Jul 16", true),
      mkAid(
        "quiz",
        "Limits & Continuity Quiz",
        "12 Questions",
        "Jul 19",
        false,
      ),
      mkAid("podcast", "Calc Concepts Recap", "9 min", "Jul 14", false),
    ],
  ][seedIdx];

  const noteSets = [
    [
      mkNote(
        "STP Framework Recap",
        "Segmentation → Targeting → Positioning. Key idea: match value prop to segment needs...",
        "Jul 17",
      ),
      mkNote(
        "Whiteboard: Funnel Sketch",
        "Freehand sketch of the marketing funnel",
        "Jul 16",
        "whiteboard",
      ),
    ],
    [
      mkNote(
        "Rock Types Summary",
        "Igneous, sedimentary, metamorphic — formation conditions and identifying features...",
        "Jul 12",
      ),
    ],
    [
      mkNote(
        "Chain Rule Examples",
        "d/dx[f(g(x))] = f'(g(x))·g'(x). Worked through 5 examples in class...",
        "Jul 15",
      ),
    ],
  ][seedIdx];

  const chat = [
    {
      id: genId("msg"),
      role: "ai",
      text: `Welcome back to ${name}! What would you like to study today?`,
      date: "Jul 18, 2026",
    },
  ];

  return {
    id: genId("space"),
    name,
    updatedAt,
    sources: sourcesSets,
    studyAids: aidSets,
    notes: noteSets,
    chat,
  };
}

const INITIAL_SPACES = [
  seedSpace("Marketing Strategy Fundamentals", "Updated 2h ago", 0),
  seedSpace("Geological Formations", "Updated yesterday", 1),
  seedSpace("Advanced Calculus Revision", "Updated 3 days ago", 2),
];

const PEERS = [
  { id: "p1", name: "Aanya Sharma", color: "#FA0F00" },
  { id: "p2", name: "Devon Clarke", color: "#E0552B" },
  { id: "p3", name: "Priya Nair", color: "#16A34A" },
  { id: "p4", name: "Liam O'Brien", color: "#7C3AED" },
  { id: "p5", name: "Mei Zhang", color: "#0EA5E9" },
];

const INITIAL_SPACECHAT = [
  {
    id: genId("sc"),
    peer: PEERS[0],
    text: "Does anyone have clean notes on the STP framework? Struggling with the positioning part.",
    time: "9:12 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[1],
    text: "Yeah, I shared a one-pager below — check the resources panel!",
    time: "9:14 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[2],
    text: "The mind map in my space really helped this click for me. Happy to share too.",
    time: "9:20 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[3],
    text: "Quick question — is segmentation the same as targeting? I keep mixing them up.",
    time: "9:31 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[1],
    text: "Not quite! Segmentation is dividing the market into groups. Targeting is choosing which groups to actually go after.",
    time: "9:33 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[4],
    text: "Exactly. And positioning is how you want your brand to be perceived within that target group.",
    time: "9:35 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[3],
    text: "Oh that makes it so much clearer, thank you both!",
    time: "9:36 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[0],
    text: "Has anyone done the practice case study from last week? It's up on the shared drive.",
    time: "9:45 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[2],
    text: "Yes! Finished it yesterday. The Dove example was a great one for emotional positioning.",
    time: "9:47 AM",
  },
  {
    id: genId("sc"),
    peer: PEERS[4],
    text: "I'll upload my case notes shortly — should help with revision.",
    time: "9:51 AM",
  },
];

const SHARED_RESOURCES = [
  {
    id: genId("res"),
    peer: PEERS[1],
    title: "STP Framework — One Pager.pdf",
    kind: "pdf",
  },
  {
    id: genId("res"),
    peer: PEERS[2],
    title: "Positioning Mind Map",
    kind: "mindmap",
  },
  {
    id: genId("res"),
    peer: PEERS[0],
    title: "useful video: Segmentation basics",
    kind: "link",
  },
];

const TUTORS = [
  {
    id: "t1",
    name: "Rhea Kapoor",
    subject: "Marketing & Strategy",
    notes: 12,
    color: "#FA0F00",
  },
  {
    id: "t2",
    name: "Marcus Lee",
    subject: "Earth Sciences",
    notes: 8,
    color: "#16A34A",
  },
  {
    id: "t3",
    name: "Sofia Fernandes",
    subject: "Mathematics",
    notes: 19,
    color: "#E0552B",
  },
];

const BADGES = [
  {
    key: "first_quiz",
    label: "Quiz Whiz",
    desc: "Complete your first quiz",
    icon: Trophy,
    threshold: "quiz1",
  },
  {
    key: "streak3",
    label: "On a Roll",
    desc: "3-day study streak",
    icon: Flame,
    threshold: "streak3",
  },
  {
    key: "creator",
    label: "Study Creator",
    desc: "Generate 3 study tools",
    icon: Sparkles,
    threshold: "gen3",
  },
  {
    key: "social",
    label: "Study Buddy",
    desc: "Share a resource in SpaceChat",
    icon: Users,
    threshold: "social1",
  },
  {
    key: "interview",
    label: "Interview Ready",
    desc: "Complete a mock interview",
    icon: GraduationCap,
    threshold: "interview1",
  },
  {
    key: "century",
    label: "Century Club",
    desc: "Earn 100 points",
    icon: Award,
    threshold: "pts100",
  },
];

const PERKS = [
  { id: "perk1", title: "Extra AI credits (1 week)", cost: 40 },
  { id: "perk2", title: "Custom space theme", cost: 60 },
  { id: "perk3", title: "Priority podcast generation", cost: 80 },
  { id: "perk4", title: "Offline export pack", cost: 120 },
];

const INTERVIEW_ROLES = [
  "Software Engineer",
  "Marketing Analyst",
  "Data Scientist",
  "Product Manager",
  "UX Researcher",
  "Custom +",
];

const INTERVIEW_QUESTIONS = {
  default: [
    "Tell me a bit about yourself and what draws you to this role.",
    "Walk me through a recent project you're proud of.",
    "Describe a time you disagreed with a teammate. How did you handle it?",
    "Where do you see the biggest gap in your current skill set, and how are you closing it?",
  ],
  followUpShort:
    "Could you go a little deeper — walk me through a specific example with more detail?",
};

/* ============================================================================
   SMALL UI PRIMITIVES
============================================================================ */

const INK = "#1A1A1A";
const PRIMARY = "#FA0F00";
const AMBER = "#F5A623";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function Avatar({ name, color = PRIMARY, size = 32 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-white shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.38,
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {initials}
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
  icon: Icon,
  size = "md",
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 font-semibold rounded-xl transition active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100";
  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3.5",
  };
  const variants = {
    primary: "text-white shadow-sm",
    secondary: "bg-white text-[#1A1A1A] border border-[#E4E4F5]",
    ghost: "bg-transparent text-[#1A1A1A]",
    danger: "bg-red-50 text-red-600",
  };
  const style = variant === "primary" ? { background: PRIMARY } : {};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(base, sizes[size], variants[variant], className)}
      style={style}
    >
      {Icon && <Icon size={size === "lg" ? 18 : 15} />}
      {children}
    </button>
  );
}

function Chip({ children, active, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition shrink-0",
        active
          ? "text-white border-transparent"
          : "bg-white text-[#4B4D6B] border-[#E4E4F5]",
        className,
      )}
      style={active ? { background: PRIMARY } : {}}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(
        "bg-white rounded-2xl border border-[#EEEEF6] shadow-[0_1px_3px_rgba(30,27,75,0.06)]",
        onClick && "active:scale-[0.99] cursor-pointer transition",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, action, sub }) {
  return (
    <div className="flex items-end justify-between px-1 mb-3">
      <div>
        <h2
          className="font-bold text-[15px]"
          style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
        >
          {title}
        </h2>
        {sub && <p className="text-xs text-[#8688A6] mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function Skeleton({ className }) {
  return (
    <div className={cx("animate-pulse bg-[#ECEDF7] rounded-xl", className)} />
  );
}

function EmptyState({ icon: Icon, title, sub, action }) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-6">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
        style={{ background: "#FFEBE9" }}
      >
        <Icon size={24} color={PRIMARY} />
      </div>
      <p className="font-semibold text-sm" style={{ color: INK }}>
        {title}
      </p>
      {sub && (
        <p className="text-xs text-[#8688A6] mt-1 max-w-[240px]">{sub}</p>
      )}
      {action}
    </div>
  );
}

function BottomSheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-[slideup_0.25s_ease-out]">
        <div className="sticky top-0 bg-white pt-3 pb-2 px-5 border-b border-[#F0F0F8] flex items-center justify-between z-10">
          <div className="w-9" />
          <div className="w-10 h-1 rounded-full bg-[#E4E4F5] absolute left-1/2 -translate-x-1/2 top-2" />
          <span
            className="font-bold text-sm pt-1"
            style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F5FA]"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Modal({ open, onClose, children, title, wide }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={cx(
          "relative w-full bg-white rounded-3xl max-h-[88vh] overflow-y-auto",
          wide ? "max-w-lg" : "max-w-sm",
        )}
      >
        <div className="sticky top-0 bg-white pt-4 pb-3 px-5 border-b border-[#F0F0F8] flex items-center justify-between z-10">
          <span
            className="font-bold text-sm"
            style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F5FA]"
          >
            <X size={15} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast?.show) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-[fadein_0.2s_ease-out]">
      {toast.icon ? (
        <toast.icon size={14} color={AMBER} />
      ) : (
        <Sparkles size={14} color={AMBER} />
      )}
      {toast.text}
    </div>
  );
}

function PointsPop({ pop }) {
  if (!pop) return null;
  return (
    <div
      key={pop.key}
      className="fixed top-16 right-4 z-[60] px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg animate-[floatup_1.4s_ease-out_forwards]"
      style={{ background: AMBER }}
    >
      +{pop.amount} pts
    </div>
  );
}

/* ============================================================================
   HOME SCREEN
============================================================================ */

const CLOUD_STYLE = [
  { size: 56, ty: -6 },
  { size: 72, ty: 6, emphasized: true },
  { size: 50, ty: -10 },
  { size: 60, ty: 4 },
  { size: 46, ty: -2 },
];

function HomeScreen({ ctx }) {
  const {
    spaces,
    openSideMenu,
    points,
    homeInput,
    setHomeInput,
    submitHomeInput,
    handleQuickAction,
    openSpace,
  } = ctx;
  const fileRef = useRef(null);
  const loopItems = [
    ...QUICK_ACTIONS,
    ...QUICK_ACTIONS,
    ...QUICK_ACTIONS,
    ...QUICK_ACTIONS,
    ...QUICK_ACTIONS,
    ...QUICK_ACTIONS,
  ];
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        // background:
        //   "linear-gradient(170deg, #180000 0%, #7A0900 30%, #FA0F00 62%, #FF7A6E 100%)",

        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-6 pb-1">
        <div className="flex items-center gap-4">
          <button onClick={openSideMenu} aria-label="Menu">
            <Menu size={22} color="white" />
          </button>
          <button aria-label="Search">
            <Search size={19} color="white" />
          </button>
        </div>
        <button
          onClick={() => ctx.setView("rewards")}
          className="flex items-center gap-1 px-2.5 h-8 rounded-full text-white font-bold text-xs shadow-sm"
          style={{ background: AMBER }}
        >
          <Coins size={13} /> {points}
        </button>
      </div>

      {/* Cloud-scrolling icon row */}
      <div
        className="relative z-10 mt-5 overflow-x-auto overflow-y-hidden  group scrollbar-hide"
        style={{ height: 84, scrollbarWidth: "none" }}
      >
        <div className="flex items-center gap-6 w-max pl-6  scrollbar-hide">
          {loopItems.map((qa, i) => {
            const st = CLOUD_STYLE[i % CLOUD_STYLE.length];
            return (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleQuickAction(qa.key)}
                className="relative shrink-0 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
                style={{
                  width: hovered === i ? 72 : st.size,
                  height: hovered === i ? 72 : st.size,
                  transform: `translateY(${st.ty}px)`,
                  background:
                    hovered === i ? "#FFFFFF" : "rgba(255,255,255,0.20)",
                  backdropFilter: hovered === i ? undefined : "blur(6px)",
                  WebkitBackdropFilter: hovered === i ? undefined : "blur(6px)",
                  border:
                    hovered === i ? "none" : "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    hovered === i ? "0 8px 20px rgba(0,0,0,0.28)" : "none",
                }}
              >
                <qa.icon
                  size={hovered === i ? 24 : Math.round(st.size * 0.36)}
                  color={hovered === i ? PRIMARY : "#FFFFFF"}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logo + headline */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-black shadow-lg opacity-70">
          <img src={adb} alt="ADB" className="w-10 h-10" />
        </div>
        <h1
          className="text-white font-bold text-[26px] leading-snug"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          What are we learning
          <br />
          today&hellip;
        </h1>
      </div>

      {/* Primary input + recents */}
      <div className="relative z-10 px-5 pb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (homeInput.trim()) submitHomeInput(homeInput);
          }}
          className="flex items-center gap-2 bg-white rounded-2xl px-3 py-3 shadow-lg mb-4"
        >
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center shrink-0"
          >
            <Paperclip size={15} color="#6B6D8C" />
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={() => submitHomeInput("Help me study my attached file")}
          />
          <input
            value={homeInput}
            onChange={(e) => setHomeInput(e.target.value)}
            placeholder="Ask a doubt or make a plan…"
            className="flex-1 text-sm outline-none placeholder:text-[#9C9EBD]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: PRIMARY }}
          >
            <Send size={14} color="white" />
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-white/85 text-xs font-semibold shrink-0">
            Recent Spaces:
          </span>
          {spaces.slice(0, 6).map((s) => (
            <button
              key={s.id}
              onClick={() => openSpace(s.id, "dashboard")}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 text-white"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {s.name.length > 14 ? s.name.slice(0, 12) + "…" : s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Side menu (hamburger) */
function SideMenu({ open, onClose, ctx }) {
  const items = [
    { key: "home", label: "Home", icon: BookOpen },
    { key: "hub", label: "Learning Partner Hub", icon: GraduationCap },
    { key: "interview", label: "AI Interview Room", icon: Mic },
    { key: "rewards", label: "Learning Rewards", icon: Trophy },
  ];
  return (
    <div
      className={cx(
        "fixed inset-0 z-50 transition-all",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div
        className={cx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cx(
          "absolute left-0 top-0 bottom-0 w-72 max-w-[80%] bg-white shadow-2xl transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-5 border-b border-[#F0F0F8]">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{
                background: `linear-gradient(135deg, ${PRIMARY}, #FF6A5C)`,
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              S
            </div>
            <span
              className="font-bold text-[15px]"
              style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
            >
              Student Spaces
            </span>
          </div>
          <p className="text-xs text-[#9C9EBD]">Your AI study companion</p>
        </div>
        <div className="p-3">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => {
                ctx.setView(it.key);
                onClose();
              }}
              className={cx(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-left",
                ctx.view === it.key
                  ? "text-white"
                  : "text-[#3A3C5C] hover:bg-[#F5F5FA]",
              )}
              style={ctx.view === it.key ? { background: PRIMARY } : {}}
            >
              <it.icon size={17} />
              {it.label}
            </button>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="rounded-2xl p-4" style={{ background: "#FBF3E4" }}>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} color={AMBER} />
              <span className="font-bold text-sm" style={{ color: INK }}>
                {ctx.streak}-day streak
              </span>
            </div>
            <p className="text-[11px] text-[#8688A6]">
              Keep studying to grow your streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SPACE SCREEN SHELL
============================================================================ */

const SPACE_TABS = [
  { key: "sources", label: "Sources" },
  { key: "chat", label: "Chat" },
  { key: "spacechat", label: "Space Chat" },
  { key: "studytools", label: "Study Tools" },
  { key: "notes", label: "Notes" },
];

function SpaceScreen({ ctx }) {
  const { space, spaceView, setSpaceView, goHome, openAddSheet } = ctx;
  const [editingTitle, setEditingTitle] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);

  if (!space) return null;

  return (
    <div className="min-h-full pb-24 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-[#F7F7F5]/95 backdrop-blur px-3 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={goHome}
            className="w-9 h-9 rounded-full bg-white border border-[#EEEEF6] flex items-center justify-center shrink-0 shadow-sm"
          >
            <ArrowLeft size={16} color={INK} />
          </button>
          {editingTitle ? (
            <input
              autoFocus
              defaultValue={space.name}
              onBlur={(e) => {
                ctx.renameSpace(space.id, e.target.value || space.name);
                setEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
              className="flex-1 min-w-0 font-bold text-[15px] bg-white rounded-lg px-2 py-1 border border-[#E4E4F5] outline-none"
              style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
            />
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              className="flex-1 min-w-0 text-left"
            >
              <p
                className="font-bold text-[15px] truncate"
                style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
              >
                {space.name}
              </p>
            </button>
          )}
          <button
            onClick={() => ctx.showToast("Share link copied", Share2)}
            className="w-9 h-9 rounded-full bg-white border border-[#EEEEF6] flex items-center justify-center shrink-0 shadow-sm"
          >
            <Share2 size={15} color={INK} />
          </button>
          <div className="relative">
            <button
              onClick={() => setOverflowOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-white border border-[#EEEEF6] flex items-center justify-center shrink-0 shadow-sm"
            >
              <MoreVertical size={15} color={INK} />
            </button>
            {overflowOpen && (
              <div className="absolute right-0 top-11 w-44 bg-white rounded-xl shadow-lg border border-[#EEEEF6] py-1.5 z-40">
                <button
                  onClick={() => {
                    setEditingTitle(true);
                    setOverflowOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-left hover:bg-[#F5F5FA]"
                >
                  <Edit3 size={13} /> Rename
                </button>
                <button
                  onClick={() => {
                    ctx.showToast("Space exported");
                    setOverflowOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-left hover:bg-[#F5F5FA]"
                >
                  <Download size={13} /> Export
                </button>
                <button
                  onClick={() => {
                    ctx.deleteSpace(space.id);
                    setOverflowOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-left hover:bg-red-50 text-red-600"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mt-3.5">
          <button
            onClick={() => setSpaceView("dashboard")}
            className={cx(
              "w-8 h-8 rounded-lg flex items-center justify-center mr-1 shrink-0",
              spaceView === "dashboard"
                ? "text-white"
                : "bg-white border border-[#EEEEF6]",
            )}
            style={spaceView === "dashboard" ? { background: PRIMARY } : {}}
          >
            <LayoutGrid
              size={14}
              color={spaceView === "dashboard" ? "white" : INK}
            />
          </button>
          <div className="flex-1 flex items-center gap-4 overflow-x-auto no-scrollbar">
            {SPACE_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setSpaceView(t.key)}
                className="relative pb-2 pt-1 shrink-0"
              >
                <span
                  className={cx(
                    "text-[13px] font-semibold whitespace-nowrap",
                    spaceView === t.key ? "" : "text-[#9C9EBD]",
                  )}
                  style={spaceView === t.key ? { color: PRIMARY } : {}}
                >
                  {t.label}
                </span>
                {spaceView === t.key && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full"
                    style={{ background: PRIMARY }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => openAddSheet()}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md ml-1"
            style={{ background: PRIMARY }}
          >
            <Plus size={17} color="white" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-4 pt-3">
        {spaceView === "dashboard" && <DashboardTab ctx={ctx} />}
        {spaceView === "sources" && <SourcesTab ctx={ctx} />}
        {spaceView === "chat" && <ChatTab ctx={ctx} />}
        {spaceView === "spacechat" && <SpaceChatTab ctx={ctx} />}
        {spaceView === "studytools" && <StudyToolsTab ctx={ctx} />}
        {spaceView === "notes" && <NotesTab ctx={ctx} />}
      </div>
    </div>
  );
}

/* ---------------- 3a. Dashboard tab ---------------- */
function DashboardTab({ ctx }) {
  const { space, setSpaceView, sendChatFromOutside, startQuiz } = ctx;
  const [q, setQ] = useState("");
  const incompleteQuizzes = space.studyAids.filter(
    (a) => a.type === "quiz" && !a.completed,
  );
  const recent = [...space.studyAids].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  return (
    <div className="pb-6">
      <h1
        className="font-bold text-xl mb-4 mt-1"
        style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
      >
        Start studying {space.name}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (q.trim()) {
            sendChatFromOutside(q);
            setQ("");
          }
        }}
        className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#EEEEF6] mb-7"
      >
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center shrink-0"
        >
          <Paperclip size={14} color="#6B6D8C" />
        </button>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What do you want to study?"
          className="flex-1 text-sm outline-none placeholder:text-[#9C9EBD]"
        />
        <button
          type="submit"
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: PRIMARY }}
        >
          <Send size={13} color="white" />
        </button>
      </form>

      {incompleteQuizzes.length > 0 && (
        <div className="mb-7">
          <SectionHeader title="Next: take a quiz" />
          <div className="flex flex-col gap-2.5">
            {incompleteQuizzes.map((qz) => (
              <Card key={qz.id} className="p-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#FDEEE8" }}
                >
                  <HelpCircle size={18} color="#E0552B" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-[13px]"
                    style={{ color: INK }}
                  >
                    {qz.title}
                  </p>
                  <p className="text-[11px] text-[#9C9EBD] mt-0.5">{qz.meta}</p>
                </div>
                <Btn size="sm" onClick={() => startQuiz(qz)}>
                  Start
                </Btn>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionHeader
          title="Jump back in"
          action={
            <button
              onClick={() => setSpaceView("studytools")}
              className="text-xs font-semibold"
              style={{ color: PRIMARY }}
            >
              See all
            </button>
          }
        />
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {recent.map((a) => {
            const info = toolInfo(a.type);
            return (
              <Card
                key={a.id}
                onClick={() => ctx.openAidViewer(a)}
                className="p-3.5 w-40 shrink-0 relative"
              >
                {a.completed && (
                  <div className="absolute top-2.5 right-2.5">
                    <CheckCircle2 size={16} color="#16A34A" />
                  </div>
                )}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: info.color + "1A" }}
                >
                  <info.icon size={16} color={info.color} />
                </div>
                <p
                  className="font-semibold text-[12.5px] leading-snug lc-2 mb-1"
                  style={{ color: INK }}
                >
                  {a.title}
                </p>
                <p className="text-[10px] text-[#9C9EBD]">
                  {info.label} · {a.date}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 3b. Sources tab ---------------- */
function SourcesTab({ ctx }) {
  const { space, viewMode, setViewMode, openAddSheet, openViewer } = ctx;
  const [sortBy, setSortBy] = useState("Recent");
  const [sortOpen, setSortOpen] = useState(false);
  const sorted = [...space.sources].sort((a, b) => {
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Type") return a.type.localeCompare(b.type);
    return a.addedDate < b.addedDate ? 1 : -1;
  });

  return (
    <div className="pb-6">
      <button
        onClick={() => openAddSheet()}
        className="w-full rounded-2xl border-2 border-dashed border-[#D6D7EE] bg-white flex flex-col items-center justify-center gap-2 py-8 mb-5 active:scale-[0.99] transition"
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: "#FFEBE9" }}
        >
          <Upload size={18} color={PRIMARY} />
        </div>
        <p className="text-sm font-semibold" style={{ color: INK }}>
          Drag and drop your files
        </p>
        <p className="text-xs text-[#9C9EBD]">
          or{" "}
          <span style={{ color: PRIMARY }} className="font-semibold">
            choose files
          </span>
        </p>
      </button>

      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-[#6B6D8C]">
          Added {space.sources.length} files
        </p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-white border border-[#EEEEF6]"
            >
              Sort: {sortBy} <ChevronDown size={12} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-9 w-32 bg-white rounded-xl shadow-lg border border-[#EEEEF6] py-1 z-20">
                {["Recent", "Name", "Type"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSortBy(s);
                      setSortOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F5F5FA]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-8 h-8 rounded-lg bg-white border border-[#EEEEF6] flex items-center justify-center"
          >
            {viewMode === "grid" ? (
              <List size={13} />
            ) : (
              <LayoutGrid size={13} />
            )}
          </button>
        </div>
      </div>

      {space.sources.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No sources yet"
          sub="Upload files, photos, links, or pasted text to start building this space."
        />
      ) : (
        <div
          className={cx(
            viewMode === "grid"
              ? "grid grid-cols-2 gap-3"
              : "flex flex-col gap-2.5",
          )}
        >
          {sorted.map((s) => (
            <SourceCard
              key={s.id}
              s={s}
              viewMode={viewMode}
              openViewer={openViewer}
              ctx={ctx}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SourceCard({ s, viewMode, openViewer, ctx }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Card
      onClick={() => openViewer(s)}
      className={cx(
        "p-3 relative",
        viewMode === "list" && "flex items-center gap-3",
      )}
    >
      <div
        className={cx(
          "rounded-xl flex items-center justify-center shrink-0",
          viewMode === "grid" ? "w-full h-20 mb-2.5" : "w-12 h-14",
        )}
        style={{ background: "#F2F2FA" }}
      >
        <FileText size={20} color={PRIMARY} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="font-semibold text-[12.5px] leading-snug lc-2"
          style={{ color: INK }}
        >
          {s.name}
        </p>
        <p className="text-[10px] text-[#9C9EBD] mt-1 lc-1">{s.module}</p>
        <p className="text-[10px] text-[#9C9EBD] mt-0.5">
          Added {s.addedDate} · {s.addedBy}
        </p>
      </div>
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
          }}
          className={cx(
            "flex items-center justify-center rounded-full hover:bg-[#F5F5FA]",
            viewMode === "grid" ? "absolute top-1 right-1 w-6 h-6" : "w-7 h-7",
          )}
        >
          <MoreVertical size={14} color="#9C9EBD" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-lg border border-[#EEEEF6] py-1 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                openViewer(s);
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F5F5FA]"
            >
              View
            </button>
            <button
              onClick={() => {
                ctx.showToast("Renamed");
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-[#F5F5FA]"
            >
              Rename
            </button>
            <button
              onClick={() => {
                ctx.removeSource(s.id);
                setMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-red-50 text-red-600"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

/* PDF/slide viewer modal */
function ViewerModal({ ctx }) {
  const { viewerSource, closeViewer } = ctx;
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [viewerSource]);
  if (!viewerSource) return null;
  const total = viewerSource.pages || 1;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-[#F0F0F8]">
        <button
          onClick={closeViewer}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <p
          className="font-semibold text-[13px] truncate max-w-[55%]"
          style={{ color: INK }}
        >
          {viewerSource.name}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => ctx.showToast("Share link copied", Share2)}
            className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
          >
            <Share2 size={15} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center">
            <MoreVertical size={15} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F7F7F5]">
        <div className="w-full max-w-sm aspect-[3/4] bg-white rounded-2xl shadow-lg border border-[#EEEEF6] flex flex-col p-6">
          <FileText size={28} color={PRIMARY} className="mb-4" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-3/4 mb-2.5" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-full mb-2.5" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-5/6 mb-2.5" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-2/3 mb-6" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-full mb-2.5" />
          <div className="h-2.5 bg-[#EDEDF6] rounded-full w-4/6 mb-2.5" />
          <p className="mt-auto text-center text-[10px] text-[#C7C8DE]">
            Page {page} of {total} (preview)
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 py-4 border-t border-[#F0F0F8]">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="px-3 py-1.5 rounded-full bg-[#F5F5FA] text-xs font-semibold">
          {page} / {total}
        </span>
        <button
          disabled={page >= total}
          onClick={() => setPage((p) => p + 1)}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* Add Student Space files bottom sheet */
function AddContentSheet({ ctx }) {
  const {
    addSheetOpen,
    closeAddSheet,
    addUpload,
    addPhoto,
    addLink,
    addPastedText,
    openCloudModal,
    generateFromPicker,
  } = ctx;
  const [mode, setMode] = useState("root"); // root | upload | photo | link | paste
  const [uploadStage, setUploadStage] = useState("idle"); // idle | validating | selective
  const [linkUrl, setLinkUrl] = useState("");
  const [linkStage, setLinkStage] = useState("idle"); // idle | processing | done
  const [linkSummary, setLinkSummary] = useState(null);
  const [photoStage, setPhotoStage] = useState("idle");
  const [photoResult, setPhotoResult] = useState(null);
  const [pasteText, setPasteText] = useState("");

  useEffect(() => {
    if (addSheetOpen) {
      setMode("root");
      setUploadStage("idle");
      setLinkStage("idle");
      setLinkUrl("");
      setPhotoStage("idle");
      setPasteText("");
    }
  }, [addSheetOpen]);

  const mockFiles = [
    "Chapter 5 - Advanced Topics.pdf",
    "Lecture Recording Notes.vtt",
    "Summary Slides.pptx",
  ];

  const runUpload = () => {
    setUploadStage("validating");
    setTimeout(() => setUploadStage("selective"), 1100);
  };

  const runLink = (e) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    setLinkStage("processing");
    setTimeout(() => {
      setLinkSummary({
        title: "Video Link Summary",
        points: [
          "Introduces core segmentation criteria (demographic, behavioural, psychographic)",
          "Walks through a real-world targeting example",
          "Closes with a positioning statement template",
        ],
        chapters: [
          { t: "0:00", label: "Intro" },
          { t: "2:14", label: "Segmentation criteria" },
          { t: "6:40", label: "Worked example" },
          { t: "10:05", label: "Recap" },
        ],
        takeaway:
          "Segment first on need, not demographics alone — it predicts behaviour better.",
      });
      setLinkStage("done");
    }, 1400);
  };

  const runPhoto = () => {
    setPhotoStage("processing");
    setTimeout(() => {
      setPhotoResult({
        text: "Handwritten: 'STP = Segment, Target, Position. Segment by needs > demographics. Position against #1 competitor gap.'",
        insight:
          "This looks like a lecture-margin note on the STP framework — consider adding it to your Positioning Frameworks source group.",
      });
      setPhotoStage("done");
    }, 1300);
  };

  return (
    <BottomSheet
      open={addSheetOpen}
      onClose={closeAddSheet}
      title={
        mode === "root"
          ? "Add Student Space files"
          : mode === "upload"
            ? "Upload files"
            : mode === "photo"
              ? "Add photos"
              : mode === "link"
                ? "Add video link"
                : "Paste copied text"
      }
    >
      {mode === "root" && (
        <div className="flex flex-col gap-5">
          <p className="text-[12.5px] text-[#8688A6] leading-relaxed -mt-1">
            You can add files, links, and copied text to a Student Space.
            They'll be processed in the cloud when you add them.
          </p>

          <div className="rounded-2xl border-2 border-dashed border-[#E9CFCD] bg-[#FFF9F8] p-6 text-center">
            <p className="font-bold text-[14px] mb-1.5" style={{ color: INK }}>
              Upload files
            </p>
            <p className="text-[11px] text-[#9C9EBD] leading-relaxed">
              PDF, DOCX, PPTX, TXT, RTF, XLS, VTT
            </p>
            <p className="text-[11px] text-[#9C9EBD] mb-4">
              Max 100 files; 100MB and 1000 pages each
            </p>
            <button
              onClick={() => setMode("upload")}
              className="px-5 py-2.5 rounded-full border-2 font-semibold text-[13px]"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
            >
              Select files
            </button>
          </div>

          <div className="flex flex-col">
            {[
              { key: "photo", label: "Add photos", icon: ImageIcon },
              { key: "link", label: "Add video link", icon: LinkIcon },
              {
                key: "paste",
                label: "Paste copied text",
                icon: ClipboardPaste,
              },
            ].map((o) => (
              <button
                key={o.key}
                onClick={() => setMode(o.key)}
                className="w-full flex items-center gap-3 py-3.5 border-b border-[#F0F0F8] text-left"
              >
                <o.icon size={17} color="#6B6D8C" />
                <span
                  className="font-medium text-[13.5px] flex-1"
                  style={{ color: INK }}
                >
                  {o.label}
                </span>
                <ChevronRight size={15} color="#C7C8DE" />
              </button>
            ))}
            <button
              onClick={() => openCloudModal()}
              className="w-full flex items-center gap-3 py-3.5 text-left"
            >
              <Cloud size={17} color="#6B6D8C" />
              <span
                className="font-medium text-[13.5px] flex-1"
                style={{ color: INK }}
              >
                Import from Adobe Cloud
              </span>
              <ChevronRight size={15} color="#C7C8DE" />
            </button>
          </div>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-center text-[12px] font-semibold underline"
            style={{ color: PRIMARY }}
          >
            Generative AI User Guidelines
          </a>
        </div>
      )}

      {mode === "upload" && (
        <div>
          {uploadStage === "idle" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border-2 border-dashed border-[#D6D7EE] p-6 text-center">
                <Upload size={22} color={PRIMARY} className="mx-auto mb-2" />
                <p className="text-sm font-semibold" style={{ color: INK }}>
                  Drop files or tap to browse
                </p>
                <p className="text-[11px] text-[#9C9EBD] mt-2 leading-relaxed">
                  Accepted: PDF, DOCX, PPTX, TXT, RTF, XLS, VTT
                  <br />
                  Max 100 files · 100MB each · 1000 pages each
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {mockFiles.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-[#6B6D8C] bg-[#F5F5FA] rounded-lg px-3 py-2"
                  >
                    <FileText size={13} /> {f}
                  </div>
                ))}
              </div>
              <Btn onClick={runUpload}>Upload {mockFiles.length} files</Btn>
            </div>
          )}
          {uploadStage === "validating" && (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 size={26} color={PRIMARY} className="animate-spin" />
              <p className="text-sm font-semibold" style={{ color: INK }}>
                Validating & uploading…
              </p>
              <p className="text-xs text-[#9C9EBD]">
                Checking file types, size, and page limits
              </p>
            </div>
          )}
          {uploadStage === "selective" && (
            <SelectiveFilePicker
              files={mockFiles}
              onDone={(selected) => {
                selected.forEach((f) => ctx.addUpload(f));
                closeAddSheet();
                ctx.showToast(`${selected.length} files added`, CheckCircle2);
              }}
            />
          )}
        </div>
      )}

      {mode === "photo" && (
        <div>
          {photoStage === "idle" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[#F5F5FA] aspect-video flex items-center justify-center">
                <ImageIcon size={28} color="#B9BAD6" />
              </div>
              <Btn onClick={runPhoto} icon={ImageIcon}>
                Choose photo (mock)
              </Btn>
            </div>
          )}
          {photoStage === "processing" && (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 size={26} color={PRIMARY} className="animate-spin" />
              <p className="text-sm font-semibold" style={{ color: INK }}>
                Reading image…
              </p>
              <p className="text-xs text-[#9C9EBD]">
                Running OCR &amp; extracting insights
              </p>
            </div>
          )}
          {photoStage === "done" && photoResult && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[#FFEBE9] aspect-video flex items-center justify-center">
                <ImageIcon size={26} color={PRIMARY} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6D8C] mb-1.5">
                  Extracted text
                </p>
                <p
                  className="text-[13px] bg-[#F5F5FA] rounded-xl p-3 leading-relaxed"
                  style={{ color: INK }}
                >
                  {photoResult.text}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6D8C] mb-1.5 flex items-center gap-1">
                  <Sparkles size={12} color={PRIMARY} /> Insights
                </p>
                <p className="text-[13px] leading-relaxed text-[#4B4D6B]">
                  {photoResult.insight}
                </p>
              </div>
              <Btn
                onClick={() => {
                  ctx.addPhotoSource(photoResult);
                  closeAddSheet();
                  ctx.showToast("Photo added to sources", CheckCircle2);
                }}
              >
                Add to sources
              </Btn>
            </div>
          )}
        </div>
      )}

      {mode === "link" && (
        <div>
          {linkStage === "idle" && (
            <form onSubmit={runLink} className="flex flex-col gap-4">
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Paste a video or article URL…"
                className="w-full rounded-xl border border-[#E4E4F5] px-3.5 py-3 text-sm outline-none"
              />
              <Btn type="submit">Summarise link</Btn>
            </form>
          )}
          {linkStage === "processing" && (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 size={26} color={PRIMARY} className="animate-spin" />
              <p className="text-sm font-semibold" style={{ color: INK }}>
                Processing video link…
              </p>
              <p className="text-xs text-[#9C9EBD]">
                Extracting key points &amp; chapters
              </p>
            </div>
          )}
          {linkStage === "done" && linkSummary && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Video size={16} color="#0EA5E9" />
                <p className="font-semibold text-sm" style={{ color: INK }}>
                  {linkSummary.title}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6D8C] mb-1.5">
                  Key points
                </p>
                <ul className="flex flex-col gap-1.5">
                  {linkSummary.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-[13px] text-[#4B4D6B] flex gap-2"
                    >
                      <span style={{ color: PRIMARY }}>•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B6D8C] mb-1.5">
                  Chapter markers
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {linkSummary.chapters.map((c, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono bg-[#F5F5FA] rounded-lg px-2 py-1"
                    >
                      {c.t} {c.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl p-3" style={{ background: "#FBF3E4" }}>
                <p className="text-[12px] font-semibold" style={{ color: INK }}>
                  Takeaway
                </p>
                <p className="text-[12px] text-[#6B6D8C] mt-0.5">
                  {linkSummary.takeaway}
                </p>
              </div>
              <Btn
                onClick={() => {
                  ctx.addLinkSource(linkUrl, linkSummary);
                  closeAddSheet();
                  ctx.showToast("Video summary added", CheckCircle2);
                }}
              >
                Add to sources
              </Btn>
            </div>
          )}
        </div>
      )}

      {mode === "paste" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pasteText.trim()) {
              ctx.addPastedText(pasteText);
              closeAddSheet();
              ctx.showToast("Text added to sources", CheckCircle2);
            }
          }}
          className="flex flex-col gap-4"
        >
          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows={8}
            placeholder="Paste copied text here…"
            className="w-full rounded-xl border border-[#E4E4F5] px-3.5 py-3 text-sm outline-none resize-none"
          />
          <Btn type="submit" disabled={!pasteText.trim()}>
            Add as source
          </Btn>
        </form>
      )}
    </BottomSheet>
  );
}

function ToolPickerSheet({ ctx }) {
  const { toolPickerOpen, closeToolPicker, generateFromPicker } = ctx;
  return (
    <BottomSheet
      open={toolPickerOpen}
      onClose={closeToolPicker}
      title="Generate study aid"
    >
      <div className="flex flex-col gap-1">
        {TOOL_TYPES.map((t) => (
          <button
            key={t.key}
            onClick={() => generateFromPicker(t.key)}
            className="w-full flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-[#F5F5FA] text-left"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: t.color + "1A" }}
            >
              <t.icon size={14} color={t.color} />
            </div>
            <span className="text-[13px] font-semibold" style={{ color: INK }}>
              {t.label}
            </span>
            <ChevronRight size={14} className="ml-auto" color="#C7C8DE" />
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}

function SelectiveFilePicker({ files, onDone }) {
  const chapters = [
    "Chapter 5.1 — Overview",
    "Chapter 5.2 — Case Applications",
    "Chapter 5.3 — Practice Problems",
    "Lecture Recording Notes",
    "Summary Slides — Full Deck",
  ];
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(chapters.map((c) => [c, true])),
  );
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[#6B6D8C]">
        We detected these chapters/sessions. Choose which to include.
      </p>
      <div className="flex flex-col gap-1.5">
        {chapters.map((c) => (
          <button
            key={c}
            onClick={() => setChecked((s) => ({ ...s, [c]: !s[c] }))}
            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#F5F5FA] text-left"
          >
            <div
              className={cx(
                "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2",
                checked[c] ? "border-transparent" : "border-[#D6D7EE]",
              )}
              style={checked[c] ? { background: PRIMARY } : {}}
            >
              {checked[c] && <Check size={12} color="white" />}
            </div>
            <span className="text-[13px] font-medium" style={{ color: INK }}>
              {c}
            </span>
          </button>
        ))}
      </div>
      <Btn onClick={() => onDone(files)}>
        Continue with {Object.values(checked).filter(Boolean).length} selected
      </Btn>
    </div>
  );
}

const CLOUD_SOURCES = {
  scan: {
    label: "Add from Adobe Scan",
    icon: ScanLine,
    files: [
      "Lecture Whiteboard Scan.pdf",
      "Handwritten Notes — Ch.5.pdf",
      "Assignment Cover Sheet.pdf",
    ],
  },
  acrobat: {
    label: "Add from Adobe Acrobat folder",
    icon: FolderOpen,
    files: [
      "Semester Notes (Acrobat).pdf",
      "Group Project Deck.pptx",
      "Reading List.docx",
    ],
  },
};

function CloudImportModal({ ctx }) {
  const { cloudModalOpen, closeCloudModal } = ctx;
  const [stage, setStage] = useState("root"); // root | scan | acrobat
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    if (cloudModalOpen) {
      setStage("root");
      setSelected([]);
    }
  }, [cloudModalOpen]);

  const source = stage !== "root" ? CLOUD_SOURCES[stage] : null;

  return (
    <Modal
      open={cloudModalOpen}
      onClose={closeCloudModal}
      title={stage === "root" ? "Import from Adobe Cloud" : source.label}
    >
      {stage === "root" && (
        <div className="flex flex-col gap-2.5">
          {Object.entries(CLOUD_SOURCES).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setStage(key)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F5FA] text-left"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shrink-0">
                <s.icon size={16} color={PRIMARY} />
              </div>
              <span
                className="font-semibold text-[13px] flex-1"
                style={{ color: INK }}
              >
                {s.label}
              </span>
              <ChevronRight size={15} color="#9C9EBD" />
            </button>
          ))}
        </div>
      )}
      {stage !== "root" && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setStage("root");
              setSelected([]);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold mb-1"
            style={{ color: PRIMARY }}
          >
            <ArrowLeft size={13} /> Back
          </button>
          {source.files.map((f) => (
            <button
              key={f}
              onClick={() =>
                setSelected((s) =>
                  s.includes(f) ? s.filter((x) => x !== f) : [...s, f],
                )
              }
              className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl bg-[#F5F5FA] text-left"
            >
              <FileText size={15} color={PRIMARY} />
              <span
                className="text-[13px] font-medium flex-1"
                style={{ color: INK }}
              >
                {f}
              </span>
              <div
                className={cx(
                  "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2",
                  selected.includes(f)
                    ? "border-transparent"
                    : "border-[#D6D7EE]",
                )}
                style={selected.includes(f) ? { background: PRIMARY } : {}}
              >
                {selected.includes(f) && <Check size={12} color="white" />}
              </div>
            </button>
          ))}
          <Btn
            className="mt-2"
            disabled={!selected.length}
            onClick={() => {
              selected.forEach((f) => ctx.addUpload(f));
              closeCloudModal();
              ctx.showToast(`${selected.length} files imported`, CheckCircle2);
            }}
          >
            Import selected
          </Btn>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- 3c. Chat tab ---------------- */
const MAX_CHARS = 4000;

function isMathQuery(text) {
  const t = text.toLowerCase();
  if (/\d+\s*[\+\-\*\/x×^]\s*\d+/.test(t)) return true;
  if (/(solve|derivative|integral|equation|simplify)\b/.test(t) && /\d/.test(t))
    return true;
  return false;
}

function buildMathSteps(text) {
  return {
    problem: text,
    steps: [
      "Identify the operation and rewrite the expression in standard form.",
      "Apply the relevant rule (order of operations / algebraic identity) step by step.",
      "Simplify each term, combining like parts as you go.",
      "Check the result by substituting back into the original expression.",
    ],
    answer: "42",
  };
}

function personaReply(persona, text) {
  if (persona === "educator") {
    return `**Overview**\nHere's a structured breakdown to help you study "${text}".\n\n**Key points**\n- Core definition and why it matters\n- A worked example\n- A common mistake to avoid\n\nLet me know if you'd like this turned into a study aid.`;
  }
  if (persona === "researcher") {
    return `On "${text}": the consensus view frames this in terms of underlying mechanisms rather than surface description. Worth cross-referencing with your uploaded sources for citation-level detail — I can point to the relevant pages if helpful.`;
  }
  return `Got it — here's the quick version on "${text}": think of it as the core idea plus one solid example. Want me to turn this into flashcards or a quiz so it sticks?`;
}

function ChatTab({ ctx }) {
  const {
    space,
    chatInput,
    setChatInput,
    sendChat,
    persona,
    setPersona,
    language,
    setLanguage,
    openLanguageSheet,
    openPersonaSheet,
    pickToolInChat,
  } = ctx;
  const scrollRef = useRef(null);
  const [showPicker, setShowPicker] = useState(space.chat.length < 1);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [space.chat.length]);
  useEffect(() => {
    setShowPicker(space.chat.length < 1);
  }, [space.id]);

  let lastDate = null;

  return (
    <div className="flex flex-col" style={{ minHeight: "60vh" }}>
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col gap-3 pb-3 overflow-y-auto max-h-[58vh]"
      >
        {space.chat.map((m) => {
          const showDate = m.date !== lastDate;
          lastDate = m.date;
          return (
            <React.Fragment key={m.id}>
              {showDate && (
                <div className="flex justify-center my-1">
                  <span className="text-[10px] font-semibold text-[#B0B1CC] bg-white px-3 py-1 rounded-full border border-[#EEEEF6]">
                    {m.date}
                  </span>
                </div>
              )}
              {m.role === "user" ? (
                <div className="flex justify-end">
                  <div
                    className="max-w-[80%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-white text-[13.5px] leading-relaxed"
                    style={{ background: PRIMARY }}
                  >
                    {m.text}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 max-w-[88%]">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "#FFEBE9" }}
                  >
                    <Sparkles size={13} color={PRIMARY} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {m.loading ? (
                      <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-3 border border-[#EEEEF6] flex items-center gap-2">
                        <Loader2
                          size={13}
                          className="animate-spin"
                          color={PRIMARY}
                        />
                        <span className="text-[13px] text-[#8688A6]">
                          {m.text}
                        </span>
                      </div>
                    ) : (
                      <>
                        {m.text && (
                          <div
                            className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 border border-[#EEEEF6] text-[13.5px] leading-relaxed whitespace-pre-line"
                            style={{ color: INK }}
                          >
                            {m.text}
                          </div>
                        )}
                        {m.mathCard && <MathCard data={m.mathCard} />}
                        {m.artifact && (
                          <ArtifactCard
                            aid={m.artifact}
                            onOpen={() => ctx.openAidViewer(m.artifact)}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {showPicker && (
          <div className="bg-white rounded-2xl border border-[#EEEEF6] p-3 mt-1">
            <p className="text-xs font-semibold text-[#6B6D8C] mb-2 px-1">
              Generate a study aid
            </p>
            <div className="flex flex-col gap-0.5">
              {TOOL_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    pickToolInChat(t.key);
                    setShowPicker(false);
                  }}
                  className="w-full flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-[#F5F5FA] text-left"
                >
                  <div
                    ప్రారంభిద్దాంclassName="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: t.color + "1A" }}
                  >
                    <t.icon size={14} color={t.color} />
                  </div>
                  <span
                    className="text-[13px] font-semibold"
                    style={{ color: INK }}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Persona + language row */}
      <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar">
        <button
          onClick={openPersonaSheet}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#EEEEF6] shrink-0"
        >
          <UserCircle2 size={13} color={PRIMARY} />{" "}
          {PERSONAS.find((p) => p.key === persona)?.label}
        </button>
        <button
          onClick={openLanguageSheet}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#EEEEF6] shrink-0"
        >
          <Globe size={13} color={PRIMARY} />{" "}
          {LANGUAGES.find((l) => l.code === language)?.label}
        </button>
        <button
          onClick={() => setShowPicker((v) => !v)}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-white border border-[#EEEEF6] shrink-0"
        >
          <Sparkles size={13} color={PRIMARY} /> Study tools
        </button>
      </div>

      {/* Input */}
      <ChatInputBar
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendChat={sendChat}
      />
      <p className="text-[10px] text-[#B0B1CC] text-center mt-2 leading-relaxed">
        AI responses may be inaccurate.{" "}
        <span className="underline" style={{ color: PRIMARY }}>
          GenAI Guidelines
        </span>
      </p>
    </div>
  );
}

function ChatInputBar({ chatInput, setChatInput, sendChat }) {
  const taRef = useRef(null);
  const near = chatInput.length > MAX_CHARS * 0.9;
  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height =
        Math.min(taRef.current.scrollHeight, 120) + "px";
    }
  }, [chatInput]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (chatInput.trim()) sendChat(chatInput);
      }}
      className="flex items-end gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#EEEEF6]"
    >
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center shrink-0 mb-0.5"
      >
        <Paperclip size={14} color="#6B6D8C" />
      </button>
      <div className="flex-1 flex flex-col">
        <textarea
          ref={taRef}
          rows={1}
          value={chatInput}
          maxLength={MAX_CHARS}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (chatInput.trim()) sendChat(chatInput);
            }
          }}
          placeholder="What do you want to study?"
          className="flex-1 text-sm outline-none resize-none placeholder:text-[#9C9EBD] leading-snug"
        />
        {near && (
          <span className="text-[10px] text-amber-600 font-semibold self-end mt-0.5">
            {chatInput.length}/{MAX_CHARS}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-0.5"
        style={{ background: PRIMARY }}
      >
        <Send size={13} color="white" />
      </button>
    </form>
  );
}

function MathCard({ data }) {
  return (
    <div className="bg-white rounded-2xl rounded-tl-sm border border-[#EEEEF6] p-3.5">
      <p className="text-[11px] font-semibold text-[#6B6D8C] mb-2">
        Step-by-step solution
      </p>
      <ol className="flex flex-col gap-2 mb-3">
        {data.steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-[12.5px] text-[#3A3C5C] leading-relaxed"
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
              style={{ background: PRIMARY }}
            >
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
      <div
        className="rounded-xl px-3 py-2 flex items-center justify-between"
        style={{ background: "#FFEBE9" }}
      >
        <span className="text-[11px] font-semibold" style={{ color: INK }}>
          Final answer
        </span>
        <span
          className="font-mono font-bold text-sm"
          style={{ color: PRIMARY }}
        >
          {data.answer}
        </span>
      </div>
    </div>
  );
}

function ArtifactCard({ aid, onOpen }) {
  const info = toolInfo(aid.type);
  return (
    <div className="bg-white rounded-2xl border border-[#EEEEF6] p-3.5 w-64">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: info.color + "1A" }}
        >
          <info.icon size={16} color={info.color} />
        </div>
        <div className="min-w-0">
          <p
            className="font-semibold text-[12.5px] leading-snug lc-2"
            style={{ color: INK }}
          >
            {aid.title}
          </p>
          <p className="text-[10px] text-[#9C9EBD] mt-0.5">
            {aid.meta} · {aid.date}
          </p>
        </div>
      </div>
      <Btn size="sm" className="w-full" onClick={onOpen}>
        Open
      </Btn>
    </div>
  );
}

/* Persona / language sheets */
function PersonaSheet({ ctx }) {
  return (
    <BottomSheet
      open={ctx.personaSheetOpen}
      onClose={ctx.closePersonaSheet}
      title="Response style"
    >
      <div className="flex flex-col gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.key}
            onClick={() => {
              ctx.setPersona(p.key);
              ctx.closePersonaSheet();
            }}
            className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-[#F5F5FA] text-left"
          >
            <UserCircle2 size={18} color={PRIMARY} />
            <div className="flex-1">
              <p className="font-semibold text-[13px]" style={{ color: INK }}>
                {p.label}
              </p>
              <p className="text-[11px] text-[#9C9EBD]">{p.blurb}</p>
            </div>
            {ctx.persona === p.key && <Check size={16} color={PRIMARY} />}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}

function LanguageSheet({ ctx }) {
  const [auto, setAuto] = useState(false);
  return (
    <BottomSheet
      open={ctx.languageSheetOpen}
      onClose={ctx.closeLanguageSheet}
      title="Language"
    >
      <button
        onClick={() => setAuto((v) => !v)}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#F5F5FA] mb-3"
      >
        <span className="font-semibold text-[13px]" style={{ color: INK }}>
          Auto-detect
        </span>
        <div
          className={cx(
            "w-10 h-6 rounded-full relative transition",
            auto ? "" : "bg-[#D6D7EE]",
          )}
          style={auto ? { background: PRIMARY } : {}}
        >
          <div
            className={cx(
              "w-4.5 h-4.5 bg-white rounded-full absolute top-[3px] transition",
              auto ? "left-[19px]" : "left-[3px]",
            )}
            style={{ width: 18, height: 18 }}
          />
        </div>
      </button>
      <div className="flex flex-col gap-1">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            disabled={auto}
            onClick={() => {
              ctx.setLanguage(l.code);
              ctx.closeLanguageSheet();
            }}
            className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#F5F5FA] disabled:opacity-40 text-left"
          >
            <span className="text-[13px] font-medium" style={{ color: INK }}>
              {l.label}
            </span>
            {ctx.language === l.code && !auto && (
              <Check size={15} color={PRIMARY} />
            )}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
}

/* ---------------- 3d. Study Tools tab ---------------- */
function StudyToolsTab({ ctx }) {
  const { space, viewMode, setViewMode, pickToolInChat } = ctx;
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader
          title="Study Tools"
          sub={`${space.studyAids.length} generated`}
        />
        <div className="flex items-center gap-1.5 -mt-3">
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="w-8 h-8 rounded-lg bg-white border border-[#EEEEF6] flex items-center justify-center"
          >
            {viewMode === "grid" ? (
              <List size={13} />
            ) : (
              <LayoutGrid size={13} />
            )}
          </button>
        </div>
      </div>
      <Btn
        variant="secondary"
        icon={Plus}
        className="w-full mb-5"
        onClick={() => ctx.openToolPicker()}
      >
        Generate new
      </Btn>
      {space.studyAids.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No study tools yet"
          sub="Generate flashcards, quizzes, guides, and more from your sources."
        />
      ) : (
        <div
          className={cx(
            viewMode === "grid"
              ? "grid grid-cols-2 gap-3"
              : "flex flex-col gap-2.5",
          )}
        >
          {space.studyAids.map((a) => {
            const info = toolInfo(a.type);
            return (
              <Card
                key={a.id}
                onClick={() => ctx.openAidViewer(a)}
                className={cx(
                  "p-3.5 relative",
                  viewMode === "list" && "flex items-center gap-3",
                )}
              >
                {a.completed && (
                  <div className="absolute top-2.5 right-2.5">
                    <CheckCircle2 size={15} color="#16A34A" />
                  </div>
                )}
                <div
                  className={cx(
                    "rounded-xl flex items-center justify-center shrink-0",
                    viewMode === "grid" ? "w-10 h-10 mb-3" : "w-11 h-11",
                  )}
                  style={{ background: info.color + "1A" }}
                >
                  <info.icon size={18} color={info.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-[13px] leading-snug lc-2"
                    style={{ color: INK }}
                  >
                    {a.title}
                  </p>
                  <p className="text-[10.5px] text-[#9C9EBD] mt-1">
                    {info.label} · {a.meta}
                  </p>
                  <p className="text-[10px] text-[#C7C8DE] mt-0.5">{a.date}</p>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Study aid viewer — type-specific mock rendering */
const MOCK_FLASHCARDS = [
  {
    q: "What does the 'T' in STP stand for?",
    a: "Targeting — selecting which segment(s) to serve.",
  },
  {
    q: "Define market segmentation.",
    a: "Dividing a broad market into distinct subgroups of consumers with shared characteristics.",
  },
  {
    q: "What's a positioning statement?",
    a: "A concise statement of how a brand is differentiated in the mind of the target customer.",
  },
  {
    q: "Name one segmentation criterion.",
    a: "Demographic, geographic, psychographic, or behavioural.",
  },
];
const MOCK_QUIZ = [
  {
    q: "Which is NOT a common segmentation base?",
    options: ["Demographic", "Behavioural", "Alphabetical", "Psychographic"],
    correct: 2,
  },
  {
    q: "Positioning is primarily about:",
    options: [
      "Factory location",
      "Perception in the customer's mind",
      "Pricing formula",
      "Legal compliance",
    ],
    correct: 1,
  },
  {
    q: "A good target segment should be:",
    options: [
      "Vague",
      "Unmeasurable",
      "Substantial & reachable",
      "Identical to competitors'",
    ],
    correct: 2,
  },
];

function StudyAidModal({ ctx }) {
  const { viewingAid, closeAidViewer } = ctx;
  if (!viewingAid) return null;
  const info = toolInfo(viewingAid.type);
  return (
    <Modal
      open={!!viewingAid}
      onClose={closeAidViewer}
      title={viewingAid.title}
      wide
    >
      <div className="flex items-center gap-2 mb-4 -mt-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: info.color + "1A" }}
        >
          <info.icon size={15} color={info.color} />
        </div>
        <span className="text-xs text-[#9C9EBD]">
          {info.label} · {viewingAid.meta}
        </span>
      </div>
      {viewingAid.type === "flashcards" && <FlashcardViewer />}
      {viewingAid.type === "quiz" && <QuizViewer aid={viewingAid} ctx={ctx} />}
      {viewingAid.type === "studyguide" && <StudyGuideViewer />}
      {viewingAid.type === "studypacket" && <StudyGuideViewer packet />}
      {viewingAid.type === "mathbundle" && <MathBundleViewer />}
      {viewingAid.type === "podcast" && <PodcastViewer />}
      {viewingAid.type === "videosummary" && <VideoSummaryViewer />}
      {viewingAid.type === "presentation" && <PresentationViewer />}
      {viewingAid.type === "mindmap" && <MindMapViewer />}
      {viewingAid.type === "notes" && <StudyGuideViewer />}
    </Modal>
  );
}

function FlashcardViewer() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const c = MOCK_FLASHCARDS[i % MOCK_FLASHCARDS.length];
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center p-6 text-center shadow-sm border border-[#EEEEF6]"
        style={{ background: flipped ? "#FFEBE9" : "white" }}
      >
        <p
          className="font-semibold text-[15px] leading-relaxed"
          style={{ color: INK }}
        >
          {flipped ? c.a : c.q}
        </p>
      </button>
      <p className="text-[11px] text-[#9C9EBD] mt-2">Tap card to flip</p>
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => {
            setI((v) => Math.max(0, v - 1));
            setFlipped(false);
          }}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-semibold text-[#6B6D8C]">
          {i + 1} / {MOCK_FLASHCARDS.length}
        </span>
        <button
          onClick={() => {
            setI((v) => (v + 1) % MOCK_FLASHCARDS.length);
            setFlipped(false);
          }}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function QuizViewer({ aid, ctx }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = MOCK_QUIZ[i];

  const pick = (idx) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 < MOCK_QUIZ.length) {
      setI((v) => v + 1);
      setPicked(null);
    } else {
      setDone(true);
      ctx.completeQuiz(aid);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center text-center py-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
          style={{ background: "#FFEBE9" }}
        >
          <Trophy size={26} color={PRIMARY} />
        </div>
        <p className="font-bold text-lg" style={{ color: INK }}>
          {score} / {MOCK_QUIZ.length} correct
        </p>
        <p className="text-xs text-[#9C9EBD] mt-1">
          +20 points added to your Learning Rewards
        </p>
        <Btn className="mt-5" onClick={ctx.closeAidViewer}>
          Done
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[11px] font-semibold text-[#9C9EBD] mb-2">
        Question {i + 1} of {MOCK_QUIZ.length}
      </p>
      <p className="font-semibold text-[14px] mb-4" style={{ color: INK }}>
        {q.q}
      </p>
      <div className="flex flex-col gap-2 mb-5">
        {q.options.map((o, idx) => {
          const isCorrect = idx === q.correct;
          const isPicked = idx === picked;
          let style = "bg-[#F5F5FA] border-transparent";
          if (picked !== null && isCorrect)
            style = "bg-green-50 border-green-400";
          else if (picked !== null && isPicked)
            style = "bg-red-50 border-red-300";
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              className={cx(
                "w-full text-left px-4 py-3 rounded-xl border text-[13px] font-medium",
                style,
              )}
              style={{ color: INK }}
            >
              {o}
            </button>
          );
        })}
      </div>
      <Btn className="w-full" disabled={picked === null} onClick={next}>
        {i + 1 === MOCK_QUIZ.length ? "Finish" : "Next"}
      </Btn>
    </div>
  );
}

function StudyGuideViewer({ packet }) {
  const sections = [
    {
      h: "Overview",
      b: "A quick refresher of the core concepts covered across your sources, condensed into digestible sections.",
    },
    {
      h: "Key definitions",
      b: "Segmentation, targeting, positioning, and the criteria used to evaluate each segment.",
    },
    {
      h: "Worked example",
      b: "A retail case walking through how a real brand applied STP to enter a new market.",
    },
    {
      h: "Common pitfalls",
      b: "Segmenting too broadly, ignoring reachability, and positioning against the wrong competitor.",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {packet && (
        <div
          className="rounded-xl bg-[#FFEBE9] p-3 text-[12px]"
          style={{ color: INK }}
        >
          This packet bundles your study guide, flashcards, and quiz into one
          export.
        </div>
      )}
      {sections.map((s, i) => (
        <div key={i}>
          <p className="font-semibold text-[13px] mb-1" style={{ color: INK }}>
            {s.h}
          </p>
          <p className="text-[12.5px] text-[#6B6D8C] leading-relaxed">{s.b}</p>
        </div>
      ))}
    </div>
  );
}

function PodcastViewer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(20);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () => setProgress((p) => (p >= 100 ? 100 : p + 2)),
      400,
    );
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div className="flex flex-col items-center py-2">
      <div
        className="w-28 h-28 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: `linear-gradient(135deg, ${AMBER}, #FBCB7A)` }}
      >
        <Mic size={36} color="white" />
      </div>
      <div className="w-full h-1.5 rounded-full bg-[#EDEDF6] mb-2 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, background: AMBER }}
        />
      </div>
      <div className="flex items-center justify-between w-full text-[10px] text-[#9C9EBD] mb-5">
        <span>{Math.round((progress / 100) * 9)}:00</span>
        <span>9:00</span>
      </div>
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-md"
        style={{ background: AMBER }}
      >
        {playing ? (
          <Pause size={22} color="white" />
        ) : (
          <PlayCircle size={26} color="white" />
        )}
      </button>
      <p className="text-[11px] text-[#9C9EBD] mt-4 text-center">
        A 2-host recap discussing key takeaways from your sources.
      </p>
    </div>
  );
}

function VideoSummaryViewer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-[#0EA5E9]/10 aspect-video flex items-center justify-center">
        <Video size={26} color="#0EA5E9" />
      </div>
      <div>
        <p className="text-xs font-semibold text-[#6B6D8C] mb-1.5">
          Key points
        </p>
        <ul className="flex flex-col gap-1.5">
          {[
            "Segmentation criteria explained with examples",
            "A worked targeting decision",
            "Positioning statement template",
          ].map((p, i) => (
            <li key={i} className="text-[13px] text-[#4B4D6B] flex gap-2">
              <span style={{ color: "#0EA5E9" }}>•</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PresentationViewer() {
  const slides = [
    "Title: STP Framework",
    "Segmentation criteria",
    "Targeting decision matrix",
    "Positioning map",
    "Recap & next steps",
  ];
  const [i, setI] = useState(0);
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full aspect-video rounded-2xl border border-[#EEEEF6] flex items-center justify-center p-6 mb-3"
        style={{ background: "#F5F5FA" }}
      >
        <p
          className="font-bold text-center"
          style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
        >
          {slides[i]}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-xs font-semibold text-[#6B6D8C]">
          Slide {i + 1} / {slides.length}
        </span>
        <button
          onClick={() => setI((v) => Math.min(slides.length - 1, v + 1))}
          className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

const MOCK_MATH_BUNDLE = [
  {
    problem: "Differentiate f(x) = 3x² + 5x − 2",
    answer: "f′(x) = 6x + 5",
    steps: [
      {
        label: "Apply the power rule to each term",
        expr: "d/dx [3x²] = 3 · 2x¹ = 6x",
      },
      { label: "Differentiate the linear term", expr: "d/dx [5x] = 5" },
      { label: "Constant term vanishes", expr: "d/dx [−2] = 0" },
      { label: "Combine all terms", expr: "f′(x) = 6x + 5" },
    ],
  },
  {
    problem: "Solve for x: 2x + 7 = 19",
    answer: "x = 6",
    steps: [
      {
        label: "Subtract 7 from both sides",
        expr: "2x + 7 − 7 = 19 − 7  →  2x = 12",
      },
      { label: "Divide both sides by 2", expr: "2x ÷ 2 = 12 ÷ 2  →  x = 6" },
      {
        label: "Verify by substituting back",
        expr: "2(6) + 7 = 12 + 7 = 19  ✓",
      },
    ],
  },
  {
    problem: "Evaluate ∫(4x³) dx",
    answer: "x⁴ + C",
    steps: [
      {
        label: "Apply the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1)",
        expr: "∫4x³ dx = 4 · x³⁺¹/(3+1)",
      },
      {
        label: "Simplify the exponent and denominator",
        expr: "= 4 · x⁴/4 = x⁴",
      },
      { label: "Add the constant of integration", expr: "= x⁴ + C" },
    ],
  },
  {
    problem: "Simplify: (x² − 9) / (x − 3)",
    answer: "x + 3",
    steps: [
      {
        label: "Recognise x² − 9 as a difference of squares",
        expr: "x² − 9 = (x + 3)(x − 3)",
      },
      { label: "Rewrite the expression", expr: "(x + 3)(x − 3) / (x − 3)" },
      { label: "Cancel the common factor (x ≠ 3)", expr: "= x + 3" },
    ],
  },
  {
    problem: "Find the limit as x→0 of sin(x)/x",
    answer: "1",
    steps: [
      {
        label: "Direct substitution gives 0/0 — indeterminate form",
        expr: "sin(0)/0 = 0/0  (indeterminate)",
      },
      {
        label:
          "Apply L'Hôpital's Rule: differentiate numerator and denominator",
        expr: "lim x→0  cos(x)/1",
      },
      { label: "Substitute x = 0", expr: "cos(0) / 1 = 1 / 1 = 1" },
      {
        label:
          "Alternatively, this is a standard limit proved by the squeeze theorem",
        expr: "lim x→0  sin(x)/x = 1  ✓",
      },
    ],
  },
  {
    problem: "Factor: x² − 5x + 6",
    answer: "(x − 2)(x − 3)",
    steps: [
      {
        label: "Find two numbers that multiply to +6 and add to −5",
        expr: "−2 × −3 = 6  and  −2 + (−3) = −5  ✓",
      },
      {
        label: "Rewrite the middle term using those numbers",
        expr: "x² − 2x − 3x + 6",
      },
      { label: "Group and factor each pair", expr: "x(x − 2) − 3(x − 2)" },
      { label: "Factor out the common binomial", expr: "(x − 2)(x − 3)" },
    ],
  },
];

function MathBundleViewer() {
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const p = MOCK_MATH_BUNDLE[i];
  return (
    <div className="flex flex-col">
      <p className="text-[11px] font-semibold text-[#9C9EBD] mb-2">
        Problem {i + 1} of {MOCK_MATH_BUNDLE.length}
      </p>
      <div
        className="rounded-2xl border border-[#EEEEF6] p-4 mb-3"
        style={{ background: "#FFF6F5" }}
      >
        <p
          className="font-mono text-[14px] font-semibold"
          style={{ color: INK }}
        >
          {p.problem}
        </p>
      </div>
      {revealed ? (
        <div className="mb-4">
          {/* Step-by-step */}
          <p className="text-[11px] font-bold text-[#9C9EBD] uppercase tracking-wide mb-2.5">
            Step-by-step solution
          </p>
          <div className="flex flex-col gap-2 mb-3">
            {p.steps.map((s, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#EEEEF6] bg-white px-3 py-2.5"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                    style={{ background: PRIMARY }}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] text-[#6B6D8C] mb-1">
                      {s.label}
                    </p>
                    <p
                      className="font-mono text-[13px] font-semibold"
                      style={{ color: INK }}
                    >
                      {s.expr}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Final answer banner */}
          <div
            className="rounded-xl px-3.5 py-2.5 flex items-center justify-between"
            style={{ background: "#FFEBE9" }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-wide"
              style={{ color: PRIMARY }}
            >
              Final Answer
            </span>
            <span
              className="font-mono font-bold text-sm"
              style={{ color: INK }}
            >
              {p.answer}
            </span>
          </div>
        </div>
      ) : (
        <Btn
          variant="secondary"
          className="mb-4 w-full"
          onClick={() => setRevealed(true)}
        >
          Show step-by-step solution
        </Btn>
      )}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => {
            setI((v) => Math.max(0, v - 1));
            setRevealed(false);
          }}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs font-semibold text-[#6B6D8C]">
          {i + 1} / {MOCK_MATH_BUNDLE.length}
        </span>
        <button
          onClick={() => {
            setI((v) => (v + 1) % MOCK_MATH_BUNDLE.length);
            setRevealed(false);
          }}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function MindMapViewer() {
  const nodes = [
    { x: 150, y: 30, label: "STP Framework", core: true },
    { x: 40, y: 110, label: "Segmentation" },
    { x: 150, y: 130, label: "Targeting" },
    { x: 260, y: 110, label: "Positioning" },
  ];
  return (
    <svg viewBox="0 0 300 180" className="w-full">
      {nodes.slice(1).map((n, i) => (
        <line
          key={i}
          x1={150}
          y1={45}
          x2={n.x}
          y2={n.y - 10}
          stroke="#D6D7EE"
          strokeWidth={2}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - 45}
            y={n.y - 16}
            width={90}
            height={32}
            rx={16}
            fill={n.core ? PRIMARY : "white"}
            stroke={n.core ? PRIMARY : "#E4E4F5"}
            strokeWidth={1.5}
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize={9.5}
            fontWeight={700}
            fill={n.core ? "white" : INK}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------- 3e. Notes tab ---------------- */
function NotesTab({ ctx }) {
  const { space, openWhiteboard, showToast } = ctx;
  const folders = [
    "All",
    ...Array.from(new Set(space.notes.map((n) => n.folder))),
  ];
  const [folder, setFolder] = useState("All");
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [summarised, setSummarised] = useState({});

  const filtered =
    folder === "All"
      ? space.notes
      : space.notes.filter((n) => n.folder === folder);

  const toggleSel = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  const allSelected =
    filtered.length > 0 && filtered.every((n) => selected.includes(n.id));

  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-3">
        <SectionHeader title="Notes" sub={`${space.notes.length} total`} />
        <Btn size="sm" icon={Plus} onClick={() => openWhiteboard()}>
          Whiteboard
        </Btn>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 mb-3 no-scrollbar">
        {folders.map((f) => (
          <Chip key={f} active={folder === f} onClick={() => setFolder(f)}>
            {f === "All" ? (
              <span className="flex items-center gap-1">
                <FolderOpen size={12} />
                All
              </span>
            ) : (
              f
            )}
          </Chip>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            setSelectMode((v) => !v);
            setSelected([]);
          }}
          className="text-xs font-semibold"
          style={{ color: PRIMARY }}
        >
          {selectMode ? "Cancel" : "Select"}
        </button>
        {selectMode && (
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setSelected(allSelected ? [] : filtered.map((n) => n.id))
              }
              className="text-xs font-semibold text-[#6B6D8C]"
            >
              {allSelected ? "Deselect all" : "Select all"}
            </button>
            <button
              onClick={() => showToast("Downloaded", Download)}
              disabled={!selected.length}
              className="w-8 h-8 rounded-lg bg-white border border-[#EEEEF6] flex items-center justify-center disabled:opacity-30"
            >
              <Download size={13} />
            </button>
            <button
              onClick={() => showToast("Shared", Share2)}
              disabled={!selected.length}
              className="w-8 h-8 rounded-lg bg-white border border-[#EEEEF6] flex items-center justify-center disabled:opacity-30"
            >
              <Share2 size={13} />
            </button>
            <button
              onClick={() => {
                ctx.deleteNotes(selected);
                setSelected([]);
              }}
              disabled={!selected.length}
              className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center disabled:opacity-30"
            >
              <Trash2 size={13} color="#DC2626" />
            </button>
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={PenSquare}
          title="No notes here yet"
          sub="Create a whiteboard or add notes from chat to see them here."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((n) => (
            <Card key={n.id} className="p-3.5">
              <div className="flex items-start gap-3">
                {selectMode && (
                  <button
                    onClick={() => toggleSel(n.id)}
                    className={cx(
                      "w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 mt-0.5",
                      selected.includes(n.id)
                        ? "border-transparent"
                        : "border-[#D6D7EE]",
                    )}
                    style={
                      selected.includes(n.id) ? { background: PRIMARY } : {}
                    }
                  >
                    {selected.includes(n.id) && (
                      <Check size={12} color="white" />
                    )}
                  </button>
                )}
                {n.kind === "whiteboard" ? (
                  <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center overflow-hidden bg-[#FFEBE9]">
                    {n.thumb ? (
                      <img
                        src={n.thumb}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Palette size={16} color={PRIMARY} />
                    )}
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: "#FBF3E4" }}
                  >
                    <StickyNote size={16} color={AMBER} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-[13px]"
                    style={{ color: INK }}
                  >
                    {n.title}
                  </p>
                  <p className="text-[12px] text-[#8688A6] lc-2 mt-0.5">
                    {n.preview}
                  </p>
                  <p className="text-[10px] text-[#C7C8DE] mt-1">
                    Edited {n.editedDate} · {n.editedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pl-0">
                <button
                  onClick={() =>
                    setSummarised((s) => ({ ...s, [n.id]: !s[n.id] }))
                  }
                  className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-[#FFEBE9]"
                  style={{ color: PRIMARY }}
                >
                  <Sparkles size={11} /> AI Summarise
                </button>
                {n.kind === "whiteboard" && (
                  <button
                    onClick={() => openWhiteboard(n)}
                    className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-[#F5F5FA] text-[#6B6D8C]"
                  >
                    <Pencil size={11} /> Edit
                  </button>
                )}
              </div>
              {summarised[n.id] && (
                <div className="mt-2.5 rounded-xl bg-[#F5F5FA] p-3 text-[12px] leading-relaxed text-[#4B4D6B]">
                  <span className="font-semibold" style={{ color: INK }}>
                    Summary:{" "}
                  </span>
                  {n.preview.split(" ").slice(0, 12).join(" ")}… condensed to
                  the essentials — three key ideas worth remembering for review.
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- 3f. Space Chat tab ---------------- */
function SpaceChatTab({ ctx }) {
  const { spaceChatMessages, postSpaceChat, addResourceToSources } = ctx;
  const [text, setText] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [spaceChatMessages.length]);

  return (
    <div className="flex flex-col pb-6">
      {/* Online members strip */}
      <div className="flex items-center gap-2.5 mb-4 bg-white rounded-2xl px-3.5 py-2.5 border border-[#EEEEF6]">
        <div className="flex items-center gap-1 mr-1">
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-[11px] text-[#9C9EBD] font-medium">Online</span>
        </div>
        {PEERS.map((p) => (
          <div key={p.id} className="relative shrink-0">
            <Avatar name={p.name} color={p.color} size={28} />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white" />
          </div>
        ))}
        <span className="ml-auto text-[11px] text-[#9C9EBD]">
          {PEERS.length} here
        </span>
      </div>

      {/* Shared resources collapsible */}
      <button
        onClick={() => setPanelOpen((v) => !v)}
        className="w-full flex items-center justify-between mb-3"
      >
        <SectionHeader title="Shared resources" />
        {panelOpen ? (
          <ChevronUp size={16} color="#9C9EBD" />
        ) : (
          <ChevronDown size={16} color="#9C9EBD" />
        )}
      </button>
      {panelOpen && (
        <div className="flex flex-col gap-2 mb-5 -mt-1">
          {SHARED_RESOURCES.map((r) => (
            <Card key={r.id} className="p-3 flex items-center gap-3">
              <Avatar name={r.peer.name} color={r.peer.color} size={28} />
              <div className="flex-1 min-w-0">
                <p
                  className="text-[12.5px] font-semibold"
                  style={{ color: INK }}
                >
                  {r.title}
                </p>
                <p className="text-[10px] text-[#9C9EBD]">
                  shared by {r.peer.name.split(" ")[0]}
                </p>
              </div>
              <Btn
                size="sm"
                variant="secondary"
                onClick={() => addResourceToSources(r)}
              >
                Add
              </Btn>
            </Card>
          ))}
        </div>
      )}

      {/* Messages */}
      <SectionHeader title="Discussion" />
      <div
        ref={scrollRef}
        className="flex flex-col gap-3 mb-3 pr-1 overflow-y-auto"
        style={{ maxHeight: "44vh" }}
      >
        {spaceChatMessages.map((m) => (
          <div key={m.id} className="flex gap-2.5">
            <Avatar name={m.peer.name} color={m.peer.color} size={30} />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[12.5px] font-bold"
                  style={{ color: INK }}
                >
                  {m.peer.name}
                </span>
                <span className="text-[10px] text-[#C7C8DE]">{m.time}</span>
              </div>
              <p className="text-[13px] text-[#4B4D6B] leading-relaxed mt-0.5">
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
            postSpaceChat(text);
            setText("");
          }
        }}
        className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#EEEEF6] sticky bottom-4 mt-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message the group…"
          className="flex-1 text-sm outline-none placeholder:text-[#9C9EBD]"
        />
        <button
          type="submit"
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: PRIMARY }}
        >
          <Send size={13} color="white" />
        </button>
      </form>
    </div>
  );
}

/* Whiteboard canvas modal */
function WhiteboardModal({ ctx }) {
  const { whiteboardOpen, closeWhiteboard, whiteboardTarget } = ctx;
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [color, setColor] = useState("#FA0F00");
  const colors = ["#FA0F00", "#E0552B", "#16A34A", "#F5A623", "#1A1A1A"];

  useEffect(() => {
    if (!whiteboardOpen) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx2d = c.getContext("2d");
    ctx2d.fillStyle = "#FFFFFF";
    ctx2d.fillRect(0, 0, c.width, c.height);
    ctx2d.lineCap = "round";
  }, [whiteboardOpen]);

  const pos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx_ = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const cy_ = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return {
      x: (cx_ / rect.width) * canvasRef.current.width,
      y: (cy_ / rect.height) * canvasRef.current.height,
    };
  };
  const start = (e) => {
    drawing.current = true;
    const { x, y } = pos(e);
    const c = canvasRef.current.getContext("2d");
    c.beginPath();
    c.moveTo(x, y);
  };
  const move = (e) => {
    if (!drawing.current) return;
    const { x, y } = pos(e);
    const c = canvasRef.current.getContext("2d");
    c.strokeStyle = color;
    c.lineWidth = 4;
    c.lineTo(x, y);
    c.stroke();
  };
  const end = () => {
    drawing.current = false;
  };

  if (!whiteboardOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-5 pb-3 border-b border-[#F0F0F8]">
        <button
          onClick={closeWhiteboard}
          className="w-9 h-9 rounded-full bg-[#F5F5FA] flex items-center justify-center"
        >
          <ArrowLeft size={16} />
        </button>
        <p className="font-semibold text-[13px]" style={{ color: INK }}>
          {whiteboardTarget ? "Edit whiteboard" : "New whiteboard"}
        </p>
        <button
          onClick={() => {
            const thumb = canvasRef.current.toDataURL();
            ctx.saveWhiteboard(thumb);
          }}
          className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
          style={{ background: PRIMARY }}
        >
          Save
        </button>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center bg-[#F7F7F5]">
        <canvas
          ref={canvasRef}
          width={360}
          height={480}
          className="rounded-2xl shadow-md border border-[#EEEEF6] touch-none max-w-full max-h-full"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      <div className="flex items-center justify-center gap-3 py-4 border-t border-[#F0F0F8]">
        <Pencil size={16} color="#6B6D8C" />
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={cx(
              "w-7 h-7 rounded-full border-2",
              color === c ? "border-[#1A1A1A]" : "border-transparent",
            )}
            style={{ background: c }}
          />
        ))}
        <button
          onClick={() => {
            const c = canvasRef.current.getContext("2d");
            c.fillStyle = "#fff";
            c.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }}
          className="w-8 h-8 rounded-full bg-[#F5F5FA] flex items-center justify-center ml-2"
        >
          <Eraser size={14} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   FLAGSHIP: LEARNING PARTNER HUB
============================================================================ */
function TopNav({ title, onBack, right }) {
  return (
    <div className="sticky top-0 z-20 bg-[#F7F7F5]/95 backdrop-blur flex items-center justify-between px-4 pt-5 pb-3">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-white border border-[#EEEEF6] flex items-center justify-center shadow-sm"
      >
        <ArrowLeft size={16} color={INK} />
      </button>
      <p
        className="font-bold text-[15px]"
        style={{ color: INK, fontFamily: "Space Grotesk, sans-serif" }}
      >
        {title}
      </p>
      <div className="w-9 h-9 flex items-center justify-center">{right}</div>
    </div>
  );
}

function LearningPartnerHub({ ctx }) {
  const { spaces, showToast, goHome } = ctx;
  const contextSource = spaces[0]?.sources?.[0];
  const [ask, setAsk] = useState("");
  const [reply, setReply] = useState(null);
  const [asking, setAsking] = useState(false);

  const submitAsk = (e) => {
    e.preventDefault();
    if (!ask.trim()) return;
    setAsking(true);
    setTimeout(() => {
      setReply(
        `Here's a quick explainer on "${ask}" — think of the core mechanism first, then the example your source gives. Want this turned into flashcards?`,
      );
      setAsking(false);
    }, 1000);
  };

  return (
    <div className="min-h-full pb-24">
      <TopNav title="Learning Partner Hub" onBack={goHome} />
      <div className="px-4">
        <div
          className="rounded-3xl p-5 mb-6"
          style={{ background: `linear-gradient(160deg, ${PRIMARY}, #FF6A5C)` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap size={18} color="white" />
            <span className="text-white font-bold text-sm">
              Collab with Edutech Platform
            </span>
          </div>
          <p className="text-white/85 text-xs leading-relaxed">
            Instant, contextual help tied to whatever source you have open — no
            need to leave your space.
          </p>
        </div>

        <SectionHeader
          title="Contextual AI help"
          sub={
            contextSource
              ? `Currently open: ${contextSource.name}`
              : "Open a source to get contextual help"
          }
        />
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} color={PRIMARY} />
            <p className="text-[13px] font-semibold" style={{ color: INK }}>
              {contextSource?.name || "No source open"}
            </p>
          </div>
          <p className="text-[12.5px] text-[#6B6D8C] leading-relaxed">
            This source covers segmentation criteria and a worked targeting
            example. Ask anything about it below and I'll answer using this
            context.
          </p>
        </Card>

        <SectionHeader title="Tutor Resources" />
        <div className="flex flex-col gap-2.5 mb-6">
          {TUTORS.map((t) => (
            <Card key={t.id} className="p-3.5 flex items-center gap-3">
              <Avatar name={t.name} color={t.color} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[13px]" style={{ color: INK }}>
                  {t.name}
                </p>
                <p className="text-[11px] text-[#9C9EBD]">
                  {t.subject} · {t.notes} shared notes
                </p>
              </div>
              <Btn
                size="sm"
                variant="secondary"
                onClick={() =>
                  showToast(`Message sent to ${t.name.split(" ")[0]}`)
                }
              >
                Message
              </Btn>
            </Card>
          ))}
        </div>

        <SectionHeader
          title="Ask in the moment"
          sub="Generate a study aid or ask a doubt instantly"
        />
        <form
          onSubmit={submitAsk}
          className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#EEEEF6] mb-3"
        >
          <Sparkles size={15} color={PRIMARY} className="shrink-0" />
          <input
            value={ask}
            onChange={(e) => setAsk(e.target.value)}
            placeholder="Ask a quick doubt…"
            className="flex-1 text-sm outline-none placeholder:text-[#9C9EBD]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: PRIMARY }}
          >
            <Send size={13} color="white" />
          </button>
        </form>
        {asking && (
          <div className="flex items-center gap-2 text-xs text-[#9C9EBD]">
            <Loader2 size={13} className="animate-spin" /> Thinking…
          </div>
        )}
        {reply && (
          <Card
            className="p-3.5 text-[13px] leading-relaxed"
            style={{ color: INK }}
          >
            {reply}
          </Card>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   FLAGSHIP: AI INTERVIEW ROOM
============================================================================ */
function InterviewRoom({ ctx }) {
  const { goHome, completeInterview } = ctx;
  const [stage, setStage] = useState("start"); // start | live | feedback
  const [role, setRole] = useState(INTERVIEW_ROLES[0]);
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [mic, setMic] = useState(true);
  const [answers, setAnswers] = useState([]);
  const questions = INTERVIEW_QUESTIONS.default;

  useEffect(() => {
    if (stage !== "live") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [stage]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const submitAnswer = () => {
    const isShort = answer.trim().length < 40;
    setAnswers((a) => [...a, { q: questions[qIndex], a: answer }]);
    setAnswer("");
    if (isShort && qIndex < questions.length) {
      // adaptive follow-up doesn't consume a question index visually; just nudge
    }
    if (qIndex + 1 < questions.length) setQIndex((i) => i + 1);
    else finish();
  };

  const finish = () => {
    setStage("feedback");
    completeInterview();
  };

  if (stage === "start") {
    return (
      <div className="min-h-full pb-24">
        <TopNav title="AI Interview Room" onBack={goHome} />
        <div className="px-4">
          <div
            className="rounded-3xl p-6 mb-6 text-center"
            style={{ background: `linear-gradient(160deg, ${INK}, #3B3870)` }}
          >
            <Mic size={30} color={AMBER} className="mx-auto mb-3" />
            <p
              className="text-white font-bold text-lg mb-1"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Live prep with feedback
            </p>
            <p className="text-white/70 text-xs">
              Role-based mock interview with adaptive follow-ups and an instant
              feedback report — no letter grades, just growth.
            </p>
          </div>
          <SectionHeader title="Choose a role" />
          <div className="flex flex-wrap gap-2 mb-6">
            {INTERVIEW_ROLES.map((r) => (
              <Chip key={r} active={role === r} onClick={() => setRole(r)}>
                {r}
              </Chip>
            ))}
          </div>
          <Btn
            className="w-full"
            size="lg"
            icon={PlayCircle}
            onClick={() => {
              setStage("live");
              setSeconds(0);
              setQIndex(0);
              setAnswers([]);
            }}
          >
            Start session
          </Btn>
        </div>
      </div>
    );
  }

  if (stage === "live") {
    return (
      <div className="min-h-full pb-24 flex flex-col">
        <TopNav
          title="Live Interview"
          onBack={() => setStage("start")}
          right={
            <button
              onClick={finish}
              className="text-[11px] font-bold"
              style={{ color: PRIMARY }}
            >
              End
            </button>
          }
        />
        <div className="px-4 flex-1 flex flex-col">
          <div className="flex flex-col items-center py-4">
            <div className="relative mb-3">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY}, #FF6A5C)`,
                }}
              >
                <UserCircle2 size={44} color="white" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-[#FA0F00]/30 animate-ping" />
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold text-[#6B6D8C]">
              <span className="flex items-center gap-1">
                <Timer size={13} /> {mmss}
              </span>
              <button
                onClick={() => setMic((m) => !m)}
                className={cx(
                  "flex items-center gap-1 px-2 py-1 rounded-full",
                  mic ? "bg-[#FFEBE9]" : "bg-red-50 text-red-600",
                )}
              >
                <Mic size={13} /> {mic ? "Live" : "Muted"}
              </button>
            </div>
          </div>
          <Card className="p-4 mb-4">
            <p className="text-[10px] font-semibold text-[#9C9EBD] mb-1.5">
              Question {qIndex + 1} of {questions.length} · {role}
            </p>
            <p
              className="font-semibold text-[14px] leading-relaxed"
              style={{ color: INK }}
            >
              {questions[qIndex]}
            </p>
          </Card>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={5}
            placeholder="Type your answer…"
            className="w-full rounded-2xl border border-[#E4E4F5] bg-white px-3.5 py-3 text-sm outline-none resize-none mb-3"
          />
          {answer.trim().length > 0 && answer.trim().length < 40 && (
            <p className="text-[11px] text-amber-600 mb-2 flex items-center gap-1">
              <Sparkles size={11} /> {INTERVIEW_QUESTIONS.followUpShort}
            </p>
          )}
          <Btn
            className="w-full"
            size="lg"
            disabled={!answer.trim()}
            onClick={submitAnswer}
          >
            {qIndex + 1 === questions.length
              ? "Submit & finish"
              : "Submit answer"}
          </Btn>
        </div>
      </div>
    );
  }

  const strengths = [
    "Clear structure in your responses (situation → action → result)",
    "Good specificity when describing your project work",
  ];
  const improve = [
    "Try quantifying impact with numbers where possible",
    "Slow down slightly on longer answers for clarity",
  ];

  return (
    <div className="min-h-full pb-24">
      <TopNav title="Instant Feedback" onBack={goHome} />
      <div className="px-4">
        <div
          className="rounded-3xl p-5 mb-6 text-center"
          style={{ background: "#FFEBE9" }}
        >
          <CheckCircle2 size={28} color={PRIMARY} className="mx-auto mb-2" />
          <p className="font-bold text-base" style={{ color: INK }}>
            Session complete
          </p>
          <p className="text-xs text-[#6B6D8C] mt-1">
            +25 points added · {answers.length} questions answered
          </p>
        </div>
        <SectionHeader title="Strengths" />
        <div className="flex flex-col gap-2 mb-6">
          {strengths.map((s, i) => (
            <Card key={i} className="p-3.5 flex items-start gap-2.5">
              <ThumbsUp size={15} color="#16A34A" className="shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#3A3C5C] leading-relaxed">{s}</p>
            </Card>
          ))}
        </div>
        <SectionHeader title="Areas to improve" />
        <div className="flex flex-col gap-2 mb-6">
          {improve.map((s, i) => (
            <Card key={i} className="p-3.5 flex items-start gap-2.5">
              <Sparkles size={15} color={AMBER} className="shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#3A3C5C] leading-relaxed">{s}</p>
            </Card>
          ))}
        </div>
        <Btn className="w-full" size="lg" onClick={goHome}>
          Finish
        </Btn>
      </div>
    </div>
  );
}

/* ============================================================================
   FLAGSHIP: SPACECHAT
============================================================================ */
function SpaceChatScreen({ ctx }) {
  const {
    goHome,
    spaceChatMessages,
    postSpaceChat,
    addResourceToSources,
    spaces,
  } = ctx;
  const [text, setText] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [spaceChatMessages.length]);

  return (
    <div className="min-h-full pb-24 flex flex-col">
      <TopNav
        title="SpaceChat"
        onBack={goHome}
        right={<Users size={16} color={INK} />}
      />
      <div className="px-4">
        <div
          className="rounded-2xl p-3.5 mb-4 flex items-center gap-2"
          style={{ background: "#FFEBE9" }}
        >
          <MessageCircle size={15} color={PRIMARY} />
          <p className="text-[12px] font-semibold" style={{ color: INK }}>
            Common Space · Marketing Strategy Fundamentals
          </p>
        </div>

        <button
          onClick={() => setPanelOpen((v) => !v)}
          className="w-full flex items-center justify-between mb-4"
        >
          <SectionHeader title="Shared resources" />
          {panelOpen ? (
            <ChevronUp size={16} color="#9C9EBD" />
          ) : (
            <ChevronDown size={16} color="#9C9EBD" />
          )}
        </button>
        {panelOpen && (
          <div className="flex flex-col gap-2 mb-6 -mt-2">
            {SHARED_RESOURCES.map((r) => (
              <Card key={r.id} className="p-3 flex items-center gap-3">
                <Avatar name={r.peer.name} color={r.peer.color} size={28} />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[12.5px] font-semibold"
                    style={{ color: INK }}
                  >
                    {r.title}
                  </p>
                  <p className="text-[10px] text-[#9C9EBD]">
                    shared by {r.peer.name.split(" ")[0]}
                  </p>
                </div>
                <Btn
                  size="sm"
                  variant="secondary"
                  onClick={() => addResourceToSources(r)}
                >
                  Add
                </Btn>
              </Card>
            ))}
          </div>
        )}

        <SectionHeader title="Discussion" />
        <div
          ref={scrollRef}
          className="flex flex-col gap-3 max-h-[38vh] overflow-y-auto mb-3 pr-1"
        >
          {spaceChatMessages.map((m) => (
            <div key={m.id} className="flex gap-2.5">
              <Avatar name={m.peer.name} color={m.peer.color} size={30} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[12.5px] font-bold"
                    style={{ color: INK }}
                  >
                    {m.peer.name}
                  </span>
                  <span className="text-[10px] text-[#C7C8DE]">{m.time}</span>
                </div>
                <p className="text-[13px] text-[#4B4D6B] leading-relaxed mt-0.5">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) {
              postSpaceChat(text);
              setText("");
            }
          }}
          className="flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-[#EEEEF6] sticky bottom-4"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask or answer the group…"
            className="flex-1 text-sm outline-none placeholder:text-[#9C9EBD]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: PRIMARY }}
          >
            <Send size={13} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   FLAGSHIP: LEARNING REWARDS
============================================================================ */
function LearningRewardsScreen({ ctx }) {
  const { goHome, points, streak, unlockedBadges, redeemPerk, redeemed } = ctx;
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const activeDays = Math.min(streak, 7);

  return (
    <div className="min-h-full pb-24">
      <TopNav title="Learning Rewards" onBack={goHome} />
      <div className="px-4">
        <div
          className="rounded-3xl p-6 mb-6 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${AMBER}, #FBCB7A)` }}
        >
          <Coins size={26} color="white" className="mx-auto mb-2" />
          <p className="text-white/90 text-xs font-semibold uppercase tracking-wide mb-1">
            Points balance
          </p>
          <p
            className="text-white font-bold text-4xl"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {points}
          </p>
        </div>

        <SectionHeader
          title="Streak"
          sub={`${streak}-day streak — keep it going`}
        />
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            {week.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div
                  className={cx(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    i < activeDays ? "" : "bg-[#F5F5FA]",
                  )}
                  style={i < activeDays ? { background: AMBER } : {}}
                >
                  <Flame
                    size={14}
                    color={i < activeDays ? "white" : "#C7C8DE"}
                  />
                </div>
                <span className="text-[10px] text-[#9C9EBD]">{d}</span>
              </div>
            ))}
          </div>
        </Card>

        <SectionHeader title="Badges" />
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {BADGES.map((b) => {
            const unlocked = unlockedBadges.includes(b.key);
            return (
              <Card
                key={b.key}
                className="p-3 flex flex-col items-center text-center gap-1.5 relative"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: unlocked ? "#FFEBE9" : "#F5F5FA" }}
                >
                  {unlocked ? (
                    <b.icon size={17} color={PRIMARY} />
                  ) : (
                    <Lock size={14} color="#C7C8DE" />
                  )}
                </div>
                <p
                  className="text-[10.5px] font-bold leading-tight"
                  style={{ color: unlocked ? INK : "#B0B1CC" }}
                >
                  {b.label}
                </p>
                <p className="text-[9px] text-[#C7C8DE] leading-tight">
                  {b.desc}
                </p>
              </Card>
            );
          })}
        </div>

        <SectionHeader title="Redeem perks" />
        <div className="flex flex-col gap-2.5">
          {PERKS.map((p) => {
            const done = redeemed.includes(p.id);
            return (
              <Card key={p.id} className="p-3.5 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#FBF3E4" }}
                >
                  <Gift size={16} color={AMBER} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-[13px]"
                    style={{ color: INK }}
                  >
                    {p.title}
                  </p>
                  <p className="text-[11px] text-[#9C9EBD] flex items-center gap-1">
                    <Coins size={10} /> {p.cost} points
                  </p>
                </div>
                <Btn
                  size="sm"
                  variant={done ? "secondary" : "primary"}
                  disabled={done || points < p.cost}
                  onClick={() => redeemPerk(p)}
                >
                  {done ? "Redeemed" : "Redeem"}
                </Btn>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SPACE PICKER + SPACE MENU SHEETS
============================================================================ */
function SpacePickerSheet({ ctx }) {
  const {
    spacePickerOpen,
    closeSpacePicker,
    spaces,
    choosePickerSpace,
    spacePickerTool,
  } = ctx;
  const [name, setName] = useState("");
  useEffect(() => {
    if (spacePickerOpen) setName("");
  }, [spacePickerOpen]);
  return (
    <BottomSheet
      open={spacePickerOpen}
      onClose={closeSpacePicker}
      title={
        spacePickerTool
          ? `Pick a space for ${toolInfo(spacePickerTool).label}`
          : "Pick a space"
      }
    >
      <div className="flex flex-col gap-2 mb-4">
        {spaces.map((s) => (
          <button
            key={s.id}
            onClick={() => choosePickerSpace(s.id)}
            className="w-full flex items-center gap-3 p-3 rounded-2xl bg-[#F5F5FA] text-left"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white shrink-0">
              <BookOpen size={15} color={PRIMARY} />
            </div>
            <span
              className="font-semibold text-[13px] flex-1 truncate"
              style={{ color: INK }}
            >
              {s.name}
            </span>
            <ChevronRight size={14} color="#C7C8DE" />
          </button>
        ))}
      </div>
      <div className="border-t border-[#F0F0F8] pt-4">
        <p className="text-xs font-semibold text-[#6B6D8C] mb-2">
          Or create a new space
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ctx.createPickerSpace(name);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New space name…"
            className="flex-1 rounded-xl border border-[#E4E4F5] px-3.5 py-2.5 text-sm outline-none"
          />
          <Btn type="submit" icon={Plus}>
            Create
          </Btn>
        </form>
      </div>
    </BottomSheet>
  );
}

function SpaceMenuSheet({ ctx }) {
  const { spaceMenuId, closeSpaceMenu, spaces } = ctx;
  const sp = spaces.find((s) => s.id === spaceMenuId);
  const [renaming, setRenaming] = useState(false);
  const [val, setVal] = useState("");
  useEffect(() => {
    setRenaming(false);
    setVal(sp?.name || "");
  }, [spaceMenuId]);
  if (!spaceMenuId) return null;
  return (
    <BottomSheet
      open={!!spaceMenuId}
      onClose={closeSpaceMenu}
      title={sp?.name || "Space"}
    >
      {renaming ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ctx.renameSpace(spaceMenuId, val || sp.name);
            closeSpaceMenu();
          }}
          className="flex items-center gap-2"
        >
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="flex-1 rounded-xl border border-[#E4E4F5] px-3.5 py-2.5 text-sm outline-none"
          />
          <Btn type="submit">Save</Btn>
        </form>
      ) : (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setRenaming(true)}
            className="w-full flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-[#F5F5FA] text-left"
          >
            <Edit3 size={15} color="#6B6D8C" />
            <span className="text-[13px] font-semibold" style={{ color: INK }}>
              Rename
            </span>
          </button>
          <button
            onClick={() => {
              ctx.deleteSpace(spaceMenuId);
              closeSpaceMenu();
            }}
            className="w-full flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-red-50 text-left"
          >
            <Trash2 size={15} color="#DC2626" />
            <span className="text-[13px] font-semibold text-red-600">
              Delete
            </span>
          </button>
        </div>
      )}
    </BottomSheet>
  );
}

/* ============================================================================
   ROOT APP
============================================================================ */
const TODAY = "July 22, 2026";

function mkEmptySpace(name) {
  return {
    id: genId("space"),
    name: name || "New Space",
    updatedAt: "Just now",
    sources: [],
    studyAids: [],
    notes: [],
    chat: [],
  };
}
function mockMetaFor(tool) {
  const metas = {
    flashcards: "18 Cards",
    quiz: "10 Questions",
    studyguide: "5 sections",
    studypacket: "Bundled set",
    mathbundle: "6 problems",
    podcast: "7 min",
    videosummary: "Key points",
    presentation: "6 slides",
    mindmap: "9 nodes",
    notes: "1 note",
  };
  return metas[tool] || "Generated";
}

export default function App() {
  const [spaces, setSpaces] = useState(INITIAL_SPACES);
  const [view, setViewRaw] = useState("home");
  const [currentSpaceId, setCurrentSpaceId] = useState(null);
  const [recentSpaceId, setRecentSpaceId] = useState(INITIAL_SPACES[0].id);
  const [spaceView, setSpaceView] = useState("dashboard");
  const [viewMode, setViewMode] = useState("grid");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [homeInput, setHomeInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [persona, setPersona] = useState("student");
  const [language, setLanguage] = useState("en");
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [toolPickerOpen, setToolPickerOpen] = useState(false);
  const [personaSheetOpen, setPersonaSheetOpen] = useState(false);
  const [languageSheetOpen, setLanguageSheetOpen] = useState(false);
  const [cloudModalOpen, setCloudModalOpen] = useState(false);
  const [viewerSource, setViewerSource] = useState(null);
  const [viewingAid, setViewingAid] = useState(null);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);
  const [whiteboardTarget, setWhiteboardTarget] = useState(null);
  const [spacePickerOpen, setSpacePickerOpen] = useState(false);
  const [spacePickerTool, setSpacePickerTool] = useState(null);
  const [spaceMenuId, setSpaceMenuId] = useState(null);
  const [pendingGen, setPendingGen] = useState(null);
  const [points, setPoints] = useState(56);
  const [streak, setStreak] = useState(3);
  const [unlockedBadges, setUnlockedBadges] = useState(["first_quiz"]);
  const [redeemed, setRedeemed] = useState([]);
  const [toast, setToast] = useState({ show: false, text: "" });
  const [pointsPop, setPointsPop] = useState(null);
  const [spaceChatMessages, setSpaceChatMessages] = useState(INITIAL_SPACECHAT);

  const space = spaces.find((s) => s.id === currentSpaceId) || null;

  const setView = (v) => setViewRaw(v);

  const showToast = useCallback((text, icon) => {
    setToast({ show: true, text, icon });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200);
  }, []);

  const bumpPointsPop = (amount) => {
    const key = genId("pop");
    setPointsPop({ key, amount });
    setTimeout(() => setPointsPop((p) => (p?.key === key ? null : p)), 1400);
  };

  const awardPoints = useCallback((amount) => {
    setPoints((p) => p + amount);
    bumpPointsPop(amount);
  }, []);
  const bumpStreak = useCallback(
    () => setStreak((s) => Math.min(s + 1, 30)),
    [],
  );
  const unlockBadge = useCallback(
    (key) =>
      setUnlockedBadges((prev) => (prev.includes(key) ? prev : [...prev, key])),
    [],
  );

  useEffect(() => {
    if (points >= 100) unlockBadge("century");
  }, [points, unlockBadge]);

  const updateSpace = useCallback((id, updater) => {
    setSpaces((prev) =>
      prev.map((s) =>
        s.id === id ? { ...updater(s), updatedAt: "Just now" } : s,
      ),
    );
  }, []);
  const addChatMessage = useCallback(
    (spaceId, msg) => {
      updateSpace(spaceId, (s) => ({ ...s, chat: [...s.chat, msg] }));
    },
    [updateSpace],
  );

  const openSpace = (id, tab = "dashboard") => {
    setCurrentSpaceId(id);
    setRecentSpaceId(id);
    setSpaceView(tab);
    setView("space");
  };
  const goHome = () => {
    setView("home");
    setSideMenuOpen(false);
  };

  const beginToolGeneration = (spaceId, tool) => {
    const label = toolInfo(tool).label;
    addChatMessage(spaceId, {
      id: genId("msg"),
      role: "user",
      text: `Generate a ${label}`,
      date: TODAY,
    });
    setTimeout(
      () =>
        addChatMessage(spaceId, {
          id: genId("msg"),
          role: "ai",
          text: `Which topic would you like this ${label} on?`,
          date: TODAY,
        }),
      350,
    );
    setPendingGen({ spaceId, tool, awaitingTopic: true });
  };

  const handleQuickAction = (key) => {
    const targetId = recentSpaceId || spaces[0]?.id;
    if (!targetId) {
      openSpacePicker(key);
      return;
    }
    openSpace(targetId, "chat");
    beginToolGeneration(targetId, key);
  };

  const checkGenBadge = useCallback(
    (spaceId) => {
      const sp = spaces.find((s) => s.id === spaceId);
      if (sp && sp.studyAids.length + 1 >= 3) unlockBadge("creator");
    },
    [spaces, unlockBadge],
  );

  const sendMessage = (spaceId, text) => {
    addChatMessage(spaceId, {
      id: genId("msg"),
      role: "user",
      text,
      date: TODAY,
    });
    setChatInput("");

    if (
      pendingGen &&
      pendingGen.spaceId === spaceId &&
      pendingGen.awaitingTopic
    ) {
      const { tool } = pendingGen;
      setPendingGen(null);
      const loadingId = genId("msg");
      addChatMessage(spaceId, {
        id: loadingId,
        role: "ai",
        text: `Generating your ${toolInfo(tool).label.toLowerCase()} on "${text}"…`,
        date: TODAY,
        loading: true,
      });
      setTimeout(() => {
        const aid = mkAid(
          tool,
          `${text} ${toolInfo(tool).label}`,
          mockMetaFor(tool),
          TODAY,
          false,
        );
        updateSpace(spaceId, (s) => ({
          ...s,
          studyAids: [aid, ...s.studyAids],
          chat: s.chat.map((m) =>
            m.id === loadingId
              ? {
                  id: genId("msg"),
                  role: "ai",
                  text: `All done — here's your ${toolInfo(tool).label.toLowerCase()}!`,
                  date: TODAY,
                  artifact: aid,
                }
              : m,
          ),
        }));
        awardPoints(10);
        checkGenBadge(spaceId);
      }, 1300);
      return;
    }

    if (isMathQuery(text)) {
      setTimeout(
        () =>
          addChatMessage(spaceId, {
            id: genId("msg"),
            role: "ai",
            text: "",
            date: TODAY,
            mathCard: buildMathSteps(text),
          }),
        700,
      );
      return;
    }

    setTimeout(() => {
      const lang = LANGUAGES.find((l) => l.code === language);
      const prefix = language !== "en" ? lang.sample + " — " : "";
      addChatMessage(spaceId, {
        id: genId("msg"),
        role: "ai",
        text: prefix + personaReply(persona, text),
        date: TODAY,
      });
    }, 800);
  };

  const submitHomeInput = (text) => {
    const sp = mkEmptySpace(text.length > 28 ? text.slice(0, 26) + "…" : text);
    setSpaces((prev) => [sp, ...prev]);
    setHomeInput("");
    setRecentSpaceId(sp.id);
    setCurrentSpaceId(sp.id);
    setSpaceView("chat");
    setView("space");
    setTimeout(() => sendMessage(sp.id, text), 0);
  };

  const ctx = {
    spaces,
    setSpaces,
    space,
    view,
    setView,
    spaceView,
    setSpaceView,
    viewMode,
    setViewMode,
    openSideMenu: () => setSideMenuOpen(true),
    points,
    streak,
    homeInput,
    setHomeInput,
    submitHomeInput,
    handleQuickAction,
    openSpace,
    goHome,
    openSpacePicker: (toolKey) => {
      setSpacePickerTool(toolKey);
      setSpacePickerOpen(true);
    },
    openSpaceMenu: (id) => setSpaceMenuId(id),
    deleteSpace: (id) => {
      setSpaces((prev) => prev.filter((s) => s.id !== id));
      if (currentSpaceId === id) goHome();
    },
    renameSpace: (id, name) =>
      setSpaces((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s))),

    // space picker sheet
    spacePickerOpen,
    spacePickerTool,
    closeSpacePicker: () => setSpacePickerOpen(false),
    choosePickerSpace: (id) => {
      setSpacePickerOpen(false);
      if (spacePickerTool) {
        openSpace(id, "chat");
        beginToolGeneration(id, spacePickerTool);
      } else openSpace(id, "dashboard");
    },
    createPickerSpace: (name) => {
      const sp = mkEmptySpace(name);
      setSpaces((prev) => [sp, ...prev]);
      setSpacePickerOpen(false);
      if (spacePickerTool) {
        openSpace(sp.id, "chat");
        beginToolGeneration(sp.id, spacePickerTool);
      } else openSpace(sp.id, "dashboard");
    },
    spaceMenuId,
    closeSpaceMenu: () => setSpaceMenuId(null),

    // dashboard/chat
    sendChatFromOutside: (text) => {
      setSpaceView("chat");
      sendMessage(space.id, text);
    },
    startQuiz: (qz) => setViewingAid(qz),
    openAidViewer: (a) => setViewingAid(a),
    closeAidViewer: () => setViewingAid(null),
    viewingAid,
    completeQuiz: (aid) => {
      updateSpace(space.id, (s) => ({
        ...s,
        studyAids: s.studyAids.map((a) =>
          a.id === aid.id ? { ...a, completed: true } : a,
        ),
      }));
      awardPoints(20);
      bumpStreak();
      unlockBadge("first_quiz");
    },

    // sources
    openViewer: (s) => setViewerSource(s),
    closeViewer: () => setViewerSource(null),
    viewerSource,
    removeSource: (id) =>
      updateSpace(space.id, (s) => ({
        ...s,
        sources: s.sources.filter((x) => x.id !== id),
      })),
    addUpload: (filename) => {
      updateSpace(space.id, (s) => ({
        ...s,
        sources: [
          mkSource(
            filename,
            "Uploaded",
            "pdf",
            Math.ceil(Math.random() * 20) + 1,
            TODAY,
          ),
          ...s.sources,
        ],
      }));
      awardPoints(5);
    },
    addPhotoSource: (result) => {
      updateSpace(space.id, (s) => ({
        ...s,
        sources: [
          mkSource("Scanned photo note", "Image Reading", "img", 1, TODAY),
          ...s.sources,
        ],
      }));
      awardPoints(5);
    },
    addLinkSource: (url, summary) => {
      updateSpace(space.id, (s) => ({
        ...s,
        sources: [
          mkSource(summary.title, "Video Link", "link", 1, TODAY),
          ...s.sources,
        ],
      }));
      awardPoints(5);
    },
    addPastedText: (text) => {
      updateSpace(space.id, (s) => ({
        ...s,
        sources: [
          mkSource(
            text.slice(0, 30) + (text.length > 30 ? "…" : ""),
            "Pasted text",
            "txt",
            1,
            TODAY,
          ),
          ...s.sources,
        ],
      }));
      awardPoints(5);
    },

    // add content sheet
    addSheetOpen,
    openAddSheet: () => setAddSheetOpen(true),
    closeAddSheet: () => setAddSheetOpen(false),
    toolPickerOpen,
    openToolPicker: () => setToolPickerOpen(true),
    closeToolPicker: () => setToolPickerOpen(false),
    generateFromPicker: (tool) => {
      setAddSheetOpen(false);
      setToolPickerOpen(false);
      setSpaceView("chat");
      beginToolGeneration(space.id, tool);
    },
    openCloudModal: () => {
      setAddSheetOpen(false);
      setCloudModalOpen(true);
    },
    cloudModalOpen,
    closeCloudModal: () => setCloudModalOpen(false),

    // chat
    chatInput,
    setChatInput,
    sendChat: (text) => sendMessage(space?.id, text),
    persona,
    setPersona,
    language,
    setLanguage,
    personaSheetOpen,
    openPersonaSheet: () => setPersonaSheetOpen(true),
    closePersonaSheet: () => setPersonaSheetOpen(false),
    languageSheetOpen,
    openLanguageSheet: () => setLanguageSheetOpen(true),
    closeLanguageSheet: () => setLanguageSheetOpen(false),
    pickToolInChat: (tool) => beginToolGeneration(space.id, tool),

    // notes
    deleteNotes: (ids) =>
      updateSpace(space.id, (s) => ({
        ...s,
        notes: s.notes.filter((n) => !ids.includes(n.id)),
      })),
    openWhiteboard: (note) => {
      setWhiteboardTarget(note || null);
      setWhiteboardOpen(true);
    },
    closeWhiteboard: () => setWhiteboardOpen(false),
    whiteboardOpen,
    whiteboardTarget,
    saveWhiteboard: (thumb) => {
      if (whiteboardTarget) {
        updateSpace(space.id, (s) => ({
          ...s,
          notes: s.notes.map((n) =>
            n.id === whiteboardTarget.id ? { ...n, thumb } : n,
          ),
        }));
      } else {
        const n = mkNote(
          "New Whiteboard",
          "Freehand sketch note",
          TODAY,
          "whiteboard",
        );
        n.thumb = thumb;
        updateSpace(space.id, (s) => ({ ...s, notes: [n, ...s.notes] }));
        awardPoints(5);
      }
      setWhiteboardOpen(false);
    },

    // flagship: spacechat
    spaceChatMessages,
    postSpaceChat: (text) =>
      setSpaceChatMessages((prev) => [
        ...prev,
        {
          id: genId("sc"),
          peer: { name: "You", color: PRIMARY },
          text,
          time: "Now",
        },
      ]),
    addResourceToSources: (resource) => {
      const targetId = space?.id || spaces[0]?.id;
      if (targetId)
        updateSpace(targetId, (s) => ({
          ...s,
          sources: [
            mkSource(
              resource.title,
              "Shared by " + resource.peer.name,
              "pdf",
              4,
              TODAY,
            ),
            ...s.sources,
          ],
        }));
      awardPoints(5);
      unlockBadge("social");
      showToast(`Added "${resource.title}" to your sources`, CheckCircle2);
    },

    // flagship: interview
    completeInterview: () => {
      awardPoints(25);
      bumpStreak();
      unlockBadge("interview1");
    },

    // flagship: rewards
    unlockedBadges,
    redeemed,
    redeemPerk: (perk) => {
      if (points < perk.cost) return;
      setPoints((p) => p - perk.cost);
      setRedeemed((prev) => [...prev, perk.id]);
      showToast(`${perk.title} redeemed!`, Gift);
    },

    showToast,
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center"
      style={{ background: "#F7F7F5", fontFamily: "Inter, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .lc-1 { display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .lc-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        @keyframes slideup { from { transform: translateY(24px); opacity: 0.6; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadein { from { opacity: 0; transform: translate(-50%, 6px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes floatup { 0% { opacity: 0; transform: translateY(6px); } 15% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(-14px); } }
        input, textarea, button { font-family: inherit; }
      `}</style>
      <div className="w-full max-w-md bg-[#F7F7F5] min-h-screen relative">
        {view === "home" && <HomeScreen ctx={ctx} />}
        {view === "space" && space && <SpaceScreen ctx={ctx} />}
        {view === "hub" && <LearningPartnerHub ctx={ctx} />}
        {view === "interview" && <InterviewRoom ctx={ctx} />}
        {view === "spacechat" && <HomeScreen ctx={ctx} />}
        {view === "rewards" && <LearningRewardsScreen ctx={ctx} />}

        <SideMenu
          open={sideMenuOpen}
          onClose={() => setSideMenuOpen(false)}
          ctx={ctx}
        />
        {space && <AddContentSheet ctx={ctx} />}
        {space && <ToolPickerSheet ctx={ctx} />}
        {space && <CloudImportModal ctx={ctx} />}
        {space && <ViewerModal ctx={ctx} />}
        <StudyAidModal ctx={ctx} />
        {space && <WhiteboardModal ctx={ctx} />}
        {space && <PersonaSheet ctx={ctx} />}
        {space && <LanguageSheet ctx={ctx} />}
        <SpacePickerSheet ctx={ctx} />
        <SpaceMenuSheet ctx={ctx} />
        <Toast toast={toast} />
        <PointsPop pop={pointsPop} />
      </div>
    </div>
  );
}
