# Loops

A loop includes a test condition as well as a block `{...}`. Each time a loop block executes it's called an iteration. The block will repeat until the condition no longer evaluates as true. There are different forms of loops: a `while` loop and a `do...while` loop. For example:

```javascript
var countdown = 5;

while (countdown > 0) {
  console.log('Countdown...' + countdown);
  countdown -= 1;
}

// compared to

var countdown = 5;

do {
  console.log('Countdown...' + countdown);
  countdown -= 1;
} while (countdown > 0);
```

The only practical difference between these two is whether the conditional is tested before or after the first iteration. In the example above, if the countdown started at 0, the `while` loop would print nothing but the `do...while` loop would print once.

JavaScript also has a `for` loop. These loops take three clauses:
1. an initialization clause such as `var i = 0`
2. a conditional text clause such as `i <= 5`
3. an update clause such as `i +=1`

Put together, it looks like this:
```javascript
for (var i = 0; i <= 5; i += 1) {
  console.log('Countdown...' + i);
}
```
