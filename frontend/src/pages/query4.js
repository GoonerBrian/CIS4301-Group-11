import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFound';
import queries from './query-content';
import axios from 'axios';

const Query4 = () => {
    const [queryInfo, setQueryInfo] = useState([]);
    // Gets whatever is following http://localhost:3000/queries-page/
    const { queryId } = useParams();

    useEffect(() => {
        const loadQueryInfo = async () => {
            const response = await axios.get(`http://localhost:5000/${queryId}`);
            const newQueryInfo = response.data.rows.at(0).at(0);
            setQueryInfo([newQueryInfo]);
        }
        loadQueryInfo();
    }, [queryId]);

    // Verifies the queryId matches existing content.
    const query = queries.find(query => query.name === queryId);

    // Redirect to Not Found Page if query doesn't exist
    if (!query) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{query.title}</h1>
        <p>This is the query result: {queryInfo} </p> 
        <p>{query.content}</p>
        </>
    );
}

export default Query4;