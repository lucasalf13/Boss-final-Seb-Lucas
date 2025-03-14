const authToken = "67dd4e32-9b4e-4a4c-add6-131a1967fc41";
const urlBase = "http://146.59.242.125:3009/";

const modal = document.getElementById('modal-message'); // Modal de message
const modalMessageText = document.getElementById('modal-message-text'); // Texte du message dans la modal
const modalConfirmButton = document.getElementById('modal-confirm'); // Bouton Confirmer dans la modal
const modalCancelButton = document.getElementById('modal-cancel'); // Bouton Annuler dans la modal
const closeModalButton = document.getElementById('close-modal'); // Bouton de fermeture de la modal
const modalAjout = document.getElementById('modal-ajouter'); // Modal pour ajouter un élève
const addEleveForm = document.getElementById('addEleveForm'); // Formulaire d'ajout d'élève
const eleveList = document.getElementById('eleve-list'); // Liste des élèves
let currentPromotionId = getId();

// Affichage des élèves de la promotion
async function loadEleves(promotionId) {
        const response = await fetch(urlBase + "promos/" + getId(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des élèves');
        }

        const promo = await response.json();
        console.log(promo);
        
        displayEleves(promo);
 
}

// Affichage de la liste des élèves dans le DOM
function displayEleves(promo) {
    eleveList.innerHTML = ''; // Réinitialiser la liste avant d'afficher

    promo.students.forEach(eleve => {
        const li = document.createElement('li');
        
        const avatarImg = document.createElement('img');
        avatarImg.src = eleve.avatar; // Assure-toi que eleve.avatar contient l'URL de l'image
        avatarImg.alt = "Avatar de l'élève";
        avatarImg.width = 50; // Ajuste la taille de l'image
        avatarImg.height = 50;
    
        const name = document.createElement('span');
        name.textContent = `${eleve.firstName} ${eleve.lastName} (${eleve.age})`;
    
        li.appendChild(avatarImg);
        li.appendChild(name);
    
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
    const avatar = document.getElementById('avatar').files[0]; // Récupérer le fichier avatar

    // Créer un FormData pour gérer l'envoi du fichier
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('age', age);

    // Si un avatar est sélectionné, l'ajouter au FormData
    if (avatar) {
        formData.append('avatar', avatar);
    }

    try {
        // Requête POST pour envoyer les données à l'API

        const response = await fetch(urlBase + "promos/" + currentPromotionId + "/students", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                // Pas besoin de définir 'Content-Type' car FormData le gère automatiquement
            },
            body: formData // Envoi du FormData avec les données et l'avatar (si présent)
        });

        if (!response.ok) {
            throw new Error('Échec de l\'ajout de l\'élève');
        }

        // const newEleve = await response.json(); // Récupérer l'élève ajouté depuis la réponse
        loadEleves(); // Recharger les élèves après l'ajout
        modalAjout.style.display = 'none'; // Fermer la modal d'ajout
        openModal('Élève ajouté avec succès'); // Afficher un message de succès
    } catch (error) {
        openModal('Erreur lors de l\'ajout de l\'élève'); // Afficher un message d'erreur en cas de problème
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
function getId() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("promoId");    
    return id
}



// // const authToken = "67dd4e32-9b4e-4a4c-add6-131a1967fc41";
// // const urlBase = "http://146.59.242.125:3009/";
// const promoList = document.querySelector('#promoList')
// const addPromo = document.querySelector('#addPromo')

// async function getPromos() {
//     const response = await fetch (urlBase + "promos",{
//         method : "GET",
//         headers : {
//             Authorization : "Bearer " + authToken,
//             "Content-type : Application/json"
//         }
//     })
//     const data = await response.json()
//      return data
// }

// async function browsePromo() {
//     const promos = await getPromos()
//     promos.forEach(promo =>{
//         displayPromos(promo)
//     })
// }

// function displayPromos(promo) {
//     const startDate = new Date(promo.startDate)
//     const endDate = new Date(promo.endDate)
//     const article = document.createElement('article')
//     promoList.appendChild(article)
//     const title = document.createElement('h3')
//     title.textContent = promo.name 
//     article.appendChild(title)
//     const parastart = document.createElement('p')
//     parastart.textContent = "Date de début: " + startDate.getDay() + "/" + startDate.getMonth() + "/" + startDate.getFullYear()
//     article.appendChild(parastart)

//     const paraend = document.createElement('p')
//     paraend.textContent = "Date de fin: " + endDate.getDay() + "/" + endDate.getMonth() + "/" + endDate.getFullYear()
//     article.appendChild(paraend)
//     const buttonDetails = document.createElement('button')
//     buttonDetails.textContent = "Détails"
//     article.appendChild(buttonDetails)
//     const buttonUpdate = document.createElement('button')
//     buttonUpdate.textContent = "Modifier"
//     article.appendChild(buttonUpdate)
//     const buttonDelete = document.createElement('button')
//     buttonDelete.textContent = "Supprimer"
//     article.appendChild(buttonDelete)

//     buttonUpdate.addEventListener('click', ()=>{
//         openModal()
//         document.querySelector('#titleForm').textContent = "Modifier promo " + promo.name
//         document.querySelector('#errorName').value = promo.name
//         document.querySelector('#errorStartDate').value = promo.startDate.split('T')[0]
//         document.querySelector('#errorEndDate').value = promo.endDate.split('T')[0]
//         document.querySelector('#errorFormationDescription').value = promo.formationDescription
// }
//     )
//     document.querySelector('#closeModal').addEventListener('click', () =>{
//     document.querySelector('#modal').classList.remove('hidden')
// })
// addPromo.addEventListener('click', () =>{
//     openModal()
// })

// function getDataForm() {
//     const data = {
//         name : document.querySelector('#name').value,
//         startDate : document.querySelector('#startDate').value,
//         endDate : document.querySelector('#endDate').value,
//         formationDescription : document.querySelector('#formationDescription').value,
//     }
//     return data
// }
// document.querySelector('#formAdd').addEventListener('submit', (e) =>{
//     e.preventDefault()
// })

// async function postPromo() {
//     const data = getDataForm()
//     if (data.name == "" || data.startDate == "" || data.endDate == "" || data.formationDescription == "") {
//         document.querySelector('#errorAddForm').textContent =" Veuillez remplir tous les champs"
        
//     }else{
//         const response = await fetch(urlBase + "promos", {
//             method : "POST",
//             headers : {
//                 Authorization : "Bearer " + authToken,
//                 "Content-type" : "Application/json"
//             },
//             body: JSON.stringify(data)
//         })
//         if (response.ok) {
//             displayPromos(data)
//             closeModal()
//         }else{
//             const data = await response.json()
//             document.querySelector('#errorName').textContent = ""
//             document.querySelector('#errorStartDate').textContent = ""
//             document.querySelector('#errorEndDate').textContent = ""
//             document.querySelector('#errorFormationDescription').textContent = ""

//             if (data.errors.name) {
//                 document.querySelector('#errorName').textContent = data.errors.name.message
//             }
//             if (data.errors.startDate) {
//                 document.querySelector('#errorStartDate').textContent = data.errors.startDate.message
//             }
//             if (data.errors.endDate) {
//                 document.querySelector('#errorEndDate').textContent = data.errors.endDate.message
//             }
//             if (data.errors.formationDescription) {
//                 document.querySelector('#errorFormationDescription').textContent = data.errors.formationDescription.message
//             }
//         }
//     }
// }

// function clearForm() {
//     clearError()
//     document.querySelector('#name').value = ""
//     document.querySelector('#startDate').value = ""
//     document.querySelector('#endDate').value = ""
//     document.querySelector('#formationDescription').value = ""
    
// }
// function clearError(error) {

// }