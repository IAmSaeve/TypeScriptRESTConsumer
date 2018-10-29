// Import
import axios, { } from "../../node_modules/axios/index";

// Variables
const customerTable: HTMLTableElement = document.getElementById("customerTable") as HTMLTableElement;

const getbtn: HTMLButtonElement = document.getElementById("getAllButton") as HTMLButtonElement;
const postbtn: HTMLButtonElement = document.getElementById("postCustomer") as HTMLButtonElement;
const putbtn: HTMLButtonElement = document.getElementById("putCustomer") as HTMLButtonElement;
const deletebtn: HTMLButtonElement = document.getElementById("deleteCustomer") as HTMLButtonElement;
const addURIbtn: HTMLButtonElement = document.getElementById("addURI") as HTMLButtonElement;
const getOnebtn: HTMLButtonElement = document.getElementById("getACustomer") as HTMLButtonElement;

const endpoint: HTMLSelectElement = document.getElementById("server") as HTMLSelectElement;
const customURI: HTMLInputElement = document.getElementById("cURI") as HTMLInputElement;

const getIdInput: HTMLInputElement = document.getElementById("customerId") as HTMLInputElement;
const firstNameInput: HTMLInputElement = document.getElementById("customerFirstName") as HTMLInputElement;
const lastNameInput: HTMLInputElement = document.getElementById("customerLastName") as HTMLInputElement;
const yearInput: HTMLInputElement = document.getElementById("customerYear") as HTMLInputElement;

const putIdInput: HTMLInputElement = document.getElementById("putId") as HTMLInputElement;
const putFirstNameInput: HTMLInputElement = document.getElementById("putCustomerFirstName") as HTMLInputElement;
const putLastNameInput: HTMLInputElement = document.getElementById("putCustomerLastName") as HTMLInputElement;
const putYearInput: HTMLInputElement = document.getElementById("putCustomerYear") as HTMLInputElement;

const deleteIdInput: HTMLInputElement = document.getElementById("deleteId") as HTMLInputElement;

// URL to server
let uri: string = endpoint.value;

// Event listeners
getbtn.addEventListener("click", ShowAllCustomers);
getOnebtn.addEventListener("click", ShowACustomer);
postbtn.addEventListener("click", PostCustomer);
putbtn.addEventListener("click", PutCustomer);
deletebtn.addEventListener("click", DeleteCustomer);
addURIbtn.addEventListener("click", AddURI);

endpoint.addEventListener("change", UpdateURL);

function ShowAllCustomers() {
    axios.get<ICustomer[]>(uri)
        .then((response) => {
            // Clears list on button press
            customerTable.innerHTML = "";

            // Loop data in array and add to HTML table
            response.data.forEach((c: ICustomer) => {
                const row = customerTable.insertRow();

                const ID = row.insertCell();
                const FIRSTNAME = row.insertCell();
                const LASTNAME = row.insertCell();
                const YEAR = row.insertCell();

                ID.innerText = c.id.toString();
                FIRSTNAME.innerText = c.firstName.toString();
                LASTNAME.innerText = c.lastName.toString();
                YEAR.innerText = c.year.toString();
            });
        });
}

function ShowACustomer() {
    axios.get<ICustomer>(uri + getIdInput.valueAsNumber)
        .then((response) => {
            // Clears list on button press
            customerTable.innerHTML = "";

            // Loop data in array and add to HTML table
            const c: ICustomer = response.data;
            const row = customerTable.insertRow();

            const ID = row.insertCell();
            const FIRSTNAME = row.insertCell();
            const LASTNAME = row.insertCell();
            const YEAR = row.insertCell();

            ID.innerText = c.id.toString();
            FIRSTNAME.innerText = c.firstName.toString();
            LASTNAME.innerText = c.lastName.toString();
            YEAR.innerText = c.year.toString();
        });
}

function PostCustomer() {
    // Construct data to send
    const data: ICustomer = {
        id: null,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        year: yearInput.valueAsNumber,
    };

    // Send data
    axios.post(uri, data);

    // Clear input fields
    firstNameInput.value = "";
    lastNameInput.value = "";
    yearInput.value = "";
}

function PutCustomer() {
    // Construct data to send
    const data: ICustomer = {
        id: putIdInput.valueAsNumber,
        firstName: putFirstNameInput.value,
        lastName: putLastNameInput.value,
        year: putYearInput.valueAsNumber,
    };

    // Send data
    axios.put(uri + putIdInput.value, data);

    // Clear input fields
    putIdInput.value = "";
    putFirstNameInput.value = "";
    putLastNameInput.value = "";
    putYearInput.value = "";
}

function DeleteCustomer() {
    // Send data
    axios.delete(uri + deleteIdInput.value);

    // Clear input field
    deleteIdInput.value = "";
}

// Function to update URI
function UpdateURL() {
    uri = endpoint.value;
    if ((uri.lastIndexOf("/") + 1) !== uri.length) {
        uri += "/";
    }
}

function AddURI() {
    let counter = 1;
    const node = document.createElement("option");
    node.value = customURI.value;
    node.text = "Custom URI " + counter++;
    endpoint.appendChild(node);

    customURI.value = "";
}

// Customer interface
interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    year: number;
}
