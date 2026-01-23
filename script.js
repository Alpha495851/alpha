import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 PUT YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyBNQDmQGaje_PexfDp31CPwtr79suMA0aQ",
  authDomain: "websitedatabase495851.firebaseapp.com",
  projectId: "websitedatabase495851"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const classSelect = document.getElementById("classSelect");
const sectionSelect = document.getElementById("sectionSelect");
const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const assignmentsDiv = document.getElementById("assignments");

// Load classes
["5","6","7","8","9","10"].forEach(c => {
  const opt = document.createElement("option");
  opt.value = "class" + c;
  opt.text = "Class " + c;
  classSelect.appendChild(opt);
});

classSelect.onchange = async () => {
  console.log("Class selected");
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const data = snap.data();

  sectionSelect.innerHTML = "";
  Object.keys(data.sections).forEach(sec => {
    sectionSelect.innerHTML += `<option>${sec}</option>`;
  });
};

sectionSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const subjects = snap.data().sections[sectionSelect.value].subjects;

  subjectSelect.innerHTML = "";
  Object.keys(subjects).forEach(s => {
    subjectSelect.innerHTML += `<option>${s}</option>`;
  });
};

subjectSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const chapters = snap.data()
    .sections[sectionSelect.value]
    .subjects[subjectSelect.value]
    .chapters;

  chapterSelect.innerHTML = "";
  Object.keys(chapters).forEach(c => {
    chapterSelect.innerHTML += `<option>${c}</option>`;
  });
};

chapterSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const assignments = snap.data()
    .sections[sectionSelect.value]
    .subjects[subjectSelect.value]
    .chapters[chapterSelect.value]
    .assignments;

  assignmentsDiv.innerHTML = "<h3>Assignments</h3>";

  Object.keys(assignments)
    .sort((a, b) => b.localeCompare(a)) // NEW → OLD
    .forEach(date => {
      assignmentsDiv.innerHTML += `<p><b>${date}</b>: ${assignments[date]}</p>`;
    });
};
