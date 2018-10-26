// Vendor assets
import './vendor.js';
// Templates
import '/imports/templates';
// Styles
import '/imports/styles/bootstrap.scss';
import '/imports/styles/app.scss';
// Routes
import './routes.js';

$.extend( $.fn.dataTable.defaults, {
	responsive: true,
	paging      : true,
	lengthChange: true,
	searching   : true,
	ordering    : true,
	info        : true,
	autoWidth   : true,
	responsive: true,
	language:{
		search: "Buscar:",
		info: "Mostrando pagina _PAGE_ de _PAGES_",
		lengthMenu:     "Mostrar _MENU_ registros",
		loadingRecords: "Cargando...",
		processing:     "Procesando...",
		zeroRecords:    "No se encontraron registros",
		paginate: {
			previous: "Anterior",
			next: "Siguiente"
		}
	}
} );