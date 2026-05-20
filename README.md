# Report GSJ

Report GSJ là dashboard báo cáo marketing và sales chạy bằng HTML, CSS và JavaScript thuần, đồng bộ dữ liệu từ Google Sheet, hiển thị theo tháng hoặc theo tuần, và có thể cài như PWA.

Nguồn dữ liệu hiện tại:

- Google Sheet: `https://docs.google.com/spreadsheets/d/1W3Dx9OqsDtgtpcPuuFAANu6U6N9EdrTGGatqFr584GQ/edit?gid=1858053609#gid=1858053609`

## Tính năng

- Dashboard KPI từ dữ liệu thật trong Google Sheet
- Bộ lọc theo tháng và theo tuần
- Chuyển ngôn ngữ hiển thị Việt / Anh
- Chỉ số `ROAS`, `ME/RE`, `C3`, `L0`, `L5`, `ARPU`
- Biểu đồ doanh thu và chi phí theo tháng
- Biểu đồ doanh thu và chi phí theo ngày
- Funnel chuyển đổi cho kỳ đang xem
- Insight và action sinh từ dữ liệu
- Báo cáo khai thác Sale theo funnel, trạng thái, nguồn data
- Hoat dong nhu PWA: co the cai dat va dung offline voi du lieu da dong bo

## Cấu trúc

```text
.
├── assets/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── logo-gsj-05.png
├── data/
│   ├── marketing-report.js
│   └── marketing-report.json
├── scripts/
│   ├── sync-sales-sheet.py
│   ├── prepare-share.mjs
│   └── sync-sheet.mjs
├── app.js
├── index.html
├── manifest.webmanifest
├── styles.css
├── sw.js
└── README.md
```

`dist/` là thư mục sinh ra khi đóng gói bản chia sẻ và không được track vào git.

## Cách chạy

De dung day du PWA va bo nho offline, nen chay qua local server:

```bash
python3 -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

Neu muon cai nhu app:

1. Mo dashboard bang `http://localhost:8080` hoac domain online.
2. Tren Chrome / Edge, bam `Install app`.
3. Tren iPhone / iPad, chon `Share` -> `Add to Home Screen`.

## Đồng bộ dữ liệu

Để đồng bộ dữ liệu mới nhất từ Google Sheet:

```bash
node scripts/sync-sheet.mjs
```

Project cũng đã có automation sync hằng ngày lúc `07:00` theo giờ Việt Nam.

Để đồng bộ dữ liệu khai thác sale từ workbook CRM / telesales:

```bash
python3 scripts/sync-sales-sheet.py
```

## Chia sẻ cho người khác

Để tạo bản chia sẻ tĩnh:

```bash
node scripts/prepare-share.mjs
```

Lệnh này sẽ sinh thư mục:

```text
dist/report-gsj-share
```

Anh có thể zip cả thư mục đó rồi gửi cho người khác, hoặc đưa nó lên Netlify, Vercel hay GitHub Pages để chia sẻ bằng link web. De ben nhan cai duoc nhu app, ho can mo ban chia se bang `http://localhost` hoac mot domain web, khong nen mo truc tiep bang `file://`.

## Gợi ý mở rộng

1. Thêm nút `Sync now` ngay trên dashboard.
2. Kết nối backend hoặc cron server để tự động refresh dữ liệu.
3. Bổ sung bộ lọc theo campaign, nguồn, team hoặc thị trường.
4. Thêm export PDF hoặc chế độ xem cho management.
