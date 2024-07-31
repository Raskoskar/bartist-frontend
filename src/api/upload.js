// fonction generique pour l'upload de fichier
export const uploadFile = async (event) => {
    // Récupération du fichier
    const file = event.target.files[0];
    try {
        // Création d'un objet FormData pour envoyer les données du fichier
      const formData = new FormData();
        // Ajout du fichier à l'objet FormData sous le nom 'image'
       formData.append('image', file);
       
      const response = await fetch('http://localhost:3000/uploadFile', {
        method: 'POST',
        body: formData,
      })
      if (response) {
        const data = await response.json();
        console.log('Fichier upload :', data);
        return data;
      } else {
        console.error('Erreur upload');
      }
    } catch (error) {
      console.error(error);
    }
  };
  