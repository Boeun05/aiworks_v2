import React from 'react';

function Loading() {
  return (
    <div className="loadingContainer">
      <div className="loading dot">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        body {
          padding: 50px 0;
          background-color: #000;

        .loadingContainer {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 50%;
        }
        .loading {
          position: relative;
          width: 96px;
          height: 96px;
          margin: 0 auto;
          padding: 10px;
        }
        .dot div {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 20px;
          height: 20px;
          margin: auto;
          border-radius: 10px;
          background-color: #fff;
          transform: scale(0);
          animation: dot 1.5s linear infinite;
        }
        .dot div:nth-child(1) {
          left: -50px;
          animation-delay: -0.1s;
        }
        .dot div:nth-child(3) {
          right: -50px;
          animation-delay: 0.1s;
        }
        @keyframes dot {
          0% {
            transform: scale(0);
          }
          35% {
            transform: scale(1);
          }
          70% {
            transform: scale(0);
          }
          100% {
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;
