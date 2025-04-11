
# Peer Bridge

Peer Bridge is a web application designed to connect entrepreneurs and investors through a streamlined platform. The app allows users to sign up as either role, create rich profiles, and search for each other based on interests, industry, and investment criteria.

## 🌟 Features

- 🔐 **User Authentication** — Secure signup and login
- 👤 **Role-based Profiles** — Separate forms and data for investors and entrepreneurs
- 🔍 **Search & Filtering** — Browse and filter users based on keyword, role, and preferences
- 💾 **Supabase Backend** — Store user profiles, roles, and search data in real-time
- 🎨 **Modern UI** — Built with Tailwind CSS and ShadCN UI components
- ⚡ **Built with Vite** — Fast dev server and optimized build

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (Database + Auth)
- **Hosting**: Vercel (recommended)

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/nitishkrtalukdar/peer_bridge.git
cd peer_bridge
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

> Note: You need to set up Supabase and connect it via the `supabase.ts` file.

---

## 🧠 Folder Structure

```
/src
 ┣ /components       → Reusable UI elements
 ┣ /pages            → Page-level components (e.g., Search, Profile)
 ┣ /auth             → Signup/Login logic
 ┣ /lib/supabase.ts  → Supabase client setup
 ┗ App.tsx, main.tsx → Entry points
```

---

## 🧪 Deployment

You can deploy easily using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to Vercel → "Add New Project"
3. Import your GitHub repo
4. Set `npm run build` as build command, and `dist` as the output directory (if Vite is used)
5. Deploy 🚀

---

## 📄 License

This project is under the MIT License. Feel free to use and modify it.

---

## 🙌 Acknowledgements

Frontend enhanced and backend integrated by [@nitishkrtalukdar](https://github.com/nitishkrtalukdar).
```

---

Let me know if you'd like a badge section, screenshots, or a contributing guide added too!
