import { useState } from "react";
import "./App.css";
import CustomNumberInput from "./components/customNumberInput/CustomNumberInput";

function App() {
  const [customFontSize, setCustomFontSize] = useState("24px");
  return (
    <div className="App" style={{ width: 300, height: 50 }}>
      <CustomNumberInput
        value={customFontSize}
        unit="px"
        min={24}
        max={60}
        onUpdateValue={(val) => setCustomFontSize(`${val}px`)}
      />
      <div>FontSize : {customFontSize}</div>
    </div>
  );
}

export default App;
