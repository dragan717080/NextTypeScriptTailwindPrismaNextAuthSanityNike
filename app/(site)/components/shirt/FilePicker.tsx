import React from 'react';
import CustomButton from './CustomButton';
import FilePickerProps from '@/app/interfaces/props/FilePickerProps';

const FilePicker = ({ file, setFile, readFile }: FilePickerProps) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input 
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile((e.target.files as FileList)[0] as unknown as string)}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : (file as File).name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton 
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        />
        <CustomButton 
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker;
