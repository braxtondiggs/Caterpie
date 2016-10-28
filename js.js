var integerArray = [],
	indices = [],
	auto = false,
	animationTime = 750;
var s2 = document.getElementById('section2'),
	s3 = document.getElementById('section3'),
	list = s2.querySelector('#number-collection'),
	checkBox = document.getElementById('filled-in-box'),
	finalOutput = document.getElementById('listIndices');
/**
 * @desc checks if enter button is pressed and clicks add button
 * @param object event - event handler
 */
function checkForEnter(e) {
	e = e || window.event;
	if (e.keyCode == 13) {
		addInteger();
		return false;
	}
	return true;
}

function addBtnClick() {
	document.getElementById('numberInput').removeClass('valid').nextElementSibling.removeClass('active');
	addInteger();
}
/**
 * @desc validates, adds number to array, add number HTML to view and init tooltip
 */
function addInteger() {
	var numInput = document.getElementById('numberInput'),
		integerValue = parseInt(numInput.value, 0);
	if (!isNaN(parseFloat(integerValue)) && isFinite(integerValue)) {
		integerArray.push(integerValue);
		list.innerHTML += '<li class="collection-item animated bounceInLeft"><i class="material-icons left left-star yellow-text">star</i>' + integerValue + '<i class="material-icons right tooltipped red-text" data-position="right" data-delay="50" data-tooltip="Remove Number" onclick="removeNumber(event)">not_interested</i></li>';
		numInput.value = '';
		$('.tooltipped').tooltip(); //jquery tooltip
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
		$('.tooltipped').tooltip('remove'); //jquery tooltip
		list.innerHTML = '';
		checkBox.checked = false;
	}, animationTime);
};

function resetConfirm() {
	$('#modalConfirm').openModal();
}
/**
 * @desc removes number from the collection
 * @param object event - event handler
 */
function removeNumber(event) {
	var child = event.currentTarget.parentElement;
	child.addClass('animated').addClass('bounceOutLeft');
	setTimeout(function () {
		integerArray.splice(Array.prototype.indexOf.call(list.children, child), 1);
		$(child.children[1]).tooltip('remove'); //jquery tooltip
		list.removeChild(child);
		if (auto) searchConsecutiveNumbers();
		if (!integerArray.length) reset();
	}, animationTime);
}

function setAuto() {
	auto = checkBox.checked;
	if (auto) searchConsecutiveNumbers();
}
/**
 * @desc searches through array and get index, handles listed highlighted section and shows indices chips
 */
function searchConsecutiveNumbers() {
	var dif1, dif2, indices = [];
	if (indices.length === 0) bounceInSection(s3);
	finalOutput.querySelector('.chips-container').innerHTML = '';
	for (var i = 0; i < integerArray.length - 2; i += 1) {
		dif1 = integerArray[i] - integerArray[i + 1];
		dif2 = integerArray[i + 1] - integerArray[i + 2];
		if (Math.abs(dif1) === 1 && dif1 === dif2 && indices.indexOf(i) === -1) indices.push(i);
	}
	for (var i = 0; i < list.children.length; i += 1) {
		list.children[i].removeClass('highlighted'); //reset all highlighted
	}
	if (indices.length > 0) {
		for (var i = 0; i < indices.length; i += 1) {
			finalOutput.querySelector('.chips-container').innerHTML += '<div class="chip">' + indices[i] + '</div>';
			list.children[indices[i]].addClass('highlighted');
		}
		finalOutput.removeClass('hide').nextElementSibling.addClass('hide');
	} else {
		finalOutput.addClass('hide').nextElementSibling.removeClass('hide');
	}
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
