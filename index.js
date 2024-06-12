function createElementByHtml(html) {
    const template = document.createElement('template');

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}

function toggleArtworkPopup(id) {
    let popup = document.getElementById(id);
    if(popup.style.display !== 'block') {
        popup.style.display = 'block'
        console.log(`Popup for ${id} displayed.`);
    } else {
        popup.style.display = ''
        console.log(`Popup for ${id} hidden.`);
    }
}

function purchaseArtwork(id, name) {
    let card = document.getElementById(id);
    alert(`You have purchased ${name}`);
    console.log(`${name} has been purchased`);
    card.remove();
}

async function fetchArtworks() {
    try {
        const artworks = await fetch('http://localhost:8080/artworks/');

        if(!artworks.ok) {
            console.log("Error!");
        }

        const artworkList = await artworks.json();

        populateCards(artworkList);
    } catch (err) {
        console.log("Error!");
    }
    
}

function populateCards(artworks) {
    for(let i = 0; i < artworks.length; i++) {
        const card = createElementByHtml(` 
            <div id="${artworks[i]['id']}" class="art-card" onclick="toggleArtworkPopup('${artworks[i]['id']}-popup');"> 
                <img src="data:image/png;base64,${artworks[i]['image']}" alt="Painting" class="card-art"> 
                <div class="art-details\"> 
                    <p class="art-title\">${artworks[i]['name']}</p> 
                    <p class="art-artist\">${artworks[i]['artist']}</p> 
                    <p class="art-medium\">${artworks[i]['medium']}</p> 
                    <p class="art-price\">&#8369; ${artworks[i]['amount']}</p> 
                </div> 
            </div> 
        `);
        const popup = createElementByHtml(`
            <div id="${artworks[i]['id']}-popup" class="popup-container" onclick="toggleArtworkPopup('${artworks[i]['id']}-popup');">
                <div class="popup">
                    <img class="popup-img" src="data:image/png;base64,${artworks[i]['image']}" alt="Artwork">
                    <div class="popup-details"> 
                        <div class="popup-text">
                            <p class="popup-title">${artworks[i]['name']}</p> 
                            <p class="popup-artist">${artworks[i]['artist']}</p> 
                            <p class="popup-medium">${artworks[i]['medium']}</p> 
                            <p class="popup-price">&#8369; ${artworks[i]['amount']}</p> 
                        </div>
                        <div class="popup-buttons">
                            <button class="cancel-button">CANCEL</button>
                            <button class="buy-button" onclick="purchaseArtwork('${artworks[i]['id']}}', '${artworks[i]['name']}');">PURCHASE</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
        document.getElementById("card-container").appendChild(card);
        document.body.appendChild(popup);
    }
}

fetchArtworks();