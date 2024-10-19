//http://127.0.0.1:5501/temperatures.json
///ISITRAUKIAME DUOMENIS
//Galima be http://127.0.0.1:5501 jeigu dirbame savo serveryje. tačiau skirtumo nėra.
// pirmas then paema duomenis  is serverio ir per json antrame then gaunami duomenis kuriuos jau galime naudoti

fetch('http://127.0.0.1:5501/temperatures.json')
  .then((response) => response.json())
  .then((data) => {
    changeData(data.temperatureData.data[0].date);
    changeCity(data.temperatureData.city);
    changeLastDate(
      data.temperatureData.data[data.temperatureData.data.length - 1].date
    );
    fillTempTable(data.temperatureData.data);
    calcAvgTemp(data.temperatureData.data);
    // findHours(data.temperatureData.data[0].hourlyTemperatures);
    // console.log(data.temperatureData.data);
    // console.log(data.temperatureData.data[0].hourlyTemperatures);
  });

function changeData(date) {
  const spanElement = document.querySelector('#start-date');
  spanElement.innerText = date;
}

function changeCity(city) {
  const spanElement = document.querySelector('#city');
  spanElement.innerText = city;
}

function changeLastDate(date) {
  const spanElement = document.querySelector('#last-date');
  spanElement.innerText = date;
}

function fillTempTable(data) {
  let html = '';
  for (const tempData of data) {
    const minMaxTemps = findMinMaxTemperature(tempData.hourlyTemperatures);
    // console.log(minMaxTemps);
    html += `<tr>

          <td>${tempData.date}</td>
          <td>${minMaxTemps.minTemperature}</td>
          <td>${minMaxTemps.maxTemperature}</td>
        </tr>`;
  }

  const tbody = document.querySelector('#avg-temperatures'); // gaunamas elemntas

  tbody.innerHTML = html;
}

// function findMinimumTemperature(temperatures) {
//   const allTemperatures = Object.values(temperatures);
//   const minTemperature = Math.min(...allTemperatures);
//   return minTemperature;
// }

// function findMaximumTemperature(temperatures) {
//   const allTemperatures = Object.values(temperatures);
//   const maxTemperature = Math.max(...allTemperatures);
//   return maxTemperature;
// }

function findMinMaxTemperature(temperatures) {
  const allTemperatures = Object.values(temperatures);
  //   console.log(allTemperatures);
  const minTemperature = Math.min(...allTemperatures);
  const maxTemperature = Math.max(...allTemperatures);
  return { minTemperature, maxTemperature };
}

function findHours(hours) {
  const allTimes = Object.keys(hours);
  //   console.log(allTimes);
}
/*  .then((data) => changeCity(data.temperatureData.city));

<tr>
          <td>2024-10-01</td>
          <td>15.7</td>
          <td>8.4</td>
        </tr>
// console.log(data.temperatureData.data[0]
 */

//// ___________
function calcAvgTemp(temperatures) {
  let avg = 0;
  let karstaDiena = '';
  let slataDiena = '';
  let auksciausiaTemp = -Infinity;
  let zemiausiaTemp = Infinity;

  for (const valandosTemp of temperatures) {
    const hourlyTemperatures = Object.values(valandosTemp.hourlyTemperatures);

    let dienosTemperaturosSuma = 0;

    for (const temp of hourlyTemperatures) {
      dienosTemperaturosSuma += temp;

      if (temp > auksciausiaTemp) {
        auksciausiaTemp = temp;
        karstaDiena = valandosTemp.date;
      }
      if (temp < zemiausiaTemp) {
        zemiausiaTemp = temp;
        slataDiena = valandosTemp.date;
      }
    }
  }
  const saltaElement = document.querySelector('.salta');
  const karstaElement = document.querySelector('.karsta');

  saltaElement.innerText = `${slataDiena} temperatura ${zemiausiaTemp}`;
  karstaElement.innerText = `${karstaDiena} temperatura ${auksciausiaTemp}`;
}
