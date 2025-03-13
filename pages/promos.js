const urlBase = "http://146.59.242.125:3009/";
const token = "67dd4e32-9b4e-4a4c-add6-131a1967fc41";
const addForm = document.querySelector('#promo-form');
let currentPromoId = null;

async function getPromos() {
    const response = await fetch(urlBase + "promos", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const data = await response.json();
    return data;
}

async function displayAllPromo() {
    const promos = await getPromos();
    promos.forEach(promo => {
        displayPromos(promo);
    });
}

function displayPromos(data) {
    const promosContainer = document.querySelector('.promos');
    const newPromoDiv = document.createElement('div');
    newPromoDiv.className = 'promo';
 
    const title = document.createElement('h2');
    title.textContent = data.name;
    newPromoDiv.appendChild(title);
    
    const btnDetail = document.createElement('button');
    btnDetail.textContent = "Détails";
    btnDetail.classList.add('detail');
    
    const btnModif = document.createElement('button');
    btnModif.textContent = "Modifier";
    btnModif.classList.add('modif');
    
    const btnRemove = document.createElement('button');
    btnRemove.textContent = "Supprimer";
    btnRemove.classList.add("supp");
    
    newPromoDiv.appendChild(btnDetail);
    newPromoDiv.appendChild(btnModif);
    newPromoDiv.appendChild(btnRemove);
    promosContainer.appendChild(newPromoDiv);
    
    // Gestion des événements avec passage de l'objet data complet
    btnDetail.addEventListener('click', () => {
        handleDetail(data);
    });
    
    btnModif.addEventListener('click', () => {
        handleModify(data._id, newPromoDiv, data);
    });
    
    btnRemove.addEventListener('click', () => {
        handleDelete(data._id, newPromoDiv);
    });
}

function handleDetail(promoData) {
   
    document.getElementById('detail-name').textContent = promoData.name;
    document.getElementById('detail-start').textContent = promoData.startDate || "Non spécifié";
    document.getElementById('detail-end').textContent = promoData.endDate || "Non spécifié";
    document.getElementById('detail-description').textContent = promoData.formationDescription || "Aucune description";
    document.querySelector('#liste-eleves').addEventListener('click', ()=>{
        window.location.href = "./eleves.html?promoId="+promoData._id
    })
    document.getElementById('promo-detail-modal').style.display = 'block';
}

document.getElementById('close-detail').addEventListener('click', function () {
    document.getElementById('promo-detail-modal').style.display = 'none';
});

function handleModify(promoId, promoDiv, promoData) {
    currentPromoId = promoId;
    
    document.querySelector('#promo-name').value = promoData.name;
    document.querySelector('#promo-start').value = promoData.startDate || "";
    document.querySelector('#promo-end').value = promoData.endDate || "";
    document.querySelector('#promo-description').value = promoData.formationDescription || "";
    
    document.querySelector('#promo-form button[type="submit"]').textContent = "Modifier";
    
    document.getElementById('promo-modal').style.display = 'block';
}

function handleDelete(promoId, promoDiv) {
    const confirmBox = document.createElement('div');
    confirmBox.className = 'confirm-box';

    const confirmMessage = document.createElement('p');
    confirmMessage.textContent = "Confirmez-vous la suppression de cette promotion ?";

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.className = 'delete-btn';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annuler';
    cancelButton.className = 'cancel-btn';

    confirmBox.appendChild(confirmMessage);
    confirmBox.appendChild(deleteButton);
    confirmBox.appendChild(cancelButton);
    promoDiv.appendChild(confirmBox);

    deleteButton.addEventListener('click', async () => {
        const response = await fetch(urlBase + "promos/" + promoId, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            promoDiv.remove();
        } else {
            console.error("Erreur lors de la suppression", response.status);
        }
    });

    cancelButton.addEventListener('click', () => {
        confirmBox.remove();
    });
}

addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
 
    let data = {
        name: document.querySelector('#promo-name').value,
        startDate: document.querySelector('#promo-start').value,
        endDate: document.querySelector('#promo-end').value,
        formationDescription: document.querySelector('#promo-description').value,
    };

    if (currentPromoId) {
        const response = await fetch(urlBase + "promos/" + currentPromoId, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            
            window.location.reload();
        }
        currentPromoId = null;
 
        document.querySelector('#promo-form button[type="submit"]').textContent = "Ajouter";
    } else {
  
        const response = await fetch(urlBase + "promos", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            displayPromos(data);
        }
    }
    document.getElementById('promo-modal').style.display = 'none';
});

// Ouverture de la modale pour créer une promo
document.getElementById('list-btn2').addEventListener('click', function () {
    // Réinitialiser le formulaire pour être en mode création
    currentPromoId = null;
    document.querySelector('#promo-form button[type="submit"]').textContent = "Ajouter";
    addForm.reset();
    document.getElementById('promo-modal').style.display = 'block';
});

// Fermeture de la modale
const closeButton = document.querySelector('.close-btn');
if (closeButton) {
    closeButton.addEventListener('click', function () {
        document.getElementById('promo-modal').style.display = 'none';
    });
}

displayAllPromo();
