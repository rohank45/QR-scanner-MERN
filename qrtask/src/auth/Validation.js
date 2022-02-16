//validation
const history = useHistory();
const [loader, setLoader] = useState(false);
const [errors, setErrors] = useState({
  biller_name: null,
  billie_name: null,
  gst_number: null,
  biller_address: null,
  billie_address: null,
  gst_no: null,
});

const validate = () => {
  return new Promise(async (resolve, reject) => {
    let errors = {
      biller_name: null,
      billie_name: null,
      email: null,
      gst_number: null,
      biller_address: null,
      billie_address: null,
      gst_no: null,
    };

    let bool = true;

    if (!invoice.biller_name) {
      errors.biller_name = `Name is required`;
      bool = false;
    }
    if (!invoice.billie_name) {
      errors.billie_name = `Name is required`;
      bool = false;
    }

    if (!invoice.biller_address) {
      errors.biller_address = `address is required`;
      bool = false;
    }

    if (!invoice.billie_address) {
      errors.billie_address = `address  is required`;
      bool = false;
    }

    if (invoice.gst_no) {
      if (!isGstNoValid(invoice.gst_no)) {
        errors.gst_no = "Invalid gst number!";
        bool = false;
      }
    }
    if (invoice.gst_number) {
      if (!isGstNoValid(invoice.gst_number)) {
        errors.gst_number = "Invalid gst number!";
        bool = false;
      }
    }

    setErrors(errors);
    resolve(bool);
  });
};

const Error = ({ error }) => {
  return error && <span className="text-red-500">{error}</span>;
};

const handleChange = async (e) => {
  e.preventDefault();

  validate().then((isValid) => {
    setLoader(true);
    setInputDisable(true);

    if (isValid === true) {
      //create form
      createInvoice({
        biller_name: invoice.biller_name,
        gst_number: invoice.gst_number,
        billie_company_name: invoice.billie_name,
        gst_no: invoice.gst_no,
        pan_no: invoice.pan_no,
        biller_address: invoice.biller_address,
        billie_company_address: invoice.billie_address,
      })
        .then((res) => {
          console.log("invoice data saved", res.data);
          message.success("invoice data saved");
          setInputDisable(false);
          setLoader(false);
          history.push("/app/invoiceform");
        })
        .catch((err) => {
          console.log("invoice create error", err);
          setLoader(false);
          setInputDisable(false);
        });

      //edit invoice form
      editInvoice(id, {
        biller_name: invoice.biller_name,
        gst_number: invoice.gst_number,
        billie_company_name: invoice.billie_name,
        gst_no: invoice.gst_no,
        pan_no: invoice.pan_no,
        biller_address: invoice.biller_address,
        billie_company_address: invoice.billie_address,
      })
        .then((res) => {
          console.log("invoice data edited", res.data);
          message.success("invoice data edited");
          setInputDisable(false);
          setLoader(false);
          history.push("/app/invoice");
        })
        .catch((err) => {
          console.log("invoice edit error", err);
          setInputDisable(false);
          setLoader(false);
        });
    }
    setLoader(false);
    setInputDisable(false);
  });
};
