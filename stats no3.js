document.addEventListener('DOMContentLoaded', function() {
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
        stats: {
            views: 4215,
            citations: 12,
            downloads: 723,
            recommendations: 7,
            geoData: {
                "Philippines": 72,
                "United States": 8,
                "India": 6,
                "Singapore": 5,
                "Other": 9
            },
            demographics: {
                academic: {
                    "Students": 48,
                    "Faculty": 30,
                    "Researchers": 15,
                    "Industry": 7
                },
                field: {
                    "Education": 45,
                    "Computer Engineering": 30,
                    "Computer Science": 18,
                    "Other": 7
                }
            },
            readsOverTime: [
                { date: "Apr 3", reads: 135 },
                { date: "Apr 4", reads: 190 },
                { date: "Apr 5", reads: 225 },
                { date: "Apr 6", reads: 270 },
                { date: "Apr 7", reads: 170 },
                { date: "Apr 8", reads: 210 },
                { date: "Apr 9", reads: 180 }
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

    // Update stats summary cards with data
    document.querySelectorAll('.stats-card').forEach(card => {
        const icon = card.querySelector('.stats-icon i').className;
        
        if (icon.includes('eye')) {
            card.querySelector('h3').textContent = thesisData.stats.views.toLocaleString();
        } else if (icon.includes('quote')) {
            card.querySelector('h3').textContent = thesisData.stats.citations.toString();
        } else if (icon.includes('download')) {
            card.querySelector('h3').textContent = thesisData.stats.downloads.toLocaleString();
        } else if (icon.includes('thumbs-up')) {
            card.querySelector('h3').textContent = thesisData.stats.recommendations.toString();
        }
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

    // Update the reads graph (placeholder implementation)
    const readsGraph = document.getElementById('reads-graph');
    const graphBars = readsGraph.querySelector('.graph-bars');
    if (graphBars) {
        // Clear existing bars
        graphBars.innerHTML = '';
        
        // Generate new bars based on data
        const maxReads = Math.max(...thesisData.stats.readsOverTime.map(item => item.reads));
        thesisData.stats.readsOverTime.forEach(item => {
            const barHeight = (item.reads / maxReads) * 100;
            const bar = document.createElement('div');
            bar.className = 'graph-bar';
            bar.style.height = `${barHeight}%`;
            bar.title = `${item.date}: ${item.reads} reads`;
            
            const label = document.createElement('span');
            label.className = 'graph-label';
            label.textContent = item.date;
            
            bar.appendChild(label);
            graphBars.appendChild(bar);
        });
    }

    // Update geographic distribution (placeholder implementation)
    const geoMap = document.getElementById('geo-distribution-map');
    const mapRegions = geoMap.querySelector('.placeholder-map');
    if (mapRegions) {
        // Clear existing regions
        mapRegions.innerHTML = '';
        
        // Generate new regions based on data
        Object.entries(thesisData.stats.geoData).forEach(([region, percentage]) => {
            const regionEl = document.createElement('div');
            regionEl.className = 'map-region';
            regionEl.style.width = `${percentage}%`;
            
            const regionName = document.createElement('span');
            regionName.className = 'region-name';
            regionName.textContent = region;
            
            const regionPercent = document.createElement('span');
            regionPercent.className = 'region-percent';
            regionPercent.textContent = `${percentage}%`;
            
            regionEl.appendChild(regionName);
            regionEl.appendChild(regionPercent);
            mapRegions.appendChild(regionEl);
        });
    }

    // Update demographics pie charts (this would be more sophisticated in a real application)
    // Here we're just updating any existing pie slices with our data
    const academicChart = document.querySelector('.demographics-charts .demographics-chart:nth-child(1) .pie-chart');
    const fieldChart = document.querySelector('.demographics-charts .demographics-chart:nth-child(2) .pie-chart');
    
    if (academicChart) {
        const academicSlices = academicChart.querySelectorAll('.pie-slice');
        const academicData = Object.entries(thesisData.stats.demographics.academic);
        
        academicSlices.forEach((slice, index) => {
            if (index < academicData.length) {
                const [label, percentage] = academicData[index];
                slice.style.setProperty('--percentage', `${percentage}%`);
                slice.querySelector('.pie-label').textContent = label;
            }
        });
    }
    
    if (fieldChart) {
        const fieldSlices = fieldChart.querySelectorAll('.pie-slice');
        const fieldData = Object.entries(thesisData.stats.demographics.field);
        
        fieldSlices.forEach((slice, index) => {
            if (index < fieldData.length) {
                const [label, percentage] = fieldData[index];
                slice.style.setProperty('--percentage', `${percentage}%`);
                slice.querySelector('.pie-label').textContent = label;
            }
        });
    }

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
    });

    const recommendBtn = document.querySelector('.recommend-btn');
    recommendBtn.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommend';
        } else {
            this.classList.add('active');
            this.innerHTML = '<i class="fas fa-thumbs-up"></i> Recommended';
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
    });
});