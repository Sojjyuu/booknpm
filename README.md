📚 ร้านหนังสือเก่าแก่ - Bookstore App (Next.js + MUI)
📖 ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็นเว็บแอปพลิเคชันร้านหนังสือเก่าแก่ที่สร้างด้วย Next.js 13+ (App Router) และ Material-UI (MUI v5) ฟีเจอร์หลักรวมถึง:

    แสดงรายการหนังสือในรูปแบบ Grid (คล้ายชั้นวางหนังสือ)
    ค้นหาหนังสือตามชื่อ, ผู้แต่ง, หรือประเภท
    ระบบล็อกอิน/สมัครสมาชิก (ใช้ localStorage สำหรับ user session)
    เพิ่ม/แก้ไข/ลบหนังสือ (เฉพาะผู้ใช้ที่ล็อกอิน)
    หน้า detail หนังสือ (link ไป /book/[id])
    UI สไตล์วินเทจ (โทนสีน้ำตาล, ฟอนต์ serif, animation)

API Backend: เชื่อมต่อกับ API ที่ http://localhost:3000/api/books (สมมติใช้ Next.js API routes หรือ backend แยก เช่น Express/Node.js) สำหรับ GET/POST/PUT/DELETE books. ต้องมี token สำหรับ authenticated actions.

สถานะ: โปรเจกต์ refactor แล้วเพื่อให้ maintainable ดีขึ้น (จาก Home.tsx เดิมที่ยาวเกิน 300 บรรทัด เหลือ ~150 บรรทัด) โดยแยกเป็น components เล็ก ๆ.
🚀 การติดตั้งและรันโปรเจกต์

    Clone/ดาวน์โหลดโปรเจกต์:

git clone <your-repo-url>

cd bookstore-app

ติดตั้ง Dependencies:

npm install

# หรือ yarn install

Dependencies หลัก:

    next@^13.0.0
    @mui/material@^5.14.0
    @mui/icons-material@^5.14.0
    @emotion/react@^11.11.0
    @emotion/styled@^11.11.0
    typescript@^5.0.0 (ถ้าใช้ TS)

ตั้งค่า Environment (ถ้าจำเป็น):

    สร้าง .env.local สำหรับ API URL (ถ้าไม่ใช่ localhost):

    NEXT_PUBLIC_API_URL=http://localhost:3000/api

รันโปรเจกต์:

npm run dev

# เปิดที่ http://localhost:3000

Build และ Production:

npm run build

    npm start

หมายเหตุ: ต้องรัน backend API ที่ localhost:3000 (หรือปรับ URL ในโค้ด) เพื่อให้ fetch books ทำงาน. ถ้าไม่มี backend ลอง mock data ใน getData() function.
📁 โครงสร้างโฟลเดอร์

bookstore-app/

├── app/                  # Next.js App Router

│   ├── globals.css       # Global styles (MUI theme ถ้ามี)

│   ├── layout.tsx        # Root layout (ต้องมี ThemeProvider สำหรับ MUI)

│   ├── page.tsx          # Home page (หลัก)

│   ├── book/             # Dynamic route สำหรับ detail หนังสือ

│   │   └── [id]/page.tsx

│   ├── login/page.tsx    # หน้า login

│   └── register/page.tsx # หน้า register

├── components/           # Components ที่ refactor (เพิ่มใหม่)

│   ├── AuthSection.tsx   # ส่วนแสดง login/register หรือ user info

│   ├── SearchBar.tsx     # ช่องค้นหาหนังสือ

│   ├── BookCard.tsx      # การ์ดหนังสือแต่ละเล่ม (รวม edit/delete buttons)

│   ├── AddBookModal.tsx  # Modal เพิ่มหนังสือใหม่

│   ├── EditBookModal.tsx # Modal แก้ไขหนังสือ

│   ├── BookList.tsx      # รายการหนังสือ (Grid + loading + empty state)

│   └── HeaderBanner.tsx  # Header banner (logo + title)

├── types/                # TypeScript types (เพิ่มใหม่ ถ้าใช้ TS)

│   ├── book.ts           # Interface สำหรับ Book และ BookResponse

│   └── user.ts           # Interface สำหรับ User

├── api/                  # Next.js API routes (ถ้ามี backend ในโปรเจกต์)

│   └── books/

│       ├── route.ts      # GET/POST books

│       └── [id]/route.ts # GET/PUT/DELETE book by ID

