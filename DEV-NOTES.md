# Dev Notes

**As of Nov 10, 2015**

- each chat is an iframe with an id starting "gtn_"
- ".tk" holds message groups
- class="tL8wMe xAWnQc" holds text messages
    - high level class for ours: "pj"
    - high level class for theirs "Sn"
- class="ZLer6" holds img messages (including stickers)
    - high level class for ours: "fHBzMd DKLL9c"
    - high level class for theirs: "fHBzMd" (missing "DKLL9c")



## Todo / Bugs

- notify for only first new message when a frame is created
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
