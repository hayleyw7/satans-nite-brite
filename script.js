// GLOBAL VARIABLES

const gray = "rgb(128, 128, 128) none repeat scroll 0% 0% / auto padding-box border-box";
let activeColor = gray;
const dot = $(".dot-container").find("div");
const colorOption = $(".color-option");
const colorPicker = $(".color-picker");
const eraseBtn = $(".erase");
const error = $(".error");
const selectedColor = "selected-color";

// general helper

function hideError(status) {
	if (status == false) {
		error.removeClass("hidden");
	} else {
		error.addClass("hidden");
	};
};

// CHANGE DOT COLORS

// dot color helpers

function setDotCSS(dotBG, color) {
	dotBG.css("background", color);
};

function convertCssColorToHex(rbgToConvert) {
	const rbgArray = rbgToConvert.replace('", " none repeat scroll 0% 0% / auto padding-box border-box"]', "").replace('rgb(', "").split(", ");
	
	let rgbToHex = rbgArray.map(function(x) {       
	  x = parseInt(x).toString(16);    
	  return (x.length==1) ? "0"+x : x;
	});

 	return "#" + rgbToHex.join("");
};

// actual dot color changer

function changeDotColor() { 
	const currentDotCSS = $(this).css("background");
	const currentHexFromCss = convertCssColorToHex(currentDotCSS);
	hideError();
	
	if (colorPicker.hasClass(selectedColor)) {
		setDotCSS($(this), colorPicker.val());
	} else if (currentDotCSS !== activeColor && currentHexFromCss !== activeColor) {
		setDotCSS($(this), activeColor);
	} else if (currentHexFromCss == activeColor) {
		setDotCSS($(this), gray);
	} else if (currentDotCSS == gray && activeColor == gray) {
		hideError(false);
	} else {
		setDotCSS($(this), gray);
	};
};

// CHANGE SELECTED COLOR

// selected color helper

function changeSelectedColor(colorSwatch) {
	$(".selected-color").removeClass(selectedColor);
  colorSwatch.addClass(selectedColor);
	hideError();
};

// click functions

function changeActiveFromSwatch() { 
  changeSelectedColor($(this));
  activeColor = $(this).css("background");
};

function changeActiveFromPicker() {
  changeSelectedColor($(this));
  	activeColor = colorPicker.val();
};

// START OVER

function startOver() {
	if (confirm("You wish to sacrifice your soul to the inferno? You will lose everything. Are you sure?")) {
		setDotCSS(dot, gray);
	};
};

// CLICK EVENTS

dot.on("click", changeDotColor);
colorOption.on("click", changeActiveFromSwatch);
colorPicker.on("input", changeActiveFromPicker);
eraseBtn.on("click", startOver);
