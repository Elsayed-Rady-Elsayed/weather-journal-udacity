//variables used in the code
const zipCode = document.getElementById("zip");
const fellingsText = document.getElementById("feelings");
const temp = document.getElementById("temperature");
const contentText = document.getElementById("content");
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
// Personal API Key for OpenWeather API
const apiKey = "a40dbdb02c9e38941ed658a147a7ee06";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const fetchWeather = async (baseUrl, zipCode, apiKey) => {
  try {
    const request = await fetch(
      `${baseUrl}?zip=${zipCode},us&units=metric&APPID=${apiKey}`
    );
    const result = await request.json();
    const {
      main: { temp },
    } = result;
    return temp;
  } catch (e) {}
};
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: "POST",
      headers: {
        "contentText-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {}
};
const updateUI = async (temperature, newDate, fellings) => {
  document.getElementById("date").innerText = newDate;
  temp.innerText = `${temperature} deg`;
  ``;
  contentText.innerText = fellings;
};
document.getElementById("generate").addEventListener("click", () => {
  fetchWeather(baseUrl, zipCode.value, apiKey)
    .then((temp) => {
      return { date: newDate, temp, contentText: fellingsText.value };
    })
    .then((data) => {
      saveData("/api/projectdata", data);
      return data;
    })
    .then(({ temp, date, contentText }) => updateUI(temp, date, contentText))
    .catch((e) => {
      console.error(e);
    });
});
