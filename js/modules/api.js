export const API = {
    getData: (async () => {
    //resources used: 
    //async await: https://www.taniarascia.com/promise-all-with-async-await/
    //fetching data multiple pages from api: https://stackoverflow.com/questions/40677764/how-to-fetch-data-over-multiple-pages/40681342
    
    const endpoint = `https://rickandmortyapi.com/api/character/`
    
    const allCharacterData =[]
    let pagesReq = 0;
    // fetch the first page of characters
    let response = await fetch(endpoint)
    // set the response to json
    let json = await response.json()
    // set the required pages to fetch to the amount of pages containing characters
    pagesReq = json.info.pages
    // keep fetching the next page until none is let
    for(let i = pagesReq; i>0; i--){
        // fetch the next page of characters
        let fetchNextPage = await fetch(`${endpoint}?page=${i}`)
        // set the response to json
        let parseJson = await fetchNextPage.json()
        // push each object in a new array with all character pages 
        allCharacterData.push(parseJson)
    }
    // return the complete array of characters

    // localStorage.setItem('saveData', JSON.stringify(allCharacterData))

    // let retrieveData = JSON.parse(localStorage.getItem('saveData'))

    // console.log('local: ', retrieveData)

    return allCharacterData.reverse()

    }),
    transformData: ( (data) => {
            // Make a new array;
    const allCharacters = data.map(d => {
        // Only return the resulsta as this is the data I will be using to make the application
        return d.results
    }).flat()
    // Return the new array
    return allCharacters
    })
}