// fetch api dari aladhan.com
function prayerTimes(latitude, longitude) {
  fetch("http://api.aladhan.com/v1/calendar?latitude=" + latitude + "&longitude=" + longitude + "&method=2")
    .then((response) => response.json())
    .then(function (response) {
      let date = new Date();
      let today = date.getDate() - 1;
      let data = response.data[0].timings;

      let app = document.getElementById("app");
      let table = document.createElement("table");
      let tbody = document.createElement("tbody");

      for (const index in data) {
        let row = tbody.insertRow();
        let name = row.insertCell(0);
        let time = row.insertCell(1);
        name.innerHTML = index;
        time.innerHTML = data[index];
        tbody.appendChild(row);
      }
      table.appendChild(tbody);
      app.appendChild(table);
      // console.log(today);
      // console.log(response.data[today]);
    });
}

// berhasil
function success(position) {
  prayerTimes(position.coords.latitude, position.coords.longitude);
}

// error / kesalahan
function error() {
  alert("Posisi tidak dapat di akses");
}

// menampilkan pesan error geolocation
function userLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation tidak didukung di browser anda, silahkan gunakan browser lain");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

// global
function index() {
  let app = document.getElementById("app");
  let h3 = document.createElement("h3");
  h3.textContent = "Prayer Times";

  app.appendChild(h3);

  userLocation();
}
index();
