/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';
import WriteLikeChatGPT from 'write-like-chat-gpt';

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
    <main className='p-4 bg-slate-800 min-h-[100vh]'>
      <nav className='w-[100%] bg-white/20 backdrop-blur-md text-white py-4 px-20'>
        <marquee direction="left" className='text-2xl font-[600] font-sans'>Dasturiy ta'minotni testlash tizimi.</marquee>
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
      {data.version && <h2 className='text-center my-4 text-2xl text-white'>Dastur versiyasi {data.version}</h2>}
      {isUploaded && data && (
        <div className='flex max-w-[80%] mx-auto text-white'>
          <div className='w-2/3'>
            <strong>kod:</strong>
            <pre className='bg-[#0B0E14] p-2 text-white'><WriteLikeChatGPT text={data.code} /></pre>
          </div>
          <div className='w-1/3 '>
            Natija:<pre className='p-2'><WriteLikeChatGPT text={data.result} /></pre>
          </div>
        </div>
      )}
    </main>
  );
};

export default UploadComponent;
