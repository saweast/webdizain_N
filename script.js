"use strict";
// наш обьектик обьектиков валют
var currency = {
        USD: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1235px-Flag_of_the_United_States.svg.png',
            attirudeToUSD: '1',
            name: 'USD'
        },
        EUR: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/810px-Flag_of_Europe.svg.png',
            attirudeToUSD: '0.92310',
            name: 'EUR'
        },
        GBP: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/1200px-Flag_of_the_United_Kingdom.svg.png',
            attirudeToUSD: '0.70183',
            name: 'GBP'
        },
        CAD: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Canada.svg/1000px-Flag_of_Canada.svg.png',
            attirudeToUSD: '1.39705',
            name: 'CAD'
        },
        CNY: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/1000px-Flag_of_Eritrea.svg.png',
            attirudeToUSD: '6.57428',
            name: 'CNY'
        },
        RUB: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/900px-Flag_of_Russia.svg.png',
            attirudeToUSD: '75.4620',
            name: 'RUB'
        },
        UAH: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/1024px-Flag_of_Ukraine.svg.png',
            attirudeToUSD: '25.5200',
            name: 'UAH'
        },
        MXN: {
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/840px-Flag_of_Mexico.svg.png',
            attirudeToUSD: '18.1045',
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
    imageNearFrom = document.getElementById('imgFrom'),
    imageNearTo = document.getElementById('imgTo'),
    swap = document.getElementsByTagName('button')[0],
    result = document.getElementById('result'),
    number = document.getElementById('number'),
    convertor = document.getElementById('convertor');

// вызов функций
makeSelect(selectFrom); // делаю селект
makeSelect(selectTo);	// делаю селект
findAndChange(selectFrom, imageNearFrom); // это для начального отображения картинки
findAndChange(selectTo, imageNearTo); // это для начального отображения картинки
// обработчики
selectFrom.addEventListener('change', function() { // обработчик на смену селекта
    findAndChange(selectFrom, imageNearFrom);
});
selectTo.addEventListener('change', function() { // обработчик на смену селекта
    findAndChange(selectTo, imageNearTo);
});
convertor.addEventListener('input', function() { // делегирую нажатия на инпут[текст] и селекты
    var target = event.target,
        benefits = 0,
        draft = 0,
        numberV = 0,
        from = 0,
        to = 0,
        res = 0;
    if (target == number || selectFrom || selectTo) {
    	numberV = document.getElementById('number').value;
        from = selectFrom.options[selectFrom.selectedIndex].value;
        to = selectTo.options[selectTo.selectedIndex].value;
        res = (numberV * to / from).toFixed(5);
        result.innerHTML = '<p>Result: ' + res + '</p>';
    }
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
    res = (numberV * to / from).toFixed(5);
    result.innerHTML = '<p>Result: ' + res + '</p>';
})
// функкии
function makeSelect(elem) { // заполняет селект
    for (var item in currency) {
        var option = document.createElement("option");
        option.text = currency[item].name;
        option.value = currency[item].attirudeToUSD;
        elem.add(option);
    }
}

function findAndChange(se, im) { // картинки делает
    var choosen = se.options[se.selectedIndex].value;
    for (var item in currency) {
        if (choosen == currency[item].attirudeToUSD) {
            im.src = currency[item].img;
            im.alt = currency[item].name;
            break;
        }
    }
}
