# Hangouts Fluid Userscript

This is a userscript to enhance [Google Hangouts](https://hangouts.google.com/)
as a [Fluid](http://fluidapp.com/) app, adding native OS X notifications.


## Usage

1. In your Hangouts Fluid app, open Window > Userscripts
1. Create a new script (left column plus sign), name it "Hangouts"
1. Add this URL pattern and enable: `*hangouts.google.com*`
1. Paste the contents of [script.js](script.js) into the text area
1. Reload Hangouts and enjoy!


## Known Issues

- First message when a new chat box is created may not notify
- Messages you send from other devices or windows will notify for the contact you're chatting with
- See [DEV-NOTES.md](DEV-NOTES.md) for a full list
