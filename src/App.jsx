import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [message, setMessage] = useState('');
  const [data , setData] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsUploading(false);
    setIsUploaded(false);
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
          // setMessage('Dosya başarıyla yüklendi!');
          setData(response.data);
        } else {
          setIsUploading(false);
          setMessage('Fayl muvaffaqiyatli yuklandi!');
          console.error('Dosya yüklenirken bir hata oluştu!', response.data);
        }
      })
      .catch(error => {
        setIsUploading(false);
        setMessage('Dosya yüklenirken bir hata oluştu!');
        console.error('Dosya yüklenirken bir hata oluştu!', error);
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
        <h2 className='text-2xl font-semibold font-[700]'>compler.uz</h2>
      </nav>
      <div className={`upload ${isDragging ? "drag" : ""} ${isUploading ? "drop" : ""} ${isUploaded ? "done" : ""}`}>
        <input type="file" accept=".py,.php" className="drop-here" onDrop={handleDrop} onChange={handleChange} onDragOver={handleDragOver} onDragLeave={handleDragLeave} />
        <div className="text text-drop">Faylni tanlang</div>
        <div className="text text-upload">Yuklanmoqda</div>
        <svg className="progress-wrapper" width="300" height="300">
          <circle className="progress" r="115" cx="150" cy="150"></circle>
        </svg>
        <svg className="check-wrapper" width="130" height="130">
          <polyline className="check" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </svg>
        <div className="shadow"></div>
      </div>
        <ul>
          <li>{message && <div className="message">{message}</div>}</li>
        </ul>
    </main>
  );
};

export default UploadComponent;
