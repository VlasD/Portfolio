var UserFlow = function (flowName) {
  var nameflow = (arguments.length > 0) ? flowName : flowName;
  var flowList = [];
  var query = '';

  var initFlowList = function () {
    if (localStorage.getItem(nameflow)) {
      var cookie = localStorage.getItem(nameflow);
      flowList = JSON.parse(cookie);
      console.log('Local storage is found');
    } else {
      console.log('Local storage not found');
    }
  };

  var getQuery = function () {
    if (!query) {
      query = window.location.search
        .replace('?', '')
        .split('&')
        .reduce(
          function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
          },
          {}
        );
    }
    return query;
  };

  this.localStorageRemove = function () {
    return !localStorage.removeItem(nameflow);
  };

  this.getUtmParam = function (paramName, defaultValue) {
    if (arguments.length === 1) {
      defaultValue = 'empty';
    }

    var params = getQuery();

    return params.hasOwnProperty(paramName) ? params[paramName] : defaultValue;
  };

  var add = function (source, content, campaign, term) {
    try {
      flowList.push({
        path: source,
        content: content,
        campaign: campaign,
        term: term,
        time: Date.now()
      });
    } catch (e) {
      console.log('Cannot add source');
      throw e;
    }
  };

  this.checkTime = function (time) {
    var timeNow = Date.now();
    var hour = 60 * 60 * 1000;
    return ((timeNow - time) < hour);
  };

  var save = function () {
    try {
      var jsonStr = JSON.stringify(flowList);
      localStorage.setItem(nameflow, jsonStr);
    } catch (e) {
      console.log('Ошибка сохранения данных в localStorage: ' + e);
      throw e;
    }
  };

  this.track = function () {
    var source = this.getUtmParam('utm_source'); // получаем параметры пользователя
    var content = this.getUtmParam('utm_content'); // получаем параметры пользователя
    var campaign = this.getUtmParam('utm_campaign'); // получаем параметры пользователя
    var term = this.getUtmParam('utm_term'); // получаем параметры пользователя
    add(source, content, campaign, term); // добавляем utm_source и timestamp в список
    save(); // задаём Cookie
  };

  this.getFlowList = function () {
    return flowList;
  };

  initFlowList();
};

var flow = new UserFlow('userFlow');
var objFlow = flow.getFlowList();
var lastIndex = (objFlow[objFlow.length - 1]) ? objFlow.length - 1 : null;
var utm = flow.getUtmParam('utm_source');
if (lastIndex === null) {
  flow.track();
} else if ((lastIndex !== null) && (!flow.checkTime(objFlow[lastIndex].time) || (utm !== objFlow[lastIndex].path))) {
  flow.track();
} else {
  console.log('inizialization Local Storage');
}
