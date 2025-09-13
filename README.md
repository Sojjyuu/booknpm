# Book Store Application

โปรเจกต์นี้เป็นเว็บแอปพลิเคชันสำหรับแสดงรายการหนังสือและรายละเอียดหนังสือแต่ละเล่ม โดยใช้ Next.js ร่วมกับ React และ Material-UI (MUI) ในการสร้าง UI ที่สวยงามและตอบสนองได้ดี

---

## โครงสร้างและฟีเจอร์หลัก

### 1. หน้าแสดงรายการหนังสือ (Home Page)

- ดึงข้อมูลหนังสือทั้งหมดจาก API (`GET /api/books`)
- แสดงหนังสือในรูปแบบการ์ด (Card) พร้อมรูปปกหนังสือ ชื่อหนังสือ และชื่อผู้แต่ง
- การ์ดแต่ละใบมีปุ่ม "ดูรายละเอียด" เพื่อนำไปยังหน้ารายละเอียดหนังสือ
- รองรับสถานะโหลดข้อมูล (Loading Spinner)
- รองรับกรณีไม่มีรูปปกหนังสือ แสดงข้อความแจ้งเตือนแทน
- เอฟเฟกต์ hover เพิ่มความน่าสนใจให้กับการ์ดและรูปปก
- แสดงคะแนนรีวิว (rating) ถ้ามีข้อมูล

### 2. หน้าแสดงรายละเอียดหนังสือ (Book Detail Page)

- ดึงข้อมูลหนังสือแต่ละเล่มจาก API (`GET /api/books/:id`)
- แสดงข้อมูลหนังสือครบถ้วน เช่น
  - รูปปกหนังสือขนาดใหญ่
  - ชื่อหนังสือ, ผู้แต่ง, สำนักพิมพ์, ปีที่พิมพ์
  - รายละเอียดหนังสือ (description)
  - คะแนนรีวิวและจำนวนรีวิว (ถ้ามี)
  - แกลเลอรีรูปภาพประกอบ (galleryImages) ที่เกี่ยวข้องกับหนังสือ
- ปุ่ม "ซื้อหนังสือ" (สมมติ) และปุ่ม "กลับไปหน้ารายการ"
- รองรับสถานะโหลดข้อมูล และกรณีไม่พบข้อมูลหนังสือ

---

## เทคโนโลยีที่ใช้

- **Next.js** — Framework สำหรับ React ที่รองรับ SSR และ Routing
- **React** — สร้าง UI แบบ component-based
- **Material-UI (MUI)** — ไลบรารี UI สำหรับ React ที่มี component สวยงามและใช้งานง่าย
- **TypeScript** — เพิ่มความปลอดภัยของโค้ดด้วยการกำหนดชนิดข้อมูล
- **Fetch API** — ดึงข้อมูลจาก backend API

---

## การติดตั้งและใช้งาน

1. **ติดตั้ง dependencies**

```bash
npm install
# หรือ
yarn install

2. **ติดตั้ง dependencies**

ตั้งค่า API
โปรเจกต์นี้สมมติว่า API รันอยู่ที่ http://localhost:3000/api/books
API ควรมี endpoint ดังนี้:
GET /api/books — คืนข้อมูลหนังสือทั้งหมดในรูปแบบ JSON
GET /api/books/:id — คืนข้อมูลหนังสือแต่ละเล่มตาม id

3.รันโปรเจกต์
npm run dev
# หรือ
yarn dev

4.เปิดเว็บเบราว์เซอร์
ไปที่ http://localhost:3000 เพื่อดูรายการหนังสือ

โครงสร้างไฟล์สำคัญ
app/page.tsx หรือ pages/index.tsx — หน้าแสดงรายการหนังสือ (Home)
app/book/[id]/page.tsx หรือ pages/book/[id].tsx — หน้าแสดงรายละเอียดหนังสือ
types/book.ts — กำหนด TypeScript interface สำหรับข้อมูลหนังสือ
components/ — (ถ้ามี) รวม component ย่อยต่าง ๆ

export interface Book {
  _id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  description: string;
  coverImage?: string;
  galleryImages?: string[];
  rating?: number;
  reviewsCount?: number;
}