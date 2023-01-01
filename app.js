const form = document.getElementById('loan-form');
const LoanAmount = document.getElementById('amount');
const LoanInterest = document.getElementById('interest');
const LoanYear = document.getElementById('years');

form.addEventListener('submit', function (e) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';
    
    setTimeout(calculateResults(e), 2000);
    e.preventDefault();
});

function addCommas(nStr)
{
    return nStr.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function addDot(nStr)
{
    if (nStr.length <= 2) {
        return nStr.toString().replace(/\B(?<!\.\d*)(?=(\d{1})+(?!\d))/g, ".");
    }
    return nStr.toString().replace(/\B(?<!\.\d*)(?=(\d{2})+(?!\d))/g, ".");
}

function forYr(nStr)
{
    return nStr.toString().replace(/\B(?<!\.\d*)(?=(\d{1})+(?!\d))/g, ".");
}

// LoanAmount.addEventListener('keyup', function() {
//     var amt = addCommas(LoanAmount.value.replace(',', ''))
//     document.getElementById('amount').value = amt
// })

// LoanInterest.addEventListener('keyup', function() {
//     var intrs = addDot(LoanInterest.value.replace('.', ''))
//     document.getElementById('interest').value = intrs
// })

// LoanYear.addEventListener('keyup', function() {
//     var year = forYr(LoanYear.value.replace('.', ''))
//     document.getElementById('years').value = year
// })

function calculateResults(e) {
    //UI cars
    const ELamount = document.getElementById('amount');
    const ELinterest = document.getElementById('interest');
    const ELyears = document.getElementById('years');
    const ELMonthly_payment = document.getElementById('monthly-payment');

    const principal = parseFloat(ELamount.value.replace(',', ''));

    const calculatedInterest = parseFloat(principal) * parseFloat(ELinterest.value) / 100 * parseFloat(ELyears.value);
    const calculatedTotal = calculatedInterest + principal
    const calculatedMonth = parseFloat(ELyears.value) * 12
    const calculatedPayment = calculatedTotal / calculatedMonth;

    console.log(calculatedInterest, calculatedTotal, calculatedMonth, calculatedPayment)
    
    if (isFinite(calculatedMonth)) {

        ELMonthly_payment.value = 'MYR ' + (calculatedPayment).toFixed(2).toString();

        //Show Results
        document.getElementById('results').style.display = 'block';
        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Plase check your number');
    }
    e.preventDefault();
}

function showError(error) {
    //Show Results
    document.getElementById('results').style.display = 'none';
    //Hide Loader
    document.getElementById('loading').style.display = 'none';
    //--------------------------------------------------------------------
    //Create a div
    const errorDiv = document.createElement('div');
    //get elements
    const ELcard = document.querySelector('.card');
    const ELheading = document.querySelector('.heading');
    //Add class
    errorDiv.className = 'alert alert-danger';
    //create text node and append to dic
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading
    ELcard.insertBefore(errorDiv, ELheading);
    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

