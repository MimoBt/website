
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry) => {

    if(entry.isIntersecting){
     entry.target.classList.add("show");
    }else{
      entry.target.classList.remove("show");
    }
  });
 
 });
 
 const hiddenElements = document.querySelectorAll(".hidden");

 hiddenElements.forEach((el) => observer.observe(el));



 let navbtn = document.querySelectorAll('.nav-button');

navbtn.forEach(link => {
  link.addEventListener('click', () => {
      document.getElementById('sidebar-active').checked = false; 
  });
});
 
 


