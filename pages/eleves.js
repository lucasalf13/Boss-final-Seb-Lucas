const idpromo = "67cec0386fd57aee31c6c52b"
const urlBase = "http://146.59.242.125:3009/"
const token = "d4024b64-58b0-4cc9-a496-428099b18761"
const listContainer = document.querySelector('#list')




async function getPromoById(id) {
    const response = await fetch(urlBase + "promos/" + id,{
        method : "GET",
        headers : {
            Authorization :"Bearer " + token
        }
    })
    const data = await response.json()
    return data
}

async function displayPromo(id) {
    const promo = await getPromoById(id)
    promo.students.forEach(student => {
       const cont = document.createElement('article')
        listContainer.appendChild(cont)
        const title = document.createElement('h3')
        title.textContent = student.firstName + " " + student.lastName
        cont.appendChild(title)
    });
}


async function addStuddent(){

}


displayPromo(idpromo)

// document.getElementById('confirmer').addEventListener('click', async function(event) {
//     event.preventDefault(); // Empêche la soumission par défaut du formulaire

//     // Récupère les données du formulaire
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const age = document.getElementById('age').value;
//     const avatarFile = document.getElementById('avatar').files[0]; // Récupère le fichier sélectionné

//     // Crée un FormData pour envoyer les données, y compris le fichier
//     const formData = new FormData();
//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('age', age);
//     if (avatarFile) {
//         formData.append('avatar', avatarFile); // Ajoute le fichier s'il existe
//     }

//     try {
//         // Envoie la requête avec Fetch et attend la réponse
//         const response = await fetch('URL_DU_SERVEUR', {
//             method: 'POST',
//             body: formData // Envoie le FormData
//         });

//         // Vérifie si la réponse est correcte
//         if (!response.ok) {
//             throw new Error('Échec de l\'envoi des données');
//         }

//         const data = await response.json(); // Parse la réponse en JSON
//         console.log('Réponse du serveur:', data);

//     } catch (error) {
//         console.error('Erreur lors de l\'envoi:', error);
//     }
// });
