export function isImageValid(src?: string | any) {
    if (!src || typeof src !== 'string') {
        return Promise.resolve(false);
    }

    return new Promise(resolve => {
        const img = document.createElement('img');
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
        img.src = src;
    });
}
