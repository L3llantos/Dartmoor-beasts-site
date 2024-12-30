document.addEventListener('DOMContentLoaded', () => {
    loadUpcomingFixtures();
    setupLeagueToggle();
});

async function loadUpcomingFixtures() {
    try {
        const { data, error } = await supabase
            .from('fixtures')
            .select('*')
            .order('date', { ascending: true })
            .limit(6);  // Fetch 6 fixtures (3 for each league)

        if (error) throw error;

        const regionalFixtures = data.filter(fixture => fixture.league === 'Regional').slice(0, 3);
        const nationalFixtures = data.filter(fixture => fixture.league === 'National').slice(0, 3);

        displayFixtures('regional-fixtures', regionalFixtures);
        displayFixtures('national-fixtures', nationalFixtures);
    } catch (error) {
        console.error('Error loading fixtures:', error);
    }
}

function displayFixtures(containerId, fixtures) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    fixtures.forEach(fixture => {
        const fixtureElement = document.createElement('div');
        fixtureElement.classList.add('fixture');
        fixtureElement.innerHTML = `
            <h4>${fixture.opponent}</h4>
            <p>Date: ${new Date(fixture.date).toLocaleDateString()}</p>
            <p>Time: ${fixture.time}</p>
            <p>Location: ${fixture.location}</p>
        `;
        container.appendChild(fixtureElement);
    });
}

function setupLeagueToggle() {
    const leagueHeaders = document.querySelectorAll('.league-header');
    leagueHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const league = header.getAttribute('data-league');
            const fixturesContainer = document.getElementById(`${league}-fixtures`);
            const toggleIcon = header.querySelector('.toggle-icon');

            fixturesContainer.classList.toggle('active');
            toggleIcon.textContent = fixturesContainer.classList.contains('active') ? '-' : '+';
        });
    });
}