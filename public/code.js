const list = document.querySelectorAll('.man');

ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search',
  });

  list.forEach(async (man) => {
    const address = man.id;
    const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=88f3cd83-ac57-4f7b-acf9-09cef542b757&geocode=${address}`);
    const answer = await response.json();
    // eslint-disable-next-line max-len
    const yandexCoordinates = answer.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
    const coordinates = yandexCoordinates.split(' ').map((el) => el * 1).reverse();

    const myPlace = new ymaps.Placemark(coordinates, {
      hintContent: 'Собственный значок метки с контентом',
      balloonContent: 'тут живет сатана',
      iconContent: '',
    }, {
      preset: 'islands#Icon',
      iconColor: '#3caa3c',
    });

    myMap.geoObjects
      .add(myPlace);
  });
});
