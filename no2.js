document.addEventListener('DOMContentLoaded', function() {
    // Updated thesis data for Robumbero: Smart Firefighting Robot
    const thesisData = {
        title: "ROBUMBERO: SMART FIREFIGHTING ROBOT",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "29 pages",
        doi: "10.55549/ceng.1298754",
        authors: [
            {
                name: "Asil Kastle S. Dela Cruz",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Grosby A. Dela Cruz",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Karl Angelo T. Garcia",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Yashtroi Jerwin C. Oriel",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Karl Martin G. Perez",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "John Niel L. Pineda",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Kendrich S. Tienzo",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            }
        ],
        abstract: "This study aimed to develop a fire-fighting robot called Robumbero. This smart fire-fighting robot can be operated automatically or manually using a remote control. It can extinguish fires at an early phase without the actual presence of the firefighters and without exposing one's self to the danger of fire. It is equipped with an ABC fire extinguisher, and sensors to detect fire and obstructions. It also has a camera that allows users to have a real-time view of the robot's surroundings for easy manipulation. The robot's overall performance was assessed using a descriptive research method. It was evaluated by the twenty students and employees from Don Honorio Venture State University, BFP and ten engineers. The data obtained were analyzed and it was revealed that the robot has met all the criteria of ISO25010 and that its overall performance can be deemed efficient and effective.",
        metrics: {
            researchScore: 42.5,
            citations: 12,
            recommendations: 8,
            reads: 4215
        }
    };

    // Populate the page with thesis data
    document.getElementById('thesis-title').textContent = thesisData.title;
    document.getElementById('thesis-date').textContent = thesisData.date;
    document.getElementById('thesis-publication').textContent = thesisData.publication;
    document.getElementById('thesis-pages').textContent = thesisData.pages;
    document.getElementById('thesis-doi-link').textContent = thesisData.doi;
    document.getElementById('abstract-content').textContent = thesisData.abstract;
    
    // Set metrics
    document.getElementById('research-score').textContent = thesisData.metrics.researchScore;
    document.getElementById('citations-count').textContent = thesisData.metrics.citations;
    document.getElementById('recommendations-count').textContent = thesisData.metrics.recommendations;
    document.getElementById('reads-count').textContent = thesisData.metrics.reads.toLocaleString();

    // Populate authors
    const authorsContainer = document.getElementById('thesis-authors');
    thesisData.authors.forEach(author => {
        const authorElement = document.createElement('div');
        authorElement.className = 'author';
        
        // Create the avatar
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'author-avatar';
        
        // Use user icon if no avatar image
        if (author.avatar) {
            const avatarImg = document.createElement('img');
            avatarImg.src = author.avatar;
            avatarImg.alt = author.name;
            avatarDiv.appendChild(avatarImg);
        } else {
            const avatarIcon = document.createElement('i');
            avatarIcon.className = 'fas fa-user';
            avatarDiv.appendChild(avatarIcon);
        }
        
        // Create author info
        const authorInfo = document.createElement('div');
        authorInfo.className = 'author-info';
        
        const authorName = document.createElement('span');
        authorName.className = 'author-name';
        authorName.textContent = author.name;
        
        const authorAffiliation = document.createElement('span');
        authorAffiliation.className = 'author-affiliation';
        authorAffiliation.textContent = author.affiliation;
        
        authorInfo.appendChild(authorName);
        authorInfo.appendChild(authorAffiliation);
        
        // Add all elements to the author container
        authorElement.appendChild(avatarDiv);
        authorElement.appendChild(authorInfo);
        
        authorsContainer.appendChild(authorElement);
    });

    // Handle download button click
    const downloadBtn = document.querySelector('.download-btn');
    const requestModal = document.getElementById('requestModal');
    const closeModalBtn = document.querySelector('.thesis-modal-close');
    
    downloadBtn.addEventListener('click', function() {
        requestModal.style.display = 'block';
    });
    
    closeModalBtn.addEventListener('click', function() {
        requestModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == requestModal) {
            requestModal.style.display = 'none';
        }
    });
    
    // Handle access request form submission
    const accessRequestForm = document.getElementById('access-request-form');
    accessRequestForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const message = document.getElementById('request-message').value;
        
        // In a real application, this would send the request to a server
        alert(`Access request submitted with message: ${message}`);
        
        // Close the modal and reset form
        requestModal.style.display = 'none';
        accessRequestForm.reset();
    });

    // Implement interactions for secondary action buttons
    const recommendBtn = document.querySelector('.recommend-btn');
    const followBtn = document.querySelector('.follow-btn');
    const shareBtn = document.querySelector('.share-btn');
    
    recommendBtn.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommend';
            document.getElementById('recommendations-count').textContent = 
                (parseInt(document.getElementById('recommendations-count').textContent) - 1).toString();
        } else {
            this.classList.add('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommended';
            document.getElementById('recommendations-count').textContent = 
                (parseInt(document.getElementById('recommendations-count').textContent) + 1).toString();
        }
    });
    
    followBtn.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerHTML = '<i class="fas fa-bell"></i> Follow';
        } else {
            this.classList.add('active');
            this.innerHTML = '<i class="fas fa-bell-slash"></i> Following';
        }
    });
    
    shareBtn.addEventListener('click', function() {
        alert('Share options would appear here');
    });
});