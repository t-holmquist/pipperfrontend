import {getPips, addPip, deletePip} from './data.js';
import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// Create pips and display them in the DOM
const RenderPips = async (offset) => {

    // Get the data from the getPips fetching function from the PHP backend
    const data = await getPips(offset);

    // Get show more button
    const nextoffsetelement = document.getElementById('nextoffset')

    // Get next_offset value from the server and set to the hidden div
    let next_offset = data.pagination['next_offset']
    nextoffsetelement.innerText = next_offset;

    // Pip array to store the pips so that they can be animated later. It is overwritten each time the function is called
    // to avoid animating the old ones
    let newPips = [];

    
    // Loop over data and add a pip for each array index
    data.data.forEach((pip) => {

        // Make a clone of the pip template
        const piptemplate = document.getElementById('piptemplate');
        
        const clon = piptemplate.content.cloneNode(true);

        // Extract the real username from the dicebear api url
        const url = pip.userName;
        const urlParams = new URLSearchParams(new URL(url).search); // Gets the query string and returns a url object
        const username = urlParams.get('seed');

        // Convert the timestamp to a more userfriendly format before setting text to the DOM
        const timestamp = pip.created_at;
        const date = new Date(timestamp);

        // User-friendly date and time
        const userFriendlyDatetime = date.toLocaleString('da-DK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });

        // Get alle the elements and add the information from the pip array
        clon.querySelector('.name').innerText = username
        clon.querySelector('.userimage').src = pip.userName
        clon.querySelector('.date').innerText = userFriendlyDatetime
        clon.querySelector('.piptext').innerText = pip.pipText

        // Get the root element of the template WHICH EXISTS IN THE DOM - clon does not because it is a document fragment and not added to the DOM yet.
        // Clon cannot be removed with the .remove() function, since it does not have that function.
        const pipElement = clon.querySelector('li');
       

        // ONLY adds delete functionality if username == felix. This is the logged in user (simulated)
        // Includes method is used since data is a string containing the dicebear api url and the name "felix"
        if (pip.userName.toLowerCase().includes('felix')) {

            // Delete button event listenere - after the button is created and exists in the DOM.
            clon.querySelector('.delete').addEventListener('click', async () => {

                // Delete the specific pip in the DB
                await deletePip(pip.pipId);

                // Delete from the browser DOM also to improve UX (it is already deleted in DB and will not show on page reload)
                pipElement.remove()
                
            });

        } else {
            // Hides the delete buttons w   hen the user is not "Felix"
            clon.querySelector('.delete').classList.add('hidden')
            
        }


        // Append the new clon to the container of the pip
        document.getElementById('pipList').appendChild(clon);

        // Store reference to the newly added pip element
        newPips.push(pipElement);


        // Stagger animation of pip cards. It renders with a 0 opacity and then the animation triggers after the elements are added to the DOM
        // The animate function gets html elements and adjusts properties, but doesn't handle where the elements are rendered to the DOM
        animate(newPips, { opacity: [0, 1], y: [-20, 0] }, { delay: stagger(0.2) })

    })


}

// Initial pageload renderes the first 5 pips (offset 0)
RenderPips(0);

// Get the hidden offset element and showmore button
const nextoffsetelement = document.getElementById('nextoffset')
const showMoreButton = document.getElementById('showmorebutton')

// Create eventlistener on button to render pips with the new offset value each time. Renderpips then makes sure to update the offset value next
// time the button is clicked.
showMoreButton.addEventListener('click', () => {

    // Read the offset value from the hidden div
    let next_offset = nextoffsetelement.innerText
    RenderPips(next_offset)
})


// Add a new pip. Handles user input from modal and the POST request. It also refetches the latest pip.
addPip();




// Create and show modal
document.getElementById('pipInputField').addEventListener('click', async () => {

    const modal = document.getElementById('modal');

    modal.classList.remove('hidden');

    // Animate the modal if it is no longer hidden with CSS
    if(modal.classList.contains('hidden') == false) {
        animate(modal, {scale: [0.8, 1]})
    }

    // Create a transparent overlay that lowers opacity on background UI and prevents interaction from user
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');
    
});


// Pip character counter and disabled submit button logic
const textarea = document.getElementById('piptext');

textarea.addEventListener('input', (event) => {

    const counter = document.getElementById('charactercounter');

    let currentText = event.target.value;

    // Disable create button if text length is less than 10 characters. Improves UX.
    if (currentText.length < 3) {
        document.getElementById('createPipButton').setAttribute('disabled', '');
    } else {
        document.getElementById('createPipButton').removeAttribute('disabled', '');
    }

    // If length >= 255 add red text color
    if(currentText.length >= 255) {
        counter.classList.add('text-red-500')
        counter.innerText= `Pip length (255 letters max): ${currentText.length}`;
    } else {

        // Removes the red color if character length is lower than 255
        counter.classList.remove('text-red-500');
        counter.innerText= `Pip length (255 letters max): ${currentText.length}`;
    }

  });


// Render trending pip tags
const renderPipTags = () => {

    // Array of piptags
    const pipTags = [
        {id: 1, title: 'Home automation', numberOfPips: '87.2k'},
        {id: 2, title: 'Ascii art', numberOfPips: '30.7k'},
        {id: 3, title: 'Minimalism', numberOfPips: '20.1k'},
        {id: 4, title: 'Sunglasses', numberOfPips: '5.3k'},
        {id: 5, title: 'Running shoes', numberOfPips: '68.9k'},
        {id: 6, title: 'UX design', numberOfPips: '34.3k'},
    ];

    pipTags.forEach((pipTag) => {

        // Make a clone of the pip tag template
        const pipTagTemplate = document.getElementById('pipTagTemplate');
        const clon = pipTagTemplate.content.cloneNode(true);

        // Get alle the elements and add the information from the piptags array
        clon.querySelector('.title').innerText = pipTag.title
        clon.querySelector('.numberOfPips').innerText = pipTag.numberOfPips

        // Append the new clon to the container of the pip tags
        document.getElementById('pipTagContainer').appendChild(clon);


    })
}

renderPipTags();



// Render trending pip tags
const renderFollowPeople = () => {

    // Array of persons
    const persons = [
        {id: 1, name: 'Berney Cranston', handle: '@berneycranston', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Aneka'},
        {id: 2, name: 'Jane Doe', handle: '@janedoe', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Riley'},
        {id: 3, name: 'Santa Claus', handle: '@santaclaus', avatar: 'https://api.dicebear.com/9.x/personas/svg?seed=Alexander'},
        
    ];

    persons.forEach((person) => {

        // Make a clone of the person template
        const persontemplate = document.getElementById('persontemplate');
        const clon = persontemplate.content.cloneNode(true);
        
        // Get alle the elements and add the information from the persons array
        clon.querySelector('.avatar').src = person.avatar
        clon.querySelector('.name').innerText = person.name
        clon.querySelector('.handle').innerText = person.handle
        const followbutton = clon.querySelector('.followbutton');

        // Followed state of button
       followbutton.addEventListener('click', () => {
        
        // Update css and text on click 
        followbutton.className = 'bg-green-200 rounded-lg py-1 px-2 text-sm hover:bg-slate-300 cursor-pointer'
        followbutton.innerText = 'Followed'

       })

        // Append the new clon to the container of the pip tags
        document.getElementById('followpersoncontainer').appendChild(clon);

        
        

    })
}

renderFollowPeople();