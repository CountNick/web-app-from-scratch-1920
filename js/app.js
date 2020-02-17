"use strict";


let userInput = ``;
let inputFilter = document.querySelectorAll('input')[0]
const main = document.querySelectorAll('main')[0];

async function getData(){
//resources used: 
//async await: https://www.taniarascia.com/promise-all-with-async-await/
//fetching data multiple pages from api: https://stackoverflow.com/questions/40677764/how-to-fetch-data-over-multiple-pages/40681342
    const endpoint = `https://rickandmortyapi.com/api/character/`
    const allData =[]
    let pagesReq = 0;

    // fetch(endpoint)
    //     .then(res => {
    //         if(res.ok) return res.json()
    //         else throw new Error('Something went wrong')
    //     })
    //     .then(jsonData => {
    //         const apiPromises = []
    //         pagesReq = jsonData.info.pages

    //         for(let i = pagesReq; i>0; i--){
    //             apiPromises.push(fetch(endpoint + `?page=${i}`)
    //             .then(res => res.json())
    //             .then(allData => allData))
    //         }

    //         return apiPromises
    //     })
    //     .then(apiPromises => {
    //         Promise.all(apiPromises)
    //         .then(allData => render(allData.reverse()))
    //     })
    
    let response = await fetch(endpoint);

    let json = await response.json()


    pagesReq = json.info.pages
    
    
    for(let i = pagesReq; i>0; i--){

        let fetchNextPage = await fetch(endpoint + `?page=${i}`)
    
        let nextPageToJson = await fetchNextPage.json()

        allData.push(nextPageToJson)

    }
    
    console.log(allData)

}


getData()
    


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

function renderAllCharacters(data){

    const loadButton = document.querySelectorAll('button')[0];
    

    main.textContent = ''

    data.results
    .filter(element => element.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/

        let section = document.createElement('section')

        section
        .insertAdjacentHTML('afterbegin',
        `<a href=#character/:${element.id}>
        <img src=${element.image}>
        <h1>${element.name}</h1>
        </a>`);
               

        //gives each section 
        section.setAttribute('id', element.id)

        main.appendChild(section)

    })

inputFilter.addEventListener('input', searchCharacters)

function searchCharacters(event){

    inputFilter.removeEventListener('input', searchCharacters)
    userInput =  event.target.value;

    renderAllCharacters(data)

    //https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
}

function removeCharacters(){
    
    main.removeChild()

}
    
    function getNext(){
        loadButton.removeEventListener('click', getNext)
        if(data.info.next !== null) {
            fetch(data.info.next)
                .then(res =>res.json())
                .then(data => renderCharacters(data));
        }
    }

    // main.insertBefore(loadButton, loadButton)

    loadButton.addEventListener('click', getNext)

}

function renderCharacterDetail(id, data){

    main.textContent = ''

    id = +id.substring(1);
    
    let section = document.createElement('section')

    const result = data.results.find(character => character.id === id)

   console.log(result)

   section.insertAdjacentHTML('afterbegin', `<img src=${result.image}> <h1>${result.name}</h1> <p>Status: ${result.status}</p>
   <p>Species: ${result.species}</p>
   <p>Gender: ${result.gender}</p>
   <p>Origin: ${result.origin.name}</p>
   <p>Lives in: ${result.location.name}</p>
   `)


    main.appendChild(section)
}

