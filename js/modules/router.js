import { API } from './api.js'
import { Render } from './render.js'

export const Router = {

    handle: (async() => {
        const allData = await API.getData().catch(err => console.log(err))
        const transformedData = API.transformData(allData)
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

