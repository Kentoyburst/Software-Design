document.addEventListener('DOMContentLoaded', function() {
    // Updated thesis data for E-CHEQUER: A Smart Exam-Checking Machine Using Image Processing Technique
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
        abstract: "The Soldering Robot Machine was a clever, portable automated PCB assembly equipment that was the subject of this research project. The tool uses Arksoft Mach3 and Aspire software to drill and solder holes using the G-Code programming language. The researchers used a descriptive and experimental design method, drawing on their experience integrating hardware and software, and they iteratively tried and failed to create the device. PCB enthusiasts, designers, and experts evaluated the Soldering Robot Machine to determine its usability, functionality, portability, reliability, and efficiency. The obtained results from the evaluation were utilized to describe the device, ascertain its functionality, and establish its acceptability. The device was described, its functionality was established, and its acceptance was established using the evaluation findings that were received. Various electronic and electrical components were used o build the device, and experimental design showed it has successfully located processes and performed drilling characterization, proving its potential for PCBmanufacture.",
        metrics: {
            researchScore: 42.8,
            citations: 12,
            recommendations: 7,
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