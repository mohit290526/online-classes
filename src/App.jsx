import { useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Video, FileText, ClipboardList, CalendarCheck,
  UserCircle, Users, GraduationCap, LogOut, Plus, Play, Pause, Download,
  Search, Phone, MapPin, Instagram, ChevronRight, ChevronLeft, CheckCircle2,
  Circle, X, Menu, Building2, ClipboardCheck, Layers, Wallet, CalendarClock,
} from "lucide-react";

/* =========================================================================
   BRAND TOKENS — same palette as the public branding site (navy/orange).
   ========================================================================= */
const BRAND = {
  navy: "#0B2A5B",
  navyDeep: "#06183A",
  royal: "#1746A2",
  orange: "#F26522",
  amber: "#FFB020",
  sky: "#EDF3FC",
  skyDeep: "#DCE8F9",
  line: "#D9E3F2",
  ink: "#1B2A44",
  muted: "#5A6B85",
};

/* =========================================================================
   MOCK DATA — Class 11 & 12 Commerce ONLY. No other class/stream exists
   in this scope. Names, phone digits and experience are placeholders —
   replace with real records before going live.
   When this becomes the real app, this block moves to src/data/*.
   ========================================================================= */

const OWNER = {
  name: "Owner Name",
  role: "Founder & Director",
  phone: "7982726566",
  note: "placeholder — add real name and photo",
};

const TEACHERS_SEED = [
  { id: "t1", name: "Teacher Name 1", subject: "Accountancy", experience: "— add years", phone: "9289878511", batchIds: ["c11", "c12"] },
  { id: "t2", name: "Teacher Name 2", subject: "Business Studies & Economics", experience: "— add years", phone: "8700373944", batchIds: ["c11", "c12"] },
];

const BATCHES_SEED = [
  { id: "c11", classLevel: "Class 11", stream: "Commerce", label: "Class 11 — Commerce", teacherId: "t2" },
  { id: "c12", classLevel: "Class 12", stream: "Commerce", label: "Class 12 — Commerce", teacherId: "t1" },
];

const SUBJECTS = ["Accountancy", "Business Studies", "Economics", "English"];

const STUDENTS_SEED = [
  { id: "s1", name: "Aarav Mehta", batchId: "c12", parent: "Sanjay Mehta", phone: "98xxxxxx01", attendance: 96 },
  { id: "s2", name: "Diya Patel", batchId: "c12", parent: "Ketan Patel", phone: "98xxxxxx02", attendance: 92 },
  { id: "s3", name: "Kabir Sharma", batchId: "c11", parent: "Meenakshi Sharma", phone: "98xxxxxx03", attendance: 89 },
  { id: "s4", name: "Sneha Roy", batchId: "c11", parent: "Arindam Roy", phone: "98xxxxxx04", attendance: 98 },
  { id: "s5", name: "Rohan Gupta", batchId: "c12", parent: "Vikram Gupta", phone: "98xxxxxx05", attendance: 88 },
  { id: "s6", name: "Ananya Verma", batchId: "c11", parent: "Arvind Verma", phone: "98xxxxxx06", attendance: 90 },
];

// Logged-in demo student — Aarav Mehta, Class 12 Commerce
const DEMO_STUDENT_ID = "s1";

const COURSE_MODULES = {
  c12: [
    {
      id: "m1", title: "Accountancy — Partnership Accounts",
      lessons: [
        { id: "l1", title: "Fundamentals of Partnership", duration: "32 min" },
        { id: "l2", title: "Admission of a Partner", duration: "48 min" },
        { id: "l3", title: "Reconstitution — Change in PSR", duration: "40 min" },
      ],
    },
    {
      id: "m2", title: "Business Studies — Principles of Management",
      lessons: [{ id: "l4", title: "Fayol vs Taylor", duration: "35 min" }],
    },
  ],
  c11: [
    {
      id: "m3", title: "Economics — Money & Banking",
      lessons: [
        { id: "l5", title: "Functions of Money", duration: "30 min" },
        { id: "l6", title: "Credit Creation by Banks", duration: "34 min" },
      ],
    },
    {
      id: "m4", title: "Accountancy — Recording Transactions",
      lessons: [{ id: "l7", title: "Journal Entries — Basics", duration: "28 min" }],
    },
  ],
};

const INITIAL_COMPLETED = new Set(["l1", "l2", "l4"]);

const LIVE_CLASSES = [
  { id: "lc1", batchId: "c12", subject: "Accountancy", teacher: "Teacher Name 1", when: "Today · 7:00 – 8:30 PM", status: "live" },
  { id: "lc2", batchId: "c12", subject: "Business Studies", teacher: "Teacher Name 2", when: "Tomorrow · 6:00 – 7:00 PM", status: "upcoming" },
  { id: "lc3", batchId: "c11", subject: "Economics", teacher: "Teacher Name 2", when: "Today · 5:30 – 7:00 PM", status: "upcoming" },
  { id: "lc4", batchId: "c11", subject: "Accountancy", teacher: "Teacher Name 1", when: "Mon, 8 Sep · 7:00 – 8:00 PM", status: "completed" },
];

const STUDY_MATERIAL = {
  c12: [
    { id: "sm1", title: "Partnership Accounts — Formula Sheet", subject: "Accountancy" },
    { id: "sm2", title: "Fayol vs Taylor — Comparison Notes", subject: "Business Studies" },
  ],
  c11: [
    { id: "sm3", title: "Money & Banking — Notes", subject: "Economics" },
    { id: "sm4", title: "Journal Entries — Practice Sheet", subject: "Accountancy" },
  ],
};

const TESTS = {
  c12: [
    { id: "tt1", subject: "Accountancy", topic: "Admission of a Partner", date: "2 Sep", status: "completed", score: 34, max: 40 },
    { id: "tt2", subject: "Business Studies", topic: "Principles of Management", date: "12 Sep", status: "upcoming", score: null, max: 20 },
  ],
  c11: [
    { id: "tt3", subject: "Economics", topic: "Money & Banking", date: "10 Sep", status: "upcoming", score: null, max: 20 },
  ],
};

