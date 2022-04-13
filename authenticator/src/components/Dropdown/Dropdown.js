import React, { useMemo } from 'react';
import {
  DropDownLi,
  Dropbtn,
  DropDownContent,
  SubA,
} from './styles/styled-dropdown';

export const Dropdown = ({buttonTitle, dropdownItems, setItem, value}) => {

  const dropdownContent = useMemo(()=>{
    return dropdownItems.map(dropdownItem=>(
      <SubA onClick={() => setItem(dropdownItem)}>{dropdownItem}</SubA>
    ))
  },[dropdownItems])

  return (
    <DropDownLi>
      <Dropbtn value={value}>{value === '' ? buttonTitle : value}</Dropbtn>
      <DropDownContent>
        {dropdownContent}
      </DropDownContent>
    </DropDownLi>
  );
};
