//Customer page

const CBasic = document.getElementById('basic');
const CFixed = document.getElementById('fixedal');
const CDeduct = document.getElementById('existd');
const CTerm = document.getElementById('term');
const CIntrest = document.getElementById('intera');

// Loan Calculator page
const LoanEligAmount = document.getElementById('eligAmount');
const LoanAmount = document.getElementById('amount');
const LoanInterest = document.getElementById('interest');
const LoanYear = document.getElementById('years');

// Button
const CustCal = document.getElementById('custcalcu');
const PayCal = document.getElementById('paycalcu');
const Back = document.getElementById('back');

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

function showError(error) {
    //Show Results
    document.getElementById('results').style.display = 'none';
    //Hide Loader
    document.getElementById('loading').style.display = 'none';
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

    console.log(CBasic.value, CFixed.value, CDeduct.value, CIntrest.value, CTerm.value)

    return CMaxElig.toFixed(2)

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
        document.getElementById('results').style.display = 'block';
        //Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Plase check your number');
    }

    e.preventDefault();
}

Back.addEventListener('click', function() {
    document.getElementById('main-body').style.transform = 'rotateY(0deg)';
})

CustCal.addEventListener('click', function(e) {
    var eligAmount = calculatedEligible(e)
    eligAmount = addCommas(eligAmount)
    document.getElementById('eligAmount').value = eligAmount
    document.getElementById('interest').value = parseFloat(CIntrest.value)
    document.getElementById('years').value = parseFloat(CTerm.value)

    document.getElementById('main-body').style.transform = 'rotateY(180deg)';

    e.preventDefault();
})

PayCal.addEventListener('click', function (e) {
    // //Hide Results
    document.getElementById('results').style.display = 'none';
    // //Show Loader
    document.getElementById('loading').style.display = 'block';
    
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

