import type {
  BiText,
  CompetitorData,
  ScenarioData,
  SectionContent,
  StatData,
  TableData,
} from '../types/report'

export const coverIntro: BiText = {
  zh: '本报告旨在响应“具身智能与机器人战略专家”岗位核心职责，通过对全球与中国机器人市场的深度调研，为高层管理提供结构化、定量化且可执行的行业洞见。报告围绕三大模块展开：市场与行业研究、战略合作支持、商业化推进支持；采用“现状诊断-竞争映射-区域趋势-战略工具-执行蓝图”路径，目标是形成从技术调研到商业落地的一体化决策框架。',
  en: 'This report maps market research, partnership strategy, and commercialization support into one executive decision framework for robotics and embodied AI.',
}

export const executiveInsights: BiText[] = [
  {
    zh: '2025年是具身智能量产启动与小规模商业化试点拐点，应优先物流搬运、餐饮服务、工业巡检等高价值单任务场景。',
    en: '2025 marks the inflection for production kickoff and small-scale commercialization pilots; prioritize high-value single-task scenarios such as logistics handling, food service, and industrial inspection.',
  },
  {
    zh: '中国是全球降本与量产核心之一，新加坡是海外场景验证与跨境落地节点，建议采用“国内量产+海外验证”的双轮策略。',
    en: 'China is one of the global cores for cost-down and scale production, while Singapore serves as an overseas validation and cross-border deployment node; use a dual-track strategy of domestic scaling plus overseas validation.',
  },
  {
    zh: '合作转化依赖SPEM模型筛选与POC验证门槛管理，应将试点成果转化为可签约商业合同，避免无法推广。',
    en: 'Conversion depends on SPEM model screening and POC validation gate management; pilot outcomes should become signable commercial contracts to avoid non-scalable pilots.',
  },
]

