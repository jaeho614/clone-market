/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ], //지정 경로에서 모든 파일의 지정 확장자 파일들 중 tailwind를 사용한 것을 찾아낸다.
  theme: {
    extend: {},
  },
  plugins: [],
};
