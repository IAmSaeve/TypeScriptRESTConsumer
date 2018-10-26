// Import
import axios, { } from "../../node_modules/axios/index";

// Variables
const customerTable: HTMLTableElement = document.getElementById("customerTable") as HTMLTableElement;

const getbtn: HTMLButtonElement = document.getElementById("getAllButton") as HTMLButtonElement;
const postbtn: HTMLButtonElement = document.getElementById("postCustomer") as HTMLButtonElement;
const putbtn: HTMLButtonElement = document.getElementById("putCustomer") as HTMLButtonElement;
const deletebtn: HTMLButtonElement = document.getElementById("deleteCustomer") as HTMLButtonElement;

const endpoint: HTMLSelectElement = document.getElementById("server") as HTMLSelectElement;

const idInput: HTMLInputElement = document.getElementById("customerId") as HTMLInputElement;
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
endpoint.addEventListener("change", UpdateURL);
function UpdateURL() {
    uri = endpoint.value;
}

// Event listeners
getbtn.addEventListener("click", ShowAllCustomers);
postbtn.addEventListener("click", PostCustomer);
putbtn.addEventListener("click", PutCustomer);
deletebtn.addEventListener("click", DeleteCustomer);

function ShowAllCustomers() {
    axios.get<ICustomer[]>(uri)
        .then((response) => {
            CheckURL();
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

function PostCustomer() {
    CheckURL();
    // Construct data to send
    const data: ICustomer = {
        id: idInput.valueAsNumber,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        year: yearInput.valueAsNumber,
    };

    // Send data
    axios.post(uri, data);

    // Clear input fields
    idInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
    yearInput.value = "";
}

function PutCustomer() {
    CheckURL();
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
    CheckURL();
    // Send data
    axios.delete(uri + deleteIdInput.value);

    // Clear input field
    deleteIdInput.value = "";
}

// Function to check for, and, add / at end of URL.
function CheckURL() {
    if ((uri.lastIndexOf("/") + 1) !== uri.length) {
        uri += "/";
    }
}

// Customer interface
interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    year: number;
}
