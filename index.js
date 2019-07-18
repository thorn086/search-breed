'use strict';


function submitForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchChoice = document.getElementById("search").value;
        let breed = searchChoice.toLowerCase();
        $('.three').removeClass('hidden');
        loadImages(breed);
        resetForm();
    });
}


function displayImages(dogImageJson){
    $('.results-img').empty();
    console.log(dogImageJson);
    let x = `<img src="${dogImageJson.message[0]}" alt=" Dog Breed Image">`;
    
    $('.results-img').append(x);
}

function error(dogImageJson){
    console.log(dogImageJson);
    $('.results-img').empty();
    $('.results-img').append(`<div id="error"> <p>Opps!</p> ${dogImageJson.message}</div>`);
}

function loadImages(breed) {
    fetch("https://dog.ceo/api/breed/"+`${breed}`+"/images")
        .then(dogImage => dogImage.json())
        .then(dogImageJson => {
            if (dogImageJson.status == "error") {
              error(dogImageJson);
            } else {
              displayImages(dogImageJson);
            }
          })
}



function resetForm(){
    $('form').trigger('reset');
}


$(function () {
    console.log('app loaded, ready for submition');
    loadImages("hound");
    submitForm();
});