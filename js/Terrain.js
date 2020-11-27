/* 
 * Terrain.js
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

class Terrain {

	constructor() {
		this.terrainLayers = {}
	}

	/**
	 * Takes any necessary action to set this terrain up (typically creating the necessary HTML input fields).
	 */
	setUp() {
	}

	/**
	 * Reads this terrain's parameters from the HTML input fields.
	 */
	readParameters() {
	}

	/**
	 * Takes any necessary action to take this terrain down (typically removing the HTML fields created by it).
	 */
	takeDown() {
	}

	/**
	 * 
	 */
	addLayer(layerName) {
	}

	/**
	 * 
	 */
	getLayers() {
		return this.terrainLayers
	}

	/**
	 * 
	 */
	getLayer(layerName) {
		return this.terrainLayers[layerName]
	}

	/**
	 * Generate this terrain using the given land generation.
	 * @param {LandGeneration} landGeneration The land generation to be used to generate this terrain.
	 */
	generate(landGeneration) {
		// reset the random generator's seed before generation starts
		setSeed()
	}

	/**
	 * Output this terrain as an image.
	 */
	print() {
	}

	/**
	 * Get the minimum value among the tiles of the terrain. Used for plotting purposes. Shouldn't return infinity or NaN.
	 * @return {Number} The minimum value the tiles of the terrain can have.
	 */
	getMinimumValue() {
	}

	/**
	 * Get the maximum value among the tiles of the terrain. Used for plotting purposes. Shouldn't return infinity or NaN.
	 * @return {Number} The maximum value the tiles of the terrain can have.
	 */
	getMaximumValue() {
	}

}

class SquareTerrain extends Terrain {

	constructor() {
		super()
	}

	setUp() {
		var terrainParameters = document.getElementById("terrainParameters")
		// Create input field for plateSizeX
		createNumberInput(terrainParameters, "plateSizeXInput", "terrain.property.plateSizeX", 10, 1, null, 1)
		// Create input field for plateSizeY
		createNumberInput(terrainParameters, "plateSizeYInput", "terrain.property.plateSizeY", 10, 1, null, 1)
		// Create input field for numberOfPlatesX
		createNumberInput(terrainParameters, "numberOfPlatesXInput", "terrain.property.numberOfPlatesX", 20, 1, null, 1)
		// Create input field for numberOfPlatesY
		createNumberInput(terrainParameters, "numberOfPlatesYInput", "terrain.property.numberOfPlatesY", 10, 1, null, 1)
	}

	readParameters() {
		// Size of a tectonic plate along the x axis in number of tiles
		this.plateSizeX = document.getElementById("plateSizeXInput").value
		// Size of a tectonic plate along the y axis in number of tiles
		this.plateSizeY = document.getElementById("plateSizeYInput").value
		// Size of a terrain along the x axis in number of tectonic plates
		this.numberOfPlatesX = document.getElementById("numberOfPlatesXInput").value
		// Size of a terrain along the y axis in number of tectonic plates
		this.numberOfPlatesY = document.getElementById("numberOfPlatesYInput").value
		// Total size of the terrain along the x axis in number of tiles
		this.terrainSizeX = this.plateSizeX * this.numberOfPlatesX
		// Total size of the terrain along the y axis in number of tiles
		this.terrainSizeY = this.plateSizeY * this.numberOfPlatesY
	}

	takeDown() {
		terrainParameters = document.getElementById("terrainParameters")
		while(terrainParameters.hasChildNodes()) {
			terrainParameters.removeChild(terrainParameters.lastChild)
		}
	}

	addLayer(name) {
		var layerTiles = []
		for (var y = 0; y < this.terrainSizeY; ++y) {
			var row = []
			row.length = this.terrainSizeX
			row.fill(0)
			layerTiles[y] = row
		}
		this.terrainLayers[name] = layerTiles
		return layerTiles
	}