export const sectionContent: SectionContent[] = [
  {
    id: 'framework',
    intro: {
      zh: '研究范围覆盖全球与中国，按人形机器人、四足机器人、AMR与具身智能平台四类赛道分层，并结合基础设施层、整机与大脑层、应用与集成层构建全链路观察。',
      en: 'Research scope spans global and China markets across humanoids, quadrupeds, AMRs, and embodied intelligence platforms.',
    },
    bullets: [
      { zh: '四类形态定义：人形强调通用作业与人类环境兼容，四足强调复杂地形，AMR强调物流效率，平台层强调VLA推理与任务分解。', en: 'Four forms: humanoids for general labor, quadrupeds for rough terrain, AMRs for logistics efficiency, and platforms for VLA-level reasoning.' },
      { zh: '三层生态画像：L1基础设施（芯片/传感器/驱动）、L2整机与大脑、L3应用与集成；对应研发负责人、CEO/CTO与运营决策者不同诉求。', en: 'Three-layer stack: infrastructure, robot+AI brain, and integration/service, each with different decision personas and value drivers.' },
      { zh: '全球双循环：2025年中国人形出货占全球约84.7%（IDC等口径，机构间约84.7%–87%）；以美国/欧美为算法与仿真创新中心；新加坡侧重亚太场景验证与跨境落地节点。', en: 'Dual circulation: China humanoid share ~84.7% globally in 2025 (IDC-style; sources ~84.7%–87%); US/Europe lead models/simulation; Singapore focuses on APAC validation and cross-border deployment.' },
    ],
  },
  {
    id: 'market',
    intro: {
      zh: '2025年被视为具身智能“量产元年”，行业从原型验证跨入小规模商业试运行；市场进入“增长快但成熟度不均”的关键窗口。',
      en: 'Placeholder metrics illustrate market size, growth rates, and pricing tiers, ready to be replaced with your real research data.',
    },
    bullets: [
      {
        zh: '市场规模：2025年全球人形出货存在机构分歧（IDC约1.8万、赛迪约1.7万、Omdia约1.33万）；中国占比约84.7%（部分机构口径约87%）。',
        en: '2025 humanoid shipment estimates vary by source (IDC ~18k, CCID ~17k, Omdia ~13.3k), with China share around 84.7% (some sources report ~87%).',
      },
      {
        zh: 'TRL分化：AMR 已达 TRL 8-9，四足 TRL 7-8；人形整机系统多处于 TRL 6-7（核心部件常见 TRL 5-6），非结构化场景稳定工时仍低于工业级要求。',
        en: 'TRL spread: AMRs at TRL 8-9, quadrupeds 7-8; humanoid platforms often TRL 6-7 (core components often 5-6), with unstructured-task uptime still below industrial bars.',
      },
      {
        zh: '价格带分化：高端约 $150k–$500k+，中端约 $30k–$100k，低端约 <$20k；硬件成本结构随形态差异显著，降本重点仍在执行与感知栈。',
        en: 'Pricing tiers span premium R&D platforms to sub-$20k entry bands; hardware cost mix varies by form factor, with actuation and perception as the main cost levers.',
      },
    ],
  },
  {
    id: 'landscape',
    intro: {
      zh: '竞争本质正从单机能力转向“硬件基础 + 算法大脑 + 场景数据”的闭环能力竞赛。',
      en: 'Competition is mapped by capability boundaries and entry barriers to identify collaboration opportunities and coopetition risk.',
    },
    bullets: [
      {
        zh: 'OEM 层：AgiBot（类人形量产出货）与 Unitree（四足/人形硬件 OEM）依托供应链与工程化形成量产与成本壁垒；Tesla / Figure 侧重 AI 软件、VLA 与数据闭环，与硬件 OEM 分工不同。',
        en: 'OEM camp: AgiBot (humanoid volume) and Unitree (quadruped/humanoid hardware OEMs) lean on supply chain and engineering for cost and scale; Tesla/Figure anchor AI software, VLA, and data flywheels—a different lane than hardware OEMs.',
      },
      { zh: 'AI软件层：NVIDIA、DeepMind等推动通用机器人模型与仿真平台演进，决定跨形态任务泛化能力上限。', en: 'AI software layer defines cross-form-factor generalization through foundation models and simulation systems.' },
      { zh: '系统集成层：传统自动化巨头与垂直新锐共同争夺“最后一公里”交付，核心在多品牌机器人协同和运营稳定性。', en: 'SI layer focuses on multi-robot orchestration and reliable delivery in real operations.' },
    ],
  },
  {
    id: 'ecosystem',
    intro: {
      zh: '区域格局加速形成“亚洲制造、全球标准、北美模型”分工，政策与标准成为商业化推进速度的关键变量。',
      en: 'Ecosystem monitoring tracks policy, capital, supply chain, and application openness across Asia and global markets.',
    },
    bullets: [
      { zh: '中国：MIIT标准体系推动接口与安全规范统一，叠加补贴与产业基金，加速从样机向规模化部署迁移。', en: 'China accelerates scale-up through standards, subsidies, and full-stack industrial depth.' },
      { zh: '新加坡：以Open-RMF与沙盒机制建立跨品牌互操作能力，成为企业验证全球部署可行性的关键试验田。', en: 'Singapore is a key interoperability sandbox through Open-RMF and application-led pilots.' },
      { zh: '全球趋势：资本从“展示型AI”转向“可证明ROI的实用场景”，评估指标由演示效果转向人机比、停机率与单位经济性。', en: 'Global investors are shifting from demo-driven narratives to ROI-proof operational metrics.' },
    ],
  },
  {
    id: 'partnership',
    intro: {
      zh: '合作伙伴评估采用SPEM加权模型，分别对硬件、软件、系统集成伙伴设置差异化权重，平衡技术领先与交付确定性。',
      en: 'Potential partners are screened on strategic fit, technical complementarity, and commercial feasibility.',
    },
    bullets: [
      { zh: 'SPEM维度：技术独特性、场景落地力、供应链稳定性、合规对齐、财务成长性，并通过总分=Σ(指标分值×权重)排名。', en: 'SPEM scores partners by weighted dimensions from technical uniqueness to compliance and growth.' },
      { zh: '价值主张模板：愿景对齐 + 能力互补 + 双边收益量化 + 风险共担机制，确保商务讨论可直接进入谈判阶段。', en: 'Value proposition structure: shared vision, capability complement, quantified mutual gains, and risk-sharing.' },
      { zh: '谈判重点：IP归属、试点投入比例、数据回流机制、退出与争议处理条款。', en: 'Key negotiation topics include IP ownership, pilot funding split, data rights, and exit clauses.' },
    ],
  },
  {
    id: 'models',
    intro: {
      zh: '围绕排他、分销、联合开发、RaaS四类模式进行法律与商业比较，目标是在速度、控制权与风险暴露之间取得最优解。',
      en: 'Compare exclusivity, distribution, and joint development models to balance speed and strategic control.',
    },
    bullets: [
      { zh: '排他模式：适合打造高壁垒方案，但需控制排他期限、地域边界及违约责任，防止错失市场窗口。', en: 'Exclusivity can build defensibility but must be tightly scoped by term, geography, and liability.' },
      { zh: '分销模式：适合快速进入区域市场，关键在Territory、支持层级、转售责任与品牌一致性治理。', en: 'Distribution enables fast entry but needs strict territory/support/brand governance terms.' },
      { zh: 'JDA与RaaS：前者需明确Background/Foreground IP，后者强调SLA与现金流安全。', en: 'JDA requires precise IP boundaries; RaaS requires robust SLA and cashflow control.' },
    ],
  },
  {
    id: 'commercial',
    intro: {
      zh: '商业化推进核心是将技术参数转译为客户可感知的业务收益，围绕“问题-方案-价值”构建可复用叙事资产。',
      en: 'Use case narratives follow a problem-solution-value logic for customer engagement and sales support.',
    },
    bullets: [
      { zh: '高潜行业：汽车制造、仓储物流、公共服务与清洁，核心决策人分别关注ROI、稳定性、服务标准化与运维成本。', en: 'Priority sectors include automotive, logistics, and services, each with distinct KPI priorities.' },
      { zh: 'Narrative黄金法则：以业务痛点开篇，解释“为什么是现在”，再给出现阶段可交付能力与下一阶段扩展路径。', en: 'Narratives should start with pain, justify urgency, and present realistic near-term deliverables.' },
      { zh: '销售支持资产：用例一页纸、行业版Pitch Deck、POC建议书和复盘模板形成标准化作战包。', en: 'Standard collateral stack includes one-pagers, sector decks, POC docs, and review templates.' },
    ],
  },
  {
    id: 'poc',
    intro: {
      zh: '为避免“试点地狱”，POC必须采用标准化门槛管理：明确目标、统一测例、量化验收，并在6周内形成可签约结论。',
      en: 'POC planning centers on business goals, measurable success criteria, and clear ownership boundaries.',
    },
    bullets: [
      { zh: '五问筛选器：是否影响决策、是否存在可验证不确定性、是否可在4-6周内定义Pass/Fail、是否有现场资源、是否可公平比较。', en: 'Five-gate filter ensures only decision-relevant and testable pilots move forward.' },
      { zh: '成功标准三层：能力门槛（成功率/日志完整性）、操作效能（MTTR/时延/换电效率）、商业差异（配置便捷性/交互体验）。', en: 'Success criteria span capability gates, operability KPIs, and business differentiators.' },
      { zh: '执行模板：Week1-2准备、Week3-5执行含强制失败测试、Week6评审会；会议纪要必须包含决策、行动项、阻塞项。', en: 'Execution blueprint: setup, run with failure tests, then formal evaluation with decision log and action tracking.' },
    ],
  },
  {
    id: 'roadmap',
    intro: {
      zh: '未来90天建议聚焦“情报基座-伙伴对齐-POC闭环”三阶段推进，将研究结论快速转化为业务增量。',
      en: 'A 90-day roadmap covers deeper research, partner activation, and pilot commercialization.',
    },
    bullets: [
      { zh: '第1-30天：完成AgiBot、Unitree、Figure季度扫描，确定3个高潜试点场景，并基于SPEM筛选前5名伙伴。', en: 'Days 1-30: complete competitor scan, select 3 pilot scenarios, and shortlist top partners via SPEM.' },
      { zh: '第31-60天：启动MOU谈判并锁定IP/数据归属，形成Use-Case Narrative与预算材料，推进高层审批。', en: 'Days 31-60: negotiate MOU/IP/data terms and secure executive budget alignment.' },
      { zh: '第61-90天：启动首个4-6周POC并执行Gate评估，建立周复盘机制，准备小规模量产与合同谈判。', en: 'Days 61-90: run first pilot with gated evaluation and prepare scale-up contract tracks.' },
    ],
  },
]

