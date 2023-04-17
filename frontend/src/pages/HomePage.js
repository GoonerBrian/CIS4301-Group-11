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
        <h1>About our data set</h1>
        <p>
            Our data set was found on <a href='https://www.kaggle.com/datasets/raghavramasamy/crop-statistics-fao-all-countries'>kaggle.com </a> 
            and it consists of agricultural and population data for all "countries of the world and geographical aggregates according to the 
            United Nations M-49 list". The data set spans from 1962 to 2018 and is formatted annually.
        </p>
        <br></br>
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