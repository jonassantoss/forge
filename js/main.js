const newCard = document.querySelector('.new-card');
const modal = document.querySelector('.modal__overlay');
const closeModal = document.querySelector('.close-button')

newCard.addEventListener('click', () => {
    modal.style.display = 'flex'
})

closeModal.addEventListener('click', () => {
    modal.style.display = 'none'
})