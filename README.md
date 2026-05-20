# Report GSJ

Report GSJ la mot he thong bao cao marketing duoc dung bang HTML, CSS va JavaScript thuan. Nguon du lieu hien tai duoc dong bo tu Google Sheet:

`https://docs.google.com/spreadsheets/d/1W3Dx9OqsDtgtpcPuuFAANu6U6N9EdrTGGatqFr584GQ/edit?gid=1858053609#gid=1858053609`

## Tinh nang hien tai

- Dashboard KPI duoc sinh tu Google Sheet
- Bo loc theo thang cho toan bo dashboard
- Bieu do so sanh RE va ME theo thang
- Bieu do xu huong RE va ME theo ngay
- Hieu suat theo thang tu khoi `Total`
- Bang nhat ky ngay cho thang dang chon
- Funnel chuyen doi C3 -> L0 -> L5
- Insight va action duoc sinh tu du lieu
- Script sync tu Google Sheet sang `data/marketing-report.json` va `data/marketing-report.js`

## Cau truc

```text
.
├── index.html
├── styles.css
├── app.js
├── scripts/
│   └── sync-sheet.mjs
└── data/
    ├── marketing-report.js
    └── marketing-report.json
```

## Cach chay

Mo file `index.html` truc tiep trong trinh duyet.

De dong bo du lieu moi nhat tu Google Sheet:

```bash
node scripts/sync-sheet.mjs
```

Automation de sync hang ngay da duoc tao voi lich 07:00 theo gio Viet Nam.

## Chia se cho nguoi khac

De tao mot ban chia se tinh co the gui cho nguoi khac mo truc tiep:

```bash
node scripts/prepare-share.mjs
```

Sau khi chay, project se sinh thu muc:

```text
dist/report-gsj-share
```

Anh co the zip ca thu muc nay va gui cho nguoi khac. Nguoi nhan chi can giai nen va mo `index.html`.

Neu muon chia se bang link online, co the dua thu muc `dist/report-gsj-share` len Netlify, Vercel hoac GitHub Pages.

Neu muon chay bang local server:

```bash
python3 -m http.server 8080
```

Sau do truy cap `http://localhost:8080`.

## Huong mo rong de thanh he thong bao cao that

1. Bo sung backend proxy hoac cron sync de tu dong cap nhat sheet.
2. Tach rieng mapping cho tung tab hoac tung brand neu sheet mo rong.
3. Bo sung bo loc theo thang, nhom dich vu, team va nguon.
4. Them authentication, permission va lich su snapshot.
5. Xuat PDF hoac dashboard management view.

## Dinh huong UI/UX

- Giao dien chuyen nghiep, tap trung vao KPI va insight
- Mau sac phan biet ro hieu qua va rui ro
- Co the mo rong thanh executive dashboard va campaign detail view
