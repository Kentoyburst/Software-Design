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

    // View abstract button listeners - Updated to navigate to specific HTML pages
    document.querySelectorAll('.view-abstract-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const paper = savedPapers[index];
            navigateToAbstractPage(paper.title);
        });
    });
}

// Function to navigate to specific abstract pages based on thesis title
function navigateToAbstractPage(title) {
    // Navigate to specific HTML pages based on thesis title (same as browse-thesis.js)
    if (title === "Solar Powered Automated Waste Restraining Device for Sewages") {
        window.location.href = "no1.html";
    } else if (title === "ROBUMBERO: SMART FIREFIGHTING ROBOT") {
        window.location.href = "no2.html";
    } else if (title === "E-CHEQUER: A SMART EXAM -CHECKING MACHINE USING IMAGE PROCESSING TECHNIQUE") {
        window.location.href = "no3.html";
    } else if (title === "DESIGN AND DEVELOPMENT OF AUTOMATED SOLDERING ROBOT MACHINE") {
        window.location.href = "no4.html";
    } else if (title === "Automated LCD Masked-Based Lithography PCB Layout Etching System") {
        window.location.href = "no5.html";
    } else if (title === "AUTOMATIC TURN SIGNAL FOR MOTOR VEHICLES USING ROAD NAVIGATION APPLICATION") {
        window.location.href = "no6.html";
    } else {
        // Fallback to modal for any other papers
        showAbstractModal(savedPapers.find(paper => paper.title === title));
    }
}

// Function to show abstract modal (kept as fallback)
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
