import {getAutocompleteInstance, getDatePickerInstance} from '../plugins/materialize';
// 10 дія 
class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        this._form = document.forms['locationControls']; // звернення до інпутів форми
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocomplete = autocompleteInstance(this.origin); // передаем в метод автокомплита матеріалайза дом елементи інпути форми
        this.destinationAutocomplete = autocompleteInstance(this.destination);// визов інстанса із матеріала
        this.departDatePicker = datePickerInstance(this.depart);// передаем в метод дата пікера матеріалайза дом елементи дата - інпути форми
        this.returnDatePicker = datePickerInstance(this.return)

        
    }
    get form() { // доступ до форми
        return this._form;
    }
    //12 дія
    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.departDatePicker.toString();
    }

    get returnDateValue() {
        return this.returnDatePicker.toString();
    }

    setAutocompleteData(data) { // дата установлюється в інпути origin і destination
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
