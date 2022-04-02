function addStyles(win, styles) {
    styles.forEach((style) => {
      let link = win.document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", style);
      win.document.getElementsByTagName("head")[0].appendChild(link);
    });
  }
  
  const VueHtmlToPaper = {
    install(app, options = {}) {
      app.config.globalProperties.$htmlToPaper = (
        el,
        localOptions,
        cb = () => true
      ) => {
        let defaultName = "_blank",
          defaultSpecs = ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
          defaultReplace = true,
          defaultStyles = [];
        let {
          name = defaultName,
          specs = defaultSpecs,
          replace = defaultReplace,
          styles = defaultStyles
        } = options;
  
        // If has localOptions
        // TODO: improve logic
        if (localOptions) {
          if (localOptions.name) name = localOptions.name;
          if (localOptions.specs) specs = localOptions.specs;
          if (localOptions.replace) replace = localOptions.replace;
          if (localOptions.styles) styles = localOptions.styles;
        }
  
        specs = !specs.length ? specs.join(",") : "";
  
        const element = window.document.getElementById(el);
  
        if (!element) {
          alert(`Element to print #${el} not found!`);
          return;
        }
  
        const url = "";
        const win = window.open(url, name, specs, replace);
  
        win.document.write(`
          <html>
            <head>
              <style>
                  h2, h4, p {
                    margin: 0;
                }
                
                .page {
                    background: #fff;
                    display: block;
                    margin: 3rem auto 3rem auto;
                    position: relative;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                }
                
                .page[size="A4"] {
                    width: 21cm;
                    height: 29.7cm;
                    overflow-x: hidden;
                }
                
                .top-section {
                    padding: 20px;
                    height: 115px;
                }
                
                .top-section h2 {
                    font-size: 42px;
                    margin-bottom: 10px;
                    font-weight: 400;
                }
                
                .top-section address {
                    width: 50%;
                    height: 100%;
                    float: left;
                }
                
                .top-section address {
                    max-width: 275px;
                }
                
                .billing-invoice {
                    padding: 20px;
                    margin-bottom: 15px;
                }
                
                .billing-invoice .title {
                    font-size: 24px;
                    font-weight: bold;
                    float: left;
                }
                
                .billing-invoice .des {
                    float: right;
                }
                
                .billing-invoice .code {
                    font-size: 18px;
                    text-align: right; 
                }
                
                .billing-invoice .date {
                    text-align: right; 
                    font-size: 12px;
                }
                
                .billing-detail {
                    padding: 20px;
                    margin-top: 40px;
                }
                
                .billing-detail .title {
                    font-weight: bold;
                    font-size: 22px;
                    margin-bottom: 7px;
                }
                
                .billing-detail .billed-sec {
                    width: 50%;
                    float: left;
                    font-size: 18px;
                    margin-bottom:25px;
                }
                
                .billing-detail .sub-title, 
                .billing-detail .emp-detail {
                    font-weight: 400;
                    font-size: 18px;
                    margin-bottom: 5px;
                }
                
                .billing-detail .seat-detail {
                    font-size: 18px;
                    max-width: 300px;
                }
                
                .invoice-table {
                    padding: 0 20px;
                }
                
                .invoice-table table tr:first-child {
                    color: #fff;
                    background-color: #616161;
                    text-align: center;
                }
                
                .invoice-table tr th:nth-child(5), 
                .invoice-table tr td:nth-child(5){
                    text-align: right;
                }
                
                .invoice-table table {
                    width: 100%;
                }
                
                .invoice-table table, th, td {
                    padding: 5px;
                }
                
                .invoice-table tr th {
                    font-weight: 200;
                    font-size: 18px;
                }
                
                .total, .final-total {
                    margin-bottom: -30px;
                    padding: 30px;
                }
                
                .total .title,
                .final-total .title {
                    font-size: 18px;
                    font-weight: bold;
                    float: left;
                }
                .final-total .title .charge {
                    font-weight: normal;
                }
                
                .total .money,
                .final-total .money,
                .final-total .des,
                .final-total .des .money-charge {
                    font-size: 18px;
                    text-align: right; 
                }
                
                
                .bottom-section {
                    margin-top: 100px;
                    text-align: center;
                    bottom: 0; 
                    left: 0;
                    right: 0;
                }
                        
              </style>
              <title>${window.document.title}</title>
            </head>
            <body>
              ${element.innerHTML}
            </body>
          </html>
        `);
  
        addStyles(win, styles);
  
        setTimeout(() => {
          win.document.close();
          win.focus();
          win.print();
          win.close();
          cb();
        }, 1000);
  
        return true;
      };
    }
  };
  
  export default VueHtmlToPaper;
  