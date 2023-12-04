import React from 'react'
import { useShirtStore } from '@/app/store/zustandStore';
import { getContrastingColor } from '@/app/config/helpers';
import CustomButtonProps from '@/app/interfaces/props/CustomButtonProps';

const CustomButton = ({ type, title, customStyles, handleClick }: CustomButtonProps) => {
  const { color } = useShirtStore();

  const generateStyle = (type: string) => {
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
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton;
