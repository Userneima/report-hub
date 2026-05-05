import { useEffect, useMemo, useRef, useState } from "react";
import coverHero from "@/assets/cover-hero.jpg";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CircuitBoard, Sparkles, Smartphone, Database, BrainCircuit, ChevronDown } from "lucide-react";
import heroProductShot from "../../2.插图/正侧视图.png";
import productBackShot from "../../2.插图/录音豆背面.png";
import usageShot from "../../2.插图/使用方式.jpg";
import sideShot from "../../2.插图/机身侧边.png";
import chargingPortShot from "../../2.插图/充电口.png";
import internalsShot from "../../2.插图/录音豆内部主要部件.jpg";
import magneticStructureShot from "../../2.插图/录音豆的磁吸片结构一览.png";
import sideConnectorShot from "../../2.插图/连接处侧面.png";

interface HomeProps {
  targetSection?: string;
}

type NavItem = { id: string; label: string };

function FlowDivider({ label }: { label: string }) {
  return (
    <div className="relative my-8 md:my-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[oklch(var(--neon-raw)/35%)] to-transparent" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-4 py-1 rounded-full border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--background)/70%)] text-xs text-[oklch(var(--neon-raw))] font-mono-tech tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );
}

function SectionTitle({ index, title, desc }: { index: string; title: string; desc?: string }) {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--neon-raw)/10%)] px-3 py-1 text-xs font-mono-tech tracking-widest text-[oklch(var(--neon-raw))]">
        {index}
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h2>
      {desc ? <p className="text-muted-foreground">{desc}</p> : null}
    </div>
  );
}

function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (top?.target?.id) setActiveId(top.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0.15, 0.35] },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds]);
  return activeId;
}

