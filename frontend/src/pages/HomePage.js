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
        <h1>Welcome to the homepage for Group 11 (This will be the the "About Us" area too)</h1>
        <p>Click on the Queries page if you would like to look up data about countries, their products, and their populations!
            Click on the My Profile page to see the quieris you have made!
            Click the Tuples button to see how many tuples are in the database!
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