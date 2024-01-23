import React from 'react';

const ContactList = ({ contacts, onDelete }) => (
  <ul>
    {contacts.map(contact => (
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button className='button button-margin' onClick={() => onDelete(contact.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default ContactList;