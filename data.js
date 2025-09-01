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

// Create a new pip with a POST request
// Get form and add the submit event.
// It takes a refetch function that gets the latest pips AFTER the new pip has been added
export const addPip = async (refetchFunction) => {
    
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
        
        
            // Check if the server recieved the data correcly
            if(response.ok) {
        
                // If data is recieved corretly then remove the modal pop-up from the DOM
                const modal = document.getElementById('modal');
                modal.classList.add('hidden');

                const overlay = document.getElementById('overlay');
                overlay.classList.add('hidden');
        
            }

            // Refetch data with the new pip added
            await refetchFunction();
    
            
        } catch (error) {

            console.log(error)
            
        }
    })

} 


// Create a new pip with a PUT request to delete a pip
// It takes a refetch function that gets the latest pips AFTER the new pip has been removed
// export const deletePip = async (pipId, refetchFunction) => {


//         // Check if button exist in the DOM
//         if (document.getElementById(pipId)) {

//             // Listen for click and send a PUT request
//             document.getElementById(pipId).addEventListener('click', async () => {
                
//                 console.log('button clicked');
                
        
//                 try {
//                     // Send the data to the PHP backend with fetch
//                     const response = await fetch("http://127.0.0.1:8000", {
//                     method: "DELETE",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     // Format the data as JSON. Pip id aquired from the Renderpips function that gets data from getPips function.
//                     body: JSON.stringify({ pipId: pipId }),
//                     });
                
//                     // Refetch data with the new pip added
//                     await refetchFunction();
        
                    
//                 } catch (error) {
        
//                     console.log(error)
                    
//                 }
//             })



//         }
        
    

// } 




