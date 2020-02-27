export const Data = {
    filter: ( (data, userInput) => {
        const filteredData = data.filter(character =>
            character.name.toLowerCase().includes(userInput.toLowerCase())
          );
        return filteredData
    }),
    transform: ( (data) => {
    // Make a new array;
    const allCharacters = data.map(d => {
        // Only return the resulsta as this is the data I will be using to make the application
        return d.results
    }).reduce( (concatenatedArray, originalArray) => {
        // Concatenate each array into one array
        return concatenatedArray.concat(originalArray);
    })
    // Return the new array
    return allCharacters
    }),
    paginateData: ( (array, page_size, page_number) => {
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
        }
      })
}