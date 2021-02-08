let btnAdd = document.querySelector("#btnAdd");
let txtNote = document.querySelector("#txtNote");

showNotes();

//Add a new note to localStorage
btnAdd.addEventListener("click", addNote);

function addNote() {
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
}

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
                <div class="title">
                    <h3>Note ${index + 1}</h3>
                    <img src="edit1.png" id=${index} onclick="editNote(this.id)"/>
                </div>
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

//Function to edit a note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let btnAdd = document.querySelector("#btnAdd");
    let saveIndex = document.querySelector("#saveIndex");
    let btnUpdate = document.querySelector("#btnUpdate");
    saveIndex.value = index;
    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    txtNote.value = notesObj[index];
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";

}

let btnUpdate = document.querySelector("#btnUpdate");
btnUpdate.addEventListener("click", () => {
    let notes = localStorage.getItem("notes");

    if (notes === null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let saveIndex = document.querySelector("#saveIndex").value;
    notesObj[saveIndex] = txtNote.value;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    txtNote.value = "";
    btnAdd.style.display = "block";
    btnUpdate.style.display = "none";
});