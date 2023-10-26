export function setupScrollHandler(contactIcons:any, zoomElement:any, heroContaierFixed:any) {
    const OPACITY_STEP = 0.1;
    const ZOOM_SPEED = 0.2;
    let opacity = 1;
    let zoom = 1;

    let lastScrollY = 0;
    const POSITION_TO_FIX_TEXT = 400;
    const POSITION_TO_APPEAR_TEXT = 100;

    function handleScroll(e:any) {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;

        console.log("scrollY", scrollY)
        console.log("deltaY", deltaY)

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
            heroContaierFixed.style.position = 'relative';
            heroContaierFixed.style.marginTop = `${scrollY}px`;
            heroContaierFixed.style.display = 'block';
        } else {
            heroContaierFixed.style.position = 'relative';
            heroContaierFixed.style.display = 'hidden';
        }

        zoomElement.style.transform = `scale(${zoom})`;
        zoomElement.style.opacity = opacity;

        lastScrollY = scrollY;

        if (scrollY <= POSITION_TO_APPEAR_TEXT) {
            heroContaierFixed.style.display = 'block';
        } else {
            heroContaierFixed.style.display = 'hidden';
        }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
        //window.removeEventListener('scroll', handleScroll);
    };
}
