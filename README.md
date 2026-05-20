# Report GSJ

Report GSJ là dashboard báo cáo marketing chạy bằng HTML, CSS và JavaScript thuần, đồng bộ dữ liệu từ Google Sheet và hiển thị theo tháng hoặc theo tuần.

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

## Cấu trúc

```text
.
├── assets/
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
├── styles.css
└── README.md
```

`dist/` là thư mục sinh ra khi đóng gói bản chia sẻ và không được track vào git.

## Cách chạy

Mở trực tiếp [index.html](/Users/jgdelta/Documents/New%20project/index.html) bằng trình duyệt, hoặc chạy local server:

```bash
python3 -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

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

Anh có thể zip cả thư mục đó rồi gửi cho người khác, hoặc đưa nó lên Netlify, Vercel hay GitHub Pages để chia sẻ bằng link web.

## Gợi ý mở rộng

1. Thêm nút `Sync now` ngay trên dashboard.
2. Kết nối backend hoặc cron server để tự động refresh dữ liệu.
3. Bổ sung bộ lọc theo campaign, nguồn, team hoặc thị trường.
4. Thêm export PDF hoặc chế độ xem cho management.
