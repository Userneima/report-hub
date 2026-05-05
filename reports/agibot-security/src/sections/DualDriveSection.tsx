import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";

export function DualDriveSection() {
  return (
    <SectionShell id="c02" no="02" label="COOPERATION REASON" title="合作理由：底座能力 × 场景运营，才是'可交付的具身智能'">
      <div className="grid gap-4">
        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">协作逻辑（AIPM 视角）</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <div className="text-xs tracking-[0.18em] text-foreground/65">TECH BASE</div>
              <div className="mt-1 font-semibold"><span className="text-cyan">智元（AgiBot）</span> = 具身底座供应商</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li><span className="text-cyan">技能树</span>： 攻克了"Uni系列"的灵巧手操纵，将精细动作从实验室搬进机场。</li>
                <li><span className="text-cyan">硬核指标</span>： 275T 端的侧算力，让复杂识别不再依赖云端，实现零延迟响应。 <RefLink n={3} /></li>
                <li><span className="text-cyan">进化力</span>： 每一版 OTA 都是对现实复杂环境的"补丁式升级"，确保机器人始终在线。 <RefLink n={4} /> <RefLink n={5} /></li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="text-xs tracking-[0.18em] text-foreground/65">VERTICAL OPS</div>
              <div className="mt-1 font-semibold"><span className="text-orange-500">Certis</span> = 场景运营与系统集成商</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li><span className="text-orange-500">实战场</span>： 掌控机场、楼宇等"地狱难度"现场，提供最真实的场景反馈。</li>
                <li><span className="text-orange-500">中枢逻辑</span>： Mozart 系统不只是协调器，它是让机器人听懂业务指令的"翻译官"。 <RefLink n={1} /></li>
                <li><span className="text-orange-500">闭环验证</span>： 每一个动作都经过真实流程的严苛洗礼，确保从"能动"变成"好用"。 <RefLink n={1} /> <RefLink n={8} /></li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[color-mix(in_oklch,var(--accent-cyan)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_10%,transparent)] p-3 text-sm text-foreground/80">
            <div className="font-semibold">关键判断</div>
            <p className="mt-1 leading-relaxed">
              "落地"不是机器人能做什么，而是机器人如何接入 SOP、权限体系、告警链路与考核指标。
              Certis 的价值在于让机器人成为可编排、可审计、可回滚的运营单元。
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
