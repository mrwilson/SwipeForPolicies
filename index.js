document.addEventListener('DOMContentLoaded', function () {
    var stack;
    var config = {
      allowedDirections: [gajus.Swing.Card.DIRECTION_LEFT, gajus.Swing.Card.DIRECTION_RIGHT]
    };

    window._sfp = {
        score: {
            left: 0,
            right: 0
        }
    }

    stack = gajus.Swing.Stack(config);

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

        var score = window._sfp.score;
        e.throwDirection === -1
            ? score.left++
            : score.right++;

        e.target.parentNode.removeChild(e.target);
        document.getElementById("answer").innerText = "You voted Left: "+score.left+", Right: "+score.right;
    });
});