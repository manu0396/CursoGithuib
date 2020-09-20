'use strict';

//Obtengo posicion actual del scroll (inicio)
var getInitialScroll = function getInitialScroll() {
	return document.documentElement.scrollTop;
};

//Obtengo posicion del destino del scroll redondeandola a numero entero (final)
var getFinalScroll = function getFinalScroll(element) {
	return Math.floor(element.getBoundingClientRect().top + getInitialScroll());
};

//Obtengo la distancia en pixeles desde el inicio hasta el final
var animatedScrollTo = function animatedScrollTo(targetElement, time) {
	var initialPosition = getInitialScroll(),
	    finalPosition = getFinalScroll(targetElement),
	    distanceToScroll = finalPosition - initialPosition,
	    scrollFragment = Math.ceil(distanceToScroll / time);
	animateScroll(scrollFragment, finalPosition);
	console.log(scrollFragment);
};

//Anima el scroll hasta una posicion y al mismo tiempo lo detiene en el final
var animateScroll = function animateScroll(scrollFragment, finalPosition) {

	var animatedScroll = setInterval(function () {
		document.documentElement.scrollTop += scrollFragment;
		if (scrollFragment > 0) {
			if (document.documentElement.scrollTop > finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
		} else {
			if (document.documentElement.scrollTop < finalPosition - scrollFragment / 2) clearInterval(animatedScroll);
		}
	}, 1);
};

//Detecto que cuando se presione un enlace tenga un hash y luego le remuevo la almohadilla para convertirlo en el elemento de destino y asi poder llegar hasta el
var animatedScrollEvent = function animatedScrollEvent(originElement, time) {

	console.log(originElement);

	if (originElement.tagName === 'A' && originElement.hash !== '') {
		var targetElement = document.getElementById(originElement.hash.slice(1));
		originElement.addEventListener('click', function (e) {
			e.preventDefault();
			animatedScrollTo(targetElement, time);
			console.log('Entra');
			console.log(targetElement);
		});
	}
};

//Detecto todos los links en el documento (si quisese solo un grupo de links quizas debiese utilizar alguna clase CSS) y por cada link invoco la funcion de arriba pasandole el link
var animatedScrollAllLinks = function animatedScrollAllLinks(time) {
	var links = document.links;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var link = _step.value;

			animatedScrollEvent(link, time);
			// console.log(link);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
};

animatedScrollAllLinks(200);

// animatedScrollEvent(document.getElementById('link2'), 500);