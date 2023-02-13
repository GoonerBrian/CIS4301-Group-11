import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFound';
import queries from './query-content';

const QueryPage = () => {
    // Gets whatever is following http://localhost:3000/queries-page/
    const { queryId } = useParams();
    // Verifies the queryId matches existing content.
    const query = queries.find(query => query.name === queryId);

    // Redirect to Not Found Page if query doesn't exist
    if (!query) {
        return <NotFoundPage />
    }

    return (
        <>
        <h1>{query.title}</h1>
        {query.content.map((queryData, i) => (
            <p key={i}>{queryData}</p>
        ))}
        </>
    );
}

export default QueryPage;