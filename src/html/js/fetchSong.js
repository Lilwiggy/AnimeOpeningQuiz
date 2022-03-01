function fetchSong() {
    guessed = false;
    let string = '';
    if (used.length > 0) {
       used.forEach((series) => {
          string += `&used=${series}`
       });
    }
    fetch(`/fetchRandom?difficulty=${difficulty}${string}`).then((d) => d.json()).then((d) => {
       Array.from(document.getElementsByTagName('button')).forEach((button) => {
           button.disabled = false;
           button.className = 'btn btn-dark btn-lg hide';
        });
 let right = Math.floor(Math.random()* 3) + 1;
 document.getElementById(right.toString()).textContent = d.series;
 localStorage.setItem('correct', d.series);
 document.getElementById('score').innerHTML = '100';
 let replace = document.getElementById('replace');
 if (replace)
 replace.innerHTML = `<audio autoplay controls id='audio'>
 <source src='${d.audioUrl}' id="audio" type="audio/mpeg">
 </audio>`;
 else
 document.getElementById('audio').src = d.audioUrl;
 let audio = document.getElementById('audio');
 audio.volume = 0.2;
 switch (right) {
 case 1:
 document.getElementById("2").textContent = d.related[0];
 document.getElementById("3").textContent = d.related[1];
 break;
 case 2:
 document.getElementById("1").textContent = d.related[0];
 document.getElementById("3").textContent = d.related[1];
 break;
 case 3:
 document.getElementById("1").textContent = d.related[0];
 document.getElementById("2").textContent = d.related[1];
 break;
 }
 let thing = 0;
 audio.ontimeupdate = (event) => {
     if (guessed) return;
     thing++;
    if (thing % 3 !== 0) return;
    if (document.getElementById('score').textContent === '0') {
            clearInterval(interval);
            return;
        }
 document.getElementById('score').textContent = document.getElementById('score').textContent - 1;
 }
 });
}