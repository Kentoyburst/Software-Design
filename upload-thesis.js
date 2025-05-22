document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('thesis-upload-form');
    const fileUpload = document.getElementById('thesis-file');
    const fileUploadOverlay = document.querySelector('.file-upload-overlay');
    const uploadModal = document.getElementById('upload-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const submitBtn = document.querySelector('button[type="submit"]');
    let isUploading = false;

    // File upload drag and drop
    fileUploadOverlay.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUploadOverlay.classList.add('dragover');
    });

    fileUploadOverlay.addEventListener('dragleave', () => {
        fileUploadOverlay.classList.remove('dragover');
    });

    fileUploadOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUploadOverlay.classList.remove('dragover');
        fileUpload.files = e.dataTransfer.files;
        updateFileDisplay(fileUpload.files[0]);
    });

    // File upload handling
    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            updateFileDisplay(file);
        }
    });

    function updateFileDisplay(file) {
        // Validate file type
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file only.');
            fileUpload.value = '';
            return;
        }

        // Validate file size (50MB max)
        if (file.size > 52428800) { // 50MB in bytes
            alert('File size exceeds 50MB limit.');
            fileUpload.value = '';
            return;
        }

        fileUploadOverlay.innerHTML = `
            <i class="fas fa-file-pdf"></i>
            <p>${file.name}</p>
            <span>${formatFileSize(file.size)}</span>
        `;
    }

    // Form submission
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isUploading) return;
        
        // Basic form validation
        const requiredFields = uploadForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
                field.addEventListener('input', () => field.classList.remove('error'));
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill all required fields');
            return;
        }

        try {
            isUploading = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
            submitBtn.disabled = true;
            
            // Create FormData object to send the form data including the file
            const formData = new FormData();
            
            // Add all form fields
            formData.append('thesisTitle', document.getElementById('thesis-title').value);
            formData.append('authors', document.getElementById('authors').value);
            formData.append('department', document.getElementById('department').value);
            formData.append('year', document.getElementById('year').value);
            formData.append('abstract', document.getElementById('thesis-abstract').value);
            formData.append('keywords', document.getElementById('keywords').value);
            formData.append('advisor', document.getElementById('advisor').value);
            formData.append('thesisFile', fileUpload.files[0]);
            
            // Send the data to the server
            const response = await fetch('/api/upload-thesis', {
                method: 'POST',
                body: formData,
                // Don't set Content-Type header, FormData will set it automatically with boundary
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }
            
            const result = await response.json();
            console.log('Upload successful:', result);
            
            // Show success modal
            showUploadModal();
        } catch (error) {
            console.error('Error uploading thesis:', error);
            alert('Upload failed: ' + error.message);
        } finally {
            isUploading = false;
            submitBtn.innerHTML = 'Upload Thesis';
            submitBtn.disabled = false;
        }
    });

    // Modal interactions
    closeModalBtn.addEventListener('click', closeModal);

    function showUploadModal() {
        uploadModal.style.display = 'block';
    }
});

function closeModal() {
    const uploadModal = document.getElementById('upload-modal');
    uploadModal.style.display = 'none';
    clearForm();
    // Redirect to the dashboard after successful upload
    window.location.href = 'user-dashboard.html';
}

// Clear form fields
function clearForm() {
    const form = document.getElementById('thesis-upload-form');
    const fileUploadOverlay = document.querySelector('.file-upload-overlay');

    form.reset();
    fileUploadOverlay.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag and drop or click to upload PDF</p>
        <span>Maximum file size: 50MB</span>
    `;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}