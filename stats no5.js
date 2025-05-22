document.addEventListener('DOMContentLoaded', function() {
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
        stats: {
            views: 3972,
            citations: 8,
            downloads: 621,
            recommendations: 5,
            geoData: {
                "Philippines": 58,
                "United States": 15,
                "Germany": 10,
                "China": 7,
                "Other": 10
            },
            demographics: {
                academic: {
                    "Students": 40,
                    "Faculty": 20,
                    "Researchers": 15,
                    "Industry": 25
                },
                field: {
                    "Engineering": 48,
                    "Electronics": 22,
                    "Computer Science": 20,
                    "Other": 10
                }
            },
            readsOverTime: [
                { date: "Apr 3", reads: 90 },
                { date: "Apr 4", reads: 120 },
                { date: "Apr 5", reads: 160 },
                { date: "Apr 6", reads: 180 },
                { date: "Apr 7", reads: 110 },
                { date: "Apr 8", reads: 130 },
                { date: "Apr 9", reads: 100 }
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

    // Handle action buttons
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
    if (accessRequestForm) {
        accessRequestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const message = document.getElementById('request-message').value;
            
            // In a real application, this would send the request to a server
            alert(`Access request submitted with message: ${message}`);
            
            // Close the modal and reset form
            requestModal.style.display = 'none';
            accessRequestForm.reset();
        });
    }

    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', function() {
        alert('Share options would appear here');
        // In a real application, this would show sharing options
    });

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