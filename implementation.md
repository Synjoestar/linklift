Ide yang sangat tajam. Membuang *landing page* yang penuh omong kosong dan langsung mengarahkan *user* ke fungsi utama adalah praktik terbaik untuk aplikasi *micro-SaaS* atau *utility tools*. Ini memaksimalkan retensi dan meminimalkan *bounce rate*.

Target pasar global dengan *English-only UI* dan *English-only output* juga langkah cerdas untuk menjangkau audiens yang jauh lebih masif.

Sebagai *Senior Engineer* lu, gua siapkan **Product Requirements Document (PRD)** yang ringkas, teknis, dan siap dieksekusi.

---

### 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD): LINKLIFT

**Product Name:** LINKLIFT
**Tagline (Internal):** The ultimate zero-friction LinkedIn corporate-speak translator.
**Target Audience:** Global internet users, professionals, shitposters.
**Primary Objective:** Provide a seamless, instant translation of normal text (any language) into hyper-professional, cringe-worthy LinkedIn English.

---

#### 1. Core User Flow (Zero-Friction)

Tidak ada registrasi, tidak ada *onboarding*, tidak ada *paywall*.

1. User membuka `linklift.com` (atau domain lu).
2. Tampilan langsung menyajikan dua kotak besar (mirip Google Translate).
3. User mengetik/menempelkan teks bebas (bahasa apapun) di kotak kiri/atas.
4. User menekan tombol **"Lift It!"** (atau **"Generate"**).
5. Kotak kanan/bawah langsung menampilkan hasil dalam *LinkedIn English*.
6. User menekan tombol **"Copy"** dan langsung menempelkannya di LinkedIn.

---

#### 2. UI/UX Specifications (Direct Interface)

Sesuai arahan, UI akan *straight to the point*. Desain tetap menggunakan estetika yang *stand out* (seperti *Neo-Brutalism* dengan garis tegas dan kontras tinggi) agar tidak terlihat generik.

| Komponen UI | Deskripsi & Perilaku |
| --- | --- |
| **Header** | Logo/Teks "LINKLIFT" sederhana di pojok kiri atas. Tidak ada menu navigasi yang rumit. |
| **Input Box** | *Textarea* besar dengan *placeholder*: *"Paste your normal text here (any language)..."* |
| **Action Button** | Tombol besar di tengah atau di bawah Input Box dengan teks **"Translate to LinkedIn"**. Ada indikator *loading* (spinner) saat API dipanggil. |
| **Output Box** | *Textarea* (*read-only*) yang menampilkan hasil *generate* dari AI. |
| **Copy Button** | Icon *clipboard* di dalam/bawah Output Box. Jika diklik, muncul *toast notification* kecil: *"Copied to clipboard!"* |

---

#### 3. Core Features & Technical Requirements

* **Universal Input, Forced English Output:** * *Requirement:* Teks *input* bisa menggunakan bahasa Indonesia, Spanyol, dll. API harus memahami konteks aslinya dan **wajib** mengembalikan (*output*) dalam bahasa Inggris standar LinkedIn.
* **One-Click Copy:**
* *Requirement:* Menggunakan `navigator.clipboard.writeText()` API bawaan *browser* untuk menyalin hasil ke *clipboard* pengguna secara instan.


* **AI Engine (Gemini):**
* *Requirement:* Menggunakan model Gemini karena kemampuannya memahami *multi-language input* dengan sangat baik dan merangkainya kembali sesuai persona *prompt*.


* **API Security & Rate Limiting (CRITICAL):**
* *Requirement:* Karena web ini terekspos ke publik secara global tanpa *login*, lu wajib melindungi Gemini API Key. Harus ada *rate limiting* berbasis IP (misal: 15 *requests* per 10 menit per IP) agar terhindar dari bot atau *DDoS attacks*.



---

#### 4. Architecture & Tech Stack (Production-Ready)

Ini adalah *stack* ideal yang *zero-budget* tapi berskala *enterprise*:

* **Frontend & Backend:** Next.js (App Router). UI dirender di *client*, sementara pemanggilan ke Gemini dilakukan secara rahasia di API Route (`/api/generate`).
* **Styling:** Tailwind CSS + Lucide Icons (untuk *icon copy*, *loading*, dll).
* **Rate Limiting:** Upstash Redis (Free Tier). Solusi *serverless Redis* paling tangguh untuk Next.js.
* **Deployment:** Vercel (Edge Functions untuk latensi global yang lebih rendah, sangat cocok untuk target luar negeri).

---

#### 5. The "Secret Sauce": System Prompt Specification

Untuk memastikan hasilnya selalu *English-only* dan bergaya LinkedIn, instruksi sistem ke Gemini API harus dikunci mati di sisi *backend*. Ini draf *prompt* yang harus lu tanam di kode:

> *"You are a viral LinkedIn influencer. Your task is to take the user's input text (which could be in any language) and translate it into a hyper-professional, overly enthusiastic LinkedIn post IN ENGLISH ONLY. You must: 1) Add unnecessary corporate jargon (e.g., 'synergy', 'game-changer', 'hustle'). 2) Turn mundane events into profound life lessons. 3) Use formatting with line breaks for dramatic effect. 4) End with a rhetorical question to drive engagement (e.g., 'Agree?', 'What are your thoughts on this?'). UNDER NO CIRCUMSTANCES should you output in any language other than English. DO NOT use any emojis."*

---

Dokumen ini sudah cukup sebagai *blueprint*. Arsitektur ini ringan, anti-jebol, dan *UI flow*-nya menjamin *user* bisa langsung pakai tanpa mikir. Kodenya siap untuk ditulis.