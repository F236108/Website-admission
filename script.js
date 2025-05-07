const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const personalForm = document.getElementById("personalForm");
const educationForm = document.getElementById("educationForm");
const formTitle = document.getElementById("formTitle");

function showSignUp() {
  signInForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
  personalForm.classList.add("hidden");
  educationForm.classList.add("hidden");
  formTitle.textContent = "Sign Up";
}

function showSignIn() {
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
  personalForm.classList.add("hidden");
  educationForm.classList.add("hidden");
  formTitle.textContent = "Sign In";
}

// Save Sign Up data to localStorage
signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  localStorage.setItem("user", JSON.stringify({ name, email, password }));

  alert("Account created! Please Sign In.");
  showSignIn();
  signUpForm.reset();
});

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate login credentials (basic match)
  const inputEmail = document.getElementById("signInEmail").value;
  const inputPassword = document.getElementById("signInPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser && inputEmail === storedUser.email && inputPassword === storedUser.password) {
    signInForm.classList.add("hidden");
    formTitle.textContent = "Personal Information";
    personalForm.classList.remove("hidden");
    personalForm.classList.add("fullscreen-form");
    personalForm.setAttribute("aria-hidden", "false");
  } else {
    alert("Invalid email or password!");
  }
});

// Save personal form data to localStorage
personalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;

  const personalInfo = { fullName, gender, dob, contact, address };
  localStorage.setItem("personalInfo", JSON.stringify(personalInfo));

  personalForm.classList.add("hidden");
  formTitle.textContent = "Educational History";
  educationForm.classList.remove("hidden");
  educationForm.classList.add("fullscreen-form");
  educationForm.setAttribute("aria-hidden", "false");

  personalForm.reset();
});

// Save education form data to localStorage
educationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const matric = document.getElementById("matric").value;
  const matricMarks = document.getElementById("matricMarks").value;
  const inter = document.getElementById("inter").value;
  const interMarks = document.getElementById("interMarks").value;
  const grades = document.getElementById("grades").value;
  const year = document.getElementById("year").value;
  const otherQualifications = document.getElementById("otherQualifications").value;

  const educationInfo = {
    matric,
    matricMarks,
    inter,
    interMarks,
    grades,
    year,
    otherQualifications
  };

  localStorage.setItem("educationInfo", JSON.stringify(educationInfo));

  // Show Review Section
  displayReviewSection();
});


document.getElementById("backToPersonal").addEventListener("click", function () {
  educationForm.classList.add("hidden");
  personalForm.classList.remove("hidden");
  formTitle.textContent = "Personal Information";
  personalForm.classList.add("fullscreen-form");
  personalForm.setAttribute("aria-hidden", "false");
});
function downloadUserData() {
  const user = localStorage.getItem("user");
  const personal = localStorage.getItem("personalInfo");
  const education = localStorage.getItem("educationInfo");

  const data = {
    user: JSON.parse(user),
    personalInfo: JSON.parse(personal),
    educationInfo: JSON.parse(education),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "admission_form_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function displayReviewSection() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const personal = JSON.parse(localStorage.getItem("personalInfo") || "{}");
  const education = JSON.parse(localStorage.getItem("educationInfo") || "{}");

  const content = `
    <h3>User Account</h3>
    <p>Name: ${user.name || ""}</p>
    <p>Email: ${user.email || ""}</p>
    
    <h3>Personal Information</h3>
    <p>Full Name: ${personal.fullName || ""}</p>
    <p>Gender: ${personal.gender || ""}</p>
    <p>DOB: ${personal.dob || ""}</p>
    <p>Contact: ${personal.contact || ""}</p>
    <p>Address: ${personal.address || ""}</p>
    
    <h3>Educational Information</h3>
    <p>Matric School: ${education.matric || ""}</p>
    <p>Matric Marks: ${education.matricMarks || ""}</p>
    <p>Inter College: ${education.inter || ""}</p>
    <p>Inter Marks: ${education.interMarks || ""}</p>
    <p>Grades/GPA: ${education.grades || ""}</p>
    <p>Passing Year: ${education.year || ""}</p>
    <p>Other Qualifications: ${education.otherQualifications || ""}</p>
  `;

  formTitle.textContent = "Review & Submit";
  educationForm.classList.add("hidden");

  const reviewSection = document.getElementById("reviewSection");
  const reviewContent = document.getElementById("reviewContent");

  reviewContent.innerHTML = content;
  reviewSection.classList.remove("hidden");
  setTimeout(() => reviewSection.classList.add("visible"), 10); // Trigger animation
}

// Back button from Review to Education
function backToEducation() {
  document.getElementById("reviewSection").classList.remove("visible");
  setTimeout(() => {
    document.getElementById("reviewSection").classList.add("hidden");
    educationForm.classList.remove("hidden");
    formTitle.textContent = "Educational History";
  }, 300); // Delay for animation
}

function finalSubmit() {
  alert("Application submitted successfully!");
  localStorage.clear();
  window.location.reload();
}


function downloadUserDataAsText() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const personal = JSON.parse(localStorage.getItem("personalInfo") || "{}");
  const education = JSON.parse(localStorage.getItem("educationInfo") || "{}");

  const content = `
=== USER ACCOUNT ===
Name: ${user.name || ""}
Email: ${user.email || ""}

=== PERSONAL INFORMATION ===
Full Name: ${personal.fullName || ""}
Gender: ${personal.gender || ""}
DOB: ${personal.dob || ""}
Contact: ${personal.contact || ""}
Address: ${personal.address || ""}

=== EDUCATIONAL INFORMATION ===
Matric School: ${education.matric || ""}
Matric Marks: ${education.matricMarks || ""}
Inter College: ${education.inter || ""}
Inter Marks: ${education.interMarks || ""}
Grades/GPA: ${education.grades || ""}
Passing Year: ${education.year || ""}
Other Qualifications: ${education.otherQualifications || ""}
`;

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "admission_form_data.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function backToEducation() {
  reviewSection.classList.add("hidden");
  educationForm.classList.remove("hidden");
  formTitle.textContent = "Educational History";
}
