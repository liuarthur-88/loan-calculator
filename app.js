const MBody = document.getElementById('main-body');


//Customer page
const FContainer = document.getElementById('fContainer');
const CSSHeight = FContainer.clientHeight;
const LoanForm =  document.getElementById('loan-form');
const CBasic = document.getElementById('basic');
const CFixed = document.getElementById('fixedal');
const CDeduct = document.getElementById('existd');
const CTerm = document.getElementById('term');
const CIntrest = document.getElementById('intera');

// Loan Calculator page
const BContainer = document.getElementById('bContainer');
const LoanEligAmount = document.getElementById('eligAmount');
const LoanAmount = document.getElementById('amount');
const LoanInterest = document.getElementById('interest');
const LoanYear = document.getElementById('years');
const LoanResult = document.getElementById('results');

// Button
const CustCal = document.getElementById('custcalcu');
const PayCal = document.getElementById('paycalcu');
const BackCus = document.getElementById('returnCus');

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
    if (nStr >= 100){
        return 10 
    }    
    else if (nStr != 10) {
        return nStr.toString().replace(/\B(?<!\.\d*)(?=(\d{1})+(?!\d))/g, ".");
    }  
    else {
        return 10
    }
}

function showError(error, pages) {
    //Show Results
    LoanResult.style.display = 'none';
    //--------------------------------------------------------------------
    //Create a div
    const errorDiv = document.createElement('div');
    //get elements
    const ELcard = document.querySelector('.back-card');
    const ELheading = document.querySelector('.back-heading');
    //Add class
    errorDiv.className = 'alert alert-danger';
    //create text node and append to dic
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading
    ELcard.insertBefore(errorDiv, ELheading.nextSibling);
    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function calculatedEligible(e) {
    
    const CTotalIncome = parseFloat(CBasic.value.replace(/,/g, '')) + parseFloat(CFixed.value.replace(/,/g, ''))
    const CBalance = (CTotalIncome * 60 / 100) - parseFloat(CDeduct.value.replace(/,/g, ''))
    const CIntert = 1 + (parseFloat(CIntrest.value) / 100 * parseFloat(CTerm.value))
    const CMaxElig = CBalance * (parseFloat(CTerm.value) * 12) / CIntert

    return CMaxElig.toFixed(2)

    e.preventDefault();

}

function calculateResults(e) {
    //UI cars
    
    const ELLoanamount = document.getElementById('eligAmount');
    const ELamount = document.getElementById('amount');
    const ELinterest = document.getElementById('interest');
    const ELyears = document.getElementById('years');
    const ELMonthly_payment = document.getElementById('monthly-payment');

    const principal = parseFloat(ELamount.value.replace(',', ''));

    if (parseFloat(ELamount.value) > parseFloat(ELLoanamount.value)){
        showError("Loan amount greater than Eligible Amount")
        return;
    }

    const calculatedInterest = parseFloat(principal) * parseFloat(ELinterest.value) / 100 * parseFloat(ELyears.value);
    const calculatedTotal = calculatedInterest + principal
    const calculatedMonth = parseFloat(ELyears.value) * 12
    const calculatedPayment = calculatedTotal / calculatedMonth;
    
    if (isFinite(calculatedMonth)) {

        ELMonthly_payment.value = 'MYR ' + (calculatedPayment).toFixed(2).toString();

        //Show Results
        LoanResult.style.display = 'block';
    } else {
        showError('Invalid Amount');
    }

    e.preventDefault();
}

BackCus.addEventListener('click', function(e) {

    LoanForm.style.display = 'block';
    LoanResult.style.display = 'none';
    MBody.style.transform = 'rotateY(0deg)';

    e.preventDefault();
})

CustCal.addEventListener('click', function(e) {      

    var eligAmount = calculatedEligible(e)
    eligAmount = addCommas(eligAmount)

    LoanEligAmount.value = eligAmount
    LoanInterest.value = parseFloat(CIntrest.value)
    LoanYear.value = parseFloat(CTerm.value)

    // Turning card
    
    setTimeout(function() {LoanForm.style.display = 'none'}, 1000);

    BContainer.style.height = CSSHeight + 'px';
    MBody.style.transform = 'rotateY(180deg)';
    e.preventDefault();
})

PayCal.addEventListener('click', function (e) {
    // //Hide Results
    LoanResult.style.display = 'none';
    
    calculateResults(e);
    e.preventDefault();
});

CBasic.addEventListener('keyup', function() {
    var amt = addCommas(CBasic.value.replace(',', ''))
    CBasic.value = amt
})

CDeduct.addEventListener('keyup', function() {
    var amt = addCommas(CDeduct.value.replace(',', ''))
    CDeduct.value = amt
})

CFixed.addEventListener('keyup', function() {
    var amt = addCommas(CFixed.value.replace(',', ''))
    CFixed.value = amt
})

LoanAmount.addEventListener('keyup', function() {
    var amt = addCommas(LoanAmount.value.replace(',', ''))
    LoanAmount.value = amt
})

CIntrest.addEventListener('keyup', function() {
    var intrs = addDot(CIntrest.value.replace('.', ''))
    CIntrest.value = intrs
})

CTerm.addEventListener('keyup', function() {
    var year = forYr(CTerm.value.replace('.', ''))
    CTerm.value = year
})

