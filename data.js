
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

    const username = event.target[0].value;
    const pipText = event.target[1].value;

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



