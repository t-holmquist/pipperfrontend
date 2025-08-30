
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

// Create a new pip with a POST request

// Get form and add the submit event.
document.getElementById('pipform').addEventListener('submit', async (event) => {
    // Prevents reloading the page
    event.preventDefault();

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
        throw new Error ('User not found');
    }


    // Send the data to the PHP backend with fetch
    const response = await fetch("http://127.0.0.1:8000", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    // Format the data as JSON
    body: JSON.stringify({ username: username, pipText: pipText }),
    });
    
})



