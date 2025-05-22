document.addEventListener('DOMContentLoaded', function() {
    // Thesis data for Robumbero: Smart Firefighting Robot
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
        citations: [
            {
                title: "Advancements in Automated Fire Detection and Suppression Systems",
                authors: "D. Nakamura, L. Chen, J. Patel",
                date: "March 2024",
                journal: "International Journal of Robotics Research",
                excerpt: "\"The ROBUMBERO design by Dela Cruz et al. (2023) provides an innovative approach to early fire detection in educational institutions, incorporating both automatic and manual control systems that can significantly reduce response time...\"",
                url: "#"
            },
            {
                title: "Integrating IoT and Robotics for Emergency Response Systems",
                authors: "M. Johnson, R. Gomez, S. Williams",
                date: "February 2024",
                journal: "Smart Technology Applications",
                excerpt: "\"Dela Cruz et al.'s ROBUMBERO (2023) demonstrates the practical implementation of multi-sensor arrays for fire detection, with their evaluation showing promising results for deployment in university settings...\"",
                url: "#"
            },
            {
                title: "Comparative Analysis of Firefighting Robots for Indoor Applications",
                authors: "A. Lee, H. Garcia, B. Voss",
                date: "January 2024",
                journal: "Fire Safety Journal",
                excerpt: "\"Among recent designs, the ROBUMBERO system (Dela Cruz et al., 2023) stands out for its dual control capabilities and real-time camera feed, allowing for effective remote operation in hazardous environments...\"",
                url: "#"
            },
            {
                title: "Educational Institution Fire Safety: Technology-Based Approaches",
                authors: "S. Kim, F. Rodriguez, T. Nguyen",
                date: "December 2023",
                journal: "Risk Management in Public Facilities",
                excerpt: "\"The evaluation of ROBUMBERO by Dela Cruz et al. (2023) with BFP personnel provides valuable insights into the practical application of robotics for fire suppression in academic environments...\"",
                url: "#"
            },
            {
                title: "Autonomous Systems for Early Fire Detection and Intervention",
                authors: "J. Wilson, C. Takahashi, E. Kowalski",
                date: "November 2023",
                journal: "Automation & Control Systems",
                excerpt: "\"The obstacle avoidance system implemented in ROBUMBERO (Dela Cruz et al., 2023) demonstrates an effective approach to navigating complex indoor environments during fire emergencies...\"",
                url: "#"
            },
            {
                title: "Cost-Effective Robotics for Fire Safety in Developing Countries",
                authors: "R. Sharma, O. Mensah, P. Diaz",
                date: "October 2023",
                journal: "Engineering Solutions for Disaster Management",
                excerpt: "\"ROBUMBERO's design (Dela Cruz et al., 2023) provides a replicable model for institutions seeking affordable yet effective fire response systems, particularly in regions with limited fire service resources...\"",
                url: "#"
            },
            {
                title: "Human-Robot Collaboration in Emergency Response Scenarios",
                authors: "B. Thompson, L. Wang, K. Okafor",
                date: "September 2023",
                journal: "International Conference on Safety Robotics",
                excerpt: "\"The remote control interface of ROBUMBERO (Dela Cruz et al.) demonstrates thoughtful consideration of human factors in emergency response, balancing automation with human oversight...\"",
                url: "#"
            },
            {
                title: "Real-time Vision Systems for Fire Detection Robots",
                authors: "G. Singh, M. Lopez, A. Schwarzenegger",
                date: "August 2023",
                journal: "Computer Vision Applications",
                excerpt: "\"The implementation of ESP32+Cam in the ROBUMBERO system by Dela Cruz et al. provides a cost-effective solution for real-time visual feedback in fire detection systems...\"",
                url: "#"
            },
            {
                title: "Performance Analysis of ABC-Type Fire Extinguishers in Robotic Applications",
                authors: "Y. Chen, S. Kareem, G. Petersen",
                date: "July 2023",
                journal: "Fire Suppression Technology Review",
                excerpt: "\"Upcoming research by Dela Cruz and colleagues at Don Honorio Ventura State University suggests promising results for robotically deployed ABC extinguishers in educational settings...\"",
                url: "#"
            },
            {
                title: "The Future of Fire Safety in Philippine Educational Institutions",
                authors: "F. Reyes, M. Santos, J. Aquino",
                date: "July 2023",
                journal: "ASEAN Engineering Journal",
                excerpt: "\"Innovative approaches like the ROBUMBERO project (currently under development at DHVSU) represent the future direction of fire safety systems in Philippine universities...\"",
                url: "#"
            }
        ]
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

    // Update citation count
    const citationsCountElement = document.querySelector('.citations-container h2');
    if (citationsCountElement) {
        citationsCountElement.textContent = `Citations (${thesisData.citations.length})`;
    }

    // Populate citations list
    const citationsListContainer = document.querySelector('.citations-list');
    if (citationsListContainer) {
        // Clear any existing content
        citationsListContainer.innerHTML = '';
        
        // Add citation items
        thesisData.citations.forEach((citation, index) => {
            // Only show first 6 citations initially
            if (index < 6) {
                const citationItem = createCitationItem(citation);
                citationsListContainer.appendChild(citationItem);
            }
        });
        
        // Add "Load More" button if there are more than 6 citations
        if (thesisData.citations.length > 6) {
            const loadMoreDiv = document.createElement('div');
            loadMoreDiv.className = 'load-more';
            
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'load-more-btn';
            loadMoreBtn.textContent = 'Load More Citations';
            
            loadMoreBtn.addEventListener('click', function() {
                // Load the rest of the citations
                for (let i = 6; i < thesisData.citations.length; i++) {
                    const citationItem = createCitationItem(thesisData.citations[i]);
                    citationsListContainer.insertBefore(citationItem, loadMoreDiv);
                }
                
                // Remove the load more button
                loadMoreDiv.remove();
            });
            
            loadMoreDiv.appendChild(loadMoreBtn);
            citationsListContainer.appendChild(loadMoreDiv);
        }
    }

    // Function to create a citation item
    function createCitationItem(citation) {
        const citationItem = document.createElement('div');
        citationItem.className = 'citation-item';
        
        const title = document.createElement('h3');
        title.textContent = citation.title;
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'citation-meta';
        
        const authorsSpan = document.createElement('span');
        authorsSpan.className = 'citation-authors';
        authorsSpan.textContent = citation.authors;
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'citation-date';
        dateSpan.textContent = citation.date;
        
        const journalSpan = document.createElement('span');
        journalSpan.className = 'citation-journal';
        journalSpan.textContent = citation.journal;
        
        metaDiv.appendChild(authorsSpan);
        metaDiv.appendChild(dateSpan);
        metaDiv.appendChild(journalSpan);
        
        const excerptP = document.createElement('p');
        excerptP.className = 'citation-excerpt';
        excerptP.textContent = citation.excerpt;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'citation-actions';
        
        const viewLink = document.createElement('a');
        viewLink.href = citation.url;
        viewLink.className = 'view-citation';
        viewLink.textContent = 'View Full Text';
        
        const saveLink = document.createElement('a');
        saveLink.href = '#';
        saveLink.className = 'save-citation';
        saveLink.innerHTML = '<i class="far fa-bookmark"></i> Save';
        
        // Add event listener for save button
        saveLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle saved state
            if (this.innerHTML.includes('far fa-bookmark')) {
                this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            } else {
                this.innerHTML = '<i class="far fa-bookmark"></i> Save';
            }
        });
        
        actionsDiv.appendChild(viewLink);
        actionsDiv.appendChild(saveLink);
        
        citationItem.appendChild(title);
        citationItem.appendChild(metaDiv);
        citationItem.appendChild(excerptP);
        citationItem.appendChild(actionsDiv);
        
        return citationItem;
    }

    // Handle citation sort dropdown
    const citationSortDropdown = document.getElementById('citation-sort');
    if (citationSortDropdown) {
        citationSortDropdown.addEventListener('change', function() {
            const sortValue = this.value;
            let sortedCitations = [...thesisData.citations];
            
            if (sortValue === 'newest') {
                // Sort by date (newest first)
                sortedCitations.sort((a, b) => {
                    const dateA = new Date(parseDate(a.date));
                    const dateB = new Date(parseDate(b.date));
                    return dateB - dateA;
                });
            } else if (sortValue === 'oldest') {
                // Sort by date (oldest first)
                sortedCitations.sort((a, b) => {
                    const dateA = new Date(parseDate(a.date));
                    const dateB = new Date(parseDate(b.date));
                    return dateA - dateB;
                });
            } else if (sortValue === 'relevance') {
                // Here we could implement relevance sorting if we had relevance scores
                // For now, just shuffle the array for demonstration
                sortedCitations = shuffleArray(sortedCitations);
            }
            
            // Replace thesisData.citations with sorted citations
            thesisData.citations = sortedCitations;
            
            // Refresh the citations list
            const citationsListContainer = document.querySelector('.citations-list');
            if (citationsListContainer) {
                citationsListContainer.innerHTML = '';
                
                // Add citation items
                thesisData.citations.forEach((citation, index) => {
                    // Only show first 6 citations initially
                    if (index < 6) {
                        const citationItem = createCitationItem(citation);
                        citationsListContainer.appendChild(citationItem);
                    }
                });
                
                // Add "Load More" button if there are more than 6 citations
                if (thesisData.citations.length > 6) {
                    const loadMoreDiv = document.createElement('div');
                    loadMoreDiv.className = 'load-more';
                    
                    const loadMoreBtn = document.createElement('button');
                    loadMoreBtn.className = 'load-more-btn';
                    loadMoreBtn.textContent = 'Load More Citations';
                    
                    loadMoreBtn.addEventListener('click', function() {
                        // Load the rest of the citations
                        for (let i = 6; i < thesisData.citations.length; i++) {
                            const citationItem = createCitationItem(thesisData.citations[i]);
                            citationsListContainer.insertBefore(citationItem, loadMoreDiv);
                        }
                        
                        // Remove the load more button
                        loadMoreDiv.remove();
                    });
                    
                    loadMoreDiv.appendChild(loadMoreBtn);
                    citationsListContainer.appendChild(loadMoreDiv);
                }
            }
        });
    }

    // Handle export button
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Citations would be exported in various formats (BibTeX, RIS, etc.)');
        });
    }

    // Handle action buttons
    const actionButtons = document.querySelectorAll('.action-btn, .secondary-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('download-btn')) {
                alert('Download options would appear here');
            } else if (this.classList.contains('share-btn')) {
                alert('Share options would appear here');
            } else if (this.classList.contains('more-btn')) {
                alert('More options would appear here');
            } else if (this.classList.contains('recommend-btn')) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommend';
                } else {
                    this.classList.add('active');
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommended';
                }
            } else if (this.classList.contains('follow-btn')) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    this.innerHTML = '<i class="fas fa-bell"></i> Follow';
                } else {
                    this.classList.add('active');
                    this.innerHTML = '<i class="fas fa-bell-slash"></i> Following';
                }
            } else if (this.classList.contains('share-msg-btn')) {
                alert('Message sharing dialog would appear here');
            }
        });
    });

    // Helper function to parse date strings
    function parseDate(dateStr) {
        const months = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
            'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        
        const parts = dateStr.split(' ');
        if (parts.length === 2) {
            const month = months[parts[0]];
            const year = parseInt(parts[1]);
            if (!isNaN(month) && !isNaN(year)) {
                return new Date(year, month, 1);
            }
        }
        
        // Fallback to original string if parsing fails
        return dateStr;
    }

    // Helper function to shuffle array (for relevance sort demonstration)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
});