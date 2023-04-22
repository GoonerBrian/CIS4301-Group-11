import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import QueryContent from './query-content.js';

const Query5 = () => {
    const [itemName, setItemName] = useState("");
    const [cropItemNames, setCropItemNames] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [showGraph, setShowGraph] = useState(false);
    const queryDesc = QueryContent[5].content;

    useEffect(() => {
        const loadFormOptions = async () => {
            const itemNameRes = await axios.get(`http://localhost:5000/crop-items`);
            const itemNames = itemNameRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropItemNames(itemNames);
        }
        loadFormOptions();
    }, []);

    const runQuery = async () => {
        const response = await axios.get(
            `http://localhost:5000/query5`, 
            {params: { itemName }});

        setResultData(response.data.rows);
        setShowGraph(true);
    }

    return (
        <>
        <div id="query-input-form">
            <h1>Query Description</h1>
            <p>
                {queryDesc}
            </p>
        </div>
        <div id="query-input-form">
            <h3>Enter your query parameters</h3>
            <br></br>
            <label>
                Crop Name:
                <br></br>
                <select id='query-input-dropdown'
                    value={itemName} 
                    onChange={e => setItemName(e.target.value)}>
                    {
                        cropItemNames.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <button onClick={runQuery}>Run Query</button>
        </div>
        <br></br>
        <div>
            {showGraph ? 
                <Plot 
                    data={[
                        {
                            x: resultData.map(row => row[0]),
                            y: resultData.map(row => row[1]),
                            name: 'Average  Yield',
                            type: 'bar',
                            marker: {color: 'orange'}
                        },
                        {
                            x: resultData.map(row => row[0]),
                            y: resultData.map(row => row[2]),
                            name: 'Average Production',
                            type: 'bar',
                            marker: {color: 'blue'}
                        }
                    ]}
                    layout={{
                                width: 960, 
                                height: 720, 
                                xaxis: {title: "Area Names"},
                                yaxis: {title: "Values"},
                                title: `The Average Yield and Production of ${itemName} for Lowest and Highest Yield Areas`
                            }}
                />
            : <br></br>}
        </div>
        </>
    );
}

export default Query5;
