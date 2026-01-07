const createScratchCard = (canvasId, color) => {
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext("2d");

    const init = () => {
        context.fillStyle = color;
        context.fillRect(0, 0, 150, 150);
    };

    let isDragging = false;
    let foundDiscounts = 0;

    const checkDiscounts = () => {
        let scratchedArea = (foundDiscounts / (150 * 150)) * 100;
        if (scratchedArea >= 25 && foundDiscounts >= 3) {
            alert("%10 İndirim Kazandınız!");
        }
    };

    const scratch = (x, y) => {
        if (!isDragging) { 
            isDragging = true;
            checkDiscounts(); 
        }
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, 24, 0, 2 * Math.PI);
        context.fill();
        foundDiscounts++;
    };

    canvas.addEventListener("mousedown", (event) =>{
        scratch(event.offsetX, event.offsetY);
    });

    canvas.addEventListener("mousemove", (event) => {
        if(isDragging){
            scratch(event.offsetX, event.offsetY);
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });

    canvas.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    init();
};


const scratchCards = [
    { id: "scratch-card1", color: "green" },
    { id: "scratch-card2", color: "green" },
    { id: "scratch-card3", color: "green" },
    { id: "scratch-card4", color: "green" },
    { id: "scratch-card5", color: "green" },
    { id: "scratch-card6", color: "green" },
    { id: "scratch-card7", color: "green" },
    { id: "scratch-card8", color: "green" },
    { id: "scratch-card9", color: "green" }
];

scratchCards.forEach((card, index) => {
    createScratchCard(card.id, card.color);
    if (card.id === "scratch-card6" || card.id === "scratch-card8" || card.id === "scratch-card9") {
        let currentFoundDiscounts = 0;
        document.getElementById(card.id).addEventListener("mouseup", () => {
            currentFoundDiscounts++; 
            if (currentFoundDiscounts === 3) {
                alert("%10 İndirim Kazandınız!");
            }
        });
    }
});