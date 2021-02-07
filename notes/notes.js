let btnAdd = document.querySelector("#btnAdd");
showNotes();

//Add a new note to localStorage
btnAdd.addEventListener("click", () => {
    let txtNote = document.querySelector("#txtNote");
    console.log("Clicked..");
    console.log(txtNote.value);
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(txtNote.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    txtNote.value = "";
    showNotes();
});

//Function to show notes from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = " ";
    notesObj.forEach((element, index) => {
        html += `
        <article class="note">
                <h3>Note ${index + 1}</h3>
                <hr>
                <p>${element}</p>
                <button id=${index} class="btn-delete" onclick="deleteNote(this.id)">Delete Note</button>
        </article>
        `
    });
    let notesElem = document.querySelector("#notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `No notes to show, use above section to add new note`;
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

//To search a note
let txtSearch = document.getElementById("txtSearch");
txtSearch.addEventListener("input", () => {
    let inputVal = txtSearch.value;
    console.log("Input event triggered...", inputVal);
    let noteCards = document.getElementsByClassName("note");
    Array.from(noteCards).forEach((element) => {
        let txtCard = element.getElementsByTagName("p")[0].innerText;
        // console.log(txtCard);
        if (txtCard.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})