const number = new Intl.NumberFormat("vi-VN");

const state = {
  report: null,
  salesReport: null,
  selectedMonthKey: null,
  selectedWeekKey: "all",
  language: "vi",
  isRefreshing: false,
  refreshStatusKey: "refreshHint",
  salesFilters: {
    year: "all",
    month: "all",
    week: "all",
    owner: "all",
    stage: "all",
    status: "all",
    product: "all",
    source: "all",
  },
};

const translations = {
  vi: {
    navOverview: "Tổng quan",
    navPerformance: "Hiệu suất tháng",
    navDaily: "Nhật ký ngày",
    navSales: "Khai thác Sale",
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
    refreshData: "Cập nhật dữ liệu",
    refreshLoading: "Đang cập nhật...",
    refreshHint: "Mở bằng localhost hoặc bản deploy để cập nhật trực tiếp dữ liệu mới nhất.",
    refreshSuccess: "Đã tải dữ liệu mới nhất vào dashboard.",
    refreshFileMode: "Đang mở bằng file:// nên không thể tải lại dữ liệu trực tiếp. Hãy dùng localhost hoặc bản deploy.",
    refreshError: "Không thể cập nhật dữ liệu lúc này. Kiểm tra lại nguồn dữ liệu hoặc server.",
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
    title: "Báo cáo Marketing giúp theo dõi trực quan, nâng cao hiệu suất",
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
    salesSectionLabel: "Sales Deep Dive",
    salesTitle: "Báo cáo khai thác Sale",
    salesFilterYear: "Năm",
    salesFilterMonth: "Tháng",
    salesFilterWeek: "Tuần",
    salesFilterOwner: "Sale",
    salesFilterStage: "Funnel",
    salesFilterStatus: "Tình trạng",
    salesFilterProduct: "Sản phẩm",
    salesFilterSource: "Nguồn data",
    salesFunnelTitle: "Sales Funnel",
    salesFunnelSubtitle: "Funnel khai thác contact",
    salesStatusTitle: "Contact Status",
    salesStatusSubtitle: "Phân bổ tình trạng contact",
    salesInsightLabel: "Insights",
    salesInsightsTitle: "Insight từ dữ liệu sale",
    salesActionLabel: "Actions",
    salesActionsTitle: "Ưu tiên xử lý tiếp theo",
    salesTableLabel: "Lead Details",
    salesTableTitle: "Bảng contact chi tiết",
    salesContact: "Contact",
    salesOwnerCol: "Sale",
    salesProductCol: "Sản phẩm",
    salesStageCol: "Funnel",
    salesStatusCol: "Tình trạng",
    salesNoteCol: "Ghi chú",
    salesTotalContacts: "Tổng contact",
    salesQualified: "Qualified",
    salesScheduled: "Đã hẹn lịch",
    salesNurtured: "Đang chờ chốt",
    salesConfirmed: "Đã xác nhận",
    salesPaid: "Đã thanh toán",
    salesUnreachable: "Chưa kết nối",
    salesAllYears: "Tất cả năm",
    salesAllOwners: "Tất cả sale",
    salesAllStages: "Tất cả funnel",
    salesAllStatuses: "Tất cả tình trạng",
    salesAllProducts: "Tất cả sản phẩm",
    salesAllSources: "Tất cả nguồn data",
    salesNoData: "Không có contact phù hợp với bộ lọc hiện tại.",
    salesLevelLabel: "Level Breakdown",
    salesLevelTitle: "Biểu đồ contact theo level",
    salesAllMonths: "Tất cả tháng",
    salesAllWeeks: "Tất cả tuần",
  },
  en: {
    navOverview: "Overview",
    navPerformance: "Monthly performance",
    navDaily: "Daily log",
    navSales: "Sales pipeline",
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
    refreshData: "Refresh data",
    refreshLoading: "Refreshing...",
    refreshHint: "Open with localhost or the deployed site to fetch the latest data directly.",
    refreshSuccess: "The dashboard has loaded the latest data.",
    refreshFileMode: "The dashboard is open with file://, so it cannot fetch updated data directly. Use localhost or the deployed site.",
    refreshError: "The dashboard could not refresh data right now. Check the data source or server.",
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
    title: "Marketing reporting built for visual tracking and better performance",
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
    salesSectionLabel: "Sales Deep Dive",
    salesTitle: "Sales pipeline report",
    salesFilterYear: "Year",
    salesFilterMonth: "Month",
    salesFilterWeek: "Week",
    salesFilterOwner: "Owner",
    salesFilterStage: "Funnel",
    salesFilterStatus: "Status",
    salesFilterProduct: "Product",
    salesFilterSource: "Lead source",
    salesFunnelTitle: "Sales Funnel",
    salesFunnelSubtitle: "Contact funnel overview",
    salesStatusTitle: "Contact Status",
    salesStatusSubtitle: "Contact status distribution",
    salesInsightLabel: "Insights",
    salesInsightsTitle: "Insights from sales data",
    salesActionLabel: "Actions",
    salesActionsTitle: "Recommended next actions",
    salesTableLabel: "Lead Details",
    salesTableTitle: "Detailed contact table",
    salesContact: "Contact",
    salesOwnerCol: "Owner",
    salesProductCol: "Product",
    salesStageCol: "Funnel",
    salesStatusCol: "Status",
    salesNoteCol: "Notes",
    salesTotalContacts: "Total contacts",
    salesQualified: "Qualified",
    salesScheduled: "Scheduled",
    salesNurtured: "Nurtured",
    salesConfirmed: "Confirmed",
    salesPaid: "Paid",
    salesUnreachable: "Unreachable",
    salesAllYears: "All years",
    salesAllOwners: "All owners",
    salesAllStages: "All funnel stages",
    salesAllStatuses: "All statuses",
    salesAllProducts: "All products",
    salesAllSources: "All lead sources",
    salesNoData: "No contacts match the current filters.",
    salesLevelLabel: "Level Breakdown",
    salesLevelTitle: "Contact chart by level",
    salesAllMonths: "All months",
    salesAllWeeks: "All weeks",
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
      return formatCurrency(value);
    case "percent":
      return `${value.toFixed(1)}%`;
    default:
      return number.format(value);
  }
}