export const marketStats: StatData[] = [
  {
    label: { zh: '全球人形机器人出货量(2025)', en: 'Global humanoid shipments (2025)' },
    value: 'IDC 18k / CCID 17k / Omdia 13.3k',
    source: { zh: '来源：IDC、赛迪顾问、Omdia（2025）', en: 'Source: IDC, CCID, Omdia (2025)' },
    methodNote: {
      zh: '口径：不同机构对机型范围与统计样本定义不同，故并列展示而非简单取均值。',
      en: 'Method: institutions use different model coverage and sample definitions, so values are shown side-by-side.',
    },
  },
  {
    label: { zh: '中国人形出货占比(2025)', en: 'China share of humanoid shipments (2025)' },
    value: '84.7%',
    source: { zh: '来源：IDC/Omdia/赛迪交叉口径', en: 'Source: cross-check of IDC/Omdia/CCID' },
    methodNote: {
      zh: '口径：主口径为 IDC 估算；部分机构按样本边界统计约 87%，请勿表述为 90%。',
      en: 'Method: IDC-style estimate as primary; some source boundaries yield ~87%—avoid stating 90% as a headline figure.',
    },
  },
  {
    label: { zh: '全球人形机器人同比增速(2025)', en: 'Global humanoid YoY growth (2025)' },
    value: '508%',
    source: { zh: '来源：IDC 2025', en: 'Source: IDC 2025' },
    methodNote: {
      zh: '口径：该指标为人形机器人单年同比增速，不等同于全行业机器人增速；IFR 等综合口径约 17%–28%。',
      en: 'Method: humanoid single-year YoY, not industry-wide robotics growth; IFR-style aggregates are ~17%–28%.',
    },
  },
]
export const marketStatsCommercial: StatData[] = [
  {
    label: { zh: '中国服务机器人市场全球占比(2025)', en: 'China share of global service robot market (2025)' },
    value: '84.7%',
    source: { zh: '来源：IFR World Robotics 2025（营收口径）', en: 'Source: IFR World Robotics 2025 (revenue basis)' },
    methodNote: {
      zh: '口径：按服务机器人相关市场营收占比，不等同于单一场景设备占比。',
      en: 'Method: revenue-share basis, not equivalent to one-scenario device share.',
    },
  },
  {
    label: { zh: '商用服务机器人全球CAGR(2024-2028E)', en: 'Global commercial service robot CAGR (2024-2028E)' },
    value: '18%-22%',
    source: { zh: '来源：IFR + Frost & Sullivan 区间估计', en: 'Source: IFR + Frost & Sullivan range estimate' },
    methodNote: {
      zh: '口径：按商用服务机器人营收区间推算，非单一年份同比。',
      en: 'Method: revenue growth range estimate, not single-year YoY.',
    },
  },
  {
    label: { zh: '高渗透场景类型(2025)', en: 'High-penetration scenario types (2025)' },
    value: '零售/餐饮、公服',
    source: { zh: '来源：IDC China Service Robotics Tracker 2025', en: 'Source: IDC China Service Robotics Tracker 2025' },
    methodNote: {
      zh: '口径：按设备部署结构与项目落地数综合判断。',
      en: 'Method: derived from deployment mix and project implementation volume.',
    },
  },
]

