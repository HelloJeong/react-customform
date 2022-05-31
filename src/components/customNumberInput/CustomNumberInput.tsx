import "./CustomNumberInput.scss";
import classNames from "classnames";
import { CSSProperties, memo, useCallback, useState } from "react";
import UpAngle from "../common/UpAngle";
import DownAngle from "../common/DownAngle";

interface CustomNumberInputProps {
  value: string;
  unit: "%" | "px";
  min?: number;
  max?: number;
  step?: number;

  className?: string;
  style?: CSSProperties;

  onUpdateValue: (val: string | number) => void;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  className,
  style,
  unit,
  min = 0,
  max = 99,
  step = 1,
  value,
  onUpdateValue,
}) => {
  const [inputValue, setInputValue] = useState<string>(() => value);

  type updateUpDownType = (type: "up" | "down") => void;
  const updateUpDown = useCallback<updateUpDownType>(
    (type) => {
      const val = +inputValue.split(unit)[0];
      let updateTargetValue = inputValue;
      if (type === "up" && val < max) {
        updateTargetValue = `${val + step}`;
      } else if (type === "down" && val > min) {
        updateTargetValue = `${val - step}`;
      } else {
        updateTargetValue = `${val}`;
      }
      setInputValue(`${updateTargetValue}${unit}`);
      onUpdateValue(updateTargetValue);
    },
    [inputValue, min, max, step, onUpdateValue, unit]
  );

  return (
    <div className={classNames("CustomNumber", className)} style={style}>
      <label className="CustomNumber__Wrap">
        <input
          type="text"
          className="CustomNumber__Input"
          value={inputValue}
          onFocus={(e) => setInputValue(e.target.value.split(unit)[0])}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault();
              let updateTargetValue = +inputValue;
              if (e.key === "ArrowUp") {
                updateTargetValue = updateTargetValue < max ? updateTargetValue + step : updateTargetValue;
              } else {
                updateTargetValue = updateTargetValue > min ? updateTargetValue - step : updateTargetValue;
              }
              setInputValue(`${updateTargetValue}`);

              onUpdateValue(`${updateTargetValue}`);
            }
          }}
          onChange={(e) => {
            setInputValue(`${e.target.value}`);
            onUpdateValue(`${e.target.value}`);
          }}
          onBlur={() => {
            let val: string | number;
            if (Number.isInteger(+inputValue)) {
              val = +inputValue;
              if (val < min) {
                val = min;
              } else if (val > max) {
                val = max;
              }
            } else {
              val = min;
            }
            setInputValue(`${val}${unit}`);
            onUpdateValue(`${val}`);
          }}
        />
        <div className="CustomNumber__UpDown">
          <button className="CustomNumber__Up" onClick={() => updateUpDown("up")}>
            <UpAngle />
          </button>
          <button className="CustomNumber__Down" onClick={() => updateUpDown("down")}>
            <DownAngle />
          </button>
        </div>
      </label>
    </div>
  );
};

export default memo(CustomNumberInput);
