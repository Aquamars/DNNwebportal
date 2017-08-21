// import pdfConverter from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake.js'
import vfsFonts from 'pdfmake/build/vfs_fonts'
import {ftpPass} from './FtpPass'
// image
import { 
	monkey,
	logo,
	ftp,
	ftp2,
	webCreate1,
	webCreate2,
	webCreate3,
	webCreate4,
	webCreate5,
	webCreate6,
	webCreate7,
	accessInstance1,
	accessInstance2,
	accessInstance3,
	tensorflow,
	header,
} from '../image'
// const pdf = new pdfConverter('p', 'pt')
// // let doc = converter.jsPDF('p', 'pt')
// pdf.setFontSize(40)
// pdf.text(35, 25, "Octonyan loves jsPDF")
// const pdf = new pdfConverter('p', 'mm', 'a4')
// pdf.setFontSize(40) 
// pdf.text(35, 25, "Monkey can do DNN")
// pdf.addImage(monkey, 'JPEG', 15, 40, 180, 120)
// pdf.addPage('p', 'mm', 'a4');
// pdf.text(35, 25, "Monkey can do DNN")
// pdf.addImage(monkey, 'JPEG', 15, 40, 180, 100)
// pdf.fromHTML(window.document.getElementById('divToPDF'), 10, 10,{'width': 180});
// pdf.save('test.pdf')
// export function makeFile() {
//   // do some calculations
//   return {
//     mime: 'application/pdf',
//       filename: 'generated.pdf',
//       contents: pdf.output()
//   }
// }

