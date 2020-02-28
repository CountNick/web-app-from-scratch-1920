import { API } from './api.js'
import { Render } from './render.js'
import { Data } from './data.js'

export const Router = {

    handle: (async() => {
        const allData = await API.getData().then(Render.loading()).catch(err => console.log(err))
        const transformedData = Data.transform(allData)
    
        routie({
            '': () => {
                Render.allCharacters(transformedData)             
            },
            'character/:id': (id) => {
                Render.characterDetail(id, transformedData)   
            }
        })
      })
    }