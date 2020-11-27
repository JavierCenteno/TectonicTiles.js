/* 
 * WaterGeneration.js
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

class WaterGeneration {

	/**
	 * Takes any necessary action to set this water generation up (typically creating the necessary HTML input fields).
	 */
	setUp() {
	}

	/**
	 * Reads this water generation's parameters from the HTML input fields.
	 */
	readParameters() {
	}

	/**
	 * Takes any necessary action to take this water generation down (typically removing the HTML fields created by it).
	 */
	takeDown() {
	}

}

class NoWaterGeneration extends WaterGeneration {
}

class FlatWaterGeneration extends WaterGeneration {

	setUp() {
		var waterGenerationParameters = document.getElementById("waterGenerationParameters")
		// Create input field for seaLevel
		createNumberInput(waterGenerationParameters, "seaLevelInput", "waterGeneration.property.seaLevel", 15, null, null, null)
	}

	readParameters() {
		this.seaLevel = document.getElementById("seaLevelInput").value
	}

	takeDown() {
		waterGenerationParameters = document.getElementById("waterGenerationParameters")
		while(waterGenerationParameters.hasChildNodes()) {
			waterGenerationParameters.removeChild(waterGenerationParameters.lastChild)
		}
	}

}
