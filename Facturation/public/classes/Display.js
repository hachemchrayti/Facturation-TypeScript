import { Storage } from './Storage.js';
export class Display {
    constructor(container, hiddenDiv, btnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.btnPrint = btnPrint;
        this.formContainer = document.getElementById('form-container');
    }
    render(docObject, docType) {
        const htmlString = docObject.htmlFormat();
        this.container.innerHTML = htmlString;
        new Storage(docType, htmlString);
        if (docType === 'invoice') {
            this.btnPrint.innerText = 'Imprimer la facture';
        }
        else {
            this.btnPrint.innerText = 'Imprimer le devis';
        }
        this.hiddenDiv.classList.remove('invisible');
        this.formContainer.innerHTML = "";
    }
}
