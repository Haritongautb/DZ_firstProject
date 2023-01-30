
const autoCloseModal = (modalSelector) => {
    const modal = document.querySelectorAll(modalSelector);
    modal.forEach(item => {
        item.style.display = "none";
    })

    document.body.style.overflow = "";
}

export default autoCloseModal;