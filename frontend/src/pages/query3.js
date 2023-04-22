import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import QueryContent from './query-content.js';

const Query3 = () => {
    const [cropAreaNames, setCropAreaNames] = useState([]);
    const [cropItemNames, setCropItemNames] = useState([]);
    const [cropYears, setCropYears] = useState([]);
    const [area1Values, setArea1Values] = useState([]);
    const [area2Values, setArea2Values] = useState([]);
    const [queryYears, setQueryYears] = useState([]);
    const [year1, setYear1] = useState("");
    const [year2, setYear2] = useState("");
    const [area1, setArea1] = useState("");
    const [area2, setArea2] = useState("");
    const [itemName, setItemName] = useState("");
    const [showGrpah, setShowGraph] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(50);
    const queryId = 'query3';
    const queryDesc = QueryContent[3].content;

    useEffect(() => {
        const loadFormOptions = async () => {
            const areaNameRes = await axios.get(`http://localhost:5000/crop-area-names`);
            const areaNames = areaNameRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropAreaNames(areaNames);

            const areaYearRes = await axios.get(`http://localhost:5000/crop-years`);
            const areaYears = areaYearRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropYears(areaYears);

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
                area1,
                area2,
                year1,
                year2,
                itemName
            }});

        // Stores all of Area 1's values in an array
        const area1Vals = response.data.rows.map(row => {
            return row.at(2);
        });
        setArea1Values(area1Vals);

        // Stores all of Area 2's values in an array
        const area2Vals = response.data.rows.map(row => {
            return row.at(5);
        });
        setArea2Values(area2Vals);

        // Stores all the years relevant to the query in an array
        const queryYrs = response.data.rows.map(row => {
            return row.at(0);
        })
        setQueryYears(queryYrs);

        // Find the lowest value
        const area1Min = Math.min(...area1Values);
        const area2Min = Math.min(...area2Values);
        area1Min < area2Min ? setMinValue(area1Min) : setMinValue(area2Min);

        //Find the highest value
        const area1Max = Math.max(...area1Values);
        const area2Max = Math.max(...area2Values);
        area1Max > area2Max ? setMaxValue(area1Max) : setMaxValue(area2Max);

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
                First Area Name: 
                <br></br>
                <select id='query-input-dropdown'
                    value={area1} 
                    onChange={e => setArea1(e.target.value)}>
                    {
                        cropAreaNames.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <label>
                Second Area Name: 
                <br></br>
                <select id='query-input-dropdown'
                    value={area2} 
                    onChange={e => setArea2(e.target.value)}>
                    {
                        cropAreaNames.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <label>
                Starting Year: 
                <br></br>
                <select id='query-input-dropdown'
                    value={year1} 
                    onChange={e => setYear1(e.target.value)}>
                    {
                        cropYears.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <label>
                Ending Year: 
                <br></br>
                <select id='query-input-dropdown'
                    value={year2} 
                    onChange={e => setYear2(e.target.value)}>
                    {
                        cropYears.map(opt => <option key={opt}>{opt}</option>)
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
                            x: queryYears,
                            y: area1Values,
                            name: area1,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'orange'}
                        },
                        {
                            x: queryYears,
                            y: area2Values,
                            name: area2,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'}
                        }
                    ]}
                    layout={ {
                                width: 960, 
                                height: 720, 
                                xaxis: {range: [queryYears[0], queryYears[queryYears.length - 1]], title: "Years"},
                                yaxis: {range: [minValue, maxValue], title: "tonnes/hectares"},
                                title: `The tonnes/hectares of ${itemName} for ${area1} and ${area2} between ${queryYears[0]} and ${queryYears[queryYears.length - 1]}`
                            } }
                />
            : <br></br>}
        </div>
        </>
    );
}

export default Query3;