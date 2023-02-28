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
        name: 'query-2',
        title: "This is a placeholder for query 2",
        content: [
            `I have no idea what will go here at this point.`
        ]
    }
]

export default queries;