export const marketTable: TableData = {
  headers: [
    { zh: '赛道', en: 'Segment' },
    { zh: '技术成熟度', en: 'Tech Maturity' },
    { zh: '商业化阶段', en: 'Commercial Stage' },
    { zh: '价格带(通用·工业/商用)', en: 'Pricing (general · industrial/commercial)' },
  ],
  rows: [
    [
      { zh: '人形机器人', en: 'Humanoids' },
      {
        zh: 'TRL 6-7（整机系统）；核心部件常见 TRL 5-6',
        en: 'TRL 6-7 (system); core components often TRL 5-6',
      },
      { zh: '系统级验证至小批量试产', en: 'System validation to small-batch pilots' },
      { zh: '$4k-$150k', en: '$4k-$150k' },
    ],
    [
      { zh: '四足机器人', en: 'Quadrupeds' },
      { zh: 'TRL 8-9', en: 'TRL 8-9' },
      { zh: '规模化运营（多行业）', en: 'Scaled operations (multi-sector)' },
      { zh: '$1.3k-$75k', en: '$1.3k-$75k' },
    ],
    [
      { zh: 'AMR', en: 'AMR' },
      { zh: 'TRL 9', en: 'TRL 9' },
      { zh: '成熟运营', en: 'Mature operations' },
      { zh: '$5k-$50k', en: '$5k-$50k' },
    ],
    [
      { zh: '具身智能平台（软件层）', en: 'Embodied AI Platforms (Software Layer)' },
      { zh: 'TRL 8-9', en: 'TRL 8-9' },
      { zh: '规模化成熟部署', en: 'Mature scaled deployment' },
      { zh: '订阅+项目制', en: 'Subscription + projects' },
    ],
  ],
}
export const marketTableCommercial: TableData = {
  headers: [
    { zh: '赛道', en: 'Segment' },
    { zh: '技术成熟度(TRL)', en: 'Technology Maturity (TRL)' },
    { zh: '渗透/商业化阶段', en: 'Penetration & Commercial Stage' },
    { zh: '价格带(商用服务)', en: 'Pricing Tier (Commercial Service)' },
  ],
  rows: [
    [
      { zh: '零售/餐饮配送与迎宾', en: 'Retail/F&B Delivery & Reception' },
      { zh: 'TRL 7-8', en: 'TRL 7-8' },
      { zh: '高渗透，区域规模复制', en: 'High penetration, scaled regional replication' },
      { zh: '主流$5k-$18k（极值$3k-$25k）', en: 'Mainstream $5k-$18k (extreme $3k-$25k)' },
    ],
    [
      { zh: '公共服务巡检与导览', en: 'Public Service Patrol & Guidance' },
      { zh: 'TRL 7-8', en: 'TRL 7-8' },
      { zh: '中高渗透，项目制扩张', en: 'Medium-high penetration, project-led expansion' },
      { zh: '主流$10k-$40k（极值可达$75k）', en: 'Mainstream $10k-$40k (extreme up to $75k)' },
    ],
    [
      { zh: '酒店/会展接待', en: 'Hospitality & Event Reception' },
      { zh: 'TRL 6-7', en: 'TRL 6-7' },
      { zh: '中渗透，连锁复制初期', en: 'Medium penetration, early chain replication' },
      { zh: '主流$8k-$25k（极值$6k-$35k）', en: 'Mainstream $8k-$25k (extreme $6k-$35k)' },
    ],
    [
      { zh: '物业运维与安保协同', en: 'Property Operations & Security Assist' },
      { zh: 'TRL 6-7', en: 'TRL 6-7' },
      { zh: '低中渗透，ROI验证期', en: 'Low-medium penetration, ROI validation stage' },
      { zh: '$10k-$40k', en: '$10k-$40k' },
    ],
  ],
}

