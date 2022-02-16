import easyinvoice from "easyinvoice";
import fs from "fs";

//generate pdf
let data = {
  documentTitle: "RECEIPT",
  currency: "INR",
  taxNotation: "GST",
  marginTop: 25,
  marginRight: 25,
  marginLeft: 25,
  marginBottom: 25,
  sender: {
    company: "Buy Me A Gradient",
    address: "Mumbai, Maharashtra, India.",
    zip: "40000",
    city: "Mumbai",
    country: "India",
  },
  client: {
    company: "Jupiter Serv",
    address: "Malad, Mumbai",
    zip: "400064",
    city: "Mumbai",
    country: "India",
  },
  invoiceNumber: "2020.0001",
  invoiceDate: "15-02-2022",
  products: [
    {
      quantity: "1",
      description: "Web Development",
      tax: 18,
      price: 10000,
    },
  ],
  bottomNotice: "Kindly pay your invoice within 15 days.",
};

const invoicePdf = async () => {
  let invoice = await easyinvoice.createInvoice(data);
  fs.writeFileSync(`invoice${Date.now()}.pdf`, invoice.pdf, "base64");

  easyinvoice.createInvoice(data, function (result) {
    easyinvoice.download('myInvoice.pdf', invoice.pdf);
  });
};
invoicePdf();