
var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteURLInput = document.getElementById("websiteURL");

var BookmarkList = [];

if (localStorage.getItem("bookmarkContainer") !== null) {
    BookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
    displayData();
}

function addBookmark(event) {
    event.preventDefault(); 

    const siteNameRegex = /^.{3,}$/;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    const isSiteNameValid = validateInput(bookmarkNameInput, document.getElementById("bookmarkNameIcon"), siteNameRegex);
    const isURLValid = validateInput(websiteURLInput, document.getElementById("websiteURLIcon"), urlRegex);

    if (!bookmarkNameInput.value || !websiteURLInput.value || !isSiteNameValid || !isURLValid) {
        const validationMessage = `
            <p><strong>Site Name or URL is not valid. Please follow the rules below:</strong></p>
            <ul>
                <li><i class="fa-solid fa-arrow-right arrow-icon"></i> Site name must contain at least 3 characters.</li>
                <li><i class="fa-solid fa-arrow-right arrow-icon"></i> Site URL must be a valid one.</li>
               
            </ul>
        `;
        document.getElementById("validationMessage").innerHTML = validationMessage;

        const validationModal = new bootstrap.Modal(document.getElementById("validationModal"));
        validationModal.show();
        return; 
    }

    const Bookmark = {
        bookmarkName: bookmarkNameInput.value,
        websiteURL: websiteURLInput.value,
    };

    BookmarkList.push(Bookmark);
    localStorage.setItem("bookmarkContainer", JSON.stringify(BookmarkList));
    displayData();
    clearform();
}


function displayData() {
    var container = ""; 

    for (var i = 0; i < BookmarkList.length; i++) {
        container += `
            <tr>
                <td>${i + 1}</td>
                <td>${BookmarkList[i].bookmarkName}</td>
                <td><a href="${BookmarkList[i].websiteURL}" target="_blank" class="button1"><i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button onclick="deleteitem(${i})" class="button2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `;
    }

    document.getElementById('bookmarkTable').innerHTML = container;
}

function clearform() {
    bookmarkNameInput.value = null;
    websiteURLInput.value = null;
    document.getElementById("bookmarkNameIcon").innerHTML = '';
    document.getElementById("websiteURLIcon").innerHTML = '';
    bookmarkNameInput.style.boxShadow = '';
    websiteURLInput.style.boxShadow = '';
}

function deleteitem(index) {
    BookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkContainer", JSON.stringify(BookmarkList));
    displayData();
}

function validateInput(input, iconElement, regex) {
    if (regex.test(input.value)) {
    
        input.style.boxShadow = "0 0 5px green"; 
        iconElement.innerHTML = '<i class="fa-solid fa-check check-icon"></i>'; 
        return true;
    } else {
       
        input.style.boxShadow = "0 0 5px red";   
        iconElement.innerHTML = '<i class="fa-solid fa-exclamation exc-icon"></i>'; 
        return false;
    }
}

bookmarkNameInput.addEventListener('input', function() {
    validateInput(bookmarkNameInput, document.getElementById("bookmarkNameIcon"), /^.{3,}$/); 
});

websiteURLInput.addEventListener('input', function() {
    validateInput(websiteURLInput, document.getElementById("websiteURLIcon"), /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/);
});
