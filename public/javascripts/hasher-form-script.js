
const setErrors = (errors) => {
    if(errors.size === 0)
        return;

    for (const [key, value] of errors)
        document.getElementById(`${key}.error`).innerText = value;
    document.getElementById('error-summary').innerText = 'Form contains errors';
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async function(event) {

        console.log('event listner activated');
        event.preventDefault(); // dont submit form normally

        const name = document.getElementById('name').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const email = document.getElementById('email').value;

        // clear error messages
        document.getElementById('name.error').innerText = '';
        document.getElementById('phone-number.error').innerText = '';
        document.getElementById('email.error').innerText = '';
        document.getElementById('error-summary').innerText = '';

        // client-side validation
        if (typeof validateData == 'function'){
            const errors = validateData(name, phoneNumber, email);
            if (errors.size > 0){
                console.log('client-side validation failed');
                setErrors(errors);
                return
            }
        }
        else{
            // alert('validateData function is not defined, skipping client-side validation');
            console.error('validateData() function not found, skipping client-side validation...');
        }

        // submit form
        try {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phoneNumber,
                    email
                })
            };

            const response = await fetch('/submit', request);
            const result = await response.json();

            if (result.success) {
                // alert('Form submitted successfully!');
                document.getElementById('hash').innerText = result.hash;
            }
            else {
                console.log('server-side validation failed');
                setErrors(new Map(JSON.parse(result.errors)));
            }
        }
        catch (error) {
            alert('failed to submit form :(');
            console.log(error);
        }
    })
});