const ATTENDANCE_LOG = {
  c12: [
    { date: "Mon, 1 Sep", status: "present" }, { date: "Tue, 2 Sep", status: "present" },
    { date: "Wed, 3 Sep", status: "absent" }, { date: "Thu, 4 Sep", status: "present" },
    { date: "Fri, 5 Sep", status: "present" }, { date: "Mon, 8 Sep", status: "present" },
  ],
  c11: [
    { date: "Mon, 1 Sep", status: "present" }, { date: "Tue, 2 Sep", status: "present" },
    { date: "Wed, 3 Sep", status: "present" }, { date: "Thu, 4 Sep", status: "absent" },
  ],
};

const FEES_SEED = {
  s1: { status: "paid", amount: 4200, mode: "UPI", lastPaymentDate: "5 Oct" },
  s2: { status: "paid", amount: 4200, mode: "Netbanking", lastPaymentDate: "4 Oct" },
  s3: { status: "due", amount: 4200, dueDate: "10 Oct" },
  s4: { status: "paid", amount: 4200, mode: "UPI", lastPaymentDate: "1 Oct" },
  s5: { status: "due", amount: 4200, dueDate: "10 Oct" },
  s6: { status: "paid", amount: 4200, mode: "UPI", lastPaymentDate: "3 Oct" },
};

const AVAILABILITY = {
  t1: [
    { date: "Today", slots: ["4:00 PM", "4:30 PM", "5:00 PM"] },
    { date: "Tomorrow", slots: ["11:00 AM", "11:30 AM"] },
  ],
  t2: [
    { date: "Today", slots: ["6:00 PM"] },
    { date: "Tomorrow", slots: ["10:00 AM", "10:30 AM", "12:00 PM"] },
  ],
};

const BOOKINGS_SEED = [
  { id: "bk1", studentId: "s1", teacherId: "t1", date: "Thu, Oct 24", time: "5:30 PM", topic: "Goodwill treatment doubt", status: "upcoming" },
];

/* =========================================================================
   SHARED PIECES
   ========================================================================= */
function Badge({ children, tone = "sky" }) {
  const tones = {
    sky: { background: BRAND.sky, color: BRAND.royal },
    live: { background: "#FEE2E2", color: "#B91C1C" },
    upcoming: { background: "#FFF4E5", color: "#B25E09" },
    done: { background: "#E7F6EC", color: "#15803D" },
    navy: { background: BRAND.navy, color: "#fff" },
  };
  return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={tones[tone] || tones.sky}>{children}</span>;
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.muted }}>{label}</p>
      <p className="mt-2 text-3xl font-extrabold" style={{ color: BRAND.navy }}>{value}</p>
      {sub && <p className="mt-1 text-xs" style={{ color: BRAND.muted }}>{sub}</p>}
    </div>
  );
}

function Avatar({ name, size = 40 }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div className="rounded-full flex items-center justify-center font-bold flex-none" style={{ width: size, height: size, background: BRAND.skyDeep, color: BRAND.royal, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

function PrimaryButton({ children, onClick, icon: Icon, full, small }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 font-bold rounded-full transition-transform hover:-translate-y-0.5 ${full ? "w-full" : ""} ${small ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"}`} style={{ background: BRAND.orange, color: "#fff" }}>
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}

function GhostButton({ children, onClick, icon: Icon, full, small }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-2 font-bold rounded-full border-2 transition-colors ${full ? "w-full" : ""} ${small ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm"}`} style={{ borderColor: BRAND.navy, color: BRAND.navy }}>
      {Icon && <Icon size={16} />} {children}
    </button>
  );
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors text-left" style={active ? { background: BRAND.navy, color: "#fff" } : { color: BRAND.ink }}>
      <Icon size={18} /> {label}
    </button>
  );
}

function PlaceholderNote({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold mb-4" style={{ background: "#FFF6E9", color: "#8A5A12", border: "1px dashed " + BRAND.amber }}>
      {children}
    </div>
  );
}

/* =========================================================================
   SIDEBAR SHELL
   ========================================================================= */
function Shell({ roleLabel, roleName, navItems, activeKey, onSelect, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen flex" style={{ background: BRAND.sky, fontFamily: "system-ui, sans-serif" }}>
      <aside className="hidden md:flex md:flex-col w-64 flex-none bg-white border-r p-5" style={{ borderColor: BRAND.line }}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: BRAND.navy }}>
            <GraduationCap size={20} color={BRAND.amber} />
          </div>
          <div>
            <p className="font-extrabold text-sm leading-tight" style={{ color: BRAND.navy }}>VRIDHI ACADEMY</p>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: BRAND.orange }}>{roleLabel}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {navItems.map((it) => <NavItem key={it.key} icon={it.icon} label={it.label} active={activeKey === it.key} onClick={() => onSelect(it.key)} />)}
        </nav>
        <div className="pt-4 border-t" style={{ borderColor: BRAND.line }}>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Avatar name={roleName} size={32} />
            <div className="min-w-0">
              <p className="text-sm font-bold truncate" style={{ color: BRAND.navy }}>{roleName}</p>
              <p className="text-xs" style={{ color: BRAND.muted }}>{roleLabel}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold" style={{ color: BRAND.muted }}>
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b flex items-center justify-between px-4 py-3" style={{ borderColor: BRAND.line }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: BRAND.navy }}>
            <GraduationCap size={16} color={BRAND.amber} />
          </div>
          <p className="font-extrabold text-sm" style={{ color: BRAND.navy }}>VRIDHI · {roleLabel}</p>
        </div>
        <button onClick={() => setMobileOpen(true)}><Menu size={22} color={BRAND.navy} /></button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-white p-5 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <p className="font-extrabold text-sm" style={{ color: BRAND.navy }}>Menu</p>
              <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
            </div>
            <nav className="space-y-1">
              {navItems.map((it) => <NavItem key={it.key} icon={it.icon} label={it.label} active={activeKey === it.key} onClick={() => { onSelect(it.key); setMobileOpen(false); }} />)}
            </nav>
            <button onClick={onLogout} className="mt-6 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold" style={{ color: BRAND.muted }}>
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>
      )}
      <main className="flex-1 min-w-0 p-5 md:p-8 pt-20 md:pt-8">{children}</main>
    </div>
  );
}

/* =========================================================================
   PUBLIC SITE — Class 11 & 12 Commerce only
   ========================================================================= */
