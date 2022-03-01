const ytdl = require('ytdl-core');
const querystring = require('querystring')
exports.run = async (req, res) => {
    let related = [];
    let allVideos = require('../config/videos.json');
    let query = querystring.parse(req.url);
    let difficulty = query['/fetchRandom?difficulty'];
    let used = query.used;
    let videos;
    if (used && used.length > 0)
    videos = allVideos.videos.filter((v) => v.difficulty <= difficulty && v.difficulty >= difficulty - 0.2 && used.indexOf(v.series) === -1)
    else
    videos = allVideos.videos.filter((v) => v.difficulty <= difficulty && v.difficulty >= difficulty - 0.2)
    let video = videos[Math.floor(Math.random()* videos.length)];
    console.log(videos, difficulty)
    let audioUrl = await ytdl.getInfo(video.url);
    audioUrl = audioUrl.formats.filter((v) => v.mimeType.startsWith('audio'))[0].url
    related.push(getRelated(video, allVideos, related, difficulty)[0].series);
    related.push(getRelated(video, allVideos, related, difficulty)[0].series);  
        return {
        url: video.url,
        series: video.series,
        related: related,
        audioUrl: audioUrl
    }
}

function getRelated(video, videos, related, difficulty) {
    return videos.videos.filter((v) => v.difficulty <= difficulty && v.difficulty >= difficulty - 0.2 && v.series !== video.series && related.indexOf(v.series) === -1)
}