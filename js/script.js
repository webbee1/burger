
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
