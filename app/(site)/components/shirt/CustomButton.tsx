import React from 'react'
import { useShirtStore } from '@/app/store/zustandStore';
import { getContrastingColor } from '@/app/config/helpers';
import Link from 'next/link';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const { color } = useShirtStore();

  const generateStyle = (type) => {
    if (type === 'filled') {
      return {
        backgroundColor: color,
        color: getContrastingColor(color)
      }
    }
    else if (type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: color,
        color: color
      }
    }
  }

  return (
    <Link href="/">
      <button
        className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
        style={generateStyle(type)}
        onClick={handleClick}
      >
        {title}
      </button>
    </Link>
  )
}

export default CustomButton