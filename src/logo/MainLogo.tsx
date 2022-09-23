import React from 'react';

function MainLogo({ width, className }: { width: number; className: string }) {
  return (
    <svg
      className={className}
      width={width.toString()}
      height="30"
      viewBox="0 0 143 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.32 0.919999V29H0.48V0.919999H7.32ZM25.8769 6.44C28.4902 6.44 30.5702 7.29333 32.1169 9C33.6902 10.68 34.4769 13 34.4769 15.96V29H27.6769V16.88C27.6769 15.3867 27.2902 14.2267 26.5169 13.4C25.7435 12.5733 24.7035 12.16 23.3969 12.16C22.0902 12.16 21.0502 12.5733 20.2769 13.4C19.5035 14.2267 19.1169 15.3867 19.1169 16.88V29H12.2769V6.68H19.1169V9.64C19.8102 8.65333 20.7435 7.88 21.9169 7.32C23.0902 6.73333 24.4102 6.44 25.8769 6.44ZM51.67 23.2V29H48.19C45.71 29 43.7767 28.4 42.39 27.2C41.0033 25.9733 40.31 23.9867 40.31 21.24V12.36H37.59V6.68H40.31V1.24H47.15V6.68H51.63V12.36H47.15V21.32C47.15 21.9867 47.31 22.4667 47.63 22.76C47.95 23.0533 48.4833 23.2 49.23 23.2H51.67ZM76.52 17.48C76.52 18.12 76.48 18.7867 76.4 19.48H60.92C61.0267 20.8667 61.4667 21.9333 62.24 22.68C63.04 23.4 64.0133 23.76 65.16 23.76C66.8667 23.76 68.0533 23.04 68.72 21.6H76C75.6267 23.0667 74.9467 24.3867 73.96 25.56C73 26.7333 71.7867 27.6533 70.32 28.32C68.8533 28.9867 67.2133 29.32 65.4 29.32C63.2133 29.32 61.2667 28.8533 59.56 27.92C57.8533 26.9867 56.52 25.6533 55.56 23.92C54.6 22.1867 54.12 20.16 54.12 17.84C54.12 15.52 54.5867 13.4933 55.52 11.76C56.48 10.0267 57.8133 8.69333 59.52 7.76C61.2267 6.82667 63.1867 6.36 65.4 6.36C67.56 6.36 69.48 6.81333 71.16 7.72C72.84 8.62667 74.1467 9.92 75.08 11.6C76.04 13.28 76.52 15.24 76.52 17.48ZM69.52 15.68C69.52 14.5067 69.12 13.5733 68.32 12.88C67.52 12.1867 66.52 11.84 65.32 11.84C64.1733 11.84 63.2 12.1733 62.4 12.84C61.6267 13.5067 61.1467 14.4533 60.96 15.68H69.52ZM86.9684 10.4C87.7684 9.17333 88.7684 8.21333 89.9684 7.52C91.1684 6.8 92.5018 6.44 93.9684 6.44V13.68H92.0884C90.3818 13.68 89.1018 14.0533 88.2484 14.8C87.3951 15.52 86.9684 16.8 86.9684 18.64V29H80.1284V6.68H86.9684V10.4ZM110.838 6.44C113.451 6.44 115.531 7.29333 117.078 9C118.651 10.68 119.438 13 119.438 15.96V29H112.638V16.88C112.638 15.3867 112.251 14.2267 111.478 13.4C110.704 12.5733 109.664 12.16 108.358 12.16C107.051 12.16 106.011 12.5733 105.238 13.4C104.464 14.2267 104.078 15.3867 104.078 16.88V29H97.2378V6.68H104.078V9.64C104.771 8.65333 105.704 7.88 106.878 7.32C108.051 6.73333 109.371 6.44 110.838 6.44ZM133.271 29.32C131.324 29.32 129.591 28.9867 128.071 28.32C126.551 27.6533 125.351 26.7467 124.471 25.6C123.591 24.4267 123.098 23.12 122.991 21.68H129.751C129.831 22.4533 130.191 23.08 130.831 23.56C131.471 24.04 132.258 24.28 133.191 24.28C134.044 24.28 134.698 24.12 135.151 23.8C135.631 23.4533 135.871 23.0133 135.871 22.48C135.871 21.84 135.538 21.3733 134.871 21.08C134.204 20.76 133.124 20.4133 131.631 20.04C130.031 19.6667 128.698 19.28 127.631 18.88C126.564 18.4533 125.644 17.8 124.871 16.92C124.098 16.0133 123.711 14.8 123.711 13.28C123.711 12 124.058 10.84 124.751 9.8C125.471 8.73333 126.511 7.89333 127.871 7.28C129.258 6.66666 130.898 6.36 132.791 6.36C135.591 6.36 137.791 7.05333 139.391 8.44C141.018 9.82667 141.951 11.6667 142.191 13.96H135.871C135.764 13.1867 135.418 12.5733 134.831 12.12C134.271 11.6667 133.524 11.44 132.591 11.44C131.791 11.44 131.178 11.6 130.751 11.92C130.324 12.2133 130.111 12.6267 130.111 13.16C130.111 13.8 130.444 14.28 131.111 14.6C131.804 14.92 132.871 15.24 134.311 15.56C135.964 15.9867 137.311 16.4133 138.351 16.84C139.391 17.24 140.298 17.9067 141.071 18.84C141.871 19.7467 142.284 20.9733 142.311 22.52C142.311 23.8267 141.938 25 141.191 26.04C140.471 27.0533 139.418 27.8533 138.031 28.44C136.671 29.0267 135.084 29.32 133.271 29.32Z"
        fill="black"
      />
    </svg>
  );
}

export default MainLogo;