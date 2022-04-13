import React, { forwardRef, useState, useEffect } from 'react';
import colors from '@/utils/colors';

function Input(
  { style = {}, placeholder, placeholderColor = colors.gray[3], color = colors.gray[0], defaultValue = '', onChange, onEnter, resetKey = null, ...props },
  ref,
) {
  const [value, setValue] = useState(defaultValue || '');
  useEffect(() => {
    setValue(defaultValue);
  }, [resetKey]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    onEnter?.(e);
  };

  return (
    <div className="input">
      <input ref={ref} {...props} style={style} placeholder={placeholder} value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
      <style jsx>{`
        .input {
          margin-bottom: 15px;
        }

        input {
          outline: #30a5ff;
          border: 1px solid #ddd;
          box-shadow: none;
          height: 30px;
          display: block;
          width: 100%;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          background-color: #fff;
          background-image: none;
          border-radius: 4px;
          transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }

        input::placeholder {
          color: ${placeholderColor};
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${colors.white} inset !important;
        }

        input[type='checkbox'] {
          position: absolute;
          margin: 2px 0 0 -20px;
          line-height: normal;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

export default forwardRef(Input);
