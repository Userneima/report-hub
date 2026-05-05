/*
Design manifesto (commitment):
- Movement: Swiss modernism × cyber minimalism
- Principles: extreme contrast, oversized typography, asymmetric layout, quiet grids
- Color: deep black base + cold cyan highlight + electric violet trace
- Signature motifs: hairline rules, numbered sections, "signal" badges, SVG diagrams
*/

import { useEffect, useMemo, type ReactNode } from "react";
import hero from "@/assets/hero.png";
import camera12mp from "@/assets/camera_12mp.jpeg";
import lookAndAsk from "@/assets/look_and_ask.svg";
import hardwareArch from "@/assets/hardware_arch.svg";
import industryChain from "@/assets/industry_chain.svg";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Award,
  Battery,
  Bot,
  ChevronDown,
  Crown,
  Glasses,
  Layers,
  Rocket,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface HomeProps {
  targetSection?: string;
}

type NavItem = { id: string; label: string; no: string };

function Hairline() {
  return (
    <div className="h-px w-full bg-white/10" />
  );
}

/** 章节间分隔线（比 Hairline 更醒目，用于 section 之间） */
function SectionDivider() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
  );
}

/** 加强版章节标题：左侧色条 + 大号编号 + 标签 */
function SectionLabel({ no, label }: { no: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-1 shrink-0 rounded-full bg-[oklch(0.78_0.18_190)] shadow-[0_0_12px_rgba(88,255,255,0.4)]" />
      <div className="flex items-baseline gap-3">
        <div className="text-lg font-semibold tabular-nums text-white/90">{no}</div>
        <div className="text-sm tracking-[0.18em] text-white/80 uppercase">
          {label}
        </div>
      </div>
    </div>
  );
}

/** 章节大号装饰编号（背景用，弱化显示） */
function SectionNumberDecoration({ no }: { no: string }) {
  return (
    <div className="pointer-events-none absolute -left-2 top-0 select-none font-display text-[6rem] font-bold leading-none text-white/[0.06] md:-left-4 md:text-[8rem]" aria-hidden>
      {no}
    </div>
  );
}

function GlowBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_0_32px_rgba(88,255,255,0.06)]">
      <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.18_190)] shadow-[0_0_18px_rgba(88,255,255,0.65)]" />
      {children}
    </span>
  );
}

