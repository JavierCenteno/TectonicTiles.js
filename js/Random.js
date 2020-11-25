/* 
 * Random.js
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

class RandomGenerator {

	static hashString(string, bits) {
		var hash = 0n
		var mask = (0b1n << BigInt(bits)) - 1n
		for(var i = 0; i < string.length; ++i) {
			hash = (hash * 127n + BigInt(string.charCodeAt(i))) & mask
		}
		return hash
	}

	setSeed(seed) {
	}

	randomInteger() {
	}

	randomInteger(maximum) {
	}

	randomInteger(minimum, maximum) {
	}

}

class Xorshift64Star {

	setSeed(seed) {
		if(seed == 0n || seed === undefined || seed === null) {
			seed = 0n
			for(var i = 0; i < 64; ++i) {
				var bit
				if(Math.random() < 0.5) {
					bit = 0n
				} else {
					bit = 1n
				}
				seed = (seed << 1n) | bit
			}
		}
		this.seed = seed
		this.state = seed
	}

	setSeedString(seed) {
		this.setSeed(RandomGenerator.hashString(seed, 64))
	}

	next() {
		this.state = this.state ^ (this.state >> 12n)
		this.state = this.state ^ ((this.state << 25n) & 0xFFFFFFFFFFFFFFFFn)
		this.state = this.state ^ (this.state >> 27n)
		return (this.state * 0x2545F4914F6CDD1Dn) & 0xFFFFFFFFFFFFFFFFn
	}

	randomInteger(maximum) {
		if (arguments.length === 0) {
			return next()
		} else {
			maximum = BigInt(maximum)
			if(maximum == 0n) {
				return 0n
			} else if (maximum < 0n) {
				return -this.randomInteger(-maximum)
			} else {
				var moduloBias = 0x10000000000000000n % maximum
				var unbiasedMaximum = 0x10000000000000000n - moduloBias
				var result
				do {
					result = this.next()
				} while (result >= unbiasedMaximum)
				return result % maximum
			}
		}
	}

	randomIntegerInRange(minimum, maximum) {
		minimum = BigInt(minimum)
		maximum = BigInt(maximum)
		return minimum + this.randomInteger(maximum - minimum)
	}

}
