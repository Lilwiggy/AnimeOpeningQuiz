let guessed = false;
let guessedCorrect = 0;
let guessedWrong = 0;
let guessedTotal = 0;
let totalScore = 0;
let difficulty = 1;
let used = [];

function verify(button) {
    guessed = true;
    guessedTotal++;
    let guess = button.textContent;
    let correct = localStorage.getItem('correct');
    used.push(correct);
    if (guess.toLowerCase() === correct.toLowerCase()) {
        guessedCorrect++;
        totalScore += parseInt(document.getElementById('score').textContent);
        if (guessedCorrect % 5 === 0 && difficulty !== 0.1) difficulty -= 0.1;
        Array.from(document.getElementsByTagName('button')).forEach((button) => {
           button.disabled = true;
           if (button.textContent.toLowerCase() === correct.toLowerCase())
           button.className = 'btn btn-success btn-lg hide';
           else
           button.className = 'btn btn-danger btn-lg hide';
        });
        alert(`YOU GOT IT WOOOO Total score: ${totalScore}`);
    } else {
        alert('nice goign dumbass you got it wrong');
        guessedWrong++;
    }
    setTimeout(() => {
        fetchSong();
    }, 5000)
}