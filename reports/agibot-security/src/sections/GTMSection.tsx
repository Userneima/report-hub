import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";

export function GTMSection() {
  return (
    <SectionShell id="c09" no="09" label="GTM" title="商业化路径：RaaS + 平台编排 + 数据回流，形成'可复制的落地包'">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">落地包 = 机器人 + 网络 + 编排平台 + SOP</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">交付形态</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li>硬件：A2 本体（交互与移动）</li>
                <li>连接：运营级网络（5G/专网）</li>
                <li>软件：Mozart/工单/告警/权限</li>
                <li>运营：SOP、培训、应急预案</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">数据飞轮</div>
              <ul className="mt-2 space-y-1 text-sm text-foreground/75 list-disc pl-5">
                <li>真实场景日志（事件标签）→ 模型迭代</li>
                <li>误报/漏报分析 → 策略更新</li>
                <li>运营指标（响应时延）→ 产品路线</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-sm text-foreground/75 leading-relaxed">
            Pandaily 提到"RaaS 租赁"将通过运营商渠道降低采用门槛。<RefLink n={2} />
            对具身智能而言，RaaS 不只是金融方案，更是把试点变成可复制的订阅式运营包。
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">AIPM 的'落地三问'</div>
          <ol className="mt-3 space-y-2 text-sm text-foreground/75 list-decimal pl-5">
            <li>谁为误报/事故负责？（责任链）</li>
            <li>机器人接触什么数据？放哪里？（数据治理）</li>
            <li>坏了怎么办？（备援、人机协同）</li>
          </ol>
        </div>
      </div>
    </SectionShell>
  );
}
