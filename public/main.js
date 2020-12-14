(() => {

    // Button plumbing
    let content = document.querySelector(".content");
    let buttons = document.querySelectorAll("button");

    // single state based load event (anything in the URL + more potentially
    // (which cannot be used when the URL is loaded directly))
    function loadView(state){
        content.innerHTML = state.pageName;
    }

    // set up listeners
    for(let button of buttons){
        button.addEventListener("click", (e) => {

            let pageName = e.target.textContent.toLowerCase();
            let state = {
                pageName
            };
            
            // dynamically load views
            window.history.pushState(state,
                "",
                "/" + pageName);

            loadView(state)
        })
    }

    // load view on page load
    let path = window.location.pathname.split("/").slice(1)[0];
    loadView({
        pageName: path
    })

    // handle navigation events
    window.onpopstate = function(event){
        loadView(event.state);
    };

})();