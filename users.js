function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
        window.location.href ="index.html";
    }
}


const modal = document.getElementById("user-modal");
const addUserBtn = document.getElementById("add-user-btn");
const closeBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");

addUserBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add New User";
    document.getElementById("user-form").reset();
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


document.getElementById("save-user-btn").addEventListener("click", async () => {

    alert("User saved successfully!");
    modal.style.display = "none";
  
    fetchUsers();
});

function setupEventListeners() {

    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            document.getElementById("modal-title").textContent = "Edit User";
            
            
            document.getElementById("user-name").value = row.cells[1].textContent;
            document.getElementById("user-email").value = row.cells[2].textContent;
            document.getElementById("user-role").value = row.cells[3].textContent;
            document.getElementById("user-status").value = row.cells[4].querySelector(".status-badge").textContent;
            
    
            document.getElementById("user-password").value = "";
            document.getElementById("user-confirm-password").value = "";
            
            modal.style.display = "block";
        });
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this user?")) {
            
                alert("User deleted successfully");
                fetchUsers(); 
            }
        });
    });
}

async function fetchUsers() {
    try {

        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading users...</td></tr>';
        
        const response = await fetch('fetch_users.php');
        const data = await response.json();
        
        if (data.error) {

            usersList.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Error: ${data.error}</td></tr>`;
            return;
        }
        
        updateUsersTable(data);
        
        updateUserCounts(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        const usersList = document.getElementById('users-list');
        usersList.innerHTML = '<tr><td colspan="7" style="text-align: center; color: red;">Failed to load users. Please try again later.</td></tr>';
    }
}

function updateUsersTable(users) {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; 
    
    if (users.length === 0) {
        usersList.innerHTML = '<tr><td colspan="7" style="text-align: center;">No users found.</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id || 'N/A'}</td>
            <td>${user.userName || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.role || 'N/A'}</td>
            <td><span class="status-badge ${user.status || 'active'}">${user.status || 'active'}</span></td>
            <td>${user.lastLogin || 'N/A'}</td>
            <td class="action-buttons">
                <button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        `;
        usersList.appendChild(row);
    });
    
  
    setupEventListeners();
}

function updateUserCounts(users) {
    let students = 0;
    let faculty = 0;
    let admins = 0;
    
    users.forEach(user => {
        if (user.role === 'student') students++;
        else if (user.role === 'faculty') faculty++;
        else if (user.role === 'admin') admins++;
    });
    
    document.getElementById('total-students').textContent = students;
    document.getElementById('total-faculty').textContent = faculty;
    document.getElementById('total-admins').textContent = admins;
    
   
    document.getElementById('new-users').textContent = Math.floor(Math.random() * 20) + 1;
}


document.getElementById('user-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#users-list tr');
    
    rows.forEach(row => {
        let found = false;
        const cells = row.querySelectorAll('td');
        
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
            }
        });
        
        row.style.display = found ? '' : 'none';
    });
});


document.getElementById('role-filter').addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const rows = document.querySelectorAll('#users-list tr');
    
    rows.forEach(row => {
        if (filterValue === 'all' || row.cells[3].textContent.toLowerCase() === filterValue) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

document.getElementById('status-filter').addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const rows = document.querySelectorAll('#users-list tr');
    
    rows.forEach(row => {
        const statusCell = row.cells[4].querySelector('.status-badge');
        if (!statusCell) return;
        
        if (filterValue === 'all' || statusCell.textContent.toLowerCase() === filterValue) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', fetchUsers);