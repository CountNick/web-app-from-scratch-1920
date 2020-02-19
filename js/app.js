"use strict";

async function getData(){
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
    return allCharacterData.reverse()
}


getData()
    .then(getData => transformData(getData))
    .then(transformData => renderAllCharacters(transformData))
    
// fetch(endpoint)
//     .then(res => res.json())
//     .then(data => {
//         //initiate router
//         routie({
//             '': () => {
//               renderAllCharacters(data);
//             },
//             'about': () => {
//                 console.log('about')
//             },
//             'character/:name': (id) => {
//               renderCharacterDetail(id, data)
//             }
//           });
//     })
//     .catch(err => console.error(err))

function transformData(data){
    // Make a new array
    const allCharacters = data.map(d => {
        // Only return the resulsta as this is the data I will be using to make the application
        return d.results
    })
    // Make a new array that which makes one array of each subarray by flattening it
    allCharacters = allCharacters.flat()
    // Return the new array
    return allCharacters
}

// Function that renders the character cards to the DOM
function renderAllCharacters(data, userInput){
    // console.log(data.filter(d => console.log(d.species)))
    
    // Selects the main tag in from the dome
    const main = document.querySelectorAll('main')[0]
    // Initialize search function
    search(data, userInput)
    // Initialize router
    router(data, main)

    // resource ternary operator: https://stackoverflow.com/questions/19271755/is-there-an-alternative-to-using-if-else-statements
    // Check if userInput is undefined, if so set userInput to empty string, otherwise use value given by the user and remove unneccessary characters
    userInput = (userInput == undefined) ? userInput = '' : userInput, removeCharacters(main)


    data
    .filter(character => character.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .map(character => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        let section = document.createElement('section')

        section
        .insertAdjacentHTML('afterbegin',
        `<a href=#character/:${character.id}>
        <img src=${character.image}>
        <h1>${character.name}</h1>
        </a>`);
               

        //gives each section 
        section.setAttribute('id', character.id)

        main.appendChild(section)

    })
}


function search(data, userInput){
    // Selects the input from the DOM
    let searchBar = document.querySelectorAll('input')[0]
    // Adds an input event to the searchbar, and fires the searchCharacters function 
    searchBar.addEventListener('input', searchCharacters)

    function searchCharacters(event){
        // Remove the previous input each thime this function gets fired
        searchBar.removeEventListener('input', searchCharacters)
        // Set userInput to the value passed through searchBar 
        userInput =  event.target.value;
        // Fire the renderAllcharacters function and pass userInput 
        renderAllCharacters(data, userInput)
        //https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
    }

}

function renderCharacterDetail(id, data, main){
    // remove all unneccessary characters
   removeCharacters(main)
    // Removes the hash from the start of id and converts it to a number
    id = +id.substring(1);
    // creates a new section element
    let section = document.createElement('section')
    // find the character from the dataset which id matches the id in the url
    const result = data.find(character => character.id === id)

   console.log(result)

   // Inject a img, h1, p, etc. into the section and fill these with the found character's data
   section.insertAdjacentHTML('afterbegin',
   `<img src=${result.image}>
   <h1>${result.name}</h1>
   <p>Status: ${result.status}</p>
   <p>Species: ${result.species}</p>
   <p>Gender: ${result.gender}</p>
   <p>Origin: ${result.origin.name}</p>
   <p>Lives in: ${result.location.name}</p>
   `)
    // Append the section to the main tag in the DOM
    main.appendChild(section)
}

function removeCharacters(main){
    //resource used: https://medium.com/front-end-weekly/remove-all-children-of-the-node-in-javascript-968ad8f120eb
    // Remove all characters from the DOM
    main.querySelectorAll('*').forEach(character => character.remove());

}

function router(data, main){

    routie({
        '': () => {
            // renderAllCharacters(data)
        },
        'character/:name':(id) => {
            renderCharacterDetail(id, data, main)
        }
    })

}