export const marketDataByTab = {
  industrial: {
    stats: marketStats,
    table: marketTable,
  },
  commercial: {
    stats: marketStatsCommercial,
    table: marketTableCommercial,
  },
} as const

export const marketFootnotesByTab = {
  industrial: [
    {
      zh: '出货口径：IDC约1.8万、赛迪约1.7万、Omdia约1.33万（2025），受机型边界与样本定义影响存在差异。',
      en: 'Shipment basis: IDC ~18k, CCID ~17k, Omdia ~13.3k (2025); differences come from model scope and sample boundaries.',
    },
    {
      zh: '占比口径：中国人形出货占比采用 84.7% 主口径；部分机构约 87%，请勿表述为 90%。',
      en: 'Share basis: China humanoid share uses 84.7% as primary; some sources ~87%—avoid stating 90% as a fixed headline.',
    },
    {
      zh: '增速口径：508% 为人形单年 YoY，与多年 CAGR 不可直接对比；亦不等同于全行业机器人增速（IFR 等综合口径约 17%–28%）。',
      en: 'Growth basis: 508% is humanoid YoY—not comparable to multi-year CAGR and not industry-wide robotics growth (IFR-style ~17%–28%).',
    },
    {
      zh: '部署口径：硬件部署分布仅统计AMR/四足/人形，具身平台属于软件层，不纳入硬件占比。',
      en: 'Deployment basis: hardware mix covers AMR/quadruped/humanoid only; platform is software layer and excluded from hardware share.',
    },
  ],
  commercial: [
    {
      zh: 'IFR World Robotics 2025：服务机器人年度数据与市场营收口径。',
      en: 'IFR World Robotics 2025: annual service robot data and market revenue basis.',
    },
    {
      zh: 'IDC China Service Robotics Tracker 2025：场景部署结构与行业分布。',
      en: 'IDC China Service Robotics Tracker 2025: scenario deployment mix and sector split.',
    },
    {
      zh: 'Frost & Sullivan Service Robotics Outlook 2025：中期增速区间与商业化阶段研判。',
      en: 'Frost & Sullivan Service Robotics Outlook 2025: medium-term growth range and commercialization stage.',
    },
    {
      zh: '口径说明：渗透度/商业阶段与TRL独立展示，不互相替代。',
      en: 'Method note: penetration/commercial stage is shown independently from TRL.',
    },
  ],
} as const

