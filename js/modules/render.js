export const Render = {
    allCharacters: ( (data, userInput) => {
            // console.log(data.filter(d => console.log(d.species)))
    const homeSection = document.querySelector(".home")
    
    Render.removeCharacters(homeSection)

    // Selects the main tag in from the dome
    
    // Initialize search function
    Render.search(data, userInput)
    Render.updateUI("home");
    // Initialize router
    // router(data, main)

    // resource ternary operator: https://stackoverflow.com/questions/19271755/is-there-an-alternative-to-using-if-else-statements
    // Check if userInput is undefined, if so set userInput to empty string, otherwise use value given by the user and remove unneccessary characters
    userInput = (userInput == undefined) ? userInput = '' : userInput

    data
    .filter(character => character.name.toLowerCase()
    .includes(userInput.toLowerCase()))  
    .map(character => {
        //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
        let article = document.createElement('article')

        // Inject a img, h1, p, etc. into the section and fill these with the found character's data
        article
        .insertAdjacentHTML('afterbegin',
        `<a href=#character/:${character.id}>
        <img src=${character.image}>
        <h1>${character.name}</h1>
        </a>`);

        //gives each section 
        article.setAttribute('id', character.id)

        homeSection.appendChild(article)

        })
    }),
    removeCharacters: ( (section) => {
    //resource used: https://medium.com/front-end-weekly/remove-all-children-of-the-node-in-javascript-968ad8f120eb
    // Remove all characters from the DOM
    section.querySelectorAll('*').forEach(character => character.remove());
    }),
    search: ( (data, userInput) => {
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
        Render.allCharacters(data, userInput)
        //https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
        }
    }),
    updateUI: ( (route) => {
        const sections = document.querySelectorAll("main section")
        sections.forEach(section => {
          section.classList.remove('active');
        });
        const activeSection = document.querySelector(`[data-route=${route}]`);
        
        activeSection.classList.add('active');
    }),
    characterDetail: ( (id, data) => {
        Render.updateUI("details")

        const detailsSection = document.querySelector(".details")
        // remove all unneccessary characters
        Render.removeCharacters(detailsSection)
        // Removes the hash from the start of id and converts it to a number
        id = +id.substring(1);
        // creates a new section element
        let article = document.createElement('article')
        // find the character from the dataset which id matches the id in the url
        const result = data.find(character => character.id === id)
    
       console.log(result)
    
       // Inject a img, h1, p, etc. into the section and fill these with the found character's data
       article.insertAdjacentHTML('afterbegin',
       
       `<a = a href='#'}><img src=${result.image}>
       <h1>${result.name}</h1>
       <p>Status: ${result.status}</p>
       <p>Species: ${result.species}</p>
       <p>Gender: ${result.gender}</p>
       <p>Origin: ${result.origin.name}</p>
       <p>Lives in: ${result.location.name}</p>
       `)
        // Append the section to the main tag in the DOM
        detailsSection.appendChild(article)
    })
}