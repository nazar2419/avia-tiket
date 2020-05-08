import currencyUI from './currency';

//22дія
class TicketUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .row');
        this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    }
    //принимає массив билетов і виводитеме
    renderTickets(tickets) {
        this.clearContainer();

        if (!tickets.length) {
            this.showEmtyMsg();
            return
        }

        let fragment = '';
        const currency = this.getCurrencySymbol();
        tickets.forEach(ticket => {
            const template = TicketUI.ticketTemplate(ticket, currency);
            fragment += template;
        });

        this.container.insertAdjacentHTML('afterbegin', fragment);
    }
    //очищення контейнера
    clearContainer() {
        this.container.innerHTML = '';
    }
    //виводить сообщение якщо не знайдені дані
    showEmtyMsg() {
        const template = TicketUI.emtyMsgTemplate();
        this.container.insertAdjacentHTML('afterbegin', template) //добавити template на страницу
    }

    static emtyMsgTemplate() {
        return `
        <div class="tickets-empty-res-msg">
            По вашему запросу билетов не найдено.
       </div>
        `

    }

    static ticketTemplate(ticket, currency) {// генерировать шаблон одного білета
        return `
        <div class="col s12 m6">
        <div class="card ticket-card">
          <div class="ticket-airline d-flex align-items-center">
            <img 
            src="${ticket.airline_logo}" 
            class="ticket-airline-img"
            />
            <span class="ticket-airline-name">
              ${ticket.airline_name}
            </span>
          </div>
          <div class="ticket-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="ticket-city">${ticket.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_takeoff</i>
              <span class="ticket-city">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-pice d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
        </div>
      </div>
        `
    }
}

const ticketsUI = new TicketUI(currencyUI);

export default ticketsUI;