export const partnershipMatrix: TableData = {
  headers: [
    { zh: '合作模式', en: 'Model' },
    { zh: '价值', en: 'Value' },
    { zh: '风险', en: 'Risk' },
    { zh: '适用场景', en: 'Best-fit Scenario' },
  ],
  rows: [
    [{ zh: '排他合作', en: 'Exclusivity' }, { zh: '差异化和品牌势能', en: 'Differentiation and brand edge' }, { zh: '覆盖速度下降', en: 'Slower market coverage' }, { zh: '关键战略赛道', en: 'Strategic priority segments' }],
    [{ zh: '分销合作', en: 'Distribution' }, { zh: '快速触达客户', en: 'Fast market access' }, { zh: '利润与控制力较弱', en: 'Lower margin and control' }, { zh: '多行业试水期', en: 'Multi-vertical entry stage' }],
    [{ zh: '联合开发', en: 'Joint Development' }, { zh: '形成长期壁垒', en: 'Build long-term defensibility' }, { zh: '投入和协同成本高', en: 'High investment and coordination cost' }, { zh: '高复杂度场景', en: 'High-complexity deployments' }],
  ],
}

export const scenarios: ScenarioData[] = [
  {
    title: { zh: '智能仓储', en: 'Smart Warehousing' },
    description: { zh: '通过AMR和视觉AI提升拣选与搬运效率。', en: 'Improve pick-and-move efficiency with AMRs and vision AI.' },
  },
  {
    title: { zh: '制造巡检', en: 'Manufacturing Inspection' },
    description: { zh: '四足机器人执行高危区域巡检并回传告警。', en: 'Quadrupeds perform inspections in hazardous zones with alerts.' },
  },
  {
    title: { zh: '园区服务', en: 'Campus Services' },
    description: { zh: '具身机器人承担安防、引导和夜间巡逻。', en: 'Embodied robots handle security, guidance, and patrol routines.' },
  },
]

