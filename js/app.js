/* Variables */
const resultado = document.querySelector('#resultado');
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear() - 1;
const min = max - 10;

// Generamos un objeto para agrupar los datos de la búsqueda
const datosBusqueda = {
	marca: '',
	year: '',
	minimo: '',
	maximo: '',
	puertas: '',
	transmision: '',
	color: '',
};

/* Event Listeners */
document.addEventListener('DOMContentLoaded', () => {
	mostrarAutos(autos);

	llenarSelect(); // Llena 'select' de 'Año'
});

// Event Listeners para los 'select' de búsqueda
marca.addEventListener('change', (e) => {
	datosBusqueda.marca = e.target.value;
	filtrarAuto();
});
year.addEventListener('change', (e) => {
	datosBusqueda.year = parseInt(e.target.value);
	filtrarAuto();
});
minimo.addEventListener('change', (e) => {
	datosBusqueda.minimo = parseInt(e.target.value);
	filtrarAuto();
});
maximo.addEventListener('change', (e) => {
	datosBusqueda.maximo = parseInt(e.target.value);
	filtrarAuto();
});
puertas.addEventListener('change', (e) => {
	datosBusqueda.puertas = parseInt(e.target.value);
	filtrarAuto();
});
transmision.addEventListener('change', (e) => {
	datosBusqueda.transmision = e.target.value;
	filtrarAuto();
});
color.addEventListener('change', (e) => {
	datosBusqueda.color = e.target.value;
	filtrarAuto();
});

/* Functions */
function mostrarAutos(autos) {
	limpiarHTML();

	const resultadoTable = document.createElement('TABLE');
	resultadoTable.innerHTML = `
		<thead>
			<th>Marca</th>
			<th>Modelo</th>
			<th>Año</th>
			<th>Precio</th>
			<th>Puertas</th>
			<th>Transmisión</th>
			<th>Color</th>
		</thead>
		`;
	autos.forEach((auto) => {
		const { marca, modelo, year, precio, puertas, transmision, color } = auto;
		const autoHTML = document.createElement('TR');
		autoHTML.innerHTML = `
			<td>${marca}</td>
			<td>${modelo}</td>
			<td>${year}</td>
			<td>${precio}</td>
			<td>${puertas}</td>
			<td>${transmision}</td>
			<td>${color}</td>
		`;
		resultadoTable.appendChild(autoHTML);
		resultado.appendChild(resultadoTable);
	});
}

function limpiarHTML() {
	let i = 0;
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
		i++;
	}
}

function llenarSelect() {
	for (let i = max; i > min; i--) {
		const opcion = document.createElement('option');
		opcion.textContent = i;
		year.appendChild(opcion);
	}
}

function filtrarAuto() {
	const resultado = autos
		.filter(filtrarMarca)
		.filter(filtrarYear)
		.filter(filtrarMinimo)
		.filter(filtrarMaximo)
		.filter(filtrarPuertas)
		.filter(filtrarTransmision)
		.filter(filtrarColor);
	// console.log(resultado);
	if (resultado.length) {
		mostrarAutos(resultado);
	} else {
		noResultado();
	}
}
function noResultado() {
	limpiarHTML();

	const noResultadoTable = document.createElement('TABLE');
	noResultadoTable.classList.add('noResultado');
	const noResultado = document.createElement('TR');
	noResultado.classList.add('alerta', 'error');
	noResultado.innerHTML = `<td colspan="7">No hay elementos que coincidan con tu búsqueda</td>`;

	noResultadoTable.appendChild(noResultado);
	resultado.appendChild(noResultadoTable);
}
function filtrarMarca(auto) {
	const { marca } = datosBusqueda;
	if (marca) {
		return auto.marca === marca;
	}
	return auto;
}
function filtrarYear(auto) {
	const { year } = datosBusqueda;
	if (year) {
		return auto.year === year;
	}
	return auto;
}
function filtrarMinimo(auto) {
	const { minimo } = datosBusqueda;
	if (minimo) {
		return auto.precio >= minimo;
	}
	return auto;
}
function filtrarMaximo(auto) {
	const { maximo } = datosBusqueda;
	if (maximo) {
		return auto.precio <= maximo;
	}
	return auto;
}
function filtrarPuertas(auto) {
	const { puertas } = datosBusqueda;
	if (puertas) {
		return auto.puertas === puertas;
	}
	return auto;
}
function filtrarTransmision(auto) {
	const { transmision } = datosBusqueda;
	if (transmision) {
		return auto.transmision === transmision;
	}
	return auto;
}
function filtrarColor(auto) {
	const { color } = datosBusqueda;
	if (color) {
		return auto.color === color;
	}
	return auto;
}
