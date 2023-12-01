const parseDurationToMilliseconds = (durationString: string) => {
    const match = durationString.match(/^(\d+)([smhd])$/);

    if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2];

        switch (unit) {
            case 's':
                return value * 1000;
            case 'm':
                return value * 60 * 1000;
            case 'h':
                return value * 60 * 60 * 1000;
            case 'd':
                return value * 24 * 60 * 60 * 1000;
            default:
                return 0;
        }
    }
    return 0;
}


export default parseDurationToMilliseconds;