function formatCurrency(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  const amount = number.format(Math.round(value));
  return state.language === "vi" ? `${amount} đ` : `${amount} VND`;
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
      ? `${summary.periodLabel} ghi nhận doanh thu ${formatCurrency(summary.revenue)} và ROAS ${summary.roas.toFixed(2)}.`
      : `${summary.periodLabel} delivered ${formatCurrency(summary.revenue)} in revenue with ROAS ${summary.roas.toFixed(2)}.`,
    state.language === "vi"
      ? `Tỷ lệ L0/C3 đạt ${l0Rate.toFixed(1)}% với ARPU ${formatCurrency(summary.arpu)}.`
      : `L0/C3 conversion reached ${l0Rate.toFixed(1)}% with ARPU at ${formatCurrency(summary.arpu)}.`,
    state.language === "vi"
      ? `Giá C3 là ${formatCurrency(summary.c3Cost)} và giá L0 là ${formatCurrency(summary.l0Cost)}.`
      : `Cost per C3 is ${formatCurrency(summary.c3Cost)} and cost per L0 is ${formatCurrency(summary.l0Cost)}.`,
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
  renderRefreshUi();
}

function renderRefreshUi() {
  const button = document.getElementById("refresh-data");
  const status = document.getElementById("refresh-status");

  if (button) {
    button.textContent = state.isRefreshing ? t("refreshLoading") : t("refreshData");
    button.disabled = state.isRefreshing;
  }

  if (status) {
    status.textContent = t(state.refreshStatusKey);
    status.dataset.state = state.refreshStatusKey === "refreshError" ? "error" : "default";
  }
}

function setRefreshState(statusKey, isRefreshing = false) {
  state.refreshStatusKey = statusKey;
  state.isRefreshing = isRefreshing;
  renderRefreshUi();
}

