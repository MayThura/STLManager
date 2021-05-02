import './App.css';
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';
import { OrbitControls } from '@react-three/drei';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: 20px;
`;

export default function App () {
  const [ selectedFile, setSelectedFile ] = useState('');
  const [ downloadingFile, setDownloadingFile ] = useState('');
  const [ showDownload, setShowDownload ] = useState(false);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
  });

  useEffect(() => {
    if (downloadingFile !== '') {
      setShowDownload(true);
    }
  }, [downloadingFile]);

  const uploadFileChosen = (e) => {
    if (e.target.files.length > 0 ) {
      if (e.target.files[0].name.includes('.stl')) {
        const formData = new FormData();
        formData.append(
          'myFile',
          e.target.files[0]
        );
        formData.append(
          'fileName',
          e.target.files[0].name
        );
        axiosInstance.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          const uploadedFilePath = response.data;
          const tmp = uploadedFilePath.split('/');
          const fileName = tmp[tmp.length - 1];
          setSelectedFile(fileName);
        });
      }
    } 
  }

  const downloadFileChosen = (e) => {
    if (e.target.files.length > 0) {
      if (e.target.files[0].name.includes('.stl')) {
        setSelectedFile(e.target.files[0].name);
        setDownloadingFile(e.target.files[0].name);
      }
    }
  }

  const downloadClicked = (e) => {
    axios({
      url: 'http://localhost:3001/download/' + selectedFile, 
      method: 'GET',
      responseType: 'blob', 
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', selectedFile); 
       document.body.appendChild(link);
       link.click();
    });
  }

  const clearState = (e) => {
    setSelectedFile('');
    setDownloadingFile('');
    setShowDownload(false);
  }

  return (
    <div className='App'>
      <h1>Upload/ Download the STL File</h1>
      <label>Upload File : </label>
      <input type='file' placeholder='Upload file' onClick={clearState} onChange={uploadFileChosen} />
      <label>Download File : </label>
      <input type='file' placeholder='Download file' onClick={clearState} onChange={downloadFileChosen} />
      <Canvas camera={{ position: [0, 10, 100] }}>
          <Suspense fallback={null}>
            <Model url={selectedFile} />
          </Suspense>
          <OrbitControls />
      </Canvas>
      { showDownload ? <Button onClick={downloadClicked} >download</Button> : null }
    </div>
  );
}
