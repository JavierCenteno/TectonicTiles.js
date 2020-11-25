<h1>TectonicTiles.js</h1>

<p>Copyright 2020 Javier Centeno Vega</p>

<p><a href="./COPYING" title="License">This software is licensed under a GNU general public license.</a></p>



<h2>About</h2>

<p>Tectonic tiles is a random terrain generation algorithm inspired by plate tectonics.</p>



<h2>The algorithm</h2>

<p>The algorithm works by creating a lattice of tiles, which is tessellated into tectonic plates. Each tectonic plate is assigned a movement defined by a starting tile and an ending tile.</p>

<p>This movement is applied to the terrain through a crease function, which given a starting tile, an ending tile and an influenced tile returns the influence on the influenced tile from the movement of the crust from the starting tile to the ending tile.</p>

<p>For the movement of all tectonic plates, the influence is calculated and added to all tiles.</p>

