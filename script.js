import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

/* ------------------ LOAD CLASSES ------------------ */
["5","6","7","8","9","10"].forEach(c => {
  const opt = document.createElement("option");
  opt.value = "class" + c;
  opt.textContent = "Class " + c;
  classSelect.appendChild(opt);
});

/* ------------------ LOAD SECTIONS ------------------ */
classSelect.addEventListener("change", async () => {
  sectionSelect.innerHTML = "<option>Select Section</option>";
  subjectSelect.innerHTML = "";
  chapterSelect.innerHTML = "";
  assignmentsDiv.innerHTML = "";

  const sectionsRef = collection(
    db,
    `classes/${classSelect.value}/Section`
  );

  const snap = await getDocs(sectionsRef);
  console.log("Sections found:", snap.size);

  snap.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = doc.id;
    sectionSelect.appendChild(opt);
  });
});

/* ------------------ LOAD SUBJECTS ------------------ */
sectionSelect.addEventListener("change", async () => {
  subjectSelect.innerHTML = "<option>Select Subject</option>";
  chapterSelect.innerHTML = "";
  assignmentsDiv.innerHTML = "";

  const subjectsRef = collection(
    db,
    `classes/${classSelect.value}/Section/${sectionSelect.value}/subjects`
  );

  const snap = await getDocs(subjectsRef);
  console.log("Subjects found:", snap.size);

  snap.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = doc.id;
    subjectSelect.appendChild(opt);
  });
});

/* ------------------ LOAD CHAPTERS ------------------ */
subjectSelect.addEventListener("change", async () => {
  chapterSelect.innerHTML = "<option>Select Chapter</option>";
  assignmentsDiv.innerHTML = "";

  const chaptersRef = collection(
    db,
    `classes/${classSelect.value}/Section/${sectionSelect.value}/subjects/${subjectSelect.value}/chapters`
  );

  const snap = await getDocs(chaptersRef);
  console.log("Chapters found:", snap.size);

  snap.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = doc.id;
    chapterSelect.appendChild(opt);
  });
});

/* ------------------ LOAD ASSIGNMENTS ------------------ */
chapterSelect.addEventListener("change", async () => {
  assignmentsDiv.innerHTML = "<h3>Assignments</h3>";

  const assignRef = collection(
    db,
    `classes/${classSelect.value}/Section/${sectionSelect.value}/subjects/${subjectSelect.value}/chapters/${chapterSelect.value}/assignments`
  );

  const snap = await getDocs(assignRef);

  const sorted = snap.docs
    .map(d => d)
    .sort((a, b) => b.id.localeCompare(a.id)); // NEW → OLD

  sorted.forEach(doc => {
    assignmentsDiv.innerHTML += `
      <p><b>${doc.id}</b>: ${doc.data().text || ""}</p>
    `;
  });
});
