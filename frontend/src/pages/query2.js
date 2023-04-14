import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Query2 = () => {
    
    const [cropItemNames, setCropItemNames] = useState([]);
    const [cropYears, setCropYears] = useState([]);
    const [cropECode, setCropECode] = useState([]);
    const [year1, setYear1] = useState("");
    const [year2, setYear2] = useState("");
    const [itemName, setItemName] = useState("");
    const [eCode, setECode] = useState("");
    const [area1Values, setArea1Values] = useState([]);
    const [area2Values, setArea2Values] = useState([]);
    const [area3Values, setArea3Values] = useState([]);
    const [area1Years, setArea1Years] = useState([]);
    const [area2Years, setArea2Years] = useState([]);
    const [area3Years, setArea3Years] = useState([]);
    const [area1, setArea1] = useState("");
    const [area2, setArea2] = useState("");
    const [area3, setArea3] = useState("");
    const [showGrpah, setShowGraph] = useState(false);
    const [minValueY, setMinValueY] = useState(0);
    const [maxValueY, setMaxValueY] = useState(50);
    const [minValueX, setMinValueX] = useState(0);
    const [maxValueX, setMaxValueX] = useState(50);
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
            {params: {
                year1,
                year2,
                itemName,
                eCode
            }});
            //console.log(response.data);
            let index = 1;
            const areaVals = new Array(3);
            const years = new Array(3);
            let arrIndex = 0;
            for(let i = 0; i < areaVals.length; i++)
            {
                areaVals[i] = [];
                years[i] = [];
            }
            if(response.data.rows.length === 0)
            {
                setShowGraph(false);
            }
            else
            {
                
                setArea1(response.data.rows.at(0).at(0));
                areaVals[arrIndex].push(response.data.rows.at(0).at(1));
                years[arrIndex].push(response.data.rows.at(0).at(2));
                let currentArea = response.data.rows.at(0).at(0);
                while (index < response.data.rows.length)
                {
                    
                    if(response.data.rows.at(index).at(0) === currentArea)
                    {
                        
                        areaVals[arrIndex].push(response.data.rows.at(index).at(1));
                        years[arrIndex].push(response.data.rows.at(index).at(2));
                    }
                    else
                    {
                        console.log(arrIndex);
                        if(arrIndex === 0)
                        {
                            
                            setArea1Values(areaVals[arrIndex]);
                            setArea1Years(years[arrIndex]);
                            setArea2(response.data.rows.at(index).at(0));
                            arrIndex = 1;
                            areaVals[arrIndex].push(response.data.rows.at(index).at(1));
                            years[arrIndex].push(response.data.rows.at(index).at(2));
                            currentArea = response.data.rows.at(index).at(0);
                        }
                        else if(arrIndex === 1)
                        {
                            
                            setArea2Values(areaVals[arrIndex]);
                            setArea2Years(years[arrIndex]);
                            setArea3(response.data.rows.at(index).at(0));
                            arrIndex = 2;
                            areaVals[arrIndex].push(response.data.rows.at(index).at(1));
                            years[arrIndex].push(response.data.rows.at(index).at(2));
                            currentArea = response.data.rows.at(index).at(0);
                        }
                        
                    }
                    index++;
                }
                setArea3Values(areaVals[2]);
                setArea3Years(years[2]);
                const areaMin1 = Math.min(...area1Values);
                const areaMin2 = Math.min(...area2Values);
                const areaMin3 = Math.min(...area3Values);
                const areaMax1 = Math.max(...area1Values);
                const areaMax2 = Math.max(...area2Values);
                const areaMax3 = Math.max(...area3Values);
                setMinValueY(Math.min(areaMin1,areaMin2,areaMin3));
                setMaxValueY(Math.max(areaMax1,areaMax2,areaMax3));


                year1 < year2 ? setMinValueX(year1) : setMinValueX(year2);
                year1 > year2 ? setMaxValueX(year1) : setMaxValueX(year2);
                
                setShowGraph(true);
            }
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
            <p>Choose 5312 for Area Harvested in units of Hectaacres.</p>
            <p>Choose 5419 for Yield in units of Hectagrams per Hectaacres</p>
            <p>Choose 5510 for Production in units of metric tonnes</p>
            
            <br></br>
            <button onClick={runQuery}>Run Query</button>
        </div>
        <br></br>
        <div>
            {showGrpah ?
            <Plot  
                data={[
                    {
                        x: area1Years,
                        y: area1Values,
                        name: area1,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'orange'}
                    },
                    {
                        x: area2Years,
                        y: area2Values,
                        name: area2,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'}
                    },
                    {
                        x: area3Years,
                        y: area3Values,
                        name: area3,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'green'}
                    }
                ]}
                layout={ {
                    width: 960,
                    height: 720,
                    xaxis: {range: [minValueX, maxValueX], title: "Years"},
                    yaxis:{range: [minValueY, maxValueY], title: "Value of Crop"},
                    title: `The top value producing countries for ${itemName}`
                }}
                />
            :<br></br>}
        </div>
        </>
    );
}

export default Query2;