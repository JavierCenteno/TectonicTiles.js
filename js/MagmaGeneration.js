/* 
 * MagmaGeneration.js
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

class MagmaGeneration {

	/**
	 * Takes any necessary action to set this magma generation up (typically creating the necessary HTML input fields).
	 */
	setUp() {
	}

	/**
	 * Reads this magma generation's parameters from the HTML input fields.
	 */
	readParameters() {
	}

	/**
	 * Takes any necessary action to take this magma generation down (typically removing the HTML fields created by it).
	 */
	takeDown() {
	}

}

class NoMagmaGeneration extends MagmaGeneration {
}

class FlatMagmaGeneration extends MagmaGeneration {

	setUp() {
		var magmaGenerationParameters = document.getElementById("magmaGenerationParameters")
		// Create input field for crustThickness
		createNumberInput(magmaGenerationParameters, "crustThicknessInput", "magmaGeneration.property.crustThickness", 10, null, null, null)
	}

	readParameters() {
		this.crustThickness = document.getElementById("crustThicknessInput").value
	}

	takeDown() {
		magmaGenerationParameters = document.getElementById("magmaGenerationParameters")
		while(magmaGenerationParameters.hasChildNodes()) {
			magmaGenerationParameters.removeChild(magmaGenerationParameters.lastChild)
		}
	}

}
