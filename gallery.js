async function loadGallery() {
    try {
        const { data, error } = await supabase
            .from('gallery')
            .select('*');

        if (error) throw error;

        const galleryContainer = document.getElementById('photo-gallery');
        galleryContainer.innerHTML = '';

        data.forEach(photo => {
            const photoElement = document.createElement('div');
            photoElement.innerHTML = `
                <img src="${photo.url}" alt="${photo.description}" />
                <p>${photo.description}</p>
            `;
            galleryContainer.appendChild(photoElement);
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadGallery);