"use strict";

import { Router } from './modules/router.js'

const App = {
    init: ( () => {
        Router.handle()
    })()
}




function paginate(data){
    //https://herecodesnothing.com/2019/05/27/learn-by-doing-pagination-in-vanilla-javascript/
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    const currentPage = document.getElementById('current-page');
    const totalPages = document.getElementById('total-pages');
    const perPage = 10;

    let currentPageNumber = 1;

    console.log(previousButton)
    console.log(nextButton)
    
    const totalPageCount = Math.ceil(data.length / perPage)

    totalPages.textContent = totalPageCount

    nextButton.addEventListener('click', () => {
        currentPageNumber++
    })
    
    previousButton.addEventListener('click', () => {
        currentPageNumber--
    })

    function updatePaging(){

        currentPage.textContent = currentPageNumber;
        const pagingOptions = {
            currentPageNumber: currentPageNumber,
            perPage: perPage
        }

        callback(pagingOptions)

        nextButton.disabled = currentPageNumber === totalPageCount;
        previousButton.disabled = currentPageNumber === 1;

    }
}

function storeData(data){
    localStorage.setItem('saveData', JSON.stringify(data))

    let retrieveData = JSON.parse(localStorage.getItem('saveData'))
    // localStorage.removeItem('saveData')
    console.log(retrieveData)

    return retrieveData
}
