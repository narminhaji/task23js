
const tbody = document.querySelector("table tbody");
const addBtn = document.querySelector(".btn");
let allowNewRow = true;

const orderRow = () => {
    const rows = tbody.querySelectorAll("tr");
    rows.forEach((row, key) => row.querySelector("td").textContent = key + 1);
};

function saveData(e) {
    let updateable = e.target.classList.contains("update-btn");
    if (updateable) {
        if (!allowNewRow) {
            alert("ERROR BOŞ XANA!!!!!");
            return;
        }
        const dataTd = e.target.parentElement.parentElement.querySelectorAll("td");
        const nameInput = `<input type="text" placeholder="Ad" value="${dataTd[1].textContent}"></input>`;
        const surnameInput = `<input type="text" placeholder="Soyad" value="${dataTd[2].textContent}"></input>`;
        const ageInput = `<input type="number" placeholder="Yaş" value="${dataTd[3].textContent}"></input>`;
        dataTd[1].innerHTML = nameInput;
        dataTd[2].innerHTML = surnameInput;
        dataTd[3].innerHTML = ageInput;
    }
    else {
        const inputs = [...tbody.querySelectorAll("input")];
        if (inputs.some(input => !input.value.trim())) {
            alert("Xanaları doldurun pls...");
            return;
        }
        inputs.forEach(input => input.parentElement.textContent = input.value);
    }

    e.target.textContent = updateable ? "Yadda saxla" : "Düzəliş et";
    e.target.classList.toggle("qeyd");
    e.target.classList.toggle("update-btn");
    e.target.nextElementSibling.classList.toggle("cix");
    e.target.nextElementSibling.classList.toggle("sil");
    allowNewRow = !updateable;
};

addBtn.addEventListener("click", () => {
    if (!allowNewRow) {
        alert("ERROR BOŞ XANA !!!!!");
        return;
    }

    const row = `
        <tr>
            <td></td>
            <td><input type="text" placeholder="Ad"></input></td>
            <td><input type="text" placeholder="Soyad"></input></td>
            <td><input type="number" placeholder="Yaş"></input></td>
            <td>
                <button class="qeyd" onclick="saveData(event)">Yadda saxla</button>
                <button class="cix" onclick="deleteData(event)">Sil</button>
            </td>
        </tr>`;
    tbody.innerHTML += row;
    orderRow();
    allowNewRow = false;
});

function deleteData(e) {
    const rowToDelete = e.target.parentElement.parentElement;
    tbody.removeChild(rowToDelete);
    orderRow();
    if (e.target.classList.contains("cix") || !tbody.firstChild) {
        allowNewRow = true;
    }
}
