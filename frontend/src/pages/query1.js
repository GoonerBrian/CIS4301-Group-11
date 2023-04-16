import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Query1 = () => {
    const [cropAreaNames, setCropAreaNames] = useState([]);
    const [cropItemNames, setCropItemNames] = useState([]);
    const [year1, setYear1] = useState(0);
    const [year2, setYear2] = useState(0);
    const [eCropCode, setCropECode] = useState([]);
    const [cropYears, setCropYears] = useState([]);

    const [eCode, setECode] = useState([]);
    const [itemName, setItemName] = useState("");
    const [country, setCountryName] = useState("");

    const [areaValue, setAreaValue] = useState([]);
    const [cropName, setCropName] = useState([]);
    const [value, setValue] = useState([]);
    const [population, setPopulation] = useState([]);
    const [yearRange, setYearRange] = useState([]);

    const [showGrpah, setShowGraph] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(50);
    const [minPopValue, setMinPopValue] = useState(0);
    const [maxPopValue, setMaxPopValue] = useState(50);
    const queryId = 'query1';

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

            const eCodeNameRes = await axios.get(`http://localhost:5000/crop-ecode`);
            const eCodeNames = eCodeNameRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropECode(eCodeNames);

            const areaYearRes = await axios.get(`http://localhost:5000/crop-years`);
            const areaYears = areaYearRes.data.rows.map(row => {
                return row.at(0);
            });
            setCropYears(areaYears);
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
                eCode,
                country
            }});

        //cd.area_name, cd.item_name, cd.value, pd.pop_total, cd.year
        console.log(response.data.rows);

        const areaVal = response.data.rows.map(row => {
            return row.at(0);
        });
        setAreaValue(areaVal);

        const cropName = response.data.rows.map(row => {
            return row.at(1);
        })
        setCropName(cropName);

        const value = response.data.rows.map(row => {
            return row.at(2);
        })
        setValue(value);

        const pop = response.data.rows.map(row => {
            return row.at(3);
        })
        setPopulation(pop);

        // Stores all the years relevant to the query in an array
        const qYears = response.data.rows.map(row => {
            return row.at(4);
        })
        setYearRange(qYears);

        

        // Find the lowest value
        const areaMin = Math.min(...value, population);
        setMinValue(areaMin);

        //Find the highest value
        const areaMax = Math.max(...value, population);
        setMaxValue(areaMax);

        // Find the lowest value
        const popMin = Math.min(...population);
        setMinPopValue(popMin);

        //Find the highest value
        const popMax = Math.max(...population);
        setMaxPopValue(popMax);

        setShowGraph(true);
    }

    return (
        <>
        <div id="query-input-form">
            <h3>Enter your query parameters</h3>
            <br></br>
            <label>
                Year 1: 
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
                Year 2: 
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
                E Code:
                <br></br>
                <select id='query-input-dropdown'
                    value={eCode} 
                    onChange={e => setECode(e.target.value)}>
                    {
                        eCropCode.map(opt => <option key={opt}>{opt}</option>)
                    }
                </select>
                <br></br>
            </label>
            <br></br>
            <label>
                Country Name:
                <br></br>
                <select id='query-input-dropdown'
                    value={country} 
                    onChange={e => setCountryName(e.target.value)}>
                    {
                        cropAreaNames.map(opt => <option key={opt}>{opt}</option>)
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
                            name: cropName[0] + ' Production',
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'orange'},
                            xaxis: 'x1',
                            yaxis: 'y1'
                        },
                        {
                            x: yearRange,
                            y: population,
                            name: areaValue[0] + '\'s Population',
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                            xaxis: 'x2',
                            yaxis: 'y2'
                        }
                    ]}
                    layout={ {
                                grid: {rows: 1, columns: 2, pattern: 'independent'}, 
                                subplots:['x1y1', 'x2y2'],
                                width: 960, 
                                height: 720, 
                                xaxis: {range: [yearRange[0] - 0.5, yearRange[yearRange.length - 1] + 0.5], title: "Years"},
                                yaxis: {range: [minValue - (minValue*0.1), maxValue + (maxValue*0.1)], title: "tonnes"},
                                xaxis2:{range: [yearRange[0] - 0.5, yearRange[yearRange.length - 1] + 0.5], title: "Years"},
                                yaxis2:{range: [minPopValue - (minPopValue*0.1), maxPopValue + (maxPopValue*0.1)], title: "Population"},
                                title: `The tonnes of ${cropName[0]} produced and population of ${areaValue[0]} between ${yearRange[0]} and ${yearRange[yearRange.length - 1]}`
                            } }
                />
            : <br></br>}
        </div>
        </>
    );
}

export default Query1;