async function loadFixtures() {
    try {
        const { data, error } = await supabase
            .from('fixtures')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;

        const fixturesList = document.getElementById('fixtures-list');
        fixturesList.innerHTML = '';

        data.forEach(fixture => {
            const fixtureElement = document.createElement('div');
            fixtureElement.innerHTML = `
                <h2>${fixture.opponent}</h2>
                <p>Date: ${new Date(fixture.date).toLocaleDateString()}</p>
                <p>Time: ${fixture.time}</p>
                <p>Location: ${fixture.location}</p>
            `;
            fixturesList.appendChild(fixtureElement);
        });
    } catch (error) {
        console.error('Error loading fixtures:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFixtures);