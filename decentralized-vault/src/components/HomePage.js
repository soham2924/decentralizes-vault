import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

    const handleStart = () => {
        history.push('/upload');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Decentralized Vault</h1>
            <button style={styles.button} onClick={handleStart}>Start</button>
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
        fontSize: '3rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#61dafb',
        color: 'black',
        transition: '0.3s',
    },
};

export default HomePage;
