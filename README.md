# Employee Management Application

A responsive Employee Management Application built using React.js, Redux Toolkit, Axios, and Vitest.

## Features

- View employee list
- Search employee by ID
- Add new employee
- Edit existing employee
- Delete employee with confirmation
- Country dropdown using API
- Form validation
- Loading state
- Error handling
- Empty state
- Responsive design
- Redux Toolkit for state management
- API integration using Axios
- Unit testing using Vitest and React Testing Library

## Technologies Used

- React.js
- Redux Toolkit
- React Redux
- Axios
- JavaScript
- CSS
- Vitest
- React Testing Library
- MockAPI

## API

Employee API:

https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee

Country API:

https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country

## Employee Operations

### Get Employees

GET `/employee`

### Get Employee By ID

GET `/employee/{id}`

### Create Employee

POST `/employee`

### Update Employee

PUT `/employee/{id}`

### Delete Employee

DELETE `/employee/{id}`

## Form Fields

- Name
- Email
- Mobile
- Country
- State
- District

## Validation

The application validates:

- Required fields
- Minimum name length
- Valid email format
- 10-digit mobile number
- Required country
- Required state
- Required district

## Project Structure

```text
src/
├── components/
│   ├── EmployeeForm.jsx
│   ├── EmployeeTable.jsx
│   ├── Loading.jsx
│   └── SearchEmployee.jsx
│
├── pages/
│   └── EmployeePage.jsx
│
├── services/
│   ├── api.js
│   ├── countryService.js
│   └── employeeService.js
│
├── store/
│   ├── employeeSlice.js
│   └── store.js
│
├── test/
│   ├── EmployeeForm.test.jsx
│   ├── EmployeePage.test.jsx
│   ├── EmployeeTable.test.jsx
│   ├── SearchEmployee.test.jsx
│   ├── employeeService.test.js
│   └── setup.js
│
├── App.jsx
├── index.css
└── main.jsx