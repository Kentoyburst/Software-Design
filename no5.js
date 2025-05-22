document.addEventListener('DOMContentLoaded', function() {
    // Updated thesis data for Solar Powered Automated Waste Restraining Device for Sewages
    const thesisData = {
        title: "Automated LCD Masked-Based Lithography PCB Layout Etching System",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "184 pages",
        doi: "10.55549/ceng.1298753",
        authors: [
            {
                name: "Asil Kastle S. Dela Cruz",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Carolyn L. Jimenez",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Arvee L. Domingo",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jhester John M. De Leon",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Angelica B. Manalang",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Hazelyn R. Mendoza",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jovy Abegail D. Sanchez",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Alliah Nhel C. Vitug",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            }
            
        ],
        abstract: "The manual pre-sensitizing method usually takes about 30 minutes to an hour, which is very time-consuming and difficult since finding services that print on acetate film is challenging. Implementing manual procedures is also prone to inaccurate results and even exposes the user to various health and safety hazards. Instead of utilizing an acetate film, a transparent monitor was used as the layout mask by displaying the layout on it and letting the UV light pass through to the transparent areas. Exposing, developing, and etching were automated, which reduced potential risks and hazards. With automation and LCD-Masked Based Lithography, the process of printing layouts on acetate film for layout masking can be eliminated, and printing  layouts can be done safely and conveniently. The system could etch layouts on pre-sensitized PCBs within 16 minutes, faster than the manual method. Etched PCBs have 100% accuracy and 84% precision. Essentially, the system has obtained a weighted mean of 3.69 from the student respondents and 3.57 from the professional respondents, which, based on its equivalent descriptive rating, implies an excellent performance for achieving its objectives .",
        metrics: {
            researchScore: 38.6,
            citations: 8,
            recommendations: 5,
            reads: 3972
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