let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transactionForm");
const list = document.getElementById("transactionList");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    const type =
        document.getElementById("type").value;

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveData();
    displayTransactions();

    form.reset();
});


function displayTransactions() {

    list.innerHTML = "";

    transactions.forEach(transaction => {

        const row = document.createElement("tr");

        const typeText =
            transaction.type === "income"
                ? "รายรับ"
                : "รายจ่าย";

        row.innerHTML = `
            <td>${transaction.description}</td>

            <td>${typeText}</td>

            <td>
                ฿${transaction.amount.toLocaleString()}
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteTransaction(${transaction.id})"
                >
                    ลบ
                </button>
            </td>
        `;

        list.appendChild(row);
    });

    updateSummary();
}


function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    const balance = income - expense;

    document.getElementById("income").textContent =
        `฿${income.toLocaleString()}`;

    document.getElementById("expense").textContent =
        `฿${expense.toLocaleString()}`;

    document.getElementById("balance").textContent =
        `฿${balance.toLocaleString()}`;
}


function deleteTransaction(id) {

    transactions =
        transactions.filter(transaction =>
            transaction.id !== id
        );

    saveData();
    displayTransactions();
}


function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


displayTransactions();
let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = slides.length - 1;
    }

    else {
        currentSlide = index;
    }


    slides.forEach(slide => {
        slide.classList.remove("active");
    });


    dots.forEach(dot => {
        dot.classList.remove("active");
    });


    slides[currentSlide].classList.add("active");

    dots[currentSlide].classList.add("active");
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function prevSlide() {
    showSlide(currentSlide - 1);
}


/* เปลี่ยนรูปทุก 4 วินาที */

setInterval(() => {
    nextSlide();
}, 4000);