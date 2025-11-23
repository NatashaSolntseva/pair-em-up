import { createButton } from '../components/button.js';
import { Title } from '../components/title.js';

export function renderRulesScreen() {
  const container = document.createElement('div');
  container.className =
    'flex flex-col items-center justify-start min-h-screen p-6 gap-6 text-gray-800 dark:text-gray-200';

  const title = Title({
    text: 'Game Rules',
    level: 'medium',
  });

  const content = document.createElement('div');
  content.className = 'max-w-xl w-full flex flex-col gap-6 text-base';

  function createSection(titleText, emoji) {
    const section = document.createElement('section');
    section.className = 'flex flex-col gap-3';

    const h2 = document.createElement('h2');
    h2.className = 'text-xl font-bold flex items-center gap-2';
    h2.textContent = `${emoji} ${titleText}`;

    section.append(h2);
    return section;
  }

  {
    const sec = createSection('Goal of the Game', '🎯');

    const p = document.createElement('p');
    p.textContent =
      'Your mission sounds simple (but trust us, the game disagrees): score 100 points by matching identical numbers or pairs that add up to 10.';

    const p2 = document.createElement('p');
    p2.textContent =
      "That's right — 4+6, 3+7, 2+8… they all count. The game rewards both luck and a tiny bit of math.";

    sec.append(p, p2);
    content.append(sec);
  }

  {
    const sec = createSection('How to Play', '🧩');

    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-5 space-y-2';

    const rules = [
      'Tap one number.',
      'Tap another number.',
      'A valid pair is either two identical numbers, or two numbers that add up to 10 (like 4+6, 3+7, 2+8, 1+9).',
      'Numbers can be paired if they are in the same row with no numbers between them, in the same column with no numbers between them, or if they can be connected by a line with up to 2 turns.',
      'Valid pairs disappear and grant you points.',
    ];

    rules.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.append(li);
    });

    const p = document.createElement('p');
    p.textContent = 'Invalid pair? The game will let you know.';

    sec.append(ul, p);
    content.append(sec);
  }

  {
    const sec = createSection('Helpers', '✨');

    const p = document.createElement('p');
    p.textContent = 'You get a limited set of useful abilities. Use them wisely!';
    sec.append(p);

    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-5 space-y-2';

    const helpers = [
      ['💡 Hint', 'shows a possible pair'],
      ['🔄 Shuffle', 'mixes the remaining numbers'],
      ['➕ Add Numbers', 'adds a new row to the board'],
      ['🧹 Eraser', 'removes one selected number'],
      ['⤴️ Revert', 'undo your last action'],
    ];

    helpers.forEach(([title, desc]) => {
      const li = document.createElement('li');

      const strong = document.createElement('strong');
      strong.textContent = title;

      const dash = document.createElement('span');
      dash.textContent = ' — ';

      const span = document.createElement('span');
      span.textContent = desc;

      li.append(strong, dash, span);
      ul.append(li);
    });

    const p2 = document.createElement('p');
    p2.textContent = 'When all helpers run out… you’re on your own 😬';

    sec.append(ul, p2);
    content.append(sec);
  }

  {
    const sec = createSection('Scoring System', '🏆');

    const intro = document.createElement('p');
    intro.textContent = 'Points are awarded based on how clever (or lucky) your pair is:';
    sec.append(intro);

    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-5 space-y-2';

    const scoring = [
      { title: 'Identical pair: +1 point', example: '(like 7 + 7)' },
      { title: 'Sum-to-10 pair: +2 points', example: '(like 3 + 7 or 4 + 6)' },
      { title: 'Double five bonus: +3 points', example: '(special case: 5 + 5)' },
    ];

    scoring.forEach(({ title, example }) => {
      const li = document.createElement('li');

      const strong = document.createElement('strong');
      strong.textContent = title;

      const span = document.createElement('span');
      span.className = 'opacity-70 pl-1';
      span.textContent = example;

      li.append(strong, span);
      ul.append(li);
    });

    const note = document.createElement('p');
    note.className = 'mt-1';
    note.textContent = 'Yes, fives are special. The game loves symmetry (and chaos).';

    sec.append(ul, note);
    content.append(sec);
  }

  {
    const sec = createSection('How to Win', '🏆');

    const p1 = document.createElement('p');
    p1.textContent = 'There is only one path to victory:';

    const p2 = document.createElement('p');
    p2.className = 'font-semibold';

    const emoji = document.createElement('span');
    emoji.textContent = '➡️ ';

    const text1 = document.createElement('span');
    text1.textContent = 'Reach ';

    const strong = document.createElement('strong');
    strong.textContent = '100 points';

    const text2 = document.createElement('span');
    text2.textContent = '. That’s it.';

    p2.append(emoji, text1, strong, text2);

    sec.append(p1, p2);
    content.append(sec);
  }

  {
    const sec = createSection('How to Lose', '💀');

    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-5 space-y-3';

    const lostRules = [
      {
        title: 'The board is empty but your score is still under 100.',
        hint: 'No numbers = no hope.',
      },
      {
        title: 'No available pairs and all helpers are used up.',
        hint: 'No moves left = game over.',
      },
      {
        title: 'The board has exceeded the maximum of 50 rows.',
        hint: 'If adding a new row pushes the total above 50 — you lose instantly.',
      },
    ];

    lostRules.forEach(({ title, hint }) => {
      const li = document.createElement('li');

      const strong = document.createElement('strong');
      strong.textContent = title;

      const small = document.createElement('div');
      small.className = 'text-sm opacity-70';
      small.textContent = hint;

      li.append(strong, small);
      ul.append(li);
    });

    sec.append(ul);
    content.append(sec);
  }

  {
    const sec = createSection('Tips', '💡');

    const ul = document.createElement('ul');
    ul.className = 'list-disc pl-5 space-y-2';

    const tips = [
      'Save your first Hint for later — you’re smarter than you think.',
      'Eraser is powerful. Respect the Eraser.',
      'Add Numbers can save you… or destroy everything.',
      'Think before you Shuffle — regret lasts longer than the animation.',
    ];

    tips.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.append(li);
    });

    sec.append(ul);
    content.append(sec);
  }

  {
    const end = document.createElement('section');
    end.className = 'pt-2 text-center text-lg font-semibold';
    end.textContent = '💛 Good luck! And remember: winners reach 100 points.';
    content.append(end);
  }

  const backBtn = createButton({
    text: '← Back to Menu',
    href: '#/',
  });

  container.append(title, content, backBtn);

  const app = document.getElementById('app');
  app.replaceChildren(container);
}
