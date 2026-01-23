import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* 🔥 YOUR CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBNQDmQGaje_PexfDp31CPwtr79suMA0aQ",
  authDomain: "websitedatabase495851-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "websitedatabase495851"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const classSelect = document.getElementById("classSelect");
const sectionSelect = document.getElementById("sectionSelect");
const subjectSelect = document.getElementById("subjectSelect");
const content = document.getElementById("content");

/* 1️⃣ Load classes */
async function loadClasses() {
  console.log("Loading classes...");
  const snap = await getDocs(collection(db, "classes"));
  console.log("Classes found:", snap.size);

  snap.forEach(doc => {
    console.log("Class:", doc.id);
    classSelect.innerHTML += `<option value="${doc.id}">${doc.id}</option>`;
  });
}
loadClasses();


/* 2️⃣ Class → Sections */
classSelect.onchange = async () => {
  sectionSelect.innerHTML = `<option value="">Select Section</option>`;
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  content.innerHTML = "";

  const cls = classSelect.value;
  if (!cls) return;

  sectionSelect.disabled = false;
  subjectSelect.disabled = true;

  const sectionsRef = collection(db, "classes", cls, "sections");
  const snap = await getDocs(sectionsRef);

  snap.forEach(doc => {
    sectionSelect.innerHTML += `<option value="${doc.id}">${doc.id}</option>`;
  });
};

/* 3️⃣ Section → Subjects */
sectionSelect.onchange = async () => {
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  content.innerHTML = "";

  const cls = classSelect.value;
  const sec = sectionSelect.value;
  if (!sec) return;

  subjectSelect.disabled = false;

  const subjectsRef = collection(
    db,
    "classes",
    cls,
    "sections",
    sec,
    "subjects"
  );

  const snap = await getDocs(subjectsRef);
  snap.forEach(doc => {
    subjectSelect.innerHTML += `<option value="${doc.id}">${doc.id}</option>`;
  });
};

/* 4️⃣ Subject → Chapters → Assignments */
subjectSelect.onchange = async () => {
  content.innerHTML = "";

  const cls = classSelect.value;
  const sec = sectionSelect.value;
  const sub = subjectSelect.value;

  const chaptersRef = collection(
    db,
    "classes",
    cls,
    "sections",
    sec,
    "subjects",
    sub,
    "chapters"
  );

  const chaptersSnap = await getDocs(chaptersRef);

  for (const chapterDoc of chaptersSnap.docs) {
    const chapterDiv = document.createElement("div");
    chapterDiv.className = "chapter";
    chapterDiv.innerHTML = `<h3>${chapterDoc.id}</h3>`;

    const assignRef = query(
      collection(chapterDoc.ref, "assignments"),
      orderBy("date", "desc")
    );

    const assignSnap = await getDocs(assignRef);
    assignSnap.forEach(a => {
      const d = a.data();
      chapterDiv.innerHTML += `
        <div class="assignment">
          <b>${d.date}</b><br/>
          ${d.text}
        </div>
      `;
    });

    content.appendChild(chapterDiv);
  }
};
