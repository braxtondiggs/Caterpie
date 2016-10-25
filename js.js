var integerArray = [], indices = [];

function addInteger(e) {
    integerValue = document.getElementById('numberInput').value;
    integerArray.push(integerValue);
    document.getElementById('integerArray').innerHTML += (integerArray.length == 1 ? "" : "," ) + integerValue;
    document.getElementById("numberInput").value = "";

};

var reset = function () {
    document.getElementById("indicesArray").innerHTML = "";
    document.getElementById('integerArray').innerHTML = "";
    integerArray = [];
    indices = [];

};

function searchConsecutiveNumbers() {
    console.log("To be implemented");
};