export function setupScrollHandler(contactIcons:any, zoomElement:any) {
    const lockScroll = (option = 'disabled') => {
        if (option === 'enabled') {
            document.body.style.overflow = 'hidden';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.userSelect = 'auto';
        }
    };

    const OPACITY_STEP = 0.01;
    const ZOOM_SPEED = 0.02;
    let opacity = 1;
    let zoom = 1;

    let lastScrollY = 0;

    function handleScroll(e:any) {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;

        if (deltaY > 0) {
            zoom += ZOOM_SPEED;
            opacity -= OPACITY_STEP;
            if (zoom > 1.2) {
                zoom = 1.2;
                opacity = 0;
            }
            contactIcons.style.opacity = 0;
        } else if (deltaY < 0) {
            zoom -= ZOOM_SPEED;
            opacity += OPACITY_STEP;
            if (zoom < 1) {
                zoom = 1;
                opacity = 1;
            }
            contactIcons.style.opacity = 1;
        }

        zoomElement.style.transform = `scale(${zoom})`;
        zoomElement.style.opacity = opacity;

        lastScrollY = scrollY;

        if (scrollY <= 0) {
            lockScroll('enabled');
            zoomElement.style.display = 'block';
        } else {
            lockScroll('disabled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    lockScroll('enabled');

    return () => {
        window.removeEventListener('scroll', handleScroll);
        lockScroll('disabled');
    };
}
