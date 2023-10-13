export function setupScrollHandler(contactIcons:any, zoomElement:any, heroContaierFixed:any) {
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
    const POSITION_TO_FIX_TEXT = 400;

    function handleScroll(e:any) {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;

        console.log(scrollY)

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

        if (scrollY <= POSITION_TO_FIX_TEXT) {
            lockScroll('enabled');
            heroContaierFixed.style.position = 'fixed';
            heroContaierFixed.style.top = '250';
            heroContaierFixed.style.display = 'block';
        } else {
            lockScroll('enabled');
            heroContaierFixed.style.position = 'fixed';
            heroContaierFixed.style.top = '250';
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
