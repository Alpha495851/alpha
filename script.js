import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBNQDmQGaje_PexfDp31CPwtr79suMA0aQ",
  authDomain: "websitedatabase495851.firebaseapp.com",
  projectId: "websitedatabase495851",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const classSelect = document.getElementById("classSelect");
const sectionSelect = document.getElementById("sectionSelect");
const subjectSelect = document.getElementById("subjectSelect");
const content = document.getElementById("content");

/* Sections logic */
const sectionMap = {
  class5: ["A", "B", "C"],
  class6: ["A", "B", "C"],
  class7: ["A", "B"],
  class8: ["A", "B"]
};

classSelect.onchange = () => {
  sectionSelect.innerHTML = `<option value="">Select Section</option>`;
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  content.innerHTML = "";

  const cls = classSelect.value;
  sectionSelect.disabled = !cls;
  subjectSelect.disabled = true;

  if (cls) {
    sectionMap[cls].forEach(sec => {
      sectionSelect.innerHTML += `<option value="${sec}">${sec}</option>`;
    });
  }
};

sectionSelect.onchange = async () => {
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;
  content.innerHTML = "";
  subjectSelect.disabled = true;

  const cls = classSelect.value;
  const sec = sectionSelect.value;
  if (!sec) return;

  const subjectsRef = collection(
    db,
    "classes",
    cls,
    "Section",
    sec,
    "subjects"
  );

  const snap = await getDocs(subjectsRef);
  snap.forEach(doc => {
    subjectSelect.innerHTML += `<option value="${doc.id}">${doc.id.replace("_"," ")}</option>`;
  });

  subjectSelect.disabled = false;
};

subjectSelect.onchange = async () => {
  content.innerHTML = "";

  const cls = classSelect.value;
  const sec = sectionSelect.value;
  const sub = subjectSelect.value;

  const chaptersRef = collection(
    db,
    "classes",
    cls,
    "Section",
    sec,
    "subjects",
    sub,
    "chapters"
  );

  const chaptersSnap = await getDocs(chaptersRef);

  chaptersSnap.forEach(async chapterDoc => {
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
          <strong>${d.date}</strong><br/>
          ${d.text}
        </div>
      `;
    });

    content.appendChild(chapterDiv);
  });
};
