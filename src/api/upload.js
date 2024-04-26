
export const uploadFile = async (event) => {
    const file = event.target.files[0];
    try {
      const formData = new FormData();
       formData.append('image', file);
      const response = await fetch('bartist-backend.vercel.app/uploadFile', {
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
  