import '../plugin/html2Canvas'
export function displayPDF(username){
	

	const ftpPassword = ftpPass(username)
	const docDefinition = { 
		content:[
////////////// page 1
			{ 
				text: 'Monkey can using DNN', 
				style: 'title',
				fontSize: 36,
				 
			},
			{
				text:'\n\n\n\n\n\n\n'
			},
			{
				image: monkey,
				width: 450
			},
			{
				text:'\n\n\n\n\n\n\n'
			},
			{
				text: 'Author:\n Professional Monkey',
				alignment: 'center',
				fontSize: 24,
			},
			{
				text: '\nmOnkEyuSEr@itri.org.tw',
				alignment: 'center',
				fontSize: 20,
			},
			{
				text:'\n\n\n\n\n'
			},			
			{
				image: logo,
				width: 200,
				alignment: 'center',
				pageBreak: 'after'				
			},
////////////// page 2
			{ 
				text:"Guideline", 
				style: 'title',
				fontSize: 36,
			},
			{
				text:'\n'
			},
			{
				ol: [
					{ 
						text:"Monkey how to use FTP\n", 
						linkToPage: 3,
						style: 'outline'
					},
					{ 
						text:"How to create instance on webportal\n", 
						linkToPage: 4,
						style: 'outline'
					},
					{ 
						text:"Access instance\n", 
						linkToPage: 8,
						style: 'outline'
					},
					{ 
						text:"Demo of Tensorflow running code\n", 
						linkToPage: 10,
						style: 'outline'
					},
					{ 
						text:"...\n", 
						linkToPage: 2,
						style: 'outline'
					},
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
					// { 
					// 	text:"...\n", 
					// 	linkToPage: 2,
					// 	style: 'outline'
					// },
				],
				fontSize: 24,
				pageBreak: 'after'	
			},
////////////// page 3
			{ 
				text:"Monkey how to use FTP", 
				style: 'title',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"For upload your dataset or your image.\n You can using ftp uploading.", 
				fontSize: 20,
			},
			{
				text:'\n\n'
			},
			{ 
				text:"These are your FTP connect information.", 
				fontSize: 18,
			},
			{
				style: 'tableExample',
				table: {
					widths: [200, '*', 100, '*'],
					body: [
						['ftpHost', 'ftpUser', 'ftpPass','ftpPort'],
						[
							{ 
								text:"0.0.0.0", 
								bold: true,
							}, 
							{ 
								text:username, 
								bold: true,
							},
							{ 
								text:ftpPassword, 
								bold: true,
							},
							{ 
								text:'9527', 
								bold: true,
							},
						]
					]
				}
			},
			{
				text:'\n\n'
			},
			{
				image: ftp,
				width: 550,
				alignment: 'center',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"You can find ftp information on webportal", 
				fontSize: 18,
			},
			{
				image: ftp2,
				width: 550,
				alignment: 'center',
				pageBreak: 'after'
			},
////////////// page 4
			{ 
				text:"How to create instance on webportal", 
				style: 'title',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"* The most 3 instance you can create.", 
				color:"red",
				fontSize: 20,
			},
			{
				text:'\n\n'
			},
			{ 
				text:"1. Press the create button.", 
				fontSize: 16,
			},			
			{
				image: webCreate1,
				width: 500,
				alignment: 'center',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"2. Choose range of date.", 
				fontSize: 16,
			},			
			{
				image: webCreate2,
				width: 500,
				alignment: 'center',
				pageBreak: 'after'
			},
			{ 
				text:"3. Interval need bigger than 0 days, then you can into next step.", 
				fontSize: 16,
			},			
			{
				image: webCreate3,
				width: 500,
				alignment: 'center',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"4. You can choose images what you want.", 
				fontSize: 16,
			},			
			{
				image: webCreate4,
				width: 500,
				alignment: 'center',
				pageBreak: 'after'
			},
			{ 
				text:"5. Create instance after confirm your setting.", 
				fontSize: 16,
			},			
			{
				image: webCreate5,
				width: 500,
				alignment: 'center',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"6. You can get your account and password after create success.", 
				fontSize: 16,
			},			
			{
				image: webCreate6,
				width: 500,
				alignment: 'center',
				pageBreak: 'after'
			},
			{ 
				text:"7. You can see the instance IP& port after instance is running.", 
				fontSize: 16,
			},			
			{
				image: webCreate7,
				width: 500,
				alignment: 'center',
				pageBreak: 'after'
			},
////////////// page 8
			{ 
				text:"Access instance", 
				style: 'title',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"1. Using putty access instance.", 
				fontSize: 18,
				bold: true,
			},
			{ 
				text:"Input your ip & port and select SSH.(you can click to copy&paste)", 
				fontSize: 16,
			},
			{
				image: accessInstance1,
				width: 500,
				alignment: 'center',
			},
			{ 
				text:"Input your account and password to access instance.", 
				fontSize: 16,
			},
			{
				image: accessInstance2,
				width: 260,
				alignment: 'center',
			},
			{
				text:'\n\n'
			},
			{ 
				text:"2. Using linux access instance.", 
				fontSize: 18,
				bold: true,
			},
			{ 
				text:"Just click to copy and paste to the command line.", 
				fontSize: 16,
			},
			{
				image: accessInstance3,
				width: 500,
				alignment: 'center',
				pageBreak: 'after'
			},
////////////// page 10
			{ 
				text:"Demo of Tensorflow running code", 
				style: 'title',
			},
			{
				text:'\n\n'
			},
			{
				text:'Example of running code with dataset are located in image tensorflow:201707. ',
				fontSize: 18,
				alignment: 'justify'
			},
			{
				text:'\n'
			},
			{
				text:[
					'Training file is located in ',
					{
						text:'“/” directory', 
						color:'blue'
					},
					' and named ',
					{
						text:'demo.py', 
						color:'blue'
					},
					'.\n',
					'Dataset is located in ',
					{
						text:'“/tmp/data”', 
						color:'blue'
					},
					'.',
				],
				fontSize: 18,
			},
			{
				text:'\n'
			},
			{
				table: {
					widths: [150, 300],
					body: [
						['training file', 'dataset archives'],
						[
							{
								ul: [
										'demo.py',
									]
							},
							{
								ul: [
										't10k-labels-idx1-ubyte.gz',
										't10k-images-idx3-ubyte.gz', 
										'train-images-idx3-ubyte.gz', 
										'train-labels-idx1-ubyte.gz'
									]
							},
						]
					]
				},
				fontSize: 16,				
			},
			{
				text:'\n'
			},
			{
				text:[
						'This code main purpose is to demo that Tensorflow can successfully run in the image and train a simple model.\n\n' ,
						'This example takes a MNIST dataset as an input. Tensorboard and command line logs are generated as output. Command line output shows a cost function values during training. Tensorboard logs are saved to a specified folder.\n'
				],
				fontSize: 18,
				alignment: 'justify'
			},
			{
				text:'\n'
			},
			{
				text:'Parameters specification:\n',
				fontSize: 18,
			},
			{
				image: tensorflow,
				width: 500,
				pageBreak: 'after'
			},
			{
				table: {
					widths: [150, 350],
					body: [
						['Parameters ', 'Description'],
						[
							'mnist',
						    'location of dataset files specified here. Currently it is set to “/tmp/data”, can be changed. If there is no dataset in specified folder it will be downloaded automatically.'
						],
						[
							'learning_rate',
							'initial learning rate'
						],
						[
							'training_epochs',
							' number of epoch. One epoch is finished when all images from dataset were feed to network once.'
						],
						[
							'batch_size',
							'number of images to feed to network each time.'
						],
						[
							'display_step',
							'how often display progress'
						],
						[
							'logs_path',
							'path where Tensorboard logs will be saved.'
						]
					]
				},
				fontSize: 14,	
				alignment: 'justify',
				pageBreak: 'after'			
			},
		],
		footer: 
			function(currentPage, pageCount) { 
				return (
					currentPage!==1 ?
					{ 
						stack: [ 
							{text:currentPage , alignment: 'center', fontSize:10},
							{text:'© 2017 Industrial Technology Research Institute.                                                                          BackToGuideline', alignment: 'right', fontSize:8 ,linkToPage: 2, margin: 2},
							// {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
							{image: header,	width: 600, alignment: 'center'}
						],						
					} :
					{ 
						stack: [ 
							// {text:'\n' , alignment: 'center', fontSize:10},
							{text:'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n' , alignment: 'center', fontSize:1},
							// {text:'© 2017 Industrial Technology Research Institute.                                                                          BackToGuideline', alignment: 'right', fontSize:8 ,linkToPage: 2, margin: 2},
							// {text:'BackToGuideline', alignment: 'right',fontSize:8, linkToPage: 2, margin: 2,},
							{image: header,	height:15, width: 600, alignment: 'center'}
						],						
					}
				) 
			},
		header:
			function(currentPage, pageCount) { 
				return (
					{
						image: header,
						width: 600,						
						alignment: 'center',
					}
				)
			},
		styles: {
			title: {
				fontSize: 30,
				bold: true,
				alignment: 'center'
			},
			outline: {
				fontSize: 24,
				margin: [0, 15],
			},
				tableExample: {
				margin: [0, 5, 0, 15],
				alignment: 'center'
			},
		}
	}
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;
	const genPDF = pdfMake.createPdf(docDefinition)

	genPDF.getDataUrl((dataUrl) => {
		let a = window.open("about:blank", "Tutorial");
		let html = '<html>' +
		'<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
	    '<body>' + 
	    '<iframe class="preview-pane" src="'+dataUrl+'"'+'type="application/pdf" width="100%" height="650" frameborder="0" style="position:relative;z-index:999"></iframe>' +
	    '</body></html>';
	    a.document.write(html)
		a.document.close();
	})

	// a.document.write(html);	
	
	// _pdf.addHTML(a.document.body,function() {
	// 	const string = pdf.output('datauristring');
	// 	$('.preview-pane').attr('src', string);
	// })

	
	// const docDefinition = { content: 'This is an sample PDF printed with pdfMake' }
	// const {vfs} = vfsFonts.pdfMake;
	// pdfMake.vfs = vfs;
	// pdfMake.createPdf(docDefinition).open({}, window.open("about:blank", "Tutorial"))
}

