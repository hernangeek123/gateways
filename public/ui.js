// Get form elements
const gatewayForm = document.getElementById('gatewayForm');
const nameInput = document.getElementById('name');
const serialNumberInput = document.getElementById('serialNumber');
const ipAddressInput = document.getElementById('ipAddress');
const peripheralsFieldset = document.getElementById('peripherals');
const peripheralTemplate = document.getElementById('peripheralTemplate');
const addPeripheralButton = document.getElementById('addPeripheral');
const peripheralsError = document.getElementById('peripheralsError');
const result = document.getElementById('result');

// Add event listener to form
gatewayForm.addEventListener('submit', async (event) => {
// Prevent default form submission
event.preventDefault();

// Clear result message
result.textContent = '';

// Get form data
const formData = new FormData(gatewayForm);
const name = formData.get('name');
const serialNumber = formData.get('serialNumber');
const ipAddress = formData.get('ipAddress');

// Validate form data
if (!validateGateway({ name, serialNumber, ipAddress })) {
result.textContent = 'Invalid gateway data';
return;
}

// Get peripherals data
const peripherals = [];
const peripheralElements = peripheralsFieldset.querySelectorAll('.peripheral');
for (const peripheralElement of peripheralElements) {
const uid = parseInt(peripheralElement.querySelector('[name="uid"]').value);
const vendor = peripheralElement.querySelector('[name="vendor"]').value;
const status = peripheralElement.querySelector('[name="status"]').value;

Copy
// Validate peripheral data
if (!validatePeripheral({ uid, vendor, status })) {
  result.textContent = 'Invalid peripheral data';
  return;
}

peripherals.push({ uid, vendor, status });
}

// Validate number of peripherals
if (peripherals.length > 10) {
result.textContent = 'Maximum number of peripherals per gateway is 10';
return;
}

// Submit form data
try {
const response = await fetch('/api/gateways', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, serialNumber, ipAddress, peripherals }),
});
const data = await response.json();
if (response.ok) {
result.textContent = 'Gateway added successfully';
gatewayForm.reset();
} else {
result.textContent = data.message;
}
} catch (err) {
result.textContent = 'Error submitting form';
}
});

// Add event listener to "Add Peripheral" button
addPeripheralButton.addEventListener('click', () => {
// Clone peripheral template
const peripheralClone = document.importNode(peripheralTemplate.content, true);

// Add event listener to "Remove" button
const removeButton = peripheralClone.querySelector('.removePeripheral');
removeButton.addEventListener('click', (event) => {
event.target.closest('.peripheral').remove();
});

// Append clone to peripherals fieldset
peripheralsFieldset.insertBefore(peripheralClone, addPeripheralButton);
});