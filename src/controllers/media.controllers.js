

function togglePlay(video) {
    video.current.paused ? video.current.play() : video.current.pause()
}

export const mediaService = {
    togglePlay
}