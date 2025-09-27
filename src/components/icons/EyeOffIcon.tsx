import React from 'react';

interface EyeOffIconProps {
  size?: number;
  color?: string;
}

const EyeOffIcon: React.FC<EyeOffIconProps> = ({
  size = 22,
  color = '#888',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 11C3 6 7.5 3 11 3C14.5 3 19 6 21 11C19 16 14.5 19 11 19C7.5 19 3 16 1 11Z"
      stroke={color}
      strokeWidth="2"
    />
    <circle cx="11" cy="11" r="3" stroke={color} strokeWidth="2" />
    <line x1="5" y1="17" x2="17" y2="5" stroke={color} strokeWidth="2" />
  </svg>
);

export default EyeOffIcon;
