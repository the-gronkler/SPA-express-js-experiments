function validateData(name, phoneNumber, email) {
    const errors = new Map();
    if (name.length === 0) errors.set('name', 'Name is required');

    if (!/^\d{9}$/.test(phoneNumber)) errors.set('phone-number', 'Phone number must be 9 digits long');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.set('email', 'Invalid email format');

    return errors;
}

// UMD pattern for exporting validateData function
(
    // definition
    function (root, factory) {
        if (typeof module === 'object' && typeof module.exports === 'object')
            // export for Node.js/CommonJS (Backend)
            module.exports = factory();

        else  // export for browsers (Frontend)
            root.validateData = factory();
    }

    // invocation
    (typeof self !== 'undefined' ? self : this, () => validateData)

);



