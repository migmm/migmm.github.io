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
            heroContaierFixed.style.position = 'fixed';
            heroContaierFixed.style.top = '250px'; // You missed 'px' here
            heroContaierFixed.style.display = 'block';
        } else {
            heroContaierFixed.style.position = 'relative'; // Change to relative to allow normal flow
            heroContaierFixed.style.top = '0';
            heroContaierFixed.style.display = 'none'; // Hide the fixed container
        }

        zoomElement.style.transform = `scale(${zoom})`;
        zoomElement.style.opacity = opacity;

        lastScrollY = scrollY;

        if (scrollY <= POSITION_TO_APPEAR_TEXT) {
            // Show the text when scrollY is 100 or less
            heroContaierFixed.style.display = 'block';
        } else {
            // Hide the text when scrollY is more than 100
            heroContaierFixed.style.display = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}
