import AspectRatio from "@mui/joy/AspectRatio";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  onFileUpload: (file: File) => void;
};

const AppImageUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; 
      setUploadedFile(file);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className=" cursor-pointer">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div>
            <AspectRatio ratio="16/9">
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Uploaded"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
                className=" object-contain"
              />
            </AspectRatio>
          </div>
        ) : (
          <AspectRatio ratio="21/9">
            <p className=" text-center">Drag & drop an image file here, or click to select one</p>
          </AspectRatio>
        )}
      </div>
    </div>
  );
};

export default AppImageUploader;
