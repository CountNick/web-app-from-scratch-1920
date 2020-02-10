
let userInput = ``;

const endpoint = `https://rickandmortyapi.com/api/character/`

let inputFilter = document.querySelectorAll('input')[0]

fetch(endpoint)
    .then(res => res.json())
    .then(data => renderCharacters(data))


function renderCharacters(data){

    const loadButton = document.querySelectorAll('button')[0];
    const main = document.querySelectorAll('main')[0];

    main.textContent = ''

    data.results
    .filter(element => element.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        // console.log(element)
        
        let section = document.createElement('section')

        section
        .insertAdjacentHTML('afterbegin', `<img src=${element.image}> <h1>${element.name}</h1> <p>${element.status}</p>`)

        main.appendChild(section)

    })

inputFilter.addEventListener('input', updateCharacters)

function updateCharacters(event){

    inputFilter.removeEventListener('input', updateCharacters)
    userInput =  event.target.value;

    // fetch(`https://rickandmortyapi.com/api/character/?name=${userInput}`)
    // .then(res => res.json())
    // .then(data => renderCharacters(data))
    renderCharacters(data)
    // showCharacters()
    // inputFilter.removeEventListener('input', renderCharacters)
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

