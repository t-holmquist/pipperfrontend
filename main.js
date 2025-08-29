import {getPips} from './data.js';


// Create pips and display them in the DOM
const RenderPips = async () => {

    // Get the data from the getPips fetching function from the PHP backend
    const data = await getPips();
    
    // Loop over data and add a pip for each array index
    data.forEach((pip) => {

        // Create outer div
        const outerDiv = document.createElement('div');
        outerDiv.className = 'flex flex-col gap-2 border border-black rounded-2xl p-4 min-h-60'
    
        // Create user image
        const img = document.createElement('img');
        img.className = 'w-10 h-10 rounded-full bg-blue-900';
        img.src = pip.userName
    
        // Create pip text
        const pipText = document.createElement('p');
        pipText.innerText = pip.pipText;
    
        // Put together the whole pip html
        outerDiv.appendChild(img)
        outerDiv.appendChild(pipText)
    
        // Append the whole pip to the pipcontainer in the html
        document.getElementById('pipcontainer').appendChild(outerDiv);

    })
}

// Run and create and render the pips to the DOM
RenderPips();


// Create and show modal
document.getElementById('pipInputField').addEventListener('click', async () => {

    const modal = document.getElementById('modal');

    modal.classList.remove('hidden');
    
});

// Remove modal
if (document.getElementById('createPipButton')) {
    document.getElementById('createPipButton').addEventListener('click', () => {

    const modal = document.getElementById('modal');

    modal.classList.add('hidden');

});
}
