var integerArray = [],
	indices = [],
	auto = false,
	animationTime = 750;
var s2 = document.getElementById('section2'),
	s3 = document.getElementById('section3'),
	list = s2.querySelector('#number-collection'),
	checkBox = document.getElementById('filled-in-box');
/**
 * @desc checks if enter button is pressed and clicks add button
 * @param object event - event handler
 */
function checkForEnter(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		document.getElementById('btnAdd').click();
		return false;
	}
	return true;
}
/**
 * @desc validates, adds number to array, add number HTML to view and init tooltip
 */
function addInteger() {
	var numInput = document.getElementById('numberInput'),
		integerValue = parseInt(numInput.value, 0);
	if (!isNaN(parseFloat(integerValue)) && isFinite(integerValue)) {
		integerArray.push(integerValue);
		list.innerHTML += '<li class="collection-item animated bounceInLeft"><i class="material-icons left left-star">star</i>' + integerValue + '<i class="material-icons right tooltipped" data-position="right" data-delay="50" data-tooltip="Remove Number" onclick="removeNumber(event)">not_interested</i></li>';
		numInput.value = '';
		numInput.removeClass('valid').nextElementSibling.removeClass('active');
		$('.tooltipped').tooltip();
		setTimeout(function () {
			list.children[integerArray.length - 1].removeClass('animated').removeClass('bounceInLeft');
		}, animationTime);
		if (integerArray.length === 1) bounceInSection(s2);
		if (auto) searchConsecutiveNumbers();
	}
};
/**
 * @desc resets app to default state
 */
function reset() {
	integerArray = [];
	indices = [];
	bounceOutSection(s2);
	bounceOutSection(s3);
	setTimeout(function () {
		$('.tooltipped').tooltip('remove');
		list.innerHTML = '';
		checkBox.checked = false;
	}, animationTime);
};
/**
 * @desc removes number from the collection
 * @param object event - event handler
 */
function removeNumber(event) {
	var child = event.currentTarget.parentElement;
	child.addClass('animated').addClass('bounceOutLeft');
	setTimeout(function () {
		list.removeChild(child);
		//integerArray.splice(0, 1); //TODO
		if (!integerArray.length) reset();
	}, animationTime);
}

function setAuto() {
	auto = checkBox.checked;
}

function searchConsecutiveNumbers() {
	if (indices.length === 0) bounceInSection(s3);
	//TODO
};
/* Section Animation Functions*/
function bounceOutSection(elem) {
	elem.addClass('animated').addClass('bounceOutDown');
	setTimeout(function () {
		elem.addClass('hide-opacity').removeClass('bounceOutDown');
	}, animationTime);
}

function bounceInSection(elem) {
	elem.removeClass('hide-opacity').addClass('animated').addClass('bounceInUp');
	setTimeout(function () {
		elem.removeClass('animated').removeClass('bounceInUp');
	}, animationTime);
}
/* Prototypal Inheritance: JS Class Helpers*/
Node.prototype.addClass = function (className) {
	if (this.classList) {
		this.classList.add(className);
	} else {
		var classes = this.className.split(' ');
		classes.push(className);
		this.className = classes.join(' ');
	}
	return this;
};
Node.prototype.removeClass = function (className) {
	if (this.classList) {
		this.classList.remove(className);
	} else {
		var classes = this.className.split(' ');
		classes.splice(classes.indexOf(className), 1);
		this.className = classes.join(' ');
	}
	return this;
};
