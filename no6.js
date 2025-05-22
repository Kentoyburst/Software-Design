document.addEventListener('DOMContentLoaded', function() {
    const thesisData = {
        title: "AUTOMATIC TURN SIGNAL FOR MOTOR VEHICLES USING ROAD NAVIGATION APPLICATION",
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
                name: "Mark Joren C. Guinto",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Christian Dale G. Bondoc",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Kaniel Ezekiel Ang Faina",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Rei Rose P. Paras",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Myka G. Puerto",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jan Roi S. Sison",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            }
        ],
        abstract:"One of the causes of the traffic accidents is drivers making sudden and unexpected turns and failing to use their turn signals correctly. This “Automatic Turn Signal for Motor Vehicles using Road Navigation Application” aims to create a device that connects to a road navigation application and automatically activates turn signals of a motor vehicle. The system is designed to control the vehicle’s turn signal lights by detecting the need of turning and assist the user in navigating to the desired location using the directions generated from Google Maps API. This study employed Developmental Quantitative research and Iterative Waterfall method in its development. A control box is installed to a motor vehicle which contains Atmega328P as its main controller, a relay to switch the turn signal lights and a HC-05 module to communicate with the mobile app through Bluetooth technology. System Testing was done toensure that the device is working according to specification, the following were tested: unit testing, communication with the API, turn point detection, communication between hardware and software modules. The results show that the mobile app, control box and the API were successfully integrated.",
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