import React, { Component } from 'react';
import './contactForm.css';

class ContactForm extends Component {
  state = {
    localName: '',
    localNumber: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { localName, localNumber } = this.state;
    this.props.onSubmit({ name: localName, number: localNumber });
    this.setState({ localName: '', localNumber: '' });
  };

  render() {
    const { localName, localNumber } = this.state;

    return (
      <form className='contact-form' onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="localName"
            value={localName}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="localNumber"
            value={localNumber}
            onChange={this.handleChange}
            required
          />
        </label>
        <button className='button' type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;