```jsx
import { CustomNumberInput } from "@jeongyk92/react-customform/dist/components";
import { useState } from "react";
import "./App.css";

function App() {
  const [font, setFont] = useState("24px");

  return (
    <div className="App">
      <CustomNumberInput unit="px" value={font} min={20} max={30} onUpdateValue={(v) => setFont(v)} />
      <div>font : {font}</div>
    </div>
  );
}

export default App;
```

https://blog.illunex.com/20200708-2/

https://stackoverflow.com/questions/58777217/typescript-tsc-does-not-respond-anything
