//selectors for cite/date/time elements
let city1Elemt = document.querySelector("#city1");
let city1Date = document.querySelector("#date1");
let city1Time = document.querySelector("#time1");

let selectedCity = document.querySelector("#city-select");
let dropdownTimezone = selectedCity.value;

let clockContainer = document.querySelector("#clocks-container");

//setting up the additional clock divs
function createClockDiv(dropdownCity, dropdownTimezone) {
  const newClock = document.createElement("div");
  newClock.className = "clock";

  newClock.innerHTML = `
    <h2>${dropdownCity}</h2>
    <p class="date-time">
      <span class="date">${moment
        .tz(dropdownTimezone)
        .format("dddd MMMM Do, YYYY")}</span>
      <span class="time">${moment
        .tz(dropdownTimezone)
        .format("HH:mm:ss a")}</span>
    </p>
    <br />
  `;

  return newClock;
}
//what happens when selecting a city from the dropdown
// first alter current clock div,
// second add new clock divs above the previous
selectedCity.addEventListener("change", function () {
  let dropdownTimezone = selectedCity.value;
  let dropdownCity = selectedCity.options[selectedCity.selectedIndex].text;
  console.log(dropdownTimezone);
  console.log(dropdownCity);
  city1Elemt.innerHTML = dropdownCity;
  city1Date.innerHTML = moment()
    .tz(dropdownTimezone)
    .format("dddd MMMM Do, YYYY");
  city1Time.innerHTML = moment().tz(dropdownTimezone).format("HH:mm:ss a");

  const newClockDiv = createClockDiv(dropdownCity, dropdownTimezone);
  clockContainer.insertBefore(newClockDiv, clockContainer.firstChild);
});
