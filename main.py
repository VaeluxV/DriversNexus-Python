import webview
import os
import webbrowser

class API:
    def open_new_window(self):
        # Create HTML content for the new window
        html = "<html><body style='background:#1e1e2f;color:white;'><h1 style='text-align:center;'>New Window</h1></body></html>"
        # Create a new window for the new content
        webview.create_window("Extra Window", html=html)

    def open_github(self):
        # Open GitHub link in the system's default browser
        webbrowser.open('https://github.com/VaeluxV/DriversNexus-Python')

# Path to the HTML file for the main window
html_path = os.path.abspath("ui/index.html")

# Create the main window with the API for interactivity
window = webview.create_window("DriversNexus - Python", html_path, js_api=API())

# Start the webview loop
webview.start()
