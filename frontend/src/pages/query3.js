import { useState, useEffect } from 'react';
import axios from 'axios';

const Query3 = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    const [cropAreaNames, setCropAreaNames] = useState([]);
    const [cropItemNames, setCropItemNames] = useState([]);
    const [cropYears, setCropYears] = useState([]);
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
        const newQueryInfo = response.data.rows.at(0).at(1);
        setQueryInfo([newQueryInfo]);
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
        <p>This is the query result (Query 3): {queryInfo} </p>
        </>
    );
}

export default Query3;