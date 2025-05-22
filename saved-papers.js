const savedPapersContainer = document.querySelector('.saved-papers-container');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('saved-papers-search');
const searchButton = document.getElementById('search-btn');

// Modal elements
const abstractModal = document.getElementById('abstractModal');
const modalClose = document.querySelector('.thesis-modal-close');
const modalTitle = document.getElementById('modalThesisTitle');
const modalAuthors = document.getElementById('modalThesisAuthors');
const modalAbstract = document.getElementById('modalThesisAbstract');

// Get saved papers from localStorage
let savedPapers = JSON.parse(localStorage.getItem('savedPapers')) || [];

// Function to render saved papers
function renderSavedPapers(papers) {
    // Clear existing papers
    savedPapersContainer.innerHTML = '';

    if (papers.length === 0) {
        emptyState.style.display = 'block';
        savedPapersContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        savedPapersContainer.style.display = 'grid';

        papers.forEach((paper, index) => {
            const paperElement = document.createElement('div');
            paperElement.className = 'saved-paper';
            paperElement.innerHTML = `
                <div class="paper-image">
                    <img src="${paper.image || 'img/paper-thumbnail.png'}" alt="${paper.title}">
                </div>
                <div class="paper-details">
                    <h3>${paper.title}</h3>
                    <p>${paper.authors}</p>
                </div>
                <div class="paper-actions">
                    <button class="action-btn view-abstract-btn" data-index="${index}">
                        <i class="fas fa-file-alt"></i> View Abstract
                    </button>
                    <button class="action-btn remove-btn" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            `;
            savedPapersContainer.appendChild(paperElement);
        });

        // Add event listeners to buttons
        setupButtonListeners();
    }
}

// Function to setup button event listeners
function setupButtonListeners() {
    // Remove button listeners
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeSavedPaper(index);
        });
    });

    // View abstract button listeners
    document.querySelectorAll('.view-abstract-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showAbstractModal(savedPapers[index]);
        });
    });
}

// Function to show abstract modal
function showAbstractModal(paper) {
    // Populate modal content
    modalTitle.textContent = paper.title;
    modalAuthors.textContent = paper.authors;
    modalAbstract.textContent = paper.abstract || "Abstract not available for this paper.";
    
    // Show modal
    abstractModal.style.display = 'block';
}

// Function to remove a saved paper
function removeSavedPaper(index) {
    savedPapers.splice(index, 1);
    localStorage.setItem('savedPapers', JSON.stringify(savedPapers));
    showNotification('Paper removed from saved list.');
    renderSavedPapers(savedPapers);
}

// Search functionality
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPapers = savedPapers.filter(paper => 
        paper.title.toLowerCase().includes(searchTerm) || 
        paper.authors.toLowerCase().includes(searchTerm)
    );
    renderSavedPapers(filteredPapers);
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e74c3c;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.5s, fadeOut 0.5s 2.5s forwards;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        abstractModal.style.display = 'none';
    });
}

window.addEventListener('click', (event) => {
    if (event.target === abstractModal) {
        abstractModal.style.display = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderSavedPapers(savedPapers);
});