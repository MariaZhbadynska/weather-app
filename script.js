let btnGetData = document.getElementById('btnGetData');
let text = document.getElementById('text');
let output = document.getElementById('output');

btnGetData.addEventListener('click', async () => {
    if (text.value.trim() !== '') {
        output.innerHTML = '';
        let top = document.createElement('div');
        top.setAttribute("class", "top");
        let city = document.createElement('span');
        let date = document.createElement('span');

        let bottom = document.createElement('div');
        bottom.setAttribute("class", "bottom");
        let sunny = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('id', 'img');

        let temp = document.createElement('span');
        let minMax = document.createElement('span');

        let dateNow = new Date();
        let now = `${String(dateNow.getDate()).padStart(2, '0')}.${String(dateNow.getMonth() + 1).padStart(2, '0')}.${dateNow.getFullYear()}`;

        async function getData() {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${text.value}&appid=595b83742bd73770b24aaca75c5444a3&units=metric`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const data = await response.json();
                city.innerText = data.name;
                date.innerText = now;
                let weatherDescription = data.weather[0].main;
                sunny.innerText = weatherDescription;
                temp.innerText = `Temperature: ${data.main.temp} °C`;
                minMax.innerText = `Min: ${data.main.temp_min} °C, Max: ${data.main.temp_max} °C`;

                if (weatherDescription === "Clouds") {
                    img.src = `./img/cloud.png`;
                } else if (weatherDescription === "Clear") {
                    img.src = `./img/sun.png`;
                } else if (weatherDescription === "Rain") {
                    img.src = `./img/rain.png`;
                }
                top.append(city, date);
                bottom.append(sunny, img, temp, minMax);
                output.append(top, bottom);

            } catch (error) {
                console.error(error.message);
            }
        }

        await getData();
        text.value = ''; 
    }
});