async function refreshDashboardData() {
  if (state.isRefreshing) {
    return;
  }

  if (!window.location.protocol.startsWith("http")) {
    setRefreshState("refreshFileMode");
    return;
  }

  setRefreshState("refreshLoading", true);

  try {
    const nonce = `ts=${Date.now()}`;
    const [marketingResponse, salesResponse] = await Promise.all([
      fetch(`data/marketing-report.json?${nonce}`, { cache: "no-store" }),
      fetch(`data/sales-report.json?${nonce}`, { cache: "no-store" }),
    ]);

    if (!marketingResponse.ok || !salesResponse.ok) {
      throw new Error("Fetch failed");
    }

    const [report, salesReport] = await Promise.all([marketingResponse.json(), salesResponse.json()]);

    state.report = report;
    state.salesReport = salesReport;

    if (!report.availableMonths.some((month) => month.key === state.selectedMonthKey)) {
      state.selectedMonthKey = report.meta.defaultMonthKey;
      state.selectedWeekKey = "all";
    }

    updateDashboard();
    setRefreshState("refreshSuccess");
  } catch (error) {
    console.error("Khong the cap nhat du lieu", error);
    setRefreshState("refreshError");
  }
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
            <span class="metric-chip">${t("revenue")} ${formatCurrency(month.revenue)}</span>
            <span class="metric-chip">${t("kpiExpense")} ${formatCurrency(month.expense)}</span>
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
          <td>${formatCurrency(row.revenue)}</td>
          <td>${formatCurrency(row.expense)}</td>
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
  document.getElementById("sidebar-revenue").textContent = formatCurrency(summary.revenue);
  document.getElementById("sidebar-roas").textContent = summary.roas.toFixed(2);
  document.getElementById("sidebar-efficiency").textContent = `${summary.efficiency.toFixed(1)}%`;
  document.getElementById("sidebar-arpu").textContent = formatCurrency(summary.arpu);
  document.getElementById("health-score").textContent = `${health.score}/100`;
  document.getElementById("health-label").textContent = t(health.labelKey);
  document.getElementById("hero-title").textContent = t("title");
  document.getElementById("hero-copy").textContent = `${t("subtitle")} ${summary.periodLabel}.`;
  document.getElementById("source-link").href = report.source.sheetUrl;
}

