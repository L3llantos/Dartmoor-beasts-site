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