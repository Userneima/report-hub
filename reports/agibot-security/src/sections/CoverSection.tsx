import { GlowBadge } from "@/components/report/GlowBadge";
import { StatCard } from "@/components/report/StatCard";
import { Badge } from "@/components/ui/badge";

export function CoverSection() {
  return (
    <section id="c00" className="scroll-mt-28">
      <div className="relative overflow-hidden rounded-2xl border border-border card-glass p-6 md:p-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[color-mix(in_oklch,var(--accent-violet)_22%,transparent)] blur-3xl" />
          <div className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-[color-mix(in_oklch,var(--accent-cyan)_16%,transparent)] blur-3xl" />
          <div className="absolute inset-0 bg-black/40" />
          <img 
            src="/report_media/A2 by Agibot - Humanoid Robot Specs  Details.png" 
            alt="AgiBot 远征 A2 形象图" 
            className="absolute inset-0 w-[104%] h-[104%] object-contain opacity-30 mx-auto my-auto translate-x-[15rem] translate-y-[-0.5rem]"
          />
        </div>

        <div className="relative grid gap-6 md:grid-cols-1">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <GlowBadge>Embodied AI · Physical Security</GlowBadge>
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-[1.02]">
              具身智能的安保黎明
              <span className="block text-foreground/70 text-2xl md:text-3xl font-semibold mt-3">
                智元远征 A2 商业落地实测：从"能走"到"能上岗"
              </span>
            </h1>

            <p className="mt-6 text-foreground/75 leading-relaxed">
              <span className="text-cyan">智元机器人（底座具身能力）</span> ×
              <span className="text-orange-500">策安集团 Certis（高密度安保运营场景）</span>
              如何把具身智能从"演示"推进到"运营"。
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <StatCard value="275T" label="端侧算力/推理预算" hint="用于实时识别与操作决策" />
              <StatCard value="+33%" label="行走提速（OTA）" hint="多路况稳定性同步验证" />
              <StatCard value="T5" label="高流量试点场景" hint="樟宜机场未来航站楼" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs text-foreground/65">
              <Badge variant="outline">报告结构：12 章（00-12）</Badge>
              <Badge variant="outline">风格：Swiss Modernism × Cyber Minimal</Badge>
              <Badge variant="outline">配色：oklch(0.145 0 0) + oklch(0.78 0.18 190)</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
