document.addEventListener('DOMContentLoaded', function() {
    let notes = [];

    // Event listener for the "Comece Agora" button
    document.getElementById('startButton').addEventListener('click', function() {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('messageScreen').style.display = 'block';
    });

    // Event listener for the "Continuar" button
    document.getElementById('continueButton').addEventListener('click', function() {
        document.getElementById('messageScreen').style.display = 'none';
        document.getElementById('noteScreen').style.display = 'block';
        document.getElementById('defaultOpen').click(); // Open the default tab
    });

    // Event listener for the menu icon
    document.getElementById('menuIcon').addEventListener('click', function() {
        const noteMenu = document.getElementById('noteMenu');
        noteMenu.style.display = noteMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Event listener for the save button
    document.getElementById('saveButton').addEventListener('click', function() {
        const noteInput = document.getElementById('noteInput').value.trim();
        if (noteInput) {
            addNoteToList(noteInput);
            document.getElementById('noteInput').value = '';
        }
    });

    // Function to add note to the list
    function addNoteToList(note) {
        const noteList = document.getElementById('noteList');
        const li = document.createElement('li');
        const noteId = new Date().getTime().toString();
        notes.push({ id: noteId, content: note });
        
        li.innerHTML = `
            <span data-id="${noteId}">${note}</span>
            <span class="icon editIcon" data-id="${noteId}">&#x270E;</span>
            <span class="icon deleteIcon" data-id="${noteId}">&#x1F5D1;</span>
        `;
        
        noteList.appendChild(li);
    }

    // Event listener for the note list
    document.getElementById('noteList').addEventListener('click', function(event) {
        if (event.target.classList.contains('editIcon')) {
            const noteId = event.target.getAttribute('data-id');
            const note = notes.find(note => note.id === noteId);
            if (note) {
                document.getElementById('noteInput').value = note.content;
                openTab(null, 'anotar'); // Open the "Anotar" tab when editing
            }
        }
        
        if (event.target.classList.contains('deleteIcon')) {
            const noteId = event.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja apagar esta nota?')) {
                notes = notes.filter(note => note.id !== noteId);
                event.target.parentElement.remove();
            }
        }
    });

    // Function to handle tab navigation
    window.openTab = function(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.backgroundColor = "";
        }
        document.getElementById(tabName).style.display = "block";
        if (evt) {
            evt.currentTarget.style.backgroundColor = "#ccc";
        }
    }

    // Open the default tab on page load
    document.getElementById("defaultOpen").click();
});
