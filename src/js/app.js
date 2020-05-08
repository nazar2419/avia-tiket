//3 дія
// import api from './services/apiService';

// api.countries().then(res => console.log(res));
// api.cities().then(res => console.log(res));
//5 дія 
import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currenсyUI from './views/currency';

// locations.init().then(res => {
//      console.log(res);
//      console.log(locations);
//      console.log(locations.getCitiesByCountryCode());
// });

//11 дія
document.addEventListener('DOMContentLoaded', () => { // коли дом загрузится можна праюцвати з приложеніям
     initApp();
     const form = formUI.form;
     //Events
     form.addEventListener('submit', (e) => {
          e.preventDefault();
          onFormSubmit();
     });

     //Handlers
     async function initApp() { // виполняються запроси 
          await locations.init(); // получення всіх даних із стора
          formUI.setAutocompleteData(locations.shortCitiesList); //записуємо всі дані в ліст і формуємо дані
     
     }
     //13 дія
     async function onFormSubmit() {
          // собрать дание із input
          const origin = locations.getCitiyCodeByKey(formUI.originValue);
          const destination = locations.getCitiyCodeByKey(formUI.destinationValue);
          const depart_date = formUI.departDateValue;
          const return_date = formUI.returnDateValue;
          const currency = currenсyUI.currencyValue;
          //CODE, CODE, 2019-09, 201910
          console.log(origin, destination, depart_date, return_date);

          await locations.fetchTickets({
               origin,
               destination,
               depart_date,
               return_date,
               currency,
          });
          
          console.log(locations.lastSearch);
          ticketsUI.renderTickets(locations.lastSearch);

     }
})