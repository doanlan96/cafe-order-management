function addStyles(win, styles) {
    styles.forEach((style) => {
      let link = win.document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", style);
      win.document.getElementsByTagName("head")[0].appendChild(link);
    });
  }
  
  const VueHtmlToPaperr = {
    install(app, options = {}) {
      app.config.globalProperties.$htmlToPaperr = (
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
              .reportContainer {
                display: flex;
                margin: 1rem;
                align-items: center;
            }
            
            section {
                height: 100%;
                display: flex;
                flex: 1;
                flex-direction: column;
            }
            
            .right {
                align-items: flex-end;
                padding-right: 5rem;
            }
            
            .r-place {
                display: flex;
                padding: 1rem;
                width: 40%;
                justify-content: space-around;
            }
            
            .place {
                display: inline;
                padding: 1rem 1rem 0 1rem;
                /* color: #44d574; */
                height: auto;
                position: relative;
                background: #ffffff;
                width: auto;
                /* border-bottom: 2px solid #0004ff; */
            }
            
            .place1 {
                display: inline;
                padding: 1rem 1rem 0 1rem;
                color: #44d574;
                height: auto;
                position: relative;
                width: auto;
                background: #ffffff;
                border-bottom: 3px solid #44d574;    
            }
            
            /* .place:first-child:before {
                content: "";
                position: absolute;
                top: 20px;
                right: 10px;
                bottom: 0;
                width: 75%;
                border-bottom: 3px solid #44d574;
                /* left: 25px; */
                /* height: 15px;
            
            } */
            
            /* .place:first-child {
                display: inline;
                padding: 1rem 1rem 0 1rem;
                color: #44d574;
                height: auto;
                position: relative;
                background: #ffffff;
            } */
            
            .place:hover {
                cursor: pointer;
                color: #44d574;
            }
            
            /* .place:last-child {
                display: inline;
            }  */
            
            .r-title {
                display: inline;
                font-size: 26px;
                font-family: Trebuchet MS, sans-serif;
                font-weight: 600;
            }
            
            .statistic {
                display: flex;
                flex-direction: column;
            }
            
            .r-stat {
                display: inline;
            }
            
            /* section right */
            .r-display {
                display: flex;
                width: 100%;
                justify-content: space-around;
            }
            
            .date {
                display: flex;
                flex-direction: row;
                align-items: center;
                /* width: 50%; */
                justify-content: space-evenly;
                padding: 1rem 5rem;
            }
            
            .r-date {
                display: flex;
                align-items: center;
                border: 1.5px solid black;
                border-radius: 5px;
            }
            
            .r-date:hover {
                cursor: pointer;
                color: #44d574;
            }
            
            .date p{
                display: inline;
                margin: 0;
                padding: 0.5rem 1rem;
                font-size: 17px;
            }
            
            .calenIcon {
                padding: 0.5rem;
            }
            
            .r-function {
                display: flex;
                width: 100%;
                justify-content: flex-end;
                padding: 0.5rem 5rem;
            }
            
            .function {
                display: flex;
                align-items: center;
                padding: 0 0.5rem;
                margin: 0 1rem;
                border: 1px solid black;
                border-radius: 5px;
            }
            
            .function:hover {
                cursor: pointer;
                color: #44d574;
            }
            
            .function p {
                display: inline;
                margin: 0;
                font-size: 14px;
                font-style: italic;
                font-weight: 600;
                /* padding: 0 0.5rem;   */
            }
            
            .fIcon {
                padding: 1rem 0.3rem;
            }
            
                /*      table       */
            .tableContainer {
                display: table;
                width: 100%;
                padding: 0 1rem;
            }
            
            .table {
                display: flex;
                flex-direction: column;
            }
            
            .thead {
                display: grid;
                grid-template-columns: [first] 150px [line2] 180px [line3] 180px [line4] 230px [line5] 230px [line6] auto [end];
                background: #d5e9e9;
                justify-items: center;
                padding: 0.5rem 0;
                align-items: center;
            }
            
            .th {
                /* background-color: #44d574; */
               
            }  
            
            .sortIcon {
                padding: 0 0.5rem;
                cursor: pointer;
            } 
            
            .row {
                display: grid;
                grid-template-columns: [first] 150px [line2] 180px [line3] 180px [line4] 230px [line5] 230px [line6] auto [end];
                justify-items: center;
                align-items: center;
                margin: 0;
            }
            
            .td {
                display: inline-grid;
                padding: 0.5rem 0.7rem 0.5rem 0;
                justify-content: space-around;
            }
            
            .td:nth-child(4n) {
                padding-left: 1rem;
            }
            
                    /*       PageNum         */
            .pageContainer {
                display: inline-flex;
                padding-right: 3rem;
                width: 100%;
                justify-content: flex-end;
                align-items: center;
                height: 40px;
            }
            
            .pageNum {
                display: inline;
                padding: 0.8rem;
                cursor: pointer;
            }
            
            .pageNum:hover {
                color: #44d574;
                font-size: 22px;
                font-weight: 600;
            }
            
            .arrow {
                padding: 0.5rem;
                cursor: pointer;
            }
            
            .arrow:hover {
                color: #44d574;
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
  
  export default VueHtmlToPaperr;
  