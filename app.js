// api-key
let apiKey = "8eae0f55913f14feeabe0f2a"

// defining api
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`

// Defining variables 'fromDropDown' and 'toDropDown using ID attributes (from HTML) and DOM element (getElementByID) - - allows us to perform an action with an HTML element
const fromDropDown = document.getElementById("from-currency-select")
const toDropDown = document.getElementById("to-currency-select")

//Now, we create options for the 'from-currency-select' dropdown menu from the 'country_list' object (located in country-codes.js):

// 'Object.keys' returns an array of all the keys (currency codes) in the 'country_list' object. 'forEach' is then used to iterate over the array - 
Object.keys(country_list).forEach(currency => {
  // For each key on the list, we want to create an 'option' variable and set its value and text to currency.
  const option = document.createElement("option")
  option.value = currency
  option.text = currency
  // We then add 'option' to this dropdown menu using 'add'
  fromDropDown.add(option)
})

//Repeating the same process for the other dropdown 'to-currency-select':
Object.keys(country_list).forEach(currency => {
  const option = document.createElement("option")
  option.value = currency
  option.text = currency
  toDropDown.add(option)
})

//Setting predetermined values so that 'fromDropDown' is already set to USD for simplicity purposes
fromDropDown.value = "USD"
// 'toDropDown' is set to British Pounds as an example
toDropDown.value = "GBP"

// Defining function to convert currency based on the input from the user
let convertCurrency = () => {
  // We want to get the amount value by referencing the input id called 'amount'. 'document.querySelector' selects the HTML element with the id 'amount' and '.value' gets the input value entered by the user.
  const amount = document.querySelector("#amount").value
  // This gets the currently selected value from the 'fromDropDown' and 'toDropDown' respectively and stores it in variables: 'fromCurrency' & 'toCurrency'
  const fromCurrency = fromDropDown.value
  const toCurrency = toDropDown.value


  //If amount input field is not empty - input does not equal to 0
  if (amount.length != 0) {
    // Using fetch to get exchange rate from the API. Once fetch request is done, we use '.then' method to process the response from the API and convert it to json format (JavaScript Object Notation). This makes it more convenient to work with the data in the code. 
    // '.then' method takes the newly json-converted data we retrieved from the API
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        // We take the exchange rate for the 'from' and 'to' currencies with the data object retrieved from the API. 
        let fromExchangeRate = data.conversion_rates[fromCurrency]
        let toExchangeRate = data.conversion_rates[toCurrency]
        // We then take the exchange rates from the selected currencies and the input amount to calculate the converted amount. 
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate
        // For result - the HTML element with the id "result" is updated to show the converted currency value. '.toFixed' method is used to round the converted amount to 2 decimal places for simplicity.
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
      })
  } else {
    // if input box is empty, we will display this alert:
    alert("Please enter an amount")
  }
}

// 'document.querySelector' selects the HTML element with the ID 'convert-button'. '.addEventListener("click", convertCurrency) creates a click so that when the user clicks on the 'Get Exchange Rate' button, the function 'convertCurrency' is implemented.  
document.querySelector("#convert-button").addEventListener("click", convertCurrency)
// Code below insures that when the web page finishes loading, the function 'convertCurrency' will be called.
window.addEventListener("load", convertCurrency)