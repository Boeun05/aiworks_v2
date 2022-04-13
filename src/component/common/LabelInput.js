import React from 'react';

function LabelInput({ children, fontWeight = null, style = {}, name, ...props }) {
  return (
    <>
      <label {...props}>
        <span>{name}&nbsp;</span>
        {children}
      </label>
      <style jsx>{`
        label > span {
          font-size: 14px;
          font-weight: ${fontWeight ? 'normal' : 'bold'};
        }
      `}</style>
    </>
  );
}

export default LabelInput;
