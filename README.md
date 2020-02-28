# Web App From Scratch 

![Jaar2](https://user-images.githubusercontent.com/47485018/73750395-64639580-475d-11ea-8e5b-65df65fe5064.png)

[live link](https://countnick.github.io/web-app-from-scratch-1920/)

## Table of contents

* API
* Design patterns
* Actor diagram
* Wish list
* Interaction diagram
* Functionalities
* Installation
* Acknowledgements
* Installation

## API used

[Rick and morty API](https://rickandmortyapi.com/)

### Downsides

* The api has a maximum call rate of 100000 requests per day, this seems like a lot but when you get caught in a infinite loop you might exceed your request rate very quickly(which has happened to me)

* The information on characters is a little shallow. For example: there are no bio's for the characters and no images for the planets

## Design patterns

as for now:

* Pagination

* Live search function

* No global variables

* Use tabs to indent code


## Wanted to implement: 

* Local Storage for storing data
* Show related characters
* Filter on more than just name
* Breadcrumb functionality
 

## Actor diagram

![actorDiagram](https://i.imgur.com/CeDZ0Tg.png)

## Interaction Diagram

![interaction](https://i.imgur.com/oO8GskE.png)

## Functionalities

The app fetches data from the Rick and morty API and renders a card for every character. Users can click on these cards, which will lead them to a detailpage about the character. The detail page holds additional information like: 

* Character species
* Which planet the character is from 

On the overview page users can also type the name of a character in a searchbox which results in a live search


## Pagination: 
![Pagination](https://user-images.githubusercontent.com/47485018/75518707-d7c99180-5a01-11ea-8f3f-7fc32007577e.gif)


## Detail page: 
![detailPage](https://user-images.githubusercontent.com/47485018/75518633-b072c480-5a01-11ea-98c3-037560805532.gif)

## Search functionality:
![Search](https://user-images.githubusercontent.com/47485018/75518551-7c979f00-5a01-11ea-8649-f1e9a9dfae0d.gif)


## Acknowledgements

* [Mohammed](https://github.com/MohamadAlGhorani) for helping me impelement the routing example:

* [Florin Pop](https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/) for the instant live search functionality, especially the filter part: 
```js
    filter: ( (data, userInput) => {
        const filteredData = data.filter(character =>
            character.name.toLowerCase().includes(userInput.toLowerCase())
          );
        return filteredData
    })
```
And also the userInput :
```js
  search: ( (data, userInput) => {
    // Selects the input from the DOM
    let searchBar = document.querySelectorAll("input")[0];
    // Adds an input event to the searchbar, and fires the searchCharacters function
    searchBar.addEventListener("input", searchCharacters);

    function searchCharacters(event) {
      // Remove the previous input each thime this function gets fired
      searchBar.removeEventListener("input", searchCharacters);
      // Set userInput to the value passed through searchBar
      userInput = event.target.value;
      // Fire the renderAllcharacters function and pass userInput
      Render.allCharacters(data, userInput);
      //https://www.florin-pop.com/blog/2019/06/vanilla-javascript-instant-search/
    }
  })
```


* [Joost]() For the update ui routing function:
```js
// update UI from route (hashchange)
function updateUI(route) {
  sections.forEach(section => {
    section.classList.remove('active');
  });
  activeSection = document.querySelector(`[data-route=${route}]`);
  console.log(activeSection);
  activeSection.classList.add('active');
}
```

* [Guido and Robin]() for helping me put the render page feature in a function, which made it work
```js

  page: ( (num, section, data) => {

    const currPage = document.getElementById("current-page");
    const totalPages = document.getElementById("total-pages");

    let paginatedData = Data.paginateData(data, 10, num);
    
    currPage.textContent = paginatedData.page;
    totalPages.textContent = paginatedData.total_pages;


    paginatedData.data.map(character => {
    //resource: https://www.myhowtoonline.com/how-to-create-an-h1-element-with-javascript/
    let article = document.createElement("article");

    // Inject a img, h1, p, etc. into the section and fill these with the found character's data
    article.insertAdjacentHTML(
      "afterbegin",
      `<a href=#character/:${character.id}>
    <img src=${character.image}>
    <h1>${character.name}</h1>
    </a>`
    );

    //gives each section
    article.setAttribute("id", character.id);

    section.appendChild(article);
  });
  }

```

*[arjunphp](https://arjunphp.com/can-paginate-array-objects-javascript/) for the paginateData function. I took his example and rewrote it in my own style and in a seperate function 

```js
    paginateData: ( (array, page_size, page_number) => {
        const total_pages = Math.ceil(array.length / page_size);
        const paginatedItems = array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
        let page = page_number
    
        return {
          page: page_number,
          total: array.length,
          total_pages: total_pages,
          per_page: page_size,
          prev_page: page - 1 ? page - 1 : null,
          next_page: total_pages > page ? page + 1 : null,
          data: paginatedItems
        }
      })
```

## Installation

*__Note__ in order to run this project locally you need some kind of local server to start it up. I used the [liveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code

Open up terminal, and type: 

```
git clone https://github.com/CountNick/web-app-from-scratch-1920.git
```

```
cd web-app-from-scratch-1920
```

Open up the folder in VS code and start live server. The app will now be running on localhost:5500