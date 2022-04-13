import React, { useState, useEffect } from 'react';
import colors from '@/utils/colors';

const findItem = (value, items) => items?.find((item) => item.code === value) || null;

const themes = {
  LARGE: { fontSize: 16, height: 52, iconSize: 28, top: 44 },
  SMALL: { fontSize: 14, height: 42, iconSize: 20, top: 34 },
};

function Select({ style = {}, defaultText, defaultValue, options, name, size = 'LARGE', onChange, ...props }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [item, setItem] = useState(findItem(defaultValue, options || []));

  const handleSelect = (option) => {
    setItem(option);
    if (onChange) onChange(name, option.code);
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    if (!options) return;
    const item = findItem(defaultValue, options || []);
    item && handleSelect(item);
  }, [options]);

  return (
    <div className="select" {...props} style={style} name={name} onClick={handleDropdown}>
      <div>{item ? item.code_name : defaultText}</div>
      {openDropdown && (
        <ul size={size}>
          {options.map((option, i) => (
            <li key={i} onClick={(e) => handleSelect(option)}>
              {option.code_name}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .select {
          position: relative;
          background: ${colors.primary[3]};
          margin-bottom: 40px;
          height: ${themes[size].height}px;
        }

        .select ul {
          margin: 0;
          padding: 10px 0;
          width: 100%;
          background: ${colors.primary[4]};
          list-style: none;
          position: absolute;
          top: ${themes[size].top}px;
          z-index: 5;
        }
      `}</style>
    </div>
  );
}

export default Select;
