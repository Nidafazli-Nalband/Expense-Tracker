let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const list = document.getElementById("list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

const ctx = document.getElementById("chart");

let chart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ["#6366f1","#22d3ee","#22c55e","#f59e0b","#ef4444"]
    }]
  }
});

function update() {
  list.innerHTML = "";
  let total = 0;
  let categories = {};

  expenses.forEach((e, i) => {
    total += e.amount;
    categories[e.category] = (categories[e.category] || 0) + e.amount;

    list.innerHTML += `
      <tr>
        <td>${e.title}</td>
        <td>${e.category}</td>
        <td>₹${e.amount}</td>
        <td><button class="delete" onclick="remove(${i})">✕</button></td>
      </tr>
    `;
  });

  incomeEl.textContent = "₹0";
  expenseEl.textContent = "₹" + total;
  balanceEl.textContent = "₹" + (-total);

  chart.data.labels = Object.keys(categories);
  chart.data.datasets[0].data = Object.values(categories);
  chart.update();

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = +document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!title || amount <= 0) return;

  expenses.push({ title, amount, category });

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  update();
}

function remove(index) {
  expenses.splice(index, 1);
  update();
}

update();
