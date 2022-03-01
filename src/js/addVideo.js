const fs = require('fs');
const path = require('path');
exports.run = async (req, res) => {
    let videos = require('../config/videos.json');
    videos.videos.push(req.body)
    let json = JSON.stringify(videos, null, 2);
    console.log(json)
    fs.writeFileSync(`${path.join(__dirname)}/../config/videos.json`, json);
    console.log(req.body);
    return {r: 'hi'}
}