import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";

const flowSteps = [
  { id: "trigger", label: "Trigger", desc: "事件/指令触发" },
  { id: "perception", label: "Perception", desc: "多模态感知" },
  { id: "planning", label: "Planning", desc: "任务拆解" },
  { id: "policy", label: "Policy", desc: "权限校验" },
  { id: "execution", label: "Execution", desc: "动作执行" },
  { id: "evidence", label: "Evidence", desc: "取证记录" },
  { id: "mozart", label: "Mozart", desc: "上报/闭环" },
];

export function MindBrainSection() {
  return (
    <SectionShell id="c05" no="05" label="THE MIND" title="大脑：多模态大模型如何闭环'语音指令→任务拆解'">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">从'对话机器人'到'任务机器人'：中间那层'任务编排'</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">输入层（感知）</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li>语音：口语化、碎片化、带噪声</li>
                <li>视觉：人群/行为/区域持续感知</li>
                <li>场内系统：门禁、CCTV、告警（由 Mozart 接入）<RefLink n={1} /></li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">中间层（任务规划）</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li>意图识别：咨询 vs 处置</li>
                <li>任务拆解：巡逻→定点检查→取证→上报→引导</li>
                <li>权限约束：哪些动作需人工确认</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-border p-4">
            <div className="text-xs tracking-[0.18em] text-foreground/65 mb-4">INTERACTION LOOP (CONCEPT)</div>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {flowSteps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div className="rounded-lg border border-[color-mix(in_oklch,var(--accent-cyan)_50%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_8%,transparent)] px-3 py-2 text-center min-w-[80px]">
                      <div className="text-xs font-semibold text-cyan">{step.label}</div>
                      <div className="text-[10px] text-foreground/60 mt-0.5">{step.desc}</div>
                    </div>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <svg width="20" height="12" viewBox="0 0 20 12" className="text-cyan/50 shrink-0">
                      <path d="M0 6h16M12 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-foreground/75 leading-relaxed">
            <span className="text-cyan">AIPM 点题：</span>
            多模态大模型的价值不在"能聊"，而在把不确定自然语言压缩成可审计的动作图（Action Graph）。
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">把'安保语音'当作产品需求（例）</div>
          <div className="mt-3 text-sm text-foreground/75 space-y-2">
            <div><span className="text-cyan">指令：</span>"去大堂看看什么情况。"</div>
            <div><span className="text-cyan">系统要推断：</span>区域=大堂；目标=异常检测；证据=短视频+标签；上报=值班中心。</div>
          </div>
          <div className="mt-4 text-xs text-foreground/60">注：示例用于方法论说明，不代表已公开功能清单。</div>
        </div>
      </div>
    </SectionShell>
  );
}
