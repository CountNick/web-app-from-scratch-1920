export const Render = {
  allCharacters: (data, userInput) => {
    const homeSection = document.querySelector(".home");

    Render.removeCharacters(homeSection);
    // Initialize search function

    Render.updateUI("home");

    const nextButton = document.getElementById("nextButton");
    const previousButton = document.getElementById("previousButton");

    let currPage = document.getElementById("current-page");
    const totalPages = document.getElementById("total-pages");

    // console.log(Render.paginate(data, 10, 1))

    // resource ternary operator: https://stackoverflow.com/questions/19271755/is-there-an-alternative-to-using-if-else-statements
    // Check if userInput is undefined, if so set userInput to empty string, otherwise use value given by the user and remove unneccessary characters
    userInput = userInput == undefined ? (userInput = "") : userInput;

    const filteredData = data.filter(character =>
      character.name.toLowerCase().includes(userInput.toLowerCase())
    );
    //Guido helped me do this

    let pageNr = 1;

    function nextPage() {
    Render.removeCharacters(homeSection)
      pageNr += 1;
      pagination(pageNr)
    }

    function previousPage() {
    Render.removeCharacters(homeSection)
      pageNr--;
      pagination(pageNr)
        
    }

    nextButton.addEventListener("click", nextPage)
    previousButton.addEventListener("click", previousPage)
    

    pagination(pageNr)

    function pagination(num) {
        let paginatedData = Render.paginate(filteredData, 10, num);
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

        homeSection.appendChild(article);
      });
    }

    Render.search(data, userInput);
    Render.noSearchResults(homeSection, userInput);
  },
  removeCharacters: section => {
    //resource used: https://medium.com/front-end-weekly/remove-all-children-of-the-node-in-javascript-968ad8f120eb
    // Remove all characters from the DOM
    section.querySelectorAll("*").forEach(character => character.remove());
  },
  search: (data, userInput) => {
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
  },
  updateUI: route => {
    const sections = document.querySelectorAll("main section");
    sections.forEach(section => {
      section.classList.remove("active");
    });
    const activeSection = document.querySelector(`[data-route=${route}]`);
    console.log(activeSection);
    activeSection.classList.add("active");
  },
  characterDetail: (id, data) => {
    Render.updateUI("details");

    const detailsSection = document.querySelector(".details");
    // remove all unneccessary characters
    Render.removeCharacters(detailsSection);
    // Removes the hash from the start of id and converts it to a number
    id = +id.substring(1);
    // creates a new section element
    let article = document.createElement("article");
    // find the character from the dataset which id matches the id in the url
    const result = data.find(character => character.id === id);

    console.log(result);

    // Inject a img, h1, p, etc. into the section and fill these with the found character's data
    article.insertAdjacentHTML(
      "afterbegin",
      `<a = a href='#'}><img src=${result.image}>
       <h1>${result.name}</h1>
       <p>Status: ${result.status}</p>
       <p>Species: ${result.species}</p>
       <p>Gender: ${result.gender}</p>
       <p>Origin: ${result.origin.name}</p>
       <p>Lives in: ${result.location.name}</p>
       `
    );
    // Append the section to the main tag in the DOM
    detailsSection.appendChild(article);
  },
  noSearchResults: (section, userInput) => {
    if (section.hasChildNodes() <= 0) {
      let h1 = document.createElement("h1");
      h1.textContent = `no characters found with ${userInput}`;
      section.appendChild(h1);
    }
  },
  paginate: (array, page_size, page_number) => {
    const total_pages = Math.ceil(array.length / page_size);
    const paginatedItems = array.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
    let page = page_number;

    return {
      page: page_number,
      total: array.length,
      total_pages: total_pages,
      per_page: page_size,
      prev_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      data: paginatedItems
    };
  }
};