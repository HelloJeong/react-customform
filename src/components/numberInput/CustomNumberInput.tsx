import { CSSProperties, memo, useCallback, useState } from "react";
import UpAngle from "../common/UpAngle";
import DownAngle from "../common/DownAngle";
import styled from "styled-components";

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
    <StyledCustomNumber className={className} style={style}>
      <StyledCustomNumberWrap>
        <StyledInput
          type="text"
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
        <StyledUpDown>
          <StyledUpDownButton onClick={() => updateUpDown("up")}>
            <UpAngle />
          </StyledUpDownButton>
          <StyledUpDownButton onClick={() => updateUpDown("down")}>
            <DownAngle />
          </StyledUpDownButton>
        </StyledUpDown>
      </StyledCustomNumberWrap>
    </StyledCustomNumber>
  );
};

export default memo(CustomNumberInput);

const StyledCustomNumber = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledCustomNumberWrap = styled.label`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledInput = styled.input`
  width: 90%;
  padding-left: 10px;
  height: 100%;
  outline: none;
  box-sizing: border-box;
`;

const StyledUpDown = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  right: 5%;
  font-size: 1rem;
`;

const StyledUpDownButton = styled.button`
  height: 50%;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`;
