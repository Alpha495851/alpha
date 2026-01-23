import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

/* ---------- LOAD CLASSES ---------- */
["5","6","7","8","9","10"].forEach(c => {
  const opt = document.createElement("option");
  opt.value = "class" + c;
  opt.textContent = "Class " + c;
  classSelect.appendChild(opt);
});

/* ---------- CLASS CHANGE ---------- */
classSelect.onchange = async () => {
  sectionSelect.innerHTML = "";
  subjectSelect.innerHTML = "";
  chapterSelect.innerHTML = "";
  assignmentsDiv.innerHTML = "";

  const snap = await getDoc(doc(db, "classes", classSelect.value));
  if (!snap.exists()) return;

  const sections = snap.data().sections;
  if (!sections) return;

  Object.keys(sections).forEach(sec => {
    sectionSelect.innerHTML += `<option value="${sec}">${sec}</option>`;
  });
};

/* ---------- SECTION CHANGE ---------- */
sectionSelect.onchange = async () => {
  subjectSelect.innerHTML = "";
  chapterSelect.innerHTML = "";
  assignmentsDiv.innerHTML = "";

  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const sectionData = snap.data().sections?.[sectionSelect.value];

  if (!sectionData?.subjects?.chapters) return;

  
  subjectSelect.innerHTML = `<option value="main">Main Subject</option>`;
};

/* ---------- SUBJECT CHANGE ---------- */
subjectSelect.onchange = async () => {
  chapterSelect.innerHTML = "";
  assignmentsDiv.innerHTML = "";

  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const chapters =
    snap.data()
      .sections?.[sectionSelect.value]
      ?.subjects
      ?.chapters;

  if (!chapters) return;

  Object.keys(chapters).forEach(ch => {
    chapterSelect.innerHTML += `<option value="${ch}">${ch}</option>`;
  });
};

/* ---------- CHAPTER CHANGE ---------- */
chapterSelect.onchange = async () => {
  assignmentsDiv.innerHTML = "<h3>Assignments</h3>";

  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const assignments =
    snap.data()
      .sections?.[sectionSelect.value]
      ?.subjects
      ?.chapters?.[chapterSelect.value]
      ?.assignments;

  if (!assignments) {
    assignmentsDiv.innerHTML += "<p>No assignments</p>";
    return;
  }

  Object.keys(assignments)
    .sort((a, b) => b.localeCompare(a)) // NEW → OLD
    .forEach(date => {
      assignmentsDiv.innerHTML += `<p><b>${date}</b>: ${assignments[date]}</p>`;
    });
};
