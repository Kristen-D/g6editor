const isFullScreenSupported = () => {
    var docElm = document.documentElement;
    return docElm.requestFullscreen || docElm.webkitRequestFullScreen || docElm.mozRequestFullScreen;
}

/**
 * 全屏切换
 */
export const toggleFullscreen = () => {
    if (isFullScreenSupported()) {
        var fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
        if (!fullscreen) {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
}