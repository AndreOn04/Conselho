document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.text-reveal-marker');
    let observer;

    function initObserver(isMobile) {
        if(observer) observer.disconnect();

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -20% 0px',
            threshold: 0.1
        });

        elements.forEach(el => observer.observe(el));
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");

    function handleScreenChange (e) {
        initObserver(e.matches);
    }

    handleScreenChange(mediaQuery);

    mediaQuery.addEventListener('change', handleScreenChange);
})