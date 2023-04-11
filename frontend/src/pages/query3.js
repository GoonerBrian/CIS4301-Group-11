import { useState, useEffect } from 'react';
import axios from 'axios';

const Query3 = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    // Gets whatever is following http://localhost:3000/queries-page/
    const queryId = 'query3';

    const year1 = '1990';
    const year2 = '1999';
    const area1 = 'United States of America';
    const area2 = 'Europe';
    const itemName = 'Apples';

    // Works       : http://localhost:5000/query3?area1=United+States+of+America&area2=Europe&year1=1990&year2=1999&itemName=Apples
    // Doesn't work: http://localhost:5000/query3?area1=United+States+of+America&area2=Europe&year1=1990&year2=1999&itemName=Apples

    useEffect(() => {
        const loadQueryInfo = async () => {
            const response = await axios.get(
                `http://localhost:5000/${queryId}`, 
                {params: {
                    area1,
                    area2,
                    year1,
                    year2,
                    itemName
                }});
            const newQueryInfo = response.data.rows.at(0).at(0);
            setQueryInfo([newQueryInfo]);
        }
        loadQueryInfo();
    }, [queryId]);

    return (
        <>
        <p>This is the query result (Query 3): {queryInfo} </p>
        </>
    );
}

export default Query3;