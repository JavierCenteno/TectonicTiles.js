/* 
 * LandGeneration.js
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

// Calculate the euclidean distance between point a and point b
// Given the coordinates of the points along the x and y axes
function euclideanDistance(a_x, a_y, b_x, b_y) {
	//return ((b_x - a_x) ** 2 + (b_y - a_y) ** 2) ** 0.5
	return Math.hypot(b_x - a_x, b_y - a_y)
}

function squaredEuclideanDistance(a_x, a_y, b_x, b_y) {
	var x = b_x - a_x
	var y = b_y - a_y
	return x * x + y * y
}

function manhattanDistance(a_x, a_y, b_x, b_y) {
	return Math.abs(b_x - a_x) + Math.abs(b_y - a_y)
}

function chebyshevDistance(a_x, a_y, b_x, b_y) {
	return Math.max(Math.abs(b_x - a_x), Math.abs(b_y - a_y))
}

function octogonalDistance(a_x, a_y, b_x, b_y) {
	deltaX = Math.abs(b_x - a_x)
	deltaY = Math.abs(b_y - a_y)
	if(deltaX < deltaY) {
		return 0.41 * deltaX + 0.941246 * deltaY
	} else {
		return 0.41 * deltaY + 0.941246 * deltaX
	}
}

class LandGeneration {

	/**
	 * Takes any necessary action to set this land generation up (typically creating the necessary HTML input fields).
	 */
	setUp() {
	}

	/**
	 * Reads this land generation's parameters from the HTML input fields.
	 */
	readParameters() {
	}

	/**
	 * Takes any necessary action to take this land generation down (typically removing the HTML fields created by it).
	 */
	takeDown() {
	}

	/**
	 * Get the minimum possible x coordinate of a point affected by this land generation function.
	 * @return {Number} The minimum possible x coordinate of a point affected by this land generation function.
	 */
	getMinimumBoundaryX() {
		return Number.NEGATIVE_INFINITY
	}

	/**
	 * Get the maximum possible x coordinate of a point affected by this land generation function.
	 * @return {Number} The maximum possible x coordinate of a point affected by this land generation function.
	 */
	getMaximumBoundaryX() {
		return Number.POSITIVE_INFINITY
	}

	/**
	 * Get the minimum possible y coordinate of a point affected by this land generation function.
	 * @return {Number} The minimum possible y coordinate of a point affected by this land generation function.
	 */
	getMinimumBoundaryY() {
		return Number.NEGATIVE_INFINITY
	}

	/**
	 * Get the maximum possible y coordinate of a point affected by this land generation function.
	 * @return {Number} The maximum possible y coordinate of a point affected by this land generation function.
	 */
	getMaximumBoundaryY() {
		return Number.POSITIVE_INFINITY
	}

	/**
	 * Set the start and end Points of this land generation function.
	 * @param {Number} startPointX The x coordinate of the start point.
	 * @param {Number} startPointY The y coordinate of the start point.
	 * @param {Number} endPointX The x coordinate of the end point.
	 * @param {Number} endPointY The y coordinate of the end point.
	 */
	setPoints(startPointX, startPointY, endPointX, endPointY) {
	}

	/**
	 * Get the value of this land generation function at the given point.
	 * @param {Number} pointX The x coordinate of the point.
	 * @param {Number} pointY The y coordinate of the point.
	 * @return {Number} The value of this land generation function at the given point.
	 */
	getValueAt(pointX, pointY) {
	}

}

class Interpolations {

	static smoothstep(x) {
		if (x <= 0) {
			return 0
		} else if (x >= 1) {
			return 1
		} else {
			var x_2 = x * x
			var x_3 = x_2 * x
			return 3 * x_2 - 2 * x_3
		}
	}

	static smoothstepPower(x, k) {
		if (x <= 0) {
			return 0
		} else if (x >= 1) {
			return 1
		} else {
			x = Math.pow(x, k)
			var x_2 = x * x
			var x_3 = x_2 * x
			return 3 * x_2 - 2 * x_3
		}
	}

	static continuousSmoothstep(x) {
		x = x % 2
		if(x < 0) {
			x = x + 2
		}
		if(x < 1) {
			var x_2 = x * x
			var x_3 = x_2 * x
			return 3 * x_2 - 2 * x_3
		} else if(x > 1) {
			x = 2 - x
			var x_2 = x * x
			var x_3 = x_2 * x
			return 3 * x_2 - 2 * x_3
		} else if(x == 1) {
			return 1
		} else {
			return 0
		}
	}

}

class SmoothstepLandGeneration extends LandGeneration {

	setUp() {
		var landGenerationParameters = document.getElementById("landGenerationParameters")
		// Create input field for mountain radius
		createNumberInput(landGenerationParameters, "mountainRadiusInput", "landGeneration.property.mountainRadius", 15, null, null, null)
	}

