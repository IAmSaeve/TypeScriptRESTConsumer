import axios, { AxiosError } from "../../node_modules/axios/index";

const customerList: HTMLUListElement = document.getElementById("customerList") as HTMLUListElement;

const getbtn: HTMLButtonElement = document.getElementById("getAllButton") as HTMLButtonElement;
const postbtn: HTMLButtonElement = document.getElementById("postCustomer") as HTMLButtonElement;

const endpointInput: HTMLInputElement = document.getElementById("endpoint") as HTMLInputElement;
const idInput: HTMLInputElement = document.getElementById("customerId") as HTMLInputElement;
const firstNameInput: HTMLInputElement = document.getElementById("customerFirstName") as HTMLInputElement;
const lastNameInput: HTMLInputElement = document.getElementById("customerLastName") as HTMLInputElement;
const yearInput: HTMLInputElement = document.getElementById("customerYear") as HTMLInputElement;

const uri: string = endpointInput.value;

getbtn.addEventListener("click", ShowAllCustomers);
postbtn.addEventListener("click", PostCustomer);

function ShowAllCustomers() {
    axios.get<ICustomer[]>(uri)
        .then((response) => {
            console.log(response);
            response.data.forEach((c) => {
                if (c != null) {
                    const node = document.createElement("li");

                    node.appendChild(document.createTextNode(
                        `ID: ${c.id}, Model: ${c.fistName}, Vendor: ${c.lastName}, Price: ${c.year}`));
                    customerList.appendChild(node);
                } else {
                    console.log("Caught null element");
                }

            });
        })
        .catch((error: AxiosError) => {
            console.error(error);
        });
}

function PostCustomer() {
    // const data = { model: modelInput.value, vendor: vendorInput.value, price: +priceInput.value };
    const data = {
        id: idInput.value,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        year: yearInput.value,
    };

    axios.post(uri, data)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
}

interface ICustomer {
    id: number;
    fistName: string;
    lastName: string;
    year: number;
}
