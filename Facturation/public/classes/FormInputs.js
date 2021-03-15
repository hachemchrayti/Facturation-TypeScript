import { Data } from "../classes/Data.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    constructor() {
        this.form = document.getElementById("form");
        this.type = document.getElementById("type");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.quantity = document.getElementById("quantity");
        this.price = document.getElementById("price");
        this.tva = document.getElementById("tva");
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.storedElements = document.getElementById('stored-data');
        this.btnPrint = document.getElementById('print');
        this.btnReload = document.getElementById('reload');
        this.btnStoredInvoices = document.getElementById('stored-invoices');
        this.btnStoredEstimates = document.getElementById('stored-estimates');
        //call Listener
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.deleteListener(this.btnReload);
        this.getStoredDocsListener();
    }
    //Listeners
    submitFormListener() {
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    printListener(btn, div) {
        btn.addEventListener('click', (e) => {
            let availableDoc;
            availableDoc = new Print(this.docContainer);
            availableDoc.print();
        });
    }
    deleteListener(btn) {
        btn.addEventListener('click', (e) => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    getStoredDocsListener() {
        this.btnStoredInvoices.addEventListener('click', this.getItems.bind(this, 'invoice'));
        this.btnStoredEstimates.addEventListener('click', this.getItems.bind(this, 'estimate'));
    }
    getItems(docType) {
        if (this.storedElements.hasChildNodes()) {
            this.storedElements.innerHTML = "";
        }
        if (localStorage.getItem(docType)) {
            let array;
            array = localStorage.getItem(docType);
            if (array !== null && array.length > 2) {
                let arrayData;
                arrayData = JSON.parse(array);
                arrayData.map((doc) => {
                    let card = document.createElement('div');
                    let cardBody = document.createElement('div');
                    let cardClasses = ['card', 'mt-5'];
                    let cardBodyClasses = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(...cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedElements.append(card);
                });
            }
            else {
                this.storedElements.innerHTML = '<div class="p-5">Aucune data disponible !</div>';
            }
        }
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputDatas();
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);
            let docData;
            let date = new Date();
            docData = new Data(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, type);
        }
    }
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const quantity = this.quantity.valueAsNumber;
        const price = this.price.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("Les valeurs numériques doivent etre > 0 !");
            return;
        }
    }
}
