import webview
import os
import webbrowser

class API:
    def open_new_window(self):
        # Get the absolute path to the HTML file
        html_file_path = os.path.abspath('train_screens/tgv_tvm.html')
        # Open the HTML file in a new webview window
        webview.create_window("Extra Window", html_file_path)

    def open_github(self):
        # Open GitHub link in the system's default browser
        webbrowser.open('https://github.com/VaeluxV/DriversNexus-Python')

# Path to the HTML file for the main window
html_path = os.path.abspath("ui/index.html")

# Create the main window with the API for interactivity
window = webview.create_window("DriversNexus - Python", html_path, js_api=API())

# Start the webview loop
webview.start()