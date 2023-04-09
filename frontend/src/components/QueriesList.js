import { Link } from 'react-router-dom';

const QueriesList = ({ queries }) => {
    return (
        // The <></> is a formatting trick to allow for displaying more than one top-level element with a single component
        // queries.map is where we iterate over all the queries we have and store individual queries in the query variable.
        // The <Link> turns the query title and content into a clickable link.
            // key resolves the console warning unique key and is due to the map function being used. An alternative approach can be found in SanityCheck.js.
            // className is a placeholder for later styling
            // to is where the link is sending the user
        // The <h3> displays the query's title
        // The <p> displays the first 150 chars of the query's content from the first section of the content (There may only be 1 section. I don't know at this time.).
        <>
        {queries.map(query => (
            <Link key={query.name} className="query-list-item" to={`/queries-page/${query.name}`}>
                <h3>{query.title}</h3>
                <p>{query.content[0].substring(0,150)}...</p>
            </Link>
        ))}
        </>
    );
}

export default QueriesList;