import QueriesList from '../components/QueriesList';
import queries from "./query-content";

const QueriesPage = () => {
    return (
        <>
        <h1>Queries</h1>
        <QueriesList queries={queries} />
        </>
    );
}

export default QueriesPage;