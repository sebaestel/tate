'use strict';

var tate = angular.module('tate', [ 
		'ngSanitize', 
		'InlineTextEditor', 
		'angularMoment', 
		'basquiat-ng',
        'angular-ladda'
	]);
tate.config(function (laddaProvider) {
    laddaProvider.setOption({ /* optional */
      style: 'expand-left',
      spinnerSize: 35,
      spinnerColor: '#ffffff'
    });
  })
tate.run(function(amMoment) {
    amMoment.changeLocale('es');
});
tate.controller('tateCtrl', ['$scope', function ($scope) {
	$scope.actualTime = new Date();
	$('textarea').elastic();
	$scope.detail = "Desarrollo de 2 ilustraciones en alta resolución, para ser aplicadas en botella y envase botella bebida DRINKY, como sigue:<br/> a) Ilustración botella: mapa de bits, a todo color, para botella <br/> b) Ilustración envase: vectorial, en duotono, para envase protector de botella<br/> Por la tarifa propuesta en este documento se autoriza, mediante contrato, la utilización de tales obras en las siguientes aplicaciones:<br/>- afiche promocional <br/>- inserto publicitario revistas<br/>- decoración vehículo de carga - volantes";
	$scope.term = "a) Tiempo estimado desarrollo ilustración botella: 1 semana </br> b) Tiempo estimado desarrollo ilustración envase: 1 semana </br> c) Tiempo total estimado desarrollo: 2 semanas (desde firma de contrato) </br>  d) Fecha entrega final propuesta: martes 13 de noviembre 2012";
	$scope.contract = "Las condiciones señaladas en esta cotización quedarán escrituradas formalmente mediante Contrato de Prestación de Servicios Gráficos a Honorarios, documento que deberá ser firmado por ambas partes ante notario, previo al inicio de labores.";
	$scope.signatureFirstLine = "Sebastian Duran";
	$scope.signatureSecondline = "Web developer & UI designer";
	$scope.extend = "Se extiende esta cotización a petición de Pedro Muñoz, Agencia XYZ";
	$scope.title = "COTIZACIÓN ILUSTRACIÓN PROYECTO ETIQUETA BEBIDA DRINKY";
   	$scope.sketches = 2;
   	$scope.sketchesUf = 1;
   	$scope.freeCorrections = 2;
   	$scope.correctionsUf= 3;

    $scope.chartTheme = [
        {
            'start': '#df1892',
            'end': '#fa6197'
        }
    ];

    $scope.createPdf = function() {
        var content = $('main');
        var width = (content.css('width').replace('px','') * 0.02645833)*10;
        var height = (content.css('height').replace('px','') * 0.02645833)*10;
        var date = new Date();
            date = moment(date).format("D-MMMM-YYYY");
        html2canvas(content, {
            onrendered: function(canvas) {
                try {
                    canvas.getContext('2d');
                    var imgData = canvas.toDataURL("image/jpeg", 1.0);
                    var pdf = new jsPDF('p', 'mm', [width, height]);
                    pdf.addImage(imgData, 'JPEG', 5, 5);
                    var namefile = 'presupuesto-'+date;
                    pdf.save(namefile + ".pdf");

                } catch(e) {
                    alert("Error description: " + e.message);
                }
                //document.body.appendChild(canvas);
            }
        });
    }




    $scope.toStart = 30;
    $scope.toEnd = 70;
    $scope.dateRange = 2;

    $scope.change = function() {
    	$scope.test = [
       		{"id": 1, "label": "Inicio", "value": $scope.toStart},
        	{"id": 2, "label": "Termino", "value": $scope.toEnd}
    	]
    };
    $scope.change();
}]);

tate.directive('addItem', function () {
    return {
        link: function (scope, element, attributes) {
            element.bind('click', function () {
            	var id = Math.floor((Math.random() * 100000) + 1);
    			$('table tbody').prepend('<tr id="item-'+id+'"><td><input type="text" placeholder="Nombre item"></td><td><input type="text" placeholder="valor"></td><td><span class="ion-close-circled" onclick="deleteItems('+id+')"></span></td></tr>');
            });
        }
    };
});


function deleteItems(a){
	$('#item-'+a).remove()
}