	readParameters() {
		this.mountainRadius = document.getElementById("mountainRadiusInput").value
	}

	takeDown() {
		landGenerationParameters = document.getElementById("landGenerationParameters")
		while(landGenerationParameters.hasChildNodes()) {
			landGenerationParameters.removeChild(landGenerationParameters.lastChild)
		}
	}

	getMinimumBoundaryX() {
		return this.endPointX - Math.ceil(this.radius)
	}

	getMaximumBoundaryX() {
		return this.endPointX + Math.ceil(this.radius)
	}

	getMinimumBoundaryY() {
		return this.endPointY - Math.ceil(this.radius)
	}

	getMaximumBoundaryY() {
		return this.endPointY + Math.ceil(this.radius)
	}

	setPoints(startPointX, startPointY, endPointX, endPointY) {
		this.startPointX = startPointX
		this.startPointY = startPointY
		this.endPointX = endPointX
		this.endPointY = endPointY
		var distance = euclideanDistance(startPointX, startPointY, endPointX, endPointY)
		this.radius = this.mountainRadius
		this.height = distance
	}

	getValueAt(pointX, pointY) {
		if (this.startPointX == this.endPointX && this.startPointY == this.endPointY) {
			return 0
		}
		var x = 1 - (euclideanDistance(pointX, pointY, this.endPointX, this.endPointY) / this.radius)
		return this.height * Interpolations.smoothstep(x)
	}

}

class SmoothstepPowerLandGeneration extends LandGeneration {

	setUp() {
		var landGenerationParameters = document.getElementById("landGenerationParameters")
		// Create input field for mountain radius
		createNumberInput(landGenerationParameters, "mountainRadiusInput", "landGeneration.property.mountainRadius", 15, null, null, null)
		// Create input field for continent radius
		createNumberInput(landGenerationParameters, "continentRadiusInput", "landGeneration.property.continentRadius", 30, null, null, null)
	}

	readParameters() {
		this.mountainRadius = document.getElementById("mountainRadiusInput").value
		this.continentRadius = document.getElementById("continentRadiusInput").value
	}

	takeDown() {
		landGenerationParameters = document.getElementById("landGenerationParameters")
		while(landGenerationParameters.hasChildNodes()) {
			landGenerationParameters.removeChild(landGenerationParameters.lastChild)
		}
	}

	getMinimumBoundaryX() {
		return this.endPointX - Math.ceil(this.radius)
	}

	getMaximumBoundaryX() {
		return this.endPointX + Math.ceil(this.radius)
	}

	getMinimumBoundaryY() {
		return this.endPointY - Math.ceil(this.radius)
	}

	getMaximumBoundaryY() {
		return this.endPointY + Math.ceil(this.radius)
	}

	setPoints(startPointX, startPointY, endPointX, endPointY) {
		this.startPointX = startPointX
		this.startPointY = startPointY
		this.endPointX = endPointX
		this.endPointY = endPointY
		var distance = euclideanDistance(startPointX, startPointY, endPointX, endPointY)
		this.radius = this.continentRadius
		this.height = distance
	}

	getValueAt(pointX, pointY) {
		if (this.startPointX == this.endPointX && this.startPointY == this.endPointY) {
			return 0
		}
		var x = 1 - (euclideanDistance(pointX, pointY, this.endPointX, this.endPointY) / this.radius)
		return this.height * Interpolations.smoothstepPower(x, this.continentRadius / this.mountainRadius)
	}

}

class OndulationLandGeneration extends LandGeneration {

	setUp() {
		var landGenerationParameters = document.getElementById("landGenerationParameters")
		// Create input field for mountain radius
		createNumberInput(landGenerationParameters, "mountainRadiusInput", "landGeneration.property.mountainRadius", 15, null, null, null)
		// Create input field for continent radius
		createNumberInput(landGenerationParameters, "continentRadiusInput", "landGeneration.property.continentRadius", 30, null, null, null)
	}

	readParameters() {
		this.mountainRadius = document.getElementById("mountainRadiusInput").value
		this.continentRadius = document.getElementById("continentRadiusInput").value
	}

	takeDown() {
		landGenerationParameters = document.getElementById("landGenerationParameters")
		while(landGenerationParameters.hasChildNodes()) {
			landGenerationParameters.removeChild(landGenerationParameters.lastChild)
		}
	}

	getMinimumBoundaryX() {
		return super.getMinimumBoundaryX()
	}

	getMaximumBoundaryX() {
		return super.getMaximumBoundaryX()
	}

	getMinimumBoundaryY() {
		return super.getMinimumBoundaryY()
	}

	getMaximumBoundaryY() {
		return super.getMaximumBoundaryY()
	}

