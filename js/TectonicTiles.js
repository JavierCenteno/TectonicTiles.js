/* 
 * TectonicTiles.js
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

/* 
 * Random generator
 */

randomGenerator = undefined

function setSeed() {
	var seedString = document.getElementById("randomGeneratorSeed").value
	randomGenerator = new Xorshift64Star()
	randomGenerator.setSeedString(seedString)
}

// Run setSeed() so the page starts off with a seed chosen
setSeed()

/* 
 * LandGeneration
 */

landGeneration = undefined

function setLandGenerationType() {
	if(landGeneration !== undefined) {
		landGeneration.takeDown()
	}
	var selectedLandGenerationType = document.getElementById("landGenerationType").value
	switch(selectedLandGenerationType) {
		case "smoothstepLandGeneration":
			landGeneration = new SmoothstepLandGeneration()
			break
		case "smoothstepPowerLandGeneration":
			landGeneration = new SmoothstepPowerLandGeneration()
			break
		case "ondulationLandGeneration":
			landGeneration = new OndulationLandGeneration()
			break
		default:
			landGeneration = undefined
	}
	if(landGeneration !== undefined) {
		landGeneration.setUp()
	}
}

// Run setLandGenerationType() so the page starts off with a land generation type set
setLandGenerationType()

/* 
 * TerrainType
 */

terrain = undefined

function setTerrainType() {
	if(terrain !== undefined) {
		terrain.takeDown()
	}
	var selectedTerrainType = document.getElementById("terrainType").value
	switch(selectedTerrainType) {
		case "squareTerrain":
			terrain = new SquareTerrain()
			break
		default:
			terrain = undefined
	}
	if(terrain !== undefined) {
		terrain.setUp()
	}
}

// Run setTerrainType() so the page starts off with a terrain type set
setTerrainType()

function generateAndPrintTerrain() {
	terrain.generate(landGeneration)
	terrain.print()
}

