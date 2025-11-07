const addNote =  document.querySelector(".add-note"),
      popupContainer = document.querySelector(".popup-container"),
      popupContainerHeader = document.querySelector(".popup-container h1"),
      closePopup  = document.querySelector(".popup-top i"),
      addNoteBtn = document.querySelector(".addNote-btn"),
      titleEl = document.querySelector("input"),
      descriptionEl  = document.querySelector("textarea"),
      options = document.querySelector(".options"),
      optionsMenu = document.querySelector(".options-menu")
      optionsMenuContainer = document.querySelector(".options-menu-container")


const months = [
   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
]
let isUpdating 
let isDeleting 
let updateID

let posts =  JSON.parse(localStorage.getItem("posts") || "[]")
console.log(posts)     

function showNote() {
   document.querySelectorAll(".note").forEach(note => note.remove())
   if (posts.length > 0) {
      posts.forEach((post, idx) => {
            const postTag = 
            `<li class="note">
                  <h1>${post.title}</h1>
                  <p class="description">${post.description}</p>
                  <div class="botton-content">
                     <span>${post.month} ${post.day}, ${post.year}</span>
                     <div class="options-menu-container">
                        <i class="fa-solid fa-ellipsis options-menu" onClick="showOptions(this)"></i>
                        <div class="options">
                              <span onClick="editNote(${idx}, '${post.title}',' ${post.description}')" class="option"><i class="fa-solid fa-pen"></i>Edit</span>
                              <span class="option" onClick="deleteNote(${idx})"><i class="fa-solid fa-trash"></i>Delete</span>
                        </div>
                     </div>
                  </div>
            </li>`

            addNote.insertAdjacentHTML("afterend", postTag)
         })
   }
}

function deleteNote(id)  {
   let isDelete = confirm("Are you sure you want to delete the note?")
   if (!isDelete) return;
   posts.splice(id, 1)
   localStorage.setItem("posts", JSON.stringify(posts))
   showNote()
}

function editNote(id, title, description) {
   addNote.click()
   titleEl.value = title
   descriptionEl.value = description
   popupContainerHeader.innerText = "Add a new note"
   addNoteBtn.innerText = "Update"
   titleEl.focus()
   isUpdating = true
   updateID = id
}

function showOptions(ele) {
   const optionsEl = ele.nextElementSibling;
   optionsEl.classList.toggle("show");

   // Remove any previous handler to avoid stacking
   function handleClickOutside(e) {
      if (!optionsEl.contains(e.target) && e.target !== ele) {
         optionsEl.classList.remove("show");
         document.removeEventListener("click", handleClickOutside);
      }
   }
   //setTimeout avoids immediate closing due to event bubbling
   setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
   }, 0);

}

function init(){
   showNote()

}

init()

// event listeners
addNote.addEventListener("click", ()=> {
   popupContainer.classList.add("show")
   addNoteBtn.innerText = "Add note"
   popupContainerHeader.innerText = "Add a new note"
   titleEl.focus()


})

closePopup.addEventListener("click", ()=> {
   popupContainer.classList.remove("show")


})

addNoteBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const title = titleEl.value
    const description = descriptionEl.value
    const dateObj = new Date()
    const day = dateObj.getDate()
    const month = months[dateObj.getMonth()]
    const year = dateObj.getFullYear()
    const postObj = {
      title, description, day, month, year
    }
    if (title || description) {
      if(isUpdating) {
         posts[updateID] = postObj
         isUpdating = false
      } else {
         posts.push(postObj)
      }
       localStorage.setItem("posts", JSON.stringify(posts))
    }
    showNote()
    titleEl.value = ""
    descriptionEl.value = ""
    closePopup.click()
    
})

