let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!title || !amount) return alert("Fill all fields");

  expenses.push({ title, amount: Number(amount), category });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";

  render();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;
  const categories = {};

  expenses.forEach((e, i) => {
    total += e.amount;
    categories[e.category] = (categories[e.category] || 0) + e.amount;

    list.innerHTML += `
      <tr>
        <td>${e.title}</td>
        <td>₹${e.amount}</td>
        <td>${e.category}</td>
        <td><button class="delete" onclick="deleteExpense(${i})">X</button></td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = `₹${total}`;
  document.getElementById("count").innerText = expenses.length;

  drawChart(categories);
}

function drawChart(data) {
  const ctx = document.getElementById("chart");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#1abc9c",
          "#3498db",
          "#9b59b6",
          "#f1c40f",
          "#e74c3c"
        ]
      }]
    }
  });
}

render();
