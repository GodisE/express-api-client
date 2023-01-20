import { indexPerson, createPerson, showPerson, updatePerson, deletePerson } from "./api.js";
import { onIndexPersonSuccess, 
         onFailure, 
         onCreatePersonSuccess, 
         onShowPersonSuccess ,
         onUpdatePersonSuccess,
         onDeletePersonSuccess
        } from 
"./ui.js";
//grabbing from html
const createPersonForm = document.querySelector("#create-character-form")
const indexPersonContainer = document.querySelector("#index-person-container")
const showPersonContainer = document.querySelector("#show-person-container")



indexPerson()
  .then((res) => res.json())
  .then((res) => onIndexPersonSuccess(res.person))
  .catch(onFailure);



createPersonForm.addEventListener("submit", (event) => {
    //stops page from reloading once submit is clicked
    event.preventDefault()
    const personData = {
        person: {
            //grabbing by input name from html
            firstName: event.target['firstName'].value,
            lastName: event.target['lastName'].value,
            age: event.target['age'].value

        }
    }
    createPerson(personData)
    .then(onCreatePersonSuccess)
    .catch(onFailure)
})

indexPersonContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")

    if (!id) return

    showPerson(id)
    .then((res) => res.json())
    .then(res => {
        onShowPersonSuccess(res.person)
    })
    .catch(onFailure)
})


showPersonContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    if (!id) return
    const personData = {
        person: {
            firstName: event.target['firstName'].value,
			lastName: event.target['lastName'].value,
            age: event.target['age'].value,
        }
    }
    updatePerson(personData, id)
    .then(onUpdatePersonSuccess)
    .catch(onFailure)
})


showPersonContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")

    if (!id) return

    deletePerson(id)
        .then(onDeletePersonSuccess)
        .catch(onFailure)
})