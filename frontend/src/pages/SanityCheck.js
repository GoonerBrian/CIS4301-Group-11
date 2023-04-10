import { useState, useEffect } from 'react';
import axios from 'axios';

const SanityCheck = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    // Gets whatever is following http://localhost:3000/queries-page/
    const queryId = 'sanity-check'

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
        <p>This is the query result (Sanity Check): {queryInfo} </p>
        </>
    );
}

export default SanityCheck;