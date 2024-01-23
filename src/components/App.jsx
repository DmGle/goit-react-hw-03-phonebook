import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      name: '',
      number: '',
    };
  }

  componentDidMount() {
    // Завантаження контактів з localStorage при першому рендері
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Збереження контактів у localStorage при зміні стану
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = contact => {
    const { contacts, name } = this.state;

    if (contacts.some(existingContact => existingContact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contact,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleFormChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className='container'>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleFormChange}
          name={name}
          number={number}
        />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;