// SCROLL REVEAL

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

//Send Email
function sendEmail() {
    var params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        title: document.getElementById('title').value,
        message: document.getElementById('message').value,
    }
    
    const serviceID = "service_egrmikc";
    const templateID = "template_kpp2evs";
    
    emailjs.send(serviceID, templateID, params).then((res) => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("title").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent siccessfully");
    })
    .catch((err) => console.log(err));
}