const urlBase = "http://146.59.242.125:3009/"

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

    confirmBox.appendChild(input);
    confirmBox.appendChild(saveButton);
    confirmBox.appendChild(cancelButton);
    promoDiv.appendChild(confirmBox);

    saveButton.addEventListener('click', () => {
        promoText.textContent = input.value;
        confirmBox.remove();
    });

    cancelButton.addEventListener('click', () => {
        confirmBox.remove(); 
    });
}

const startDate = document.getElementById('start-date').value;
const endDate = document.getElementById('end-date').value;
const formationDescription = document.getElementById('formation-description').value;


function handleDelete(button) {
    const promoDiv = button.parentElement;

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

    deleteButton.addEventListener('click', () => {
        promoDiv.remove();
    });

    cancelButton.addEventListener('click', () => {
        confirmBox.remove(); 
    });
}

document.querySelectorAll('.modif').forEach(button => {
    button.addEventListener('click', function () {
        handleModify(this);
    });
});

document.querySelectorAll('.supp').forEach(button => {
    button.addEventListener('click', function () {
        handleDelete(this);
    });
});



document.getElementById('list-btn2').addEventListener('click', function() {
    document.getElementById('promo-modal').style.display = 'block';
});

const closeButton = document.querySelector('.close-btn');
if (closeButton) {
    closeButton.addEventListener('click', function () {
        document.getElementById('promo-modal').style.display = 'none';
    });
}


document.getElementById('promo-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const promoName = document.getElementById('promo-name').value;

    try {
        const response = await fetch('http://146.59.242.125:3009/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: promoName })
        });
        const data = await response.json();
        console.log('Success:', data);
        document.getElementById('promo-modal').style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
    }
});



