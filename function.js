var P, R, N, pie, line;
var loan_amt_slider = document.getElementById("loan-amount");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("loan-period");

var int_rate_btn_1 = document.getElementById("interest-btn1");
var int_rate_btn_2 = document.getElementById("interest-btn2");
var int_rate_btn_3 = document.getElementById("interest-btn3");

// update loan amount
loan_amt_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-amt-text").innerText =
		"MYR " + parseInt(self.target.value).toLocaleString("en-US");
	P = parseFloat(self.target.value);
	displayDetails();
});

// update Rate of Interest
int_rate_slider.addEventListener("input", (self) => {
	document.querySelector("#interest-rate-text").innerText =
		self.target.value + "%";
	R = parseFloat(self.target.value);
	displayDetails();
});

int_rate_btn_1.addEventListener("click", (self) => {
	int_value = int_rate_btn_1.innerText
	document.querySelector("#interest-rate-text").innerText = int_value;
	R = parseFloat(int_value);
	displayDetails();
});

int_rate_btn_2.addEventListener("click", (self) => {
	int_value = int_rate_btn_2.innerText
	document.querySelector("#interest-rate-text").innerText = int_value;
	R = parseFloat(int_value);
	displayDetails();
});

int_rate_btn_3.addEventListener("click", (self) => {
	int_value = int_rate_btn_3.innerText
	document.querySelector("#interest-rate-text").innerText = int_value;
	R = parseFloat(int_value);
	displayDetails();
});

// update loan period
loan_period_slider.addEventListener("input", (self) => {
	document.querySelector("#loan-period-text").innerText =
		self.target.value + " years";
	N = parseFloat(self.target.value);
	displayDetails();
});

// calculate details
function displayDetails() {
	
	let r = parseFloat(R) / 100;
	let n = parseFloat(N) * 12;

	let num = parseFloat(P) * r * parseFloat(N);
	let emi = (parseFloat(P) + parseFloat(num)) / parseFloat(n);

	let opts = '{style: "decimal", currency: "MYR "}';

	document.querySelector("#cp").innerText =
		"MYR " + parseFloat(P).toFixed(2).toLocaleString("en-US", opts);

	document.querySelector("#ci").innerText =
		"MYR " + parseFloat(num).toFixed(2).toLocaleString("en-US", opts);

	document.querySelector("#ct").innerText =
		"MYR " + parseFloat(parseFloat(P) + parseFloat(num)).toFixed(2).toLocaleString(
			"en-US",
			opts
		);

	document.querySelector("#price").innerText =
		"MYR " + parseFloat(emi).toFixed(2).toLocaleString("en-US", opts);

	pie.data.datasets[0].data[0] = P;
	pie.data.datasets[0].data[1] = parseFloat(num);
	pie.update();
}

// Initialize everything
function initialize() {
	document.querySelector("#loan-amt-text").innerText =
	"MYR " + parseInt(loan_amt_slider.value).toLocaleString("en-US");
	P = parseFloat(document.getElementById("loan-amount").value);

	document.querySelector("#interest-rate-text").innerText =
		int_rate_slider.value + "%";
	R = parseFloat(document.getElementById("interest-rate").value);

	document.querySelector("#loan-period-text").innerText =
		loan_period_slider.value + " years";
	N = parseFloat(document.getElementById("loan-period").value);

	pie = new Chart(document.getElementById("pieChart"), {
		type: "doughnut",
		data: {
			labels: ["Principal", "Interest"],
			datasets: [
				{
					label: "Home Loan Details",
					data: [0, 0],
					backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
					hoverOffset: 4
				}
			]
		},
		options: {
			plugins: {
				title: {
					display: true,
				}
			}
		}
	});


	displayDetails();
}
initialize();
