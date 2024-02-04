insertData("Ahmednagar");

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (searchInput.value.length === 0) {
      alert("Enter a city name!");
    } else {
      try {
        insertData(searchInput.value);
      } catch (error) {
        alert("Invalid city");
      }
    }
  }
});

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length === 0) {
    alert("Enter a city name!");
  } else {
    try {
       insertData(searchInput.value);
    } catch (error) {
      alert("Invalid city");
    }
  }
});

async function insertData(city) {
  try {
    const response = await fetch(`http://localhost/test.php?city=${city}`);
    if (!response.ok) {
      throw new Error("Invalid city");
    }
    await getWeather(city);
  } catch (error) {
    alert(error.message);
    throw error;
  }
}


function getWeather(inp) {
  fetch(`http://localhost/weather-app.php?city=${inp}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Invalid city");
      }
      return response.json();
    })
    .then((data) => {
      const firstCityData = data[0];
      console.log(firstCityData);

      // Displaying data for the first city in the array
      document.querySelector(".celcius").innerHTML =
        Math.round(parseFloat(firstCityData.temperature)) + "°C";
      document.querySelector(".city").innerHTML = firstCityData.city;
      document.querySelector(".humidityP").innerHTML =
        firstCityData.humidity + "g/m³";
      document.querySelector(".windS").innerHTML =
        parseFloat(firstCityData.wind_speed).toFixed(2) + "KpH";
      document.querySelector(".pressureP").innerHTML =
        firstCityData.pressure + "Pa";
      console.log(firstCityData);
      document.querySelector(".condition .today-condition").innerHTML =
        firstCityData.description;
      document.querySelector(".country").innerHTML = firstCityData.country;

      const date = new Date();
      const localDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      document.querySelector(".date p").innerHTML = localDate;

      
      if (firstCityData.condition == "Clouds") {
        document.querySelector(".icon").src =
          "https://media.discordapp.net/attachments/1190836007050952805/1190836361385738280/cloudy.png?ex=65a33fc9&is=6590cac9&hm=46fc9c2485711c05a9b551d80126eb0ed73e5b330aa520911c2ab7d6cd889ee5&=&format=webp&quality=lossless&width=138&height=123";
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.1SLC.S3KFYPMqZhHBxjD?w=1024&h=1024&rs=1&pid=ImgDetMain")';
      } else if (firstCityData.condition == "Clear") {
        document.querySelector(".icon").src =
          "https://media.discordapp.net/attachments/1190836007050952805/1190836362312679474/sunny.png?ex=65a33fc9&is=6590cac9&hm=e271e8267071c90c57525ff88f63c05eaf04221d4dc064a40c940af9f135610a&=&format=webp&quality=lossless&width=150&height=132";
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.9o3jPM5i4bpqxBAxKFhl?pid=ImgGn")';
      } else if (firstCityData.condition == "Rain") {
        document.querySelector(".icon").src =
          "https://media.discordapp.net/attachments/1190836007050952805/1190836361645805660/rain.png?ex=65a33fc9&is=6590cac9&hm=59ffb67648f1e9f545de43e010a7ba01179e0cec66f5f419a6ff77eea6b04f31&=&format=webp&quality=lossless&width=145&height=135";
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.PCnP1sKWX2TWaIhIMjCV?pid=ImgGn")';
      } else if (firstCityData.condition == "Snow") {
        document.querySelector(".icon").src =
          "https://media.discordapp.net/attachments/1190836007050952805/1190836361960362054/snow.png?ex=65a33fc9&is=6590cac9&hm=63f6e3b5921b60d21d3fb2d2a0dcab0b932b6d6c49c251e790bd1f806a919137&=&format=webp&quality=lossless&width=140&height=128";
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.k5zwZn.JPAdbMxp_AJ6V?pid=ImgGn")';
      } else if (
        firstCityData.condition == "Fog" ||
        firstCityData.condition == "Mist"
      ) {
        document.querySelector(".icon").src =
          "https://i.pinimg.com/564x/85/68/9f/85689f2b05e5a2319035896c1a79a39f.jpg";
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.nkCqLNkr0A_r7idl67ZK?w=1024&h=1024&rs=1&pid=ImgDetMain")';
      }

      // day and night bg manipulation
      if (firstCityData.icon == "01n" && firstCityData.condition == "Clear") {
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.VPVCe_633udtbGtA2zdH?w=1024&h=1024&rs=1&pid=ImgDetMain")';
      } else if (
        firstCityData.icon == "02n" ||
        firstCityData.icon == "03n" ||
        (firstCityData.icon == "04n" && firstCityData.condition == "Clouds")
      ) {
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.kvlOt9_ImNkRgTD_pJm7?w=1024&h=1024&rs=1&pid=ImgDetMain")';
      } else if (
        firstCityData.icon == "10n" ||
        (firstCityData.icon == "09n" && firstCityData.condition == "Rain")
      ) {
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.y5Cd4gZ34Y2CpZwlUNU.?pid=ImgGn")';
      } else if (
        firstCityData.icon == "13n" &&
        firstCityData.condition == "Snow"
      ) {
        document.body.style.backgroundImage =
          'url("https://th.bing.com/th/id/OIG.34QK6xVvWYmc3yGamdJP?w=1024&h=1024&rs=1&pid=ImgDetMain")';
      } else if (
        firstCityData.icon == "50n" &&
        firstCityData.condition == "Mist"
      ) {
        ('url("https://th.bing.com/th/id/OIG.CDFEbog6vkDP.Dpi3Pkr?w=1024&h=1024&rs=1&pid=ImgDetMain")');
      } else if (
        firstCityData.icon == "11n" &&
        firstCityData.description == "thunderstorm"
      ) {
        ('url("https://th.bing.com/th/id/OIG.9SQcXsSsMeiOiQmv8HW3?w=1024&h=1024&rs=1&pid=ImgDetMain")');
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Invalid city");
    });
}


var x= document.querySelector("#past_table")
var back_button = document.querySelector(".back")
var btn = document.querySelector("#pd")
var y = document.querySelector(".history")

btn.addEventListener("click",()=>{
  fetchAndInsertPastData()
  y.style.display = 'None';
  x.style.display = "block";
  back_button.style.display = "block"; // yo bhitra getPastData call garne last ma
})
x.style.display="none";
back_button.style.display="none"

back_button.addEventListener("click",()=>{
  window.location.reload();
})

// Function to insert past data into the HTML table
function insertPastData(data) {
  const table = document.getElementById("past_table");
 
  // Check if there's any data
  if (data.length > 0) {
    // Insert rows for available data
    data.forEach((pastData) => {
      const row = table.insertRow();
      const cells = Object.values(pastData);
      cells.forEach((cellValue) => {
        const cell = row.insertCell();
        cell.innerHTML = cellValue;
      });
    });
  } else {
    // Show "No records found" message
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.colSpan = table.rows[0].cells.length; // Span all columns
    cell.innerHTML = "No past data available for this city";
    cell.classList.add("no-records"); // Optional: Add a class for styling
  }
 }
 
  
// Function to fetch past weather data and insert it into the table
async function fetchAndInsertPastData() {
  try {
    var city = document.querySelector('.search-input').value || 'Ahmednagar'
    const response = await fetch(`http://localhost/past_data.php?city=${city}`);
    const pastData = await response.json();
    insertPastData(pastData);
  } catch (error) {
    console.error("Error fetching past data:", error);
  }
}
// Call this function with the desired city to fetch and insert past data