└── README.md             # ไฟล์นี้

🆕 สิ่งที่เพิ่ม/แก้ไขเข้าไป (Refactoring Changes)

โปรเจกต์เดิมมี Home.tsx (page.tsx) ที่ยาวมาก (~300+ บรรทัด) ทำให้ยากต่อการ maintain ผม refactor โดย:

    แยก Components: แยก logic/UI ออกเป็นไฟล์ย่อยใน components/ เพื่อให้ reusable และอ่านง่าย (Home.tsx สั้นลง 50%+)
    แก้ Error ใน Grid/BookList:
        เพิ่ม conditional rendering สำหรับ Grid (ไม่ render ถ้าไม่มีข้อมูล เพื่อป้องกัน empty map warning)
        Fallback key สำหรับ book._id (ถ้า null ใช้ index)
        Filter safety check (skip invalid books)
        แยก empty states: "กำลังโหลด...", "ยังไม่มีหนังสือ...", "ไม่พบการค้นหา..."
    ปรับปรุง UX/UI:
        เพิ่ม trim() ใน search เพื่อจัดการ space
        Default props ใน BookList (books = []) เพื่อป้องกัน undefined error
        Animation Fade ใน BookCard (ปลอดภัย ไม่ re-render บ่อย)
    เพิ่ม Types: สร้าง types/book.ts และ types/user.ts สำหรับ TypeScript (ถ้าโปรเจกต์ใช้ TS)
    Error Handling: เพิ่ม try-catch ใน API calls (ใน Home.tsx) และ console.log สำหรับ debug
    อื่น ๆ:
        ปรับ path import (เช่น "../../types/book") ให้ match โครงสร้างโฟลเดอร์
        เพิ่ม "use client"; ใน components ที่ใช้ hooks/interactive elements
        Theme สไตล์วินเทจ (สีน้ำตาล, ฟอนต์ Georgia/Times New Roman) คงเดิมแต่ optimize sx props

ตัวอย่าง Types ที่เพิ่ม (types/book.ts)

tsx17 lines

Click to expand

export interface Book {
_id: string;
...

ตัวอย่าง Types ที่เพิ่ม (types/user.ts)

tsx5 lines

Click to expand

export interface User {
username: string;
...

🔧 ฟีเจอร์และการใช้งาน

    หน้า Home (/): แสดงรายการหนังสือ, ค้นหา, เพิ่ม/แก้ไข/ลบ (ถ้าล็อกอิน)
    ล็อกอิน/สมัคร: ไปที่ /login และ /register (implement ใน pages เหล่านั้น)
    เพิ่มหนังสือ: คลิก "เพิ่มหนังสือใหม่" (modal) ส่ง POST ไป API
    แก้ไข/ลบ: คลิกปุ่มใน BookCard (PUT/DELETE ไป API ด้วย token)
    Detail: คลิกการ์ดหนังสือ ไป /book/[id] (implement dynamic route)
    Search: พิมพ์ในช่องค้นหา Filter real-time (client-side)

Authenticated Actions: ใช้ localStorage.getItem("token") สำหรับ Authorization header (Bearer ${token}).
⚠️ ข้อจำกัดและ TODO

    Backend: ต้อง implement API routes ใน /api/books (หรือเชื่อม backend แยก) สำหรับ CRUD operations
    Auth: localStorage เท่านั้น (ไม่ secure สำหรับ production) – พิจารณาใช้ NextAuth.js หรือ JWT
    Validation: เพิ่ม form validation (e.g., Yup/Zod) ใน modals
    Images: coverImage ใช้ URL จาก API (ยังไม่ upload file)
    Pagination: ถ้าหนังสือเยอะ เพิ่ม infinite scroll หรือ pagination
    Mobile Responsive: Grid ใช้ xs={12} sm={6} etc. แล้ว แต่ test บนมือถือเพิ่ม
    Error Pages: เพิ่ม 404, 500 pages ใน app/
    Testing: เพิ่ม unit tests (Jest + React Testing Library) สำหรับ components

🤝 ขอบคุณและติดต่อ

    ผู้พัฒนา: [ราชาเพลงเศร้า] (AI Assistant ช่วย refactor)
    License: MIT (กท256)
    Issues: ถ้ามี bug หรือ feature request สร้าง issue ใน repo
    Debug Tip: ถ้า error ดู console (F12) และ network tab สำหรับ API responses
