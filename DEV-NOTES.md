# Dev Notes

**As of Nov 10, 2015**

- each chat is an iframe with an id starting "gtn_"
- ".tk" holds message groups
- class="tL8wMe xAWnQc" holds individual messages


## Todo

- notify for first new message when a frame is created
- don't notify for your own messages when sent from another device/window


## Nice to Have

- grab user-icon and set that for notification
- set unread count in badge
- clear unread count on read
- probably need to tear down (`MutationObserver.disconnect()`) when a frame is destroyed ??
- clean notification & unread count when read from another device
