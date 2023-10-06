// scrollHandler.js
export function setupScrollHandler() {
    let url = window.location.pathname;
    url = url.slice(1, 1);

    const lockScroll = (option: any) => {
        console.log(url);
        if (option === 'enabled') {
            document.body.style.overflow = 'hidden';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.userSelect = 'auto';
        }
    };

    const zoomElement = (document.querySelector('.text-home') as HTMLElement) || null;
    const contactIcons = (document.querySelector('.contact-icons') as HTMLElement) || null;
    const OPACITY_STEP = 0.1;
    const ZOOM_SPEED = 0.2;
    let opacity = 1;
    let zoom = 1;

    function handleScroll(e: any) {
        if (window.pageYOffset <= 0) {
            lockScroll('enabled');
            zoomElement.style.display = `block`;
        }

        if (e.deltaY >= 0) {
            zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
            zoomElement.style.opacity = `${(opacity = opacity - OPACITY_STEP)}`;
            contactIcons.style.opacity = '0';
        } else {
            if (zoom + ZOOM_SPEED > 1.2) {
                zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
                zoomElement.style.opacity = `${(opacity = opacity + OPACITY_STEP)}`;
                contactIcons.style.opacity = '1';
            }
        }

        if (opacity <= 0) {
            lockScroll('disabled');
            zoomElement.style.display = `none`;
        }
    }

    window.addEventListener('wheel', handleScroll);
    lockScroll('enabled');

    return () => {
        window.removeEventListener('wheel', handleScroll);
        lockScroll('disabled');
    };
}
