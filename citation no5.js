document.addEventListener('DOMContentLoaded', function() {
    // Thesis data for Automated LCD Masked-Based Lithography PCB Layout Etching System
    const thesisData = {
        title: "Automated LCD Masked-Based Lithography PCB Layout Etching System",
        date: "2023",
        publication: "South Asian Journal of Science and Technology",
        pages: "8 pages",
        doi: "10.55549/sajst.v8i1.2023",
        authors: [
            {
                name: "Asil Kastle S. Dela Cruz",
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
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Carolyn L. Jimenez",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Angelica B. Manalang",
                avatar: "babae.jpg",
                affiliation: "Computer Engineering"
            },
            {
                name: "Hazelyn R. Mendoza",
                avatar: "bababe.jpg",
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
        citations: [
            {
                title: "Low-Cost Photolithography Techniques for University PCB Fabrication Labs",
                authors: "M. Chen, R. Patel, L. Garcia",
                date: "April 2025",
                journal: "Educational Electronics Engineering",
                excerpt: "\"The LCD-masked approach introduced by Dela Cruz et al. (2023) has provided an affordable alternative that significantly reduces the time required for layout transfer, while eliminating the need for acetate film printing which was a common bottleneck in academic settings...\"",
                url: "#"
            },
            {
                title: "Comparative Analysis of Modern PCB Etching Techniques for Small-Scale Production",
                authors: "S. Yamamoto, J. Rodriguez, E. Smith",
                date: "March 2025",
                journal: "Journal of Manufacturing Technology",
                excerpt: "\"Our analysis indicates that the automated LCD-masked approach (Dela Cruz et al., 2023) provides superior precision rates (84%) compared to traditional UV exposure methods when considering both time efficiency and safety factors...\"",
                url: "#"
            },
            {
                title: "Health and Safety Improvements in Educational PCB Fabrication",
                authors: "A. Johnson, P. Mehta, T. Nguyen",
                date: "February 2025",
                journal: "Environmental Health in Education",
                excerpt: "\"The automation of exposure, developing, and etching processes as implemented by Dela Cruz et al. (2023) significantly reduces student exposure to hazardous chemicals such as ferric chloride, addressing a major concern in electronics education...\"",
                url: "#"
            },
            {
                title: "Efficiency Innovations in Pre-Sensitized PCB Production Techniques",
                authors: "R. Lopez, M. Al-Farsi, Z. Wilson",
                date: "January 2025",
                journal: "International Journal of Electronic Design",
                excerpt: "\"The 16-minute production time achieved by Dela Cruz et al.'s system represents a significant improvement over the traditional 30-60 minute process, with no measurable loss in output quality as evidenced by their 100% accuracy metrics...\"",
                url: "#"
            },
            {
                title: "LCD-Based Masking Technologies: A Review of Recent Developments",
                authors: "L. Chang, B. Mueller, K. Singh",
                date: "December 2024",
                journal: "Display Technology Applications",
                excerpt: "\"Among the innovative applications of LCD technology, the repurposing of transparent displays for PCB photolithography by Dela Cruz et al. (2023) stands out as particularly ingenious, effectively solving multiple challenges in the traditional pre-sensitizing workflow...\"",
                url: "#"
            },
            {
                title: "Cost-Effective Laboratory Equipment for Developing Nations' Engineering Programs",
                authors: "O. Okafor, N. Sharma, F. Martinez",
                date: "November 2024",
                journal: "Global Engineering Education",
                excerpt: "\"The Automated LCD Masked-Based Lithography system developed at Don Honorio Ventura State University provides an excellent case study of resourceful engineering that delivers professional results with accessible components, receiving high evaluation scores from both students (3.69) and professionals (3.57)...\"",
                url: "#"
            },
            {
                title: "Automation Solutions for Reducing Chemical Exposure in Educational Settings",
                authors: "H. Kim, J. Patel, S. Wagner",
                date: "October 2024",
                journal: "Safety Science and Technology",
                excerpt: "\"By automating the handling of developer and etchant solutions, the system designed by Dela Cruz et al. effectively addresses the significant skin irritation and eye damage risks associated with manual ferric chloride exposure in student laboratories...\"",
                url: "#"
            },
            {
                title: "Transparent Display Applications Beyond Consumer Electronics",
                authors: "V. Petrov, D. Richardson, G. Lopez",
                date: "September 2024",
                journal: "Journal of Display Engineering",
                excerpt: "\"The creative repurposing of a 7-inch IPS display by removing its housing and backlight for PCB lithography demonstrates the untapped potential of transparent display technologies in industrial and manufacturing applications (Dela Cruz et al., 2023)...\"",
                url: "#"
            },
            {
                title: "Educational Innovations in Electronics Engineering Laboratories",
                authors: "T. Martinez, C. Washington, B. Lee",
                date: "August 2024",
                journal: "Engineering Education Quarterly",
                excerpt: "\"Student survey responses (weighted mean 3.69) suggest that the integration of the LCD Masked-Based Lithography system into curriculum not only improved practical outcomes but enhanced student engagement with PCB design concepts by demystifying the fabrication process...\"",
                url: "#"
            },
            {
                title: "Sustainable Alternatives to Traditional PCB Fabrication Chemicals",
                authors: "M. Tanaka, R. Goodwin, L. Chen",
                date: "July 2024",
                journal: "Green Manufacturing Technologies",
                excerpt: "\"Building on the safety improvements introduced by Dela Cruz et al. (2023), our research explores complementary eco-friendly developer and etchant solutions that could further reduce the environmental impact of automated PCB fabrication systems in educational settings...\"",
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