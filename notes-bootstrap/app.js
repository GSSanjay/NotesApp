console.log("Hello");
showNotes();

//If user adds a note add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});


//Function to show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes === null) {
        notesObj = []
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
            <div class="noteCard card my-2 mx-2" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
                    <button id=${index} class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
                </div>
            </div>
        `
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show, use add note section to add new notes`
    }
}

//Function to delete a note
function deleteNote(index) {
    console.log("Deleting....", index);
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", () => {
    let inputVal = searchTxt.value;
    console.log("Input event triggered...", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})