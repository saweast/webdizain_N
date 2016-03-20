"use strict";
// наш обьектик обьектиков валют
var currency = {
    USD: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png',
        attitudeToUSD: '1',
        name: 'USD'
    },
    EUR: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/810px-Flag_of_Europe.svg.png',
        attitudeToUSD: '0.92310',
        name: 'EUR'
    },
    GBP: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
        attitudeToUSD: '0.70183',
        name: 'GBP'
    },
    CAD: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1000px-Flag_of_Canada.svg.png',
        attitudeToUSD: '1.39705',
        name: 'CAD'
    },
    CNY: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/1000px-Flag_of_Eritrea.svg.png',
        attitudeToUSD: '6.57428',
        name: 'CNY'
    },
    RUB: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.svg.png',
        attitudeToUSD: '75.4620',
        name: 'RUB'
    },
    UAH: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1024px-Flag_of_Ukraine.svg.png',
        attitudeToUSD: '25.5200',
        name: 'UAH'
    },
    MXN: {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/840px-Flag_of_Mexico.svg.png',
        attitudeToUSD: '18.1045',
        name: 'MXN'
    }
}

var curLength = (function() {
    var i = 0;
    for (var item in currency) {
        i++;
    }
    return i;
})();
// переменные
var selectFrom = document.getElementById('currencyFrom'),
    selectTo = document.getElementById('currencyTo'),
    imageNearFrom = document.getElementById('imgFrom'), // document.images[0]
    imageNearTo = document.getElementById('imgTo'), // document.images[1]
    swap = document.getElementsByTagName('button')[0],
    result = document.getElementById('result'),
    number = document.getElementById('number'),
    convertor = document.getElementById('convertor'),
    benefits = document.getElementById('benefits'),
    newCurr = document.getElementById('newCurr'),
    pid = document.getElementById("pid"),
    ann = document.getElementById("ann"),
    third = document.getElementById('third');

// вызов функций
makeSelect(selectFrom); // делаю селект
makeSelect(selectTo); // делаю селект
findAndChange(selectFrom, imageNearFrom); // это для начального отображения картинки
findAndChange(selectTo, imageNearTo); // это для начального отображения картинки
// обработчики
selectFrom.addEventListener('change', function() { // обработчик на смену селекта
    findAndChange(selectFrom, imageNearFrom);
    makeDisable(selectFrom, selectTo);
});
selectTo.addEventListener('change', function() { // обработчик на смену селекта
    findAndChange(selectTo, imageNearTo);
    makeDisable(selectTo, selectFrom);
});
convertor.addEventListener('input', function() { // делегирую нажатия на инпут[текст] и селекты
    number.value = number.value.replace(/[^\d]/g, ''); // запрет ввода всего кроме чисел
    if (number.value.length == 4 && number.value[0] >= '1') { // ввод только до 1000
        number.value = '1000';
    }
    var target = event.target,
        draft = 0,
        numberV = 0,
        from = 0,
        to = 0,
        res = 0;
    if (target == number || target == selectFrom || target == selectTo) {
        if (number.length == 0 || selectFrom.selectedIndex == 0 || selectTo.selectedIndex == 0) { // когда не выбраны селекты и не введен инпут
            return 0;
        }
        numberV = document.getElementById('number').value;
        from = selectFrom.options[selectFrom.selectedIndex].value;
        to = selectTo.options[selectTo.selectedIndex].value;
        if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
            res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
        } else {
            res = (+numberV * +to / +from).toFixed(2);
        }
        result.innerHTML = '<p>Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
    }
});
benefits.addEventListener('click', function() { // обработчик на чекбокс бенефитс
    var res = 0;
    var numberV = document.getElementById('number').value;
    var from = selectFrom.options[selectFrom.selectedIndex].value;
    var to = selectTo.options[selectTo.selectedIndex].value;
    if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
        res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
    } else {
        res = (+numberV * +to / +from).toFixed(2);
    }
    result.innerHTML = '<p class="">Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
})
swap.addEventListener('click', function() { // обработчик на кнопку "свап" 
    var buffer = '';
    var benefits = 0,
        draft = 0,
        numberV = 0,
        from = 0,
        to = 0,
        res = 0;
    // меняю местами индексы в селектах
    buffer = selectFrom.selectedIndex
    selectFrom.selectedIndex = selectTo.selectedIndex;
    selectTo.selectedIndex = buffer;
    // меняю местами картинки
    buffer = imageNearFrom.src;
    imageNearFrom.src = imageNearTo.src;
    imageNearTo.src = buffer;
    // обновляю результат
    numberV = document.getElementById('number').value;
    from = selectFrom.options[selectFrom.selectedIndex].value;
    to = selectTo.options[selectTo.selectedIndex].value;
    res = (numberV * to / from).toFixed(2);
    result.innerHTML = '<p>Result: ' + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>';
    // обновляем disable
    makeDisable(selectFrom, selectTo);
    makeDisable(selectTo, selectFrom);

})
newCurr.addEventListener('click', function() { // добавляю в мой обьект валют еще одну валюту
        var newName = document.getElementById('newName').value;
        var newSrc = document.getElementById('newSrc').value;
        var newAttitide = document.getElementById('newAttitide').value;
        currency[newName] = {
            img: newSrc,
            attitudeToUSD: newAttitide,
            name: newName
        };
        // обновляю селекты
        var option = document.createElement('option');
        var option1 = document.createElement('option');
        option.text = currency[newName].name;
        option1.text = currency[newName].name;
        option.value = currency[newName].attitudeToUSD;
        option1.value = currency[newName].attitudeToUSD;
        selectFrom.add(option);
        selectTo.add(option1);
        // чищю инпуты
        document.getElementById('newName').value = "";
        document.getElementById('newSrc').value = "";
        document.getElementById('newAttitide').value = "";
    })
    // функции
