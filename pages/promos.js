
function modifier(button) {
    const promoDiv = button.parentElement;
    const promoText = promoDiv.querySelector('h2');

    
    if (confirm("Voulez-vous modifier cette promotion ?")) {
   
        const input = document.createElement('input');
        input.type = 'text';
        input.value = promoText.textContent;
        input.className = 'edit-input';

        promoDiv.replaceChild(input, promoText);

        input.focus();

        
        input.addEventListener('blur', () => {
            promoText.textContent = input.value;
            promoDiv.replaceChild(promoText, input);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    }
}

function handleDelete(button) {
    const promoDiv = button.parentElement;

    
    if (confirm("Êtes-vous sûr de vouloir supprimer cette promotion?")) {
        promoDiv.remove();
    }
}

// Ajouter des écouteurs d'événements aux boutons
document.querySelectorAll('.modif').forEach(button => {
    button.addEventListener('click', function () {
        modifier(this);
    });
});

document.querySelectorAll('.supp').forEach(button => {
    button.addEventListener('click', function () {
        handleDelete(this);
    });
});
