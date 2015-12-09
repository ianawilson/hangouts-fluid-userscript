(function() {

    // this is adapted from http://stackoverflow.com/a/3550261
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            // call the callback with a noConflict jQuery object
            script.textContent = "(" + callback.toString() + ")(jQuery.noConflict(true));";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // main function with a scoped jQuery object
    function main($) {

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
                            var record = records[i];
                            var $node = $(record.target);

                            // "tL8wMe xAWnQc" is a message div
                            // a parent with class "Sn" means it's their message (not ours)
                            if ($node.hasClass("tL8wMe") && $node.hasClass("xAWnQc") && $node.parents(".Sn").length > 0) {
                                var notification = new Notification(name, {body: $node.text()});
                            }

                            // "ZLer6" is an image div
                            // a parent with class "fHBzMd" and *without* "DKLL9c" means it's their image (not ours)
                            else if ($node.hasClass("ZLer6") && ! $node.parents(".fHBzMd").hasClass("DKLL9c")) {
                                var notification = new Notification(name, {body: "sent an image"});
                            }
                        }
                    });
                    frame._fluidObserver.observe(frame.contentWindow.document.querySelector('.hN.so.Ij'), {childList: true, subtree: true});
                }
            }
        }

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
    }

    // load jQuery and execute the main function
    addJQuery(main);
})();
