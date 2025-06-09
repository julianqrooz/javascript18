let droplist = document.querySelectorAll(".drop-list select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let getButton = document.querySelector("form button");
let apiKEY = "994bfffefb7329ff74c36d13";

for (let i = 0; i < droplist.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "JOD" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    droplist[i].insertAdjacentHTML("beforeend", optionTag);
  }
  droplist[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
function loadFlag(element) {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
    }
  }
}
window.addEventListener("load", () => {
  getExchangeRate();
});
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});
let exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  let amount = document.querySelector(".amount input");
  let exchangeRateText = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateText.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/${apiKEY}/latest/${fromCurrency.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);

      exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateText.innerText = "Something went wrong";
    });
}
