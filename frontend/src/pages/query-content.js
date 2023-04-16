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
        title: "The comparison of Population changes against production of selected Crop",
        content: [
            `The user can select a crop, country and year range to view the fluctuation in the population and how it correlates to the crop.`
        ]
    },
    {
        name: 'query2', // Must be the name of the endpoint in the backend
        title: "The 3 countries that produce the most yield type, for a crop, over a time interval",
        content: [
            `The user can select an item type and a collection method to view the top three producing countries for that item, 
            and see how they changed over a selected time interval.`
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
        title: "The best year of production for a selected country and crop by displaying the surrounding years",
        content: [
            `The user can select a crop and a country to identify the year with the highest production of the crop and
            observe the change of production in the surrounding 5 years.`
        ]
    },
    {
        name: 'query5', // Must be the name of the endpoint in the backend
        title: "This is a placeholder for query 5",
        content: [
            `Update this once the frontend work has been completed.`
        ]
    }
]

export default queries;