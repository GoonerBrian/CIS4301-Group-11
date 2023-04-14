import { useState, useEffect } from 'react';
import axios from 'axios';
//import Plot from 'react-plotly.js';

const Query2 = () => {
    
    const [cropItemNames, setCropItemNames] = useState([]);
    const [cropYears, setCropYears] = useState([]);
    const [cropECode, setCropECode] = useState([]);
    const [queryYears, setQueryYears] = useState([]);
    const [year1, setYear1] = useState("");
    const [year2, setYear2] = useState("");
    const [itemName, setItemName] = useState("");
    const [eCode, setECode] = useState("");
    const queryId = 'query2';

    useEffect(() => {
        const loadFormOptions = async () => {
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

            const eCodeNameRes = await axios.get(`http://localhost:5000/crop-ecode`);
            const eCodeNames = eCodeNameRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropECode(eCodeNames);
        }
        loadFormOptions();
    }, []);

    const runQuery = async () => {
        const response = await axios.get(
            `http://localhost:5000/${queryId}`,
            {params:{
                year1,
                year2,
                itemName,
                eCode
            }});
            console.log(response);
            //setQueryYears(response.data.rows.at(0).at(2));
            //alert(queryYears);
    }
    
    
    return (
        <>
        <div id="query-input-form">
            <h3>Enter your query parameters</h3>
            <br></br>
            <label>
                Starting year:
                <br></br>
                <select id='query-input-dropdown'
                value = {year1}
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
            <label>
                Element Code:
                <br></br>
                <select id='query-input-dropdown'
                    value={eCode}
                    onChange={e => setECode(e.target.value)}>
                    {
                        cropECode.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <button onClick={runQuery}>Run Query</button>
        </div>
        </>
    );
}

export default Query2;