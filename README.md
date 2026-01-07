# GlucoCheck 🩺🍬

GlucoCheck adalah aplikasi web berbasis **React + Vite** yang membantu pengguna mengecek **risiko diabetes** berdasarkan gaya hidup dan kondisi kesehatan. Aplikasi ini menyediakan **landing page informatif** serta **form multi-step** untuk pengisian data pengguna.

---

## 🚀 Fitur Utama

* 🧠 **Landing Page** modern (Header, Hero, Features, How It Works, CTA, Footer)
* 📝 **Form Multi-Step** (Personal Info, Questionnaire, Additional Info)
* 📊 **Hasil Analisis Risiko**
* ⚡ Cepat & ringan dengan **Vite**
* 🎨 Styling menggunakan **Tailwind CSS**
* 🔀 State management dengan **React Context**

---

## 🛠️ Teknologi yang Digunakan

* **React JS**
* **Vite**
* **Tailwind CSS**
* **React Router DOM**
* **Lucide React (Icons)**

---

## 📂 Struktur Folder

```
src/
├─ components/
│   └─ landing/
│       ├─ Header.jsx
│       ├─ HeroSection.jsx
│       ├─ FeaturesSection.jsx
│       ├─ HowItWorksSection.jsx
│       ├─ CTASection.jsx
│       └─ Footer.jsx
│
├─ pages/
│   ├─ LandingPage.jsx
│   ├─ PersonalInfo.jsx
│   ├─ Questionnaire.jsx
│   ├─ Additional.jsx
│   └─ Results.jsx
│
├─ context/
│   └─ FormContext.jsx
│
├─ App.jsx
└─ main.jsx
```

---

## ▶️ Cara Menjalankan Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/gluco-check.git
cd gluco-check
```

### 2️⃣ Install Dependency

```bash
npm install
```

### 3️⃣ Jalankan Development Server

```bash
npm run dev
```

Akses di browser:

```
http://localhost:5173
```

---

## 📌 Catatan Penting

* Project **tidak menggunakan shadcn/ui**
* Semua tombol menggunakan **HTML `<button>` biasa + Tailwind**
* Import menggunakan **relative path**, bukan alias `@/`

---

## 📷 Preview (Optional)

Tambahkan screenshot landing page atau form di sini jika diperlukan.

---

## 👨‍💻 Developer

**Muhammad Fazrin Nugraha dan Lovable **


---

## 📄 Lisensi

Project ini dibuat untuk **keperluan pembelajaran dan tugas akademik**.
