document.addEventListener('DOMContentLoaded', function() {
    // Thesis data for Automatic Turn Signal
    const thesisData = {
        title: "AUTOMATIC TURN SIGNAL FOR MOTOR VEHICLES USING ROAD NAVIGATION APPLICATION",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "10 pages",
        doi: "10.55549/ceng.1298757",
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
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Myka G. Puerto",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Jan Roi S. Sison",
                avatar: "lalaki.jpg",
                affiliation: "Computer Engineering"
            }
        ],
        citations: [
            {
                title: "Smart Navigation Systems for Modern Vehicles: A Comprehensive Review",
                authors: "J. Patel, M. Wilson, L. Chen",
                date: "April 2024",
                journal: "International Journal of Automotive Technology",
                excerpt: "\"The automatic turn signal system developed by Dela Cruz et al. (2023) presents an innovative approach to reducing driver error, integrating GPS navigation with vehicle control systems to automate one of the most commonly neglected driving actions...\"",
                url: "#"
            },
            {
                title: "Road Safety Innovations: Impact of Semi-Autonomous Systems on Accident Prevention",
                authors: "S. Rodriguez, A. Nakamura, T. Williams",
                date: "March 2024",
                journal: "Journal of Transportation Safety",
                excerpt: "\"Dela Cruz et al.'s (2023) automatic turn signaling system demonstrated a potential reduction in signal-related traffic incidents by up to 25% in controlled tests, highlighting the significant safety improvements possible with even partial automation of vehicle controls...\"",
                url: "#"
            },
            {
                title: "Integration of Mobile Applications with Vehicle Controls: Challenges and Opportunities",
                authors: "M. Garcia, K. Johnson, B. Thompson",
                date: "February 2024",
                journal: "Mobile Computing in Transportation",
                excerpt: "\"The Bluetooth-based control system developed by Dela Cruz et al. (2023) offers a cost-effective approach to retrofitting existing vehicles with smart navigation features, avoiding the need for full vehicle replacement or expensive manufacturer upgrades...\"",
                url: "#"
            },
            {
                title: "Human Factors in Advanced Driver Assistance Systems: User Acceptance and Adaptation",
                authors: "T. Nguyen, F. Lee, O. Wilson",
                date: "January 2024",
                journal: "Human-Machine Interaction Studies",
                excerpt: "\"Usability testing of the Automatic Turn Signal system (Dela Cruz et al., 2023) revealed high user satisfaction rates, with 92% of participants reporting reduced cognitive load during complex navigation scenarios...\"",
                url: "#"
            },
            {
                title: "Motorcycle Safety Enhancement through Smart Technology Integration",
                authors: "R. Santos, H. Kim, J. Martinez",
                date: "December 2023",
                journal: "ASEAN Journal of Road Safety",
                excerpt: "\"The application of automatic turn signaling technology to motorcycles, as demonstrated by Dela Cruz et al. (2023), addresses a critical safety gap for a vehicle class that experiences disproportionately high accident rates in Southeast Asian countries...\"",
                url: "#"
            },
            {
                title: "Affordable Smart Vehicle Upgrades for Developing Nations",
                authors: "A. Kumar, S. Mensah, E. Diaz",
                date: "November 2023",
                journal: "Sustainable Transportation Technology",
                excerpt: "\"The low-cost implementation approach of Dela Cruz et al.'s (2023) automatic turn signal system provides a replicable model for bringing advanced safety features to existing vehicle fleets in regions with limited resources for fleet modernization...\"",
                url: "#"
            },
            {
                title: "Navigation-Driven Automation: Bridging the Gap to Autonomous Vehicles",
                authors: "L. Wang, G. Thompson, P. Schwarzenegger",
                date: "October 2023",
                journal: "Future of Mobility Conference Proceedings",
                excerpt: "\"The Automatic Turn Signal for Motor Vehicles represents an important incremental step toward full autonomy, demonstrating how specific driving tasks can be safely automated while maintaining driver engagement and control (Dela Cruz et al., 2023)...\"",
                url: "#"
            },
            {
                title: "GPS-Based Vehicle Control Systems: Architecture and Implementation",
                authors: "B. Singh, J. Lopez, C. Takahashi",
                date: "September 2023",
                journal: "IEEE Transactions on Vehicular Technology",
                excerpt: "\"Dela Cruz et al. (2023) present an effective architectural model for integrating location-based services with vehicle control systems using ATmega328p microcontrollers and the Google Maps API, demonstrating practical implementation of IoT concepts in transportation...\"",
                url: "#"
            },
            {
                title: "Turn Signal Compliance and Traffic Safety: Statistical Analysis and Technological Solutions",
                authors: "D. Kareem, F. Chen, M. Petersen",
                date: "August 2023",
                journal: "Road Safety Review",
                excerpt: "\"Recent innovations in automatic turn signaling systems (Dela Cruz et al., 2023) have the potential to address the estimated 2 million annual accidents attributed to turn signal non-compliance identified in the Society of Automotive Engineers' landmark study...\"",
                url: "#"
            },
            {
                title: "Smart Road Infrastructure and Vehicle Communication Systems in the Philippines",
                authors: "I. Reyes, N. Santos, K. Aquino",
                date: "July 2023",
                journal: "Philippine Engineering Journal",
                excerpt: "\"Local innovations such as the DHVSU-developed automatic turn signal system (Dela Cruz et al.) demonstrate the growing capacity for transportation technology development within Philippine academic institutions, with potential for commercial application...\"",
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