	setPoints(startPointX, startPointY, endPointX, endPointY) {
		this.startPointX = startPointX
		this.startPointY = startPointY
		this.endPointX = endPointX
		this.endPointY = endPointY
		var distance = euclideanDistance(startPointX, startPointY, endPointX, endPointY)
		this.radius = this.mountainRadius
		this.height = distance
		// theta is the angle between the x axis and the line between the start point and the end point
		this.theta = Math.atan((this.endPointY - this.startPointY)/(this.endPointX - this.startPointX))
		this.sine_theta = Math.sin(this.theta)
		this.cosine_theta = Math.cos(this.theta)
	}

	getValueAt(pointX, pointY) {
		if (this.startPointX == this.endPointX && this.startPointY == this.endPointY) {
			return 0
		}
		// relativeX, relativeY are the coordinates of the point if the end point was the origin of the system of coordinates
		var relativeX = pointX - this.endPointX
		var relativeY = pointY - this.endPointY
		// rotatedX, rotatedY are the coordinates of the point if we rotate the system of coordinates so that the start point and the end point both fall in the x axis of coordinates
		var rotatedX = relativeX * this.cosine_theta + relativeY * this.sine_theta
		// var rotatedY = -relativeX * this.sine_theta + relativeY * this.cosine_theta
		var z = Interpolations.continuousSmoothstep(rotatedX / this.radius)
		// multiply z by the height of a smoothstep crease centered at the end point with continentRadius width
		z = z * Interpolations.smoothstep(1 - (euclideanDistance(pointX, pointY, this.endPointX, this.endPointY) / this.continentRadius))
		return this.height * z
	}

}

class EggCartonLandGeneration extends LandGeneration {

	setUp() {
		var landGenerationParameters = document.getElementById("landGenerationParameters")
		// Create input field for mountain radius
		createNumberInput(landGenerationParameters, "mountainRadiusInput", "landGeneration.property.mountainRadius", 15, null, null, null)
		// Create input field for continent radius
		createNumberInput(landGenerationParameters, "continentRadiusInput", "landGeneration.property.continentRadius", 30, null, null, null)
	}

	readParameters() {
		this.mountainRadius = document.getElementById("mountainRadiusInput").value
		this.continentRadius = document.getElementById("continentRadiusInput").value
	}

	takeDown() {
		landGenerationParameters = document.getElementById("landGenerationParameters")
		while(landGenerationParameters.hasChildNodes()) {
			landGenerationParameters.removeChild(landGenerationParameters.lastChild)
		}
	}

	getMinimumBoundaryX() {
		return super.getMinimumBoundaryX()
	}

	getMaximumBoundaryX() {
		return super.getMaximumBoundaryX()
	}

	getMinimumBoundaryY() {
		return super.getMinimumBoundaryY()
	}

	getMaximumBoundaryY() {
		return super.getMaximumBoundaryY()
	}

	setPoints(startPointX, startPointY, endPointX, endPointY) {
		this.startPointX = startPointX
		this.startPointY = startPointY
		this.endPointX = endPointX
		this.endPointY = endPointY
		var distance = euclideanDistance(startPointX, startPointY, endPointX, endPointY)
		this.radius = this.mountainRadius
		this.height = distance
		// theta is the angle between the x axis and the line between the start point and the end point
		this.theta = Math.atan((this.endPointY - this.startPointY)/(this.endPointX - this.startPointX))
		this.sine_theta = Math.sin(this.theta)
		this.cosine_theta = Math.cos(this.theta)
	}

	getValueAt(pointX, pointY) {
		if (this.startPointX == this.endPointX && this.startPointY == this.endPointY) {
			return 0
		}
		// relativeX, relativeY are the coordinates of the point if the end point was the origin of the system of coordinates
		var relativeX = pointX - this.endPointX
		var relativeY = pointY - this.endPointY
		// rotatedX, rotatedY are the coordinates of the point if we rotate the system of coordinates so that the start point and the end point both fall in the x axis of coordinates
		var rotatedX = relativeX * this.cosine_theta + relativeY * this.sine_theta
		var rotatedY = -relativeX * this.sine_theta + relativeY * this.cosine_theta
		// dividedX, dividedY are the coordinates of the point if we make the size of the unit vector equal to the radius of the mountain
		var dividedX = rotatedX / this.radius
		var dividedY = rotatedY / this.radius
		// interpolatedX, interpolatedY are the heights of the point
		var interpolatedX = Interpolations.continuousSmoothstep(dividedX)
		var interpolatedY = Interpolations.continuousSmoothstep(dividedY)
		var z = interpolatedX * interpolatedY
		// multiply z by the height of a smoothstep crease centered at the end point with continentRadius width
		z = z * Interpolations.smoothstep(1 - (euclideanDistance(pointX, pointY, this.endPointX, this.endPointY) / this.continentRadius))
		return this.height * z
	}

}
