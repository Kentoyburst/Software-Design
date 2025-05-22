class SavedPapersManager {
    constructor() {
        // Initialize saved papers from local storage or empty array
        this.savedPapers = JSON.parse(localStorage.getItem('savedPapers')) || [];
        this.savedPapersEl = document.getElementById('saved-papers');
        this.researchPapersContainer = document.querySelector('.research-papers');
    }

    // Method to add a paper to saved papers
    addPaper(paper) {
        // Check if paper is already saved
        if (!this.savedPapers.some(savedPaper => savedPaper.title === paper.title)) {
            this.savedPapers.push(paper);
            this.updateLocalStorage();
            this.updateUI();
            this.showNotification('Paper saved successfully!');
            
            // Navigate to saved-papers.html after a short delay
            setTimeout(() => {
                window.location.href = 'saved-papers.html';
            }, 1000); // 1 second delay to show the notification first
        } else {
            this.showNotification('Paper is already in your saved list.');
            
            // Navigate to saved-papers.html even if paper is already saved
            setTimeout(() => {
                window.location.href = 'saved-papers.html';
            }, 1000);
        }
    }

    // Method to remove a paper from saved papers
    removePaper(title) {
        this.savedPapers = this.savedPapers.filter(paper => paper.title !== title);
        this.updateLocalStorage();
        this.updateUI();
        this.showNotification('Paper removed from saved list.');
    }

    // Update local storage
    updateLocalStorage() {
        localStorage.setItem('savedPapers', JSON.stringify(this.savedPapers));
    }

    // Update UI to reflect saved papers count
    updateUI() {
        // Update saved papers count
        if (this.savedPapersEl) {
            this.savedPapersEl.textContent = this.savedPapers.length;
        }

        // Render saved papers in the dashboard if we're on the right page
        if (this.researchPapersContainer) {
            this.renderSavedPapers();
        }
    }

    // Render saved papers in the dashboard
    renderSavedPapers() {
        // Create a saved papers section if it doesn't exist
        let savedPapersSection = document.querySelector('.saved-papers-section');
        if (!savedPapersSection) {
            savedPapersSection = document.createElement('div');
            savedPapersSection.className = 'saved-papers-section recommended-research';
            savedPapersSection.innerHTML = '<h3>Saved Papers</h3>';
            this.researchPapersContainer.parentNode.insertBefore(savedPapersSection, this.researchPapersContainer.nextSibling);
        }

        // Clear existing saved papers
        const savedPapersContainer = document.createElement('div');
        savedPapersContainer.className = 'research-papers';

        // Render each saved paper
        this.savedPapers.forEach(paper => {
            const paperElement = document.createElement('div');
            paperElement.className = 'research-paper';
            paperElement.innerHTML = `
                <div class="paper-image">
                    <img src="${paper.image || 'img/paper-thumbnail.png'}" alt="Research Paper">
                </div>
                <div class="paper-details">
                    <h3>${paper.title}</h3>
                    <p class="authors">${paper.authors}</p>
                    <div class="paper-actions">
                        <button class="action-btn download-btn"><i class="fas fa-download"></i> Download</button>
                        <button class="action-btn remove-btn"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            `;

            // Add remove button functionality
            const removeBtn = paperElement.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {
                this.removePaper(paper.title);
            });

            savedPapersContainer.appendChild(paperElement);
        });

        // Update saved papers section
        savedPapersSection.appendChild(savedPapersContainer);
    }

    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2ecc71;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.5s, fadeOut 0.5s 2.5s forwards;
        `;

        // Add keyframe animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Initialize save buttons on page
    initSaveButtons() {
        const saveButtons = document.querySelectorAll('.save-btn');
        saveButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                const thesisItem = button.closest('.thesis-item');
                if (thesisItem) {
                    const paper = {
                        title: thesisItem.querySelector('h3').textContent,
                        authors: thesisItem.querySelector('.authors').textContent,
                        image: thesisItem.querySelector('.thesis-image img')?.src || 'img/sample pic.jpg',
                        abstract: thesisItem.dataset.abstract,
                        year: thesisItem.dataset.year,
                        researchArea: thesisItem.dataset.researchArea
                    };
                    this.addPaper(paper);
                }
            });
        });
    }
}

// Filter theses function
function filterTheses() {
    const researchAreaFilter = document.getElementById('research-area-filter').value;
    const yearFilter = document.getElementById('year-filter').value;
    const searchQuery = document.getElementById('thesis-search').value.toLowerCase();
    
    const thesisItems = document.querySelectorAll('.thesis-item');
    
    thesisItems.forEach(item => {
        const researchArea = item.dataset.researchArea;
        const year = item.dataset.year;
        const title = item.querySelector('h3').textContent.toLowerCase();
        const authors = item.querySelector('.authors').textContent.toLowerCase();
        
        // Check if item matches all active filters
        const matchesResearchArea = !researchAreaFilter || researchArea === researchAreaFilter;
        const matchesYear = !yearFilter || year === yearFilter;
        const matchesSearch = !searchQuery || 
                              title.includes(searchQuery) || 
                              authors.includes(searchQuery);
        
        // Show or hide item based on filter match
        if (matchesResearchArea && matchesYear && matchesSearch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update pagination after filtering
    updatePagination();
}

// Update pagination based on visible items
function updatePagination() {
    const visibleItems = document.querySelectorAll('.thesis-item[style="display: block"]');
    const pageInfo = document.getElementById('page-info');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    
    // Simple pagination logic - can be expanded as needed
    if (visibleItems.length === 0) {
        pageInfo.textContent = 'No results found';
        prevButton.disabled = true;
        nextButton.disabled = true;
    } else {
        pageInfo.textContent = `Showing ${visibleItems.length} results`;
        // This is simplified - in a real implementation you'd handle page numbers
    }
}

// Initialize Saved Papers Manager
document.addEventListener('DOMContentLoaded', () => {
    const savedPapersManager = new SavedPapersManager();
    
    const sampleTheses = [
        {
            title: "Solar Powered Automated Waste Restraining Device for Sewages",
            authors: "Ruby Rosa N. Puno, Kristine E. Pineda, Jan Michael P. Canlas, Erick Carl G. Leabres, Anton Micael O. Mallari, Marvin S. Mallari, Mark Allen L. Manlutac",
            year: "2023",
            researchArea: "embedded-systems",
            image: "sample pic.jpg",
            abstract: "In the community, waste is the reason why small-scale sewages or canals are clogging. It is also one of the reasons why floods and long-term floods occur. The study aims to mitigate these specific problems. The research study strived to develop a device specifically for restraining waste floating on a small-scale sewage or canal. Clogged sewage is a blockage of the drainage system that causes the water not to drain, resulting in frequent back-ups such as floods. Blockages are often caused by debris like plastic, dried leaves, pet bottles, etc. The researchers came up with a solution that can help collect substances from clogged sewage to avoid future setbacks. The study proposed a device named 'Solar Powered Automated Waste Restraining Device for Sewages.' This equipment will prevent the sewages from clogging by restraining and collecting debris on a free-flowing canal using an ultrasonic sensor. This device will automatically send notifications using the GSM module to authorized personnel to repeat the process until the sewage system is clogged-free."
        },
        {
            title: "ROBUMBERO: SMART FIREFIGHTING ROBOT",
            authors: "Asil Kastle S. Dela Cruz, Grosby A. Dela Cruz, Karl Angelo T. Garcia, Yashtroi Jerwin C. Oriel,Karl Martin G. Perez, John Niel L. Pineda, Kendrich S. Tienzo",
            year: "2023",
            researchArea: "robotics",
            image: "sample pic.jpg",
            abstract: " This study aimed to develop a fire-fighting robot called Robumbero. This smart firefighting robot can be operated automatically or manually using a remote control. It can extinguish fires at an early phase without the actual presence of the firefighters and without exposing one's self to the danger of fire. It is equipped with an ABC fire extinguisher, and sensors to detect fire and obstructions. It also has a camera that allows users to have a real-time view of the robot's surroundings for easy manipulation. The robot's overall performance was assessed using a descriptive research method. It was evaluated by the twenty students and employees from Don Honorio Venture State University, BFP and ten engineers. The data obtained were analyzed and it was revealed that the robot has met all the criteria of ISO25010 and that its overall performance can be deemed efficient and effective."
        },
        {
            title: "E-CHEQUER: A SMART EXAM -CHECKING MACHINE USING IMAGE PROCESSING TECHNIQUE",
            authors: "Ruby Rosa N. Puno, Yuen A. Nicdao, Christian Devan Sen Deinla, Gabriel Hernandez, Milongy Javier, Dhenzel Macalino, Renniel Ocampo, Jobert Santos, Gio Sicat",
            year: "2023",
            researchArea: "artificial-intelligence",
            image: "sample pic.jpg",
            abstract: " This study developed an E-Chequer: A Smart Exam-Checking Machine Using Image Processing Technique. The research aims to identify the feasibility and effectiveness of using image processing techniques for automated exam grading among secondary level teachers in public schools.Specifically, it aims to (1) to develop a system that will help secondary-level teachers in terms of functionality, reliability, efficiency, and usability in checking the exams, (2) to identify the significant differences between the conventional way and the designed project in terms of checking exams. (3) tobuild a machine that will help the secondary level teachers lessen their workload. A great significance of this study is speed and efficiency when it comes to checking, assessment and data analysis of the students' exam papers. A machine can check a large amount of papers in a small amount of time compared to a human teacher. A Developmental Research Method concept was employed with 15 preliminary respondents and 13 evaluators, that includes secondary level teachers and professionals. The data were analyzed using statistical analysis. The device obtained an error rate of 1.33%, a precision of 100%, a recall of 96%, and an F1 score of 97.96%. Moreover, the accuracy of the device, based on the calculated Precision, Recall, and F1 Score, is 96%. The overall rating for the design project is 4.25 out of 5, showing that the respondents AGREE that the device meets the standard features and characteristics for property evaluation and serves the needs of the stakeholders, and so holds value. The device can perform bulk checking, and the scanning rate is only 9 exam papers per minute. Also, it only accepts A5 paper size and is limited to the customized answer sheet and 50 items only. For the volume of the exam paper, it can handle a maximum of 50 exam papers in one go. The contributing factors to paper jams include the  quality and condition of the paper used and incorrect loading of the paper tray."
        },
        {
            title: "DESIGN AND DEVELOPMENT OF AUTOMATED SOLDERING ROBOT MACHINE",
            authors: "Ruby Rosa N. Puno, Asil Kastle S. Dela Cruz, Humphrey John S. Alarios, Toby R. Castro, John Patrick S. Guiao, Cassell L. Lozano, John Mark V. Pangilinan, Avie D. Sanchez",
            year: "2023",
            researchArea: "robotics",
            image: "sample pic.jpg",
            abstract: " The Soldering Robot Machine was a clever, portable automated PCB assembly equipment that was the subject of this research project. The tool uses Arksoft Mach3 and Aspire software to drill and solder holes using the G-Code programming language. The researchers used a descriptive and experimental design method, drawing on their experience integrating hardware and software, and they iteratively tried and failed to create the device. PCB enthusiasts, designers, and experts evaluated the Soldering Robot Machine to determine its usability, functionality, portability, reliability, and efficiency. The obtained results from the evaluation were utilized to describe the device, ascertain its functionality, and establish its acceptability. The device was described, its functionality was established, and its acceptance was established using the evaluation findings that were received. Various electronic and electrical components were used o build the device, and experimental design showed it has successfully located processes and performed drilling characterization, proving its potential for PCB manufacture."
        },
        {
            title: "Automated LCD Masked-Based Lithography PCB Layout Etching System",
            authors: "Asil Kastle S. Dela Cruz, Arvee L. Domingo, Jhester John M. De Leon, Carolyn L. Jimenez, Angelica B. Manalang, Hazelyn R. Mendoza, Jovy Abegail D. Sanchez, and Alliah Nhel C. Vitug",
            year: "2023",
            researchArea: "automation",
            image: "sample pic.jpg",
            abstract: " The manual pre-sensitizing method usually takes about 30 minutes to an hour, which is very time-consuming and difficult since finding services that print on acetate film is challenging. Implementing manual procedures is also prone to inaccurate results and even exposes the user to various health and safety hazards. Instead of utilizing an acetate film, a transparent monitor was used as the layout mask by displaying the layout on it and letting the UV light pass through to the transparent areas. Exposing, developing, and etching were automated, which reduced potential risks and hazards. With automation and LCD-Masked Based Lithography, the process of printing layouts on acetate film for layout masking can be eliminated, and printing  layouts can be done safely and conveniently. The system could etch layouts on pre-sensitized PCBs within 16 minutes, faster than the manual method. Etched PCBs have 100% accuracy and 84% precision. Essentially, the system has obtained a weighted mean of 3.69 from the student respondents and 3.57 from the professional respondents, which, based on its equivalent descriptive rating, implies an excellent performance for achieving its objectives ."
        },
        {
            title: "AUTOMATIC TURN SIGNAL FOR MOTOR VEHICLES USING ROAD NAVIGATION APPLICATION",
            authors: "Asil Kastle S. Dela Cruz, Mark Joren C. Guinto, Christian Dale G. Bondoc, Kaniel Ezekiel Ang Faina, Rei Rose P. Paras, Myka G. Puerto, and Jan Roi S. Sison",
            year: "2023",
            researchArea: "automation",
            image: "sample pic.jpg",
            abstract: "One of the causes of the traffic accidents is drivers making sudden and unexpected turns and failing to use their turn signals correctly. This Automatic Turn Signal for Motor Vehicles using Road Navigation Application aims to create a device that connects to a road navigation application and automatically activates turn signals of a motor vehicle. The system is designed to control the vehicle's turn signal lights by detecting the need of turning and assist the user in navigating to the desired location using the directions generated from Google Maps API. This study employed Developmental Quantitative research and Iterative Waterfall method in its development. A control box is installed to a motor vehicle which contains Atmega328P as its main controller, a relay to switch the turn signal lights and a HC-05 module to communicate with the mobile app through Bluetooth technology. System Testing was done toensure that the device is working according to specification, the following were tested: unit testing, communication with the API, turn point detection, communication between hardware and software modules. The results show that the mobile app, control box and the API were successfully integrated."
        },
    ];

    const thesisList = document.querySelector('.thesis-list');
    if (thesisList) {
        // Clear the list first
        thesisList.innerHTML = '';
        
        // Populate thesis list
        sampleTheses.forEach(thesis => {
            const thesisItem = document.createElement('div');
            thesisItem.classList.add('thesis-item');
            thesisItem.dataset.researchArea = thesis.researchArea;
            thesisItem.dataset.year = thesis.year;
            thesisItem.dataset.abstract = thesis.abstract;
            
            thesisItem.innerHTML = `
                <div class="thesis-image">
                    <img src="${thesis.image}" alt="${thesis.title}">
                </div>
                <div class="thesis-details">
                    <h3>${thesis.title}</h3>
                    <div class="authors">${thesis.authors}</div>
                    <div class="meta">
                        <span>${thesis.year}</span>
                        <span>${thesis.researchArea.replace('-', ' ')}</span>
                    </div>
                    <div class="thesis-actions">
                        <button class="view-abstract-btn">View Abstract</button>
                        <button class="save-btn"><i class="fas fa-bookmark"></i> Save</button>
                    </div>
                </div>
            `;

            thesisList.appendChild(thesisItem);
        });
        
        // Set up event listeners for the filter controls
        const researchAreaFilter = document.getElementById('research-area-filter');
        const yearFilter = document.getElementById('year-filter');
        const searchInput = document.getElementById('thesis-search');
        const searchBtn = document.getElementById('search-btn');
        
        if (researchAreaFilter) {
            researchAreaFilter.addEventListener('change', filterTheses);
        }
        
        if (yearFilter) {
            yearFilter.addEventListener('change', filterTheses);
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', filterTheses);
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', filterTheses);
        }
    }
    
    // Modal setup
    const modal = document.getElementById('thesisModal');
    if (modal) {
        const closeBtn = document.querySelector('.thesis-modal-close');
        
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
// Add event listeners to all "View Abstract" buttons
document.querySelectorAll('.view-abstract-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const thesisItem = btn.closest('.thesis-item');
        const title = thesisItem.querySelector('h3').textContent;
        
        // If it's the "Solar Powered..." thesis, navigate to no1.html
        if (title === "Solar Powered Automated Waste Restraining Device for Sewages") {
            window.location.href = "no1.html";
        } if (title === "ROBUMBERO: SMART FIREFIGHTING ROBOT") {
            window.location.href = "no2.html";
        } if (title === "E-CHEQUER: A SMART EXAM -CHECKING MACHINE USING IMAGE PROCESSING TECHNIQUE") {
            window.location.href = "no3.html";
        } if (title === "DESIGN AND DEVELOPMENT OF AUTOMATED SOLDERING ROBOT MACHINE") {
            window.location.href = "no4.html";
        } if (title === "Automated LCD Masked-Based Lithography PCB Layout Etching System") {
            window.location.href = "no5.html";
        } if (title === "AUTOMATIC TURN SIGNAL FOR MOTOR VEHICLES USING ROAD NAVIGATION APPLICATION") {
            window.location.href = "no6.html";
        } else {
        
        }
    });
});
    }
    
    // Initialize save buttons
    savedPapersManager.initSaveButtons();
    savedPapersManager.updateUI();
});