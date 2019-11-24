/**
 * @class Currency
 */
function Currency() {
    this.initCurrency = function () {
        var currency = document.getElementById('currencySelect');
        currency.value = localStorage.getItem('currency');
    }
    this.updateCurrency = function () {
        var currency = document.getElementById('currencySelect').value;
        localStorage.setItem('currency', currency);
        // https://javascript.info/dispatch-events
        // https://stackoverflow.com/questions/23725816/dispatch-event-with-data
        var updateCurrencyEvent = new CustomEvent('updateCurrency', {
            detail: currency
        });
        document.dispatchEvent(updateCurrencyEvent);
    }
    this.getCurrency = function () {
        return localStorage.getItem('currency');
    }
    this.getCurrencySymbol = function () {
        var currency = localStorage.getItem('currency');
        if (currency === 'eur') {
            return '€';
        }
        if (currency === 'dol') {
            return '$';
        }
        return null;
    }
}