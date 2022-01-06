import moment from "moment";

//remove html tags from a string, leaving only the inner text
export const removeHTML = (str) => {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = str;
  return tmp.textContent || tmp.innerText || "";
};

export const dateTimeFormat = (oldDate, local = false) => {
  var dtFormat = "YYYY/MM/DD HH:mm";
  var date = moment(oldDate);

  return local ? date.local().format(dtFormat) : date.utc().format(dtFormat);
};

/* const localStorageShowExists = (show) => {
  let existingEntries = JSON.parse(localStorage.getItem("favoriteShows"));
  if (existingEntries == null) existingEntries = [];
  return existingEntries.some((e) => e.name === show.name);
};

const localStorageShowAdd = (show) => {
  let existingEntries = JSON.parse(localStorage.getItem("favoriteShows"));
  if (existingEntries == null) existingEntries = [];
  existingEntries.push(show);
  localStorage.setItem("favoriteShows", JSON.stringify(existingEntries));
};

const localStorageRemove = (show) => {
  let existingEntries = JSON.parse(localStorage.getItem("favoriteShows"));
  if (existingEntries == null) existingEntries = [];
  let filteredList = existingEntries.filter((e) => e.name !== show.name);
  localStorage.setItem("favoriteShows", JSON.stringify(filteredList));
}; */
