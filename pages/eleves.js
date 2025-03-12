const authToken = "d4024b64-58b0-4cc9-a496-428099b18761";
const urlBase = "http://146.59.242.125:3009/";

const modal = document.getElementById('modal-message'); // Modal de message
const modalMessageText = document.getElementById('modal-message-text'); // Texte du message dans la modal
const modalConfirmButton = document.getElementById('modal-confirm'); // Bouton Confirmer dans la modal
const modalCancelButton = document.getElementById('modal-cancel'); // Bouton Annuler dans la modal
const closeModalButton = document.getElementById('close-modal'); // Bouton de fermeture de la modal
const modalAjout = document.getElementById('modal-ajouter'); // Modal pour ajouter un élève
const addEleveForm = document.getElementById('addEleveForm'); // Formulaire d'ajout d'élève
const eleveList = document.getElementById('eleve-list'); // Liste des élèves

let currentPromotionId = 1; // ID de la promotion (en attente de la sélection de la promotion)

// Affichage des élèves de la promotion
async function loadEleves(promotionId) {
    try {
        const response = await fetch(urlBase + `promos/${promotionId}/eleves`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des élèves');
        }

        const eleves = await response.json();
        displayEleves(eleves);
    } catch (error) {
        openModal('Erreur lors de la récupération des élèves');
    }
}

// Affichage de la liste des élèves dans le DOM
function displayEleves(eleves) {
    eleveList.innerHTML = ''; // Réinitialiser la liste avant d'afficher

    eleves.forEach(eleve => {
        const li = document.createElement('li');
        li.textContent = `${eleve.firstName} ${eleve.lastName} (${eleve.age}) ${eleve.avatar}`;

        const editBtn = createButton('Modifier', () => editEleve(eleve.id));
        const deleteBtn = createButton('Supprimer', () => deleteEleve(eleve.id));

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        eleveList.appendChild(li);
    });
}

// Créer un bouton pour modifier ou supprimer un élève
function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    button.classList.add(text.toLowerCase()); // Ajouter une classe pour le style
    return button;
}

// Ouvrir la modal pour ajouter un élève
document.getElementById('addEleveBtn').addEventListener('click', () => {
    modalAjout.style.display = 'block'; // Afficher la modal
});

// Fermer la modal
closeModalButton.addEventListener('click', () => {
    modalAjout.style.display = 'none'; // Cacher la modal
});

// Soumettre le formulaire d'ajout d'un élève
addEleveForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const avatar = document.getElementById('avatar').files[0]

    try {
        const response = await fetch(urlBase + `promos/${currentPromotionId}/eleves`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, age,  avatar }) // Données de l'élève
        });

        if (!response.ok) {
            throw new Error('Échec de l\'ajout de l\'élève');
        }

        const newEleve = await response.json();
        displayEleves([newEleve]); // Afficher le nouvel élève ajouté
        modalAjout.style.display = 'none'; // Fermer la modal
        openModal('Élève ajouté avec succès');
    } catch (error) {
        openModal('Erreur lors de l\'ajout de l\'élève');
    }
});

// Modifier un élève
async function editEleve(id) {
    // Tu peux étendre cette fonction pour permettre la modification des informations d'un élève.
    openModal(`Modifier l'élève avec ID: ${id}`);
}

// Supprimer un élève
async function deleteEleve(id) {
    openModal('Êtes-vous sûr de vouloir supprimer cet élève ?', async () => {
        try {
            const response = await fetch(urlBase + `eleves/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });

            if (!response.ok) {
                throw new Error('Échec de la suppression de l\'élève');
            }

            openModal('Élève supprimé avec succès');
            loadEleves(currentPromotionId); // Recharger la liste des élèves après suppression
        } catch (error) {
            openModal('Erreur lors de la suppression de l\'élève');
        }
    });
}

// Fonction pour ouvrir la modal avec un message
function openModal(message, onConfirm = null) {
    modalMessageText.textContent = message;
    modal.style.display = 'block'; // Afficher la modal

    modalConfirmButton.onclick = () => {
        if (onConfirm) onConfirm(); // Si une fonction de confirmation est fournie, l'exécuter
        closeModal(); // Fermer la modal après la confirmation
    };

    modalCancelButton.onclick = closeModal; // Fermer la modal si l'utilisateur annule
}

// Fonction pour fermer la modal
function closeModal() {
    modal.style.display = 'none'; // Cacher la modal
}

// Charger les élèves d'une promotion (remplace le ID par celui sélectionné par ton binôme)
loadEleves(currentPromotionId); // À remplacer par la promotion sélectionnée
