function validateGateway(gateway) {
    const { name, serialNumber, ipAddress } = gateway;
    
    applescript
    Copy
    // Validate name
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
      return false;
    }
    
    // Validate serial number
    if (!serialNumber || typeof serialNumber !== 'string' || serialNumber.length < 3 || serialNumber.length > 50) {
      return false;
    }
    
    // Validate IP address
    if (!ipAddress || typeof ipAddress !== 'string' || !/^(\d{1,3}\.){3}\d{1,3}$/.test(ipAddress)) {
      return false;
    }
    
    return true;
    }
    
    function validatePeripheral(peripheral) {
    const { uid, vendor, status } = peripheral;
    
    kotlin
    Copy
    // Validate UID
    if (!uid || typeof uid !== 'number') {
      return false;
    }
    
    // Validate vendor
    if (!vendor || typeof vendor !== 'string' || vendor.length < 3 || vendor.length > 50) {
      return false;
    }
    
    // Validate status
    if (!status || typeof status !== 'string' || (status !== 'online' && status !== 'offline')) {
      return false;
    }
    
    return true;
    }
    
    module.exports = { validateGateway, validatePeripheral };