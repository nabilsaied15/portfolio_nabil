window.addEventListener('scroll', function() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(skill => {
        const skillWidth = skill.getAttribute('style');
        if (skill.getBoundingClientRect().top < window.innerHeight) {
            skill.style.width = skillWidth;
        }
    });
});
