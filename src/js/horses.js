console.log('horses');

const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

const promises = horses.map(run);
console.log(promises);

Promise.race(promises).then(({ horse, time }) =>
  console.log(`winner is ${horse} with time ${time}`)
);

Promise.all(promises).then(x => console.log(x));
//Возвращает промис,
//результатом которого есть массив результатов
//выполнения всех промисов

// run('mango').then(({ horse, time }) => console.log(`${horse} --> ${time}`));

function run(horse) {
  return new Promise(resolve => {
    const time = getRandomTime(2000, 3500);
    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