	generate(landGeneration, waterGeneration, magmaGeneration) {
		super.generate()
		landGeneration.readParameters()
		this.readParameters()
		// remove all layers
		this.terrainLayers = {}
		// add land layer
		var landLayer = this.addLayer("land")
		// For each tectonic plate
		for (var plateY = 0; plateY < this.numberOfPlatesY; ++plateY) {
			for (var plateX = 0; plateX < this.numberOfPlatesX; ++plateX) {
				// Select the start and end points as the coordinates of random tiles inside the plate
				var startTileX = Number(randomGenerator.randomIntegerInRange(this.plateSizeX * plateX, this.plateSizeX * (plateX + 1)))
				var startTileY = Number(randomGenerator.randomIntegerInRange(this.plateSizeY * plateY, this.plateSizeY * (plateY + 1)))
				var endTileX = Number(randomGenerator.randomIntegerInRange(this.plateSizeX * plateX, this.plateSizeX * (plateX + 1)))
				var endTileY = Number(randomGenerator.randomIntegerInRange(this.plateSizeY * plateY, this.plateSizeY * (plateY + 1)))
				landGeneration.setPoints(startTileX, startTileY, endTileX, endTileY)
				// Find the boundaries of the land generation function
				var minLandGenerationX = Math.max(0, landGeneration.getMinimumBoundaryX())
				var maxLandGenerationX = Math.min(this.terrainSizeX - 1, landGeneration.getMaximumBoundaryX())
				var minLandGenerationY = Math.max(0, landGeneration.getMinimumBoundaryY())
				var maxLandGenerationY = Math.min(this.terrainSizeY - 1, landGeneration.getMaximumBoundaryY())
				// Add the results of the land generation function for all tiles in the terrain
				for (var tileY = minLandGenerationY; tileY <= maxLandGenerationY; ++tileY) {
					for (var tileX = minLandGenerationX; tileX <= maxLandGenerationX; ++tileX) {
						landLayer[tileY][tileX] += landGeneration.getValueAt(tileX, tileY)
					}
				}
			}
		}
		if(waterGeneration instanceof FlatWaterGeneration) {
			waterGeneration.readParameters()
			var waterLayer = this.addLayer("water")
			// For each tile
			for (var tileY = 0; tileY < this.terrainSizeY; ++tileY) {
				for (var tileX = 0; tileX < this.terrainSizeX; ++tileX) {
					waterLayer[tileY][tileX] = waterGeneration.seaLevel
				}
			}
		}
		if(magmaGeneration instanceof FlatMagmaGeneration) {
			magmaGeneration.readParameters()
			var magmaLayer = this.addLayer("magma")
			// For each tile
			for (var tileY = 0; tileY < this.terrainSizeY; ++tileY) {
				for (var tileX = 0; tileX < this.terrainSizeX; ++tileX) {
					magmaLayer[tileY][tileX] = -magmaGeneration.crustThickness
				}
			}
		}
	}

	print() {
		var imagePixels = new Uint8ClampedArray(this.terrainSizeX * this.terrainSizeY * 4)
		// layers
		var landLayer = this.getLayer("land")
		var waterLayer = this.getLayer("water")
		var magmaLayer = this.getLayer("magma")
		// minimums and maximums
		var minimumTile = this.getMinimumValue()
		var maximumTile = this.getMaximumValue()
		var tileRange = maximumTile - minimumTile
		//
		var index = 0
		for (var tileY = 0; tileY < this.terrainSizeY; ++tileY) {
			for (var tileX = 0; tileX < this.terrainSizeX; ++tileX) {
				// colors
				var red = 0
				var green = 0
				var blue = 0
				// levels
				var landLevel = landLayer[tileY][tileX]
				if(waterLayer != undefined) {
					var waterLevel = waterLayer[tileY][tileX]
					if (landLevel > waterLevel) {
						green = 255 - Math.floor(63 * (landLevel - waterLevel) / (tileRange))
					} else {
						blue = 255 - Math.floor(63 * (waterLevel - landLevel) / (tileRange))
					}
				} else {
					green = 255 - Math.floor(63 * (landLevel - minimumTile) / (tileRange))
				}
				// Set R channel
				imagePixels[index++] = red
				// Set G channel
				imagePixels[index++] = green
				// Set B channel
				imagePixels[index++] = blue
				// Set alpha channel
				imagePixels[index++] = 255
			}
		}
		var imageData = new ImageData(imagePixels, this.terrainSizeX, this.terrainSizeY)
		var printingOutput = document.getElementById("printingOutput")
		while(printingOutput.hasChildNodes()) {
			printingOutput.removeChild(printingOutput.lastChild)
		}
		var canvas = document.createElement("canvas")
		canvas.id = "terrainCanvas"
		canvas.width = this.terrainSizeX
		canvas.height = this.terrainSizeY
		printingOutput.appendChild(canvas)
		var canvasContext = document.getElementById(canvas.id).getContext('2d')
		canvasContext.putImageData(imageData, 0, 0)
	}

	getMinimumValue() {
		var minimumValue = Number.POSITIVE_INFINITY
		for (const terrainLayer of Object.values(this.getLayers())) {
			for (var tileY = 0; tileY < this.terrainSizeY; ++tileY) {
				for (var tileX = 0; tileX < this.terrainSizeX; ++tileX) {
					var tile = terrainLayer[tileY][tileX]
					if(isFinite(tile) && (tile < minimumValue)) {
						minimumValue = tile
					}
				}
			}
		}
		if(!isFinite(minimumValue)) {
			return 0
		}
		return minimumValue
	}

	getMaximumValue() {
		var maximumValue = Number.NEGATIVE_INFINITY
		for (const terrainLayer of Object.values(this.getLayers())) {
			for (var tileY = 0; tileY < this.terrainSizeY; ++tileY) {
				for (var tileX = 0; tileX < this.terrainSizeX; ++tileX) {
					var tile = terrainLayer[tileY][tileX]
					if(isFinite(tile) && (tile > maximumValue)) {
						maximumValue = tile
					}
				}
			}
		}
		if(!isFinite(maximumValue)) {
			return 0
		}
		return maximumValue
	}

}

