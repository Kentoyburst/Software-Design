document.addEventListener('DOMContentLoaded', function() {
    const thesisData = {
        title: "DESIGN AND DEVELOPMENT OF AUTOMATED SOLDERING ROBOT MACHINE",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "47 pages",
        doi: "10.55549/ceng.1298754",
        authors: [
            {
                name: "Ruby Rosa N. Puno",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Asil Kastle S. Dela Cruz",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Humphrey John S. Alarios",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Toby R. Castro",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "John Patrick S. Guiao",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Cassell L. Lozano",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "John Mark V. Pangilinan",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Avie D. Sanchez",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
        ],
        stats: {
            views: 4215,
            citations: 12,
            downloads: 587,
            recommendations: 7,
            geoData: {
                "Philippines": 62,
                "United States": 15,
                "China": 10,
                "Germany": 5,
                "Other": 8
            },
            demographics: {
                academic: {
                    "Students": 48,
                    "Faculty": 22,
                    "Researchers": 18,
                    "Industry": 12
                },
                field: {
                    "Engineering": 50,
                    "Computer Science": 28,
                    "Electronics": 17,
                    "Other": 5
                }
            },
            readsOverTime: [
                { date: "Apr 3", reads: 150 },
                { date: "Apr 4", reads: 200 },
                { date: "Apr 5", reads: 230 },
                { date: "Apr 6", reads: 215 },
                { date: "Apr 7", reads: 180 },
                { date: "Apr 8", reads: 160 },
                { date: "Apr 9", reads: 175 }
            ]
        }
    };

    // Populate the page with thesis data
    document.getElementById('thesis-title').textContent = thesisData.title;
    document.getElementById('thesis-date').textContent = thesisData.date;
    document.getElementById('thesis-publication').textContent = thesisData.publication;
    document.getElementById('thesis-pages').textContent = thesisData.pages;
    document.getElementById('thesis-doi-link').textContent = thesisData.doi;
    
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

    // Handle time filter buttons for reads graph
    const timeFilterBtns = document.querySelectorAll('.time-filter-btn');
    timeFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timeFilterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, this would update the graph based on the selected time period
            const period = this.getAttribute('data-period');
            console.log(`Selected time period: ${period}`);
            // updateReadsGraph(period); // This function would be implemented to update the graph
        });
    });

    // Handle download button click - Request access modal
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

    // Handle share button
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
        alert('Share options would appear here');
        // In a real application, this would show sharing options
    });

    // Handle more button
    const moreBtn = document.querySelector('.more-btn');
    moreBtn.addEventListener('click', function() {
        alert('More options would appear here');
        // In a real application, this would show more options
    });

    // Handle secondary action buttons
    const recommendBtn = document.querySelector('.recommend-btn');
    recommendBtn.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommend';
            // In a real application, this would update the recommendation count
        } else {
            this.classList.add('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommended';
            // In a real application, this would update the recommendation count
        }
    });

    const followBtn = document.querySelector('.follow-btn');
    followBtn.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerHTML = '<i class="fas fa-bell"></i> Follow';
        } else {
            this.classList.add('active');
            this.innerHTML = '<i class="fas fa-bell-slash"></i> Following';
        }
    });

    const shareMsgBtn = document.querySelector('.share-msg-btn');
    shareMsgBtn.addEventListener('click', function() {
        alert('Share in message options would appear here');
        // In a real application, this would show share in message options
    });
});