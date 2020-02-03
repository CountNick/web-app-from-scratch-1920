

const endpoint = `https://cors-anywhere.herokuapp.com/https://swapi.co/api/planets`

const altEndpoint = `https://rickandmortyapi.com/api/character/`

console.log(endpoint)

// fetch(endpoint)
//     .then(res => res.json())
//     .then(data => {return data.results})
//     .then(data => transformOriginalData(data))
//     .then(transformOriginalData => renderPlanets(transformOriginalData))

fetch(altEndpoint)
    .then(res => res.json())
    .then(data => {return data})
    .then(data => renderCharacters(data))


function renderCharacters(data){
    console.log('rendaa: ', data.next)

    data.results.forEach(element => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        console.log(element)
        
        let article = document.createElement('section')

        let h1 = document.createElement('h1')
        let p = document.createElement('p');
        let img = document.createElement('img')

        img.src = element.image
        
        h1.innerHTML = element.name
        p.innerHTML = element.status


        article.appendChild(img)
        article.appendChild(h1)
        article.appendChild(p)


        

        document.body.appendChild(article)

        // console.log(document.insertBefore(block))

        // planet.textContent = element.planetName

        // console.log(planet)

    });

    

}