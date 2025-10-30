/*
 * Interactivity script for the prompt tool.
 * This script handles category filtering and clipboard copying.
 */
document.addEventListener('DOMContentLoaded', () => {
  const catButtons = document.querySelectorAll('.cat-btn');
  const cards = document.querySelectorAll('.card');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Helper to update which cards are visible based on the selected category
  function updateCardVisibility(selectedCategory) {
    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      // Show the card only when its category matches the selected one
      if (category === selectedCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Initially hide all cards except the active category
  const initialCategoryBtn = document.querySelector('.cat-btn.active');
  if (initialCategoryBtn) {
    updateCardVisibility(initialCategoryBtn.getAttribute('data-category'));
  }

  // Click events for category buttons
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Highlight the clicked button and remove highlight from others
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update visible cards
      const category = btn.getAttribute('data-category');
      updateCardVisibility(category);
    });
  });

  // Clipboard copy functionality for each prompt
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const textarea = card.querySelector('.prompt-text');
      const textToCopy = textarea.value;
      // Use the modern clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          // Provide visual feedback on successful copy
          btn.classList.add('copied');
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = 'Copy';
          }, 2000);
        }).catch(() => {
          // Fallback if copy fails
          alert('Failed to copy text.');
        });
      } else {
        // Legacy fallback using a temporary textarea
        const tempInput = document.createElement('textarea');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          btn.classList.add('copied');
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = 'Copy';
          }, 2000);
        } catch (err) {
          alert('Failed to copy text.');
        }
        document.body.removeChild(tempInput);
      }
    });
  });
});