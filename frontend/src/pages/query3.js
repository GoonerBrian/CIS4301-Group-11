import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

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
    const queryId = 'query3';

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

        const area1Vals = response.data.rows.map(row => {
            return row.at(2);
        });
        setArea1Values(area1Vals);

        const area2Vals = response.data.rows.map(row => {
            return row.at(5);
        });
        setArea2Values(area2Vals);

        const queryYrs = response.data.rows.map(row => {
            return row.at(0);
        })
        setQueryYears(queryYrs);
    }

    return (
        <>
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
        <Plot 
            data={[
                {
                    x: queryYears,
                    xaxis: "Years",
                    y: area1Values,
                    yaxis: "tonnes/hectares",
                    name: area1,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'orange'}
                },
                {
                    x: queryYears,
                    xaxis: "Years",
                    y: area2Values,
                    yaxis: "tonnes/hectares",
                    name: area2,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'blue'}
                }
            ]}
            layout={ {
                        width: 960, 
                        height: 720, 
                        title: `The tonnes/hectares of ${itemName} for ${area1} and ${area2} between ${queryYears[0]} and ${queryYears[queryYears.length - 1]}`
                    } }
        />
        </>
    );
}

export default Query3;