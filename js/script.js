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
        let modalText = element.previousElementSibling.previousElementSibling.innerHTML + element.previousElementSibling.innerHTML;
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
      if (target.classList.contains('active')) {
        //убрать активный класс
        target.classList.remove('.active')
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
        target.classList.remove('.active')
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
    const myForm = document.querySelector('#myForm');
    const orderButton = document.querySelector('#orderButton');
    const popup = document.querySelector('.popup');
    const close = document.querySelector('.close');
    const text = document.querySelector('.text');
    orderButton.addEventListener('click', () => {
    event.preventDefault();

      //отправка данных на сервер
      const data = new FormData(myForm);
      data.append('name', myForm.elements.name.value);
      data.append('phone', myForm.elements.phone.value);
      data.append('comment', myForm.elements.comment.value);
      data.append('to', 'hell.web@yandex.ru');

      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      // xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
      xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
      xhr.send(data);

      function validateField(field) {
      field.textContent = field.validationMessage;
      return field.checkValidity();
      }
      
      //три проверки на валидность
      function validateForm(myForm) {
        let valid = true;

        if (!validateField(myForm.elements.name)) {
          valid = false;
        }
        if (!validateField(myForm.elements.phone)) {
          valid = false;
        }
        if (!validateField(myForm.elements.comment)) {
          valid = false;
        }
        return valid;
      }
    });
    //выводим инфо об ошибке в соседний элемент
      function validateField(field) {
      field.nextElementSibling.textContent = field.validationMessage;
      
      if (!field.checkValidity()) {
        field.nextElementSibling.classList.add('error');
      } else {
        field.nextElementSibling.classList.remove('error');
      }
      return field.checkValidity();
    };

//one page scroll
const sections = $(".section");
const display = $(".maincontent");
let inScroll = false;
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

$(document).on({
    wheel: e => {
        const deltaY = e.originalEvent.deltaY;
        const direction = deltaY > 0 ? "down" : "up";
        scrollToSection(direction);
    },
    keydown: e => {
        switch (e.keyCode) {
        case 40:
            scrollToSection("down");
            break;

        case 38:
            scrollToSection("up");
            break;
        }
    },
    touchmove: e => e.preventDefault()

    // touchstart/hend/move 
});
const scrollToSection = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "up" && prevSection.length) {
        performTransition(prevSection.index());
    }

    if (direction === "down" && nextSection.length) {
        performTransition(nextSection.index());
        
        if (nextSection.next().length === 0) {
            $(".arrow__scroll").css("display", "none"); 
        }
    }
}
const performTransition = sectionEq => {
    if (inScroll) return;
    sections
        .eq(sectionEq)
        .addClass("active")
        .siblings()
        .removeClass("active");

    const position = `${sectionEq * -100}%`;
    display.css({
        transform: `translate(0, ${position})`,
        "-webkit-transform": `translate(0, ${position})`
    });
    inScroll = true;
    setTimeout(() => {
        inScroll = false;
        setActiveMenuItem(sectionEq);
    }, 1300); 
};
$(".arrow__scroll").on("click", e =>{
    e.preventDefault();
    scrollToSection("down");
})
$('[data-scroll-to]').on('click', e => {
    e.preventDefault();
    const target = parseInt($(e.currentTarget).attr('data-scroll-to'));
    performTransition(target);
})

const setActiveMenuItem = itemEq => {
    $('.sidescroll__item').eq(itemEq).addClass('sidescroll__item--active').siblings().removeClass('sidescroll__item--active')
} 
if (isMobile) {
    $(document).swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    
        const scrollDirection = direction === 'down' ? 'up' : 'down';
        
        scrollToSection(scrollDirection);
      }
    });
  }


 //video

 document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('vid');
  const videoPlayButton = document.querySelector('.vid__play');
  const videoProgressBar = document.querySelector('#vid__progress-bar');
  const videoMute = document.querySelector('.vid__mute');
  const videoMuteBar = document.querySelector('#vid__mute-bar');
 

  videoPlayButton.addEventListener('click', () => {
    playToggle();
  });

  vid.addEventListener('ended', () => {
    videoEnd();
  });

  vid.addEventListener('timeupdate', () => {
    videoChange();
  });

  function playToggle() {
    if(vid.paused) {
      vid.play();
      vidPlayButton.classList.remove('vid__play_paused');
      vidPlayButton.classList.add('vid__play_played');
     
    } else {
      vid.pause();
      vidPlayButton.classList.remove('vid__play_played');
      vidPlayButton.classList.add('vid__play_paused');
     
    }
  }



  function vidEnd() {
    
    vidPlayButton.classList.remove('vid__play_paused', 'vid__play_played');
    vidPlayButton.classList.add('vid__play_ended');
   
  }
});

