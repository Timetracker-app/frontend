# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

**Setup:**

```sh
npm create vite@latest frontend -- --template react

cd frontend
npm install
npm run dev
```

**Dependencies:**

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i -D daisyui@latest @tailwindcss/typography
```

**Libraries/dependencies:**

```sh
npm i react-icons@5.1.0
npm i react-router-dom@6.14.0
npm i axios@1.6.8
npm i @tanstack/react-query@5.40.0
npm i @tanstack/react-query-devtools@5.40.0
```

To consider:

```sh
npm i dayjs@1.11.9 @reduxjs/toolkit@1.9.5 react-redux@8.1.2 react-toastify@9.1.3
```

dayjs zgleda ful uporabno
