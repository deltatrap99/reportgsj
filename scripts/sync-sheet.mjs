import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1W3Dx9OqsDtgtpcPuuFAANu6U6N9EdrTGGatqFr584GQ/edit?gid=1858053609#gid=1858053609";
const EXPORT_URL =
  "https://docs.google.com/spreadsheets/d/1W3Dx9OqsDtgtpcPuuFAANu6U6N9EdrTGGatqFr584GQ/export?format=csv&gid=1858053609";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "data");

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--input") {
      args.input = argv[index + 1];
      index += 1;
    }
  }

  return args;
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          resolve(fetchText(response.headers.location));
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Tai du lieu that bai: HTTP ${response.statusCode}`));
          return;
        }

        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  if (rows.length > 0 && rows[0].length > 0) {
    rows[0][0] = rows[0][0].replace(/^\uFEFF/, "");
  }

  return rows;
}

function parseNumber(rawValue) {
  if (!rawValue) {
    return 0;
  }

  const value = String(rawValue).trim();
  if (!value || value === "#N/A") {
    return 0;
  }

  const normalized = value.replace(/"/g, "").replace(/\./g, "").replace(/,/g, ".");
  return Number(normalized.replace(/%$/, "")) || 0;
}

function percentChange(current, previous) {
  if (!previous) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

function getMetricRow(rows, startIndex, label) {
  const endIndex = Math.min(rows.length, startIndex + 30);
  for (let index = startIndex; index < endIndex; index += 1) {
    if ((rows[index][0] || "").trim() === label) {
      return rows[index];
    }
  }

  throw new Error(`Khong tim thay dong metric: ${label}`);
}

function buildInsights(current, previous) {
  const insights = [];
  const revenueChange = percentChange(current.revenue, previous?.revenue || 0);
  const l0Rate = current.c3 > 0 ? (current.l0 / current.c3) * 100 : 0;

  insights.push(
    `Thang ${current.shortLabel} ghi nhan RE ${formatCurrency(current.revenue)} va ME/RE ${current.efficiency.toFixed(1)}%.`
  );

  if (revenueChange !== null) {
    insights.push(
      `Doanh thu thay doi ${revenueChange > 0 ? "tang" : "giam"} ${Math.abs(revenueChange).toFixed(1)}% so voi ky truoc.`
    );
  }

  insights.push(`Ty le chuyen doi L0/C3 hien tai dat ${l0Rate.toFixed(1)}%.`);
  insights.push(`Gia C3 dang o muc ${formatCurrency(current.c3Cost)} va ARPU dat ${formatCurrency(current.arpu)}.`);

  return insights;
}

function buildActions(current, previous) {
  const actions = [];
  const revenueChange = percentChange(current.revenue, previous?.revenue || 0);
  const c3CostChange = percentChange(current.c3Cost, previous?.c3Cost || 0);
  const l0Rate = current.c3 > 0 ? (current.l0 / current.c3) * 100 : 0;

  if (current.efficiency > 20) {
    actions.push("Ra soat chi phi marketing va tach nhom nguon dang co ME/RE vuot 20%.");
  } else {
    actions.push("Duy tri muc chi phi hien tai va uu tien ngan sach cho nhom co doanh thu on dinh.");
  }

  if (c3CostChange !== null && c3CostChange > 15) {
    actions.push("Gia C3 tang manh so voi ky truoc, can kiem tra creative va chat luong landing page.");
  } else {
    actions.push("Gia C3 dang trong tam kiem soat, co the tiep tuc scale nhom hieu qua.");
  }

  if (l0Rate < 85) {
    actions.push("Ty le L0/C3 chua tot, can xem lai quy trinh loc lead va thong diep chot tu van.");
  } else {
    actions.push("Ty le L0/C3 tot, nen uu tien day them volume cho nhom chuyen doi cao.");
  }

  if (revenueChange !== null && revenueChange < 0) {
    actions.push("Doanh thu thang hien tai dang giam, can review cac ngay chi phi cao nhung RE bang 0.");
  } else {
    actions.push("Doanh thu dang giu nhip tot, tiep tuc theo doi nhom ngay co RE cao de nhan ban.");
  }

  return actions;
}

function buildHealth(current, previous) {
  let score = 100;

  if (current.efficiency > 20) {
    score -= 18;
  } else if (current.efficiency > 12) {
    score -= 10;
  }

  const l0Rate = current.c3 > 0 ? (current.l0 / current.c3) * 100 : 0;
  if (l0Rate < 75) {
    score -= 12;
  } else if (l0Rate < 85) {
    score -= 6;
  }

  if (previous && current.c3Cost > previous.c3Cost * 1.15) {
    score -= 8;
  }

  const finalScore = Math.max(45, Math.min(98, Math.round(score)));
  const label = finalScore >= 85 ? "Strong" : finalScore >= 70 ? "Stable" : "Watch";

  return { score: finalScore, label };
}

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function getMonthName(monthKey) {
  return `Thang ${monthKey}`;
}

function buildReport(rows) {
  const totalIndex = rows.findIndex((row) => (row[0] || "").trim() === "Total");
  if (totalIndex === -1) {
    throw new Error("Khong tim thay khoi Total trong Google Sheet");
  }

  const monthlyStartRow = rows[0];
  const monthlyEndRow = rows[1];
  const dailyDateRow = rows[2];

  const revenueRow = getMetricRow(rows, totalIndex + 1, "RE");
  const expenseRow = getMetricRow(rows, totalIndex + 1, "ME");
  const efficiencyRow = getMetricRow(rows, totalIndex + 1, "ME/RE");
  const c3Row = getMetricRow(rows, totalIndex + 1, "C3");
  const l0Row = getMetricRow(rows, totalIndex + 1, "L0");
  const l5Row = getMetricRow(rows, totalIndex + 1, "L5 Lũy kế");
  const c3CostRow = getMetricRow(rows, totalIndex + 1, "Giá C3");
  const l0CostRow = getMetricRow(rows, totalIndex + 1, "Giá L0");
  const arpuRow = getMetricRow(rows, totalIndex + 1, "ARPU");

  const monthlyPerformance = [];

  for (let column = 1; column <= 12; column += 1) {
    const revenue = parseNumber(revenueRow[column]);
    const expense = parseNumber(expenseRow[column]);
    const c3 = parseNumber(c3Row[column]);
    const l0 = parseNumber(l0Row[column]);
    const l5 = parseNumber(l5Row[column]);

    if (revenue === 0 && expense === 0 && c3 === 0 && l0 === 0 && l5 === 0) {
      continue;
    }

    monthlyPerformance.push({
      label: `${monthlyStartRow[column]} - ${monthlyEndRow[column]}`,
      shortLabel: monthlyStartRow[column].slice(3),
      revenue,
      expense,
      efficiency: parseNumber(efficiencyRow[column]),
      c3,
      l0,
      l5,
      c3Cost: parseNumber(c3CostRow[column]),
      l0Cost: parseNumber(l0CostRow[column]),
      arpu: parseNumber(arpuRow[column]),
    });
  }

  const dailyByMonth = {};

  for (let column = 13; column < dailyDateRow.length; column += 1) {
    const dateLabel = dailyDateRow[column];
    if (!dateLabel || !dateLabel.includes("/")) {
      continue;
    }

    const monthKey = dateLabel.split("/")[1];

    const revenue = parseNumber(revenueRow[column]);
    const expense = parseNumber(expenseRow[column]);
    const c3 = parseNumber(c3Row[column]);
    const l0 = parseNumber(l0Row[column]);
    const l5 = parseNumber(l5Row[column]);

    if (revenue === 0 && expense === 0 && c3 === 0 && l0 === 0 && l5 === 0) {
      continue;
    }

    if (!dailyByMonth[monthKey]) {
      dailyByMonth[monthKey] = [];
    }

    dailyByMonth[monthKey].push({
      date: dateLabel,
      revenue,
      expense,
      c3,
      l0,
      l5,
    });
  }

  const current = monthlyPerformance[monthlyPerformance.length - 1];
  const previous = monthlyPerformance[monthlyPerformance.length - 2] || null;
  const activeMonthKey = current.shortLabel;
  const recentDaily = (dailyByMonth[activeMonthKey] || []).slice(-7).reverse();
  const health = buildHealth(current, previous);

  return {
    source: {
      sheetUrl: SHEET_URL,
      exportUrl: EXPORT_URL,
      syncedAt: new Date().toLocaleString("vi-VN"),
      sourceType: "google-sheet-csv",
    },
    meta: {
      title: "Bao cao Marketing giup theo doi truc quan, nang cao hieu suat",
      subtitle:
        "Dashboard nay doc khoi Total trong sheet va chuan hoa thanh KPI thang, funnel va nhat ky ngay.",
      activePeriod: current.label,
      defaultMonthKey: activeMonthKey,
    },
    summary: {
      revenue: current.revenue,
      expense: current.expense,
      efficiency: current.efficiency,
      arpu: current.arpu,
    },
    health,
    kpis: [
      {
        label: "Revenue",
        value: current.revenue,
        type: "currency",
        change: percentChange(current.revenue, previous?.revenue || 0),
        changeType: "percent",
      },
      {
        label: "Marketing Expense",
        value: current.expense,
        type: "currency",
        change: percentChange(current.expense, previous?.expense || 0),
        changeType: "percent",
      },
      {
        label: "ME/RE",
        value: current.efficiency,
        type: "percent",
        change: current.efficiency - (previous?.efficiency || 0),
        changeType: "percent",
      },
      {
        label: "C3",
        value: current.c3,
        type: "number",
        change: percentChange(current.c3, previous?.c3 || 0),
        changeType: "percent",
      },
      {
        label: "L0",
        value: current.l0,
        type: "number",
        change: percentChange(current.l0, previous?.l0 || 0),
        changeType: "percent",
      },
      {
        label: "L5 Luy Ke",
        value: current.l5,
        type: "number",
        change: percentChange(current.l5, previous?.l5 || 0),
        changeType: "percent",
      },
    ],
    monthlyPerformance,
    availableMonths: monthlyPerformance.map((month) => ({
      key: month.shortLabel,
      label: getMonthName(month.shortLabel),
      period: month.label,
    })),
    dailyByMonth,
    currentFunnel: [
      { label: "C3", value: current.c3 },
      { label: "L0", value: current.l0 },
      { label: "L5", value: current.l5 },
    ],
    recentDaily,
    insights: buildInsights(current, previous),
    actions: buildActions(current, previous),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const csvText = args.input ? await fs.readFile(args.input, "utf8") : await fetchText(EXPORT_URL);
  const rows = parseCsv(csvText);
  const report = buildReport(rows);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
    path.join(outputDir, "marketing-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(
    path.join(outputDir, "marketing-report.js"),
    `window.REPORT_GSJ_DATA = ${JSON.stringify(report, null, 2)};\n`,
    "utf8"
  );

  console.log(`Da dong bo du lieu tu Google Sheet vao ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
