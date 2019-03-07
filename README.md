# contact-list-api

> contact-list-api is a Express API for creating and managing contact and their numbers.
> Demo link: https://awab-contact-list-api.herokuapp.com

---

### Contacts Endpoints

1. Get all Contacts
GET /contacts
2. Get a Contact
GET /contacts/:contactId
3. Create a Contact
POST /contacts - {"firstname": "will", "lastname": "smith"}
4. Delete a Contact
DELETE /contacts/:contactId
5. Search Contacts
GET /contacts/search/:firstname | lastname | number
6. Upload Image
POST /contacts/images/:contactId - form image cool.png | cool.jpg
7. Get Image
GET /contacts/images/:contactId
8. Export Contacts to csv
GET /contacts/report/csv

### Numbers Endpoints

1. Get all Numbers
GET /numbers
2. Get a Number
GET numbers/:numberId
3. Create a Number
POST numbers/ - {"number": "0123456789", "contactId": "1"}
4. Delete a Number
DELETE numbers/:numberId
5. Get all Numbers in a Contact
numbers/contact/:contactId

---

### Installation

    $ npm install
    $ npm start
