const URL = '/api/contacts';
let contacts = [];
export const getContacts = () => fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    return response.json();
  })
  .then(result => {
    contacts = result.data;
    return contacts;
  });

