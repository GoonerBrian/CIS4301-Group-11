import { useState, useEffect } from 'react';
import axios from 'axios';

const Query1 = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    // Gets whatever is following http://localhost:3000/queries-page/
    const queryId = 'query1';

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
        <p>This is the query result (Query 1): {queryInfo} </p>
        </>
    );
}

export default Query1;