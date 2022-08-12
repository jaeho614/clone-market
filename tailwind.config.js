/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ], //지정 경로에서 모든 파일의 지정 확장자 파일들 중 tailwind를 사용한 것을 찾아낸다.
  theme: {
    extend: {},
  },
  darkMode: "class", //설정이 media로 되어있으면 darkmode 설정은 환경설정을 따라간다. class로 되어있으면 darkmode는 활성화 되지 않음,
  // class인 상태에서 dark모드를 쓰려면 부모선택자에 dark를 넣어주면 된다.
  plugins: [],
};
