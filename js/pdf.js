// function createPdf(){
//   var content = $('main');
//   var width = (content.css('width').replace('px','') * 0.02645833)*10;
//   var height = (content.css('height').replace('px','') * 0.02645833)*10;
//   var date = new Date();
//       date = moment(date).format("D-MMMM-YYYY");
//   html2canvas(content, {
//     onrendered: function(canvas) {
//        try {
//         canvas.getContext('2d');
//         var imgData = canvas.toDataURL("image/jpeg", 1.0);
//           var pdf = new jsPDF('p', 'mm', [width, height]);
//           pdf.addImage(imgData, 'JPEG', 5, 5);
//           var namefile = 'presupuesto-'+date;
//           pdf.save(namefile + ".pdf");
//        } catch(e) {
//          alert("Error description: " + e.message);
//        }
//       //document.body.appendChild(canvas);
//     }
//   });
// }