export const competitors: CompetitorData[] = [
  {
    name: 'AgiBot',
    role: { zh: '硬件OEM / 中国头部', en: 'Hardware OEM / China Leader' },
    note: {
      zh: '公开报道 2025 年出货规模居国内前列（行业报道约五千台量级），类人形量产与产品矩阵完整，小脑控制与工程化投入高。',
      en: 'Reported 2025 shipment scale among China leaders (industry reports cite ~5k+ units), with humanoid volume ramp and strong controller engineering.',
    },
    strengths: [{ zh: '量产速度', en: 'Scale speed' }, { zh: '产品矩阵完整', en: 'Complete product matrix' }],
  },
  {
    name: 'Unitree',
    role: { zh: '四足/人形OEM', en: 'Quadruped/Humanoid OEM' },
    note: { zh: '以成本控制与硬件工程能力著称，推动教育科研市场普及。', en: 'Known for aggressive cost-performance and broad education market penetration.' },
    strengths: [{ zh: '成本性能比', en: 'Cost-performance ratio' }, { zh: '工程迭代效率', en: 'Engineering iteration speed' }],
  },
  {
    name: 'Tesla / Figure AI',
    role: { zh: 'AI 软件 / VLA 与数据闭环', en: 'AI software / VLA & data flywheel' },
    note: {
      zh: '端到端大模型与仿真/数据闭环领先；规模化制造与现场交付仍弱于头部硬件 OEM，处于爬坡期。',
      en: 'Leads on end-to-end models and sim/data flywheels; manufacturing scale and field delivery trail top hardware OEMs while ramping.',
    },
    strengths: [{ zh: 'VLA 与算法栈', en: 'VLA & algorithm stack' }, { zh: '数据与生态叙事', en: 'Data & ecosystem narrative' }],
  },
]

export const references = [
  { label: 'IDC China & Omdia 2025-2026 Humanoid Shipment Research', url: 'https://www.idc.com' },
  { label: 'Counterpoint 2026 Embodied AI Commercialization in China', url: 'https://www.counterpointresearch.com' },
  { label: 'McKinsey 2025 Humanoids Crossing the Chasm', url: 'https://www.mckinsey.com' },
  { label: 'MIIT 2026 Humanoid & Embodied AI Standard System', url: 'https://www.miit.gov.cn' },
  { label: 'Singapore NRP Open-RMF Deployment Roadmap', url: 'https://www.nrp.gov.sg' },
  { label: 'NVIDIA Physical AI and Cosmos Whitepaper', url: 'https://www.nvidia.com' },
  { label: 'DLA Piper / JDSupra JDA Negotiation Guide', url: 'https://www.jdsupra.com' },
  { label: 'Umbrex Enterprise POC Evaluation Whitepaper', url: 'https://umbrex.com' },
  { label: 'Inknarrates Robotics Use-Case Storytelling', url: 'https://inknarrates.com' },
  { label: 'IFR World Robotics 2025 Service Robot Report', url: 'https://ifr.org' },
]

export const decisionMatrix = [
  {
    title: { zh: '高商业价值 / 低实现难度', en: 'High Value / Low Difficulty' },
    items: [
      {
        zh: '仓储搬运与AMR协同：优先规模化部署，建立标准交付包。',
        en: 'Warehouse AMR collaboration: scale first with standardized delivery kits.',
      },
      {
        zh: '制造巡检自动化：快速验证ROI并复制到同类产线。',
        en: 'Manufacturing inspection: validate ROI and replicate across similar lines.',
      },
    ],
  },
  {
    title: { zh: '高商业价值 / 高实现难度', en: 'High Value / High Difficulty' },
    items: [
      {
        zh: '人形多任务通用作业：以联合开发推进，分阶段解锁能力。',
        en: 'Humanoid multi-task operations: advance via phased joint development.',
      },
      {
        zh: '跨品牌机器人统一编排：依赖标准接口与生态协同。',
        en: 'Cross-vendor orchestration: requires standards and ecosystem alignment.',
      },
    ],
  },
  {
    title: { zh: '低商业价值 / 低实现难度', en: 'Low Value / Low Difficulty' },
    items: [
      {
        zh: '展厅导览与表演展示：作为品牌曝光和数据采集补充。',
        en: 'Showroom guidance and demos: useful for branding and data collection.',
      },
    ],
  },
  {
    title: { zh: '低商业价值 / 高实现难度', en: 'Low Value / High Difficulty' },
    items: [
      {
        zh: '全场景通用家庭助理：短期投入产出比不足，建议延后。',
        en: 'General home assistant: defer due to weak near-term ROI.',
      },
    ],
  },
]
