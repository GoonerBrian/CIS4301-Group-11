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
        title: "Query 1: The comparison of Population changes against production of selected Crop",
        content: [
            `The user can select a crop, country and year range to view the fluctuation in the population and how it correlates to the crop.`
        ]
    },
    {
        name: 'query2', // Must be the name of the endpoint in the backend
        title: "Query 2: The 3 countries that produce the most yield type, for a crop, over a time interval",
        content: [
            `The user can select an item type and a collection method to view the top three producing countries for that item, 
            and see how they changed over a selected time interval.`
        ]
    },
    {
        name: 'query3', // Must be the name of the endpoint in the backend
        title: "Query 3: The crop yield per hectare for 2 countries over a time interval",
        content: [
            `The user can select 2 countries and a crop to see how their respective
            yield per hectare has changed over time.`
        ]
    },
    {
        name: 'query4', // Must be the name of the endpoint in the backend
        title: "Query 4: The best year of production for a selected country and crop by displaying the surrounding years",
        content: [
            `The user can select a crop and a country to identify the year with the highest production of the crop and
            observe the change of production in the surrounding 5 years.`
        ]
    },
    {
        name: 'query5', // Must be the name of the endpoint in the backend
        title: "Query 5: Areas with the highest and lowest average yield of a specific crop",
        content: [
            `The user can select a crop to compare the 3 areas with the highest and lowest average yields.`
        ]
    },
    {
        name: 'query6', // Must be the name of the endpoint in the backend
        title: "Query 6: A comparison of annual crop yields vs population growth for a country/area",
        content: [
            `This query allows the user to view the total crop yields of all crops a country/area has produced 
            and compare that to their population growth over the same time period.`
        ]
    }
]

export default queries;