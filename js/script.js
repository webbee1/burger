    ymaps.ready(init);
    function init(){  
        var myMap = new ymaps.Map("map", {
            center: [59.89,30.42],
            zoom: 10,
            controls: []       
        });
        
        var coords =[
            [59.98,30.29], 
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

    btn.addEventListener('click', function(e) {
        event.preventDefault();
    
    menu.classList.toggle('active');
    btn.classList.toggle('active'); // при клике на иконку активировать функцию 
 
    });

    //slider

    const left = document.querySelector("#left");
const right = document.querySelector("#right");
const slider__all = document.querySelector("#show");
const computed = getComputedStyle(slider__all);

//при обработчике клика на кнопку делаем preventDefault, 
//чтоб не подбрасывало страницу вверх

right.addEventListener("click", function(e) {
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

  if (currentRight < 3880) {
    slider__all.style.right = currentRight + 970 + "px";
  } else {
    currentRight = 0;
    slider__all.style = 0;
  }
});


//добавляем обработчики событий на кнопки 

left.addEventListener("click", function(e) {
  e.preventDefault();
  let currentRight = parseInt(computed.right);

  if (!currentRight) {
    currentRight = 0;
  }

  //зацикливаем слайдер

  if (currentRight > 0) {
    slider__all.style.right = currentRight - 970 + "px";
  } else {
    currentRight = 3880;
    slider__all.style = currentRight + 'px';
  }
});



