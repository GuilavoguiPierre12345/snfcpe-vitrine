
export function getUrlOrigin() {
    const localOrigin = ['http://127.0.0.1:5500', 'http://localhost:80/', 'http://127.0.0.1:80/'];
    let origin = document.location.origin;
    const baseUrl = localOrigin.includes(origin) ? 'http://localhost/snfcpe/' : 'backend_remote_domain';
    return baseUrl;
}



