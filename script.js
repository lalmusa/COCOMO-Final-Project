//Calculator class to calculate all necessary COCOMO values
class COCOMOCalculator {
    //constructor
    constructor(kloc, type, eaf) {
        this.kloc = kloc;
        this.type = type;
        this.eaf = eaf;
    }

    //Intermediate COCOMO constants for a, b, c, d
    getConstants() {
        if (this.type === "organic") return { a: 3.2, b: 1.05, c: 2.5, d: 0.38 };
        if (this.type === "semi") return { a: 3.0, b: 1.12, c: 2.5, d: 0.35 };
        return { a: 2.8, b: 1.20, c: 2.5, d: 0.32 }; //Embedded
    }

    //Effort applied in Person-Months
    //E = a * (KLOC)^(b)
    calculateEffort() {
        let { a, b } = this.getConstants();
        return a * Math.pow(this.kloc, b) * this.eaf;
    }

    //Development time in months
    //Tdev = c(E)^(d)
    calculateTime(effort) {
        let {c , d} = this.getConstants();
        return c * Math.pow(effort, d);
    }

    //Persons required = E / Tdev
    calculateTeamSize(effort, time) {
        return effort / time;
    }
}
//Function to pull values entered on the tool and apply them for the calculator class 
function calculate() {
    let kloc = parseFloat(document.getElementById("kloc").value);
    let type = document.getElementById("type").value;

    //IDS for EAFs
    let reliability = parseFloat(document.getElementById("reliability").value);
    let complexity = parseFloat(document.getElementById("complexity").value);
    let performance = parseFloat(document.getElementById("performance").value);
    let data = parseFloat(document.getElementById("data").value);
    let memory = parseFloat(document.getElementById("memory").value);
    let acap = parseFloat(document.getElementById("acap").value);
    let tool = parseFloat(document.getElementById("tool").value);
    let volatility = parseFloat(document.getElementById("volatility").value);
    let schedule = parseFloat(document.getElementById("schedule").value);
    let pcap = parseFloat(document.getElementById("pcap").value);
    let modp = parseFloat(document.getElementById("modp").value);

    //EAF is the main difference between basic & intermediate COCOMO
    let EAF = reliability * complexity * performance * data * memory * acap * tool * volatility * schedule * pcap * modp;

    // Create object
    let calculator = new COCOMOCalculator(kloc, type, EAF);

    let effort = calculator.calculateEffort();
    let time = calculator.calculateTime(effort);
    let team = calculator.calculateTeamSize(effort, time);

    document.getElementById("effort").innerText = effort.toFixed(2);
    document.getElementById("time").innerText = time.toFixed(2);
    document.getElementById("team").innerText = team.toFixed(2);
}
//written for the help button at the bottom of the page
function showHelp() {
    alert(
        "Intermediate COCOMO Estimation Assistant:\n\n" +
        "Steps:\n" +
        "1. Enter KLOC (kilo lines of code)\n" +
        "--KLOC is the estimated size of the final product in lines of code. This value can be estimated using historical team data or other styles of estimation.\n\n" +
        "2. Select project type\n" +
        "--Organic - The development team is small, requirements are well understood\n" +
        "--Semi-Detached - Medium size development team; Team Member experience is varied.\n" +
        "--Embedded - The project requires a high amount of complexity, creativity, and team experience.\n\n" +
        "3. Answer the dropdown questions to determine the cost driver values\n" +
        "*Software tools refer to any software used to aid in completing some aspects of the final project, these often help speed up development.\n\n" +
        "4. Click 'Calculate Effort' to see results!\n" +
        "NOTE: Effort (Person-Months): This represents the total work required if a single person did all the work on their own. "
    );
}
