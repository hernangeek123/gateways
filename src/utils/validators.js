function validatePeripherals(peripherals) {
    if (!Array.isArray(peripherals)) {
      throw new Error('Peripherals must be an array');
    }
  
    if (peripherals.length > 10) {
      throw new Error('Maximum number of peripherals per gateway is 10');
    }
  
    for (const peripheral of peripherals) {
      if (!peripheral.uid || !peripheral.vendor || !peripheral.status) {
        throw new Error('UID, vendor, and status are required for each peripheral');
      }
    }
  }
  
  function validateGateway(gateway) {
    const { name, serialNumber, ipAddress, peripherals } = gateway;
  
    // Check if required fields are present
    if (!name) {
      throw new Error('Name is required');
    }
    if (!serialNumber) {
      throw new Error('Serial number is required');
    }
    if (!ipAddress) {
      throw new Error('IP address is required');
    }
    if (!peripherals) {
      throw new Error('Peripherals array is required');
    }
  
    // Check data types
    if (typeof name !== 'string') {
      throw new Error('Name must be a string');
    }
    if (typeof serialNumber !== 'string') {
      throw new Error('Serial number must be a string');
    }
    if (typeof ipAddress !== 'string') {
      throw new Error('IP address must be a string');
    }
    if (!Array.isArray(peripherals)) {
      throw new Error('Peripherals must be an array');
    }
  
    // Validate the IPv4 address
    const ipv4Regex = /^(?:(?:1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.){3}(?:1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
    if (!ipv4Regex.test(ipAddress)) {
      throw new Error('Invalid IP address format');
    }
  }
  
  module.exports = {
    validatePeripherals,
    validateGateway,
  };