import { useState } from 'react';
import axios from 'axios';

const Query3 = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    const [year1, setYear1] = useState("");
    const [year2, setYear2] = useState("");
    const [area1, setArea1] = useState("");
    const [area2, setArea2] = useState("");
    const [itemName, setItemName] = useState("");
    const queryId = 'query3';

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
            <h3>Test</h3>
            <label>
                First Area Name: 
                <input
                    value={area1}
                    onChange={e => setArea1(e.target.value)} 
                    type="text" 
                />
            </label>
            <label>
                Second Area Name: 
                <input 
                    value={area2}
                    onChange={e => setArea2(e.target.value)}
                    type="text" />
            </label>
            <label>
                Starting Year: 
                <input 
                    value={year1}
                    onChange={e => setYear1(e.target.value)}
                    type="text" />
            </label>
            <label>
                Ending Year: 
                <input 
                    value={year2}
                    onChange={e => setYear2(e.target.value)}
                    type="text" />
            </label>
            <label>
                Crop Name:
                <input 
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    type="text" />
            </label>
            <button onClick={runQuery}>Run Query</button>
        </div>
        <p>This is the query result (Query 3): {queryInfo} </p>
        </>
    );
}

export default Query3;