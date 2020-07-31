const list = document.querySelectorAll('.man');

const sortByInstruments = document.getElementById('instrumentsort');
const sortByStyle = document.getElementById('stylesort');
const peopleList = document.getElementById('list');

ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search',
  });

  list.forEach(async (man) => {
    const { id } = man;

    const user = await fetch('/user/getuser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    const {
      address, login, instrument, style,
    } = await user.json();

    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=88f3cd83-ac57-4f7b-acf9-09cef542b757&geocode=${address}`);
    const answer = await response.json();
    // eslint-disable-next-line max-len
    const yandexCoordinates = answer.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    const coordinates = yandexCoordinates.split(' ').map((el) => el * 1).reverse();

    const myPlace = new ymaps.Placemark(coordinates, {
      hintContent: `${instrument}/${style}`,
      balloonContent: `<h6><a href="/user/${id}">${login}</a></h6> <p>${instrument}</p> <p>${style}</p> `,
      iconContent: '',
    }, {
      preset: 'islands#Icon',
      iconColor: '#3caa3c',
    });

    myMap.geoObjects
      .add(myPlace);
  });
});

sortByInstruments.addEventListener('submit', async (event) => {
  event.preventDefault();
  const instrument = await fetch('/sort', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instrument: event.target.instrument.value,
      sortBy: 'instrument',
    }),
  });
  const { users, instruments, styles } = await instrument.json();

  const response = await fetch('/sort.hbs');
  const resp = await response.text();
  const template = Handlebars.compile(resp);
  const html = template({ users });
  peopleList.innerHTML = html;
  ymaps.ready();
});

sortByStyle.addEventListener('submit', (event) => {
  event.preventDefault();
  peopleList.innerText = ` Сортировка по стилю ${event.target.style.value} пока не работает :( `;
});

