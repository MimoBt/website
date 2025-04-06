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
 


// Form submission handling

  
    
   
document.getElementById("contactForm").addEventListener('submit', function(e) {
    e.preventDefault();
    
    const contactForm = this; // Use 'this' to refer to the form
    const formData = new FormData(contactForm);
    
    // Convert FormData to JSON
    const formDataJson = Object.fromEntries(formData.entries());
    
    fetch('/process-contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataJson)
    })
    .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            // If not OK, try to parse the error response
            return response.json().then(errorData => {
                console.error('Server error response:', errorData);
                throw new Error(errorData.message || 'Server responded with an error');
            });
        }
        
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
        
        if (data.success) {
            // Display the popup if email was sent successfully
            popup('show');
            contactForm.reset();
        } else {
            // If not successful, show an alert with the specific message
            throw new Error(data.message || "There was an error submitting your form.");
        }
    })
    .catch(error => {
        console.error('Complete Error Details:', error);
        
        // Differentiate between different types of errors
        if (error.message.includes('Failed to fetch')) {
            alert("Network error. Please check your internet connection.");
        } else {
            alert(error.message || "An unexpected error occurred. Please try again.");
        }
    });
});

function popup(action = 'show') {
    const popUp = document.querySelector('.pop-up');
    const popUpOverlay = document.querySelector('.pop-up-overlay');
    
    if (popUp && popUpOverlay) {
        if (action === 'show') {
            popUp.classList.add('active');
            popUpOverlay.classList.add('active');
        } else if (action === 'hide') {
            popUp.classList.remove('active');
            popUpOverlay.classList.remove('active');
        }
    } else {
        console.error('Popup or overlay element not found');
    }
}

// Add event listener for dismiss button
document.addEventListener('DOMContentLoaded', () => {
    const dismissBtn = document.getElementById('dismiss-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => popup('hide'));
    } else {
        console.error('Dismiss button not found');
    }
});
