const queries = [
    {
        name: 'sanity-check',
        title: "Sanity Check",
        content: [
            `This runs the following query as a sanity check, select * from "BRIAN.HOBLIN".sanityCheck. 
            The logic in QueryPage.js is setup to only display the 2nd attribute. You can verify all 
            data is being returned by inspecting the page, selecting the Network tab, selecting the 
            most recent sanity-check entry (bottom), and selecting the Response tab.`
        ]
    },
    {
        name: 'query1', // Must be the name of the endpoint in the backend
        title: "This is a placeholder for query 1",
        content: [
            `Update this once the frontend work has been completed.`
        ]
    },
    {
        name: 'query2', // Must be the name of the endpoint in the backend
        title: "This is a placeholder for query 2",
        content: [
            `Update this once the frontend work has been completed.`
        ]
    },
    {
        name: 'query3', // Must be the name of the endpoint in the backend
        title: "The crop yield per hectare for 2 countries over a time interval",
        content: [
            `The user can select 2 countries and a crop to see how their respective
            yield per hectare has changed over time.`
        ]
    },
    {
        name: 'query4', // Must be the name of the endpoint in the backend
        title: "This is a placeholder for query 4",
        content: [
            `Update this once the frontend work has been completed.`
        ]
    },
    {
        name: 'query5', // Must be the name of the endpoint in the backend
        title: "Areas with the highest and lowest average yield of a specific crop",
        content: [
            `The user can select a crop to compare the three areas with the highest and lowest average yields.`
        ]
    }
]

export default queries;