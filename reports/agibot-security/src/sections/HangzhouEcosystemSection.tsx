import { DataTable } from "@/components/report/DataTable";
import { HighlightMarker } from "@/components/report/HighlightMarker";
import { SectionShell } from "@/components/report/SectionShell";

const columns = [
  { key: "camp", header: "能力流派", widthClass: "whitespace-nowrap" },
  { key: "company", header: "代表企业", widthClass: "whitespace-nowrap" },
  { key: "tag", header: "核心标签", widthClass: "whitespace-nowrap" },
  { key: "insight", header: "战略洞察（修正版）" },
];

const rows = [
  {
    camp: "成本派",
    company: "宇树科技（Unitree，杭州）",
    tag: "机器人界的“红米”",
    insight:
      "G1 人形机器人基础版售价 9.9 万元起。核心竞争力在供应链垂直整合（电机、减速器自研自产），把具身机器人从「高价样机」推向「可规模部署设备」。2025 年人形机器人出货量全球第一。",
  },
  {
    camp: "深耕派",
    company: "云深处（Deep Robotics，杭州）",
    tag: "电力安保专家",
    insight:
      "「绝影」系列在南方电网、国家电网、地下管廊等场景大量实战。对安保 / 工业运营方的核心价值是复杂环境可靠性（IP67 防护、耐高温 / 防水 / 防尘）。是国内四足机器人电力巡检场景的引领者。",
  },
];

export function HangzhouEcosystemSection() {
  return (
    <SectionShell
      id="c00a"
      no="00A"
      label="HANGZHOU ECOSYSTEM"
      title="杭州足式 / 人形赛道关键企业：不是谁最酷，而是谁最能落地"
      className="scroll-mt-40"
    >
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/80">
          在杭州，评价一家机器人公司不能只看“站得像不像人”，更要看
          <HighlightMarker>落地颗粒度</HighlightMarker>：
          是否能把<strong>成本与量产</strong>、<strong>场景工程化与复杂环境可靠性</strong>拆成可验证交付单元，并接入运营与维保体系。
        </p>

        <div className="min-w-0">
          <DataTable columns={columns} rows={rows} />
        </div>

        <div className="rounded-xl border border-border bg-[color-mix(in_oklch,white_2%,transparent)] p-4 text-sm text-foreground/80">
          <p className="font-semibold text-foreground">对 Certis 的直接含义</p>
          <p className="mt-2 leading-relaxed">
            Certis 的工单体系与云深处<strong>电力巡检 + 复杂环境移动平台</strong>强项并不等同，可迁移的是<strong>户外与复杂环境下移动平台的验证方法与可靠性指标</strong>，需单独设计对接而非默认等同“安保交钥匙方案”。宇树侧更应关注
            <HighlightMarker>成本曲线与部署密度</HighlightMarker>对试点—扩容的支撑，避免把“成本派”误写成“复杂环境担当”。组合策略应按场景 KPI 分别评估平台、维保与升级，而不是笼统追求“最像人”的展示指标。
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
