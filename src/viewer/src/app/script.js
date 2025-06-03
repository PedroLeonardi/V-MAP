document.querySelectorAll('.titulo').forEach(form => {
    form.addEventListener('mousemove', (e) => {
      const rect = form.getBoundingClientRect(); 
      const formWidth = rect.width;
      const formHeight = rect.height;
  
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      const rotateX = ((mouseY / formHeight) - 0.3) * 30; 
      const rotateY = ((mouseX / formWidth) - 0.3) * -30; 
  
      form.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; 
    });
  
    form.addEventListener('mouseleave', () => {
      form.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
  