import type { ChapterMeta } from '../types/report'

export const chapters: ChapterMeta[] = [
  {
    id: 'cover',
    no: '00',
    label: { zh: '封面', en: 'Cover' },
    title: { zh: '机器人与具身AI调研报告', en: 'Robotics & Embodied AI Research Brief' },
  },
  {
    id: 'framework',
    no: '01',
    label: { zh: '研究框架', en: 'Research Scope' },
    title: { zh: '全球/中国市场结构化框架', en: 'Structured Framework for Global and China Markets' },
  },
  {
    id: 'market',
    no: '02',
    label: { zh: '市场与行业研究', en: 'Market & Industry' },
    title: { zh: '技术成熟度、商业化与定价趋势', en: 'Maturity, Commercialization, and Pricing Trends' },
  },
  {
    id: 'landscape',
    no: '03',
    label: { zh: '竞争格局地图', en: 'Competitive Landscape' },
    title: { zh: 'OEM、系统集成与AI软件三层分析', en: 'OEM, Integrator, and AI Software Mapping' },
  },
  {
    id: 'ecosystem',
    no: '04',
    label: { zh: '生态与区域趋势', en: 'Ecosystem Trends' },
    title: { zh: '亚洲与全球生态动态追踪', en: 'Asia and Global Ecosystem Tracking' },
  },
  {
    id: 'partnership',
    no: '05',
    label: { zh: '战略合作评估', en: 'Partnership Strategy' },
    title: { zh: '候选伙伴与价值主张评估', en: 'Partner Screening and Value Proposition' },
  },
  {
    id: 'models',
    no: '06',
    label: { zh: '合作模式与MOU', en: 'Collaboration Models' },
    title: { zh: '排他、分销、联合开发对比', en: 'Exclusivity, Distribution, and Joint Development' },
  },
  {
    id: 'commercial',
    no: '07',
    label: { zh: '商业化支持', en: 'Commercial Support' },
    title: { zh: '高潜场景、客户画像与叙事', en: 'Use Cases, Customer Segments, and Narrative' },
  },
  {
    id: 'poc',
    no: '08',
    label: { zh: 'POC推进机制', en: 'POC Execution' },
    title: { zh: '成功标准、角色分工与跟进', en: 'Success Criteria, Roles, and Follow-up Loop' },
  },
  {
    id: 'roadmap',
    no: '09',
    label: { zh: '90天建议', en: '90-Day Roadmap' },
    title: { zh: '优先级路线图与决策建议', en: 'Prioritized Recommendations and Decisions' },
  },
  {
    id: 'references',
    no: '10',
    label: { zh: '参考来源', en: 'References' },
    title: { zh: '可替换真实来源清单', en: 'Replaceable Source List' },
  },
]
