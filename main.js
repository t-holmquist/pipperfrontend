import {getPips} from './data.js';


// Create pips and display them in the html
const createAndRenderPips = async () => {

    // Get the data from the getPips fetching function from the PHP backend
    const data = await getPips();

    

    // Loop over data and add a pip for each array index
    // Could also be foreach syntax
    for (let i = 0; i < data.length; i++ ) {
        
        // Create outer div
        const outerDiv = document.createElement('div');
        outerDiv.className = 'flex flex-col gap-2 border border-black rounded-2xl p-4 h-60'

        // Create user image
        const img = document.createElement('img');
        img.className = 'w-10 h-10 rounded-full';
        img.src = data[i].userName

        // Create pip text
        const pipText = document.createElement('p');
        pipText.innerText = data[i].pipText;

        // Put together the whole pip html
        outerDiv.appendChild(img)
        outerDiv.appendChild(pipText)

        // Append the whole pip to the pipcontainer in the html
        document.getElementById('pipcontainer').appendChild(outerDiv);


    }


}

// Run the function
createAndRenderPips();


// Create and show modal
document.getElementById('pipInputField').addEventListener('click', async () => {

    // Check if modal already exists
    if (document.getElementById('modal')) {
        return;
    }
    
    const modal = `
        <div id="modal" class="absolute rounded-2xl p-8 bg-[#e8e6d7] border border-slate-500  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="flex flex-col gap-4"> 
        <h3 class="text-2xl font-bold">Create new pip</h3>
        <!-- Get user input from form -->
        <form method="post" class="flex flex-col gap-3">
            <label for="username">Your username</label>
            <input id="username" required name="username" class="border border-slate-500 p-1 rounded-md" type="text">
            <label for="piptext">What do you want to pip?</label>
            <textarea minlength="10" maxlength="255" id="piptext" required name="piptext" class="border border-slate-500 p-1 rounded-md min-h-40 min-w-70"></textarea>
            <button type="submit" class="bg-black text-white rounded-full py-1 px-2 hover:bg-slate-700 cursor-pointer">Create pip</button>
        </form>
        </div>
        </div>
        `

        const wrapper = document.createElement('div');

        wrapper.innerHTML = modal;

        document.body.appendChild(wrapper.firstElementChild);

        // Animate modal after it's added
        const { animate } = await import('https://cdn.jsdelivr.net/npm/motion@latest/+esm');
        const modalEl = document.getElementById('modal');
        if (modalEl) {
        animate(modalEl, { y: -10, });
        }

});

// Remove modal
if (document.getElementById('createPipButton')) {
    document.getElementById('createPipButton').addEventListener('click', () => {

    const modal = document.getElementById('modal');

    modal.remove();

});
}
