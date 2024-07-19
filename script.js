document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('messageScreen').style.display = 'block';
});

document.getElementById('continueButton').addEventListener('click', function() {
    document.getElementById('messageScreen').style.display = 'none';
    document.getElementById('noteScreen').style.display = 'block';
});

document.getElementById('menuIcon').addEventListener('click', function() {
    const noteMenu = document.getElementById('noteMenu');
    noteMenu.style.display = noteMenu.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('saveButton').addEventListener('click', function() {
    const noteInput = document.getElementById('noteInput').value.trim();
    if (noteInput) {
        addNoteToList(noteInput);
        document.getElementById('noteInput').value = '';
    }
});

function addNoteToList(note) {
    const noteList = document.getElementById('noteList');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${note}</span>
        <span class="icon editIcon">&#x270E;</span>
        <span class="icon deleteIcon">&#x1F5D1;</span>
    `;
    
    noteList.appendChild(li);
}

document.getElementById('noteList').addEventListener('click', function(event) {
    if (event.target.classList.contains('editIcon')) {
        const noteText = prompt('Editar nota:', event.target.previousElementSibling.innerText);
        if (noteText) {
            event.target.previousElementSibling.innerText = noteText;
            // document.getElementById('noteInput').textContent = noteText;
        }
    }
    
    if (event.target.classList.contains('deleteIcon')) {
        if (confirm('Tem certeza que deseja apagar esta nota?')) {
            event.target.parentElement.remove();
        }
    }
});