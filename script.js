function showAddPetForm() {
    hideAllForms();
    document.getElementById('addPetForm').style.display = 'block';
  }
  
  function showUpdatePetForm() {
    hideAllForms();
    document.getElementById('updatePetForm').style.display = 'block';
  }
  
  function showDeletePetForm() {
    hideAllForms();
    document.getElementById('deletePetForm').style.display = 'block';
  }
  
  function showViewPetForm() {
    hideAllForms();
    document.getElementById('viewPetForm').style.display = 'block';
  }
  
  function hideAllForms() {
    document.getElementById('addPetForm').style.display = 'none';
    document.getElementById('updatePetForm').style.display = 'none';
    document.getElementById('deletePetForm').style.display = 'none';
    document.getElementById('viewPetForm').style.display = 'none';
  }
  function addPet() {
    const petName = document.getElementById('petName').value;
    const category = document.getElementById('category').value;
    const status = document.getElementById('status').value;
    const petData = {
        name: petName,
        category: category,
        status: status
    };

    fetch('http://127.0.0.1:5000/pet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add pet');
        }
           alert('Pet added successfully');

    })
    .catch(error => {

        console.error('Error adding pet:', error);
 
        alert('Failed to add pet. Please try again later.');
    });
}

function updatePet() {
  const petId = document.getElementById('petIdToUpdate').value;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const status = document.getElementById('status').value;

  const petData = {
      id: petId,
      name: name,
      category: category,
      status: status
  };

  fetch(`http://127.0.0.1:5000/pet/${petId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(petData)
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to update pet');
          }
          alert('Pet updated successfully');
          return response.json(); // Optional: If your server returns updated pet data, you can handle it here
      })
      .then(data => {
          console.log(`Updated pet data: ${JSON.stringify(data)}`); // Log updated pet data if available
      })
      .catch(error => {
          console.error('Error updating pet:', error);
          alert('Failed to update pet. Please try again later.');
      });
}


function deletePet() {
  const petId = document.getElementById('id_delete').value;
  fetch(`http://127.0.0.1:5000/pet/${petId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      alert('Pet deleted successfully');
    })
    .catch(error => {
      console.error('Error deleting pet:', error);
    });
}

function viewPet() {
  const petId = document.getElementById('id_view').value;
  fetch(`http://127.0.0.1:5000/pet/${petId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch pet data');
          }
          return response.json();
      })
      .then(data => {
         
          const petListContainer = document.getElementById('petListContainer');

         
          const petInfo = document.createElement('div');

        
          petInfo.textContent = `Pet found by ID: ${JSON.stringify(data)}`;

         
          petListContainer.appendChild(petInfo);
      })
      .catch(error => {
          console.error('Error fetching pet data:', error);
      });
}

  