// export const uriPDF = open_data_uri_window(pdf.output('datauristring'))

// function open_data_uri_window(url) {
//    // url = encodeURIComponent(url)
//    // let url_with_name = url.replace("data:application/pdf;", "data:application/pdf;name=myname.pdf;base64,BASE64_DATA_EN‌​CODED")
//    // url_with_name = convertDataURIToBinary(url_with_name)
//    let html = '<html>' +
//     '<style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style>' +
//     '<body>' +
//     '<p>new viewer</p>' +
//     '<iframe class="preview-pane" type="application/pdf" width="100%" height="650" frameborder="0" style="position:relative;z-index:999"></iframe>'
//     // '<iframe type="application/pdf" src="' + url_with_name + '"></iframe>' +
//     '</body></html>';
//     let _pdf = new pdfConverter('p','pt','a4');
//     const a = window.open("about:blank", "Zupfnoter");
//     a.document.write(html);
// 	_pdf.addHTML(a.document.body,function() {
// 		const string = url;
// 		$('.preview-pane').attr('src', string);
// 	})    
    
//     a.document.close();
// }

// const BASE64_MARKER = ';base64,'

// function convertDataURIToBinary(dataURI) {
//   const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
//   const base64 = dataURI.substring(base64Index);
//   const raw = window.atob(base64);
//   const rawLength = raw.length;
//   const array = new Uint8Array(new ArrayBuffer(rawLength));

//   for(i = 0; i < rawLength; i++) {
//     array[i] = raw.charCodeAt(i);
//   }
//   return array;
// }