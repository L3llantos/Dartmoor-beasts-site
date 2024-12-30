// Initialize Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.26.0/+esm'

// Initialize Supabase client
const supabase = createClient(
    'https://wjlmcjovstopwhsbcefp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbG1jam92c3RvcHdoc2JjZWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NzkxOTcsImV4cCI6MjA1MTE1NTE5N30.q02gD7caKt-YAwtaa0b12O4dFZhghh2CcL4DYHYvenE'
  );
  
  // Main function to run after Supabase is initialized
  async function main() {
      // ============ HOME PAGE FUNCTIONS ============
      async function loadUpcomingFixtures() {
          try {
              const { data, error } = await supabase
                  .from('fixtures')
                  .select('*')
                  .order('date', { ascending: true })
                  .limit(6);
  
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
          const fixtureHtml = fixtures.map(fixture => `
              <div class="fixture">
                  <h4>${fixture.opponent}</h4>
                  <p>Date: ${new Date(fixture.date).toLocaleDateString()}</p>
                  <p>Time: ${fixture.time}</p>
                  <p>Location: ${fixture.location}</p>
              </div>
          `).join('');
  
          $(`#${containerId}`).html(fixtureHtml);
      }
  
      // ============ COMMITTEE PAGE FUNCTIONS ============
      async function loadCommitteeMembers() {
          try {
              const { data, error } = await supabase
                  .from('committee_members')
                  .select('*');
  
              if (error) throw error;
  
              const committeeHtml = data.map(member => `
                  <div class="committee-member">
                      <h2>${member.name}</h2>
                      <p>Position: ${member.position}</p>
                      <p>${member.bio}</p>
                  </div>
              `).join('');
  
              $('#committee-members').html(committeeHtml);
          } catch (error) {
              console.error('Error loading committee members:', error);
          }
      }
  
      // ============ GALLERY PAGE FUNCTIONS ============
      async function loadGallery() {
          try {
              const { data, error } = await supabase
                  .from('gallery')
                  .select('*');
  
              if (error) throw error;
  
              const galleryHtml = data.map(photo => `
                  <div class="gallery-item">
                      <img src="${photo.url}" alt="${photo.description}" />
                      <p>${photo.description}</p>
                  </div>
              `).join('');
  
              $('#photo-gallery').html(galleryHtml);
          } catch (error) {
              console.error('Error loading gallery:', error);
          }
      }
  
      // ============ CONTACT FORM FUNCTIONS ============
      async function handleContactSubmission(event) {
          event.preventDefault();
          
          const formData = {
              name: $('#name').val(),
              email: $('#email').val(),
              message: $('#message').val()
          };
  
          try {
              const { data, error } = await supabase
                  .from('contact_messages')
                  .insert([formData]);
  
              if (error) throw error;
  
              alert('Thank you for your message. We will get back to you soon!');
              $('#contact-form')[0].reset();
          } catch (error) {
              console.error('Error submitting form:', error);
              alert('There was an error submitting your message. Please try again later.');
          }
      }
  
      // ============ EVENT LISTENERS ============
      // League panel toggle
      $('.league-header').click(function() {
          const league = $(this).data('league');
          const fixturesContainer = $(`#${league}-fixtures`);
          const toggleIcon = $(this).find('.toggle-icon');
          
          fixturesContainer.slideToggle(300);
          toggleIcon.text(fixturesContainer.is(':visible') ? '-' : '+');
      });
  
      // Contact form submission
      $('#contact-form').submit(handleContactSubmission);
  
      // ============ PAGE INITIALIZATION ============
      // Determine which page we're on and load appropriate content
      const currentPage = window.location.pathname;
      
      if (currentPage.includes('index.html') || currentPage === '/') {
          loadUpcomingFixtures();
      } else if (currentPage.includes('committee.html')) {
          loadCommitteeMembers();
      } else if (currentPage.includes('gallery.html')) {
          loadGallery();
      }
  }
  
  // Run the main function when the document is ready
  $(document).ready(main);
  
  