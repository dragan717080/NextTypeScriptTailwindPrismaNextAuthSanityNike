import React from 'react';
import { SketchPicker } from 'react-color';
import { useShirtStore }  from '@/app/store/zustandStore';

const ColorPicker = () => {
  const { color, setDynamicState } = useShirtStore();

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
        color={color}
        disableAlpha
        onChange={(color) => setDynamicState('color', color.hex) }
      />
    </div>
  )
}

export default ColorPicker;
