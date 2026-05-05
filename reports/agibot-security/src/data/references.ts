export type ReferenceItem = {
  n: number;
  org: string;
  date?: string;
  title: string;
  url: string;
  note?: string;
};

export const references: ReferenceItem[] = [
  {
    n: 1,
    org: "PRNewswire via TNGlobal (TechNode Global)",
    date: "2025-05-20",
    title: "Certis unboxes ‘robocop’ as it explores use of humanoid robots",
    url: "https://technode.global/prnasia/certis-unboxes-robocop-as-it-explores-use-of-humanoid-robots/",
    note: "披露 Certis 与 Agibot 于 2025 年 2 月签署 MOU，并提到 Mozart 编排系统。",
  },
  {
    n: 2,
    org: "Pandaily",
    date: "2026-03-16",
    title: "AGIBOT Secures First Overseas Telecom Partnership, Deploys Robots at World-Class Aviation Hub",
    url: "https://pandaily.com/agibot-secures-first-overseas-telecom-partnership-deploys-robots-at-world-class-aviation-hub",
    note: "提到与 Certis 合作，并在樟宜机场 T5 场景落地（礼宾/导览/咨询）。",
  },
  {
    n: 3,
    org: "智元机器人官网",
    title: "智元远征A2-W 产品页",
    url: "https://www.zhiyuan-robot.com/products/A2_W",
    note: "页面描述包含“基于…275T算力”等信息。",
  },
  {
    n: 4,
    org: "智元机器人官网",
    title: "智元远征A2完成第五次OTA升级，迈向场景应用“全面智能体”",
    url: "https://www.zhiyuan-robot.com/article/188/detail/88.html",
    note: "提到行走提速33%，并能在草坪/鹅卵石等多种路况稳定行走。",
  },
  {
    n: 5,
    org: "IT之家",
    date: "2025-12-26",
    title: "智元远征 A2 旗舰版迎来 V1.3 更新，行走速度提升至 1.2m/s",
    url: "https://www.ithome.com/0/908/217.htm",
    note: "披露行走最大速度 0.8→1.2m/s（约+50%）。",
  },
  {
    n: 6,
    org: "智元机器人官网",
    title: "智元818新品发布会全程回顾",
    url: "https://www.zhiyuan-robot.com/article/188/detail/27.html",
    note: "提到 19 自由度工业级视触觉灵巧手（用于 A2-Max 演示）。",
  },
  {
    n: 7,
    org: "CNA (Channel NewsAsia)",
    date: "2021-11-12",
    title: "Monthly wages for security officers to increase over six-year period from 2023",
    url: "https://www.channelnewsasia.com/singapore/security-guard-officer-pay-progressive-wage-model-pwm-2307846",
    note: "提到新加坡安保行业“perennial challenge”人力短缺，并给出行业规模（约4万名安保人员）。",
  },
  {
    n: 8,
    org: "LinkedIn (Certis Australia)",
    date: "2025-07-14",
    title: "The Future of Humanoid Robotics in Physical Security: Certis Australia’s Perspective",
    url: "https://www.linkedin.com/pulse/future-humanoid-robotics-physical-security-certis-brett-pickens-%E5%BD%AD%E5%8D%9A%E7%A3%8A--scxgc",
    note: "讨论人力约束与机器人在安保场景的角色，提到与 Agibot 的评估合作。",
  },
];
