import {getPips} from './data.js';
import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";


// Create pips and display them in the DOM
const RenderPips = async () => {

    // Get the data from the getPips fetching function from the PHP backend
    const data = await getPips();

    // If no data render skeleton loading UI
    if (!data) {

        const skeletons = [0, 1, 2, 3, 5]

        skeletons.forEach((pip) => {

        // Create outer div
        const outerDiv = document.createElement('div');
        outerDiv.className = 'flex flex-col gap-2 bg-slate-300 rounded-2xl p-4 min-h-50 shadow-sm animate-pulse'
    
        // Append the whole pip to the pipcontainer in the html
        document.getElementById('pipcontainer').appendChild(outerDiv);

    })
    }

    
    // Loop over data and add a pip for each array index
    data.forEach((pip) => {

        // Create outer div
        const outerListItem = document.createElement('li');
        outerListItem.className = 'flex flex-col gap-2 border border-black bg-slate-100 rounded-2xl p-4 min-h-50'
    
        // Create user image
        const img = document.createElement('img');
        img.className = 'w-10 h-10 rounded-full bg-green-950 hover:translate-x-1 transition-transform';
        img.src = pip.userName
    
        // Create pip text
        const pipText = document.createElement('p');
        pipText.innerText = pip.pipText;
    
        // Put together the whole pip html
        outerListItem.appendChild(img)
        outerListItem.appendChild(pipText)
    
        // Append the whole pip to the pipcontainer in the html
        document.getElementById('pipcontainer').appendChild(outerListItem);

        // Stagger animation of pip cards. It renders with a 0 opacity and then the animation triggers after the elements are added to the DOM
        animate('.pipcontainer li', { opacity: [0, 1], y: [30, 0] }, { delay: stagger(0.2) })

    })
}

// Run and create and render the pips to the DOM
RenderPips();


// Create and show modal
document.getElementById('pipInputField').addEventListener('click', async () => {

    const modal = document.getElementById('modal');

    modal.classList.remove('hidden');

    // Create a transparent overlay that lowers opacity on background UI and prevents interaction from user
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');
    
    
});

// Remove modal
if (document.getElementById('createPipButton')) {
    document.getElementById('createPipButton').addEventListener('click', () => {

    const modal = document.getElementById('modal');

    modal.classList.add('hidden');


    // Removes transparent overlay that lowers opacity on background UI and prevents interaction from user
    const overlay = document.getElementById('overlay');
    overlay.classList.add('hidden');

});
}
