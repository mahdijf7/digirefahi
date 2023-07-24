import React, { useState, useRef, useEffect } from 'react';

function useImage(uploadData, dataName, userId) {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState('');
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef('');

  const fileHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };
  const uploadFileHandler = async () => {
    const fd = new FormData();
    fd.append(dataName, image);
    if (image) {
      uploadData(fd);
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
      setOpen(true);
    } else {
      setPreview(null);
    }
  }, [image, preview]);

  return {
    image,
    setImage,
    fileHandler,
    uploadFileHandler,
    fileInputRef,
    open,
    setOpen,
    preview,
    setPreview,
  };
}

export default useImage;
