import { useState, useEffect } from 'react';
import axios from 'axios';
import QueryContent from './query-content.js';

const SanityCheck = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    // Gets whatever is following http://localhost:3000/queries-page/
    const queryId = 'sanity-check'
    const queryDesc = QueryContent[0].content;

    useEffect(() => {
        const loadQueryInfo = async () => {
            const response = await axios.get(`http://localhost:5000/${queryId}`);
            const newQueryInfo = response.data.rows.at(0).at(0);
            setQueryInfo([newQueryInfo]);
        }
        loadQueryInfo();
    }, [queryId]);

    return (
        <>
        <div id="query-input-form">
            <h1>Query Description</h1>
            <p>
                {queryDesc}
            </p>
        </div>
        <p>This is the query result (Sanity Check): {queryInfo} </p>
        </>
    );
}

export default SanityCheck;