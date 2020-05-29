function Automaton() {
    this.states = ["q1"];
    this.currentState = "q1";
}

Automaton.prototype.readCommands = function (commands) {
    for (let index = 0; index < commands.length; index++) {
        const element = commands[index];

        if (this.currentState == "q1") {
            if (element == "1") {
                this.currentState = "q2";
            }
            this.states.push(this.currentState);
        } else  if (this.currentState == "q2") {
            if (element == "0") {
                this.currentState = "q3";
            }
            this.states.push(this.currentState);
        } else if (this.currentState == "q3") {
            if (element == "1" || element == "0") {
                this.currentState = "q2";
            }
            this.states.push(this.currentState);
        }
    }
    return this.currentState == "q2";
}

var myAutomaton = new Automaton();