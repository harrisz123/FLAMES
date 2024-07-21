function checkRelationship() {
  const name1 = document.getElementById('name1').value.trim();
  const name2 = document.getElementById('name2').value.trim();
  
  if (!name1 || !name2) {
      showResult('Please enter both names.');
      return;
  }

  const paperElement = document.getElementById('paper');
  paperElement.innerHTML = `
      <div class="name">${name1}</div>
      <div class="name">${name2}</div>
  `;
  paperElement.classList.add('show');

  let uniqueChars = calculateUniqueChars(name1, name2);
  animateStrikeOut(name1, name2);

  setTimeout(() => {
      const flames = ['Friends', 'Lovers', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
      const result = flames[(uniqueChars.length - 1) % 6];

      showResult(`Your relationship: ${result}`);
      updateFlamesIcon(result);
      animateFlamesTitle(result);
  }, (name1.length + name2.length) * 300);
}

function calculateUniqueChars(name1, name2) {
  name1 = name1.toLowerCase().replace(/\s/g, '');
  name2 = name2.toLowerCase().replace(/\s/g, '');
  let combined = name1 + name2;
  let uniqueChars = '';

  for (let char of combined) {
      if (combined.indexOf(char) === combined.lastIndexOf(char)) {
          uniqueChars += char;
      }
  }

  return uniqueChars;
}

function animateStrikeOut(name1, name2) {
  const paperElement = document.getElementById('paper');
  const commonChars = findCommonChars(name1, name2);

  for (let i = 0; i < 2; i++) {
      const nameElement = paperElement.children[i];
      const name = nameElement.textContent;
      nameElement.innerHTML = name.split('').map(char => 
          `<span class="strike${commonChars.includes(char.toLowerCase()) ? ' active' : ''}">${char}</span>`
      ).join('');
  }

  let delay = 0;
  document.querySelectorAll('.strike').forEach(elem => {
      if (elem.classList.contains('active')) {
          setTimeout(() => {
              elem.classList.add('struck');
          }, delay);
          delay += 300;
      }
  });
}

function findCommonChars(name1, name2) {
  name1 = name1.toLowerCase().replace(/\s/g, '');
  name2 = name2.toLowerCase().replace(/\s/g, '');
  return name1.split('').filter(char => name2.includes(char));
}

function showResult(text) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = text;
  resultElement.classList.remove('show');
  void resultElement.offsetWidth; // Trigger reflow
  resultElement.classList.add('show');
}

function updateFlamesIcon(result) {
  const iconElement = document.querySelector('.flames-icon');
  let icon = '❤️';
  switch(result) {
      case 'Friends': icon = ''; break;
      case 'Lovers': icon = ''; break;
      case 'Affection': icon = ''; break;
      case 'Marriage': icon = ''; break;
      case 'Enemies': icon = ''; break;
      case 'Siblings': icon = ''; break;
  }
  iconElement.textContent = icon;
  iconElement.classList.remove('show', 'pulse');
  void iconElement.offsetWidth; // Trigger reflow
  iconElement.classList.add('show', 'pulse');
}

function animateFlamesTitle(result) {
  const letters = document.querySelectorAll('.flames-letter');
  letters.forEach(letter => letter.classList.remove('active'));
  
  const index = 'FLAMES'.indexOf(result[0]);
  if (index !== -1) {
      letters[index].classList.add('active');
  }
}
