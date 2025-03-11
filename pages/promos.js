
function handleModify(button) {
    const promoDiv = button.parentElement;
    const promoText = promoDiv.querySelector('h2');


    const confirmBox = document.createElement('div');
    confirmBox.className = 'confirm-box';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = promoText.textContent;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Confirmer';
    saveButton.className = 'confirm-btn';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Annuler';
    cancelButton.className = 'cancel-btn';

    // Ajouter les éléments à la boîte de confirmation
    confirmBox.appendChild(input);
    confirmBox.appendChild(saveButton);
    confirmBox.appendChild(cancelButton);
    promoDiv.appendChild(confirmBox);

    // Gestion du clic sur "Confirmer"
    saveButton.addEventListener('click', () => {
        promoText.textContent = input.value; // Met à jour le texte
        confirmBox.remove(); // Supprime la boîte de confirmation
    });

    // Gestion du clic sur "Annuler"
    cancelButton.addEventListener('click', () => {
        confirmBox.remove(); // Supprime la boîte de confirmation
    });
}

// Fonction pour gérer le bouton "Supprimer"
function handleDelete(button) {
    const promoDiv = button.parentElement; // Récupère le conteneur parent

    // Ajouter une boîte de confirmation sous le texte
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

    // Ajouter les éléments à la boîte de confirmation
    confirmBox.appendChild(confirmMessage);
    confirmBox.appendChild(deleteButton);
    confirmBox.appendChild(cancelButton);
    promoDiv.appendChild(confirmBox);

    // Gestion du clic sur "Supprimer"
    deleteButton.addEventListener('click', () => {
        promoDiv.remove(); // Supprime la promo
    });

    // Gestion du clic sur "Annuler"
    cancelButton.addEventListener('click', () => {
        confirmBox.remove(); // Supprime la boîte de confirmation
    });
}

// Ajouter des écouteurs d'événements aux boutons
document.querySelectorAll('.modif').forEach(button => {
    button.addEventListener('click', function () {
        handleModify(this); // Passe le bouton cliqué en paramètre
    });
});

document.querySelectorAll('.supp').forEach(button => {
    button.addEventListener('click', function () {
        handleDelete(this); // Passe le bouton cliqué en paramètre
    });
});
