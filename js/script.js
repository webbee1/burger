    ymaps.ready(init);

    function init() {
      var myMap = new ymaps.Map("map", {
        center: [59.89, 30.42],
        zoom: 10,
        controls: []
      });

      var coords = [
        [59.98, 30.29],
        [59.94, 30.36],
        [59.92, 30.49],
        [59.90, 30.31]
      ];

      var myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/icons/map-marker.svg',
        iconImageSize: [46, 57]
      });

      coords.forEach(function (item) {
        myCollection.add(new ymaps.Placemark(item));
      });

      myMap.geoObjects.add(myCollection)
      myMap.behaviors.disable(['scrollZoom']);

    }

    //hamburger_menu

    var btn = document.querySelector('.hamburger__btn');
    menu = document.querySelector('.hamburger');
    body = document.querySelector('body');

    btn.addEventListener('click', function (e) {
      event.preventDefault();
      menu.classList.toggle('active');
      btn.classList.toggle('active'); // при клике на иконку активировать функцию 
      // body.classList.toggle('noscroll');
    });


    //slider

    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const slider__all = document.querySelector("#show");
    const computed = getComputedStyle(slider__all);
    let currentRight = 0;

    //при обработчике клика на кнопку делаем preventDefault, 
    //чтоб не подбрасывало страницу вверх
    right.addEventListener("click", function (e) {
      e.preventDefault();

      //получаем текущее значение right для выполнения след.шага
      //на какой позиции находимся?
      let currentRight = parseInt(computed.right);

      if (!currentRight) {
        currentRight = 0;
      }
      //берём текущее значение для свойства right и прибавляем к нему ширину 
      //и переводим в пиксели
      //если текущая координата мееньше 3880 - значит ещё не конец слайдов
      if (currentRight < 3840) {
        slider__all.style.right = currentRight + 960 + "px";
      } else {
        currentRight = 0;
        slider__all.style = 0;
      }
    });
    //добавляем обработчики событий на кнопки 
    left.addEventListener("click", function (e) {
      e.preventDefault();
      let currentRight = parseInt(computed.right);
      if (!currentRight) {
        currentRight = 0;
      }
      //зацикливаем слайдер
      if (currentRight > 0) {
        slider__all.style.right = currentRight - 960 + "px";
      } else {
        currentRight = 3840;
        slider__all.style = currentRight + 'px';
      }
    });

    //modal__review

    const review = document.querySelector('.review');
    const overlay = document.querySelector('.overlay');
    const popupText = document.querySelector('.popup__text');
    const closeBtn = document.querySelector('.close__button');

    review.addEventListener('click', e => {
      let element = e.target;


      if (element.tagName === "BUTTON") {
       
        let modalText = element.previousElementSibling.previousElementSibling.innerHTML+element.previousElementSibling.innerHTML;
        popupText.innerHTML = modalText;
        overlay.style.display = 'block';

      }
    });

    document.addEventListener('keyup', e => {
      let keyNumb = e.keyCode;

      if (keyNumb === 27) {
        overlay.style.display = 'none';
        event.preventDefault();
      }
    });


    closeBtn.addEventListener("click", e => {
      event.preventDefault();
      overlay.style.display = 'none';

    });


    //accordeon_team

    var accordeon = document.getElementById('accordeon');
    //открыть\закрыть элемент списка
    function openClose(e) {

      let target = e.target.closest('li')
      //есть ли активный элемент
      if (target.classList.contains('.active')) {
        //убрать активный класс
        target.classList.remove('active')
      } else {
        let active = document.querySelector('.active')

        if (active) {
          //удалим класс
          active.classList.remove('active')
          //при клике на пункт меню открыть его спиcок
          target.classList.add('active')
        }
        target.classList.add('active')
      }
    }
    accordeon.addEventListener('click', openClose);

    //accordeon_carte

    var accordeon = document.getElementById('acco');

    function openClose(e) {

      let target = e.target.closest('li')
      if (target.classList.contains('active')) {
        target.classList.remove('active')
      } else {
        let active = document.querySelector('.active')

        if (active) {
          active.classList.remove('active')
          target.classList.add('active')
        }
        target.classList.add('active')
      }
    }
    accordeon.addEventListener('click', openClose);

    //form

    
		
const loadButton = document.querySelector('#orderButton');
const result = document.querySelector('#result');

loadButton.addEventListener('click', () => {
	const xhr = new XMLHttpRequest();
//отправка запроса и получение содержимого
	xhr.open('GET', '../js/content.txt');
	xhr.send();
});