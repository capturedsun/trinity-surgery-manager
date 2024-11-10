"use client"
import React, { useState } from 'react';

import { Button } from '@/app/components/Button';

export const ModalSurgeryOrder = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">File Upload</h2>
      <div className= "border border-dashed border-1 border-grey-200 rounded-md  py-4 px-1.5 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer text-blue-500 dark:text-blue-400">
          Drag and drop or <span className="underline cursor-pointer">choose file</span> to upload
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Recommended max. size: 10 MB, Accepted file types: PDF, PNG
        </p>
      </div>
      {file && (
        <div className="mt-4 flex items-center justify-between p-2 border rounded bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
          </div>
          <button onClick={handleRemoveFile} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            X
          </button>
        </div>
      )}
      <div className="mt-4 flex justify-end space-x-2">
        <Button 
          variant="secondary"
          className="w-full"
        >
          Cancel
        </Button>
        <Button 
          variant="solid"
          className="w-full"
        >
          Upload
        </Button>
      </div>
    </>
  );
};
