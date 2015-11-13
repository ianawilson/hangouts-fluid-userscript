# Dev Notes

**As of Nov 10, 2015**

- each chat is an iframe with an id starting "gtn_"
- ".tk" holds message groups
- class="tL8wMe xAWnQc" holds individual messages
- high level class for your messages have class="pj"; their messages have class="Sn"


## Todo / Bugs

- figure out A) which variable is jQuery or B) how to include jQuery in a sane way
    - see this: http://stackoverflow.com/questions/2246901
- don't notify for your own messages when sent from another device/window
    - we can do this by matching whether or not a parent has class "Sn" (their message), but it looks least awful to do this with jQuery
- notify for first new message when a frame is created
- show a notification for "sent a picture" instead of nothing
- when there's a link, the notification says "undefined"
- when there's an emoji, the notification says "undefined"
- destroy notifications when the frame is focused
    - attach notification instances to the frame
    - close() notifications when a frame is focused (no longer green)
    - can probably use this for the unread count, too


## Nice to Have

- grab user-icon and set that for notification
- set unread count in badge
- clear unread count on read
- do we need to tear down (`MutationObserver.disconnect()`) when a frame is destroyed ??
- clean notification & unread count when read from another device


## Test Cases

- receive a message while app is in the background
    - should create a notification
    - should increment unread count
- send a message from account on another device/window
    - should not notify on message
    - should not increment unread count
- focus frame
    - should destroy these notifications
    - should remove unread count for these messages only
