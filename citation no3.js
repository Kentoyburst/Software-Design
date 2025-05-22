document.addEventListener('DOMContentLoaded', function() {
    // Thesis data for E-CHEQUER: A Smart Exam-Checking Machine Using Image Processing Technique
    const thesisData = {
        title: "E-CHEQUER: A Smart Exam-Checking Machine Using Image Processing Technique",
        date: "2023",
        publication: "The Computer Engineering Department",
        pages: "87 pages",
        doi: "10.55549/ceng.2387145",
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
        citations: [
            {
                title: "Machine Learning-Based Approaches for Automated Test Evaluation: A Comprehensive Review",
                authors: "J. Lee, M. Garcia, T. Kim",
                date: "March 2025",
                journal: "Journal of Educational Technology Innovation",
                excerpt: "\"...following the innovative approach of Puno et al. (2023), whose E-CHEQUER system provided a significant advancement in automating the grading process for multiple-choice examinations through image processing techniques...\"",
                url: "#"
            },
            {
                title: "Reducing Teacher Workload Through Automation: Case Studies from Southeast Asian Educational Institutions",
                authors: "R. Santos, L. Tran, F. Abdullah",
                date: "February 2025",
                journal: "International Journal of Educational Management",
                excerpt: "\"The E-CHEQUER device developed by Puno et al. (2023) demonstrates a practical solution to the persistent problem of teacher workload, with their study showing a significant reduction in grading time while maintaining a high accuracy rate of 96%...\"",
                url: "#"
            },
            {
                title: "Optical Mark Recognition Systems for Educational Assessment: Current State and Future Directions",
                authors: "A. Patel, C. Rodriguez, Y. Wang",
                date: "January 2025",
                journal: "IEEE Transactions on Education",
                excerpt: "\"Puno et al.'s (2023) implementation of the Haar Cascade algorithm in their E-CHEQUER system represents a significant advancement in OMR technology, achieving an impressive 97.96% F1 score for multiple-choice assessment...\"",
                url: "#"
            },
            {
                title: "Low-Cost Educational Technology Solutions for Developing Nations: A Framework for Implementation",
                authors: "B. Okonkwo, S. Mehta, D. Nguyen",
                date: "December 2024",
                journal: "Educational Technology & Society",
                excerpt: "\"The E-CHEQUER system developed by Puno et al. (2023) provides an excellent case study for how locally developed technologies can address specific educational challenges within resource-constrained environments...\"",
                url: "#"
            },
            {
                title: "Image Processing Techniques in Educational Assessment: A Systematic Review",
                authors: "H. Zhang, V. Kapoor, E. Molina",
                date: "November 2024",
                journal: "Computer Applications in Education",
                excerpt: "\"Among recent innovations in automated assessment systems, the E-CHEQUER device by Puno et al. (2023) stands out for its effective integration of hardware and software components, achieving an error rate of only 1.33%...\"",
                url: "#"
            },
            {
                title: "Automation in Educational Assessment: Insights from Emerging Markets",
                authors: "G. Rivera, K. Ahmed, P. Singh",
                date: "October 2024",
                journal: "International Journal of Education Technology",
                excerpt: "\"The development of E-CHEQUER (Puno et al., 2023) presents a significant advancement in addressing the assessment challenges faced by educators in the Philippines, with potential applications across similar educational contexts...\"",
                url: "#"
            },
            {
                title: "Comparative Analysis of Computer Vision Applications in Educational Technology",
                authors: "S. Johnson, R. Nakamura, L. Patel",
                date: "September 2024",
                journal: "Journal of Computer Vision in Education",
                excerpt: "\"When comparing recent educational applications of computer vision, the E-CHEQUER system (Puno et al., 2023) demonstrates exceptional precision metrics with a reported 100% precision rate in test conditions...\"",
                url: "#"
            },
            {
                title: "Scalable Assessment Solutions for Large Classroom Settings",
                authors: "M. Chen, A. Rodriguez, J. Mbeki",
                date: "August 2024",
                journal: "Large Scale Assessment in Education",
                excerpt: "\"Puno et al.'s (2023) E-CHEQUER device shows particular promise for scaling assessment processes in large classroom environments, with a demonstrated capacity to process 9 exam papers per minute while maintaining high accuracy...\"",
                url: "#"
            },
            {
                title: "Technological Interventions to Support Teacher Productivity in Southeast Asia",
                authors: "F. Nguyen, T. Somchai, R. De Silva",
                date: "July 2024",
                journal: "ASEAN Journal of Education",
                excerpt: "\"Among recent technological interventions, the E-CHEQUER system (Puno et al., 2023) shows impressive potential for reducing teacher workload, with evaluation data suggesting substantial time savings over manual grading methods...\"",
                url: "#"
            },
            {
                title: "Error Analysis in Automated Assessment Systems: Lessons from Recent Implementations",
                authors: "D. Kim, L. Garcia, P. Okafor",
                date: "June 2024",
                journal: "Assessment in Education: Principles, Policy & Practice",
                excerpt: "\"The low error rate (1.33%) achieved by the E-CHEQUER system (Puno et al., 2023) provides valuable insights into optimizing automated assessment systems for educational applications, particularly in paper-based exam contexts...\"",
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
            // Only show first 5 citations initially (matching the HTML structure)
            if (index < 5) {
                const citationItem = createCitationItem(citation);
                citationsListContainer.appendChild(citationItem);
            }
        });
        
        // Add "Load More" button if there are more than 5 citations
        if (thesisData.citations.length > 5) {
            const loadMoreDiv = document.createElement('div');
            loadMoreDiv.className = 'load-more';
            
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'load-more-btn';
            loadMoreBtn.textContent = 'Load More Citations';
            
            loadMoreBtn.addEventListener('click', function() {
                // Load the rest of the citations
                for (let i = 5; i < thesisData.citations.length; i++) {
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
                    // Only show first 5 citations initially
                    if (index < 5) {
                        const citationItem = createCitationItem(citation);
                        citationsListContainer.appendChild(citationItem);
                    }
                });
                
                // Add "Load More" button if there are more than 5 citations
                if (thesisData.citations.length > 5) {
                    const loadMoreDiv = document.createElement('div');
                    loadMoreDiv.className = 'load-more';
                    
                    const loadMoreBtn = document.createElement('button');
                    loadMoreBtn.className = 'load-more-btn';
                    loadMoreBtn.textContent = 'Load More Citations';
                    
                    loadMoreBtn.addEventListener('click', function() {
                        // Load the rest of the citations
                        for (let i = 5; i < thesisData.citations.length; i++) {
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