class CardObject {
    constructor(title, description, url, privStatus) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.privStatus = privStatus; //default filter to display only public projects it will be boolean based on the "private" property in the gh object.
    }
};

async function getRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/mhalsey0/repos`);
        const data = await res.json();
        
        return data;

    } catch (error) {
        console.error(error);
    }
};

function createCards(objArray){
    const cardArray = [];
    for(let i = 0; i < objArray.length; i++){
        let obj = objArray[i];
        const card = new CardObject(obj.name, obj.description, obj.html_url, obj.private);
        cardArray.push(card);
    }
    return cardArray;
};

function publishCards(cardArray){
    const container = document.getElementById("card-container");

    cardArray.forEach((card) => {
        if(card.privStatus === false){
            const newAnchor = document.createElement("a");
            const newDiv = document.createElement("div");
            const title = document.createElement("h2");
            const description = document.createElement("p");

            newAnchor.href = card.url;
            title.textContent = card.title;
            description.textContent = card.description;

            newDiv.appendChild(title);
            newDiv.appendChild(description);
            newAnchor.appendChild(newDiv);
            container.appendChild(newAnchor);
        }
    })
};

//const userName = 'mhalsey0';

getRepos()
    .then(data => {
        console.log(data);
        const cards = createCards(data);
        publishCards(cards);
    });