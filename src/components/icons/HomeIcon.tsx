import React from 'react';

const HomeIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = '#fff',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.2" />
    <path
      d="M10 18V13.5L16 9L22 13.5V18C22 18.8284 21.3284 19.5 20.5 19.5H11.5C10.6716 19.5 10 18.8284 10 18Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="13" y="15" width="6" height="6" rx="1" fill={color} />
  </svg>
);

export default HomeIcon;
