import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import QueryContent from './query-content.js';

const Query4 = () => {
    const [cropAreaNames, setCropAreaNames] = useState([]);
    const [cropItemNames, setCropItemNames] = useState([]);
    const [cropName, setCropName] = useState([]);
    const [yearRange, setYearRange] = useState([]);
    const [value, setValue] = useState([]);
    const [areaValue, setAreaValue] = useState([]);
    const [area, setArea] = useState("");
    const [itemName, setItemName] = useState("");
    const [showGrpah, setShowGraph] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(50);
    const queryId = 'query4';
    const queryDesc = QueryContent[4].content;

    useEffect(() => {
        const loadFormOptions = async () => {
            const areaNameRes = await axios.get(`http://localhost:5000/crop-area-names`);
            const areaNames = areaNameRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropAreaNames(areaNames);

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
            `http://localhost:5000/${queryId}`, 
            {params: {
                area,
                itemName
            }});

        const areaVal = response.data.rows.map(row => {
            return row.at(0);
        });
        setAreaValue(areaVal);

        const cropName = response.data.rows.map(row => {
            return row.at(1);
        })
        setCropName(cropName);

        // Stores all the years relevant to the query in an array
        const qYears = response.data.rows.map(row => {
            return row.at(2);
        })
        setYearRange(qYears);

        const value = response.data.rows.map(row => {
            return row.at(3);
        })
        setValue(value);

        // Find the lowest value
        const areaMin = Math.min(...value);
        setMinValue(areaMin);

        //Find the highest value
        const areaMax = Math.max(...value);
        setMaxValue(areaMax);

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
                Area Name: 
                <br></br>
                <select id='query-input-dropdown'
                    value={area} 
                    onChange={e => setArea(e.target.value)}>
                    {
                        cropAreaNames.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
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
            {showGrpah ? 
                <Plot 
                    data={[
                        {
                            x: yearRange,
                            y: value,
                            name: areaValue,
                            type: 'bar',
                            mode: 'lines+markers',
                            marker: {color: 'orange'}
                        }
                    ]}
                    layout={ {
                                width: 960, 
                                height: 720, 
                                xaxis: {range: [yearRange[0] - 1, yearRange[yearRange.length - 1] + 1], title: "Years"},
                                yaxis: {range: [minValue - (minValue*0.05), maxValue + (maxValue*0.05)], title: "tonnes"},
                                title: `The tonnes of ${cropName[0]} for ${areaValue[0]} between ${yearRange[0]} and ${yearRange[yearRange.length - 1]}`
                            } }
                />
            : <br></br>}
        </div>
        </>
    );
}

export default Query4;