const grid = document.querySelector("#reportGrid");
const reportCount = document.querySelector("#reportCount");
const filters = [...document.querySelectorAll(".filter")];

let reports = [];
let activeFilter = "all";

function stateOf(report) {
  if (!report.exists) return "missing";
  if (report.ready || report.hasFallback) return "ready";
  return "needs-build";
}

function stateLabel(state) {
  return {
    ready: "可打开",
    "needs-build": "需构建",
    missing: "缺失"
  }[state] || state;
}

function render() {
  const visibleReports = reports.filter((report) => {
    const state = stateOf(report);
    return activeFilter === "all" || activeFilter === state;
  });

  reportCount.textContent = String(reports.length);
  grid.innerHTML = visibleReports.map(renderCard).join("");
}

function renderCard(report) {
  const state = stateOf(report);
  const tags = (report.tags || []).map((tag) => `<span>${tag}</span>`).join("");
  const openButton = report.openUrl
    ? `<a class="primary" href="${report.openUrl}" target="_blank" rel="noreferrer">打开报告</a>`
    : `<button class="primary disabled" disabled>无法打开</button>`;
  const folderButton = report.exists
    ? `<a class="secondary" href="${report.folderUrl}">打开文件夹</a>`
    : `<span class="secondary muted">文件夹不存在</span>`;
  const buildHint = state === "needs-build" && report.buildCommand
    ? `<p class="hint">建议运行：<code>cd "${report.absolutePath}" && ${report.buildCommand}</code></p>`
    : "";
  const note = report.notes ? `<p class="note">${report.notes}</p>` : "";

  return `
    <article class="card ${state}">
      <div class="card-top">
        <span class="state" data-state="${state}">${stateLabel(state)}</span>
        <span class="id">${report.id}</span>
      </div>
      <div class="card-main">
        <div>
          <h2>${report.title}</h2>
          <p class="subtitle">${report.subtitle || ""}</p>
          <div class="tags">${tags}</div>
        </div>
        <div class="actions">
          ${openButton}
          ${folderButton}
        </div>
      </div>
      ${buildHint}
      ${note}
    </article>
  `;
}

async function init() {
  const response = await fetch("/api/config");
  const config = await response.json();
  reports = config.reports || [];
  render();
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});

init().catch((error) => {
  grid.innerHTML = `<p class="error">报告中心加载失败：${error.message}</p>`;
});
