# Technical Challenge

## DOM manipulation and layout

Gradiweb - [Technical challenge] (https://docs.google.com/presentation/d/1faxn_x_dr3WpUAVl-0v2hwOaPCj-zHN3W5evtL7ymZY/edit#slide=id.ge9c4a76015_2_0)

![screenshot project](https://github.com/dilopezj/Gradiweb/blob/master/src/assets/pantalla01.png)


## Building and Running Open
 
   1. Clone the source code

          git clone https://github.com/nasa/openmct.git

   2. Install development dependencies. Note: Check the package.json.

          `npm install`

   3. Run a local development server

           `npm start`

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   
   
   ### :warning: Important :warning:

   The following steps are required:

   1) Install a text editor (Visual Studio Code preferably)
   2) Install Node.JS (it is an application to execute Javascript)
   3) Install React.JS


## Data in LocalStorage

Local storage enables to store and retrieve data in the browser.

[localStorage] (https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)


## Encrypt Method 

           `npm i crypto-js`

This section has moved here: [https://timetoprogram.com/encrypt-and-decrypt-text-react/]

In the project it is not necessary to execute the installation command since it is added in package.json.

  1. The library is imported
    
          import CryptoJS from "crypto-js";

   2. A keepass is assigned to encrypt or decrypt 
   
           const secretPass = "XkhZG4fW2t2W";
           const [encrptedData, setEncrptedData] = useState("");
    
   3. The function to encrypt the data is 
   
            const encryptData = () => {
              const data = CryptoJS.AES.encrypt(
                  JSON.stringify(text),
                  secretPass
                ).toString();
                setEncrptedData(data); 
            };

   4. to call the function

            encryptData();

     
## Used Technology

  * ReactJS
  * Html5
  * Css3
  * bootstrap
  * crypto-js
