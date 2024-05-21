/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDragging) {
      setIsDragging(true);
      setIsUploading(false);
      setIsUploaded(false);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = file.name.endsWith('.py') ? 'https://klinikuz.pythonanywhere.com/py/' : 'https://klinikuz.pythonanywhere.com/php/';

    axios.post(apiUrl, formData)
      .then(response => {
        if (response.status === 200) {
          setIsUploaded(true);
          setIsUploading(false);
          setMessage('Hujjat muvaffaqiyatli yuklandi!');
          setData(response.data);
        } else {
          setIsUploading(false);
          setMessage('Hujjat yuklashda muammo!');
          console.error('Error uploading file!', response.data);
        }
      })
      .catch(error => {
        setIsUploading(false);
        setMessage('Error uploading file!');
        console.error('Error uploading file!', error);
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsUploading(true);

    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleChange = (e) => {
    setIsUploading(true);

    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <main>
      <nav className='w-[100%] bg-[#fff] py-4 px-20'>
        <marquee direction="left" className='text-2xl font-[600] font-sans'>Dasturiy ta'minotni testlash tizimi.</marquee>
        {/* <marquee  direction="left"></marquee> */}
      </nav>
      <div className={`upload ${isDragging ? "drag" : ""} ${isUploading ? "drop" : ""} ${isUploaded ? "done h-[100px]" : "h-[300px]"}`}>
        <input
          type="file"
          accept=".py,.php"
          className="drop-here"
          onDrop={handleDrop}
          onChange={handleChange}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        />
        <div className="text text-drop">Hujjatni tanlash.</div>
        <div className="text text-upload">Yuklanmoqda...</div>
        <svg className="progress-wrapper" width="300" height="300">
          <circle className="progress" r="115" cx="150" cy="150"></circle>
        </svg>
        <svg className="check-wrapper" width="130" height="100" >
          <polyline className="check" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </svg>
        <div className="shadow"></div>
      </div>
      {message && <p className="message text-center my-5">{message}</p>}
      {isUploaded && data && (
        <div className='flex max-w-[80%] mx-auto'>
          <div className='w-1/2'>
            <strong>kod:</strong>
            <pre className='bg-slate-600 p-2 text-white'>{data.code}</pre>
          </div>
          <div className='w-1/2'>
            Natija:<pre>{data.result}</pre>
          </div>
        </div>
      )}
    </main>
  );
};

export default UploadComponent;
