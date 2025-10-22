// Drag and drop logic for Level 1

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const targets = document.querySelectorAll('.target-area');
  const overlay = document.getElementById('success-overlay');
  const resetButton = document.getElementById('reset-button');
  let placedCount = 0;

  items.forEach(item => {
    item.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', item.dataset.type);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
  });

  targets.forEach(target => {
    target.addEventListener('dragover', e => {
      e.preventDefault();
      target.classList.add('hovered');
    });
    target.addEventListener('dragleave', () => {
      target.classList.remove('hovered');
    });
    target.addEventListener('drop', e => {
      e.preventDefault();
      target.classList.remove('hovered');
      const itemType = e.dataTransfer.getData('text/plain');
      if (itemType === target.dataset.type && !target.hasChildNodes()) {
        const dragged = document.querySelector(`.item[data-type="${itemType}"]`);
        target.appendChild(dragged);
        dragged.style.cursor = 'default';
        dragged.setAttribute('draggable', 'false');
        placedCount++;
        checkCompletion();
      } else {
        // Incorrect placement feedback
        target.classList.add('shake');
        setTimeout(() => target.classList.remove('shake'), 500);
      }
    });
  });

  function checkCompletion() {
    if (placedCount === items.length) {
      // Show the success overlay by setting display to flex (see CSS)
      overlay.style.display = 'flex';
    }
  }

  resetButton.addEventListener('click', () => {
    // Reset game
    items.forEach(item => {
      item.setAttribute('draggable', 'true');
      document.getElementById('items-area').appendChild(item);
    });
    placedCount = 0;
    // Hide the success overlay
    overlay.style.display = 'none';
  });
});