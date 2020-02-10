"use strict";


let userInput = ``;

const endpoint = `https://rickandmortyapi.com/api/character/`

let inputFilter = document.querySelectorAll('input')[0]
const main = document.querySelectorAll('main')[0];

fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        //initiate router
        routie({
            '': () => {
              renderCharacters(data);
            },
            'about': () => {
                console.log('about')
            },
            'character/:name': (id) => {
              renderDetail(id, data)
            }
          });
    })
    .catch(err => console.error(err))

function renderCharacters(data){

    const loadButton = document.querySelectorAll('button')[0];
    

    main.textContent = ''

    data.results
    .filter(element => element.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        // console.log(element)
        
        // console.log(element)

        let section = document.createElement('section')

        section
        .insertAdjacentHTML('afterbegin', ` <a href=#character/:${element.id}><img src=${element.image}> <h1>${element.name}</h1></a>`);

        section.setAttribute('id', element.id)
        
        // section.addEventListener('click', function(){
        //     console.log(element.id)
        // })

        main.appendChild(section)

    })

inputFilter.addEventListener('input', searchCharacters)

function searchCharacters(event){

    inputFilter.removeEventListener('input', searchCharacters)
    userInput =  event.target.value;

    renderCharacters(data)

    //https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
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

function renderDetail(id, data){

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