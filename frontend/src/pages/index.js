// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadButton from '../components/UploadButton';
import ResultsTable from '../components/ResultsTable';

const Home = () => {
  const [file, setFile] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [jobSummary, setJobSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setShowButton(true);
  };

  const fetchSalarySummary = async () => {
    try {
      setLoading(true);

      const response = await axios.get('http://localhost:8080/api/csv/summary');
      setJobSummary(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching job summary:', error);
      setError('An error occurred while fetching job summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processFile = () => {
    setProcessing(true);
    setLoading(true);
    setShowButton(false);

    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:8080/api/csv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setEmployees(response.data);
        fetchSalarySummary();
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setLoading(false);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  useEffect(() => {
    // Fetch job summary on component mount
    fetchSalarySummary();
  }, []); 

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Job Title',
      accessor: 'jobTitle',
    },
    {
      Header: 'Salary',
      accessor: 'salary',
    },
  ];

  const jobSummaryColumns = [
    {
      Header: 'Job Title',
      accessor: '0',
    },
    {
      Header: 'Average Salary',
      accessor: '1',
    },
  ];

  return (
    <div style={{ background: 'linear-gradient(to left, #ffffff, #e0f7fa)' }}>
      <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}> <strong>Employee Dashboard</strong> </h1>
        <br></br>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <UploadButton onFileChange={handleFileChange} />
          {!processing && file && !loading && showButton && (
            <button
              onClick={processFile}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 15px',
                margin: '10px 0',
                marginLeft: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Process
            </button>
          )}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {employees.length > 0 && <ResultsTable columns={columns} data={employees} />}
        {Object.keys(jobSummary).length > 0 ? (
          <ResultsTable columns={jobSummaryColumns} data={Object.entries(jobSummary)} />
        ) : (
          !loading && !processing && !showButton && <p>No job summary data available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
