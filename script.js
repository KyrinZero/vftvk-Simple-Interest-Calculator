window.onload = () => {
  renderRateVal();
};

function compute() {
  // Results are cleared before computing
  clearResults();
  const principalEl = document.getElementById("principal");
  const rateEl = document.getElementById("rate");
  const yearsEl = document.getElementById("years");

  // Validates the value and data is cleaned
  const { isValid, principal, rate, years } = validate(
    principalEl.value,
    rateEl.value,
    yearsEl.value
  );
  if (!isValid) return;

  // Interest calculated
  const totalInterest = calculateTotalInterest(principal, rate, years);

  // Result is shown
  renderResults(principal, rate, years, totalInterest);
}

function clearResults() {
  const result = document.getElementById("result");
  result.innerHTML = "";
}

/**
 * Renders rate value to user
 */
function renderRateVal() {
  const rate = document.getElementById("rate").value;
  const rateVal = document.getElementById("rate_val");
  rateVal.innerText = rate + "%";
}

function renderResults(principal, rate, years, interestAmt) {
  const resultTxt = `
  If you deposit
  <span class="highlight">${principal}, </span><br />
  at an interest rate of
  <span class="highlight">${rate}%.</span>
  <br />
  You will receive an amount of
  <span class="highlight">${interestAmt},</span><br />
  in the year
  <span class="highlight">${calculateYear(years)}</span>`;
  const result = document.getElementById("result");
  result.innerHTML = resultTxt;
}

/**
 * Calculates Interests
 */
function calculateTotalInterest(principal, rate, years) {
  return principal * (rate / 100) * years;
}

/**
 * Converts to full year
 */
function calculateYear(numberOfYears) {
  return new Date().getFullYear() + numberOfYears;
}

/**
 * Validates value and string value is converted to number
 */
function validate(principalVal, rateVal, yearsVal) {
  // Checks values are empty or not
  if (principalVal === "" || rateVal === "" || yearsVal === "") {
    alert("Enter a positive number");

    // Focus on 'principal' input after alert
    document.getElementById("principal").focus();
    return {
      isValid: false,
      principal: null,
      rate: null,
      years: null,
    };
  }

  try {
    // Converts the value from string to number
    const principal = parseFloat(principalVal);
    const rate = parseFloat(rateVal);
    const years = parseFloat(yearsVal);

    // Alert is shown if the number is zero or non-positive number
    if (principal <= 0) {
      alert("Enter a positive number");

      // Focus on 'principal' input after alert
      document.getElementById("principal").focus();
      return {
        isValid: false,
        principal: null,
        rate: null,
        years: null,
      };
    }

    // Cleaned value is returned
    return {
      isValid: true,
      principal,
      rate,
      years,
    };
  } catch (error) {
    // For any possible error false value is returned
    return {
      isValid: false,
      principal: null,
      rate: null,
      years: null,
    };
  }
}
