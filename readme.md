# Gateway Management REST Service

This is a REST service for managing gateways and their associated devices. The service allows you to store, retrieve, update, and delete gateway and device information using JSON/HTTP. The information is stored in a database, and the service provides validation for certain fields.

## Installation

1. Clone the repository.
2. Install the required dependencies by running npm install in the project directory.
3. Make sure that MongoDB is running on your machine.
4. Start the server by running `npm start`.
5. Open a web browser and navigate to http://localhost:5000 to access the application.

## Usage

### Storing a gateway

To store a gateway, send a POST request to `/gateways` with the following JSON payload:

```json
{
  "serialNumber": "gw001",
  "name": "Gateway 001",
  "ipAddress": "192.168.0.1",
  "peripherals": []
}
```

The `serialNumber`, `name`, and `ipAddress` fields are required. The `ipAddress` field is validated to ensure that it is a valid IPv4 address.

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

### Retrieving all gateways

To retrieve all gateways, send a GET request to `/gateways`.

### Retrieving a single gateway

To retrieve a single gateway, send a GET request to `/gateways/:id`, where `:id` is the ID of the gateway.

### Updating a gateway

To update a gateway, send a PUT request to `/gateways/:id` with the following JSON payload:

```json
{
  "name": "Gateway 001 Updated",
  "ipAddress": "192.168.0.2"
}
```

The `name` field is optional, and the `ipAddress` field is validated to ensure that it is a valid IPv4 address.

### Deleting a gateway

To delete a gateway, send a DELETE request to `/gateways/:id`, where `:id` is the ID of the gateway.

### Adding a device to a gateway

To add a device to a gateway, send a POST request to `/gateways/:id/devices` with the following JSON payload:

```json
{
  "uid": 1,
  "vendor": "Device Vendor",
  "createdDate": "2022-01-01T00:00:00.000Z",
  "status": "online"
}
```

The `uid` and `vendor` fields are required. The `createdDate` field must be a valid date in ISO format. The `status` field must be either "online" or "offline". A maximum of 10 devices are allowed for a gateway.

### Removing a device from a gateway

To remove a device from a gateway, send a DELETE request to `/gateways/:id/devices/:uid`, where `:id` is the ID of the gateway and `:uid` is the UID of the device.

## UI

A basic UI for this service can be found at `/ui/index.html`. This UI allows you add a new gateway to the DB.

## Unit Tests

Meaningful unit tests can be found in the `test` directory. To run the tests, use the command `npm test`.

## Automated Build

This service includes a Gulp build process that automates the compilation and packaging of the source code.

To build the application, run the following command:

```
gulp
```

This will run the automated build task defined in the `gulpfile.js` file. The task will create a zip file of the compiled code and public files.

The resulting zip file will be saved in the root directory.

## Dependencies

This application requires the following dependencies:

- express
- body parser
- cors
- mongoose
- joi
- gulp
- gulp zip
- mongodb
- chai
- chai http
- mocha
- nodemon

## Prerequisites

Before you can run this application, you must have the following software installed:

- Node.js (version 5 or higher)
- npm (version 5 or higher)
- MongoDB (version 3 or higher)

## Author

Hernan Gonzalez Acosta
