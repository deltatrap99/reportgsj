const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("vi-VN");

const state = {
  report: null,
  selectedMonthKey: null,
  selectedWeekKey: "all",
  language: "vi",
};

const translations = {
  vi: {
    navOverview: "Tổng quan",
    navPerformance: "Hiệu suất tháng",
    navDaily: "Nhật ký ngày",
    reportingPeriod: "Kỳ báo cáo",
    openSheet: "Mở Google Sheet",
    currentSnapshot: "Ảnh chụp kỳ đang xem",
    revenue: "Doanh thu",
    roas: "ROAS",
    meRe: "ME/RE",
    dashboardLabel: "Marketing Report",
    healthScore: "Health Score",
    controlsLabel: "Dashboard Controls",
    filtersAndSync: "Bộ lọc và đồng bộ",
    selectMonth: "Chọn tháng",
    selectWeek: "Chọn tuần",
    portfolioView: "Portfolio View",
    monthlyCompare: "So sánh doanh thu và chi phí theo tháng",
    dailyTrend: "Daily Trend",
    dailyCompare: "Doanh thu và chi phí theo ngày",
    selectedPeriod: "Selected Period Snapshot",
    selectedSummary: "Tóm tắt kỳ đang xem",
    selectedFunnel: "Funnel kỳ đang xem",
    recentDailyTracking: "Recent Daily Tracking",
    dailyLog: "Bảng nhật ký ngày",
    day: "Ngày",
    whatMatters: "What Matters",
    executiveInsights: "Insight điều hành",
    nextActions: "Next Actions",
    recommendedActions: "Đề xuất hành động",
    title: "Báo cáo marketing chuyên nghiệp từ Google Sheet",
    subtitle: "Dashboard đồng bộ từ khối Total, có thể xem theo tháng và theo tuần.",
    syncedAt: "Đồng bộ lúc",
    noPrevious: "Không có kỳ trước",
    vsPrevious: "so với kỳ trước",
    strong: "Tốt",
    stable: "Ổn định",
    watch: "Cần theo dõi",
    allWeeks: "Cả tháng",
    weekLabel: "Tuần",
    monthLabel: "Tháng",
    revenueLegend: "Doanh thu",
    expenseLegend: "Chi phí Ads",
    revenueByDay: "RE theo ngày",
    expenseByDay: "ME theo ngày",
    noDailyData: "Không có dữ liệu ngày cho bộ lọc này.",
    kpiRevenue: "Doanh thu",
    kpiExpense: "Chi phí Ads",
    kpiEfficiency: "ME/RE",
    kpiC3: "C3",
    kpiL0: "L0",
    kpiL5: "L5 lũy kế",
  },
  en: {
    navOverview: "Overview",
    navPerformance: "Monthly performance",
    navDaily: "Daily log",
    reportingPeriod: "Reporting period",
    openSheet: "Open Google Sheet",
    currentSnapshot: "Current snapshot",
    revenue: "Revenue",
    roas: "ROAS",
    meRe: "ME/RE",
    dashboardLabel: "Marketing Report",
    healthScore: "Health Score",
    controlsLabel: "Dashboard Controls",
    filtersAndSync: "Filters and sync",
    selectMonth: "Select month",
    selectWeek: "Select week",
    portfolioView: "Portfolio View",
    monthlyCompare: "Monthly revenue vs ad cost",
    dailyTrend: "Daily Trend",
    dailyCompare: "Daily revenue vs ad cost",
    selectedPeriod: "Selected Period Snapshot",
    selectedSummary: "Selected period summary",
    selectedFunnel: "Selected period funnel",
    recentDailyTracking: "Recent Daily Tracking",
    dailyLog: "Daily activity table",
    day: "Day",
    whatMatters: "What Matters",
    executiveInsights: "Executive insights",
    nextActions: "Next Actions",
    recommendedActions: "Recommended actions",
    title: "Professional marketing report from Google Sheet",
    subtitle: "Dashboard synced from the Total block with monthly and weekly views.",
    syncedAt: "Synced at",
    noPrevious: "No previous period",
    vsPrevious: "vs previous period",
    strong: "Strong",
    stable: "Stable",
    watch: "Watch",
    allWeeks: "Full month",
    weekLabel: "Week",
    monthLabel: "Month",
    revenueLegend: "Revenue",
    expenseLegend: "Ad cost",
    revenueByDay: "Daily revenue",
    expenseByDay: "Daily ad cost",
    noDailyData: "No daily data for this filter.",
    kpiRevenue: "Revenue",
    kpiExpense: "Ad cost",
    kpiEfficiency: "ME/RE",
    kpiC3: "C3",
    kpiL0: "L0",
    kpiL5: "L5 cumulative",
  },
};

