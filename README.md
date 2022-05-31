```jsx
import { CustomNumberInput, CustomSelect } from "@jeongyk92/react-customform/dist/components";
import { useMemo, useState } from "react";
import "./App.css";

function App() {
  const fontlist = useMemo(() => ["arial", "Roboto", "sans-serif", "serif"], []);
  const [font, setFont] = useState("arial");
  const [fontSize, setFontSize] = useState("24px");

  /**
   * @type {import("react").CSSProperties} ulStyle
   */
  const ulStyle = {
    padding: 0,
    margin: 0,
  };

  return (
    <div className="App">
      <CustomNumberInput unit="px" value={fontSize} min={20} max={30} onUpdateValue={(v) => setFontSize(v)} />
      <div>fontSize : {fontSize}</div>
      <div style={{ width: 300, height: 50 }}>
        <CustomSelect
          divStyle={{ fontFamily: font, fontSize: "0.9rem" }}
          ulStyle={ulStyle}
          selectItem={font}
          selectList={fontlist}
          onSelectItem={(sel) => setFont(sel)}
        />
      </div>
    </div>
  );
}

export default App;
```

https://blog.illunex.com/20200708-2/

https://stackoverflow.com/questions/58777217/typescript-tsc-does-not-respond-anything
