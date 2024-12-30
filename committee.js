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