function PublicSite({ onLogin }) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b" style={{ borderColor: BRAND.line }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: BRAND.navy }}>
              <GraduationCap size={20} color={BRAND.amber} />
            </div>
            <div>
              <p className="font-extrabold text-sm leading-tight" style={{ color: BRAND.navy }}>VRIDHI ACADEMY</p>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: BRAND.orange }}>Class 11 & 12 Commerce</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold" style={{ color: BRAND.ink }}>
            <a href="#courses">Courses</a><a href="#why">Why Us</a><a href="#contact">Contact</a>
          </div>
          <PrimaryButton small onClick={onLogin}>Student / Admin Login</PrimaryButton>
        </div>
      </header>

      <section className="px-5 py-16" style={{ background: `linear-gradient(180deg, ${BRAND.sky}, #fff)` }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge>Class 11 & 12 · Commerce only</Badge>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: BRAND.navy }}>
              Master Commerce.<br /><span style={{ color: BRAND.orange }}>Build your future.</span>
            </h1>
            <p className="mt-4 max-w-md" style={{ color: BRAND.muted }}>
              Personalised online coaching for Class 11 & 12 Commerce students — live classes, individual attention, 1-to-1 doubt sessions and structured guidance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton onClick={onLogin}>Student login</PrimaryButton>
              <GhostButton onClick={onLogin}>Admin login</GhostButton>
            </div>
          </div>
          <div className="rounded-3xl p-6 bg-white shadow-xl border" style={{ borderColor: BRAND.line }}>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.orange }}>Concept simplified</p>
            <h3 className="text-xl font-extrabold mt-1" style={{ color: BRAND.navy }}>Admission of a Partner</h3>
            <p className="text-sm mt-2" style={{ color: BRAND.muted }}>When a new partner joins, the profit-sharing ratio changes and goodwill is adjusted between the old partners.</p>
            <div className="mt-4 h-32 rounded-xl flex items-center justify-center text-sm font-bold" style={{ background: BRAND.sky, color: BRAND.royal }}>
              Diagram preview
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="px-5 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Classes & courses</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {BATCHES_SEED.map((b) => (
            <div key={b.id} className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
              <Badge tone="navy">{b.classLevel}</Badge>
              <h3 className="mt-3 font-extrabold" style={{ color: BRAND.navy }}>{b.stream}</h3>
              <ul className="text-sm mt-2 space-y-1" style={{ color: BRAND.muted }}>
                {SUBJECTS.map((s) => <li key={s}>• {s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="px-5 py-16" style={{ background: BRAND.sky }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4">
          {["Small batch, personal attention", "1-to-1 doubt clinics", "Regular tests & tracking"].map((t) => (
            <div key={t} className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
              <CheckCircle2 size={22} color={BRAND.orange} />
              <p className="mt-3 font-bold" style={{ color: BRAND.navy }}>{t}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="px-5 py-10 text-white" style={{ background: BRAND.navyDeep }}>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-6 text-sm">
          <div>
            <p className="font-extrabold">VRIDHI ACADEMY</p>
            <p className="mt-2 flex items-center gap-2 opacity-80"><Phone size={14} /> 7982726566</p>
            <p className="mt-1 flex items-center gap-2 opacity-80"><Instagram size={14} /> @vridhiacademy</p>
          </div>
          <p className="opacity-60 self-end">© Vridhi Academy</p>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   LOGIN
   ========================================================================= */
function LoginScreen({ onPick, onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: BRAND.sky, fontFamily: "system-ui, sans-serif" }}>
      <div className="max-w-md w-full">
        <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold mb-6" style={{ color: BRAND.muted }}>
          <ChevronLeft size={16} /> Back to website
        </button>
        <div className="bg-white rounded-3xl border p-8 shadow-lg" style={{ borderColor: BRAND.line }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: BRAND.navy }}>
              <GraduationCap size={20} color={BRAND.amber} />
            </div>
            <p className="font-extrabold" style={{ color: BRAND.navy }}>VRIDHI ACADEMY</p>
          </div>
          <p className="text-sm mt-4" style={{ color: BRAND.muted }}>Demo login — pick a role to preview. Real password login will replace this.</p>
          <div className="mt-6 space-y-3">
            <button onClick={() => onPick("student")} className="w-full flex items-center justify-between p-4 rounded-2xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: BRAND.skyDeep }}>
              <span className="flex items-center gap-3"><UserCircle color={BRAND.royal} /> <span className="font-bold" style={{ color: BRAND.navy }}>Continue as Student</span></span>
              <ChevronRight size={18} color={BRAND.muted} />
            </button>
            <button onClick={() => onPick("admin")} className="w-full flex items-center justify-between p-4 rounded-2xl border-2 hover:shadow-md transition-shadow" style={{ borderColor: BRAND.skyDeep }}>
              <span className="flex items-center gap-3"><Building2 color={BRAND.royal} /> <span className="font-bold" style={{ color: BRAND.navy }}>Continue as Admin</span></span>
              <ChevronRight size={18} color={BRAND.muted} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   STUDENT PORTAL
   ========================================================================= */
function StudentDashboard({ student, batch, liveClasses, tests, bookings, onOpenCourse }) {
  const nextClass = liveClasses.find((c) => c.status === "live") || liveClasses.find((c) => c.status === "upcoming");
  const upcomingTest = tests.find((t) => t.status === "upcoming");
  const nextBooking = bookings.find((b) => b.status === "upcoming");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>Good to see you, {student.name.split(" ")[0]} 👋</h1>
        <p className="text-sm mt-1" style={{ color: BRAND.muted }}>{batch.label} · Attendance {student.attendance}%</p>
      </div>

      {nextClass && (
        <div className="rounded-2xl p-5 text-white flex flex-wrap items-center justify-between gap-4" style={{ background: BRAND.navy }}>
          <div>
            <Badge tone={nextClass.status === "live" ? "live" : "upcoming"}>{nextClass.status === "live" ? "Live now" : "Upcoming"}</Badge>
            <p className="mt-2 font-extrabold text-lg">{nextClass.subject} — {nextClass.when}</p>
            <p className="text-sm opacity-80">{nextClass.teacher}</p>
          </div>
          <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer"><PrimaryButton icon={Video}>Join class</PrimaryButton></a>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
          <p className="font-extrabold mb-3" style={{ color: BRAND.navy }}>Continue learning</p>
          {(COURSE_MODULES[batch.id] || []).slice(0, 2).map((m) => (
            <button key={m.id} onClick={() => onOpenCourse(m.id)} className="w-full flex items-center justify-between py-2.5 border-b last:border-0 text-left" style={{ borderColor: BRAND.sky }}>
              <span className="text-sm font-semibold" style={{ color: BRAND.ink }}>{m.title}</span>
              <ChevronRight size={16} color={BRAND.muted} />
            </button>
          ))}
        </div>
        <div className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
          <p className="font-extrabold mb-3" style={{ color: BRAND.navy }}>Today's tasks</p>
          {["Revise Partnership Accounts — Ch 3", "Attempt weekly MCQ set"].map((t) => (
            <label key={t} className="flex items-center gap-3 py-2 text-sm" style={{ color: BRAND.ink }}>
              <input type="checkbox" className="w-4 h-4" /> {t}
            </label>
          ))}
          {upcomingTest && <p className="text-xs mt-2 pt-2 border-t" style={{ color: BRAND.muted, borderColor: BRAND.sky }}>Next test: {upcomingTest.subject} · {upcomingTest.date}</p>}
          {nextBooking && <p className="text-xs mt-1" style={{ color: BRAND.muted }}>1-to-1 session: {nextBooking.date}, {nextBooking.time}</p>}
        </div>
      </div>
    </div>
  );
}

function StudentCourses({ batch, onOpenCourse }) {
  const modules = COURSE_MODULES[batch.id] || [];
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1" style={{ color: BRAND.navy }}>My courses</h1>
      <p className="text-sm mb-6" style={{ color: BRAND.muted }}>{batch.label}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((m) => {
          const done = m.lessons.filter((l) => INITIAL_COMPLETED.has(l.id)).length;
          const pct = Math.round((done / m.lessons.length) * 100);
          return (
            <button key={m.id} onClick={() => onOpenCourse(m.id)} className="text-left rounded-2xl border p-5 bg-white hover:shadow-md transition-shadow" style={{ borderColor: BRAND.line }}>
              <BookOpen color={BRAND.royal} />
              <p className="font-extrabold mt-3" style={{ color: BRAND.navy }}>{m.title}</p>
              <p className="text-xs mt-1" style={{ color: BRAND.muted }}>{m.lessons.length} lessons</p>
              <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: BRAND.sky }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BRAND.orange }} />
              </div>
              <p className="text-xs mt-1 font-bold" style={{ color: BRAND.royal }}>{pct}% complete</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VideoPlayerMock({ lessonTitle }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => setPlaying(false), [lessonTitle]);
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: BRAND.line }}>
      <div className="aspect-video flex flex-col items-center justify-center text-white relative" style={{ background: BRAND.navyDeep }}>
        <button onClick={() => setPlaying((p) => !p)} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: BRAND.orange }}>
          {playing ? <Pause size={26} /> : <Play size={26} style={{ marginLeft: 3 }} />}
        </button>
        <p className="mt-4 text-sm opacity-80">{playing ? "Playing — " : "Paused — "}{lessonTitle}</p>
        <p className="mt-1 text-[11px] opacity-50">Demo player — will embed the real YouTube (unlisted) lecture here</p>
      </div>
    </div>
  );
}

function StudentCourseDetail({ batch, moduleId, onBack }) {
  const modules = COURSE_MODULES[batch.id] || [];
  const mod = modules.find((m) => m.id === moduleId) || modules[0];
  const [completed, setCompleted] = useState(INITIAL_COMPLETED);
  const [activeLesson, setActiveLesson] = useState(mod?.lessons[0]);
  if (!mod) return null;
  const toggle = (id) => setCompleted((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm font-bold mb-4" style={{ color: BRAND.muted }}><ChevronLeft size={16} /> Back to courses</button>
      <h1 className="text-xl md:text-2xl font-extrabold mb-4" style={{ color: BRAND.navy }}>{mod.title}</h1>
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <VideoPlayerMock lessonTitle={activeLesson?.title} />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: BRAND.muted }}>{activeLesson?.duration}</p>
            <button onClick={() => toggle(activeLesson.id)} className="text-sm font-bold flex items-center gap-2" style={{ color: completed.has(activeLesson?.id) ? "#15803D" : BRAND.royal }}>
              {completed.has(activeLesson?.id) ? <CheckCircle2 size={18} /> : <Circle size={18} />}
              {completed.has(activeLesson?.id) ? "Marked complete" : "Mark as complete"}
            </button>
          </div>
        </div>
        <div className="rounded-2xl border p-4 bg-white h-fit" style={{ borderColor: BRAND.line }}>
          <p className="font-extrabold mb-2 text-sm" style={{ color: BRAND.navy }}>Lessons</p>
          {mod.lessons.map((l) => (
            <button key={l.id} onClick={() => setActiveLesson(l)} className="w-full flex items-center gap-2 py-2.5 border-b last:border-0 text-left" style={{ borderColor: BRAND.sky, background: activeLesson?.id === l.id ? BRAND.sky : "transparent" }}>
              {completed.has(l.id) ? <CheckCircle2 size={16} color="#15803D" /> : <Circle size={16} color={BRAND.muted} />}
              <span className="text-sm font-semibold flex-1" style={{ color: BRAND.ink }}>{l.title}</span>
              <span className="text-xs" style={{ color: BRAND.muted }}>{l.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentLive({ liveClasses }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Live classes</h1>
      <div className="space-y-3">
        {liveClasses.map((c) => (
          <div key={c.id} className="rounded-2xl border p-4 bg-white flex flex-wrap items-center justify-between gap-3" style={{ borderColor: BRAND.line }}>
            <div>
              <Badge tone={c.status === "live" ? "live" : c.status === "upcoming" ? "upcoming" : "done"}>{c.status === "live" ? "Live now" : c.status === "upcoming" ? "Upcoming" : "Completed"}</Badge>
              <p className="font-bold mt-1.5" style={{ color: BRAND.navy }}>{c.subject}</p>
              <p className="text-sm" style={{ color: BRAND.muted }}>{c.when} · {c.teacher}</p>
            </div>
            {c.status !== "completed" ? (
              <a href="https://meet.google.com" target="_blank" rel="noopener noreferrer"><PrimaryButton small icon={Video}>Join</PrimaryButton></a>
            ) : <GhostButton small>View recording</GhostButton>}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentMaterial({ items }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Study material</h1>
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="rounded-2xl border p-4 bg-white flex items-center justify-between" style={{ borderColor: BRAND.line }}>
            <div className="flex items-center gap-3">
              <FileText color={BRAND.royal} />
              <div><p className="font-bold text-sm" style={{ color: BRAND.navy }}>{m.title}</p><p className="text-xs" style={{ color: BRAND.muted }}>{m.subject} · PDF</p></div>
            </div>
            <GhostButton small icon={Download}>Download</GhostButton>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentTests({ tests }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Tests</h1>
      <div className="space-y-3">
        {tests.map((t) => (
          <div key={t.id} className="rounded-2xl border p-4 bg-white flex flex-wrap items-center justify-between gap-3" style={{ borderColor: BRAND.line }}>
            <div><p className="font-bold text-sm" style={{ color: BRAND.navy }}>{t.subject} — {t.topic}</p><p className="text-xs" style={{ color: BRAND.muted }}>{t.date}</p></div>
            {t.status === "completed" ? <Badge tone="done">{t.score}/{t.max}</Badge> : <PrimaryButton small>Attempt test</PrimaryButton>}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentAttendance({ log, attendance }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1" style={{ color: BRAND.navy }}>Attendance</h1>
      <p className="text-sm mb-6" style={{ color: BRAND.muted }}>Overall {attendance}% this term</p>
      <div className="rounded-2xl border bg-white divide-y" style={{ borderColor: BRAND.line }}>
        {log.map((r, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold" style={{ color: BRAND.ink }}>{r.date}</span>
            <Badge tone={r.status === "present" ? "done" : "live"}>{r.status === "present" ? "Present" : "Absent"}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentFees({ fee }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Fees</h1>
      <div className="rounded-2xl border p-6 bg-white max-w-md" style={{ borderColor: BRAND.line }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND.muted }}>This month</p>
            <p className="text-3xl font-extrabold mt-1" style={{ color: BRAND.navy }}>₹{fee.amount}</p>
          </div>
          <Badge tone={fee.status === "paid" ? "done" : "upcoming"}>{fee.status === "paid" ? "Paid" : "Due"}</Badge>
        </div>
        <div className="mt-4 pt-4 border-t text-sm space-y-2" style={{ borderColor: BRAND.sky, color: BRAND.muted }}>
          {fee.status === "paid" ? (
            <><p>Paid via {fee.mode}</p><p>Last payment: {fee.lastPaymentDate}</p></>
          ) : <p>Due by {fee.dueDate}</p>}
        </div>
        {fee.status === "due" && <PrimaryButton full icon={Wallet}>Pay now</PrimaryButton>}
      </div>
    </div>
  );
}

function StudentBooking({ teachers, bookings, setBookings, studentId }) {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(null);

  const myBookings = bookings.filter((b) => b.studentId === studentId);

  const confirmBooking = () => {
    if (!selectedTeacher || !selectedDate || !selectedSlot) return;
    const booking = { id: "bk" + Date.now(), studentId, teacherId: selectedTeacher.id, date: selectedDate.date, time: selectedSlot, topic: reason || "General doubt session", status: "upcoming" };
    setBookings((prev) => [...prev, booking]);
    setConfirmed(booking);
    setSelectedTeacher(null); setSelectedDate(null); setSelectedSlot(null); setReason("");
  };

  if (confirmed) {
    return (
      <div className="max-w-md">
        <div className="rounded-2xl border p-6 bg-white text-center" style={{ borderColor: BRAND.line }}>
          <CheckCircle2 size={40} color="#15803D" className="mx-auto" />
          <p className="font-extrabold text-lg mt-3" style={{ color: BRAND.navy }}>Your 1-to-1 session is booked</p>
          <p className="text-sm mt-2" style={{ color: BRAND.muted }}>{confirmed.date} · {confirmed.time}</p>
          <GhostButton small onClick={() => setConfirmed(null)}>Book another</GhostButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1" style={{ color: BRAND.navy }}>Book a 1-to-1 session</h1>
      <p className="text-sm mb-6" style={{ color: BRAND.muted }}>Get a dedicated slot with your teacher for any doubt.</p>

      {myBookings.length > 0 && (
        <div className="rounded-2xl border p-4 bg-white mb-6" style={{ borderColor: BRAND.line }}>
          <p className="font-extrabold text-sm mb-2" style={{ color: BRAND.navy }}>Your upcoming sessions</p>
          {myBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between py-2 border-b last:border-0 text-sm" style={{ borderColor: BRAND.sky }}>
              <span style={{ color: BRAND.ink }}>{teachers.find((t) => t.id === b.teacherId)?.name} · {b.topic}</span>
              <span className="font-bold" style={{ color: BRAND.royal }}>{b.date}, {b.time}</span>
            </div>
          ))}
        </div>
      )}

      {!selectedTeacher && (
        <div className="grid sm:grid-cols-2 gap-4">
          {teachers.map((t) => (
            <button key={t.id} onClick={() => setSelectedTeacher(t)} className="text-left rounded-2xl border p-5 bg-white hover:shadow-md transition-shadow" style={{ borderColor: BRAND.line }}>
              <Avatar name={t.name} size={44} />
              <p className="font-extrabold mt-3" style={{ color: BRAND.navy }}>{t.name}</p>
              <p className="text-xs" style={{ color: BRAND.muted }}>{t.subject}</p>
              <Badge tone="upcoming">Available today</Badge>
            </button>
          ))}
        </div>
      )}

      {selectedTeacher && (
        <div className="rounded-2xl border p-5 bg-white max-w-lg" style={{ borderColor: BRAND.line }}>
          <button onClick={() => { setSelectedTeacher(null); setSelectedDate(null); setSelectedSlot(null); }} className="flex items-center gap-1 text-sm font-bold mb-4" style={{ color: BRAND.muted }}><ChevronLeft size={16} /> Change teacher</button>
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={selectedTeacher.name} size={44} />
            <div><p className="font-extrabold" style={{ color: BRAND.navy }}>{selectedTeacher.name}</p><p className="text-xs" style={{ color: BRAND.muted }}>{selectedTeacher.subject}</p></div>
          </div>

          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BRAND.muted }}>Available date</p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {(AVAILABILITY[selectedTeacher.id] || []).map((d) => (
              <button key={d.date} onClick={() => { setSelectedDate(d); setSelectedSlot(null); }} className="px-4 py-2 rounded-full text-sm font-bold border-2" style={selectedDate?.date === d.date ? { background: BRAND.navy, color: "#fff", borderColor: BRAND.navy } : { borderColor: BRAND.line, color: BRAND.ink }}>
                {d.date}
              </button>
            ))}
          </div>

          {selectedDate && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BRAND.muted }}>Time slot</p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {selectedDate.slots.map((s) => (
                  <button key={s} onClick={() => setSelectedSlot(s)} className="px-4 py-2 rounded-full text-sm font-bold border-2" style={selectedSlot === s ? { background: BRAND.orange, color: "#fff", borderColor: BRAND.orange } : { borderColor: BRAND.line, color: BRAND.ink }}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedSlot && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BRAND.muted }}>Reason for session</p>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Doubt in goodwill treatment" className="w-full border rounded-xl px-3 py-2 text-sm mb-4" style={{ borderColor: BRAND.line }} rows={2} />
              <PrimaryButton full icon={CalendarClock} onClick={confirmBooking}>Book session</PrimaryButton>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function StudentProfile({ student, batch }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>Profile</h1>
      <div className="rounded-2xl border p-6 bg-white max-w-md" style={{ borderColor: BRAND.line }}>
        <div className="flex items-center gap-3 mb-5">
          <Avatar name={student.name} size={56} />
          <div><p className="font-extrabold" style={{ color: BRAND.navy }}>{student.name}</p><p className="text-sm" style={{ color: BRAND.muted }}>{batch.label}</p></div>
        </div>
        {[["Parent / Guardian", student.parent], ["Phone", student.phone], ["Batch", batch.label], ["Attendance", `${student.attendance}%`]].map(([k, v]) => (
          <div key={k} className="flex justify-between py-2.5 border-b last:border-0 text-sm" style={{ borderColor: BRAND.sky }}>
            <span style={{ color: BRAND.muted }}>{k}</span><span className="font-bold" style={{ color: BRAND.ink }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentPortal({ onLogout, bookings, setBookings }) {
  const student = STUDENTS_SEED.find((s) => s.id === DEMO_STUDENT_ID);
  const batch = BATCHES_SEED.find((b) => b.id === student.batchId);
  const [tab, setTab] = useState("dashboard");
  const [openModuleId, setOpenModuleId] = useState(null);

  const items = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "My Courses", icon: BookOpen },
    { key: "live", label: "Live Classes", icon: Video },
    { key: "booking", label: "1-to-1 Sessions", icon: CalendarClock },
    { key: "material", label: "Study Material", icon: FileText },
    { key: "tests", label: "Tests", icon: ClipboardList },
    { key: "attendance", label: "Attendance", icon: CalendarCheck },
    { key: "fees", label: "Fees", icon: Wallet },
    { key: "profile", label: "Profile", icon: UserCircle },
  ];

  const liveClasses = LIVE_CLASSES.filter((c) => c.batchId === batch.id);
  const material = STUDY_MATERIAL[batch.id] || [];
  const tests = TESTS[batch.id] || [];
  const attendanceLog = ATTENDANCE_LOG[batch.id] || [];
  const fee = FEES_SEED[student.id];

  return (
    <Shell roleLabel="Student" roleName={student.name} navItems={items} activeKey={tab} onSelect={(k) => { setTab(k); setOpenModuleId(null); }} onLogout={onLogout}>
      {tab === "dashboard" && <StudentDashboard student={student} batch={batch} liveClasses={liveClasses} tests={tests} bookings={bookings.filter((b) => b.studentId === student.id)} onOpenCourse={(id) => { setOpenModuleId(id); setTab("courses"); }} />}
      {tab === "courses" && !openModuleId && <StudentCourses batch={batch} onOpenCourse={setOpenModuleId} />}
      {tab === "courses" && openModuleId && <StudentCourseDetail batch={batch} moduleId={openModuleId} onBack={() => setOpenModuleId(null)} />}
      {tab === "live" && <StudentLive liveClasses={liveClasses} />}
      {tab === "booking" && <StudentBooking teachers={TEACHERS_SEED} bookings={bookings} setBookings={setBookings} studentId={student.id} />}
      {tab === "material" && <StudentMaterial items={material} />}
      {tab === "tests" && <StudentTests tests={tests} />}
      {tab === "attendance" && <StudentAttendance log={attendanceLog} attendance={student.attendance} />}
      {tab === "fees" && <StudentFees fee={fee} />}
      {tab === "profile" && <StudentProfile student={student} batch={batch} />}
    </Shell>
  );
}

/* =========================================================================
   ADMIN PANEL
   ========================================================================= */
function AdminDashboard({ teachers, students, batches, fees }) {
  const todaysClasses = LIVE_CLASSES.filter((c) => c.when.startsWith("Today"));
  const collected = Object.values(fees).filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0);
  const pendingCount = Object.values(fees).filter((f) => f.status === "due").length;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Students" value={students.length} />
        <StatCard label="Teachers" value={teachers.length} />
        <StatCard label="Fees collected" value={`₹${collected.toLocaleString()}`} sub={`${pendingCount} pending`} />
        <StatCard label="Classes today" value={todaysClasses.length} />
      </div>
      <div className="rounded-2xl border bg-white p-5" style={{ borderColor: BRAND.line }}>
        <p className="font-extrabold mb-3" style={{ color: BRAND.navy }}>Today's live classes</p>
        {todaysClasses.map((c) => (
          <div key={c.id} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{ borderColor: BRAND.sky }}>
            <div><p className="text-sm font-bold" style={{ color: BRAND.ink }}>{c.subject} — {batches.find((b) => b.id === c.batchId)?.label}</p><p className="text-xs" style={{ color: BRAND.muted }}>{c.when} · {c.teacher}</p></div>
            <Badge tone={c.status === "live" ? "live" : "upcoming"}>{c.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminStaff({ teachers, setTeachers }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", phone: "" });
  const addTeacher = () => {
    if (!form.name.trim()) return;
    setTeachers((prev) => [...prev, { id: "t" + Date.now(), name: form.name, subject: form.subject || "— add subject", phone: form.phone || "— add phone", experience: "— add years", batchIds: [] }]);
    setForm({ name: "", subject: "", phone: "" }); setShowForm(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>Staff — Owner & Teachers</h1>
        <PrimaryButton small icon={Plus} onClick={() => setShowForm((s) => !s)}>Add teacher</PrimaryButton>
      </div>
      <PlaceholderNote>Sample data — replace names, subjects, experience and phone numbers with real records</PlaceholderNote>
      {showForm && (
        <div className="rounded-2xl border p-4 bg-white mb-6 grid sm:grid-cols-3 gap-3" style={{ borderColor: BRAND.line }}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }} />
          <input placeholder="Subject(s)" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }} />
          <div className="flex gap-2">
            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border rounded-xl px-3 py-2 text-sm flex-1" style={{ borderColor: BRAND.line }} />
            <PrimaryButton small onClick={addTeacher}>Save</PrimaryButton>
          </div>
        </div>
      )}
      <div className="rounded-2xl p-5 mb-4 text-white flex items-center gap-4" style={{ background: BRAND.navy }}>
        <Avatar name={OWNER.name} size={52} />
        <div><p className="font-extrabold">{OWNER.name}</p><p className="text-sm opacity-80">{OWNER.role} · {OWNER.phone}</p><p className="text-xs opacity-60 mt-1">{OWNER.note}</p></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((t) => (
          <div key={t.id} className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
            <div className="flex items-center gap-3">
              <Avatar name={t.name} size={44} />
              <div><p className="font-extrabold text-sm" style={{ color: BRAND.navy }}>{t.name}</p><p className="text-xs" style={{ color: BRAND.muted }}>{t.subject}</p></div>
            </div>
            <div className="mt-3 pt-3 border-t text-xs space-y-1" style={{ borderColor: BRAND.sky, color: BRAND.muted }}>
              <p>Experience: {t.experience}</p><p>Phone: {t.phone}</p><p>Batches: {t.batchIds.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminStudents({ students, setStudents, batches }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", batchId: batches[0]?.id, parent: "" });
  const [selected, setSelected] = useState(students[0] || null);
  const [query, setQuery] = useState("");
  const addStudent = () => {
    if (!form.name.trim()) return;
    const s = { id: "s" + Date.now(), name: form.name, batchId: form.batchId, parent: form.parent || "— add parent", phone: "— add phone", attendance: 0 };
    setStudents((prev) => [...prev, s]); setForm({ name: "", batchId: batches[0]?.id, parent: "" }); setShowForm(false);
  };
  const filtered = students.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>Students</h1>
        <PrimaryButton small icon={Plus} onClick={() => setShowForm((s) => !s)}>Add student</PrimaryButton>
      </div>
      <PlaceholderNote>Sample students — replace with real admissions</PlaceholderNote>
      {showForm && (
        <div className="rounded-2xl border p-4 bg-white mb-6 grid sm:grid-cols-4 gap-3" style={{ borderColor: BRAND.line }}>
          <input placeholder="Student name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }} />
          <select value={form.batchId} onChange={(e) => setForm({ ...form, batchId: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }}>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
          <input placeholder="Parent name" value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }} />
          <PrimaryButton small onClick={addStudent}>Save</PrimaryButton>
        </div>
      )}
      <div className="relative mb-4 max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color={BRAND.muted} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students…" className="w-full pl-9 pr-3 py-2 border rounded-xl text-sm" style={{ borderColor: BRAND.line }} />
      </div>
      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: BRAND.line }}>
          <table className="w-full text-sm">
            <thead><tr className="text-left" style={{ background: BRAND.sky, color: BRAND.navy }}>
              <th className="px-4 py-3 font-bold">Student</th><th className="px-4 py-3 font-bold">Batch</th><th className="px-4 py-3 font-bold">Attendance</th>
            </tr></thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} onClick={() => setSelected(s)} className="cursor-pointer border-t" style={{ borderColor: BRAND.sky, background: selected?.id === s.id ? BRAND.sky : "white" }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: BRAND.ink }}>{s.name}</td>
                  <td className="px-4 py-3" style={{ color: BRAND.muted }}>{batches.find((b) => b.id === s.batchId)?.classLevel}</td>
                  <td className="px-4 py-3"><Badge tone={s.attendance >= 90 ? "done" : "upcoming"}>{s.attendance}%</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="rounded-2xl border p-5 bg-white h-fit" style={{ borderColor: BRAND.line }}>
            <Avatar name={selected.name} size={48} />
            <p className="font-extrabold mt-3" style={{ color: BRAND.navy }}>{selected.name}</p>
            <p className="text-xs" style={{ color: BRAND.muted }}>{batches.find((b) => b.id === selected.batchId)?.label}</p>
            <div className="mt-3 pt-3 border-t text-xs space-y-1.5" style={{ borderColor: BRAND.sky, color: BRAND.muted }}>
              <p>Parent: {selected.parent}</p><p>Phone: {selected.phone}</p><p>Attendance: {selected.attendance}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminBatches({ batches, setBatches, teachers }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ classLevel: "", teacherId: teachers[0]?.id });
  const addBatch = () => {
    if (!form.classLevel.trim()) return;
    setBatches((prev) => [...prev, { id: "b" + Date.now(), classLevel: form.classLevel, stream: "Commerce", label: `${form.classLevel} — Commerce`, teacherId: form.teacherId }]);
    setForm({ classLevel: "", teacherId: teachers[0]?.id }); setShowForm(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold" style={{ color: BRAND.navy }}>Batches</h1>
        <PrimaryButton small icon={Plus} onClick={() => setShowForm((s) => !s)}>Add batch</PrimaryButton>
      </div>
      {showForm && (
        <div className="rounded-2xl border p-4 bg-white mb-6 grid sm:grid-cols-3 gap-3" style={{ borderColor: BRAND.line }}>
          <input placeholder="e.g. Class 13 (repeater batch)" value={form.classLevel} onChange={(e) => setForm({ ...form, classLevel: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }} />
          <select value={form.teacherId} onChange={(e) => setForm({ ...form, teacherId: e.target.value })} className="border rounded-xl px-3 py-2 text-sm" style={{ borderColor: BRAND.line }}>
            {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <PrimaryButton small onClick={addBatch}>Save</PrimaryButton>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map((b) => (
          <div key={b.id} className="rounded-2xl border p-5 bg-white" style={{ borderColor: BRAND.line }}>
            <Layers color={BRAND.royal} />
            <p className="font-extrabold mt-3" style={{ color: BRAND.navy }}>{b.label}</p>
            <p className="text-xs mt-1" style={{ color: BRAND.muted }}>Teacher: {teachers.find((t) => t.id === b.teacherId)?.name || "— unassigned"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminFees({ students, batches, fees, setFees }) {
  const collected = Object.values(fees).filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0);
  const pending = Object.values(fees).filter((f) => f.status === "due");
  const markPaid = (studentId) => setFees((prev) => ({ ...prev, [studentId]: { status: "paid", amount: prev[studentId].amount, mode: "Marked by admin", lastPaymentDate: "Today" } }));
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-2" style={{ color: BRAND.navy }}>Fees</h1>
      <PlaceholderNote>Sample fee records — connect Razorpay / real payment records before going live</PlaceholderNote>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Collected" value={`₹${collected.toLocaleString()}`} />
        <StatCard label="Pending dues" value={pending.length} />
        <StatCard label="Collection rate" value={`${Math.round(((students.length - pending.length) / students.length) * 100)}%`} />
      </div>
      <div className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: BRAND.line }}>
        <table className="w-full text-sm">
          <thead><tr className="text-left" style={{ background: BRAND.sky, color: BRAND.navy }}>
            <th className="px-4 py-3 font-bold">Student</th><th className="px-4 py-3 font-bold">Batch</th><th className="px-4 py-3 font-bold">Amount</th><th className="px-4 py-3 font-bold">Status</th><th className="px-4 py-3 font-bold"></th>
          </tr></thead>
          <tbody>
            {students.map((s) => {
              const f = fees[s.id];
              return (
                <tr key={s.id} className="border-t" style={{ borderColor: BRAND.sky }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: BRAND.ink }}>{s.name}</td>
                  <td className="px-4 py-3" style={{ color: BRAND.muted }}>{batches.find((b) => b.id === s.batchId)?.classLevel}</td>
                  <td className="px-4 py-3" style={{ color: BRAND.ink }}>₹{f.amount}</td>
                  <td className="px-4 py-3"><Badge tone={f.status === "paid" ? "done" : "upcoming"}>{f.status === "paid" ? "Paid" : "Due"}</Badge></td>
                  <td className="px-4 py-3">{f.status === "due" && <GhostButton small onClick={() => markPaid(s.id)}>Mark paid</GhostButton>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminBookings({ bookings, students, teachers }) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: BRAND.navy }}>1-to-1 sessions</h1>
      <div className="space-y-3">
        {bookings.length === 0 && <p className="text-sm" style={{ color: BRAND.muted }}>No sessions booked yet.</p>}
        {bookings.map((b) => (
          <div key={b.id} className="rounded-2xl border p-4 bg-white flex flex-wrap items-center justify-between gap-3" style={{ borderColor: BRAND.line }}>
            <div>
              <p className="font-bold text-sm" style={{ color: BRAND.navy }}>{students.find((s) => s.id === b.studentId)?.name} · {teachers.find((t) => t.id === b.teacherId)?.name}</p>
              <p className="text-xs" style={{ color: BRAND.muted }}>{b.topic}</p>
            </div>
            <Badge tone="upcoming">{b.date}, {b.time}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPanel({ onLogout, bookings }) {
  const [tab, setTab] = useState("dashboard");
  const [teachers, setTeachers] = useState(TEACHERS_SEED);
  const [students, setStudents] = useState(STUDENTS_SEED);
  const [batches, setBatches] = useState(BATCHES_SEED);
  const [fees, setFees] = useState(FEES_SEED);

  const items = [
    { key: "dashboard", label: "Overview", icon: LayoutDashboard },
    { key: "staff", label: "Staff", icon: Users },
    { key: "students", label: "Students", icon: GraduationCap },
    { key: "batches", label: "Batches", icon: ClipboardCheck },
    { key: "fees", label: "Fees", icon: Wallet },
    { key: "bookings", label: "1-to-1 Sessions", icon: CalendarClock },
  ];

  return (
    <Shell roleLabel="Admin" roleName={OWNER.name} navItems={items} activeKey={tab} onSelect={setTab} onLogout={onLogout}>
      {tab === "dashboard" && <AdminDashboard teachers={teachers} students={students} batches={batches} fees={fees} />}
      {tab === "staff" && <AdminStaff teachers={teachers} setTeachers={setTeachers} />}
      {tab === "students" && <AdminStudents students={students} setStudents={setStudents} batches={batches} />}
      {tab === "batches" && <AdminBatches batches={batches} setBatches={setBatches} teachers={teachers} />}
      {tab === "fees" && <AdminFees students={students} batches={batches} fees={fees} setFees={setFees} />}
      {tab === "bookings" && <AdminBookings bookings={bookings} students={students} teachers={teachers} />}
    </Shell>
  );
}

/* =========================================================================
   ROOT
   ========================================================================= */
export default function VridhiPlatformDemo() {
  const [route, setRoute] = useState("public");
  const [bookings, setBookings] = useState(BOOKINGS_SEED);

  if (route === "public") return <PublicSite onLogin={() => setRoute("login")} />;
  if (route === "login") return <LoginScreen onPick={setRoute} onBack={() => setRoute("public")} />;
  if (route === "student") return <StudentPortal onLogout={() => setRoute("public")} bookings={bookings} setBookings={setBookings} />;
  if (route === "admin") return <AdminPanel onLogout={() => setRoute("public")} bookings={bookings} />;
  return null;
}
