
import React, { useState } from 'react';
import { ethers } from 'ethers';
import Vault from '../artifacts/contracts/DecentralizedVault.sol/DecentralizedVault.json'; // Update path as necessary

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return;

        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545'); // Connect to local Hardhat node
        const signer = provider.getSigner();
        const vaultContract = new ethers.Contract('<Your_Contract_Address>', Vault.abi, signer); // Replace with your deployed contract address

        try {
            const transaction = await vaultContract.uploadFile(file.name); // Assume uploadFile is your method in the contract
            await transaction.wait();
            setMessage('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            setMessage('File upload failed!');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Upload File to Vault</h1>
            <input type="file" onChange={handleFileChange} />
            <button style={styles.button} onClick={uploadFile}>Upload</button>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#282c34',
        color: 'white',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#61dafb',
        color: 'black',
        transition: '0.3s',
        marginTop: '10px',
    },
    message: {
        marginTop: '10px',
        color: 'lightgreen',
    },
};

export default UploadPage;
