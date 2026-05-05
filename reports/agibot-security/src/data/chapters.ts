export type ChapterMeta = {
  id: string;
  no: string;
  label: string;
  shortTitle: string;
};

export const chapters: ChapterMeta[] = [
  { id: "c00", no: "00", label: "封面", shortTitle: "Cover" },
  { id: "c00a", no: "00A", label: "杭州图谱", shortTitle: "Hangzhou" },
  { id: "c01", no: "01", label: "为何选择", shortTitle: "Selection" },
  { id: "c02", no: "02", label: "合作理由", shortTitle: "Dual-Drive" },
  { id: "c03", no: "03", label: "形态与CMF", shortTitle: "Body/Form" },
  { id: "c04", no: "04", label: "硬核参数", shortTitle: "Body/Specs" },
  { id: "c05", no: "05", label: "感知与决策", shortTitle: "Mind/Brain" },
  { id: "c06", no: "06", label: "运动控制", shortTitle: "Mind/Cerebellum" },
  { id: "c07", no: "07", label: "实战场景", shortTitle: "Scenario" },
  { id: "c08", no: "08", label: "市场价值", shortTitle: "Market" },
  { id: "c09", no: "09", label: "商业化路径", shortTitle: "GTM" },
  { id: "c10", no: "10", label: "痛点与风险", shortTitle: "Risks" },
  { id: "c11", no: "11", label: "竞品对比", shortTitle: "Compare" },
  { id: "c12", no: "12", label: "个人愿景", shortTitle: "Vision" },
];
