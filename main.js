import {getPips, addPip} from './data.js';
import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";


// Create pips and display them in the DOM
const RenderPips = async () => {

    // Removes the elements from the DOM each time it is called.
    // I a new pip is added then it displays correctly instead of being shown on page reload, since it appended to the current element list.
    const pipContainer = document.getElementById('pipcontainer');
    pipContainer.innerHTML = '';

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

        // Create outer listitem
        const listItem = document.createElement('li');
        listItem.className = 'flex flex-col gap-2 border border-black bg-slate-100 rounded-2xl p-4 min-h-50'

         // Create inner div
        const innerdiv = document.createElement('div');
        innerdiv.className = 'flex justify-between';

        // Append inner div to space image and delete button
        listItem.appendChild(innerdiv)

        // Create user image
        const img = document.createElement('img');
        img.className = 'w-10 h-10 rounded-full bg-green-950 hover:translate-x-1 transition-transform';
        img.src = pip.userName
    
        // Create pip text
        const pipText = document.createElement('p');
        pipText.innerText = pip.pipText;

        listItem.appendChild(pipText)
    
        // Put together the whole pip html
        innerdiv.appendChild(img)
        

        // Create delete button
        // ONLY CREATE IF USERNAME == FELIX. This is the logged in user (simulated)
        // Includes method is used since data is a string containing the dicebear api url and the name "felix"
        if (pip.userName.toLowerCase().includes('felix')) {

            const deleteButton = document.createElement('button');
            deleteButton.innerText='Delete'
            deleteButton.className = 'h-fit p-1 border border-slate-400 cursor-pointer hover:bg-red-500 hover:text-white rounded-lg text-xs'
            innerdiv.appendChild(deleteButton)
        }

    
        // Append the whole pip to the pipcontainer in the html
        document.getElementById('pipcontainer').appendChild(listItem);

        // Stagger animation of pip cards. It renders with a 0 opacity and then the animation triggers after the elements are added to the DOM
        animate('.pipcontainer li', { opacity: [0, 1], y: [-20, 0] }, { delay: stagger(0.2) })

    })
}

// Run and create and render the pips to the DOM
RenderPips();

// Add a new pip. Handles user input from modal and the POST request. It also refetches the latests pips.
addPip(RenderPips);


// Create and show modal
document.getElementById('pipInputField').addEventListener('click', async () => {

    const modal = document.getElementById('modal');

    modal.classList.remove('hidden');

    // Animate the modal if it is no longer hidden with CSS
    if(modal.classList.contains('hidden') == false) {
        animate(modal, {scale: [0.8, 1]}, {ease: 'circOut'})
    }

    // Create a transparent overlay that lowers opacity on background UI and prevents interaction from user
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('hidden');
    
    
});



// Pip character counter
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