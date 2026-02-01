let data = {};

fetch("data/notes.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    loadClasses();
  });

const classSelect = document.getElementById("classSelect");
const sectionSelect = document.getElementById("sectionSelect");
const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const content = document.getElementById("content");

function loadClasses() {
  classSelect.innerHTML = "<option value=''>Select</option>";
  Object.keys(data).forEach(cls => {
    classSelect.innerHTML += `<option value="${cls}">${cls}</option>`;
  });
}

classSelect.onchange = () => {
  sectionSelect.innerHTML = "";
  subjectSelect.innerHTML = "";
  chapterSelect.innerHTML = "";
  content.innerHTML = "";

  Object.keys(data[classSelect.value]).forEach(sec => {
    sectionSelect.innerHTML += `<option value="${sec}">${sec}</option>`;
  });
};

sectionSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const sectionData = snap.data()[sectionSelect.value];

  subjectSelect.innerHTML = "<option>Select Subject</option>";

  Object.keys(sectionData).forEach(subject => {
    subjectSelect.innerHTML += <option value="${subject}">${subject}</option>;
  });
};

subjectSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const chapters =
    snap.data()[sectionSelect.value][subjectSelect.value];

  chapterSelect.innerHTML = "<option>Select Chapter</option>";

  Object.keys(chapters).forEach(ch => {
    chapterSelect.innerHTML += <option value="${ch}">${ch}</option>;
  });
};

chapterSelect.onchange = async () => {
  const snap = await getDoc(doc(db, "classes", classSelect.value));
  const data =
    snap.data()[sectionSelect.value]
      [subjectSelect.value]
      [chapterSelect.value];

  assignmentsDiv.innerHTML = <h3>${chapterSelect.value}</h3>;
  assignmentsDiv.innerHTML += <p>${data.notes}</p>;

  Object.keys(data.assignments)
    .sort((a, b) => b.localeCompare(a))
    .forEach(date => {
      assignmentsDiv.innerHTML += <p><b>${date}</b>: ${data.assignments[date]}</p>;
    });
};
