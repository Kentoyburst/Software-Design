document.addEventListener('DOMContentLoaded', function() {
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
        stats: {
            views: 6532,
            citations: 12,
            downloads: 854,
            recommendations: 8,
            geoData: {
                "Philippines": 65,
                "United States": 12,
                "Japan": 8,
                "Singapore": 6,
                "Other": 9
            },
            demographics: {
                academic: {
                    "Students": 45,
                    "Faculty": 25,
                    "Researchers": 20,
                    "Industry": 10
                },
                field: {
                    "Engineering": 55,
                    "Computer Science": 25,
                    "Robotics": 15,
                    "Other": 5
                }
            },
            readsOverTime: [
                { date: "Apr 3", reads: 165 },
                { date: "Apr 4", reads: 210 },
                { date: "Apr 5", reads: 255 },
                { date: "Apr 6", reads: 285 },
                { date: "Apr 7", reads: 180 },
                { date: "Apr 8", reads: 225 },
                { date: "Apr 9", reads: 195 }
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
    downloadBtn.addEventListener('click', function() {
        alert('Downloading thesis...');
        // In a real application, this would initiate a download
    });

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