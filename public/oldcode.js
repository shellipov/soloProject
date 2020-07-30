ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 10,
  }, {
    searchControlProvider: 'yandex#search',
  });

  // Создаём макет содержимого.
  const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
  );

  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    balloonContentHeader: 'Балун метки',
    hintContent: 'Собственный значок метки',
    balloonContent: 'тут кто то утонул',
  }, {
    preset: 'islands#Icon',
    iconColor: '#3caa3c',
  },

    // {
    //     // Опции.
    //     // Необходимо указать данный тип макета.
    //     iconLayout: 'default#image',
    //     // Своё изображение иконки метки.
    //     iconImageHref: 'images/myIcon.gif',
    //     // Размеры метки.
    //     iconImageSize: [30, 42],
    //     // Смещение левого верхнего угла иконки относительно
    //     // её "ножки" (точки привязки).
    //     iconImageOffset: [-5, -38]
    // }
  );

  const myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
    hintContent: 'Собственный значок метки с контентом',
    balloonContent: 'А эта — новогодняя',
    iconContent: '12',
  },
    // {
    //     // Опции.
    //     // Необходимо указать данный тип макета.
    //     iconLayout: 'default#imageWithContent',
    //     // Своё изображение иконки метки.
    //     iconImageHref: 'images/ball.png',
    //     // Размеры метки.
    //     iconImageSize: [48, 48],
    //     // Смещение левого верхнего угла иконки относительно
    //     // её "ножки" (точки привязки).
    //     iconImageOffset: [-24, -24],
    //     // Смещение слоя с содержимым относительно слоя с картинкой.
    //     iconContentOffset: [15, 15],
    //     // Макет содержимого.
    //     iconContentLayout: MyIconContentLayout
    // }
  );

  myMap.geoObjects
    .add(myPlacemark)
    .add(myPlacemarkWithContent);
});
