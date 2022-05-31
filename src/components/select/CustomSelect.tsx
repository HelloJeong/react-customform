import { CSSProperties, memo, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import DownAngle from "../common/DownAngle";
import UpAngle from "../common/UpAngle";

interface CustomSelectProps {
  divClassName?: string;
  ulClassName?: string;
  divStyle?: CSSProperties;
  ulStyle?: CSSProperties;
  textAlign?: "left" | "center" | "right";
  selectItem: string;
  selectList: string[];
  onSelectItem: (item: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  divStyle,
  divClassName,
  ulClassName,
  ulStyle,
  selectItem,
  selectList,
  onSelectItem,
  textAlign = "left",
}) => {
  const componentId = useRef(Math.floor(Math.random() * 100));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  const ItemListClassName = useMemo(() => {
    const className = [];
    if (ulClassName) {
      className.push(ulClassName);
    }
    if (isOpen) {
      className.push("open");
    }
    return className.join(" ");
  }, [ulClassName, isOpen]);

  return (
    <StyledSelectBox className={divClassName} style={divStyle} onClick={() => setIsOpen(true)}>
      <StyledText>
        <span style={{ textAlign }}>{selectItem}</span>
        <StyledAngle>{isOpen ? <UpAngle /> : <DownAngle />}</StyledAngle>
      </StyledText>
      <StyledItemList className={ItemListClassName} style={ulStyle}>
        {selectList.map((sel, idx) => (
          <li key={`sel_${componentId.current}_${idx}`} onClick={() => onSelectItem(sel)}>
            {sel}
          </li>
        ))}
      </StyledItemList>
    </StyledSelectBox>
  );
};

export default memo(CustomSelect);

const StyledSelectBox = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  cursor: pointer;
`;

const StyledText = styled.div`
  width: 80%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #7367f0;
  }

  span {
    width: 80%;
  }
`;

const StyledAngle = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledItemList = styled.ul`
  width: 100%;
  opacity: 0;
  height: 0;
  max-height: 200px;
  overflow-y: auto;
  top: 0;
  background-color: #fff;
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  z-index: -1;

  &.open {
    height: auto;
    top: 100%;
    opacity: 1;
    border: 1px solid #333;
    z-index: 5;
  }

  li {
    padding: 7px;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  li:hover {
    color: #7367f0;
    font-weight: 700;
  }
`;

// &::-webkit-scrollbar {
//   width: 10px;
// }
// &::-webkit-scrollbar-thumb {
//   background-color: #7367f0;
//   border-radius: 10px;
//   background-clip: padding-box;
//   border: 1px solid transparent;
// }
// &::-webkit-scrollbar-track {
//   background-color: rgba(115, 103, 240, 0.7);
//   border-radius: 10px;
//   box-shadow: inset 0px 0px 5px #fff;
// }