function renderSalesFilterOptions(report) {
  const yearSelect = document.getElementById("sales-year-filter");
  const monthSelect = document.getElementById("sales-month-filter");
  const weekSelect = document.getElementById("sales-week-filter");
  const ownerSelect = document.getElementById("sales-owner-filter");
  const stageSelect = document.getElementById("sales-stage-filter");
  const statusSelect = document.getElementById("sales-status-filter");
  const productSelect = document.getElementById("sales-product-filter");
  const sourceSelect = document.getElementById("sales-source-filter");

  yearSelect.innerHTML = [
    `<option value="all">${t("salesAllYears")}</option>`,
    ...report.filters.years.map(
      (value) => `<option value="${value}" ${state.salesFilters.year === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  const monthOptions = [
    ...new Set(
      report.records
        .filter((record) => state.salesFilters.year === "all" || record.year === state.salesFilters.year)
        .map((record) => record.monthLabel)
        .filter(Boolean)
    ),
  ].sort((left, right) => left.localeCompare(right, "vi"));

  monthSelect.innerHTML = [
    `<option value="all">${t("salesAllMonths")}</option>`,
    ...monthOptions.map(
      (value) => `<option value="${value}" ${state.salesFilters.month === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  const weekOptions = [
    ...new Set(
      report.records
        .filter((record) => {
          if (state.salesFilters.year !== "all" && record.year !== state.salesFilters.year) {
            return false;
          }
          if (state.salesFilters.month !== "all" && record.monthLabel !== state.salesFilters.month) {
            return false;
          }
          return true;
        })
        .map((record) => {
          const day = Number((record.date || "").split("/")[0]);
          if (!day) {
            return "";
          }
          if (day <= 7) return `${t("weekLabel")} 1`;
          if (day <= 14) return `${t("weekLabel")} 2`;
          if (day <= 21) return `${t("weekLabel")} 3`;
          return `${t("weekLabel")} 4`;
        })
        .filter(Boolean)
    ),
  ];

  weekSelect.innerHTML = [
    `<option value="all">${t("salesAllWeeks")}</option>`,
    ...weekOptions.map(
      (value) => `<option value="${value}" ${state.salesFilters.week === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  ownerSelect.innerHTML = [
    `<option value="all">${t("salesAllOwners")}</option>`,
    ...report.filters.owners.map(
      (value) => `<option value="${value}" ${state.salesFilters.owner === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  stageSelect.innerHTML = [
    `<option value="all">${t("salesAllStages")}</option>`,
    ...report.filters.stages.map(
      (value) => `<option value="${value}" ${state.salesFilters.stage === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  statusSelect.innerHTML = [
    `<option value="all">${t("salesAllStatuses")}</option>`,
    ...report.filters.statuses.map(
      (value) => `<option value="${value}" ${state.salesFilters.status === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  productSelect.innerHTML = [
    `<option value="all">${t("salesAllProducts")}</option>`,
    ...report.filters.products.map(
      (value) => `<option value="${value}" ${state.salesFilters.product === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");

  sourceSelect.innerHTML = [
    `<option value="all">${t("salesAllSources")}</option>`,
    ...report.filters.sources.map(
      (value) => `<option value="${value}" ${state.salesFilters.source === value ? "selected" : ""}>${value}</option>`
    ),
  ].join("");
}

function filterSalesRecords(records) {
  return records.filter((record) => {
    if (state.salesFilters.year !== "all" && record.year !== state.salesFilters.year) {
      return false;
    }
    if (state.salesFilters.month !== "all" && record.monthLabel !== state.salesFilters.month) {
      return false;
    }
    if (state.salesFilters.week !== "all") {
      const day = Number((record.date || "").split("/")[0]);
      const weekLabel =
        day <= 7 ? `${t("weekLabel")} 1` : day <= 14 ? `${t("weekLabel")} 2` : day <= 21 ? `${t("weekLabel")} 3` : `${t("weekLabel")} 4`;
      if (weekLabel !== state.salesFilters.week) {
        return false;
      }
    }
    if (state.salesFilters.owner !== "all" && record.owner !== state.salesFilters.owner) {
      return false;
    }
    if (state.salesFilters.stage !== "all" && record.stageGroup !== state.salesFilters.stage) {
      return false;
    }
    if (state.salesFilters.status !== "all" && record.status !== state.salesFilters.status) {
      return false;
    }
    if (state.salesFilters.product !== "all" && record.product !== state.salesFilters.product) {
      return false;
    }
    if (state.salesFilters.source !== "all" && record.source !== state.salesFilters.source) {
      return false;
    }
    return true;
  });
}

function summarizeSalesRecords(records) {
  const summary = {
    totalContacts: records.length,
    qualified: 0,
    scheduled: 0,
    nurtured: 0,
    confirmed: 0,
    paid: 0,
    unreachable: 0,
  };

  for (const record of records) {
    if (record.stageCode.startsWith("L2")) {
      summary.qualified += 1;
    } else if (record.stageCode.startsWith("L3")) {
      summary.scheduled += 1;
    } else if (record.stageCode.startsWith("L4")) {
      summary.nurtured += 1;
    } else if (record.stageCode.startsWith("L5")) {
      summary.confirmed += 1;
    } else if (record.stageCode.startsWith("L6")) {
      summary.paid += 1;
    } else if (record.stageCode.startsWith("L0") || record.stageCode.startsWith("L1")) {
      summary.unreachable += 1;
    }
  }

  return summary;
}

function sortCounterEntries(counter) {
  return [...counter.entries()].sort((left, right) => right[1] - left[1]);
}

function buildSalesInsights(records, summary) {
  if (!records.length) {
    return [t("salesNoData")];
  }

  const ownerCounts = new Map();
  const statusCounts = new Map();
  const productCounts = new Map();

  for (const record of records) {
    ownerCounts.set(record.owner, (ownerCounts.get(record.owner) || 0) + 1);
    statusCounts.set(record.status, (statusCounts.get(record.status) || 0) + 1);
    productCounts.set(record.product, (productCounts.get(record.product) || 0) + 1);
  }

  const topOwner = sortCounterEntries(ownerCounts)[0];
  const topStatus = sortCounterEntries(statusCounts)[0];
  const topProduct = sortCounterEntries(productCounts)[0];
  const qualificationRate = summary.totalContacts
    ? ((summary.qualified + summary.scheduled + summary.nurtured + summary.confirmed + summary.paid) / summary.totalContacts) * 100
    : 0;

  return [
    state.language === "vi"
      ? `Sale xử lý nhiều contact nhất hiện tại là ${topOwner[0]} với ${number.format(topOwner[1])} contact.`
      : `${topOwner[0]} is handling the largest volume with ${number.format(topOwner[1])} contacts.`,
    state.language === "vi"
      ? `Trạng thái xuất hiện nhiều nhất là "${topStatus[0]}" với ${number.format(topStatus[1])} contact.`
      : `The most common status is "${topStatus[0]}" with ${number.format(topStatus[1])} contacts.`,
    state.language === "vi"
      ? `Sản phẩm nổi bật nhất theo số contact là ${topProduct[0]} với ${number.format(topProduct[1])} lead.`
      : `${topProduct[0]} is the largest product bucket with ${number.format(topProduct[1])} leads.`,
    state.language === "vi"
      ? `Tỷ lệ contact đi được tới nhóm qualified trở lên đang ở mức ${qualificationRate.toFixed(1)}%.`
      : `The share of contacts reaching qualified or beyond is currently ${qualificationRate.toFixed(1)}%.`,
  ];
}

function buildSalesActions(summary) {
  const actions = [];

  if (summary.nurtured > summary.confirmed + summary.paid) {
    actions.push(
      state.language === "vi"
        ? "Tập trung đẩy nhóm L4 đang chờ chốt sang bước confirm để tránh tồn lead lâu."
        : "Push the L4 nurture pool toward confirmation to avoid stalled leads."
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Giữ nhịp follow-up nhóm đã được tư vấn để tăng tỷ lệ thanh toán."
        : "Maintain follow-up cadence on advised contacts to improve payment conversion."
    );
  }

  if (summary.unreachable > summary.qualified) {
    actions.push(
      state.language === "vi"
        ? "Rà soát lại chất lượng nguồn data vì số contact chưa kết nối đang cao hơn nhóm qualified."
        : "Review lead-source quality because unreachable contacts currently exceed qualified contacts."
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Ưu tiên hẹn lịch nhanh cho nhóm đã qualified để tăng tỷ lệ đi tiếp vào funnel."
        : "Prioritize fast scheduling for qualified contacts to move more leads down the funnel."
    );
  }

  if (summary.paid > 0) {
    actions.push(
      state.language === "vi"
        ? "Tách riêng chân dung các contact đã thanh toán để nhân bản kịch bản sale hiệu quả."
        : "Profile the paid contacts separately to replicate the strongest sales pattern."
    );
  } else {
    actions.push(
      state.language === "vi"
        ? "Chưa có thanh toán theo bộ lọc hiện tại, cần xem lại kịch bản chốt và tiêu chí qualified."
        : "No paid contacts are visible under the current filter, so review closing scripts and qualification criteria."
    );
  }

  return actions;
}

function renderSalesKpis(summary) {
  const kpis = [
    { label: t("salesTotalContacts"), value: summary.totalContacts },
    { label: t("salesQualified"), value: summary.qualified },
    { label: t("salesScheduled"), value: summary.scheduled },
    { label: t("salesNurtured"), value: summary.nurtured },
    { label: t("salesConfirmed"), value: summary.confirmed },
    { label: t("salesPaid"), value: summary.paid },
    { label: t("salesUnreachable"), value: summary.unreachable },
  ];
  const grid = document.getElementById("sales-kpi-grid");
  grid.innerHTML = kpis
    .map(
      (kpi) => `
        <article class="kpi-card">
          <div class="kpi-label">${kpi.label}</div>
          <div class="kpi-value">${number.format(kpi.value)}</div>
        </article>
      `
    )
    .join("");
}

function renderSalesFunnel(summary) {
  renderCustomFunnel("sales-funnel", [
    { label: t("salesTotalContacts"), value: summary.totalContacts },
    { label: t("salesQualified"), value: summary.qualified },
    { label: t("salesScheduled"), value: summary.scheduled },
    { label: t("salesNurtured"), value: summary.nurtured },
    { label: t("salesConfirmed"), value: summary.confirmed },
    { label: t("salesPaid"), value: summary.paid },
  ]);
}

function renderCustomFunnel(containerId, funnel) {
  const container = document.getElementById(containerId);
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

function renderSalesStatusList(records) {
  const container = document.getElementById("sales-status-list");
  if (!records.length) {
    container.innerHTML = `<p class="empty-state">${t("salesNoData")}</p>`;
    return;
  }

  const counts = new Map();
  for (const record of records) {
    counts.set(record.status, (counts.get(record.status) || 0) + 1);
  }
  const topStatuses = sortCounterEntries(counts).slice(0, 8);
  const maxValue = Math.max(...topStatuses.map((entry) => entry[1]), 1);

  container.innerHTML = topStatuses
    .map(
      ([label, value]) => `
        <article class="sales-status-item">
          <div class="sales-status-head">
            <strong>${label}</strong>
            <span>${number.format(value)}</span>
          </div>
          <div class="sales-bar-track">
            <div class="sales-bar-fill" style="width: ${(value / maxValue) * 100}%"></div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSalesLevelChart(records) {
  const container = document.getElementById("sales-level-chart");
  if (!records.length) {
    container.innerHTML = `<p class="empty-state">${t("salesNoData")}</p>`;
    return;
  }

  const levelCounts = new Map();
  for (const record of records) {
    const key = record.stageCode || "UNK";
    levelCounts.set(key, (levelCounts.get(key) || 0) + 1);
  }
  const levels = ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "C4", "UNK"].filter((key) => levelCounts.has(key));
  const maxValue = Math.max(...levels.map((key) => levelCounts.get(key) || 0), 1);
  const width = 760;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 20 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const slotWidth = innerWidth / levels.length;

  const bars = levels
    .map((level, index) => {
      const value = levelCounts.get(level) || 0;
      const barHeight = (value / maxValue) * (innerHeight - 18);
      const x = padding.left + index * slotWidth + 10;
      const y = padding.top + innerHeight - barHeight;
      return `
        <g>
          <rect x="${x}" y="${y}" width="${slotWidth - 20}" height="${barHeight}" rx="10" fill="#0f8c6a"></rect>
          <text x="${x + (slotWidth - 20) / 2}" y="${y - 6}" text-anchor="middle" fill="#42564f" font-size="11">${number.format(value)}</text>
          <text x="${x + (slotWidth - 20) / 2}" y="${height - 12}" text-anchor="middle" fill="#597067" font-size="11">${level}</text>
        </g>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="chart-legend">
      <span><i class="legend-swatch revenue"></i>${t("salesLevelTitle")}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" aria-label="Sales level chart">
      ${bars}
    </svg>
  `;
}

function renderSalesDetailTable(records) {
  const table = document.getElementById("sales-detail-table");
  if (!records.length) {
    table.innerHTML = `<tr><td colspan="7">${t("salesNoData")}</td></tr>`;
    return;
  }

  const rows = [...records].slice(0, 40);
  table.innerHTML = rows
    .map(
      (record) => `
        <tr>
          <td>${record.date || record.year}</td>
          <td><strong>${record.contactName}</strong><br /><span class="metric-chip">${record.phone || "-"}</span></td>
          <td>${record.owner}</td>
          <td>${record.product}</td>
          <td>${record.stageGroup}</td>
          <td>${record.status}</td>
          <td>${record.note || record.reason || "-"}</td>
        </tr>
      `
    )
    .join("");
}

function updateSalesDashboard() {
  const report = state.salesReport;
  if (!report) {
    return;
  }

  renderSalesFilterOptions(report);
  const records = filterSalesRecords(report.records);
  const summary = summarizeSalesRecords(records);
  document.getElementById("sales-subtitle").textContent = `${report.meta.subtitle} ${number.format(records.length)} contact phù hợp bộ lọc hiện tại.`;
  renderSalesKpis(summary);
  renderSalesFunnel(summary);
  renderSalesStatusList(records);
  renderSalesLevelChart(records);
  renderList("sales-insights-list", buildSalesInsights(records, summary));
  renderList("sales-actions-list", buildSalesActions(summary));
  renderSalesDetailTable(records);
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
  updateSalesDashboard();
}

function init() {
  const report = window.REPORT_GSJ_DATA;
  const salesReport = window.REPORT_GSJ_SALES_DATA;

  if (!report) {
    console.error("Không tìm thấy dữ liệu Report GSJ");
    return;
  }

  state.report = report;
  state.salesReport = salesReport;
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

  document.getElementById("refresh-data").addEventListener("click", () => {
    refreshDashboardData();
  });

  const salesFilterIds = [
    ["sales-year-filter", "year"],
    ["sales-month-filter", "month"],
    ["sales-week-filter", "week"],
    ["sales-owner-filter", "owner"],
    ["sales-stage-filter", "stage"],
    ["sales-status-filter", "status"],
    ["sales-product-filter", "product"],
    ["sales-source-filter", "source"],
  ];
  for (const [id, key] of salesFilterIds) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener("change", (event) => {
        state.salesFilters[key] = event.target.value;
        if (key === "year") {
          state.salesFilters.month = "all";
          state.salesFilters.week = "all";
        }
        if (key === "month") {
          state.salesFilters.week = "all";
        }
        updateSalesDashboard();
      });
    }
  }

  updateDashboard();
}

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.error("Khong the dang ky service worker", error);
    });
  });
}

init();
