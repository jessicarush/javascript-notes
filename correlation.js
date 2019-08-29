// Computing Correlation Demo
// From chapter 4 of https://eloquentjavascript.net/


// import { JOURNAL } from './journal';
const JOURNAL = require('./data/journal.js');


// This function computes the ϕ coefficient from a four item array
// where each item is the total number of occurances of each possible
// combination:

// binary   decimal(index)   description
// 00       0                no occurences of A or B
// 01       1                B (no A)
// 10       2                A (no B)
// 11       3                A and B

function coefficient_(frequency) {
  return (frequency[3] * frequency[0] - frequency[2] * frequency[1]) /
    Math.sqrt((frequency[2] + frequency[3]) *
              (frequency[0] + frequency[1]) *
              (frequency[1] + frequency[3]) *
              (frequency[0] + frequency[2]));
}

// With destructuring, it can also be written like:

function coefficient([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10));
}

console.log(coefficient([76, 9, 4, 1]));
// 0.06859943405700354


// To extract a two-by-two table for a specific event from the journal,
// we must loop over all the entries and tally how many times the event
// occurs in relation to squirrel transformations.

function frequencyFor(event, journal) {
  let frequency = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    frequency[index] += 1;
  }
  return frequency;
}

console.log(frequencyFor('pizza', JOURNAL));
// [76, 9, 4, 1]


// We need to compute a correlation for every type of event that
// occurs in the data set. To do that, we first need to find every
// type of event.

function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// [ 'carrot', 'exercise', 'weekend', 'bread', ... ]


// Now we can pass each event:

for (let event of journalEvents(JOURNAL)) {
  console.log(event + ':', coefficient(frequencyFor(event, JOURNAL)));
}
// carrot: 0.014097096860865023
// exercise: 0.06859943405700354
// weekend: 0.13719886811400708
// bread: -0.07575540190785703
// pudding: -0.06482037235521644
// brushed teeth: -0.3805211953235953
// touched tree: -0.08084520834544433
// nachos: -0.07043451251197408
// cycling: -0.08084520834544433
// brussel sprouts: -0.05230657809659414
// ice cream: -0.08084520834544433
// computer: 0.06859943405700354
// potatoes: -0.08574929257125442
// candy: 0.12964074471043288
// dentist: -0.036563621206356534
// running: -0.09050203323329065
// pizza: 0.06859943405700354
// work: -0.13719886811400708
// beer: -0.05230657809659414
// cauliflower: -0.08084520834544433
// lasagna: 0.08084520834544433
// lettuce: -0.07043451251197408
// television: -0.08084520834544433
// spaghetti: 0.242535625036333
// reading: 0.11068280537595927
// peanuts: 0.59026798116852


// Narrow the list:
console.log('Significant results:');

for (let event of journalEvents(JOURNAL)) {
  let correlation = coefficient(frequencyFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ':', correlation);
  }
}
// weekend: 0.13719886811400708
// brushed teeth: -0.3805211953235953
// candy: 0.12964074471043288
// work: -0.13719886811400708
// spaghetti: 0.242535625036333
// reading: 0.11068280537595927
// peanuts: 0.59026798116852

// The results show that the event happens the most with peanuts
// and the least with brushed teeth. Try testing for this combination:

for (let entry of JOURNAL) {
  if (entry.events.includes('peanuts') &&
     !entry.events.includes('brushed teeth')) {
    entry.events.push('peanuts-no-teeth');
  }
}
console.log(coefficient(frequencyFor('peanuts-no-teeth', JOURNAL)));
// 1