function Figure({
  src,
  caption,
  credit,
  className,
}: {
  src: string;
  caption: string;
  credit?: string;
  className?: string;
}) {
  return (
    <figure className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <img src={src} alt={caption} className="w-full" loading="lazy" />
      </div>
      <figcaption className="text-xs leading-relaxed text-white/55">
        <span className="text-white/75">{caption}</span>
        {credit ? (
          <span className="block pt-1 text-white/45">来源：{credit}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}

/** 汇报配图/视频：按文件名从 public/report_media/ 读取，根据后缀自动区分图片或视频 */
function MediaFigureByFile({
  filename,
  caption,
  className,
}: {
  filename: string;
  caption: string;
  className?: string;
}) {
  const src = `/report_media/${filename}`;
  const isVideo = /\.(mp4|webm)$/i.test(filename);
  return (
    <figure className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {isVideo ? (
          <video
            src={src}
            controls
            playsInline
            className="w-full"
            preload="metadata"
          />
        ) : (
          <img src={src} alt={caption} className="w-full" loading="lazy" />
        )}
      </div>
      <figcaption className="text-xs leading-relaxed text-white/55">
        <span className="text-white/75">{caption}</span>
        <span className="block pt-1 text-white/45">来源：Meta Newsroom</span>
      </figcaption>
    </figure>
  );
}

/** 痛点模块：定长扫描行（标题 + 单行结论，控制信息密度） */
function PainScanRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2.5">
      <div className="text-[10px] font-medium tracking-[0.22em] text-white/45">{label}</div>
      <p className="mt-1.5 text-sm leading-snug text-white/82">{children}</p>
    </div>
  );
}

/** 06 设计分析：统一层级行（与痛点模块视觉闭环） */
function DesignLogicRow({
  label,
  children,
  accentClass = "text-white/45",
}: {
  label: string;
  children: ReactNode;
  accentClass?: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2.5">
      <div className={cn("text-[10px] font-medium tracking-[0.22em]", accentClass)}>{label}</div>
      <p className="mt-1.5 min-h-[1.6rem] text-sm leading-snug text-white/80">{children}</p>
    </div>
  );
}

export default function Home({ targetSection }: HomeProps) {
  const nav = useMemo<NavItem[]>(
    () => [
      { id: "cover", label: "封面", no: "00" },
      { id: "case", label: "案例选择", no: "01" },
      { id: "brand", label: "品牌", no: "02" },
      { id: "product", label: "产品构成", no: "03" },
      { id: "specs", label: "技术参数", no: "04" },
      { id: "ai", label: "AI 应用", no: "05" },
      { id: "design", label: "设计创新", no: "06" },
      { id: "scenarios", label: "应用场景", no: "07" },
      { id: "market", label: "市场", no: "08" },
      { id: "industry", label: "产业链", no: "09" },
      { id: "pain", label: "痛点", no: "10" },
      { id: "competitive", label: "竞品对比", no: "11" },
      { id: "summary", label: "总结/趋势", no: "12" },
      { id: "sources", label: "参考", no: "13" },
    ],
    []
  );

  const productChildren = useMemo(
    () => nav.filter((it) => ["specs", "ai", "design", "scenarios"].includes(it.id)),
    [nav]
  );

  useEffect(() => {
    if (targetSection) {
      document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetSection]);

  return (
    <div className="min-h-screen bg-[oklch(0.145_0_0)] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(88,255,255,0.10),transparent_55%),radial-gradient(900px_circle_at_80%_30%,rgba(173,88,255,0.10),transparent_58%),radial-gradient(1200px_circle_at_50%_100%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="noise-layer absolute inset-0 opacity-[0.10] mix-blend-soft-light" />
      </div>

      {/* Top bar with horizontal TOC */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[oklch(0.145_0_0_/_0.72)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.18_190)] shadow-[0_0_18px_rgba(88,255,255,0.55)]" />
              <div className="text-xs tracking-[0.28em] text-white/70">RAY‑BAN META · CASE STUDY</div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <GlowBadge>Dark Mode / 极简排版</GlowBadge>
            </div>
          </div>

          <nav className="w-full overflow-visible">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 md:gap-4 text-sm text-white/70 min-w-max px-2 md:min-w-0 md:flex-wrap md:justify-center">
              {nav.map((it) => {
                if (["specs", "ai", "design", "scenarios"].includes(it.id)) {
                  return null;
                }

                if (it.id === "product") {
                  return (
                    <div key={it.id} className="relative">
                      <div className="group inline-flex items-center rounded-md px-2.5 py-2 hover:bg-white/5 hover:text-white whitespace-nowrap cursor-pointer" aria-haspopup="true">
                        <a href={`/#/${it.id}`} className="inline-flex items-center gap-2">
                          <span>{it.label}</span>
                        </a>
                        {/* Down arrow */}
                        <svg className="ml-1 h-3 w-3 text-white/60 group-hover:text-white transition" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {/* Dropdown - absolute, hidden by default, shown on hover */}
                        <div className="pointer-events-none absolute left-0 top-full z-40 mt-0 pt-2 w-56 rounded-2xl border border-white/10 bg-[oklch(0.145_0_0_/_0.98)] px-3 py-2 text-sm text-white/70 opacity-0 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                          <div className="mb-1 text-[10px] tracking-[0.22em] text-white/45">产品构成 · 深入维度</div>
                          <div className="flex flex-col gap-1">
                            {productChildren.map((sub) => (
                              <a
                                key={sub.id}
                                href={`/#/${sub.id}`}
                                className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/8 hover:text-white"
                              >
                                <span className="text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition duration-150">{sub.no}</span>
                                <span>{sub.label}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <a
                    key={it.id}
                    href={`/#/${it.id}`}
                    className="group rounded-md px-2.5 py-2 hover:bg-white/5 hover:text-white whitespace-nowrap"
                  >
                    <span>{it.label}</span>
                    <span className="ml-1 text-[10px] text-white/45 opacity-0 group-hover:opacity-100 transition duration-150">{it.no}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-28 pt-10">
        {/* Left sidebar removed - TOC moved to header, personal info moved to footer */}

        {/* Content */}
        <div className="space-y-24">
          {/* Cover（不套卡片，保持全幅视觉） */}
          <section id="cover" className="scroll-mt-28">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <img
                src={hero}
                alt="Ray-Ban Meta 智能眼镜"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.30),rgba(0,0,0,0.65))]" />
              <div className="relative grid gap-10 p-8 md:grid-cols-[1fr_380px] md:p-12">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <GlowBadge>市占约 85%</GlowBadge>
                    <GlowBadge>无屏 AI 眼镜</GlowBadge>
                    <GlowBadge>2025 Gen 2</GlowBadge>
                  </div>

                  <h1 className="text-4xl leading-[1.06] md:text-5xl">
                    Ray‑Ban Meta 智能眼镜<br />
                    案例调研汇报
                  </h1>

                  <p className="max-w-2xl text-base leading-relaxed text-white/72 md:text-lg md:whitespace-nowrap">
                    智能设计课程｜市场格局、核心产品、技术迭代、产业链与用户反馈多维度拆解分析
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/55">
                    <span>12 章节 · 案例选择 → 品牌 → 产品 → 参数 → AI → 设计 → 场景 → 市场 → 产业链 → 痛点 → 竞品 → 总结</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                    <div className="text-xs tracking-[0.3em] text-white/55">为何选本案例</div>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      近一年产品、全球标杆、产业链中国供应链占比高，适合做深度拆解与汇报。
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                    <div className="text-xs tracking-[0.3em] text-white/55">汇报形式</div>
                    <p className="mt-3 text-sm leading-relaxed text-white/75">
                      网页版 PPT · 视觉动线清晰 · 配图与数据支撑完整。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 01 案例选择说明 */}
          <section id="case" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="01" />
              <div className="relative space-y-8">
                <SectionLabel no="01" label="案例选择说明" />
                <Hairline />
                <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl">为何选择 Ray-Ban Meta？</h2>
                <ul className="mt-3 list-disc list-outside pl-6">
                  <li className="mb-4 text-sm leading-relaxed text-white/75">
                    <strong className="text-white">时效性优势：</strong>
                    Gen 2 于 2025 年 9 月发布，处于行业领先迭代周期，代表了当前 <span className="highlight-marker">AI 硬件与时尚消费品的最高集成水准</span>
                  </li>

                  <li className="mb-4 text-sm leading-relaxed text-white/75">
                    <strong className="text-white">市场统治力：</strong>
                    2025 年占据约 <span className="highlight-marker">85% 市场份额</span>（Omdia），销量突破 <span className="highlight-marker">700 万副</span>，是全球首款验证了“<span className="highlight-marker">无屏形态</span>”商业闭环的爆款产品
                  </li>

                  <li className="mb-4 text-sm leading-relaxed text-white/75">
                    <strong className="text-white">产业链研究价值：</strong>
                    技术参数透明且供应链数据详实；<span className="highlight-marker">中国供应商占比极高</span>，为上下游产业协同及 CMF 工艺分析提供了优质样本
                  </li>

                  <li className="mb-4 text-sm leading-relaxed text-white/75">
                    <strong className="text-white">行业定义标准：</strong>
                    成功定义了 <span className="highlight-marker">「无屏 AI 眼镜 + 时尚品牌」</span> 的新物种形态；据 <span className="highlight-marker">EssilorLuxottica</span> 财报，其 2025 年销量同比增速超 <span className="highlight-marker">247%</span>，是智能眼镜赛道增长最快的核心产品。
                  </li>
                </ul>
              </div>
                  <div className="flex flex-col">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                      <video
                        src={`/report_media/Connect-24 Rbm-Updates Header.mp4`}
                        controls
                        playsInline
                        className="w-full"
                        preload="metadata"
                      />
                    </div>

                    <div className="mt-3 text-xs leading-relaxed text-white/55">
                      <div className="text-white/75">商品使用宣传片</div>
                      <div className="block pt-1 text-white/45">来源：Meta Newsroom</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 02 品牌与所属企业 */}
          <section id="brand" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="02" />
              <div className="relative space-y-8">
                <SectionLabel no="02" label="品牌与所属企业" />
                <Hairline />
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl">Meta × EssilorLuxottica</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">M</div>
                    <span className="text-lg font-semibold text-white">Meta：提供智能核心与生态闭环</span>
                  </div>
                  <div className="text-sm text-white/75 leading-[1.8]">
                    <div>· 核心职能：负责产品的“智能化”定义。</div>
                    <div className="mt-2">· 具体作用：</div>
                    <ol className="mt-1 list-decimal list-outside pl-10 text-white/75">
                      <li className="mb-3"><span className="highlight-marker">AI 算力注入</span>：将 <span className="highlight-marker">Llama 3</span> 大模型集成至终端，提供多模态交互（语音/视觉）与云端推理能力，使眼镜具备理解环境的能力。</li>
                      <li className="mb-3">软件生态构建：提供 <span className="highlight-marker">操作系统（OS）</span> 及应用分发平台，确保硬件拥有持续的内容更新与服务支持。</li>
                      <li className="mb-3">数据闭环：通过 <span className="highlight-marker">第一视角采集数据</span>，反哺 AI 模型训练，形成技术迭代壁垒。</li>
                    </ol>
                    <div className="mt-2">· 关键价值：解决了传统眼镜“功能单一、缺乏交互”的问题，<span className="highlight-marker">赋予产品计算属性</span></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold">L</div>
                    <span className="text-lg font-semibold text-white">EssilorLuxottica：提供硬件载体与市场通道</span>
                  </div>
                  <div className="text-sm text-white/75 leading-[1.8]">
                    <div>· 核心职能：负责产品的“物理化”落地与商业化。</div>
                    <div className="mt-2">· 具体作用：</div>
                    <ol className="mt-1 list-decimal list-outside pl-10 text-white/75">
                      <li className="mb-3"><span className="highlight-marker">工业设计与光学整合</span>：利用 Ray-Ban 经典版型与光学专长，将摄像头、电池等电子元件<span className="highlight-marker">微型化并隐藏</span>，确保佩戴舒适度与美观性。</li>
                      <li className="mb-3">规模化制造：解决消费电子难以兼顾 <span className="highlight-marker">时尚品控与大规模生产</span> 的难题。</li>
                      <li className="mb-3">渠道渗透：开放全球零售网络及专业<span className="highlight-marker">验光渠道</span>，降低用户尝试门槛，解决智能眼镜“购买难、配镜难”的痛点。</li>
                    </ol>
                    <div className="mt-2">· 关键价值：解决了科技产品“形态怪异、渠道受限”的问题，<span className="highlight-marker">赋予产品消费属性</span></div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs tracking-[0.28em] text-white/55">合作模式小结</div>
                <p className="mt-3 text-sm text-white/75">Meta 提供能力与生态，EssilorLuxottica 提供品牌、工业设计与渠道，结果是把产品做成「像眼镜的 AI 设备」，降低心理门槛，缩短从尝鲜到日常佩戴的 adoption 曲线。</p>
              </div>
                <div className="grid gap-6 md:grid-cols-2">
                <MediaFigureByFile filename={'产品正侧视图.jpg'} caption={'产品正侧视图'} />
                <Figure src={camera12mp} caption="12MP 超广角相机模组（示意图）" credit="Meta Newsroom" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Figure src={'/report_media/放眼镜的侧面状态.png'} caption={'放眼镜的侧面状态'} credit={'Youtube账号sandyinthemood截取'} />
              <Figure src={'/report_media/折叠状态.png'} caption={'折叠状态'} credit={'Youtube账号sandyinthemood截取'} />
            </div>

              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 03 产品外观与结构构成 */}
          <section id="product" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden box-border p-10">
              <SectionNumberDecoration no="03" />
              <div className="relative space-y-8">
                <SectionLabel no="03" label="产品外观与结构构成" />
                <Hairline />
            <div className="grid gap-16 md:grid-cols-10 w-full">
              {/* 第一行：视觉与 CMF */}
              <div className="md:col-span-3 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl">产品形态描述</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Gen 2 延续了 Wayfarer 等经典廓形，通过极高密度的硬件堆叠，将整机重量严苛控制在
                  <span className="highlight-marker">52g</span>
                  的黄金临界点。这不仅是工业设计的突破，更是为了达成
                  <span className="highlight-marker">All-day Wearability</span>
                  的佩戴体验。在 CMF 策略上，
                  <span className="highlight-marker">Caramel</span>
                  与
                  <span className="highlight-marker">Jeans</span>
                  采用的半透明板材设计，巧妙地将精密电子元件转化为视觉装饰，利用“极客美学”降低了高科技产品的侵入感，使其成功从“穿戴设备”跃迁为具有 AI 能力的时尚配饰。
                </p>
              </div>

              <div className="md:col-span-7 flex gap-8">
                <div className="flex-1 min-w-0">
                  <img src={'/report_media/04_Looks_1-carousel.png'} alt="Caramel" className="w-full max-w-full h-auto object-contain" loading="lazy" />
                  <div className="mt-4 text-xs leading-relaxed text-white/55">
                    <span className="text-white/75 text-sm leading-[1.5]">Caramel (琥珀棕)</span>
                    <span className="block mt-2 text-white/45">来源：Ray-Ban Meta 官网公开素材</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <img src={'/report_media/04_Looks_3-carousel.png'} alt="Jeans" className="w-full max-w-full h-auto object-contain" loading="lazy" />
                  <div className="mt-4 text-xs leading-relaxed text-white/55">
                    <span className="text-white/75 text-sm leading-[1.5]">Jeans (牛仔蓝)</span>
                    <span className="block mt-2 text-white/45">来源：Ray-Ban Meta 官网公开素材</span>
                  </div>
                </div>
              </div>

              {/* 第二行，保持同样 3:7 栅格 */}
              <div className="md:col-span-3 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl mb-4">产品结构构成</h2>
                <p className="text-sm leading-relaxed text-white/75">
                  核心架构搭载专门优化的
                  <span className="highlight-marker">Snapdragon AR1 Gen1</span>
                  芯片，构建起
                  <span className="highlight-marker">低功耗的多模态感知闭环</span>。
                  内部组件采用对称配重与热管理优化布局，有效避免了智能眼镜常见的偏重与发热痛点。值得关注的是
                  <span className="highlight-marker">Capture LED 指示灯</span>
                  的引入，它是核心的“信任设计（
                  <span className="highlight-marker">Privacy by Design</span>
                  ）”，通过物理反馈重建了 AI 硬件与公共环境间的伦理契约。这种设计让交互逻辑从“低头屏显”回归到“抬头直觉”，定义了新一代 AI Agent 的感知边界。
                </p>
              </div>

              <div className="md:col-span-7">
                <img src={hardwareArch} alt="核心组件关系图" className="w-full max-w-full h-auto object-contain" />
                <div className="mt-4 text-xs leading-relaxed text-white/55">
                  <span className="text-white/75 text-sm leading-[1.5]">核心组件关系图</span>
                  <span className="block mt-2 text-white/45">来源：根据 Meta 公开信息整理</span>
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 04 核心技术与参数 */}
          <section id="specs" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="04" />
              <div className="relative space-y-8">
                <SectionLabel no="04" label="核心技术与参数" />
                <Hairline />
            <p className="text-sm text-white/75">无屏 AI 硬件最小闭环：<span className="text-white">看（camera）+ 听/说（mic & speaker）+ 低功耗算力（AR1）</span>。Gen 2 较初代续航翻倍、画质升级至 3K。</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs tracking-[0.28em] text-white/55">GEN 2 参数表</div>
                  <h3 className="mt-2 text-xl">技术参数（Ray-Ban Meta Gen 2）</h3>
                </div>
                <GlowBadge>美国 $379 起</GlowBadge>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
                  <thead>
                    <tr className="text-xs tracking-[0.22em] text-white/55">
                      <th className="border-b border-white/10 px-4 py-3">模块</th>
                      <th className="border-b border-white/10 px-4 py-3">关键参数</th>
                      <th className="border-b border-white/10 px-4 py-3">体验含义</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/75">
                    <tr><td className="border-b border-white/10 px-4 py-3 text-white">相机</td><td className="border-b border-white/10 px-4 py-3"><span className="highlight-marker">12MP 超广角</span>；<span className="highlight-marker">3K 录制</span>，1200p@60fps</td><td className="border-b border-white/10 px-4 py-3"><span className="highlight-marker">第一人称内容生产</span></td></tr>
                    <tr><td className="border-b border-white/10 px-4 py-3 text-white">音频</td><td className="border-b border-white/10 px-4 py-3"><span className="highlight-marker">五麦</span> + 双开放式扬声器</td><td className="border-b border-white/10 px-4 py-3">定向拾音、沉浸式录音；户外听清仍为痛点</td></tr>
                    <tr><td className="border-b border-white/10 px-4 py-3 text-white">芯片</td><td className="border-b border-white/10 px-4 py-3"><span className="highlight-marker">Snapdragon AR1 Gen1</span> + 恒玄 BES2700</td><td className="border-b border-white/10 px-4 py-3">低功耗、<span className="highlight-marker">实时交互</span></td></tr>
                    <tr><td className="border-b border-white/10 px-4 py-3 text-white">续航</td><td className="border-b border-white/10 px-4 py-3">典型 8h；<span className="highlight-marker">20 分钟快充约 50%</span>；充电盒约 48h 额外</td><td className="border-b border-white/10 px-4 py-3">补能从每日焦虑转为偶发</td></tr>
                    <tr><td className="px-4 py-3 text-white">其他</td><td className="px-4 py-3">32GB、IPX4、Wi‑Fi 6、蓝牙 5.3；<span className="highlight-marker">约 52g</span></td><td className="px-4 py-3">接近普通眼镜佩戴感</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-white/45">数据来源：Meta 官方、Omdia、公开评测。</div>
              <div className="mt-6">
                <Figure src={'/report_media/第一视角感.png'} caption="第一视角感" credit="Youtube账号sandyinthemood截取" />

                <div className="grid gap-6 md:grid-cols-2 mt-6">
                  <Figure src={'/report_media/右侧镜腿内部结构.png'} caption={'右侧镜腿内部结构'} credit={'AUDIO拆解文章'} />
                  <Figure src={'/report_media/眼镜盒内部结构.png'} caption={'眼镜盒内部结构'} credit={'AUDIO拆解文章'} />
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 05 AI 功能与应用点 */}
          <section id="ai" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="05" />
              <div className="relative space-y-8">
                <SectionLabel no="05" label="AI 功能与应用点" />
                <Hairline />

            <div className="grid gap-8">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl">“Look and Ask”多模态交互逻辑</h2>
                <p className="text-sm leading-relaxed text-white/75 mb-6">
                  <strong className="text-white">「Look and Ask」</strong>
                  实现了物理环境的<span className="highlight-marker">“Prompt 化”</span>。它消解了传统硬件繁琐的开启步骤，让第一视角成为<span className="highlight-marker">最自然的交互媒介</span>。从视觉获知到行为触发，AI 的介入被简化为一种近乎无感的<span className="highlight-marker">直觉反应</span>。
                </p>

                {/* images moved below near '智能声场' title to control layout and equal heights */}

                <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm leading-relaxed text-white/75">
                  <div className="text-xs tracking-[0.28em] text-white/55">WHY IT MATTERS</div>
                  <p className="mt-3">
                    眼镜的优势不是“信息更多”，而是 <span className="text-white">switching cost 更低</span>：不需要拿出手机、解锁、打开 App、对准镜头。
                  </p>
                </div>
              </div>

              <Figure
                src={lookAndAsk}
                caption="Look and Ask：从唤醒到动作闭环（课程自绘）"
                credit="根据 Meta Newsroom（2024-09）与 TechCrunch（2024-09）整理"
              />
            </div>

            <div className="grid gap-8">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl">实时翻译：无屏幕设备的“语言层 API”</h2>
                <p className="text-sm leading-relaxed text-white/75">
                  Meta 在 Connect 2024 相关更新中明确：眼镜将支持实时语音翻译——对方说西/法/意语时，用户可在开放式扬声器中听到英文译文，并计划扩展更多语言。
                  <span className="text-white/55">（Meta Blog, 2024；TechCrunch, 2024-09；Meta Newsroom, 2024-09）</span>
                </p>
                <ul className="space-y-2 text-sm text-white/75">
                  <li>• 把翻译从“打开 App”降级为“背景能力”（ambient computing）</li>
                  <li>• 与定向拾音/降噪强耦合：先听清楚谁在说，再译得对</li>
                </ul>
              </div>

              {/* Image removed per request */}

              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl">智能声场：内容可信度的隐形变量</h2>
                <p className="text-sm leading-relaxed text-white/75">
                  五麦克风阵列被官方用于强调“immersive audio recording”与在嘈杂/有风环境下更好表现。
                  <span className="text-white/55">（Meta Newsroom, 2023-09）</span>
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/75">
                  <div className="text-xs tracking-[0.28em] text-white/55">AIPM NOTE</div>
                  <p className="mt-3">
                    画质提升是“可感知卖点”，拾音提升往往是“留存与口碑卖点”。对 Vlog/直播而言，声音决定观众是否愿意停留。
                  </p>
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 06 功能与形态设计创新 */}
          <section id="design" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="06" />
              <div className="relative space-y-8">
                <SectionLabel no="06" label="功能与形态设计创新" />
                <Hairline />
                <p className="text-sm leading-relaxed text-white/70 md:whitespace-nowrap">
                  <span className="font-medium text-emerald-300">双轮驱动</span>
                  ：形态创新解决「愿意戴」，伦理设计解决「敢在公共场合戴」——二者共同构成 Ray‑Ban Meta 的可穿戴产品逻辑闭环。
                </p>
                <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
                  {/* 维度 A：形态与无感化 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-emerald-100/90">
                        <Glasses size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">维度 A · 形态与功能</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">
                        <span className="text-emerald-300">无感化</span>（Invisible Computing）
                      </h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="核心创新" accentClass="text-emerald-200/75">
                          将算力与传感「藏进」经典镜架语言：先确立 <span className="font-semibold text-emerald-300">Ray‑Ban 身份</span>，再叠加智能。
                        </DesignLogicRow>
                        <DesignLogicRow label="产品细节（Ray‑Ban Meta）" accentClass="text-emerald-200/75">
                          Wayfarer / Headliner 等经典廓形；镜腿集成 <span className="text-emerald-300">五麦克风阵列</span> 与开放式扬声器；Remix 提供大量镜框镜片组合，降低「设备感」。
                        </DesignLogicRow>
                        <DesignLogicRow label="用户价值" accentClass="text-emerald-200/75">
                          用户获得「仍像戴 Ray‑Ban」的社交形象，而非「戴了一台相机」的心理负担。
                        </DesignLogicRow>
                        <DesignLogicRow label="行业意义" accentClass="text-emerald-200/75">
                          为智能眼镜确立 <span className="text-emerald-300">「先眼镜、后智能」</span> 的工业设计路径，区别于纯极客硬件。
                        </DesignLogicRow>
                      </div>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-emerald-200/20 bg-emerald-300/10 px-5 py-3 text-sm text-emerald-50/95">
                      <span className="text-white/90">设计策略：</span>
                      借成熟时尚符号降低新硬件心理门槛，缩短尝鲜→日常佩戴的 adoption 曲线。
                    </div>
                  </div>

                  {/* 维度 B：伦理与信任 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-violet-100/90">
                        <ShieldAlert size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">维度 B · 伦理与心理</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">
                        <span className="text-violet-300">可见化治理</span>（Trust by Disclosure）
                      </h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="核心创新" accentClass="text-violet-200/75">
                          把「是否在录制」从黑箱变为<span className="font-semibold text-violet-300">可被旁观察觉</span>的状态信号，服务被拍者与旁观者。
                        </DesignLogicRow>
                        <DesignLogicRow label="产品细节（Ray‑Ban Meta）" accentClass="text-violet-200/75">
                          镜框外侧 <span className="text-violet-300">Capture LED</span> 在拍摄/录像时点亮；配合 Meta View 中的隐私与数据管理入口。
                        </DesignLogicRow>
                        <DesignLogicRow label="用户价值" accentClass="text-violet-200/75">
                          降低「被偷拍」的不确定感，缓解公共场合佩戴时的社交张力。
                        </DesignLogicRow>
                        <DesignLogicRow label="行业意义" accentClass="text-violet-200/75">
                          为面部可穿戴设备提供可复制的<span className="text-violet-300">「可见性伦理」</span>参考，而非事后追责式补救。
                        </DesignLogicRow>
                      </div>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-violet-200/20 bg-violet-300/10 px-5 py-3 text-sm text-violet-50/95">
                      <span className="text-white/90">设计策略：</span>
                      将隐私与伦理风险从舆论危机前移为当下可感知交互，把信任做成产品的一部分。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 07 主要应用场景 */}
          <section id="scenarios" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="07" />
              <div className="relative space-y-8">
                <SectionLabel no="07" label="主要应用场景" />
                <Hairline />
                <h2 className="text-2xl md:text-3xl">从用例到可扩展市场</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs tracking-[0.22em] text-white/55">01</div>
                <div className="mt-2 text-white font-medium">日常随拍 / Vlog·直播</div>
                <div className="mt-2 text-sm text-white/65">POV 拍摄、免手持操控；与 Meta 社交平台打通</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs tracking-[0.22em] text-white/55">02</div>
                <div className="mt-2 text-white font-medium">语音助手与即时翻译</div>
                <div className="mt-2 text-sm text-white/65">差旅、会议、跨境沟通；背景能力，减少掏手机</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs tracking-[0.22em] text-white/55">03</div>
                <div className="mt-2 text-white font-medium">音乐 / 通话 / 通知</div>
                <div className="mt-2 text-sm text-white/65">开放式音频，保留环境感知；通勤与办公</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-xs tracking-[0.22em] text-white/55">04</div>
                <div className="mt-2 text-white font-medium">无障碍与户外</div>
                <div className="mt-2 text-sm text-white/65">Be My Eyes POV 通话；Oakley 线覆盖运动户外</div>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                <MediaFigureByFile filename={'翻译演示.webp'} caption={'翻译演示（应用场景）'} />
                <MediaFigureByFile filename={'Hands-free communication.webp'} caption={'免提通话（应用场景）'} />
              </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 08 市场反响与关键指标 */}
          <section id="market" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="08" />
              <div className="relative space-y-8">
                <SectionLabel no="08" label="市场反响与关键指标" />
                <Hairline />
                <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
                  {/* 销量与增长 */}
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-emerald-100/90">
                        <TrendingUp size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">销量与增长</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white">规模与增速</h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="核心表现" accentClass="text-emerald-200/75">
                          <span className="text-emerald-300 font-semibold">2025</span> 全年销量超 <span className="font-semibold text-emerald-300">700 万</span> 副，同比增超 2 倍；上半年约为去年同期 <span className="font-semibold text-emerald-300">3 倍</span> 以上；累计突破 <span className="font-semibold text-emerald-300">200 万</span> 副，全球首款达该量级的智能眼镜（行业报道口径）。
                        </DesignLogicRow>
                        <DesignLogicRow label="数据支撑" accentClass="text-emerald-200/75">
                          AI 功能持续迭代，推动产品从尝鲜走向日常，用户需求倍数级释放。
                        </DesignLogicRow>
                        <DesignLogicRow label="市场洞察" accentClass="text-emerald-200/75">
                          硬件体验决定「能不能天天戴」。
                        </DesignLogicRow>
                      </div>
                    </div>
                  </div>

                  {/* 市占与地位 */}
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-cyan-100/90">
                        <Award size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">市占与行业地位</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white">壁垒与范本</h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="核心表现" accentClass="text-cyan-200/75">
                          全球无屏 AI 眼镜市占约 <span className="font-semibold text-cyan-300">85%</span>（<span className="text-cyan-200/90">Omdia</span>），占据主导地位；以公开报道量级估算，累计销售收入超 <span className="font-semibold text-cyan-300">6 亿美元</span>。
                        </DesignLogicRow>
                        <DesignLogicRow label="数据支撑" accentClass="text-cyan-200/75">
                          定义无屏 AI 眼镜产品形态，成为时尚 × 科技跨界融合的商业化范本。
                        </DesignLogicRow>
                        <DesignLogicRow label="市场洞察" accentClass="text-cyan-200/75">
                          品牌与渠道决定「能不能破圈」。
                        </DesignLogicRow>
                      </div>
                    </div>
                  </div>

                  {/* 产能与赛道 */}
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-violet-100/90">
                        <Rocket size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">产能与赛道趋势</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white">供给与空间</h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="核心表现" accentClass="text-violet-200/75">
                          <span className="text-violet-300 font-semibold">2026</span> 年底年产能规划约 <span className="font-semibold text-violet-300">1000 万</span> 台；无屏智能眼镜 <span className="text-violet-300 font-semibold">2025</span> 年同比增速约 <span className="font-semibold text-violet-300">+247%</span>（<span className="text-violet-200/90">IDC</span>，产业/媒体口径）。
                        </DesignLogicRow>
                        <DesignLogicRow label="数据支撑" accentClass="text-violet-200/75">
                          AI 能力持续升级，驱动无屏眼镜成为下一代核心智能硬件入口之一。
                        </DesignLogicRow>
                        <DesignLogicRow label="市场洞察" accentClass="text-violet-200/75">
                          AI 生态决定「能走多远」。
                        </DesignLogicRow>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 09 产业链与相关企业 */}
          <section id="industry" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="09" />
              <div className="relative space-y-8">
                <SectionLabel no="09" label="产业链与相关企业" />
                <Hairline />
                <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl">上中下游结构</h2>
                <p className="text-sm leading-relaxed text-white/75">芯片、光学、声学、结构到整机，中国供应链覆盖上游与中游核心环节；销量破 200 万副后产业链已规模化，计划 2026 年底年产能 1000 万台。</p>
                <ul className="space-y-2 text-sm text-white/75">
                  <li><span className="text-white">上游：</span>高通、恒玄、佰维、舜宇、水晶光电、德赛/飞毛腿、歌尔微、长盈、世运电路等</li>
                  <li><span className="text-white">中游：</span>歌尔股份（光波导+整机）、蓝思科技、立讯精密</li>
                  <li><span className="text-white">下游：</span>Meta（AI/生态）、EssilorLuxottica（品牌/渠道）</li>
                </ul>
              </div>
              <Figure src={industryChain} caption="产业链与应用关系图" credit="根据公开资料整理" />
            </div>
            <div className="mt-6">
              <Figure src={'/report_media/产业链图谱.png'} caption={'产业链图谱'} credit={'艾瑞咨询'} />
            </div>
            <div className="mt-8">
              <div className="text-xs tracking-[0.28em] text-white/55">FOCUS · 三家代表企业深度分析</div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06]">
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-cyan-200/25 bg-black/25 px-2 py-1 text-[11px] text-cyan-100/90">低功耗音频中枢</div>
                      <div className="text-xs text-cyan-100/70">BES</div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">恒玄科技（BES）</h3>
                    <div className="mt-3 text-xs tracking-[0.2em] text-cyan-100/75">FACT</div>
                    <ul className="mt-2 space-y-1 text-sm text-white/75">
                      <li>智能眼镜 SoC 方向聚焦语音交互与低功耗连接。</li>
                      <li>能力映射远场拾音、语音唤醒、降噪与本地音频链路。</li>
                    </ul>
                  </div>
                  <div className="border-t border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-50/90">
                    <span className="text-white">INSIGHT：</span>解决“语音交互与续航”双约束，是无屏 AI 眼镜可用性的底层保障。
                  </div>
                </div>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/[0.06]">
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-violet-200/25 bg-black/25 px-2 py-1 text-[11px] text-violet-100/90">精密制造底座</div>
                      <div className="text-xs text-violet-100/70">GTK</div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">歌尔股份（Goertek）</h3>
                    <div className="mt-3 text-xs tracking-[0.2em] text-violet-100/75">FACT</div>
                    <ul className="mt-2 space-y-1 text-sm text-white/75">
                      <li>Meta 智能眼镜供应链关键制造伙伴之一。</li>
                      <li>将声学/光学/电池/无线元件高密度压缩进镜腿与镜框。</li>
                    </ul>
                  </div>
                  <div className="border-t border-violet-200/20 bg-violet-300/10 px-5 py-3 text-sm text-violet-50/90">
                    <span className="text-white">INSIGHT：</span>把原型能力变成消费级量产能力，决定交付速度、良率与成本曲线。
                  </div>
                </div>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06]">
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-emerald-200/25 bg-black/25 px-2 py-1 text-[11px] text-emerald-100/90">时尚溢价引擎</div>
                      <div className="text-xs text-emerald-100/70">EL</div>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">陆逊梯卡（EssilorLuxottica）</h3>
                    <div className="mt-3 text-xs tracking-[0.2em] text-emerald-100/75">FACT</div>
                    <ul className="mt-2 space-y-1 text-sm text-white/75">
                      <li>与 Meta 长期合作，整合 Ray-Ban 品牌、设计与光学制造。</li>
                      <li>依托全球零售网络，把产品从科技圈扩展到大众消费场景。</li>
                    </ul>
                  </div>
                  <div className="border-t border-emerald-200/20 bg-emerald-300/10 px-5 py-3 text-sm text-emerald-50/90">
                    <span className="text-white">INSIGHT：</span>让 AI 硬件具备“戴得出去”的社交属性，是规模化商业化的关键一环。
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 10 用户痛点与局限 */}
          <section id="pain" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="10" />
              <div className="relative space-y-8">
                <SectionLabel no="10" label="用户痛点与局限" />
                <Hairline />
                <div className="grid gap-4 md:grid-cols-3 md:items-stretch">
                  {/* 硬件体验 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06]">
                    <div className="flex min-h-0 flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-emerald-100/90">
                        <Battery size={16} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">硬件体验</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">续航与佩戴</h3>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <PainScanRow label="核心痛点">
                          续航仍偏短（初代约 <span className="font-semibold text-emerald-300">3–4h</span>，Gen2 约 <span className="font-semibold text-emerald-300">8h</span>）；镜架偏欧美版，亚洲佩戴易不适。
                        </PainScanRow>
                        <PainScanRow label="用户影响">随身场景受限，难替代传统眼镜的日常属性。</PainScanRow>
                        <PainScanRow label="优化方向">低功耗芯片 + 亚洲版人体工学镜架。</PainScanRow>
                      </div>
                      <Collapsible className="mt-3 shrink-0">
                        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/70 transition-colors hover:bg-white/[0.07]">
                          <span>详情与依据</span>
                          <ChevronDown className="size-4 shrink-0 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="mt-2 space-y-1.5 rounded-lg border border-white/8 bg-black/30 p-3 text-xs leading-relaxed text-white/60">
                            <li>• 高强度使用下仍难支撑全天连续使用。</li>
                            <li>• 鼻托压感、夹头等反馈较常见；第三方替换鼻托反映适配需求。</li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-emerald-200/20 bg-emerald-300/10 px-5 py-3 text-sm text-emerald-50/90">
                      INSIGHT：先解决「能久戴」，再谈规模渗透。
                    </div>
                  </div>

                  {/* AI 功能 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-cyan-400/[0.06]">
                    <div className="flex min-h-0 flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-cyan-100/90">
                        <Bot size={16} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">AI 功能</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">音频与交互</h3>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <PainScanRow label="核心痛点">
                          开放式户外听感弱、漏音；无屏以音频为主；大陆 <span className="font-semibold text-cyan-200">Meta AI</span> 能力受限。
                        </PainScanRow>
                        <PainScanRow label="用户影响">核心 AI 难完整落地，国内体验易断层。</PainScanRow>
                        <PainScanRow label="优化方向">声学升级 + 多模态交互 + 国内生态接入。</PainScanRow>
                      </div>
                      <Collapsible className="mt-3 shrink-0">
                        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/70 transition-colors hover:bg-white/[0.07]">
                          <span>详情与依据</span>
                          <ChevronDown className="size-4 shrink-0 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="mt-2 space-y-1.5 rounded-lg border border-white/8 bg-black/30 p-3 text-xs leading-relaxed text-white/60">
                            <li>• 开放式结构在嘈杂环境中可懂度与隐私性常受诟病。</li>
                            <li>• 无屏限制可视化与复杂任务；中文与区域服务依赖生态适配。</li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-50/90">
                      INSIGHT：AI 价值在「能落地」，不在「能演示」。
                    </div>
                  </div>

                  {/* 伦理风险 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/[0.06]">
                    <div className="flex min-h-0 flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-violet-100/90">
                        <ShieldAlert size={16} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">伦理风险</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">隐私与社交</h3>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <PainScanRow label="核心痛点">
                          摄像头引发社交顾虑；指示灯难完全消除担忧；行业监测线上退货约 <span className="font-semibold text-emerald-300">30%–50%</span>（口径不一）。
                        </PainScanRow>
                        <PainScanRow label="用户影响">信任与社交成本高，制约规模化与商业化节奏。</PainScanRow>
                        <PainScanRow label="优化方向">隐私设计 + 社交感知 + 信任体系。</PainScanRow>
                      </div>
                      <Collapsible className="mt-3 shrink-0">
                        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/70 transition-colors hover:bg-white/[0.07]">
                          <span>详情与依据</span>
                          <ChevronDown className="size-4 shrink-0 text-white/50 transition-transform duration-200 group-data-[state=open]:rotate-180" aria-hidden />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="mt-2 space-y-1.5 rounded-lg border border-white/8 bg-black/30 p-3 text-xs leading-relaxed text-white/60">
                            <li>• 头顶 / 前置镜头易被解读为「被拍摄」风险。</li>
                            <li>• 退货率区间因平台、品类、统计口径差异大，宜作趋势参考。</li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    <div className="mt-auto shrink-0 border-t border-violet-200/20 bg-violet-300/10 px-5 py-3 text-sm text-violet-50/90">
                      INSIGHT：伦理与信任是规模化的前置条件。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 11 竞品定位与差异 */}
          <section id="competitive" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="11" />
              <div className="relative space-y-8">
                <SectionLabel no="11" label="竞品定位与差异" />
                <Hairline />
                <div className="space-y-6">
                  <div className="grid gap-6">
                    {/* Ray-Ban Meta 卡片（非对称：左图，右避坑分析） */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:grid md:grid-cols-[260px_1fr] md:items-center">
                      <div className="mr-6">
                        <img src={'/report_media/腕带和眼镜2.jpg'} alt="Ray-Ban Meta" className="w-full h-auto object-contain rounded-lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Ray‑Ban Meta Display（AR旗舰标杆）</h3>
                        <p className="mt-2 text-sm text-white/75">
                          搭载单眼全彩LCoS光波导显示屏，核心优势为AR虚实融合交互与第一视角内容生产；配套Meta Neural Band神经腕带，实现肌电手势操控，交互效率大幅提升。
                        </p>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/75">
                          <li>显示与成像：单眼全彩LCoS光波导+12MP摄像头，兼顾AR交互与第一视角内容生产。</li>
                          <li>交互：带屏AR+语音+肌电手势（腕带），多模态交互效率拉满。</li>
                        </ul>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="rounded-lg bg-black/30 p-3 text-sm text-white/75">续航（眼镜）：<span className="text-white">6h</span></div>
                          <div className="rounded-lg bg-black/30 p-3 text-sm text-white/75">Meta Neural Band（神经腕带）：<span className="text-white">18h</span></div>
                        </div>
                        <div className="mt-4 rounded-lg border border-white/6 bg-black/20 p-3 text-sm text-white/70">
                          <strong className="text-white">避坑式分析：</strong> 带屏AR机身重量更高（约51g），长时间佩戴压感明显；LCoS屏幕户外亮度有限，强光下可视性下降；神经腕带需额外佩戴，增加随身负担。
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <figure className="space-y-3">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                          <video src={'/report_media/EMG 腕带演示视频.mp4'} controls playsInline className="w-full" preload="metadata" />
                        </div>
                        <figcaption className="text-xs leading-relaxed text-white/55">
                          <span className="text-white/75">EMG 腕带演示视频</span>
                          <span className="block pt-1 text-white/45">来源：Ray-Ban Meta 官网公开素材</span>
                        </figcaption>
                      </figure>

                      <figure className="space-y-3">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-72">
                          <img src={'/report_media/腕带和眼镜.webp'} alt="腕带和眼镜" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <figcaption className="text-xs leading-relaxed text-white/55">
                          <span className="text-white/75">腕带和眼镜</span>
                          <span className="block pt-1 text-white/45">来源：Ray-Ban Meta 官网公开素材</span>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                      <figure className="space-y-3">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-72">
                          <img src={'/report_media/影视剧即时翻译效果.png'} alt="影视剧即时翻译效果" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <figcaption className="text-xs leading-relaxed text-white/55">
                          <span className="text-white/75">影视剧即时翻译效果</span>
                          <span className="block pt-1 text-white/45">来源：Youtube账号sandyinthemood截取</span>
                        </figcaption>
                      </figure>

                      <figure className="space-y-3">
                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 h-72">
                          <img src={'/report_media/发布会演示效果.png'} alt="发布会演示效果" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <figcaption className="text-xs leading-relaxed text-white/55">
                          <span className="text-white/75">发布会演示效果</span>
                          <span className="block pt-1 text-white/45">来源：Meta发布会截图</span>
                        </figcaption>
                      </figure>
                    </div>

                    {/* 夸克 S1 卡片 */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:grid md:grid-cols-[260px_1fr] md:items-center">
                      <div className="mr-6">
                        <img src={'/report_media/夸克S1.jpg'} alt="夸克 S1" className="w-full h-auto object-contain rounded-lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">夸克 S1（国产黑马）</h3>
                        <p className="mt-2 text-sm text-white/75">
                          强调阿里千问生态支持，并在工程上解决了显示类常见问题（<span className="highlight-marker">两眼绿光</span>）的四向调节；骨传导方案在嘈杂环境下提供更好的<span className="highlight-marker">骨传导收音</span>，并实现了便捷的<span className="highlight-marker">换电方案</span>（热插拔）。
                        </p>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/75">
                          <li>生态：阿里千问，应用与本地化服务丰富。</li>
                          <li>工程：显示调节与换电设计为其差异化优势。</li>
                        </ul>
                        <div className="mt-4 rounded-lg border border-white/6 bg-black/20 p-3 text-sm text-white/70">
                          <strong className="text-white">避坑式分析：</strong> 骨传导固然在私密收音上表现优异，但需验证在高速通行/强噪声下的拾音鲁棒性与振动耦合问题。
                        </div>
                      </div>
                    </div>

                    {/* 小米 AI 卡片 */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:grid md:grid-cols-[260px_1fr] md:items-center">
                      <div className="mr-6">
                        <img src={'/report_media/小米AI眼镜.jpg'} alt="小米 AI 眼镜" className="w-full h-auto object-contain rounded-lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">小米 AI（生态入口）</h3>
                        <p className="mt-2 text-sm text-white/75">
                          优势在于“小爱同学”对智能家居的底层控制能力，以及设备的物理接口通用性（Type‑C），便于与手机/配件互联。
                        </p>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/75">
                          <li>生态互联：在 IoT 场景下具备快速落地能力。</li>
                          <li>工程设计：注重成本与普适接口带来的兼容性。</li>
                        </ul>
                        <div className="mt-4 rounded-lg border border-white/6 bg-black/20 p-3 text-sm text-white/70">
                          <strong className="text-white">避坑式分析：</strong> Type‑C 虽然通用，但接口布局与防水、耐用性是工程实现的关键。
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 技术共性 Tip */}
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <div className="text-xs tracking-[0.28em] text-white/55">TIP · 技术共性痛点</div>
                    <p className="mt-3 text-sm text-white/75">所有无屏/开放式结构的产品普遍存在严重的漏音（open‑ear leakage）问题：扬声器向外泄露导致隐私/通话质量下降，需要在声学隔离、指向性扬声器与软件回声控制上做工程折衷。</p>
                  </div>

                  {/* 工业设计洞察：动态平衡 */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-xs tracking-[0.28em] text-white/55">ID 洞察 · 动态平衡</div>
                    <p className="mt-3 text-sm text-white/75">重量轻是基础，真正影响长时间佩戴舒适性的，是整体的 <span className="highlight-marker">重心平衡</span> 与重量分布。例如把电池/芯片后置可显著降低鼻梁压迫感，并在动态活动中提升稳定性；工程上需兼顾结构强度与热流管理。</p>
                  </div>

                  {/* 底层参数横评 */}
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
                      <thead>
                        <tr className="text-xs tracking-[0.2em] text-white/55">
                          <th className="border-b border-white/10 px-4 py-3 text-left">产品</th>
                          <th className="border-b border-white/10 px-4 py-3 text-left">传感器 / 相机</th>
                          <th className="border-b border-white/10 px-4 py-3 text-left">显示/光学</th>
                          <th className="border-b border-white/10 px-4 py-3 text-left">音频方案</th>
                          <th className="border-b border-white/10 px-4 py-3 text-left">电池 / 续航</th>
                          <th className="border-b border-white/10 px-4 py-3 text-left">工程亮点</th>
                        </tr>
                      </thead>
                      <tbody className="text-white/75">
                        <tr>
                          <td className="border-b border-white/10 px-4 py-3 text-white">Ray-Ban Meta Display（AR旗舰）</td>
                          <td className="border-b border-white/10 px-4 py-3">12MP IMX681（支持第一视角拍摄 + AR空间感知）</td>
                          <td className="border-b border-white/10 px-4 py-3">单眼全彩LCoS光波导显示屏；支持AR虚实融合交互，显示位置可调节</td>
                          <td className="border-b border-white/10 px-4 py-3">开放式扬声器（优化漏音控制，支持空间音频）+ 多麦克风阵列（通话降噪）</td>
                          <td className="border-b border-white/10 px-4 py-3">眼镜：6h；Meta Neural Band 神经腕带：18h</td>
                          <td className="border-b border-white/10 px-4 py-3">LCoS光波导集成设计、肌电手势交互（神经腕带）、AR空间定位优化</td>
                        </tr>
                        <tr>
                          <td className="border-b border-white/10 px-4 py-3 text-white">夸克 S1</td>
                          <td className="border-b border-white/10 px-4 py-3">适配主流传感器，侧重显示校准</td>
                          <td className="border-b border-white/10 px-4 py-3">四向调节以缓解 <span className="highlight-marker">两眼绿光</span> 外泄</td>
                          <td className="border-b border-white/10 px-4 py-3">骨传导 + 定向拾音（强调 <span className="highlight-marker">骨传导收音</span>）</td>
                          <td className="border-b border-white/10 px-4 py-3">换电方案支持热插拔（工程上提升可持续使用）</td>
                          <td className="border-b border-white/10 px-4 py-3">换电模块化、显示调节机制</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-white">小米 AI</td>
                          <td className="px-4 py-3">传感器通用，偏向成本/生态优化</td>
                          <td className="px-4 py-3">部分机型带光学/显示方案，兼顾成本</td>
                          <td className="px-4 py-3">采用逆声场防漏音技术，能有效抑制声音外泄，保护隐私</td>
                          <td className="px-4 py-3">针对 AI 交互、通话、拍摄等高耗场景优化续航策略</td>
                          <td className="px-4 py-3">Type‑C 接口与生态互联为工程优势</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 12 小结与趋势 */}
          <section id="summary" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="12" />
              <div className="relative space-y-8">
                <SectionLabel no="12" label="小结与趋势" />
                <Hairline />
                <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
                  {/* 趋势 A：AI 饰品化 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-emerald-100/90">
                        <Crown size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">趋势 A</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">
                        <span className="text-emerald-300">AI 饰品化</span>
                      </h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="趋势本质" accentClass="text-emerald-200/75">
                          AI 硬件从「工具属性」转向<span className="font-semibold text-emerald-300">时尚配饰属性</span>，成为身份与风格的延伸，而非仅效率终端。
                        </DesignLogicRow>
                        <DesignLogicRow label="落地路径（Ray‑Ban Meta 延伸）" accentClass="text-emerald-200/75">
                          将算力与传感封装为可演进形态：镜腿 / 挂件式模块（续航、传感、声学），配合 Remix 定制与多代迭代，走向可升级的「可穿戴单品」。
                        </DesignLogicRow>
                        <DesignLogicRow label="行业价值" accentClass="text-emerald-200/75">
                          降低新硬件心理门槛，推动 AI 眼镜从尝鲜到日常，巩固 <span className="text-emerald-300">科技 × 时尚</span> 的商业范式。
                        </DesignLogicRow>
                      </div>
                    </div>
                  </div>

                  {/* 趋势 B：无屏「第三 UI」 */}
                  <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-violet-400/[0.06]">
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-violet-100/90">
                        <Layers size={18} aria-hidden />
                        <span className="text-xs tracking-[0.2em]">趋势 B</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold text-white md:text-xl">
                        无屏<span className="text-violet-300">「第三 UI」</span>
                      </h2>
                      <div className="mt-4 flex flex-1 flex-col gap-2.5">
                        <DesignLogicRow label="趋势本质" accentClass="text-violet-200/75">
                          打破手机 / VR「屏幕中心」范式，以语音、<span className="font-semibold text-violet-300">环境视觉</span>与轻交互构成无屏界面层。
                        </DesignLogicRow>
                        <DesignLogicRow label="落地路径（Ray‑Ban Meta 延伸）" accentClass="text-violet-200/75">
                          将手机任务流拆解为可嵌入日常的 micro‑interactions：「Hey Meta」、第一视角拍摄、免手持直播与情境提示，减少掏手机切换成本。
                        </DesignLogicRow>
                        <DesignLogicRow label="行业价值" accentClass="text-violet-200/75">
                          重构人机交互逻辑，让计算「回到生活现场」，为下一代随身智能设备定义交互语法。
                        </DesignLogicRow>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.08] px-5 py-4 md:px-6 md:py-5">
                  <div className="text-xs tracking-[0.28em] text-emerald-200/70">CLOSING LINE</div>
                  <p className="mt-2 text-base leading-relaxed text-white/90 md:text-lg">
                    AI 硬件的第二形态不是再造一块屏幕，而是把计算<span className="font-medium text-emerald-300">悄悄塞回生活</span>。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* 13 参考来源 */}
          <section id="sources" className="scroll-mt-28">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <SectionNumberDecoration no="13" />
              <div className="relative space-y-8">
                <SectionLabel no="13" label="参考来源" />
                <Hairline />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 rounded-2xl border border-white/6 bg-black/20 p-3 text-xs text-white/60">
                浙江大学 · 工业设计工程 · 课程：智能设计 · 学号：22521323 · 姓名：王愉超 · 制作时间：2026 年 3-4 月
              </div>
              <ol className="space-y-3 text-sm leading-relaxed text-white/75">
                <li>
                  1. Meta Newsroom (2023-09-27). Introducing the New Ray‑Ban | Meta Smart Glasses.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/" target="_blank" rel="noreferrer">
                    https://about.fb.com/news/2023/09/new-ray-ban-meta-smart-glasses/
                  </a>
                </li>
                <li>
                  2. Meta Newsroom (2024-04). Meet Your New Assistant: Meta AI, Built With Llama 3.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/" target="_blank" rel="noreferrer">
                    https://about.fb.com/news/2024/04/meta-ai-assistant-built-with-llama-3/
                  </a>
                </li>
                <li>
                  3. Meta Newsroom (2024-09). Ray‑Ban | Meta Glasses Are Getting New AI Features and More Partner Integrations.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://about.fb.com/news/2024/09/ray-ban-meta-glasses-new-ai-features-and-partner-integrations/" target="_blank" rel="noreferrer">
                    https://about.fb.com/news/2024/09/ray-ban-meta-glasses-new-ai-features-and-partner-integrations/
                  </a>
                </li>
                <li>
                  4. Meta Blog (Connect 2024). Ray‑Ban | Meta Glasses Continue to Advance With New AI Features…
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.meta.com/blog/ray-ban-meta-glasses-collection-news-updates-connect-2024/" target="_blank" rel="noreferrer">
                    https://www.meta.com/blog/ray-ban-meta-glasses-collection-news-updates-connect-2024/
                  </a>
                </li>
                <li>
                  5. TechCrunch (2024-09-25). Meta updates Ray‑Ban smart glasses with real-time AI video, reminders, and QR code scanning.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://techcrunch.com/2024/09/25/meta-updates-ray-ban-smart-glasses-with-real-time-ai-video-reminders-and-qr-code-scanning/" target="_blank" rel="noreferrer">
                    https://techcrunch.com/2024/09/25/meta-updates-ray-ban-smart-glasses-with-real-time-ai-video-reminders-and-qr-code-scanning/
                  </a>
                </li>
                <li>
                  6. Vision Monday (2025-02-13). EssilorLuxottica Reports Q4 and Full‑Year 2024…（含“reported 2 million units”转述）
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.visionmonday.com/eyecare/article/essilorluxottica-reports-q4-and-fullyear-2024-revenue-growth-touts-early-success-of-rayban-meta-smartglasses-and-reaffirms-longterm-guidance/" target="_blank" rel="noreferrer">
                    https://www.visionmonday.com/eyecare/article/essilorluxottica-reports-q4-and-fullyear-2024-revenue-growth-touts-early-success-of-rayban-meta-smartglasses-and-reaffirms-longterm-guidance/
                  </a>
                </li>
                <li>
                  7. EssilorLuxottica Press Release (2025-02-12). Q4/Full Year 2024 Results.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.essilorluxottica.com/en/newsroom/press-releases/q4-full-year-2024-results/" target="_blank" rel="noreferrer">
                    https://www.essilorluxottica.com/en/newsroom/press-releases/q4-full-year-2024-results/
                  </a>
                </li>
                <li>
                  8. Meta Blog. Oakley Meta AI Glasses: Sports Wearables and HSTN.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.meta.com/blog/oakley-meta-ai-glasses-sports-wearables-hstn/" target="_blank" rel="noreferrer">
                    https://www.meta.com/blog/oakley-meta-ai-glasses-sports-wearables-hstn/
                  </a>
                </li>
                <li>
                  9. 52 音频. 拆解报告：RayBan雷朋.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.52audio.com/archives/229348.html" target="_blank" rel="noreferrer">
                    https://www.52audio.com/archives/229348.html
                  </a>
                </li>
                <li>
                  10. WaytoAGI 飞书知识库. 智能眼镜全球融投资.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://waytoagi.feishu.cn/wiki/RWC5wEsFbiGXIEkrGrtcWsFPnye" target="_blank" rel="noreferrer">
                    https://waytoagi.feishu.cn/wiki/RWC5wEsFbiGXIEkrGrtcWsFPnye
                  </a>
                </li>
                <li>
                  11. OFweek 可穿戴设备网. 智能眼镜行业报道.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://mp.ofweek.com/wearable/a956714161607" target="_blank" rel="noreferrer">
                    https://mp.ofweek.com/wearable/a956714161607
                  </a>
                </li>
                <li>
                  12. 小米官网. 小米 AI 眼镜 产品介绍页.
                  <a className="ml-2 text-[oklch(0.78_0.18_190)] underline underline-offset-4" href="https://www.mi.com/prod/xiaomi-ai-glasses" target="_blank" rel="noreferrer">
                    https://www.mi.com/prod/xiaomi-ai-glasses
                  </a>
                </li>
              </ol>
            </div>

            <footer className="pt-4 text-xs text-white/45">
              © 2026 课堂展示用。图片与引用归原作者/机构所有。
            </footer>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile TOC */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[oklch(0.145_0_0_/_0.72)] px-4 py-3 backdrop-blur">
          <div className="text-xs tracking-[0.22em] text-white/65">目录</div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {nav.slice(0, 8).map((it) => (
              <a
                key={it.id}
                href={`/#/${it.id}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
              >
                {it.no}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
