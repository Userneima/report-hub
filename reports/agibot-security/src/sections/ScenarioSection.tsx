import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";

export function ScenarioSection() {
  return (
    <SectionShell id="c07" no="07" label="SCENARIO" title="实战场景：从 Certis '评估'到机场 T5 '试点'，三类任务最先闭环">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-4">
          <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
            <div className="text-sm font-semibold">公开已验证的场景（可引用）</div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
              <li>
                <span className="text-cyan">评估合作</span>：Certis 收到人形机器人并开展评估，目标包括 security 与 integrated facilities management。
                <RefLink n={1} />
              </li>
              <li>
                <span className="text-cyan">高流量试点</span>：在樟宜机场未来 T5，远征 A2 提供礼宾接待、导览、信息咨询。
                <RefLink n={2} />
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
            <div className="text-sm font-semibold">AIPM 推断：下一步'安保闭环'会落在这三类任务</div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold">1）礼宾/引导</div>
                <div className="mt-2 text-sm text-foreground/75">低风险、强可见：快速建立公众接受度与数据闭环。</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold">2）巡逻/取证</div>
                <div className="mt-2 text-sm text-foreground/75">把 CCTV 的'固定视角'变成'移动视角'，补齐死角。</div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <div className="font-semibold">3）异常事件侦测</div>
                <div className="mt-2 text-sm text-foreground/75">例如倒地/聚集/越界；需要严格误报治理与伦理边界。</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-foreground/60">注：第 3 类为路线推断/PoC 指标建议，不代表公开已确认功能清单。</div>
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">任务拆解样例（倒地事件）</div>
          <ol className="mt-3 space-y-2 text-sm text-foreground/75 list-decimal pl-5">
            <li>检测：姿态/停留时间异常 + 视觉确认</li>
            <li>取证：短视频/位置/周边人群密度</li>
            <li>上报：Mozart 工单 + 现场语音播报</li>
            <li>处置：引导围观、呼叫人工、保持安全距离</li>
          </ol>
          <div className="mt-4 text-xs text-foreground/60">AIPM 重点：每一步都要有'失败退路'。</div>
        </div>
      </div>
    </SectionShell>
  );
}
