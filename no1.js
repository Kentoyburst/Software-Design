document.addEventListener('DOMContentLoaded', function() {
    // Updated thesis data for Solar Powered Automated Waste Restraining Device for Sewages
    const thesisData = {
        title: "Solar Powered Automated Waste Restraining Device for Sewages",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "184 pages",
        doi: "10.55549/ceng.1298753",
        authors: [
            {
                name: "Ruby Rosa N. Puno",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Kristine E. Pineda",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jan Michael P. Canlas",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Erick Carl G. Leabres",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Anton Micael O. Mallari",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Marvin S. Mallari",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Mark Allen L. Manlutac",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            }
        ],
        abstract: "In the community, waste is the reason why small-scale sewages or canals are clogging. It is also one of the reasons why floods and long-term floods occur. The study aims to mitigate these specific problems. The research study strived to develop a device specifically for restraining waste floating on a small-scale sewage or canal. Clogged sewage is a blockage of the drainage system that causes the water not to drain, resulting in frequent back-ups such as floods. Blockages are often caused by debris like plastic, dried leaves, pet bottles, etc. The researchers came up with a solution that can help collect substances from clogged sewage to avoid future setbacks. The study proposed a device named 'Solar Powered Automated Waste Restraining Device for Sewages.' This equipment will prevent the sewages from clogging by restraining and collecting debris on a free-flowing canal using an ultrasonic sensor. This device will automatically send notifications using the GSM module to authorized personnel to repeat the process until the sewage system is clogged-free.",
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