function makeSelect(elem) { // заполняет селект
    for (var item in currency) {
        var option = document.createElement("option");
        option.text = currency[item].name;
        option.value = currency[item].attitudeToUSD;
        elem.add(option);
    }
}

function findAndChange(se, im) { // картинки делает
    var choosen = se.options[se.selectedIndex].value;
    for (var item in currency) {
        if (choosen == currency[item].attitudeToUSD) {
            im.src = currency[item].img;
            im.alt = currency[item].name;
            break;
        }
    }
}

function makeDisable(s1, s2) { // делаю disabled и убираю его из всех остальных
    var change = s1.selectedIndex;
    var i = 0;
    for (var option in s2.options) {
        var opt = s2.options[option];
        if (s2.options[option].hasAttribute('disabled')) {
            s2.options[option].removeAttribute('disabled')
        }
        i++;
        if (i == s2.options.length) {
            break;
        }
    }
    s2.options[change].setAttribute('disabled', 'true');
}


function getBrowserInfo() {
    var myWindow = window.open("", "", "width=500, height=100");
    myWindow.document.write("<p>" + navigator.userAgent + " " + navigator.platform + "</p>");
    setTimeout(function() { myWindow.close() }, 5000);
}

function getDraft() {
    var res = 0;
    var numberV = document.getElementById('number').value;
    var from = selectFrom.options[selectFrom.selectedIndex].value;
    var to = selectTo.options[selectTo.selectedIndex].value;
    if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
        res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
    } else {
        res = (+numberV * +to / +from).toFixed(2);
    }

    var myWindow = window.open("", "", "width=500, height=100");
    myWindow.document.write('<p>From ' + numberV + " " + selectFrom.options[selectFrom.selectedIndex].text + " you get: " + res + ' ' + selectTo.options[selectTo.selectedIndex].text + '</p>');
    var time = new Date();
    time = time.toUTCString();
    myWindow.document.write("<p>Now: " + time + "</p><p></p>");

    make();

    function make() {
        var i = 5;
        var int = setInterval(function() {
            myWindow.document.write(i-- + " ");
        }, 1000)
        setTimeout(function() {
            myWindow.close();
            clearInterval(int);
        }, 6000)
    }
}

// window.onload = function() {
//     var myWindow = "";    
//     var timer1 = setTimeout(function(){        
//         myWindow = window.open("", "", "width=500, height=200");  
//         var block = document.createElement('img');
//         var time = document.createElement('p');
//         var t = new Date();
//         t = t.toUTCString();
//         time.innerHTML = t;
//         block.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png';
//         block.height = 150;
//         block.width = 300;
//         myWindow.document.body.appendChild(time);
//         myWindow.document.body.appendChild(block);
//     }, 10000);
//     var timer2 = setTimeout(function(){
//         myWindow.blur();
//     }, 20000)
// }

