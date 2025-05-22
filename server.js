const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create a unique filename with timestamp and original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 52428800 // 50MB in bytes
    },
    fileFilter: fileFilter
});

// Simple database simulation (in production, use a real database)
const thesisDatabase = [];

// API endpoint for thesis upload
app.post('/api/upload-thesis', upload.single('thesisFile'), (req, res) => {
    try {
        // Extract form data
        const { thesisTitle, authors, department, year, abstract, keywords, advisor } = req.body;
        
        // Validate required fields
        if (!thesisTitle || !authors || !department || !year || !abstract || !req.file) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create thesis record
        const thesis = {
            id: Date.now().toString(),
            title: thesisTitle,
            authors: authors,
            department: department,
            year: parseInt(year),
            abstract: abstract,
            keywords: keywords || '',
            advisor: advisor || '',
            filename: req.file.filename,
            originalFilename: req.file.originalname,
            uploadDate: new Date(),
            filePath: req.file.path,
            fileSize: req.file.size
        };
        
        // Save to "database"
        thesisDatabase.push(thesis);
        console.log('Thesis uploaded:', thesis);
        
        res.status(201).json({
            message: 'Thesis uploaded successfully',
            thesisId: thesis.id
        });
    } catch (error) {
        console.error('Error handling thesis upload:', error);
        res.status(500).json({ message: 'Server error during upload' });
    }
});

// API endpoint to get all theses
app.get('/api/theses', (req, res) => {
    // Return thesis list without file paths (security)
    const thesisList = thesisDatabase.map(thesis => {
        const { filePath, ...safeThesis } = thesis;
        return safeThesis;
    });
    
    res.json(thesisList);
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer error (e.g., file too large)
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds the 50MB limit' });
        }
        return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
        // Other errors
        console.error(err);
        return res.status(500).json({ message: err.message || 'An unknown error occurred' });
    }
    next();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});