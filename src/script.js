//selectors for cite/date/time elements
let topClock = document.querySelector("#clock1");
let city1Elemt = document.querySelector(".city");
let city1Date = document.querySelector(".date");
let city1Time = document.querySelector(".time");

let selectedCity = document.querySelector("#city-select");
let dropdownTimezone = selectedCity.value;

let clockContainer = document.querySelector("#clocks-container");

const clocks = [
  {
    element: topClock,
    timeZone: "America/New_York", // default timezone
  },
];

//setting up the additional clock divs
function createClockDiv(dropdownCity, dropdownTimezone) {
  const newClock = document.createElement("div");
  newClock.className = "clock";

  newClock.innerHTML = `
    <h2 class="city">${dropdownCity}</h2>
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

  clocks.push({ element: newClock, timeZone: dropdownTimezone });

  return newClock;
}
//what happens when selecting a city from the dropdown
// first alter current clock div,
// second add new clock divs above the previous
selectedCity.addEventListener("change", function () {
  let dropdownTimezone = selectedCity.value;
  let dropdownCity = selectedCity.options[selectedCity.selectedIndex].text;

  if (dropdownCity === "My current location") {
    dropdownTimezone = moment.tz.guess();
    dropdownCity = "Local Time";
  }

  console.log(dropdownTimezone);
  console.log(dropdownCity);

  city1Elemt.innerHTML = dropdownCity;
  city1Date.innerHTML = moment()
    .tz(dropdownTimezone)
    .format("dddd MMMM Do, YYYY");
  city1Time.innerHTML = moment().tz(dropdownTimezone).format("HH:mm:ss a");

  clocks[0].timeZone = dropdownTimezone;

  const newClockDiv = createClockDiv(dropdownCity, dropdownTimezone);
  clockContainer.insertBefore(newClockDiv, clockContainer.firstChild);
});

// Update all clocks every second
setInterval(() => {
  clocks.forEach((clock) => {
    const dateElem = clock.element.querySelector(".date");
    const timeElem = clock.element.querySelector(".time");
    if (dateElem && timeElem) {
      const now = moment().tz(clock.timeZone);
      dateElem.textContent = now.format("dddd MMMM Do, YYYY");
      timeElem.textContent = now.format("HH:mm:ss a");
    }
  });
}, 1000);
