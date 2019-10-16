import { LightningElement, track } from 'lwc';
import { getContacts } from 'data/contactService';

export default class App extends LightningElement {
    @track contacts = [];
    connectedCallback() {
        getContacts().then(result => {
        this.contacts = this.allContacts = result;
        });
    }

    searchdata(event) {
    const searchKey = event.target.value.toLowerCase();
    this.contacts = this.allContacts.filter(
        contact => contact.lastName.toLowerCase().includes(searchKey)
    );
  }
}
