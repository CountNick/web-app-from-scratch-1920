export const Data = {
    filter: ( (data, userInput) => {
        const filteredData = data.filter(character =>
            character.name.toLowerCase().includes(userInput.toLowerCase())
          );
        return filteredData
    })
}