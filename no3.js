document.addEventListener('DOMContentLoaded', function() {
    // Updated thesis data for E-CHEQUER: A Smart Exam-Checking Machine Using Image Processing Technique
    const thesisData = {
        title: "E-CHEQUER: A Smart Exam-Checking Machine Using Image Processing Technique",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "87 pages",
        doi: "10.55549/ceng.1298754",
        authors: [
            {
                name: "Ruby Rosa N. Puno",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Yuen A. Nicdao",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Christian Devan Sen Deinla",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Gabriel Hernandez",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Milongy Javier",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Dhenzel Macalino",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Renniel Ocampo",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jobert Santos",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Gio Sicat",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            }
        ],
        abstract: "This study developed an E-Chequer: A Smart Exam-Checking Machine Using Image Processing Technique. The research aims to identify the feasibility and effectiveness of using image processing techniques for automated exam grading among secondary level teachers in public schools. Specifically, it aims to (1) to develop a system that will help secondary-level teachers in terms of functionality, reliability, efficiency, and usability in checking the exams, (2) to identify the significant differences between the conventional way and the designed project in terms of checking exams. (3) to build a machine that will help the secondary level teachers lessen their workload. A great significance of this study is speed and efficiency when it comes to checking, assessment and data analysis of the students' exam papers. A machine can check a large amount of papers in a small amount of time compared to a human teacher. A Developmental Research Method concept was employed with 15 preliminary respondents and 13 evaluators, that includes secondary level teachers and professionals. The data were analyzed using statistical analysis. The device obtained an error rate of 1.33%, a precision of 100%, a recall of 96%, and an F1 score of 97.96%. Moreover, the accuracy of the device, based on the calculated Precision, Recall, and F1 Score, is 96%. The overall rating for the design project is 4.25 out of 5, showing that the respondents AGREE that the device meets the standard features and characteristics for property evaluation and serves the needs of the stakeholders, and so holds value. The device can perform bulk checking, and the scanning rate is only 9 exam papers per minute. Also, it only accepts A5 paper size and is limited to the customized answer sheet and 50 items only. For the volume of the exam paper, it can handle a maximum of 50 exam papers in one go. The contributing factors to paper jams include the quality and condition of the paper used and incorrect loading of the paper tray.",
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