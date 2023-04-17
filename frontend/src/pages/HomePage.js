import {useState, useEffect} from 'react';
import axios from 'axios';
const HomePage = () => {
    const [totalTuples, setTotalTuples] = useState({tups: 0});
    useEffect (() => {
        const loadTuples = async () => {
            const response = await axios.get('http://localhost:5000/total-tuples');
            const responseValue = response.data.rows.at(0).at(0) + response.data.rows.at(0).at(1);
            
            //console.log(responseValue);
            setTotalTuples({tups : responseValue});
        }
        loadTuples();
    }, []);

    const displayTups = () => {
        alert(`The total number of Tuples in the database is ${totalTuples.tups}.`);
    }

    return (
        <>
        <h1>Welcome to the homepage for Group 11</h1>
        <p>Click on the Queries page if you would like to look up data about countries, their products, and their populations!
            Click the Tuples button to see how many tuples are in the database!
        </p>
        <h1>About our team</h1>
        <p>
            <h3>Brian Hoblin</h3>
            <p>
                Brian is a Software Technician at Lockheed Martin in his final semester at the University of Florida. Post-graduation he
                will be working as a Software Engineer at Lockheed Martin working on a DevSecOps team. Brian created the documentation 
                for this project and created the initial skeleton of the web-app to test connecting to the CISE Oracle DB. He also 
                completed the API endpoints and UI for the <i>Sanity Check</i> query and <i>crop yield per heactare for 2 countries over 
                a time interval</i> query.
            </p>
        </p>
        <button onClick={() => {
            displayTups();
        }}
        > 
            Tuples
        </button>
        </>
    );
}

export default HomePage;