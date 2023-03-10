import checkNumInputs from "./checkNumInputs";
import autoCloseModal from "./autoCloseModal";

const forms = (state) => {
    const form = document.querySelectorAll("form"),
        inputs = document.querySelectorAll("input");

    checkNumInputs("input[name='user_phone']");
    
    const message = {
        loading: "Загрузка данных",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    }

    const postData = async (url, data) => {
        document.querySelector(".status").textContent = message.loading;
        let result = await fetch(url, {
            method: "POST",
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        })
    }

    form.forEach(item => {
        item.addEventListener("submit", event => {
            event.preventDefault();

            let statusMessage = document.createElement("div");
                statusMessage.classList.add("status");
                item.appendChild(statusMessage);

            const formData = new FormData(item);
            if(item.getAttribute("data-calc") === "end"){
                for(let key in state){
                    formData.append(key, state[key]);
                }
            }

            postData("assets/server.php", formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        autoCloseModal("[data-modal]");
                        // Чистим объект 
                        Object.keys(state).forEach(key => delete state[key]);
                        console.log(state);
                    }, 5000);
                });
        })
    })
}

export default forms;
