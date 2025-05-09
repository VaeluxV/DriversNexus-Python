function sayHello() {
    window.pywebview.api.say_hello().then(response => {
        document.getElementById('response').innerText = response;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if (window.page === 'home') {
        document.getElementById('btn-settings')?.addEventListener('click', () => {
            window.location.href = 'settings.html';
        });
    }

    if (window.page === 'settings') {
        document.getElementById('btn-home')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    document.getElementById('btn-new-window')?.addEventListener('click', () => {
        if (window.pywebview) {
            window.pywebview.api.open_new_window();
        } else {
            alert('pywebview not available');
        }
    });
});
