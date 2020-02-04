const endpoint = `https://rickandmortyapi.com/api/character/`


fetch(endpoint)
    .then(res => res.json())
    .then(data => renderCharacters(data))


function renderCharacters(data){
    console.log(data)
    
    const loadButton = document.querySelectorAll('button')[0];
    const main = document.querySelectorAll('main')[0];

    data.results.forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        // console.log(element)
        
        let section = document.createElement('section')

        section
        .insertAdjacentHTML('afterbegin', `<img src=${element.image}> <h1>${element.name}</h1> <p>${element.status}</p>`)

        main.appendChild(section)

    });

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

