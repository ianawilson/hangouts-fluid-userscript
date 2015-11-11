(function() {
    // Watch for new elements in the body
    var parentObserver = new MutationObserver(function(records) {
        for (var i in records) {
            var record = records[i];
            for (var j = 0; j < record.addedNodes.length; j++) {
                var node = record.addedNodes.item(j);
                // There seems to always be a spare "shiv_preld" sitting around, which new chats are placed into
                // If we've added another shiv "preload" element, probably we've initialized a new chat frame
                if (node.id.startsWith("shiv_preld_")) {
                    scanForFrames();
                }
            }
        }
    });

    parentObserver.observe(document.body, {childList:true});
})();

function scanForFrames() {
    // chat frame ids start with "gtn_"
    var frames = document.querySelectorAll('iframe[id^=gtn_]');
    for (var i = 0; i < frames.length; i++) {
        var frame = frames.item(i);

        // If we're not already observing on this frame
        if (! frame.hasOwnProperty("_fluidObserver")) {
            // Name is in class="Ob2Lud RE EIhiV OxDpJ"
            var nameNode = frame.contentWindow.document.querySelector(".Ob2Lud.RE.EIhiV.OxDpJ");
            var name = nameNode.textContent.split(" ")[0];

            // add the observer to "_fluidObserver" on the frame
            frame._fluidObserver = new MutationObserver(function(records) {
                for (var i in records) {
                    record = records[i];
                    // "tL8wMe xAWnQc" is a message div
                    if (record.target.className == "tL8wMe xAWnQc") {
                        var notification = new Notification(name, {body: record.addedNodes[0].data});
                    }
                }
            });
            frame._fluidObserver.observe(frame.contentWindow.document.querySelector('.hN.so.Ij'), {childList: true, subtree: true});
        }
    }
}
