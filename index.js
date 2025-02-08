document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
});

function addStudent() {
    let name = document.getElementById("studentName").value.trim();
    let id = document.getElementById("studentId").value.trim();
    let email = document.getElementById("studentEmail").value.trim();
    let contact = document.getElementById("studentContact").value.trim();

    // Input validation
    if (name === "" || id === "" || email === "" || contact === "") {
        alert("Please fill all fields.");
        return;
    }
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Student name should contain only letters.");
        return;
    }
    if (!/^\d+$/.test(id) || !/^\d+$/.test(contact)) {
        alert("Student ID and Contact number should be numbers only.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(students));

    loadStudents();
    clearForm();
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("studentEmail").value = student.email;
    document.getElementById("studentContact").value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

function clearForm() {
    document.getElementById("studentName").value = "";
    document.getElementById("studentId").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentContact").value = "";
}


