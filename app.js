// Import Supabase from CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.26.0/+esm'

// Initialize Supabase client
const supabase = createClient(
  'https://wjlmcjovstopwhsbcefp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbG1jam92c3RvcHdoc2JjZWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzkxOTcsImV4cCI6MjA1MTE1NTE5N30.q02gD7caKt-YAwtaa0b12O4dFZhghh2CcL4DYHYvenE'
);



// Add more functionality here as needed

async function loadCommitteeMembers() {
    try {
        const { data, error } = await supabase
            .from('committee_members')
            .select('*');

        if (error) throw error;

        const committeeList = document.getElementById('committee-members');
        committeeList.innerHTML = '';

        data.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.innerHTML = `
                <h2>${member.name}</h2>
                <p>Position: ${member.position}</p>
                <p>${member.bio}</p>
            `;
            committeeList.appendChild(memberElement);
        });
    } catch (error) {
        console.error('Error loading committee members:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadCommitteeMembers);


document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([
                { name, email, message }
            ]);

        if (error) throw error;

        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your message. Please try again later.');
    }
});


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