let MBody = document.getElementById('main-body');

//Customer page
let FContainer = document.getElementById('fContainer');
let CSSHeight = FContainer.clientHeight;

let LoanForm = document.getElementById('loan-form');
let CBasic = document.getElementById('basic');
let CFixed = document.getElementById('fixedal');
let CDeduct = document.getElementById('existd');
let CTerm = document.getElementById('term');
let CIntrest = document.getElementById('intera');

// Loan Calculator page
let BContainer = document.getElementById('bContainer');
BContainer.style.height = CSSHeight + 30 + 'px';

let LoanEligAmount = document.getElementById('eligAmount');
let LoanAmount = document.getElementById('amount');
let LoanInterest = document.getElementById('interest');
let LoanYear = document.getElementById('years');
let LoanResult = document.getElementById('results');

// Button
let CustCal = document.getElementById('custcalcu');
let PayCal = document.getElementById('paycalcu');
let BackCus = document.getElementById('returnCus');


function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function addDot(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{2})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function forYr(nStr) {
    if (nStr >= 100) {
        return 10
    }
    else if (nStr != 10) {
        
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{1})/;
        while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return x1 + x2;
    }
    else {
        return 10
    }
}

function roundDownHundred(nStr) {
    return Math.floor(nStr / 100) * 100;
}

function showError(error, pages) {
    //Show Results
    LoanResult.style.display = 'none';
    //--------------------------------------------------------------------
    //Create a div
    let errorDiv = document.createElement('div');
    //get elements
    let ELcard = document.querySelector('.back-card');
    let ELheading = document.querySelector('.back-heading');
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

    let CTotalIncome = parseFloat(CBasic.value.replace(/,/g, '')) + parseFloat(CFixed.value.replace(/,/g, ''))
    let CBalance = (CTotalIncome * 60 / 100) - parseFloat(CDeduct.value.replace(/,/g, ''))
    let CIntert = 1 + (parseFloat(CIntrest.value) / 100 * parseFloat(CTerm.value))
    let CMaxElig = CBalance * (parseFloat(CTerm.value) * 12) / CIntert

    return CMaxElig.toFixed(2)

    e.preventDefault();

}

function calculateResults(e) {
    //UI cars

    let ELLoanamount = document.getElementById('eligAmount');
    let ELamount = document.getElementById('amount');
    let ELinterest = document.getElementById('interest');
    let ELyears = document.getElementById('years');
    let ELMonthly_payment = document.getElementById('monthly-payment');

    let principal = ELamount.value.replace(',', '').replace(',', '');
    let EligAmount = ELLoanamount.value.replace(',', '').replace(',', '');


    if (parseFloat(principal) > parseFloat(EligAmount)) {
        showError("Loan amount greater than Eligible Amount")
        return;
    }

    let calculatedInterest = parseFloat(principal) * parseFloat(ELyears.value) * (parseFloat(ELinterest.value) / 100);
    let calculatedTotal = parseFloat(calculatedInterest) + parseFloat(principal)
    let calculatedMonth = parseFloat(ELyears.value) * 12
    let calculatedPayment = parseFloat(calculatedTotal) / parseFloat(calculatedMonth);

    if (isFinite(calculatedMonth)) {

        ELMonthly_payment.value = 'MYR ' + (calculatedPayment).toFixed(2).toString();

        //Show Results
        LoanResult.style.display = 'block';
    } else {
        showError('Invalid Amount');
    }

    e.preventDefault();
}

BackCus.addEventListener('click', function (e) {

    setTimeout(function () {
        document.getElementById('loan-result').style.display = 'none'
    }
        , 1000
    );

    FContainer.style.display = 'block';
    LoanResult.style.display = 'none';
    MBody.style.transform = 'rotateY(0deg)';

    e.preventDefault();
})

CustCal.addEventListener('click', function (e) {

    var eligAmount = calculatedEligible(e)
    eligAmount = roundDownHundred(eligAmount)
    eligAmount = addCommas(eligAmount)
    
    LoanEligAmount.value = eligAmount
    LoanInterest.value = parseFloat(CIntrest.value)
    LoanYear.value = parseFloat(CTerm.value)

    // Turning card
    setTimeout(function () {
        FContainer.style.display = 'none'
    }
        , 100
    );
    document.getElementById('loan-result').style.display = 'block';
    MBody.style.transform = 'rotateY(180deg)';
    e.preventDefault();
})

PayCal.addEventListener('click', function (e) {
    // //Hide Results
    LoanResult.style.display = 'none';

    calculateResults(e);
    e.preventDefault();
});

CBasic.addEventListener('keyup', function () {
    var amt = addCommas(CBasic.value.replace(',', ''))
    CBasic.value = amt
})

CDeduct.addEventListener('keyup', function () {
    var amt = addCommas(CDeduct.value.replace(',', ''))
    CDeduct.value = amt
})

CFixed.addEventListener('keyup', function () {
    var amt = addCommas(CFixed.value.replace(',', ''))
    CFixed.value = amt
})

LoanAmount.addEventListener('keyup', function () {
    var amt = addCommas(LoanAmount.value.replace(',', ''))
    LoanAmount.value = amt
})

CIntrest.addEventListener('keyup', function () {
    var intrs = addDot(CIntrest.value.replace('.', ''))
    CIntrest.value = intrs
})

CTerm.addEventListener('keyup', function () {
    var year = forYr(CTerm.value.replace('.', ''))
    CTerm.value = year
})
