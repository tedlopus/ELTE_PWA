const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// Event listener for install button on the window
window.addEventListener('beforeinstallprompt', (event) => {

    // store the triggered event
    window.deferredPrompt = event;

    // remove the hidden class and show the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
// event listener for the click on the install button
butInstall.addEventListener('click', async () => {

    // store the promptevent
    const promptEvent = window.deferredPrompt;

    //if not the promptevent then exit the function
    if (!promptEvent) {
        return;
    }

    // shows the install prompt
    promptEvent.prompt();

    // reset the deferred prompt variable since it can only be used once
    window.deferredPrompt = null;

    // add the hidden class and hide the prompt
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
// event listener for once the app has installed
window.addEventListener('appinstalled', (event) => {

    //clear the prompt
    window.deferredPrompt = null;
});
