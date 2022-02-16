// import { getS3Object } from '../helpers/s3_upload';
const PDFDocument = require('pdfkit');
const fs = require('fs');

const invoice = {
	shipping: {
		name: 'WORLDEMP INDIA PRIVATE LIMITED',
		address: '#501, LEVEL 5, | PENTAGON, TOWER - P2',
		city: 'MAGARPATTA CITY | HADASPAR | PUNE',
		inv_no: 'MS/ 210257',
		inv_dt: '07/02/2022',
		reference: "",
		due_date: "07/02/2022",
		gst_no: "27AABCW5877H1ZU",
		state: "27",
		place_of_supply: "MAHARASHTRA - (27)",
	},
	items: [
		{
			sr_no: 1,
			tableDescription: 'TOWARDS COST OF FIXING STRIP LIGHT',  
			tablDescriptionAddress: 'AT PUNE MARGARPATTA OFFICE',          
			tableDescriptionAmount: 'TOTAL INR 17020/- ',
			tableDescriptionRef: 'Reference : MS21MS21025',
			tableAmount: "17020.00",
		}
	],
	subtotal: 25000,
	paid: 0,
	invoice_nr: 1234,
};

async function generateInvoicePdf() {
	let doc = new PDFDocument({ margin: 50, size: 'A4' });

	// generate Header
    doc.fillColor('#910303')
		.fontSize(10)
		.font("Helvetica-Bold")
		.text('JUPITER INTEGRATED SERVICES PVT.LTD.', 200, 50, { align: 'right' })
        .fontSize(8)
		.font("Helvetica")
		.text('A-204, SHERATON CLASSIC CHS, DR. CHARAT SINGH COLONY, CHAKALA,', 200, 65, { align: 'right' })
		.text('ANDHERI (E), MUMBAI. 400-093.', 200, 75, { align: 'right' })
		.text('Tel : 91-022-42847000', 200, 85, { align: 'right' })
		.text('Email : leena@jupiterdmc.com', 200, 95, { align: 'right' })
		.text('C I N : U63040MH2008PTC179781  P A N : AABCJ9905H', 200, 105, { align: 'right' })
		.text('GSTIN : 27AABCJ9905H1ZE (MAHARASHTRA)', 200, 115, { align: 'right' })
		.fillColor('#444444')
		.fontSize(12)
		.font("Helvetica-Bold")
		.text('Tax Invoice', 0, 135, { align: 'center' })
		.fontSize(10)
		.fillColor('#bd52de')
		.text('Original For Recipient', 50, 135, { align: 'left' })
		.moveDown();

	// generate Customer Information
    const shipping = invoice.shipping;
	doc.fontSize(8)
		.fillColor('#020fa1')
		.font("Times-Roman")
        .text(`: ${shipping.name}`, 80, 155, { align: 'left', lineBreak: true, width: 300 })
		.text(`: ${shipping.address}`, 80, 170, { align: 'left', lineBreak: true, width: 200 })
		.text(`: ${shipping.city}`, 80, 185,{ align: 'left', lineBreak: true, width: 200 })
		.text(`${shipping.inv_no}`, 160, 165,{ align: 'center' })
		.text(`${shipping.inv_dt}`, 50, 165,{ align: 'right' })
		.text(`${shipping.reference}`, 170, 185,{ align: 'center' })
		.text(`${shipping.due_date}`, 50, 185,{ align: 'right' })
		.text(`${shipping.gst_no}`, 92, 200,{ align: 'left' })
		.text(`${shipping.state}`, 228, 200,{ align: 'left' })
		.text(`${shipping.place_of_supply}`, 328, 200,{ align: 'left', lineBreak: true, width: 250 })
		.fillColor('#444444')
		.font("Helvetica-Bold")
		.text(`Inv. No. :`, 80, 165, { align: 'center' })
		.text(`Inv. Dt. :`, 470, 165, { align: 'left' })
		.text(`Reference :`, 72, 185, { align: 'center' })
		.text(`Due Date :`, 461, 185, { align: 'left' })
		.text(`GSTIN :`, 60, 200, { align: 'left' })
		.text(`State :`, 200, 200, { align: 'left' })
		.text(`Place of Supply :`, 260, 200,{ align: 'left' })
		.text(`To M/s `, 50, 155, { align: 'left' })
		.text(`Narr. :`, 60, 220, { align: 'left' })
		.text(`Page : 1/1`, 50, 220, { align: 'right' })
        .moveDown();    

	// generate Table 
	let i,
		invoiceTableTop = 235;

		// table heading
		doc.rect(50, 230, 500, 20)
			.fillAndStroke("#e6e6e6", "#444444")
		doc.fontSize(10)
			.fillColor('#444444')
			.font("Helvetica-Bold")
			.text("sr", 54, 235, { align: 'left', width: 50 })
			.text('Narration / Description', 80, 235, { align: 'left', width: 400 })
			.text("Amount (INR)", 50, 235, { align: 'right'})

		// table content
		for (i = 0; i < invoice.items.length; i++) {
			const item = invoice.items[i];
			const position = invoiceTableTop + (i + 1) * 25;

			doc.fontSize(10)
			.fillColor('#444444')
			.font("Times-Roman")
			.text(item.sr_no, 56, position, { width: 50 })
			.text(item.tableDescription, 80, position, { lineBreak: true, width: 400 })
			.text(item.tablDescriptionAddress, 80, 270, position, { lineBreak: true, width: 400 })
			.text(item.tableDescriptionAmount, 80, 280, position, { lineBreak: true, width: 400 })
			.text(item.tableDescriptionRef, 80, 290, position, { lineBreak: true, width: 400 })
			.text(item.tableAmount, 50, position, { align: 'right' })
		}	

		// table total
		doc.rect(50, 545, 500, 15)
			.fillAndStroke("#bfe2e3", "#444444")
		doc.fontSize(10)
			.fillColor('#444444')
			.font("Helvetica")
			.text("Sub-Total", 407, 550, { align: 'right', width: 50 })
			.text("17,020.00", 50, 550, { align: 'right'})

		doc.fontSize(8)
			.fillColor('#020fa1')
			.font("Helvetica")
			.text("Add : Service Charges", 377, 565, { align: 'left' })
			.text("CGST @ 9.00% (1,715.58) SGST @ 9.005 (1,715.58)", 267, 580, { align: 'left'})
			.text("Rounding Off", 412, 595, { align: 'left' })
			.text("2,042.00", 50, 565, { align: 'right'})
			.text("3,431.16", 50, 580, { align: 'right'})
			.text("-0.16", 50, 595, { align: 'right'})

		// table footer
		doc.rect(50, 610, 500, 18)
			.fillAndStroke("#aae1e3", "#444444")
		doc.fontSize(10)
			.fillColor('#444444')
			.font("Helvetica-Bold")
			.text("INR Twenty Two Thousand Four Hundred Ninety Three Only", 55, 615, { align: 'left' })
			.text("22,493.00", 50, 615, { align: 'right'})

		// table out of footer
		doc.fontSize(8)
			.fillColor('#910303')
			.text("E. & O.E.", 50, 635, { align: 'left' })
			.font("Helvetica-Bold")
			.fontSize(10)
			.text("For JUPITER INTEGRATED SERVICES PVT.LTD.", 40, 635, { align: 'right' })

		// add coulmn divider line
		doc.fillColor('#444444')
			.moveTo(72, 230)
			.lineTo(72, 560)
			.stroke();

		doc.fillColor('#444444')
			.moveTo(470, 230)
			.lineTo(470, 628)
			.stroke();	

		//Bank Details
		doc.rect(50, 642, 50, 10)
			.fill("#f7e660")
		doc.fillColor('red')
		doc.fontSize(8)
			.font("Helvetica")
			.text("Bank Details ", 50, 645, { align: 'left', underline: true })
			.fontSize(8)
			.font("Times-Roman")
			.fillColor('#444444')
			.text("Bank Name : BANK OF BARODA", 50, 655, { align: 'left' })			
			.text(" | ", 260, 655, { align: 'left' })		
			.text("Bank Addr : CHAKALA MUMBAI 400093", 50, 665, { align: 'left' })
			.text(" | ", 260, 665, { align: 'left' })			
			.text("IFSC Code : BARB0CHAKAL", 50, 675, { align: 'left' })	
			.text(" | ", 260, 675, { align: 'left' })		
			.text("A/c. No. : 05880500000064", 50, 685, { align: 'left' })	
			.text(" | ", 260, 685, { align: 'left' })	

		//Terms & Conditions
		doc.fontSize(8)
			.fillColor('#910303')
			.font("Helvetica")
			.text("Terms & Conditions :", 50, 700, { align: 'left', underline: true })
			.fontSize(5)
			.font("Times-Roman")
			.fillColor('#444444')
			.text("CASH         : Payment to be made to the cashier & printed Official Receipt must be obtained.", 50, 710, { align: 'left' })			
			.text("CHEQUE       : All cheques / demand drafts in payment of bills must be crossed 'A/c Payee Only'", 50, 718, { align: 'left' })			
			.text("CHEQUE       : and drawn in favour of 'JUPITER INTEGRATED SERVICES PVT.LTD.'.", 50, 726, { align: 'left' })			
			.text("LATE PAYMENT : Interest @ 24% per annum will be charged on all outstanding bills after due date.", 50, 734, { align: 'left' })			
			.text("VERY IMP.    : Kindly check all details carefully to avoid un-necessary complications.", 50, 742, { align: 'left' })			

		// pdf footer
		doc.fontSize(8)
			.fillColor('#444444')
			.font("Helvetica-Bold")
			.text("Computer Generated Report. Requires No Signature.", 50, 752, { align: 'left' })

		// stamp img at pdf bottom
		// save img file into root directory if want to add
		try {
			let filePath = await getS3Object("img/media_1644997209985_original.png")
			console.log("filePath",filePath);

			if (filePath && filePath.Body && filePath.Body instanceof Buffer) {
				doc.image(filePath.Body, 400, 710, { width: 150, height: 50 });
			}
		} catch (error) {
			console.log(error);
		}

	doc.pipe(fs.createWriteStream(`invoice${Date.now()}.pdf`));
    doc.end();
}

export {
  generateInvoicePdf
}
