import { useRef, useState, useEffect } from 'react';
import './Home.css';
import { uploadFile } from '../../services/api';
import {  FaEnvelope } from 'react-icons/fa';
import { VscCopy } from "react-icons/vsc";

const Home = () => {
  const [file, setFile] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [result, setResult] = useState('');
  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  };

  const openMailbox = () => {
    const mailtoLink = `mailto:example@example.com?subject=File%20Download&body=${result}`;
    window.open(mailtoLink);
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        try {
          setUploadStatus('generating'); // Set status to 'generating' when upload starts

          const data = new FormData();
          data.append('name', file.name);
          data.append('file', file);

          let response = await uploadFile(data);
          setResult(response.path);

          setUploadStatus('idle'); 
        } catch (error) {
          console.error('Error uploading file:', error);
          setUploadStatus('idle'); 
        }
      }
    };

    getImage();
  }, [file]);

  return (
    <div>
      <div className="home-container">
        <div className="home-main-container">
          <h1>Simple File Sharing</h1>
          <p>Upload and share the download Link</p>

          {uploadStatus === 'generating' ? (
            <p>Generating...</p>
          ) : (
            <>
              <button onClick={() => onUploadClick()}>Upload</button>
              <input
                type="file"
                ref={fileInputRef}
                className="home_file_type"
                onChange={(e) => setFile(e.target.files[0])}
              />

              {/* Icons from react-icons */}
              {result && (
                <>
                <div className='result-div'>
                   <a href={result} className="result-link">{result}</a>
                  <VscCopy onClick={copyToClipboard} className="icon" />
                  </div>
                  <FaEnvelope onClick={openMailbox} className="icon" />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
