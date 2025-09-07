import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// Fetch pips using a GET request
export const getPips = async () => {

    try {
        // Fetch the data from the PHP backend using the fetch API. Return a promise object.
        const dataObject = await fetch('http://127.0.0.1:8000')

        // Convert the promise to a JavaScript object in an array
        const jsonResponse = await dataObject.json();

        // Return the data
        return jsonResponse;
        
    } catch (error) {

        // Catch the error and log the message
        console.log ('Failed to fetch data: ', error)
        
    }
}

// Make a clone of the template and add a new pip

export const addPip = async () => {
    
    document.getElementById('pipform').addEventListener('submit', async (event) => {
        // Prevents reloading the page
        event.preventDefault();

        // Get username and piptext from the submit event
        let username = await event.target[0].value;
        let pipText = await event.target[1].value;
    
    
        // Check if username is either Felix or Riley.
        // Depending on what username set a certain avatar using the dicebear. This is implemented since there is no authentication at the moment.
        if (username.toLowerCase() == 'felix' ) {
            username = 'https://api.dicebear.com/9.x/personas/svg?seed=Felix'
        } else if (username.toLowerCase() == 'riley') {
            username = 'https://api.dicebear.com/9.x/personas/svg?seed=Riley'
        } else {
            // If not Felix or Riley throw a new error to the console
            // And display error message to user. 
            const errorMessageElement = document.getElementById('errormessage')
            errorMessageElement.innerText = 'Incorrect username'

            animate(errorMessageElement, {y: [10, 0]})

    
            // Throw console error and stop running.
            throw new Error ('User not found');
        }


        try {
            
            // Send the data to the PHP backend with fetch
            const response = await fetch("http://127.0.0.1:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Format the data as JSON
            body: JSON.stringify({ username: username, pipText: pipText }),
            });
        

            // Check if the server recieved the data correcly and temporarily add pip to front-end to improve UX.
            if(response.ok) {

                // Convert the response to JS object
                const pipdata = await response.json();
                
                // If data is recieved correctly then remove the modal pop-up from the DOM
                const modal = document.getElementById('modal');
                modal.classList.add('hidden');

                const overlay = document.getElementById('overlay');
                overlay.classList.add('hidden');

                // Make a clone of the pip template
                const piptemplate = document.getElementById('piptemplate');
                
                const clon = piptemplate.content.cloneNode(true);
                

                // Extract real username from the dicebear api username
                const urlParams = new URLSearchParams(new URL(pipdata.username).search); // Gets the query string and returns a url object
                const realusername = urlParams.get('seed');

                // Convert the timestamp to a more userfriendly format before setting text to the DOM
                const timestamp = pipdata.created_at
                const date = new Date(timestamp);

                // User-friendly date and time
                const userFriendlyDatetime = date.toLocaleString('da-DK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                });                

                // Get alle the elements and add the information from the pip array
                clon.querySelector('.name').innerText = realusername
                clon.querySelector('.userimage').src = pipdata.username
                clon.querySelector('.date').innerText = userFriendlyDatetime
                clon.querySelector('.piptext').innerText = pipdata.pipText
                
                // Add the pip to the DOM (AT THE TOP with prepend)
                document.getElementById('pipcontainer').prepend(clon);
                
            }

        } catch (error) {

            console.log(error)
            
        }
    })

} 



export const deletePip = async (pipId) => {

    try {
        const response = await fetch("http://127.0.0.1:8000", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pipId: pipId }),
        });

    } catch (error) {
        console.log(error);
    }
}