third.addEventListener("click", function(e) {
    var history = document.getElementById("history");
    var res = 0;
    var numberV = document.getElementById('number').value;
    var from = selectFrom.options[selectFrom.selectedIndex].value;
    var to = selectTo.options[selectTo.selectedIndex].value;
    if (benefits.checked && numberV > 100) { // начисление скидки в размере 5% если бенефит выбран и сумма превышает $100
        res = ((+numberV + (+numberV * 0.05)) * +to / +from).toFixed(2);
    } else {
        res = (+numberV * +to / +from).toFixed(2);
    }

    var newElement = document.createElement('p');
    // var newTextNode = document.createTextNode(res + " " + selectTo.options[selectTo.selectedIndex].text);
    // history.appendChild(newTextNode);
    newElement.innerHTML = res + " " + selectTo.options[selectTo.selectedIndex].text;
    history.appendChild(newElement);
});

var thirdStyle = document.getElementById('thirdStyle');

thirdStyle.addEventListener('click', function() {
    var history = document.getElementById("history");
    var p = history.getElementsByTagName('p');
    for (var item in p) {
        p[item].style.background = "red";
        p[item].style.color = "blue";
    }
});
var thirdFirst = document.getElementById('thirdFirst');
thirdFirst.addEventListener("click", function() {
    getSparta();
    removeNonSparta();
    removeNonSparta();
    removeNonSparta();
})
var thirdSecond = document.getElementById('thirdSecond');
thirdSecond.addEventListener("click", function() {
    findThree("history");
    // USDtoUL("history");

});
var thirdThird = document.getElementById('thirdThird');
thirdThird.addEventListener("click", function() {
    sort("history");
    colorize("history");
})

function getSparta() {
    var history = document.getElementById("history")
    var histElems = document.getElementById("history").children;
    for (var item in histElems) {
        if (parseFloat(histElems[item].innerHTML) >= 300) {
            histElems[item].style.background = "yellow";
        }
    }
}

function removeNonSparta() {
    var history = document.getElementById("history")
    var histElems = document.getElementById("history").children;
    for (var item in histElems) {
        if (parseFloat(histElems[item].innerHTML) < 300) {
            history.removeChild(histElems[item]);
        }
    }
}

function sort(blockId, desc) {
    var desc = desc || false;
    var mainBlock = document.getElementById(blockId);
    var childBlock = mainBlock.children;
    var buf = 0;
    var length = childBlock.length;
    for (var i = length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if (parseFloat(childBlock[j].innerHTML) > parseFloat(childBlock[j + 1].innerHTML)) {
                buf = childBlock[j].innerHTML;
                childBlock[j].innerHTML = childBlock[j + 1].innerHTML;
                childBlock[j + 1].innerHTML = buf;
            }
        }
    }
}

function colorize(block) {
    var mainBlock = document.getElementById(block);
    var childBlock = mainBlock.children;
    var length = childBlock.length;
    var colArr = ["#000000", "#110000", "#220000", "#330000", "#440000", "#550000", "#660000", "#770000", "#880000", "#990000", "#aa0000", "#bb0000", "#cc0000", "#dd0000", "#ee0000", "#ff0000"];
    for (var item in childBlock) {
        childBlock[item].style.background = colArr[length - item];
        childBlock[item].style.color = "#fff";
    }
}

function USDtoUL(block) {
    var mainBlock = document.getElementById(block);
    var childBlock = mainBlock.children;
    var length = childBlock.length;
    var ulBlock = document.getElementById("USD");
    for (var item in childBlock) {
        if (childBlock[item].innerHTML.match('USD')) {
            var newLi = document.createElement("li");
            newLi.innerHTML = childBlock[item].innerHTML;
            ulBlock.appendChild(newLi);
        } else {
            continue;
        }
    }
    var newLi = document.createElement('li');
}

function findThree(block) {
    var mainBlock = document.getElementById(block);
    var childBlock = mainBlock.children;
    var length = childBlock.length;
    var ulBlock = document.getElementById("USD");
    var count = 0;
    for (var i = 0; i < length; i++) {
        for (var j = 1; j < length; j++) {
            if (childBlock[i].innerHTML == childBlock[j].innerHTML) {
                count++;
            }

        }
        if (count >= 3) {
            for (var item in childBlock) {
                childBlock[item].style.color = "#c4c4c4";
            }
        }
    }
}