function t(key) {
  return translations[state.language][key] ?? key;
}

function formatValue(value, type) {
  if (value === null || value === undefined) {
    return "-";
  }

  switch (type) {
    case "currency":
      return currency.format(value);
    case "percent":
      return `${value.toFixed(1)}%`;
    default:
      return number.format(value);
  }
}

function formatChange(value, type = "percent") {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return t("noPrevious");
  }

  const prefix = value > 0 ? "+" : "";
  const suffix = type === "percent" ? "%" : "";
  return `${prefix}${value.toFixed(1)}${suffix} ${t("vsPrevious")}`;
}

function percentChange(current, previous) {
  if (!previous) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

function getWeekBuckets(dailyRows) {
  const ranges = [
    { key: "all", start: 1, end: 31 },
    { key: "w1", start: 1, end: 7 },
    { key: "w2", start: 8, end: 14 },
    { key: "w3", start: 15, end: 21 },
    { key: "w4", start: 22, end: 31 },
  ];

  return ranges
    .map((range, index) => {
      const rows = dailyRows.filter((row) => {
        const dayNumber = Number(row.date.split("/")[0]);
        return dayNumber >= range.start && dayNumber <= range.end;
      });

      return {
        key: range.key,
        index,
        start: range.start,
        end: range.end,
        rows,
      };
    })
    .filter((bucket) => bucket.key === "all" || bucket.rows.length > 0);
}

function summarizeRows(rows) {
  return rows.reduce(
    (accumulator, row) => {
      accumulator.revenue += row.revenue;
      accumulator.expense += row.expense;
      accumulator.c3 += row.c3;
      accumulator.l0 += row.l0;
      accumulator.l5 += row.l5;
      return accumulator;
    },
    { revenue: 0, expense: 0, c3: 0, l0: 0, l5: 0 }
  );
}

function enrichSummary(base) {
  return {
    ...base,
    roas: base.expense > 0 ? base.revenue / base.expense : 0,
    efficiency: base.revenue > 0 ? (base.expense / base.revenue) * 100 : 0,
    c3Cost: base.c3 > 0 ? base.expense / base.c3 : 0,
    l0Cost: base.l0 > 0 ? base.expense / base.l0 : 0,
    arpu: base.l5 > 0 ? base.revenue / base.l5 : 0,
  };
}

function buildHealth(summary) {
  let score = 100;
  const l0Rate = summary.c3 > 0 ? (summary.l0 / summary.c3) * 100 : 0;

  if (summary.efficiency > 20) {
    score -= 18;
  } else if (summary.efficiency > 12) {
    score -= 10;
  }

  if (l0Rate < 75) {
    score -= 12;
  } else if (l0Rate < 85) {
    score -= 6;
  }

  if (summary.previous && summary.c3Cost > summary.previous.c3Cost * 1.15) {
    score -= 8;
  }

  const finalScore = Math.max(45, Math.min(98, Math.round(score)));
  return {
    score: finalScore,
    labelKey: finalScore >= 85 ? "strong" : finalScore >= 70 ? "stable" : "watch",
  };
}

function getSelectedPeriod(report) {
  const months = report.monthlyPerformance;
  const monthIndex = months.findIndex((month) => month.shortLabel === state.selectedMonthKey);
  const month = months[monthIndex] || months[months.length - 1];
  const previousMonth = monthIndex > 0 ? months[monthIndex - 1] : null;
  const monthSummary = enrichSummary({
    revenue: month.revenue,
    expense: month.expense,
    c3: month.c3,
    l0: month.l0,
    l5: month.l5,
  });
  const previousMonthSummary = previousMonth
    ? enrichSummary({
        revenue: previousMonth.revenue,
        expense: previousMonth.expense,
        c3: previousMonth.c3,
        l0: previousMonth.l0,
        l5: previousMonth.l5,
      })
    : null;

  const dailyRows = report.dailyByMonth[month.shortLabel] || [];
  const weeklyBuckets = getWeekBuckets(dailyRows);
  const weekBucket = weeklyBuckets.find((bucket) => bucket.key === state.selectedWeekKey) || weeklyBuckets[0];
  const filteredRows = weekBucket.key === "all" ? dailyRows : weekBucket.rows;

  if (weekBucket.key === "all") {
    return {
      month,
      weeklyBuckets,
      filteredRows,
      summary: {
        ...monthSummary,
        periodLabel: month.label,
        previous: previousMonthSummary,
      },
    };
  }

  const weeklySummary = enrichSummary(summarizeRows(filteredRows));
  const previousBucket = weeklyBuckets.find((bucket) => bucket.index === weekBucket.index - 1) || null;
  const previousWeeklySummary = previousBucket ? enrichSummary(summarizeRows(previousBucket.rows)) : null;

  return {
    month,
    weeklyBuckets,
    filteredRows,
    summary: {
      ...weeklySummary,
      periodLabel: `${month.label} • ${t("weekLabel")} ${weekBucket.index}`,
      previous: previousWeeklySummary,
    },
  };
}

function buildInsights(summary) {
  const l0Rate = summary.c3 > 0 ? (summary.l0 / summary.c3) * 100 : 0;
  const revenueDelta = percentChange(summary.revenue, summary.previous?.revenue || 0);

  const insights = [
    state.language === "vi"
      ? `${summary.periodLabel} ghi nhận doanh thu ${currency.format(summary.revenue)} và ROAS ${summary.roas.toFixed(2)}.`
      : `${summary.periodLabel} delivered ${currency.format(summary.revenue)} in revenue with ROAS ${summary.roas.toFixed(2)}.`,
    state.language === "vi"
      ? `Tỷ lệ L0/C3 đạt ${l0Rate.toFixed(1)}% với ARPU ${currency.format(summary.arpu)}.`
      : `L0/C3 conversion reached ${l0Rate.toFixed(1)}% with ARPU at ${currency.format(summary.arpu)}.`,
    state.language === "vi"
      ? `Giá C3 là ${currency.format(summary.c3Cost)} và giá L0 là ${currency.format(summary.l0Cost)}.`
      : `Cost per C3 is ${currency.format(summary.c3Cost)} and cost per L0 is ${currency.format(summary.l0Cost)}.`,
  ];

  if (revenueDelta !== null) {
    insights.splice(
      1,
      0,
      state.language === "vi"
        ? `Doanh thu ${revenueDelta > 0 ? "tăng" : "giảm"} ${Math.abs(revenueDelta).toFixed(1)}% so với kỳ trước.`
        : `Revenue ${revenueDelta > 0 ? "increased" : "decreased"} by ${Math.abs(revenueDelta).toFixed(
            1
          )}% versus the previous period.`
    );
  }

  return insights;
}

function buildActions(summary, rows) {
  const zeroRevenueDays = rows.filter((row) => row.revenue === 0 && row.expense > 0).length;
  const actions = [];

  if (summary.efficiency > 20) {
    actions.push(
      state.language === "vi"
        ? "Rà soát ngân sách và tách riêng nhóm nguồn có ME/RE vượt 20%."
        : "Review budget allocation and isolate sources with ME/RE above 20%."
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Duy trì cấu trúc ngân sách hiện tại và tiếp tục scale nhóm có chi phí ổn định."
        : "Keep the current budget structure and continue scaling stable cost groups."
    );
  }

  if (summary.previous && summary.c3Cost > summary.previous.c3Cost * 1.15) {
    actions.push(
      state.language === "vi"
        ? "Giá C3 đang tăng nhanh, ưu tiên kiểm tra creative, targeting và landing page."
        : "C3 cost is rising quickly, so review creatives, targeting, and landing pages first."
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Giá C3 đang tốt, có thể mở rộng volume nếu đội sales theo kịp."
        : "C3 cost looks healthy and volume can be scaled if sales capacity keeps up."
    );
  }

  if (zeroRevenueDays > 0) {
    actions.push(
      state.language === "vi"
        ? `Có ${zeroRevenueDays} ngày có chi phí nhưng không có doanh thu, cần review ngay các ngày đó.`
        : `${zeroRevenueDays} days had ad cost without revenue, so those dates should be reviewed immediately.`
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Nhật ký ngày đang ổn, có thể nhân bản mô thức từ các ngày có doanh thu tốt."
        : "Daily tracking looks healthy, so repeat the patterns from strong revenue days."
    );
  }

  return actions;
}

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
  document.getElementById("language-toggle").textContent = state.language === "vi" ? "EN" : "VI";
}

