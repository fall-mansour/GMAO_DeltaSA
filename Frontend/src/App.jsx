import AccueilBackOffice from "./Pages/AccueilBackOffice";

const globalStyle = document.createElement("style");
globalStyle.innerHTML = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { width: 100%; min-height: 100vh; }
`;
document.head.appendChild(globalStyle);

function App() {
  return (
    <>
      <AccueilBackOffice />
    </>
  );
}

export default App;