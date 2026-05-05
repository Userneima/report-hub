import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";

export function BodyFormSection() {
  return (
    <SectionShell id="c03" no="03" label="THE BODY" title="身体（1）：从工业设计看'无感化巡逻形态'与 CMF">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">"无感化"不是低存在感，而是低摩擦</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>
              <span className="text-cyan">轮廓策略</span>：接近服务人员尺度，降低公众防御心；头部黑面为"信息留白"。
            </li>
            <li>
              <span className="text-cyan">CMF</span>：高对比黑白 + 局部金属，符合公共空间"洁净/可维护"审美；
              传感器隐藏在黑面中，降低"被摄像"焦虑。
            </li>
            <li>
              <span className="text-cyan">维护友好</span>：现场更关注 MTTR（平均修复时间）而非极致轻量。
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">安保场景的"信任三件套"</div>
          <ol className="mt-3 space-y-2 text-sm text-foreground/75 list-decimal pl-5">
            <li>可识别：制服化（标识/编号）</li>
            <li>可解释：状态可视（灯/语音/屏）</li>
            <li>可追责：行为可回放（日志/告警）</li>
          </ol>
          <div className="mt-4 text-xs text-foreground/60">注：第 3 点由平台（如 Mozart）与流程共同承接。<RefLink n={1} /></div>
        </div>
      </div>
    </SectionShell>
  );
}