function renderMonthOptions(report) {
  const select = document.getElementById("month-filter");
  select.innerHTML = report.availableMonths
    .map(
      (month) =>
        `<option value="${month.key}" ${month.key === state.selectedMonthKey ? "selected" : ""}>${t(
          "monthLabel"
        )} ${month.key} (${month.period})</option>`
    )
    .join("");
}

function renderWeekOptions(weeklyBuckets) {
  const select = document.getElementById("week-filter");
  select.innerHTML = weeklyBuckets
    .map((bucket) => {
      if (bucket.key === "all") {
        return `<option value="all" ${state.selectedWeekKey === "all" ? "selected" : ""}>${t("allWeeks")}</option>`;
      }

      return `<option value="${bucket.key}" ${bucket.key === state.selectedWeekKey ? "selected" : ""}>${t(
        "weekLabel"
      )} ${bucket.index} (${bucket.start}-${bucket.end})</option>`;
    })
    .join("");
}

function buildKpis(summary) {
  return [
    {
      label: t("kpiRevenue"),
      value: summary.revenue,
      type: "currency",
      change: percentChange(summary.revenue, summary.previous?.revenue || 0),
      changeType: "percent",
    },
    {
      label: t("kpiExpense"),
      value: summary.expense,
      type: "currency",
      change: percentChange(summary.expense, summary.previous?.expense || 0),
      changeType: "percent",
    },
    {
      label: t("roas"),
      value: summary.roas,
      type: "number",
      change: percentChange(summary.roas, summary.previous?.roas || 0),
      changeType: "percent",
    },
    {
      label: t("kpiEfficiency"),
      value: summary.efficiency,
      type: "percent",
      change: summary.previous ? summary.efficiency - summary.previous.efficiency : null,
      changeType: "percent",
    },
    {
      label: t("kpiC3"),
      value: summary.c3,
      type: "number",
      change: percentChange(summary.c3, summary.previous?.c3 || 0),
      changeType: "percent",
    },
    {
      label: t("kpiL0"),
      value: summary.l0,
      type: "number",
      change: percentChange(summary.l0, summary.previous?.l0 || 0),
      changeType: "percent",
    },
    {
      label: t("kpiL5"),
      value: summary.l5,
      type: "number",
      change: percentChange(summary.l5, summary.previous?.l5 || 0),
      changeType: "percent",
    },
  ];
}

