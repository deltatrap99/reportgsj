from __future__ import annotations

import json
import re
import sys
import urllib.request
import zipfile
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path
from xml.etree import ElementTree as ET

SALES_SHEET_URL = (
    "https://docs.google.com/spreadsheets/d/1s_j6nUGTpi3bCQJtyCf7llbtYvRL3W2_cPuenErY-Vg/edit?usp=sharing"
)
SALES_EXPORT_URL = (
    "https://docs.google.com/spreadsheets/d/1s_j6nUGTpi3bCQJtyCf7llbtYvRL3W2_cPuenErY-Vg/export?format=xlsx"
)
NS = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
STAGE_PATTERN = re.compile(r"^(L\d(?:\.\d(?:\.\d)?)?|C\d(?:\.\d)?)")
STATUS_ALIASES = {
    "L0.1. Trùng số": "L0.1 Trùng số",
    "L0.2. Fail không kết nối được": "L0.2 Fail không kết nối được",
    "L1.1 Sai số/ Sai đối tượng\"": "L1.1 Sai số / sai đối tượng",
    "L1.1. Sai số/ Sai đối tượng\"": "L1.1 Sai số / sai đối tượng",
    "L1.2 Không liên lạc được/ Máy bận": "L1.2 Không liên lạc được / máy bận",
    "L1.2. Không liên lạc được/ Máy bận": "L1.2 Không liên lạc được / máy bận",
    "L1.3. Lead phản hồi nhưng không quan tâm": "L1.3 Lead phản hồi nhưng không quan tâm",
    "L2 Contact đúng nhu cầu, muốn tìm hiểu": "L2 Contact đúng nhu cầu, muốn tìm hiểu",
    "L2. Contact đúng nhu cầu, muốn tìm hiểu (đã qualified)": "L2 Contact đúng nhu cầu, muốn tìm hiểu",
    "L2.1 Đúng đối tượng, có nhu cầu, nhưng chưa đồng ý tham gia trải nghiệm, tham gia lịch hẹn hướng nghiệp": "L2.1 Có nhu cầu nhưng chưa sẵn sàng hẹn lịch",
    "L2.1. Đúng đối tượng, có nhu cầu nhưng chưa sẵn sàng": "L2.1 Có nhu cầu nhưng chưa sẵn sàng hẹn lịch",
    "L2.2 Đúng đối tượng, nhưng bận, gọi lại sau": "L2.2 Đúng đối tượng nhưng bận, gọi lại sau",
    "L2.3 Không có nhu cầu": "L2.3 Không có nhu cầu",
    "L2.3 Đúng đối tượng, có nhu cầu, nhưng từ chối tư vấn": "L2.3 Có nhu cầu nhưng từ chối tư vấn",
    "L2.3. Đúng đối tượng nhưng từ chối do địa lí, không tham gia được offline": "L2.3 Từ chối do địa lý / không tham gia offline",
    "L3 Contact đồng ý tham gia trải nghiệm/ tham gia hẹn": "L3 Đồng ý tham gia trải nghiệm / lịch hẹn",
    "L3.1. Contact từ chối tham gia": "L3.1 Từ chối tham gia",
    "L4.1 Học viên được tư vấn thành công đang cân nhắc suy nghĩ": "L4.1 Đã tư vấn, đang cân nhắc",
    "L4.2. Đã tìm hiểu nhưng cần trao đổi thêm với con, gia đình": "L4.2 Cần trao đổi thêm với gia đình",
    "L4.3 Đã học thử thành công/ trải nghiệm, đã được tư vấn lộ trình, sau đó từ chối học": "L4.3 Đã trải nghiệm nhưng từ chối học",
    "L4.3. Từ chối": "L4.3 Từ chối sau tư vấn",
    "L4.3.2. Từ chối do con/gia đình không đồng ý": "L4.3.2 Từ chối do gia đình / học sinh",
    "L4.3.2. Từ chối do học phí cao": "L4.3.2 Từ chối do học phí",
    "L5 Học viên đã confirm tham gia": "L5 Đã xác nhận tham gia",
    "L5 Học viên đã thanh toán thành công": "L5 Đã thanh toán thành công",
    "L6. Thanh toán thành công": "L6 Thanh toán thành công",
    "C4. Trùng số": "C4 Trùng số",
}
SOURCE_ALIASES = {
    "mkt": "MKT",
    "seeding": "Seeding",
    "webinar": "Webinar",
    "website": "Website",
    "socialpost": "Social Post",
    "ams sự kiện": "Ams Sự kiện",
    "ams": "AMS",
    "đại sứ": "Đại sứ",
    "đại sứ hảo": "Đại sứ Hảo",
    "đại sứ lê thuý": "Đại sứ Lê Thúy",
    "founder": "Founder",
    "mgm": "MGM",
    "fa": "FA",
}


def parse_args(argv: list[str]) -> dict[str, str]:
    args: dict[str, str] = {}
    index = 0
    while index < len(argv):
        token = argv[index]
        if token == "--input" and index + 1 < len(argv):
            args["input"] = argv[index + 1]
            index += 1
        index += 1
    return args


