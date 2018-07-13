$('.expand').on('click', function (e) {
    $(this).parent().find('.question-text').click();
});
$('.question-text').on('click', function () {
    if ($(this).parent().hasClass('show')) {
        $(this).parent().removeClass('show')
    } else {
        $(this).closest('.questions').find('.question.show').removeClass('show');
        $(this).parent().addClass('show');
    }
});
/*
 $('.gallery').bind('mousewheel', function(e) {
 if(e.originalEvent.wheelDelta /120 > 0) {
 $(this).carousel('next');
 } else {
 $(this).carousel('prev');
 }
 });*/

$('.carousel').flickity({
    "wrapAround": true,
    initialIndex: 1
});

$('.go').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
        $('html, body').animate({scrollTop: $(scroll_el).offset().top - 110}, 500); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
});

var t;
function up() {
    var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    if (top > 0) {
        window.scrollBy(0, -100);
        t = setTimeout('up()', 20);
    } else clearTimeout(t);
    return false;
}
var currentItem = 1;
var items = {
    1: {
        'price': '14 900',
        'oldPrice': '16 900',
        'height': '107 см.',
        'tankDiameter': '28 см.',
        'throatDiameter': '12 см.',
        'performance': '1-3 л/час',
        'thickness': '1 мм.',
        'thicknessBottom': '2 мм. Антипригарное',
        'for': 'Газ, керамика, электро, индукция',
        'steel': 'AISI 304 (медицинская)'
    },
    2: {
        'price': '15 900',
        'oldPrice': '17 900',
        'height': '114 см.',
        'tankDiameter': '30 см.',
        'throatDiameter': '12 см.',
        'performance': '1-3 л/час',
        'thickness': '1 мм.',
        'thicknessBottom': '2 мм. Антипригарное',
        'for': 'Газ, керамика, электро, индукция',
        'steel': 'AISI 304 (медицинская)'
    },
    3: {
        'price': '17 900',
        'oldPrice': '19 900',
        'height': '120 см.',
        'tankDiameter': '30 см.',
        'throatDiameter': '12 см.',
        'performance': '1-3 л/час',
        'thickness': '1 мм.',
        'thicknessBottom': '2 мм. Антипригарное',
        'for': 'Газ, керамика, электро, индукция',
        'steel': 'AISI 304 (медицинская)'
    }
};
$(document).ready(function () {
    $('.order-form-body-litre-button').click(function () {
        $('.order-form-body-litre-button[data-form=' + $(this).data('form') + ']').removeClass('active');
        $(this).addClass('active');
        currentItem = $(this).data('id');
        $('.order-form-body-price[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].price);
        $('.order-form-body-oldprice[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].oldPrice);
        $('.s-height[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].height);
        $('.s-tankDiameter[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].tankDiameter);
        $('.s-throatDiameter[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].throatDiameter);
        $('.s-performance[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].performance);
        $('.s-thickness[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].thickness);
        $('.s-thicknessBottom[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].thicknessBottom);
        $('.s-for[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].for);
        $('.s-steel[data-form=' + $(this).data('form') + ']').text(items[$(this).data('id')].steel);
        var model = $(this).attr('name');
        $('#sendform input[name=model]').val(model);
    });
    $('.navbar-collapse a, .btn-buy').click(function (e) {
        $('.navbar-collapse').collapse('toggle');
    });
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st !== 0 && $(window).width() > 767) {
            if ($('.navbar').outerHeight() == 80) {
                /*if ($(window).width() > 768) {
                 $( ".navbar" ).stop().animate({
                 height: 50
                 }, 500, function() {
                 $('.hideme').slideToggle();
                 console.log('animation complete');
                 });
                 }*/
                $('.hideme').addClass('up');
                $('.navbar-brand').addClass('up');
                $('.premier').addClass('up');
                $('.navbar').addClass('nav-up');
            }
        } else {
            if ($('.navbar').outerHeight() == 60) {
                /*if ($(window).width() > 768) {
                 $(".navbar").stop().animate({
                 height: 80
                 }, 300, function () {
                 $('.hideme').slideToggle();
                 console.log('animation complete');
                 });
                 }*/
                $('.hideme').removeClass('up');
                $('.navbar-brand').removeClass('up');
                $('.premier').removeClass('up');
                $('.navbar').removeClass('nav-up');
            }
        }
        lastScrollTop = st;
    });
    /* SCRIPTS */
    $('.answer-send').click(function (e) {
        e.preventDefault();
        var phone = $('#quephone').val();
        var question = $('#que').val();
        var source = '';
        var cart = {};
        cart[0] = {
            id: 139,
            count: 1
        }
        var cartn = "ХЛЫНОВ-ВОПРОС";
        if (phone == '') {
            alert('Вы еще не ввели телефон!');
        } else if (question == '') {
            alert('Вы еще не ввели вопрос!');
        } else {
            $('.answer').children('.footer').slideUp();
            $.post("/mail.php", {
                'action': 'addCall',
                'name': question,
                'phone': phone,
                'source': source,
                'cart': cart,
                'cartn': cartn,
                'status': 10,
                'utm': objFlow
            }, function (data) {
                $('.answer').children('.footer').html('<div class="answer-ok">Менеджер свяжется с вами в ближайшее время</div>');
                $('.answer').children('.row').html('<div class="col-sm-12">' +
                    '<span class="answer-or"><span class="yellow font-weight-bold">Круглосуточный</span> прием заявок по всей России</span>' +
                    '<a href="tel:8(952) 310-96-76" class="call inverse"> <div class="answer-tel">8 (952) 310-96-76</div> </a>' +
                    '</div>');
                $('.answer').children('.footer').slideDown();
                flow.localStorageRemove();
            }, "text");

        }

        return false;
    });



});