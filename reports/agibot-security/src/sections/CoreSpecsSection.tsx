import { SectionShell } from "@/components/report/SectionShell";
import { DataTable } from "@/components/report/DataTable";
import { RefLink } from "@/components/report/RefLink";

export function CoreSpecsSection() {
  return (
    <SectionShell id="c04" no="04" label="CORE SPECS" title="身体（2）：硬核参数 DataTable（可溯源 + 可解释）">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <DataTable
            columns={[
              { key: "module", header: "模块" },
              { key: "spec", header: "关键指标" },
              { key: "meaning", header: "体验含义（安保语境）", widthClass: "min-w-[260px]" },
              { key: "source", header: "来源" },
            ]}
            rows={[
              {
                module: "端侧算力",
                spec: "275T（A2-W 页面描述）",
                meaning: "把'识别→位姿→决策'压到毫秒级；减少云依赖，降低隐私/延迟风险。",
                source: "[3]",
              },
              {
                module: "灵巧手",
                spec: "UniGrasp（原子能力）；19 自由度视触觉灵巧手（A2-Max 演示）",
                meaning: "安保里的'抓取'不只是搬运：包括开门、递送、拉动设施、协助取证。",
                source: "[6]",
              },
              {
                module: "行走能力（OTA）",
                spec: "行走提速 33%，并在草坪/鹅卵石等路况稳定",
                meaning: "巡逻 KPI 不是'能走'，而是'连续走 + 复杂地面不失稳'。",
                source: "[4]",
              },
              {
                module: "行走速度（媒体披露）",
                spec: "最大行走速度 0.8→1.2 m/s（V1.3）",
                meaning: "从'慢速展示'迈向'可参与动线'；更接近人类步行节奏（仍需安全限速）。",
                source: "[5]",
              },
              {
                module: "系统集成",
                spec: "与 Mozart 编排系统测试集成",
                meaning: "把机器人接进'权限/告警/工单/值班中心'，实现可运营、可审计。",
                source: "[1]",
              },
            ]}
            caption="注：部分指标来自不同型号/版本来源，均已标注出处。"
          />
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">AIPM 备注：参数要落到'运营指标'</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>算力 → 任务闭环延迟（语音→动作启动）</li>
            <li>速度 → 单位时间覆盖面积/路线长度</li>
            <li>稳定性 → 跌倒次数/误报率</li>
            <li>集成 → 工单闭环时间（发现→处置）</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
