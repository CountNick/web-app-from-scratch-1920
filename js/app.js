"use strict";


let userInput = ``;

const endpoint = `https://rickandmortyapi.com/api/character/`

let inputFilter = document.querySelectorAll('input')[0]
const main = document.querySelectorAll('main')[0];

// async function getData(){
//     let pagesReq = 0;

//     let processedResponses = []

//     fetch(endpoint)
//         .then(res => res.json())
//         .then(jsonData => {
//             const apiPromises = []
//             pagesReq = jsonData.info.pages

//             for(let i = pagesReq; i>0; i--){
//                 apiPromises.push(fetch(endpoint + `?page=${i}`))
//             }
            
//             Promise.all(apiPromises)
//                 .then(responses => {
//                     responses.map(response => response.json()
//                     .then(data => processedResponses.push(data))
// )                    
//                 });
                
//         })
//         return processedResponses
// }

// getData()
//     .then(ola => console.log(ola))

console.log(mustache("Hello {{name}}!", {name: "world"}))

fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        //initiate router
        routie({
            '': () => {
              renderAllCharacters(data);
            },
            'about': () => {
                console.log('about')
            },
            'character/:name': (id) => {
              renderCharacterDetail(id, data)
            }
          });
    })
    .catch(err => console.error(err))

function renderAllCharacters(data){

    const loadButton = document.querySelectorAll('button')[0];
    

    main.textContent = ''

    data.results
    .filter(element => element.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/

        let section = document.createElement('section')

        // section
        // .insertAdjacentHTML('afterbegin',
        // `<a href=#character/:${element.id}>
        // <img src=${element.image}>
        // <h1>${element.name}</h1>
        // </a>`);
        
        // console.log(mustache("{{#section}} {{/section}}"))
        let characterTemplate = mustache("<a href=#character/:{{id}}><img src={{image}}> <h1>{{name}}</h1> </a>", element)

        // let output = Mustache.render("<a href=#character/:{{id}}> <img src={{image}}> <h1>{{name}}</h1> </a>", element)

        section.innerHTML = characterTemplate

        
        

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

//    section.insertAdjacentHTML('afterbegin', `<img src=${result.image}> <h1>${result.name}</h1> <p>Status: ${result.status}</p>
//    <p>Species: ${result.species}</p>
//    <p>Gender: ${result.gender}</p>
//    <p>Origin: ${result.origin.name}</p>
//    <p>Lives in: ${result.location.name}</p>
//    `)


   let characterTemplate = mustache("<img src={{image}} <h1>{{name}}</h1> <p>Species: {{species}}</p><p>Gender: {{gender}}</p><p>Origin: {{origin.name}}</p> <p>Lives in: {{species}}</p>", result)

   section.innerHTML = characterTemplate


    main.appendChild(section)
}

