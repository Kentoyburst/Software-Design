document.addEventListener('DOMContentLoaded', function() {
    // Thesis data for Automated Soldering Robot Machine
    const thesisData = {
        title: "DESIGN AND DEVELOPMENT OF AUTOMATED SOLDERING ROBOT MACHINE",
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
                name: "Asil Kastle S. Dela Cruz",
                avatar: "img/babae.jpg",
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
            }
        ],
        citations: [
            {
                title: "Optimization of Automated Soldering Processes in PCB Manufacturing",
                authors: "L. Zhang, H. Kim, J. Rodriguez",
                date: "April 2024",
                journal: "Journal of Electronics Manufacturing",
                excerpt: "\"The work of Puno et al. (2023) on automated soldering robot machines demonstrated significant improvements in accuracy and efficiency compared to manual soldering processes, with their evaluation achieving a drilling accuracy of 98.4%...\"",
                url: "#"
            },
            {
                title: "Comparative Study of CNC-Based Automated PCB Assembly Systems",
                authors: "R. Gupta, M. Chen, T. Williams",
                date: "March 2024",
                journal: "International Journal of Automation Technology",
                excerpt: "\"Puno et al.'s (2023) implementation of the Arksoft Mach3 controller for precise drilling and soldering operations provides a cost-effective solution for small-scale PCB production with minimal human intervention...\"",
                url: "#"
            },
            {
                title: "Health and Safety Considerations in Automated Electronics Manufacturing",
                authors: "A. Johnson, P. Sato, D. Garcia",
                date: "February 2024",
                journal: "Occupational Safety in Engineering",
                excerpt: "\"The automated soldering robot machine developed by Puno et al. (2023) addresses critical health concerns by reducing human exposure to toxic soldering fumes, which as they note 'takes a toll on one's health if exposed for extended periods of time'...\"",
                url: "#"
            },
            {
                title: "Small-Scale PCB Production: Advances in Automation Technologies",
                authors: "S. Patel, J. Wang, F. Martinez",
                date: "January 2024",
                journal: "Electronics Design and Manufacturing",
                excerpt: "\"The soldering precision improvements demonstrated in Puno et al.'s (2023) research provide valuable insights into optimization techniques for automated soldering processes, particularly their findings regarding soldering tip selection and component spacing...\"",
                url: "#"
            },
            {
                title: "G-Code Programming Applications in Electronics Manufacturing",
                authors: "B. Lee, N. Kumar, T. Nguyen",
                date: "December 2023",
                journal: "Programming for Industrial Automation",
                excerpt: "\"The implementation of G-Code programming language in the automated soldering robot machine by Puno et al. (2023) demonstrates effective integration with Aspire software for precise drilling operations...\"",
                url: "#"
            },
            {
                title: "Educational Applications of Automated Electronics Manufacturing",
                authors: "M. Santos, R. Okafor, L. Thompson",
                date: "November 2023",
                journal: "Journal of Engineering Education",
                excerpt: "\"Puno et al.'s (2023) automated soldering robot machine offers an excellent practical learning platform for engineering students to understand CNC operations, motor control, and process automation...\"",
                url: "#"
            },
            {
                title: "Enhancing PCB Production Quality through Automation",
                authors: "J. Wilson, C. Rodriguez, H. Singh",
                date: "October 2023",
                journal: "Quality Engineering Review",
                excerpt: "\"The experimental findings from Puno et al. (2023) regarding drilling precision (98.72%) and soldering accuracy improvements through iterative testing provide valuable benchmarks for quality control in automated PCB production...\"",
                url: "#"
            },
            {
                title: "Cost-Effective Solutions for Electronics Prototyping in Academic Settings",
                authors: "D. Brown, A. Sharma, E. Mendez",
                date: "September 2023",
                journal: "Academic Maker Spaces",
                excerpt: "\"The CNC-based automated soldering robot machine developed by Puno et al. (2023) at Don Honorio Ventura State University offers a replicable and economical approach for academic institutions seeking to enhance their electronics prototyping capabilities...\"",
                url: "#"
            },
            {
                title: "Advances in Stepper Motor Control for Precision Manufacturing",
                authors: "T. Park, C. Adams, Y. Tanaka",
                date: "August 2023",
                journal: "Precision Engineering Applications",
                excerpt: "\"The integration of TB6600 motor driver modules with stepper motors in Puno et al.'s (2023) research demonstrates effective motion control for achieving high-precision drilling operations in PCB manufacturing...\"",
                url: "#"
            },
            {
                title: "Human-Machine Interfaces for Industrial Automation Systems",
                authors: "R. Lopez, K. Wilson, J. Khan",
                date: "August 2023",
                journal: "Applied Ergonomics in Manufacturing",
                excerpt: "\"Puno et al. (2023) implemented a user-friendly interface through Arksoft Mach3 software that effectively bridges hardware and software components, demonstrating good principles for human-machine interaction in automation systems...\"",
                url: "#"
            },
            {
                title: "Sustainable Manufacturing Approaches in Electronics Production",
                authors: "F. Anderson, G. Nakamura, P. Oliveira",
                date: "July 2023",
                journal: "Journal of Sustainable Manufacturing",
                excerpt: "\"The automated soldering robot machine described by Puno et al. (2023) offers potential improvements in resource efficiency by reducing waste through more precise soldering operations and consistent quality...\"",
                url: "#"
            },
            {
                title: "Performance Metrics for Automated PCB Assembly Systems",
                authors: "H. Schmidt, L. Zhao, T. Rivera",
                date: "July 2023",
                journal: "IEEE Transactions on Electronics Packaging",
                excerpt: "\"The comprehensive performance testing methodology employed by Puno et al. (2023), including accuracy, precision, and speed metrics, provides a valuable framework for evaluating automated PCB assembly equipment...\"",
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