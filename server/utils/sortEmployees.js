// utils/sortEmployees.js
const designationPriority = {
  Principal: 1,
  "Vice Principal": 2,
  Professor: 3,
  "Associate Professor": 4,
  "Assistant Professor": 5,
  Lecturer: 6,
  Librarian: 7,
  Demonstrator: 8,
  "Assistant Librarian": 8,
  "Computer Operator": 9,
  "Account Assistant": 9,
  "Lab Assistant": 10,
  "Office Assistant (MLSS)": 11,
};

const sortEmployees = (employees) => {
  return employees.sort((a, b) => {
    const rankA = designationPriority[a.designation] || 99;
    const rankB = designationPriority[b.designation] || 99;

    if (rankA !== rankB) return rankA - rankB;

    // Secondary: Alphabetical order for same-rank designations
    if (a.designation !== b.designation) {
      return a.designation.localeCompare(b.designation);
    }

    // Then sort by MPO date
    const mpoA = new Date(a.mpoDate || "9999-12-31");
    const mpoB = new Date(b.mpoDate || "9999-12-31");
    if (mpoA.getTime() !== mpoB.getTime()) return mpoA - mpoB;

    // Then sort by birth date
    const dobA = new Date(a.dob || "9999-12-31");
    const dobB = new Date(b.dob || "9999-12-31");
    return dobA - dobB;
  });
};

module.exports = sortEmployees;
