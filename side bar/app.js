const side = document.querySelector('.sidebar')
const btn = document.querySelector('.toggleBtn')

btn.addEventListener('click',()=>{
  side.classList.toggle('view')
})