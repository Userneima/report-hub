import { SectionShell } from "@/components/report/SectionShell";
import { MediaFigure } from "@/components/report/MediaFigure";
import { RefLink } from "@/components/report/RefLink";

export function CaseSelectionSection() {
  return (
    <SectionShell
      id="c01"
      no="01"
      label="CASE SELECTION"
      title="为何选这个案例：在「可公开核对」的合作与试点披露范围内讨论具身 × 安保"
    >
      <p className="text-sm text-foreground/70 leading-relaxed -mt-2 mb-4">
        本报告<strong>不</strong>将任何<strong>建筑概念渲染图</strong>当作「已落地、已搭载具身安保系统」的现场证据；机场枢纽类场景在公开信息中多为<strong>意向合作 / 小规模试点 / 能力展示</strong>表述，与「大规模商业交付」不是同一概念，下文指标均按这一边界书写。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">四个选题约束（可核对 / 可证伪）</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>
              <span className="text-cyan">可检索性 (Traceability)</span>
              ：优先锚定{" "}
              <strong>2025 年前后已有公开报道</strong>的合作意向、MOU、媒体对试点/展示的披露
              <RefLink n={1} /> <RefLink n={2} />，不把「行业整体已大规模商业交付」当作本文预设前提。
            </li>
            <li>
              <span className="text-cyan">场景约束 (Constraint)</span>
              ：安保属于高责、合规敏感场景——本文用它作为<strong>分析上的压力维度</strong>（流程、责权、人机协同），
              <strong>不声称</strong>本文已掌握某枢纽「全流程民航安保资质认证」或「全量交付验收」类一手材料。
            </li>
            <li>
              <span className="text-cyan">参数透明度 (Transparency)</span>
              ：整机与 OTA 相关数字优先引用<strong>厂商官网 / 可链接新闻稿</strong>等可复核来源；分析边界与「概念图 / 效果图」明确区分——
              <strong>后者不作为交付或部署凭证</strong>。
              <RefLink n={3} /> <RefLink n={4} /> <RefLink n={5} />
            </li>
            <li>
              <span className="text-cyan">迁移讨论 (Transfer)</span>
              ：「运营系统里的智能节点」是<strong>方法论假说</strong>，需后续用真实集成方案、运维数据与 ROI 验证；本节只说明讨论视角，不把假说写成已验证结论。
            </li>
          </ul>
        </div>
        <MediaFigure
          src="/report_media/certis-agibot-lab.jpg"
          alt="Certis 与智元合作展示或实验场景相关配图"
          caption="公开报道中的合作与实验/展示语境：可支撑「双方在探索具身 × 安保」这一事实层级，不等同于宣称某一未建成枢纽或航站楼已完成具身安保体系化部署。"
          credit="合作公开报道与项目素材（非航站楼建筑效果图）"
        />
      </div>
    </SectionShell>
  );
}