export default function Home({ targetSection }: HomeProps) {
  const references = [
    {
      url: "https://www.feishu.cn/content/article/7597268954498763996",
      note: "飞书官方：安克 AI 录音豆核心功能、形态、参数与场景说明。",
    },
    {
      url: "https://finance.sina.com.cn/tech/2026-01-19/doc-inhhvfsc9940714.shtml",
      note: "新浪科技：发布信息、售价与公开规格。",
    },
    {
      url: "https://www.yicai.com/news/103012771.html",
      note: "第一财经：安克与飞书分工、豆包相关表述与行业背景。",
    },
    {
      url: "https://www.feishu.cn/content/article/7604785985032883402",
      note: "飞书方案文：录音豆与多维表格工作流联动。",
    },
    {
      url: "https://news.qq.com/rain/a/20260128A03FVD00",
      note: "第三方评测：使用体验与参数补充。",
    },
    {
      url: "https://finance.sina.com.cn/tech/roll/2026-01-21/doc-inhhyskr7176966.shtml",
      note: "新浪滚动：AI 硬件与生产力平台结合的行业分析。",
    },
    {
      url: "https://www.bestechnic.com/",
      note: "恒玄科技官网：低功耗无线计算 SoC 能力。",
    },
    {
      url: "https://www.goertek.com/about/intro.html",
      note: "歌尔股份官网：声学与精密制造能力介绍。",
    },
    {
      url: "https://article.pchome.net/news/5967.html",
      note: "DingTalk A1 发布信息与价格带参考。",
    },
    {
      url: "https://tw.plaud.ai/blogs/news/plaud-ai-100-million-milestone",
      note: "PLAUD 官方信息：销量里程碑与产品市场表现。",
    },
    {
      url: "https://zhuanlan.zhihu.com/p/2012496428900037872",
      note: "知乎专栏：安克 AI 录音豆拆解向内容（用于结构与器件线索参考）。",
    },
  ];

  useEffect(() => {
    if (targetSection) document.getElementById(targetSection)?.scrollIntoView({ behavior: "smooth" });
  }, [targetSection]);

  const navItems: NavItem[] = useMemo(
    () => [
      { id: "cover", label: "封面" },
      { id: "case-selection", label: "案例选择" },
      { id: "brand", label: "品牌" },
      { id: "product-composition", label: "产品构成" },
      { id: "market", label: "市场" },
      { id: "supply-chain", label: "产业链" },
      { id: "pain-points", label: "痛点" },
      { id: "competition", label: "竞品对比" },
      { id: "summary-trend", label: "总结 / 趋势" },
      { id: "references", label: "参考" },
    ],
    [],
  );
  const activeId = useScrollSpy(useMemo(() => navItems.map((n) => n.id), [navItems]));
  const productSubNav = useMemo(
    () => [
      { id: "pc-04", label: "3.1 技术参数" },
      { id: "pc-05", label: "3.2 AI 应用" },
      { id: "pc-06", label: "3.3 设计创新" },
      { id: "pc-07", label: "3.4 应用场景" },
    ],
    [],
  );
  const topRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={topRef} className="min-h-screen bg-background text-foreground noise-overlay">
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[oklch(var(--background)/70%)] backdrop-blur-xl border-b border-border">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
            <button
              className="hidden md:flex items-center gap-2 rounded-xl border border-[oklch(var(--neon-raw)/25%)] bg-[oklch(var(--neon-raw)/8%)] px-3 py-2 text-sm font-semibold"
              onClick={() => topRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              <Sparkles className="h-4 w-4 text-[oklch(var(--neon-raw))]" />
              安克 AI 报告目录版
            </button>
            <nav className="flex-1 relative overflow-visible">
              <div className="overflow-x-auto md:overflow-visible">
                <ul className="flex items-center gap-2 min-w-max md:min-w-0">
                {navItems.map((item) => (
                  <li key={item.id} className={cn(item.id === "product-composition" && "relative group")}>
                    {item.id === "product-composition" ? (
                      <>
                        <a
                          href={`/#/${item.id}`}
                          className={cn(
                            "px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-1",
                            activeId === item.id
                              ? "text-[oklch(var(--neon-raw))] bg-[oklch(var(--neon-raw)/10%)]"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                          )}
                        >
                          {item.label}
                          <ChevronDown className="h-3.5 w-3.5 opacity-80" />
                        </a>
                        <div className="pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto absolute top-full left-0 z-50 pt-2 transition-all duration-150">
                          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-[oklch(var(--background)/90%)] p-2 backdrop-blur-md">
                            {productSubNav.map((sub) => (
                              <a
                                key={sub.id}
                                href={`/#/${sub.id}`}
                                className="rounded-full border border-white/15 bg-[oklch(var(--background)/55%)] px-3 py-1.5 text-xs text-muted-foreground whitespace-nowrap hover:text-[oklch(var(--neon-raw))] hover:border-[oklch(var(--neon-raw)/35%)]"
                              >
                                {sub.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <a
                        href={`/#/${item.id}`}
                        className={cn(
                          "px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap",
                          activeId === item.id
                            ? "text-[oklch(var(--neon-raw))] bg-[oklch(var(--neon-raw)/10%)]"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                        )}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
                </ul>
              </div>
            </nav>
            <div className="hidden md:flex items-center gap-2">
              <div className="h-2 w-28 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[oklch(var(--neon-raw))]" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs font-mono-tech text-muted-foreground tabular-nums">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>

      <section id="cover" className="relative pt-24 md:pt-28">
        <div className="absolute inset-0 -z-10">
          <img src={coverHero} alt="封面背景" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(var(--background)/65%)] via-[oklch(var(--background)/85%)] to-[oklch(var(--background))]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,255,133,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,133,0.12) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <Card className="relative overflow-hidden border-white/10 bg-[oklch(var(--card)/58%)] p-0 rounded-3xl">
            <img
              src={heroProductShot}
              alt="安克 AI 录音豆产品封面图"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(2,8,20,0.92)_0%,rgba(2,8,20,0.78)_46%,rgba(2,8,20,0.68)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(0,255,133,0.18),transparent_42%)]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 p-6 md:p-8 items-stretch">
              <div className="lg:col-span-6">
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {["AI 录音硬件", "飞书深度集成", "仅 10g 磁吸佩戴"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/20 bg-[oklch(var(--background)/38%)] px-3 py-1 text-muted-foreground backdrop-blur-md"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
                  安克 AI 录音豆
                  <span className="block text-[oklch(var(--neon-raw))]">Industrial + AI Case Study</span>
                </h1>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  智能设计课程 | 市场格局、核心产品、技术迭代、产业链与用户反馈多维度拆解分析
                </p>
                <p className="mt-4 text-xs text-muted-foreground/80">
                  12 章节：案例选择 {"->"} 品牌 {"->"} 产品 {"->"} 市场 {"->"} 产业链 {"->"} 痛点 {"->"} 竞品 {"->"} 总结
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 max-w-xl">
                  {[
                    ["Anker × Feishu", "联合推出"],
                    ["2026/01/19", "上市时间"],
                    ["¥899", "公开售价"],
                  ].map(([v, k]) => (
                    <div
                      key={k}
                      className="rounded-xl border border-white/15 bg-[oklch(var(--background)/44%)] backdrop-blur-md p-3"
                    >
                      <p className="text-sm font-bold">{v}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">{k}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 lg:self-start">
                <div className="rounded-2xl border border-white/15 bg-[oklch(var(--background)/36%)] p-4 backdrop-blur-md">
                  <p className="text-xs text-muted-foreground">为何选本案例</p>
                  <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                    2026 年 AI 办公硬件标杆、硬件 + AI + 生态协同典型、中国品牌全球化 + 本土 SaaS 融合样本，适合深度拆解与汇报。
                  </p>
                  <div className="mt-4 border-t border-white/10 pt-3 text-xs text-muted-foreground space-y-1">
                    <p>汇报形式</p>
                    <p>网页版 PPT · 视觉动线清晰 · 配图与数据支撑完整</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <FlowDivider label="TABLE OF CONTENTS READY" />
        </div>
      </section>

      <section id="case-selection" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle
            index="01"
            title="案例选择"
            desc="本次分析聚焦「AI 驱动的智能硬件 × SaaS 工作流协同」赛道，选择“安克 AI 录音豆”作为核心案例，是其完美匹配赛道核心特征，可支撑全链路深度分析。"
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="text-lg font-bold">🛠️ 硬件创新</p>
              <p className="mt-2 text-sm text-muted-foreground">
                可穿戴形态 + 专业声学硬件，突破传统录音笔的场景限制。
              </p>
              <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">
                拆解「硬件设计 {"->"} 体验升级」逻辑
              </p>
            </Card>
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="text-lg font-bold">🤖 AI 能力落地</p>
              <p className="mt-2 text-sm text-muted-foreground">
                实时转写 / 说话人区分 / 智能纪要，AI 深度赋能核心功能。
              </p>
              <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">
                分析消费硬件的 AI 落地路径
              </p>
            </Card>
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="text-lg font-bold">🧩 SaaS 生态协同</p>
              <p className="mt-2 text-sm text-muted-foreground">
                深度集成飞书文档 / 多维表格，打通「录音 - 转写 - 协作」全工作流。
              </p>
              <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">
                探究智能硬件 × 办公 SaaS 的商业模式
              </p>
            </Card>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            该案例完整覆盖「设计 - 技术 - 商业」三大分析维度，区别于单一功能硬件，是当前 AI 智能硬件赛道的标杆样本，为课程作业提供全链路拆解的完整支撑。
          </p>
        </div>
      </section>

      <section id="brand" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle
            index="02"
            title="双品牌跨界协同"
            desc="安克 AI 录音豆是安克创新（硬件）× 飞书（软件 / AI）双品牌深度协同的标杆产物，双方基于各自核心赛道优势分工，打造「硬件体验 + AI 能力 + 办公生态」全链路闭环。"
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="text-lg font-bold">🔧 安克创新（Anker）</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="text-foreground font-semibold">品牌定位：</span>
                  全球消费电子硬件龙头，可穿戴 / 音频硬件标杆。
                </li>
                <li>
                  <span className="text-foreground font-semibold">核心优势：</span>
                  硬件研发、工业设计、供应链制造、全球售后体系。
                </li>
                <li>
                  <span className="text-foreground font-semibold">分工职责：</span>
                  负责录音豆硬件设计、声学调校、量产制造和用户售后，打造「可穿戴 + 专业录音」随身硬件入口。
                </li>
              </ul>
            </Card>
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="text-lg font-bold">🤖 飞书（Feishu）</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="text-foreground font-semibold">品牌定位：</span>
                  字节跳动旗下企业协作与 AI 办公平台。
                </li>
                <li>
                  <span className="text-foreground font-semibold">核心优势：</span>
                  大模型 AI 能力、办公 SaaS 生态、实时协作工具链。
                </li>
                <li>
                  <span className="text-foreground font-semibold">分工职责：</span>
                  提供录音转写、AI 纪要生成与知识沉淀能力，打通飞书文档 / 多维表格，实现「录音 - 协作 - 知识管理」全工作流。
                </li>
              </ul>
            </Card>
          </div>
          <Card className="mt-4 bg-[oklch(var(--neon-raw)/8%)] border border-[oklch(var(--neon-raw)/35%)] p-5 rounded-2xl">
            <p className="text-lg font-bold text-[oklch(var(--neon-raw))]">✅ 1+1 &gt; 2 协同价值</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="text-foreground font-semibold">硬件端：</span>
                安克解决「录音场景便携性」痛点，让专业录音从桌面走向随身。
              </li>
              <li>
                <span className="text-foreground font-semibold">AI 端：</span>
                飞书解决「录音后内容复用」痛点，让录音从记录升级为可协作知识资产。
              </li>
              <li>
                <span className="text-foreground font-semibold">用户端：</span>
                一次购买获得「硬件 + AI + 办公工具」完整方案，减少跨平台切换成本。
              </li>
              <li>
                <span className="text-foreground font-semibold">行业端：</span>
                开创「硬件品牌 × SaaS 品牌」跨界合作的 AI 硬件新范式。
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <section id="product-composition" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="03" title="产品构成" desc="二级目录：3.1 技术参数、3.2 AI 应用、3.3 设计创新、3.4 应用场景。" />
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/#/pc-04" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">3.1 技术参数</a>
            <a href="/#/pc-05" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">3.2 AI 应用</a>
            <a href="/#/pc-06" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">3.3 设计创新</a>
            <a href="/#/pc-07" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">3.4 应用场景</a>
          </div>

          <Card id="pc-04" className="mt-5 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">3.1 技术参数</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { v: "10g", k: "整机重量", d: "极轻量，可长期佩戴" },
                { v: "5m", k: "有效拾音半径", d: "覆盖会议桌核心对话区" },
                { v: "Wi‑Fi", k: "快传链路", d: "录音同步效率更高" },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-xl border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--neon-raw)/8%)] p-4"
                >
                  <p className="text-3xl font-extrabold text-[oklch(var(--neon-raw))]">{m.v}</p>
                  <p className="mt-1 font-semibold">{m.k}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <img src={sideShot} alt="机身侧边结构" className="w-full h-44 object-cover rounded-xl border border-white/10" />
              <img src={chargingPortShot} alt="充电口特写" className="w-full h-44 object-cover rounded-xl border border-white/10" />
            </div>
            <Table className="mt-4">
              <TableHeader>
                <TableRow><TableHead>项目</TableHead><TableHead>参数</TableHead><TableHead>来源属性</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell>重量/尺寸</TableCell><TableCell>10g；直径 23.2mm</TableCell><TableCell>官方/媒体</TableCell></TableRow>
                <TableRow><TableCell>麦克风</TableCell><TableCell>双 MEMS 全向麦克风阵列</TableCell><TableCell>官方</TableCell></TableRow>
                <TableRow><TableCell>收音半径</TableCell><TableCell>约 5m</TableCell><TableCell>官方</TableCell></TableRow>
                <TableRow><TableCell>续航</TableCell><TableCell>单体 8h，配舱 32h</TableCell><TableCell>官方</TableCell></TableRow>
                <TableRow><TableCell>传输</TableCell><TableCell>蓝牙 + Wi‑Fi 快传</TableCell><TableCell>官方</TableCell></TableRow>
              </TableBody>
            </Table>
          </Card>

          <Card id="pc-05" className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">3.2 AI 应用</h3>
            <div className="mt-4 relative rounded-xl border border-white/10 overflow-hidden">
              <img src={internalsShot} alt="录音豆内部主要部件标注图" className="w-full h-56 object-cover" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 rounded-md bg-[oklch(var(--background)/75%)] border border-[oklch(var(--neon-raw)/35%)] px-2 py-1 text-[11px] text-[oklch(var(--neon-raw))]">
                  A 双 MEMS 麦克风
                </div>
                <div className="absolute top-16 right-5 rounded-md bg-[oklch(var(--background)/75%)] border border-[oklch(var(--neon-raw)/35%)] px-2 py-1 text-[11px] text-[oklch(var(--neon-raw))]">
                  B 主控 SoC 区
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-[oklch(var(--background)/75%)] border border-[oklch(var(--neon-raw)/35%)] px-2 py-1 text-[11px] text-[oklch(var(--neon-raw))]">
                  C 电池模组区
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">端侧能力</p>
                <p className="mt-1">降噪、回声抑制、稳定拾音与传输。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">云侧能力</p>
                <p className="mt-1">转写、Speaker Diarization、纪要与待办提取。</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-border bg-white/5 p-4">
              <p className="text-sm font-semibold mb-2">Agent 触发流（端侧 / 云端）</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-sky-400/40 bg-sky-500/10 p-2">
                  <p className="font-semibold text-sky-300">端侧</p>
                  <p className="text-muted-foreground mt-1">录音输入 {"->"} 降噪/拾音 {"->"} 同步上传</p>
                </div>
                <div className="rounded-lg border border-[oklch(var(--neon-raw)/35%)] bg-[oklch(var(--neon-raw)/8%)] p-2">
                  <p className="font-semibold text-[oklch(var(--neon-raw))]">云端（飞书）</p>
                  <p className="text-muted-foreground mt-1">转写切分 {"->"} 结构化摘要 {"->"} 文档/多维表格 {"->"} 通知跟进</p>
                </div>
              </div>
            </div>
          </Card>

          <Card id="pc-06" className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">3.3 设计创新</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <img src={magneticStructureShot} alt="磁吸片结构一览" className="w-full h-44 object-cover rounded-xl border border-white/10" />
              <img src={sideConnectorShot} alt="物理按键与连接处特写" className="w-full h-44 object-cover rounded-xl border border-white/10" />
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">传统录音笔：Holding（持有态）</p>
                <p className="mt-1 text-muted-foreground">显式拿取与操作，容易打断会议注意力流。</p>
              </div>
              <div className="rounded-xl border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--neon-raw)/8%)] p-4">
                <p className="font-semibold text-[oklch(var(--neon-raw))]">录音豆：Wearing（佩戴态）</p>
                <p className="mt-1 text-muted-foreground">从“工具”转向“贴身器官”，交互摩擦显著降低。</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-border bg-white/5 p-4 text-sm text-muted-foreground">
              Invisible UI：仅保留核心物理按键，使用“减法设计”把会议中的认知摩擦降到最低。
            </div>
            <ul className="mt-3 text-sm text-muted-foreground space-y-2">
              <li>• “豆状 + 磁吸”形态，强调无感佩戴与低侵入交互。</li>
              <li>• Invisible UI：将交互收敛为开始/停止，减少注意力切换。</li>
              <li>• 形态与 SaaS 工作流联动，不止是录音硬件而是入口硬件。</li>
            </ul>
          </Card>

          <Card id="pc-07" className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">3.4 应用场景</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-[oklch(var(--background)/45%)] p-3">
                <img src={usageShot} alt="录音豆在真实场景中的佩戴状态" className="w-full h-44 object-cover rounded-lg border border-white/10" />
                <p className="mt-2 text-xs text-muted-foreground">左图（硬件在场）：无感佩戴、低侵入采集。</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[oklch(var(--background)/45%)] p-3">
                <div className="w-full h-44 rounded-lg border border-white/10 bg-[oklch(var(--card)/72%)] p-3">
                  <p className="text-xs font-mono-tech text-[oklch(var(--neon-raw))] tracking-wider">LARK AI OUTPUT MOCKUP</p>
                  <div className="mt-2 rounded-md border border-white/10 bg-white/5 p-2">
                    <p className="text-xs font-semibold">AI 摘要</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">已完成会议要点提炼，自动聚焦关键决策与风险项。</p>
                  </div>
                  <div className="mt-2 rounded-md border border-white/10 bg-white/5 p-2">
                    <p className="text-xs font-semibold">待办事项（自动生成）</p>
                    <ul className="mt-1 text-[11px] text-muted-foreground space-y-1">
                      <li>• 跟进供应商报价（负责人：A）</li>
                      <li>• 更新需求文档（负责人：B）</li>
                      <li>• 同步到多维表格任务池</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">右图（软件产出）：AI 摘要 + 待办自动生成。</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/40 text-[10px]">高频决策</Badge>
                  <Badge className="bg-amber-500/15 text-amber-300 border border-amber-400/40 text-[10px]">跨组织协同</Badge>
                </div>
                <p className="font-semibold">💼 商务场景</p>
                <p className="mt-1"><span className="text-foreground font-semibold">Before：</span>边听边记导致注意力分散，关键决策容易遗漏。</p>
                <p className="mt-1"><span className="text-foreground font-semibold">After：</span>100% 精力投入沟通，Aily 智能体自动同步到多维表格。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  <Badge className="bg-sky-500/15 text-sky-300 border border-sky-400/40 text-[10px]">定性研究</Badge>
                  <Badge className="bg-sky-500/15 text-sky-300 border border-sky-400/40 text-[10px]">知识沉淀</Badge>
                </div>
                <p className="font-semibold">🎓 科研/访谈场景</p>
                <p className="mt-1"><span className="text-foreground font-semibold">Before：</span>数小时录音整理耗时，长文本检索效率低。</p>
                <p className="mt-1"><span className="text-foreground font-semibold">After：</span>声纹识别区分多人观点，语义关键词可瞬间定位。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 text-[10px]">证据保全</Badge>
                  <Badge className="bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 text-[10px]">隐私脱敏</Badge>
                </div>
                <p className="font-semibold">⚖️ 法律/咨询场景</p>
                <p className="mt-1"><span className="text-foreground font-semibold">Before：</span>手机录音侵入感强，私密性保障不足。</p>
                <p className="mt-1"><span className="text-foreground font-semibold">After：</span>饰品化外观降低防御心，端侧硬件加密形成隐私闭环。</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="market" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="04" title="市场" desc="从定价、用户画像、反馈情绪三维分析其市场策略与增长逻辑。" />
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Card className="lg:col-span-7 bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">定价与价值锚点（Pricing + LTV）</p>
              <p className="mt-2 text-sm text-muted-foreground">
                899 元不仅是硬件价格，也是飞书 AI 生态的低门槛入口（Low-barrier entry）。其逻辑偏向“硬件补贴 + 服务增值”，通过后续协作与 AI 使用拉高用户生命周期价值（LTV）。
              </p>
              <div className="mt-4 rounded-xl border border-border bg-white/5 p-4">
                <p className="text-sm font-semibold">价格阶梯图（区间定位）</p>
                <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-muted-foreground">传统录音笔</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <div className="h-full w-[28%] rounded-full bg-slate-400/60" />
                    </div>
                    <span className="text-muted-foreground">200-500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-muted-foreground">安克 AI 录音豆</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <div className="h-full w-[52%] rounded-full bg-[oklch(var(--neon-raw))]" />
                    </div>
                    <span className="text-[oklch(var(--neon-raw))] font-semibold inline-flex items-center gap-1">
                      899
                      <span
                        className="inline-block h-2 w-2 rounded-full bg-[oklch(var(--neon-raw))] animate-pulse"
                        style={{ boxShadow: "0 0 8px rgba(0,255,133,0.9)" }}
                        aria-hidden
                      />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-muted-foreground">高端 AI 录音设备</span>
                    <div className="h-2 flex-1 rounded-full bg-white/10">
                      <div className="h-full w-[74%] rounded-full bg-amber-400/70" />
                    </div>
                    <span className="text-muted-foreground">1200+</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="lg:col-span-5 bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">产品力雷达图（示意）</p>
              <div className="mt-3 rounded-xl border border-border bg-white/5 p-3 overflow-x-auto">
                <svg width="360" height="220" viewBox="0 0 360 220" className="min-w-[360px]">
                  <g transform="translate(180,110)">
                    <polygon points="0,-70 66,-22 41,57 -41,57 -66,-22" fill="none" stroke="rgba(255,255,255,0.25)" />
                    <polygon points="0,-52 49,-16 30,42 -30,42 -49,-16" fill="rgba(0,255,133,0.14)" stroke="rgba(0,255,133,0.7)" />
                    <text x="-10" y="-82" fill="rgba(230,237,247,0.9)" fontSize="10">便携</text>
                    <text x="73" y="-24" fill="rgba(230,237,247,0.9)" fontSize="10">AI准确率</text>
                    <text x="40" y="71" fill="rgba(230,237,247,0.9)" fontSize="10">软件生态</text>
                    <text x="-76" y="71" fill="rgba(230,237,247,0.9)" fontSize="10">续航</text>
                    <text x="-102" y="-24" fill="rgba(230,237,247,0.9)" fontSize="10">性价比</text>
                  </g>
                </svg>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">用于表达产品力结构关系，不作为严谨量化评分结论。</p>
              <p className="mt-1 text-[11px] text-muted-foreground/90">
                AIPM 注解：在 10g 轻量约束下，产品接受了部分续航上限的 trade-off，换取便携性与软件生态协同能力的显著提升，形成差异化竞争优势。
              </p>
            </Card>
          </div>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Card className="lg:col-span-8 bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">典型用户画像（Persona）</p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border bg-white/5 p-4">
                  <p className="font-semibold text-foreground">决策层（Executive）</p>
                  <p className="mt-1 text-[11px] text-amber-300/90">[解决痛点：会议决策沉淀难]</p>
                  <p className="mt-1">追求会议纪要结构化与任务下发效率，强调可执行闭环。</p>
                </div>
                <div className="rounded-xl border border-border bg-white/5 p-4">
                  <p className="font-semibold text-foreground">知识工作者（Knowledge Worker）</p>
                  <p className="mt-1 text-[11px] text-sky-300/90">[解决痛点：访谈整理成本极高]</p>
                  <p className="mt-1">侧重长访谈语义检索、跨会话内容复用与知识沉淀。</p>
                </div>
                <div className="rounded-xl border border-border bg-white/5 p-4">
                  <p className="font-semibold text-foreground">内容创作者（Creator）</p>
                  <p className="mt-1 text-[11px] text-emerald-300/90">[解决痛点：碎片化灵感流失]</p>
                  <p className="mt-1">侧重移动场景下的碎片化灵感记录与快速整理。</p>
                </div>
              </div>
            </Card>
            <Card className="lg:col-span-4 bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">关键词云（情绪分布）</p>
              <div className="mt-3 rounded-xl border border-border bg-white/5 p-4 leading-8">
                <span
                  className="text-[24px] font-bold text-[oklch(var(--neon-raw))] mr-2"
                  style={{ textShadow: "0 0 10px rgba(0,255,133,0.45)" }}
                >
                  无感佩戴
                </span>
                <span
                  className="text-[19px] font-semibold text-sky-300 mr-2"
                  style={{ textShadow: "0 0 9px rgba(0,255,133,0.35)" }}
                >
                  生态协同
                </span>
                <span className="text-[14px] text-amber-300 mr-2">自动纪要</span>
                <span className="text-[18px] text-rose-300 mr-2">电池焦虑</span>
                <span className="text-[14px] text-rose-300 mr-2">传输稳定性</span>
                <span className="text-[13px] text-rose-300 mr-2">嘈杂环境声纹剥离</span>
                <span className="text-[15px] text-[oklch(var(--neon-raw))] mr-2">效率提升</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">正向与挑战并存：优势在闭环效率，挑战在极端条件鲁棒性。</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="supply-chain" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="05" title="产业链" desc="由“底层架构 -> 整机定义 -> 平台赋能”的供应流图谱，解释软硬协同的真实路径。" />
          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <p className="text-sm font-semibold">供应流图（Supply Chain Map）</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">底层架构（上游）</p>
                <p className="mt-2 text-muted-foreground">恒玄科技（SoC） + 歌尔/瑞声（MEMS 与声学模组）</p>
                <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">核心壁垒：超低功耗 SoC、高信噪比拾音模组</p>
              </div>
              <div className="rounded-xl border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--neon-raw)/8%)] p-4">
                <p className="font-semibold text-[oklch(var(--neon-raw))]">整机制造（中游）</p>
                <p className="mt-2 text-muted-foreground">安克创新：产品定义、ID/结构设计、量产与渠道交付</p>
                <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">核心壁垒：消费电子产品化能力 + 规模交付效率</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">平台赋能（下游）</p>
                <p className="mt-2 text-muted-foreground">飞书（含 AI 能力栈）：转写、纪要、任务流、协同闭环</p>
                <p className="mt-2 text-xs text-[oklch(var(--neon-raw))]">核心壁垒：组织协作入口与 SaaS 数据闭环</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-white/15 px-2 py-1">芯片/模组</span>
              <span>{"->"}</span>
              <span className="rounded-md border border-white/15 px-2 py-1">整机设计与制造</span>
              <span>{"->"}</span>
              <span className="rounded-md border border-white/15 px-2 py-1">AI 协作平台沉淀</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              地缘协同（可选视角）：长三角与大湾区的电子产业集群在芯片、模组、制造、SaaS 生态上具备高密度协作优势，缩短“定义-打样-量产-迭代”周期。
            </p>
          </Card>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/#/sc-51" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">5.1 安克创新 x 飞书</a>
            <a href="/#/sc-52" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">5.2 恒玄科技</a>
            <a href="/#/sc-53" className="px-3 py-1 rounded-full border border-border text-sm hover:bg-white/5">5.3 歌尔股份 / 瑞声科技</a>
          </div>

          <Card id="sc-51" className="mt-5 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">5.1 安克创新 x 飞书：定义者与赋能者</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              产业角色：硬件品牌商与办公生态平台的深度联动。安克负责可穿戴硬件定义与产品化交付，飞书提供 AI 协作与数据沉淀能力，共同把设备从“录音终端”升级为“工作流入口”。
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">价值点</p>
                <p className="mt-1 text-muted-foreground">硬件采集与 SaaS 协同闭环打通，提升组织执行效率。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">核心逻辑</p>
                <p className="mt-1 text-muted-foreground">硬件成为飞书生态的物理 Entry Point，而非独立存储工具。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">关键词</p>
                <p className="mt-1 text-muted-foreground">生态绑定、跨界联动、场景定义。</p>
              </div>
            </div>
          </Card>

          <Card id="sc-52" className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">5.2 恒玄科技（Bestechnic）：AI 算力的心脏</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              产业角色：端侧音频 SoC 能力提供方（如 BES2700 系列同类能力）。低功耗计算与连接能力决定了 10g 体积下的 8h 级别续航是否可达，并支撑实时降噪与语音前处理。
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">技术点</p>
                <p className="mt-1 text-muted-foreground">端侧 AI 预处理 + 超低功耗 SoC，兼顾实时性与续航。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">核心壁垒</p>
                <p className="mt-1 text-muted-foreground">国产替代能力、SoC 集成度、低功耗调优经验。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">关键词</p>
                <p className="mt-1 text-muted-foreground">国产替代、SoC、低功耗、端侧算力。</p>
              </div>
            </div>
          </Card>

          <Card id="sc-53" className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <h3 className="text-xl font-extrabold">5.3 歌尔股份 / 瑞声科技：声学感知的极点</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              产业角色：MEMS 阵列与高精密声学制造能力代表。通过双 MEMS 麦克风阵列、声腔设计与结构精度控制，在极小空间内实现远场高清拾音与多人语音分离基础质量。
            </p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">技术点</p>
                <p className="mt-1 text-muted-foreground">小体积声腔 + MEMS 硅麦协同，抬升信噪比与拾音一致性。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">核心壁垒</p>
                <p className="mt-1 text-muted-foreground">高精密制造、MEMS 阵列调校、量产良率控制。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold">关键词</p>
                <p className="mt-1 text-muted-foreground">高信噪比、精密制造、MEMS 阵列。</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="pain-points" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="06" title="痛点" desc="从“问题描述”升级为“系统冲突定义”，明确设计干预的必要性。" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
            <Card className="md:col-span-3 bg-card/70 border-border p-5 rounded-2xl">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-amber-300" />
                <p className="font-semibold">交互冲突与系统干扰（Interaction Conflict）</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                智能手机作为多任务终端，录音行为常受通讯进程、通知与后台策略干扰，缺乏作为专用生产力工具所需的“原子级”稳定性。
              </p>
              <p className="mt-3 text-xs text-amber-300">Before：录音链路不稳定 {"->"} After：专用硬件采集，降低系统级中断风险</p>
            </Card>
            <Card className="md:col-span-3 bg-card/70 border-border p-5 rounded-2xl">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-sky-300" />
                <p className="font-semibold">信息沉没与转化鸿沟（Information Gap）</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                线性音频本质是非结构化数据黑盒，人工整理面临高信息熵损耗，关键洞察难以及时沉淀为可执行任务与协作资产。
              </p>
              <p className="mt-3 text-xs text-[oklch(var(--neon-raw))]">Before：音频可听不可用 {"->"} After：自动结构化纪要与任务分发</p>
            </Card>
            <Card className="md:col-span-6 bg-card/70 border-border p-5 rounded-2xl">
              <div className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-violet-300" />
                <p className="font-semibold">复杂场景下的认知负荷（Cognitive Overload）</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                在跨语言协同或高频多人脑暴场景中，人类对声纹剥离与多语转译存在天然处理瓶颈，关键决策信息易在会中或会后流失。
              </p>
              <p className="mt-3 text-xs text-[oklch(var(--neon-raw))]">Before：多语/多人信息易遗漏 {"->"} After：说话人区分 + AI 摘要降低认知负荷</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="competition" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="07" title="竞品对比" desc="以交互独立性与工作流深度双轴定位，比较三类 AI 录音产品的真实竞争位。" />
          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <p className="font-semibold">四象限定位图（Positioning Map）</p>
            <div className="mt-3 rounded-xl border border-border bg-white/5 p-3 overflow-x-auto">
              <svg width="560" height="300" viewBox="0 0 560 300" className="min-w-[560px]">
                <rect x="56" y="24" width="460" height="220" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" />
                <line x1="286" y1="24" x2="286" y2="244" stroke="rgba(255,255,255,0.2)" />
                <line x1="56" y1="134" x2="516" y2="134" stroke="rgba(255,255,255,0.2)" />
                <text x="250" y="276" fill="rgba(230,237,247,0.9)" fontSize="11">X 轴：交互独立性（依赖手机 {"->"} 独立穿戴）</text>
                <text x="8" y="138" fill="rgba(230,237,247,0.9)" fontSize="11" transform="rotate(-90 8 138)">
                  Y 轴：工作流深度（单纯录音 {"->"} AI 自动化流）
                </text>

                <circle cx="450" cy="70" r="8" fill="rgba(0,255,133,0.95)" />
                <text x="462" y="74" fill="rgba(0,255,133,0.95)" fontSize="11" fontWeight="700">安克 AI 录音豆</text>

                <circle cx="170" cy="160" r="7" fill="rgba(120,180,255,0.85)" />
                <text x="182" y="164" fill="rgba(120,180,255,0.9)" fontSize="11">Plaud Note</text>

                <circle cx="140" cy="120" r="7" fill="rgba(255,180,90,0.9)" />
                <text x="152" y="124" fill="rgba(255,180,90,0.9)" fontSize="11">DingTalk A1</text>
              </svg>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              结论：安克 AI 录音豆位于“高交互独立性 + 高工作流深度”右上象限，形成当前阶段的差异化独占区。
            </p>
          </Card>
          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>产品</TableHead>
                  <TableHead>佩戴摩擦力（User Friction）</TableHead>
                  <TableHead>交互逻辑（Interaction Design）</TableHead>
                  <TableHead>生态闭环（Ecosystem Depth）</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>安克 AI 录音豆</TableCell>
                  <TableCell>极低：无感磁吸，不依赖手机载体</TableCell>
                  <TableCell>Atomic Interaction：一键即录，脱离屏幕路径</TableCell>
                  <TableCell>Lark Agentic Workflow：自动沉淀至文档/多维表格/待办</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Plaud Note</TableCell>
                  <TableCell>中：常见手机背吸，改变手感与厚度</TableCell>
                  <TableCell>依赖手机生态位，交互路径相对更长</TableCell>
                  <TableCell>独立 App 为主，跨系统协作常需手动导出</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>DingTalk A1</TableCell>
                  <TableCell>中：卡片形态与手机绑定更明显</TableCell>
                  <TableCell>手机入口主导，硬件独立交互相对受限</TableCell>
                  <TableCell>依托钉钉生态，自动化深度受组织场景约束</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>

      <section id="summary-trend" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
          <SectionTitle index="08" title="总结 / 趋势" desc="从并列趋势升级为演进轴：录音设备正在从工具，进化为环境计算入口。" />
          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <p className="font-semibold">演进阶梯（Evolutionary Path）</p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">1.0 时代（工具层）</p>
                <p className="mt-1 text-muted-foreground">手持录音 + 本地存储，输出以非结构化音频为主。</p>
              </div>
              <div className="rounded-xl border border-border bg-white/5 p-4">
                <p className="font-semibold text-foreground">2.0 时代（效率层）</p>
                <p className="mt-1 text-muted-foreground">手机 App + 云端转写，文本可检索但行动链路仍偏手动。</p>
              </div>
              <div className="rounded-xl border border-[oklch(var(--neon-raw)/35%)] bg-[oklch(var(--neon-raw)/8%)] p-4">
                <p className="font-semibold text-[oklch(var(--neon-raw))]">3.0 时代（智能层 - 录音豆）</p>
                <p className="mt-1 text-muted-foreground">可穿戴传感器 + Agent 自动化流，沉淀结构化知识资产。</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-white/15 px-2 py-1">记录工具</span>
              <span>{"->"}</span>
              <span className="rounded-md border border-white/15 px-2 py-1">效率助手</span>
              <span>{"->"}</span>
              <span className="rounded-md border border-[oklch(var(--neon-raw)/40%)] px-2 py-1 text-[oklch(var(--neon-raw))]">行动代理入口</span>
            </div>
          </Card>

          <div className="mt-4 grid grid-cols-1 gap-3">
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">趋势一：形态进化（Form Factor）</p>
              <p className="mt-1 text-sm text-muted-foreground">从“持握（Holding）”走向“佩戴（Invisible）”。</p>
            </Card>
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">趋势二：价值进化（Value Layer）</p>
              <p className="mt-1 text-sm text-muted-foreground">从“音频文件”走向“决策变量”。</p>
            </Card>
            <Card className="bg-card/70 border-border p-5 rounded-2xl">
              <p className="font-semibold">趋势三：竞争进化（Moat Shift）</p>
              <p className="mt-1 text-sm text-muted-foreground">从“硬件参数”走向“生态粘性”。</p>
            </Card>
          </div>

          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <p className="font-semibold">AIPM 深度洞察（AIPM Insights）</p>
            <p className="mt-2 text-sm text-muted-foreground">
              硬件的终极形态是“消失”。录音豆的价值不在于成为更强的录音笔，而在于通过“感知能力的原子化”，以最低社交成本让 AI 介入真实场景，完成从数据记录到行动代理的闭环。这正是环境计算（Ambient Computing）在办公场景中的可落地路径。
            </p>
          </Card>
        </div>
      </section>

      <section id="references" className="scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 pb-16">
          <SectionTitle index="09" title="参考" />
          <Card className="mt-4 bg-card/70 border-border p-6 rounded-2xl">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {references.map((ref) => (
                <li key={ref.url} className="rounded-lg border border-border bg-white/5 p-3">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-[oklch(var(--neon-raw))] hover:underline"
                  >
                    {ref.url}
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">{ref.note}</p>
                </li>
              ))}
            </ul>
          </Card>
          <Separator className="my-8 bg-white/10" />
          <a
            className="inline-flex items-center gap-2 rounded-xl border border-[oklch(var(--neon-raw)/30%)] bg-[oklch(var(--neon-raw)/10%)] px-4 py-3 font-semibold hover:bg-[oklch(var(--neon-raw)/14%)]"
            href="/#/cover"
          >
            <CircuitBoard className="h-4 w-4 text-[oklch(var(--neon-raw))]" />
            回到封面
          </a>
        </div>
      </section>
    </div>
  );
}
