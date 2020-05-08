import api from '../services/apiService';
import { formatDate } from '../helpers/date'
//4 дія
class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCitiesList = {};
        this.lastSearch = {};
        this.airlines = {};
        this.formatDate = helpers.formatDate;
    }
    async init() {
        const response = await Promise.all([
           this.api.countries(),
           this.api.cities(),
           this.api.airlines(),
        ]);

       // console.log(response);
       //розділити масив на страни і города 6 дія
        const [countries, cities, airlines] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCitiesList = this.createShortCitiesList(this.cities);
        this.airlines = this.serializeAirlines(airlines);
        // console.log(this.airlines);
        console.log(this.cities);
        return response;
    }

    // 14 дія
    getCitiyCodeByKey(key) {
        // return this.cities[key].code;
        const city = Object.values(this.cities).find((item) => item.full_name === key);
        return city.code
    }
    //18 дія
    getCityNameByCode(code) {
        return this.cities[code].name;
    }


    //17дія методи для повернення имені і логотипа авіакомпанії
    getAirlineNameByCode(code) {
        return this.airlines[code] ? this.airlines[code].name : '';
    }

    getAirlineLogoByCode(code) {
        return this.airlines[code] ? this.airlines[code].logo : '';
    }

    // 9 дія формування списку для автокомпліту
    createShortCitiesList(cities) {
        //{'City, Country': null}
        // Object.entries => [key, value]
        return Object.entries(cities).reduce((acc, [, city]) => { //entries передае значення у вигляді // [key, value]
         
            acc[city.full_name] = null;
            return acc;
        }, {});
    }
    serializeAirlines(airlines) {
        return airlines.reduce((acc, item) => {
            item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
            item.name = item.name || item.name_translations.en;
            acc[item.code] = item;
            return acc;
        }, {});
    }

    //8 дія преобразованія типу з масиву в обьект
    serializeCountries(countries) {
        //{'Country code': {...} }

        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});

        
    }
    
    serializeCities(cities) {
        // {'City name, Country name': {...}}
        return cities.reduce((acc, city) => {
            const country_name = this.countries[city.country_code].name;
            //city.name = city.name || city.name_translations.en;
            const city_name = city.name || city.name_translations.en;  
            const full_name = `${city_name}, ${country_name}`;
            acc[city.code] = {
                ...city,
                country_name,
                full_name,
            }
            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        //{'Country code': {...}}
        return this.countries[code].name;
    }
    //15 дія 
    async fetchTickets(params) {
        const response = await this.api.price(params);
        this.lastSearch = this.serializeTickets(response.data);
    }
    //19 дія додаемо в билет потрібно поля
    serializeTickets(tickets) {
        return Object.values(tickets).map(ticket => {
            return {
                ...ticket,
                origin_name: this.getCityNameByCode(ticket.origin),
                destination_name: this.getCityNameByCode(ticket.destination),
                airline_logo: this.getAirlineLogoByCode(ticket.airline),
                airline_name: this.getAirlineNameByCode(ticket.airline),
                departure_at: this.formatDate(ticket.departure_at,'dd MMM yyyy hh:mm'), // формування дати
                return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
            }
        })
    }
    //7 дія 
    // getCitiesByCountryCode(code) {
    //     return this.cities.filter(city => city.country_code === code);
    // }
}
const locations = new Locations(api,{ formatDate });

export default locations;