function renderKpis(kpis) {
  const grid = document.getElementById("kpi-grid");
  grid.innerHTML = kpis
    .map(
      (kpi) => `
        <article class="kpi-card">
          <div class="kpi-label">${kpi.label}</div>
          <div class="kpi-value">${formatValue(kpi.value, kpi.type)}</div>
          <span class="kpi-change ${kpi.change !== null && kpi.change < 0 ? "is-down" : "is-up"}">
            ${formatChange(kpi.change, kpi.changeType)}
          </span>
        </article>
      `
    )
    .join("");
}

function renderMonthlyPerformance(months, selectedMonthKey) {
  const container = document.getElementById("monthly-list");
  container.innerHTML = months
    .map((month) => {
      const roas = month.expense > 0 ? month.revenue / month.expense : 0;
      return `
        <article class="channel-item ${month.shortLabel === selectedMonthKey ? "is-selected" : ""}">
          <div class="channel-head">
            <strong>${month.label}</strong>
            <span class="metric-chip">ROAS ${roas.toFixed(2)}</span>
          </div>
          <div class="channel-metrics">
            <span class="metric-chip">${t("revenue")} ${currency.format(month.revenue)}</span>
            <span class="metric-chip">${t("kpiExpense")} ${currency.format(month.expense)}</span>
            <span class="metric-chip">C3 ${number.format(month.c3)}</span>
            <span class="metric-chip">L5 ${number.format(month.l5)}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMonthlyChart(months, selectedMonthKey) {
  const container = document.getElementById("monthly-chart");
  const width = 760;
  const height = 280;
  const padding = { top: 24, right: 24, bottom: 42, left: 24 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxRevenue = Math.max(...months.map((month) => month.revenue), 1);
  const maxExpense = Math.max(...months.map((month) => month.expense), 1);
  const slotWidth = innerWidth / months.length;

  const bars = months
    .map((month, index) => {
      const x = padding.left + index * slotWidth + 6;
      const revenueHeight = (month.revenue / maxRevenue) * (innerHeight - 28);
      const expenseHeight = (month.expense / maxExpense) * (innerHeight - 48);
      const revenueY = padding.top + innerHeight - revenueHeight;
      const expenseY = padding.top + innerHeight - expenseHeight;
      const isSelected = month.shortLabel === selectedMonthKey;

      return `
        <g>
          <rect x="${x}" y="${revenueY}" width="${slotWidth - 16}" height="${revenueHeight}" rx="12" fill="${
            isSelected ? "#0f8c6a" : "#d7e8df"
          }"></rect>
          <rect x="${x + 10}" y="${expenseY}" width="${slotWidth - 36}" height="${expenseHeight}" rx="10" fill="${
            isSelected ? "#163029" : "#7fa595"
          }"></rect>
          <text x="${x + (slotWidth - 16) / 2}" y="${height - 14}" text-anchor="middle" fill="#597067" font-size="12">${
            month.shortLabel
          }</text>
        </g>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="chart-legend">
      <span><i class="legend-swatch revenue"></i>${t("revenueLegend")}</span>
      <span><i class="legend-swatch expense"></i>${t("expenseLegend")}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" aria-label="Monthly performance chart">
      ${bars}
    </svg>
  `;
}

function renderDailyChart(rows) {
  const container = document.getElementById("daily-chart");

  if (!rows.length) {
    container.innerHTML = `<p class="empty-state">${t("noDailyData")}</p>`;
    return;
  }

  const orderedRows = [...rows].slice(-10);
  const width = 760;
  const height = 280;
  const padding = { top: 26, right: 26, bottom: 40, left: 16 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxRevenue = Math.max(...orderedRows.map((row) => row.revenue), 1);
  const maxExpense = Math.max(...orderedRows.map((row) => row.expense), 1);
  const stepX = orderedRows.length > 1 ? innerWidth / (orderedRows.length - 1) : innerWidth;

  const revenuePoints = orderedRows
    .map((row, index) => {
      const x = padding.left + index * stepX;
      const y = padding.top + innerHeight - (row.revenue / maxRevenue) * (innerHeight - 12);
      return `${x},${y}`;
    })
    .join(" ");

  const expensePoints = orderedRows
    .map((row, index) => {
      const x = padding.left + index * stepX;
      const y = padding.top + innerHeight - (row.expense / maxExpense) * (innerHeight - 12);
      return `${x},${y}`;
    })
    .join(" ");

  const labels = orderedRows
    .map((row, index) => {
      const x = padding.left + index * stepX;
      return `<text x="${x}" y="${height - 12}" text-anchor="middle" fill="#597067" font-size="11">${row.date}</text>`;
    })
    .join("");

  container.innerHTML = `
    <div class="chart-legend">
      <span><i class="legend-swatch line-revenue"></i>${t("revenueByDay")}</span>
      <span><i class="legend-swatch line-expense"></i>${t("expenseByDay")}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" aria-label="Daily performance chart">
      <polyline points="${expensePoints}" fill="none" stroke="#d7812b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <polyline points="${revenuePoints}" fill="none" stroke="#0f8c6a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${labels}
    </svg>
  `;
}

function renderFunnel(funnel) {
  const container = document.getElementById("funnel");
  const maxValue = Math.max(...funnel.map((step) => step.value), 1);

  container.innerHTML = funnel
    .map(
      (step) => `
        <div class="funnel-step">
          <span class="funnel-label">${step.label}</span>
          <div class="funnel-bar">
            <span style="width: ${(step.value / maxValue) * 100}%"></span>
          </div>
          <span class="funnel-value">${number.format(step.value)}</span>
        </div>
      `
    )
    .join("");
}

function renderDailyTable(rows) {
  const table = document.getElementById("daily-table");
  table.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.date}</td>
          <td>${currency.format(row.revenue)}</td>
          <td>${currency.format(row.expense)}</td>
          <td>${number.format(row.c3)}</td>
          <td>${number.format(row.l0)}</td>
          <td>${number.format(row.l5)}</td>
        </tr>
      `
    )
    .join("");
}

