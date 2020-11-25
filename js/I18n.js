/* 
 * I18n.js
 * 
 * Copyright 2020 Javier Centeno Vega
 * 
 * This file is part of TectonicTiles.js.
 * 
 * TectonicTiles.js is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * TectonicTiles.js is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with TectonicTiles.js. If not, see <https://www.gnu.org/licenses/>.
 */

languageCode = undefined
i18n = undefined

/**
 * Get the value corresponding to the given key in the map corresponding to the current language in the internationalization data. Returns the key itself if the value is undefined.
 * @param {String} i18nKey A key to look up in the internationalization data.
 * @return The value corresponding to the given key, or the key itself if it's undefined.
 */
function getI18nValue(i18nKey) {
	if(i18n === undefined) {
		return i18nKey
	}
	var value = i18n[i18nKey]
	if(value === undefined) {
		return i18nKey
	}
	return value;
}

/**
 * Set the internationalization data to the given map. This function is used as a callback function to set the language.
 * @param {String} i18nKey A map containing the internationalization data as strings under string keys.
 */
function setI18nData(i18nData) {
	i18n = i18nData
	var i18nElements = document.getElementsByClassName("i18n")
	for(const i18nElement of i18nElements) {
		var i18nKey = i18nElement.getAttribute("i18nKey")
		i18nElement.innerHTML = getI18nValue(i18nKey)
	}
}

/**
 * Any element with class "i18n" gets assigned the result of looking up its "i18nKey" property value in the i18n data assigned to its inner HTML.
 */
function setLanguage() {
	selectedLanguage = document.getElementById("languageSelector").value
	if(selectedLanguage !== undefined) {
		// Create the script to load the language, the script will be executed asyncronously
		i18nDataScript = document.createElement("script");
		i18nDataScript.type = "text/javascript";
		i18nDataScript.src = "i18n/" + selectedLanguage + ".jsonp";
		i18nDataScript.async = true
		document.head.appendChild(i18nDataScript)
	}
}

// Run setLanguage() so the page starts off with a language set
setLanguage()

/**
 * Creates a number input in the document with a label.
 * @param {HTMLElement} parentElement The element the number input will be a child of.
 * @param {String} id The element's id.
 * @param {String} i18nKey The key that will be used to get the contents of the label.
 * @param {Number} defaultValue The value the input will start with.
 * @param {Number} min The minimum value of the input.
 * @param {Number} max The maximum value of the input.
 * @param {Number} step The step size of the input. If null or undefined, the step will be set to "any".
 */
function createNumberInput(parentElement, id, i18nKey, defaultValue, min, max, step) {
	var numberInputLabel = document.createElement("label")
	numberInputLabel.htmlFor = id
	numberInputLabel.classList.add("i18n")
	numberInputLabel.setAttribute("i18nKey", i18nKey)
	numberInputLabel.innerHTML = getI18nValue(i18nKey)
	parentElement.appendChild(numberInputLabel)
	var numberInput = document.createElement("input")
	numberInput.type = "number"
	numberInput.id = id
	if(defaultValue !== null && defaultValue !== undefined) {
		numberInput.value = defaultValue
	}
	if(min !== null && min !== undefined) {
		numberInput.min = min
	}
	if(max !== null && max !== undefined) {
		numberInput.max = max
	}
	if(step === null || step === undefined) {
		numberInput.step = "any"
	} else {
		numberInput.step = step
	}
	parentElement.appendChild(numberInput)
}

/**
 * Creates a boolean input (yes or no) in the document with a label.
 * @param {HTMLElement} parentElement The element the number input will be a child of.
 * @param {String} id The element's id.
 * @param {String} i18nKey The key that will be used to get the contents of the label.
 * @param {Number} defaultValue The value the input will start with.
 */
function createBooleanInput(parentElement, id, i18nKey, defaultValue) {
	var booleanInputLabel = document.createElement("label")
	booleanInputLabel.htmlFor = id
	booleanInputLabel.classList.add("i18n")
	booleanInputLabel.setAttribute("i18nKey", i18nKey)
	booleanInputLabel.innerHTML = getI18nValue(i18nKey)
	parentElement.appendChild(booleanInputLabel)
	var booleanInput = document.createElement("select")
	booleanInput.id = id
	parentElement.appendChild(booleanInput)
	// create "true" option
	trueOption = document.createElement("option")
	trueOption.value = "true"
	trueOption.classList.add("i18n")
	trueOption.setAttribute("i18nKey", "boolean.true")
	trueOption.text = i18n["boolean.true"]
	// create "false" option
	falseOption = document.createElement("option")
	falseOption.value = "false"
	falseOption.classList.add("i18n")
	falseOption.setAttribute("i18nKey", "boolean.false")
	falseOption.text = i18n["boolean.false"]
	// add options
	if(defaultValue) {
		trueOption.selected = true
	} else {
		falseOption.selected = true
	}
	booleanInput.appendChild(trueOption)
	booleanInput.appendChild(falseOption)
}
