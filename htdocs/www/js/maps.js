ymaps.ready(init);
var mapObjects = [{
    coords: [55.790438, 37.680510],
    iconText: 'Россия, Москва, Сокольническая площадь, 9',
    baloonText: 'Россия, Москва, Сокольническая площадь, 9'

}]
var mapObjectsSpb = [{
    coords: [59.926205, 30.365326],
    iconText: 'Полтавский проезд, д.4 (Невский проспект, д.85БЖ)',
    baloonText: 'Полтавский проезд, д.4 (Невский проспект, д.85БЖ)'

}]

function init() {
    var myMap = new ymaps.Map("map-msk", {
        center: mapObjects[0].coords,
        zoom: 16,
        behaviors: ["rightMouseButtonMagnifier", "multiTouch"],
        controls: ["default", "routeEditor"]
    }, {
        searchControlProvider: 'yandex#search'
    });
    mapObjects.map(function (el) {
        myMap.geoObjects
            .add(new ymaps.Placemark(el.coords, {
                balloonContent: el.baloonText,
                iconCaption: el.iconText
            }, {
                preset: 'islands#redDotIconWithCaption'
            }))
    });

    var myMapSpb = new ymaps.Map("map-spb", {
        center: mapObjectsSpb[0].coords,
        zoom: 17,
        behaviors: ["rightMouseButtonMagnifier", "multiTouch"],
        controls: ["default", "routeEditor"]
    }, {
        searchControlProvider: 'yandex#search'
    });
    mapObjectsSpb.map(function (el) {
        myMapSpb.geoObjects
            .add(new ymaps.Placemark(el.coords, {
                balloonContent: el.baloonText,
                iconCaption: el.iconText
            }, {
                preset: 'islands#redDotIconWithCaption'
            }))
    });

    document.querySelector('#map-msk').addEventListener('click', function () {
        myMap.behaviors.enable('drag')
    })
    document.querySelector('#map-spb').addEventListener('click', function () {
        myMapSpb.behaviors.enable('drag')
    })
}
