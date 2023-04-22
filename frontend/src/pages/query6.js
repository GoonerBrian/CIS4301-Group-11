import axios from "axios";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import QueryContent from './query-content.js';

const Query6 = () => {
    const [areaNames, setAreaNames] = useState([]);
    const [years, setYears] = useState([]);
    const [popData, setPopData] = useState([]);
    const [prodData, setProdData] = useState([]);
    const [areaName, setAreaName] = useState("");
    const [showGrpah, setShowGraph] = useState(false);
    const queryId = 'query6';
    const queryDesc = QueryContent[6].content;

    useEffect(() => {
        const loadFormOptions = async () => {
            const areaNamesRes = await axios.get(`http://localhost:5000/crop-area-names`);
            const areaNamesVals = areaNamesRes.data.rows.map(row => {
                return row.at(0);
            });
            setAreaNames(areaNamesVals);
        }
        loadFormOptions();
    }, []);

    const runQuery = async () => {
        const res = await axios.get(
            `http://localhost:5000/${queryId}`, 
            {
                params: {
                    areaName
                }
            });

        const queryYrs = res.data.rows.map(row => {
            return row.at(0);
        });
        setYears(queryYrs);

        const queryPopData = res.data.rows.map(row => {
            return row.at(1);
        });
        setPopData(queryPopData);

        const queryProdData = res.data.rows.map(row => {
            return row.at(2);
        });
        setProdData(queryProdData);

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
                Select country/area name: 
                <br></br>
                <select id="query-input-dropdown"
                    value={areaName}
                    onChange={e => setAreaName(e.target.value)}>
                        {
                            areaNames.map(opt => <option key={opt}>{opt}</option>)
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
                            x: years,
                            y: popData,
                            name: `${areaName} population data`,
                            mode: 'lines+markers',
                            marker: {color: 'orange'}
                        },
                        {
                            x: years,
                            y: prodData,
                            name: `${areaName} crop yield data`,
                            mode: 'lines+markers',
                            marker: {color: 'blue'}
                        }
                    ]}
                    layout={ {
                        width: 960,
                        height: 720,
                        xaxis: { title: "Years" },
                        yaxis: { title: "tonnes" },
                        title: "Test"
                    } }
                />
            : <br></br>
            }
        </div>
        </>
    )
}

export default Query6;