function renderList(id, items) {
  document.getElementById(id).innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function hydrateMeta(report, summary) {
  const health = buildHealth(summary);
  document.getElementById("reporting-period").textContent = summary.periodLabel;
  document.getElementById("topbar-period").textContent = summary.periodLabel;
  document.getElementById("last-updated").textContent = `${t("syncedAt")}: ${report.source.syncedAt}`;
  document.getElementById("sidebar-revenue").textContent = currency.format(summary.revenue);
  document.getElementById("sidebar-roas").textContent = summary.roas.toFixed(2);
  document.getElementById("sidebar-efficiency").textContent = `${summary.efficiency.toFixed(1)}%`;
  document.getElementById("sidebar-arpu").textContent = currency.format(summary.arpu);
  document.getElementById("health-score").textContent = `${health.score}/100`;
  document.getElementById("health-label").textContent = t(health.labelKey);
  document.getElementById("hero-title").textContent = t("title");
  document.getElementById("hero-copy").textContent = `${t("subtitle")} ${summary.periodLabel}.`;
  document.getElementById("source-link").href = report.source.sheetUrl;
}

function updateDashboard() {
  applyStaticTranslations();
  renderMonthOptions(state.report);

  const { month, weeklyBuckets, filteredRows, summary } = getSelectedPeriod(state.report);
  renderWeekOptions(weeklyBuckets);
  hydrateMeta(state.report, summary);
  renderKpis(buildKpis(summary));
  renderMonthlyChart(state.report.monthlyPerformance, month.shortLabel);
  renderDailyChart(filteredRows);
  renderMonthlyPerformance(state.report.monthlyPerformance, month.shortLabel);
  renderFunnel([
    { label: "C3", value: summary.c3 },
    { label: "L0", value: summary.l0 },
    { label: "L5", value: summary.l5 },
  ]);
  renderDailyTable([...filteredRows].slice(-7).reverse());
  renderList("insight-list", buildInsights(summary));
  renderList("action-list", buildActions(summary, filteredRows));
}

function init() {
  const report = window.REPORT_GSJ_DATA;

  if (!report) {
    console.error("Không tìm thấy dữ liệu Report GSJ");
    return;
  }

  state.report = report;
  state.selectedMonthKey = report.meta.defaultMonthKey;

  document.getElementById("month-filter").addEventListener("change", (event) => {
    state.selectedMonthKey = event.target.value;
    state.selectedWeekKey = "all";
    updateDashboard();
  });

  document.getElementById("week-filter").addEventListener("change", (event) => {
    state.selectedWeekKey = event.target.value;
    updateDashboard();
  });

  document.getElementById("language-toggle").addEventListener("click", () => {
    state.language = state.language === "vi" ? "en" : "vi";
    updateDashboard();
  });

  updateDashboard();
}

init();
