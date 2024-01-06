import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UploadButton = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    onFileChange(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <Button onClick={() => onFileChange(selectedFile)}></Button>}
    </div>
  );
};

export default UploadButton;
