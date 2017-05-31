document.addEventListener('DOMContentLoaded', function () {
    var stack;
    window._sfp = {
        score: {
            ukip: 0,
            green: 0
        },
        questions: {
            "trees" : {
                score: {
                    ukip: [0, 20],
                    green: [100, 0]
                }
            },
            "eu" : {
                score: {
                    ukip: [100, 0],
                    green: [0, 60]
                }
            }
        }

    }

    stack = gajus.Swing.Stack();

    [].forEach.call(document.querySelectorAll('.stack li.question'), function (targetElement) {
        var card = stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
        targetElement.querySelector('.answers .no').onclick = function() {
            card.throwOut(1, 20);
        };
        targetElement.querySelector('.answers .yes').onclick = function() {
            card.throwOut(-1, -20);
        };
    });

    stack.on('dragmove', function(e) {
        if (e.throwOutConfidence < 0.3 || !e.target.parentNode) return;

        var question = window._sfp.questions[e.target.id];
        console.log(e.throwDirection);

        Object.keys(question.score).forEach(function(a) {
            window._sfp.score[a] += question.score[a][e.throwDirection === -1 ? 0 : 1];
        });

        e.target.parentNode.removeChild(e.target);
        document.getElementById("answer").innerText = "You voted Ukip: "+window._sfp.score.ukip+", Greens: "+window._sfp.score.green;
    });
});