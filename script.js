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

sectionSelect.onchange = () => {
  subjectSelect.innerHTML = "";
  chapterSelect.innerHTML = "";
  content.innerHTML = "";

  const subjects = data[classSelect.value][sectionSelect.value];
  Object.keys(subjects).forEach(sub => {
    subjectSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
  });
};

subjectSelect.onchange = () => {
  chapterSelect.innerHTML = "";
  content.innerHTML = "";

  const chapters = data[classSelect.value][sectionSelect.value][subjectSelect.value];
  Object.keys(chapters).forEach(ch => {
    chapterSelect.innerHTML += `<option value="${ch}">${ch}</option>`;
  });
};

chapterSelect.onchange = () => {
  const chapter = data[classSelect.value][sectionSelect.value][subjectSelect.value][chapterSelect.value];

  content.innerHTML = `
    <h3>Notes</h3>
    <p>${chapter.notes}</p>
    <h3>Assignments</h3>
  `;

  Object.keys(chapter.assignments)
    .sort((a,b) => b.localeCompare(a))
    .forEach(date => {
      content.innerHTML += `<p><b>${date}</b>: ${chapter.assignments[date]}</p>`;
    });
};
