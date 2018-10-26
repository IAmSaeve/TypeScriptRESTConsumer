// Import
import axios, { } from "../../node_modules/axios/index";

// Variables
const customerList: HTMLUListElement = document.getElementById("customerList") as HTMLUListElement;

const getbtn: HTMLButtonElement = document.getElementById("getAllButton") as HTMLButtonElement;
const postbtn: HTMLButtonElement = document.getElementById("postCustomer") as HTMLButtonElement;
const putbtn: HTMLButtonElement = document.getElementById("putCustomer") as HTMLButtonElement;
const deletebtn: HTMLButtonElement = document.getElementById("deleteCustomer") as HTMLButtonElement;

// TODO: Implement option to choose a server from browser
const endpointInput: HTMLInputElement = document.getElementById("server") as HTMLInputElement;
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
const uri: string = "https://restcustomerservice20181007065419.azurewebsites.net/api/Customers/";

// Event listeners
getbtn.addEventListener("click", ShowAllCustomers);
postbtn.addEventListener("click", PostCustomer);
putbtn.addEventListener("click", PutCustomer);
deletebtn.addEventListener("click", DeleteCustomer);

function ShowAllCustomers() {
    axios.get<ICustomer[]>(uri)
        .then((response) => {
            // Clears list on button press
            customerList.innerHTML = "";

            // Loop data in array and add to HTML list
            response.data.forEach((c: ICustomer) => {
                const node = document.createElement("li");

                node.appendChild(document.createTextNode(
                    `ID: ${c.id}, First name: ${c.firstName}, Last name: ${c.lastName}, Year: ${c.year}`));
                customerList.appendChild(node);
            });
        });
}

function PostCustomer() {
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

// Customer interface
interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    year: number;
}
