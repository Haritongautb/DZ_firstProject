
const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector),
                windows = document.querySelectorAll("[data-modal]");

        trigger.forEach(item => {
            item.addEventListener("click", (event) => {
                if(event.target){
                    event.preventDefault();
                }
                
                if(item.classList.contains("popup_calc_button") || item.classList.contains("popup_calc_profile_button")){
                    const modalCalcFirst = document.querySelector(".popup_calc"),
                        modalCalcSecond = document.querySelector(".popup_calc_profile");

                        // Проверяем находимся ли мы в первой модалке. Если да, то проверяем данные объекта modalState. Если ничгео не заполнено, то снова открываем только эту модалку
                    if(window.getComputedStyle(modalCalcSecond, null).getPropertyValue("display") == "none"){
                        if(state.width === "" || state.width == null || state.height === "" || state.height == null|| state.form === "" || state.form == null){
                            // Функция создана, для того, чтобы уменьшить код. Эта функция просто открывает текущую модалку.
                            failResult(".popup_calc", "[data-modal]");
                        } else {
                            windows.forEach(item => {
                                item.style.display = "none";
                            })

                            modal.style.display = "block";
                            document.body.style.overflow = "hidden";
                            // document.body.classList.add('modal-open');
                        }
                    } else {
                        if(state.type === "" || state.type == null || state.profile === "" || state.profile == null){
                            failResult(".popup_calc_profile", "[data-modal]");
                        } else {
                            windows.forEach(item => {
                                item.style.display = "none";
                            })

                            modal.style.display = "block";
                            document.body.style.overflow = "hidden";
                            // document.body.classList.add('modal-open');
                        }
                    }
                } else {
                    console.log("Next");
                    windows.forEach(item => {
                        item.style.display = "none";
                    })

                    modal.style.display = "block";
                    document.body.style.overflow = "hidden";
                    // document.body.classList.add('modal-open');
                }
            });

        });

        close.addEventListener("click", () => {

            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener("click", (event) => {

            if(event.target && event.target === modal && closeClickOverlay){

                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time){
        setTimeout(() => {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
        }, time);
    }

    function failResult(modalSelector, modalsSelector){
        const modal = document.querySelector(modalSelector),
            windows = document.querySelectorAll(modalsSelector);

        windows.forEach(item => {
            item.style.display = "none";
        })

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModal(".phone_link", ".popup", ".popup .popup_close");
    bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
    bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
    bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);
    showModalByTime(".popup", 1600000);
};

export default modals;
