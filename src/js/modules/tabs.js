const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "block") => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = "none";
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showtabContent(index = 0) {
        content.item(index).style.display = display;
        tab.item(index).classList.add(activeClass);
    }

    hideTabContent();
    showtabContent();


    header.addEventListener("click", event => {
        const clickedPlace = event.target;
        if(clickedPlace && (clickedPlace.classList.contains(tabSelector.replace(/\./gi, "")) || 
            clickedPlace.parentNode.classList.contains(tabSelector.replace(/\./gi, "")))) {
            tab.forEach((item, index) => {
                if(item === clickedPlace || clickedPlace.parentNode === item){
                    hideTabContent();
                    showtabContent(index);
                }
            })
        }
    })

}

export default tabs;