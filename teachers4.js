"use strict";

/* =====================================================================
   STAFF DATA, taken from the school's Staffs.docx list.
   Add, change or remove entries here. Former (retired or transferred)
   staff are not in the list yet: add them with status "retired" or
   "transferred" and a "left" date.

   Fields
   id             unique, no spaces
   name           full name including Sri / Smt. if you use it
   role           post held, e.g. "Assistant Teacher", "Head Clerk"
   group          "headmaster" | "teaching" | "nonteaching"
   status         "current" | "retired" | "transferred"
   joined         date of joining this school, "YYYY-MM-DD"
   left           date of retirement or transfer (former staff only)
   retirementDue  expected retirement date (current staff, optional)
   headSince      date became headmaster (headmaster only)
   transferredTo  where they moved (transferred staff, optional)
   subject, qualification, bio, message (headmaster only), photo
   photo          e.g. "images/staff/kaushik-roy.jpg". Leave "" for initials.

   Later, when the site becomes dynamic, replace this array with a
   fetch("/api/staff") call. The rendering code below stays the same.
   ===================================================================== */
const STAFF = [
  { id: "hm-shirsendu-dtta", name: "Shirsendu Dutta", role: "Headmaster", group: "headmaster", status: "current", subject: "Physics", qualification: "Ph D, M. Sc, B. Ed", joined: "2002-10-09", retirementDue: "2035-11-30", photo: "images/staff/headmaster.jpg",
    /* Placeholder wording, not written by the headmaster. Replace with his own message. */
    message: "Every child who walks through our gate has something worth developing. Our job is to notice it early and help it grow." },
  { id: "t-saradindu-banerjee", name: "Saradindu Banerjee", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Mathematics", qualification: "M. Sc, B. Ed", joined: "1997-02-10", retirementDue: "2028-01-31", photo: "", bio:"Staff of SHS" },
  { id: "n-asim-bairagya", name: "Asim Bairagya", role: "Group D Staff", group: "nonteaching", status: "current", qualification: "Secondary", joined: "1997-10-06", retirementDue: "2031-02-28", photo: "" , bio:"Staff of SHS"},
  { id: "t-ramkrishna-malick", name: "Ramkrishna Malick", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Economics", qualification: "M. Sc, B. Ed", joined: "1997-10-06", retirementDue: "2027-01-31", photo: "", bio:"Staff of SHS" },
  { id: "n-abhijit-das", name: "Abhijit Das", role: "Clerk", group: "nonteaching", status: "current", qualification: "B. A", joined: "1998-08-04", retirementDue: "2033-01-31", photo: "" , bio:"Staff of SHS" },
  { id: "n-jaleswar-mandi", name: "Jaleswar Mandi", role: "Group D Staff", group: "nonteaching", status: "current", qualification: "Secondary", joined: "1999-02-07", retirementDue: "2027-07-31", photo: "", bio:"Staff of SHS" },
  { id: "t-soumitra-pal", name: "Soumitra Pal", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Geography", qualification: "B.A, B.Ed", joined: "2001-08-21", retirementDue: "2038-09-30", photo: "", bio:"Staff of SHS" },
  { id: "t-kishor-kumar-mondal", name: "Kishor Kumar Mondal", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Biology", qualification: "M. Sc, B. Ed", joined: "2006-03-01", retirementDue: "2039-02-28", photo: "", bio:"Staff of SHS" },
  { id: "t-tanmoy-ganguli", name: "Tanmoy Ganguli", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Mathematics", qualification: "B. Sc, B. Ed", joined: "2007-10-09", retirementDue: "2040-03-31", photo: "", bio:"Staff of SHS" },
  { id: "t-arup-kumar-mukherjee", name: "Arup Kumar Mukherjee", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Computer", qualification: "MCA, BEd", joined: "2008-09-26", retirementDue: "2039-10-31", photo: "images/staff/Arup.jpg",bio: "Completed MCA from Asansol Engineering College in 2007, Worked as a Guest Lecturer in BC College, Asansol."},
  { id: "t-manu-murmu", name: "Manu Murmu", role: "Assistant Teacher", group: "teaching", status: "current", subject: "English", qualification: "B.A, B.Ed", joined: "2009-08-31", retirementDue: "2047-02-28", photo: "", bio:"Staff of SHS" },
  { id: "t-basudeb-bag", name: "Basudeb Bag", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Sanskrit", qualification: "M.A, B.Ed", joined: "2004-03-12", retirementDue: "2040-12-31", photo: "", bio:"Staff of SHS" },
  { id: "t-tapati-majumdar", name: "Tapati Majumdar", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Physical Education", qualification: "B.A, B.Ed", joined: "2007-11-30", retirementDue: "2029-02-28", photo: "" , bio:"Staff of SHS"},
  { id: "t-anupam-koner", name: "Anupam Koner", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Geography", qualification: "M.A, B.Ed", joined: "2011-06-29", retirementDue: "2047-04-30", photo: "", bio:"Staff of SHS" },
  { id: "t-suvasis-misra", name: "Suvasis Misra", role: "Assistant Teacher", group: "teaching", status: "current", subject: "English", qualification: "M.A, B.Ed", joined: "2004-06-01", retirementDue: "2032-12-31", photo: "" , bio:"Staff of SHS" },
  { id: "t-sandip-kr-ghosh", name: "Sandip Kr. Ghosh", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Chemistry", qualification: "B. Sc, B. Ed", joined: "2011-07-01", retirementDue: "2049-06-30", photo: "" , bio:"Staff of SHS" },
  { id: "t-beauty-chandra", name: "Beauty Chandra", role: "Para Teacher", group: "teaching", status: "current", subject: "History", qualification: "B.A, B.Ed", joined: "2006-09-21", retirementDue: "2042-04-30", photo: "" , bio:"Staff of SHS"},
  { id: "t-soma-roy", name: "Soma Roy", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Philosophy", qualification: "M.A, B.Ed", joined: "2018-09-20", retirementDue: "2048-12-31", photo: "" , bio:"Staff of SHS"},
  { id: "t-prosenjit-koner", name: "Prosenjit Koner", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Bengali", qualification: "B.A, B.Ed", joined: "2011-07-05", retirementDue: "2044-04-30", photo: "" , bio:"Staff of SHS" },
  { id: "n-dhrubajyoti-banerjee", name: "Dhrubajyoti Banerjee", role: "Group D Staff", group: "nonteaching", status: "current", qualification: "B.Com", joined: "2012-11-27", retirementDue: "2035-06-30", photo: "" , bio:"Staff of SHS"},
  { id: "t-maitrayee-koner", name: "Maitrayee Koner", role: "Para Teacher", group: "teaching", status: "current", subject: "Bengali", qualification: "B.A, B.Ed", joined: "2004-09-13", retirementDue: "2040-01-31", photo: "", bio:"Staff of SHS" },
  { id: "t-pabitra-pramanik", name: "Pabitra Pramanik", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Bengali", qualification: "B.A, B.Ed", joined: "2011-07-12", retirementDue: "2047-08-31", photo: "", bio:"Staff of SHS" },
  { id: "t-ayan-bandyopadhyay", name: "Ayan Bandyopadhyay", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Bengali", qualification: "Ph D, M. A, B. Ed", joined: "2011-07-12", retirementDue: "2046-05-31", photo: "" , bio:"Staff of SHS"},
  { id: "t-ramen-ghosh", name: "Ramen Ghosh", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Physical Education", qualification: "B.A, B.Ed", joined: "2008-09-27", retirementDue: "2042-07-31", photo: "", bio:"Staff of SHS" },
  { id: "t-antara-banerjee", name: "Antara Banerjee", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Bengali", qualification: "M.A, B.Ed", joined: "2022-02-02", retirementDue: "2040-08-31", photo: "" , bio:"Staff of SHS"},
  { id: "t-juin-mukherjee-som", name: "Juin Mukherjee Som", role: "Assistant Teacher", group: "teaching", status: "current", subject: "English", qualification: "M.A, B.Ed", joined: "2010-08-09", retirementDue: "2041-02-28", photo: "" , bio:"Staff of SHS"},
  { id: "t-shatavisa-mukherjee", name: "Shatavisa Mukherjee", role: "Assistant Teacher", group: "teaching", status: "current", subject: "Physics", qualification: "Ph D, M. Sc, B. Ed", joined: "2010-08-14", retirementDue: "2044-03-31", photo: "", bio:"Staff of SHS" },
  { id: "t-rohit-dan", name: "Rohit Dan", role: "ICT Instructor", group: "teaching", status: "current", subject: "Computer", qualification: "B Tech", photo: "", bio:"Staff of SHS" }
];

/* ---------- Helpers ---------- */

const HONORIFICS = ["sri", "shri", "smt", "smt.", "dr", "dr.", "mr", "mr.", "mrs", "mrs.", "ms", "ms."];

/* "2009-06-01" becomes a local Date (avoids time-zone shifts) */
function parseDate(text) {
  const [y, m, d] = text.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(text) {
  if (!text) return "Not listed";
  return parseDate(text).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function serviceLength(fromText, toDate) {
  const from = parseDate(fromText);
  let months = (toDate.getFullYear() - from.getFullYear()) * 12 + (toDate.getMonth() - from.getMonth());
  if (toDate.getDate() < from.getDate()) months -= 1;
  months = Math.max(months, 0);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(years + (years === 1 ? " year" : " years"));
  if (rest) parts.push(rest + (rest === 1 ? " month" : " months"));
  return parts.length ? parts.join(", ") : "Less than a month";
}

function initials(name) {
  const words = name.split(/\s+/).filter(w => !HONORIFICS.includes(w.toLowerCase()));
  const first = words[0] ? words[0][0] : "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/* Build elements with textContent, never innerHTML, so data from a
   database later cannot inject markup into the page. */
function h(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function portrait(person, className) {
  const box = h("div", className);
  const showInitials = () => box.replaceChildren(h("span", "initials", initials(person.name)));
  if (person.photo) {
    const img = document.createElement("img");
    img.src = person.photo;
    img.alt = person.name;
    img.loading = "lazy";
    img.addEventListener("error", showInitials);
    box.append(img);
  } else {
    showInitials();
  }
  return box;
}

function isFormer(person) { return person.status !== "current"; }

function roleLine(person) {
  return person.subject ? person.role + ", " + person.subject : person.role;
}

/* Text for the "end of service" column */
function endInfo(person) {
  if (person.status === "retired") return { label: "Retired", cls: "retired", value: formatDate(person.left) };
  if (person.status === "transferred") return { label: "Transferred", cls: "transferred", value: formatDate(person.left) };
  return { label: "Retires", cls: "", value: person.retirementDue ? formatDate(person.retirementDue) : "Not listed" };
}

function dateCell(label, value, cls) {
  const cell = h("span", "date-cell");
  cell.append(h("span", "date-label" + (cls ? " " + cls : ""), label), h("span", "date-value", value));
  return cell;
}

function addFact(list, label, value) {
  if (!value) return;
  list.append(h("dt", "", label), h("dd", "", value));
}

/* ---------- Headmaster feature ---------- */

function buildHeadmaster(person) {
  const card = h("article", "head-card");
  card.append(portrait(person, "head-photo"));

  const body = h("div", "head-body");
  body.append(h("h2", "", person.name), h("p", "head-role", person.role));
  if (person.message) body.append(h("p", "head-message", "\u201C" + person.message + "\u201D"));

  const dates = h("dl", "head-dates");
  const add = (label, value) => {
    const box = h("div");
    box.append(h("dt", "", label), h("dd", "", value));
    dates.append(box);
  };
  add("Joined the school", formatDate(person.joined));
  if (person.headSince) add("Headmaster since", formatDate(person.headSince));
  add("Retires", person.retirementDue ? formatDate(person.retirementDue) : "Not listed");
  if (person.subject) add("Subject", person.subject);
  if (person.qualification) add("Qualification", person.qualification);
  body.append(dates);

  card.append(body);
  return card;
}

/* ---------- Register rows ---------- */

function buildRow(person) {
  const former = isFormer(person);
  const end = endInfo(person);

  const li = h("li", "person");
  li.dataset.status = person.status;
  li.dataset.search = [person.name, person.role, person.subject, person.qualification, person.status]
    .filter(Boolean).join(" ").toLowerCase();

  const detailId = "detail-" + person.id;
  const heading = h("h3", "person-heading");
  const button = h("button", "person-toggle");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", detailId);

  const main = h("span", "person-main");
  main.append(h("span", "person-name", person.name), h("span", "person-role", roleLine(person)));

  const dates = h("span", "person-dates");
  dates.append(dateCell("Joined", formatDate(person.joined)), dateCell(end.label, end.value, end.cls));

  const chevron = h("span", "chev");
  chevron.setAttribute("aria-hidden", "true");
  const avatar = h("span", "avatar", initials(person.name));
  avatar.setAttribute("aria-hidden", "true");

  button.append(avatar, main, dates, chevron);
  heading.append(button);

  const detail = h("div", "person-detail");
  detail.id = detailId;
  detail.hidden = true;
  detail.append(portrait(person, "detail-photo"));

  const text = h("div");
  if (person.bio) text.append(h("p", "detail-bio", person.bio));
  const facts = h("dl", "facts");
  addFact(facts, "Post", person.role);
  addFact(facts, "Subject", person.subject);
  addFact(facts, "Qualification", person.qualification);
  addFact(facts, "Joined the school", formatDate(person.joined));
  addFact(facts, end.label === "Retires" ? "Due to retire" : end.label, end.value);
  if (person.transferredTo) addFact(facts, "Moved to", person.transferredTo);
  if (person.joined) {
    const until = former && person.left ? parseDate(person.left) : new Date();
    addFact(facts, former ? "Years at this school" : "Time at this school", serviceLength(person.joined, until));
  }
  text.append(facts);
  detail.append(text);

  li.append(heading, detail);
  button.addEventListener("click", () => toggleRow(li));
  return li;
}

function openRow(li) {
  li.classList.add("open");
  li.querySelector(".person-toggle").setAttribute("aria-expanded", "true");
  li.querySelector(".person-detail").hidden = false;
}

function closeRow(li) {
  li.classList.remove("open");
  li.querySelector(".person-toggle").setAttribute("aria-expanded", "false");
  li.querySelector(".person-detail").hidden = true;
}

/* One profile open at a time within each list */
function toggleRow(li) {
  const willOpen = !li.classList.contains("open");
  li.parentElement.querySelectorAll(".person.open").forEach(closeRow);
  if (willOpen) openRow(li);
}

/* ---------- Search and filters ---------- */

let searchText = "";
let formerFilter = "all";

function emptyMessage(listId, query, filter) {
  const list = document.getElementById(listId);
  if (!list.children.length) return "No one is listed here yet.";
  if (query) return "Nothing matches \u201C" + query + "\u201D. Check the spelling or try a subject.";
  if (filter !== "all") return "No " + filter + " staff are listed.";
  return "No one is listed here yet.";
}

function applyFilters() {
  const query = searchText.trim().toLowerCase();
  document.querySelectorAll(".register").forEach(list => {
    let shown = 0;
    list.querySelectorAll(".person").forEach(li => {
      const textOk = !query || li.dataset.search.includes(query);
      const statusOk = list.id !== "former-list" || formerFilter === "all" || li.dataset.status === formerFilter;
      li.hidden = !(textOk && statusOk);
      if (!li.hidden) shown += 1;
    });
    const note = document.getElementById(list.id.replace("-list", "-empty"));
    if (shown === 0) {
      note.textContent = emptyMessage(list.id, searchText.trim(), list.id === "former-list" ? formerFilter : "all");
      note.hidden = false;
    } else {
      note.hidden = true;
    }
  });
}

/* ---------- Page setup ---------- */

function fillList(listId, people, sorter) {
  const list = document.getElementById(listId);
  list.replaceChildren(...people.slice().sort(sorter).map(buildRow));
}

function setCount(id, number) {
  const el = document.getElementById(id);
  if (el) el.textContent = "(" + number + ")";
}

function init() {
  const current = STAFF.filter(p => !isFormer(p));
  const former = STAFF.filter(isFormer);

  const headmaster = current.find(p => p.group === "headmaster");
  const slot = document.getElementById("headmaster-slot");
  if (headmaster) {
    slot.replaceChildren(buildHeadmaster(headmaster));
  } else {
    slot.replaceChildren(h("p", "empty", "The headmaster's profile will appear here."));
  }

  const teaching = current.filter(p => p.group === "teaching");
  const nonTeaching = current.filter(p => p.group === "nonteaching");

  const stamp = (text, missing) => (text ? parseDate(text).getTime() : missing);
  /* Order: Assistant Teachers, then Para Teachers, then the ICT Instructor.
     Inside each group, earliest retirement first; no date goes last.
     Non-teaching staff share one group, so they sort by retirement only. */
  const ROLE_RANK = { "Assistant Teacher": 1, "Para Teacher": 2, "ICT Instructor": 3 };
  const byRankThenRetirement = (a, b) => {
    const rank = (ROLE_RANK[a.role] || 0) - (ROLE_RANK[b.role] || 0);
    if (rank) return rank;
    const x = stamp(a.retirementDue, Infinity), y = stamp(b.retirementDue, Infinity);
    return (x > y) - (x < y);
  };
  const byLeftDesc = (a, b) => {
    const x = stamp(a.left, -Infinity), y = stamp(b.left, -Infinity);
    return (y > x) - (y < x);
  };

  fillList("teaching-list", teaching, byRankThenRetirement);
  fillList("nonteaching-list", nonTeaching, byRankThenRetirement);
  fillList("former-list", former, byLeftDesc);

  setCount("count-teaching", teaching.length);
  setCount("count-nonteaching", nonTeaching.length);
  setCount("count-former", former.length);

  document.getElementById("staff-search").addEventListener("input", event => {
    searchText = event.target.value;
    applyFilters();
  });

  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      formerFilter = chip.dataset.filter;
      document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
      applyFilters();
    });
  });

  applyFilters();
}

document.addEventListener("DOMContentLoaded", init);
