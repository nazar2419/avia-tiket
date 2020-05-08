//16 дія
class CurrencyUI {
    constructor() {
        this.currency = document.getElementById('currency');
        this.dictionary = {
            USD: '$',
            EUR: '€'
        }
    }

    get currencyValue() {
        return this.currency.value;
    }

    getCurrencySymbol() {
        return this.dictionary[this.currencyValue];
    }
}

const currenсyUI = new CurrencyUI();

export default currenсyUI;