def load_bytes(args: dict[str, str]) -> bytes:
    if "input" in args:
      return Path(args["input"]).read_bytes()
    with urllib.request.urlopen(SALES_EXPORT_URL) as response:
        return response.read()


def load_shared_strings(archive: zipfile.ZipFile) -> list[str]:
    shared: list[str] = []
    root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
    for item in root.findall("a:si", NS):
        parts = [text.text or "" for text in item.iterfind(".//a:t", NS)]
        shared.append("".join(parts))
    return shared


def read_cell_value(cell: ET.Element, shared: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    value = cell.find("a:v", NS)
    if value is None:
        inline = cell.find("a:is", NS)
        if inline is None:
            return ""
        return "".join(text.text or "" for text in inline.iterfind(".//a:t", NS))
    raw = value.text or ""
    if cell_type == "s" and raw.isdigit():
        return shared[int(raw)]
    return raw


def read_sheet_rows(archive: zipfile.ZipFile, shared: list[str], sheet_path: str) -> list[dict[str, str]]:
    root = ET.fromstring(archive.read(sheet_path))
    rows: list[dict[str, str]] = []
    for row in root.find("a:sheetData", NS).findall("a:row", NS):
        cells: dict[str, str] = {}
        for cell in row.findall("a:c", NS):
            ref = cell.attrib.get("r", "")
            column = "".join(character for character in ref if character.isalpha())
            cells[column] = read_cell_value(cell, shared)
        rows.append(cells)
    return rows


def excel_date_to_string(raw: str) -> str:
    raw = (raw or "").strip()
    if not raw:
        return ""
    try:
        serial = float(raw)
    except ValueError:
        return raw
    base = datetime(1899, 12, 30)
    return (base + timedelta(days=serial)).strftime("%d/%m/%Y")


def clean_text(value: str) -> str:
    return " ".join((value or "").replace("\t", " ").replace("\n", " ").split()).strip()


def parse_stage(status: str) -> tuple[str, str]:
    status = clean_text(status)
    if not status:
        return "UNK", "Không rõ"
    match = STAGE_PATTERN.match(status)
    if not match:
        return "UNK", "Không rõ"
    code = match.group(1)
    primary = code.split(".")[0]
    mapping = {
        "L0": "Raw / trùng / fail",
        "L1": "Không kết nối / không quan tâm",
        "L2": "Qualified / tìm hiểu",
        "L3": "Hẹn lịch / trải nghiệm",
        "L4": "Đã tư vấn / đang chờ chốt",
        "L5": "Đã xác nhận",
        "L6": "Đã thanh toán",
        "C4": "Trùng số",
    }
    return primary, mapping.get(primary, "Khác")


def normalize_status(status: str) -> str:
    status = clean_text(status)
    if not status:
        return "Không rõ"
    normalized = STATUS_ALIASES.get(status, status)
    if STAGE_PATTERN.match(normalized):
        return normalized
    return "Không rõ"


def normalize_source(source: str) -> str:
    source = clean_text(source)
    if not source:
        return "Không rõ"
    return SOURCE_ALIASES.get(source.casefold(), source)


def build_record_2025(row: dict[str, str]) -> dict[str, str] | None:
    name = clean_text(row.get("B", ""))
    phone = clean_text(row.get("D", ""))
    status = normalize_status(row.get("I", ""))
    if not name and not phone:
        return None
    stage_code, stage_group = parse_stage(status)
    return {
        "year": "2025",
        "date": excel_date_to_string(row.get("A", "")),
        "monthLabel": clean_text(row.get("N", "")),
        "contactName": name or "(Không rõ tên)",
        "phone": phone,
        "product": clean_text(row.get("G", "")) or "Không rõ",
        "source": normalize_source(row.get("H", "")),
        "owner": clean_text(row.get("J", "")) or "Chưa gán",
        "owner2": "",
        "stageCode": stage_code,
        "stageGroup": stage_group,
        "status": status,
        "note": clean_text(row.get("K", "")),
        "reason": clean_text(row.get("L", "")),
    }


def build_record_2026(row: dict[str, str]) -> dict[str, str] | None:
    name = clean_text(row.get("B", ""))
    phone = clean_text(row.get("C", ""))
    status = normalize_status(row.get("L", ""))
    if not name and not phone:
        return None
    stage_code, stage_group = parse_stage(status)
    owner1 = clean_text(row.get("H", ""))
    owner2 = clean_text(row.get("I", ""))
    if owner2.replace(".", "").isdigit():
        owner2 = ""
    return {
        "year": "2026",
        "date": excel_date_to_string(row.get("A", "")),
        "monthLabel": clean_text(row.get("P", "")),
        "contactName": name or "(Không rõ tên)",
        "phone": phone,
        "product": clean_text(row.get("F", "")) or "Không rõ",
        "source": normalize_source(row.get("G", "")),
        "owner": owner1 or "Chưa gán",
        "owner2": owner2,
        "stageCode": stage_code,
        "stageGroup": stage_group,
        "status": status,
        "note": clean_text(row.get("M", "")),
        "reason": clean_text(row.get("O", "")),
    }


def summarize_records(records: list[dict[str, str]]) -> dict[str, object]:
    stage_counts = Counter(record["stageGroup"] for record in records)
    status_counts = Counter(record["status"] for record in records if record["status"] != "Không rõ")
    owner_counts = Counter(record["owner"] for record in records if record["owner"] != "Chưa gán")
    product_counts = Counter(record["product"] for record in records if record["product"] != "Không rõ")
    source_counts = Counter(record["source"] for record in records if record["source"] != "Không rõ")
    year_counts = Counter(record["year"] for record in records)
    qualified = sum(1 for record in records if record["stageCode"].startswith("L2"))
    scheduled = sum(1 for record in records if record["stageCode"].startswith("L3"))
    nurtured = sum(1 for record in records if record["stageCode"].startswith("L4"))
    confirmed = sum(1 for record in records if record["stageCode"].startswith("L5"))
    paid = sum(1 for record in records if record["stageCode"].startswith("L6"))
    unreachable = sum(
        1 for record in records if record["stageCode"].startswith("L0") or record["stageCode"].startswith("L1")
    )
    insights = []
    if owner_counts:
        owner, count = owner_counts.most_common(1)[0]
        insights.append(f"Sale đang xử lý nhiều contact nhất là {owner} với {count} contact.")
    if status_counts:
        status, count = status_counts.most_common(1)[0]
        insights.append(f"Trạng thái xuất hiện nhiều nhất là '{status}' với {count} contact.")
    if qualified:
        insights.append(
            f"Tỷ lệ qualified trên tổng contact đang ở mức {qualified / max(len(records), 1) * 100:.1f}%."
        )
    if paid:
        insights.append(f"Có {paid} contact đã thanh toán thành công, tương đương {paid / max(len(records), 1) * 100:.1f}% tổng data.")
    actions = [
        "Tập trung review nhóm trạng thái L4 để đẩy nhanh bước chốt sale.",
        "Ưu tiên xử lý các contact đang ở L2 nhưng chưa hẹn lịch để tránh rơi lead.",
        "Theo dõi riêng nhóm L1 / L0 để làm sạch data và tối ưu nguồn contact.",
    ]
    return {
        "summary": {
            "totalContacts": len(records),
            "qualified": qualified,
            "scheduled": scheduled,
            "nurtured": nurtured,
            "confirmed": confirmed,
            "paid": paid,
            "unreachable": unreachable,
        },
        "stageCounts": [{"label": key, "value": value} for key, value in stage_counts.most_common()],
        "statusCounts": [{"label": key, "value": value} for key, value in status_counts.most_common(20)],
        "ownerCounts": [{"label": key, "value": value} for key, value in owner_counts.most_common(20)],
        "productCounts": [{"label": key, "value": value} for key, value in product_counts.most_common(20)],
        "sourceCounts": [{"label": key, "value": value} for key, value in source_counts.most_common(20)],
        "yearCounts": [{"label": key, "value": value} for key, value in year_counts.most_common()],
        "insights": insights,
        "actions": actions,
    }


def build_sales_report(workbook_bytes: bytes) -> dict[str, object]:
    from io import BytesIO

    workbook = zipfile.ZipFile(BytesIO(workbook_bytes))
    shared = load_shared_strings(workbook)
    rows_2025 = read_sheet_rows(workbook, shared, "xl/worksheets/sheet2.xml")
    rows_2026 = read_sheet_rows(workbook, shared, "xl/worksheets/sheet3.xml")
    records = []
    for row in rows_2025[1:]:
        record = build_record_2025(row)
        if record:
            records.append(record)
    for row in rows_2026[1:]:
        record = build_record_2026(row)
        if record:
            records.append(record)
    summary = summarize_records(records)
    return {
        "source": {
            "sheetUrl": SALES_SHEET_URL,
            "exportUrl": SALES_EXPORT_URL,
            "syncedAt": datetime.now().strftime("%H:%M:%S %d/%m/%Y"),
            "sourceType": "google-sheet-xlsx",
        },
        "meta": {
            "title": "Báo cáo khai thác Sale",
            "subtitle": "Theo dõi funnel, tình trạng contact, sale owner và insight từ dữ liệu CRM / telesales.",
        },
        **summary,
        "filters": {
            "years": sorted({record["year"] for record in records}),
            "months": sorted({record["monthLabel"] for record in records if record["monthLabel"]}),
            "owners": sorted({record["owner"] for record in records}),
            "products": sorted({record["product"] for record in records}),
            "sources": sorted({record["source"] for record in records}),
            "statuses": sorted({record["status"] for record in records}),
            "stages": sorted({record["stageGroup"] for record in records}),
        },
        "records": records,
    }


def main() -> None:
    args = parse_args(sys.argv[1:])
    workbook_bytes = load_bytes(args)
    report = build_sales_report(workbook_bytes)
    project_root = Path(__file__).resolve().parent.parent
    data_dir = project_root / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    (data_dir / "sales-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (data_dir / "sales-report.js").write_text(
        "window.REPORT_GSJ_SALES_DATA = " + json.dumps(report, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"Đã đồng bộ dữ liệu sale vào {data_dir}")


if __name__ == "__main__":
    main()
