## About this file
The purpose of this file is to document the concepts I've learned over the span of this project.
Initially coming from the Java world, the many mindsets of the JavaScript world sometimes are
confusing to me. Often times, when I come into contact with new JS concepts, they are introduced as
'easy to grasp'. I see, where the people writing this are coming from, but for me, these higher
levels of abstraction often times result in me having to wrap my head around something, which I
understand in a lower form of abstraction in Java but not right away here.

## React-State
I learned about this, when I wanted to save the 'authenticated' state globally. This state should be
accessible from every component. So naturally, I looked for a way, to introduce a global state in
my app, using react. It came apparent to me, that react itself was not meant, to hold state other than
UI state. Meaning, that the `this.state` should only be used for UI state. For example the value of
an input field or if a nav bar is expanded or something like that. I also found out, that Redux and
other Libraries should be used for any other than presentational state.

### Presentational and Container Components
I learned about this a bit too late. I've already established a big chunk of my components at this
point. Luckily, I've implemented this concept at some points. The mindset is, that you split your
components into two parts: the presentational and the container components.

#### Presentational Components
- Concerned with how things look
  - Often times just return `this.props.children`
- The only state, the presentational components hold is UI state
  - Meaning: the state is just saved in `this.state`

#### Container Components
- Concerned with how things work
  - Usually don't have any DOM markup and no styling
- They make API calls and provide the data via Redux calls to the presentational components

## The sub-header-slider problem
The sub-header-slider caused me a big headache. It is a
[html hr](https://developer.mozilla.org/de/docs/Web/HTML/Element/hr) element. I want to set the width
and margin from left based on the currently viewed page. This means, that it should underline the
`Admin` sub-header, if you're on the admin-page. Also, it should 'slide' from one position to another
and not just 'jump'. Sounds not too bad right? No wrong! Sounds terrible!

### Refs
The first problem was, that when you pass the active header element as a prop, React ignores the css
transition and just _jumps_ the slider. THIS IS NOT SUPPOSED TO HAPPEN. I've nearly lost my mind
over this, no joke. I sat at this exact problem for god knows how many hours. It would've also
worked with using document.getElementById but this is an even bigger no-no in React than refs. So I
ended up using them instead.

### Wrong position on load
I determined the position which the slider should have, with the `getBoundingClientRect().left`
property of the currently active sub-header. I then pass this value into the render method of the
element as an inline style. The problem was, that the `.getBoundingClientRect().left` property of
the currently active sub-header returned the wrong value when the page was firstly loaded. This
means, that the slider was off by a cm or so on the first render of the page. I was pretty lost and
didn't know how to fix this bug. So I let it slide and curiously I solved the problem unintentionally
later on, when I learned about debounce.

### Debounce
I wanted to re-set the position of the slider, when the page was resized. So I added an
event-listener and when it was called, I re-set the position of the slider. This worked great but
there was a problem: Because the resize listener gets called about a trillion times when you resize
the browser by a hair, the performance of your website is _heavily_ compromised. Luckily this is a
common problem people face and there is a simple solution: Debounce. Basically you say that the
function, which does the repositioning only get's called every 50ms although the listener is fired.
This results in a _slight_ delay between your resizing and the repositioning but this difference is
marginal and the performance gain is huge. This also resolved my previous `wrong position on load`
problem because the function was called 50ms after the first render function call and the DOM has
fully loaded at that point.

## Diffie-Hellman key-exchange
Because of _reasons_, I've implemented a diffie hellman key exchange, to encrypt/decrypt the
username and password posted to the "/authenticate" route. It would be fatal, if the username and the
password were not encrypted because having the admin username and password enables you to alter and
create entries and I don't have a SSH certificate at the moment. I quite like cryptography and to do
this by hand and not by using a library was quite nice. Here's how it works:

### How it works
The goal of the exchange is, that `party a` and `party b` end up with the same key, which they can
use to encrypt and decrypt messages. The problem is, that this key cannot be sent directly since
the connection between the two is not secure; we have to assume, that every message sent to the other
party can and will be read.

The numbers involved in this key exchange are gigantic and you have to consider, that you have to
execute arithmetic operations on them. This leads to a number of problems. For one, JS cannot store
these huge numbers natively. I used a library called
[big-integer](https://www.npmjs.com/package/big-integer) for that purpose. This library allows you
to store virtually infinite numbers and execute arithmetic operations on them. So that's the first
problem you of the way.

The other problem is directly linked to the first problem in the sense that the operations which you
apply on these numbers will take a tediously long time, if you don't optimize them. Luckily, the only
kind of operation, which you have to do on these numbers is something called a modular
exponentiation (`A^B mod C` where B is typically huge). I say luckily, because you can optimize the
heck out of that operation. You'll find a ton of results if you search for "fast modular
exponentiation".

#### Public variables
There are two public variables, which are visible to anyone. They are `g` and `n`. They both are
generated when the server is started and will not change for as long as the server is up.
- __`public_g`:__ The public variable `g` is a small prime number. We're talking something in the
two to three digit region here.
- __`public_n`:__ The public variable `n` is a _huge_ random number. The standard is 4000bit
nowadays. I've used a 2000 digit decimal number. I haven't calculated how many bits the binary
representation of such a number has but it's quite huge. The number is generated by reading out 250
bytes from the `/dev/urandom` file

#### Private keys
These keys are __not__ sent over the network. Both parties generate them on every key exchange
- __private_key:__ A random number between `g/4` and `g`. They could in theory range between 0 and
  the size of `g`. I didn't want that because small private keys could lead to security
  vulnerabilities. You also have to consider that you can't make the minimum random number too small
  because you end up with a too small random pool. I chose the number g/4 as the smallest possible
  number.

#### Public keys
These keys are sent over the network.
- __public_key:__ They are generated by both parties on every key exchange using their private keys
  like this: `((public_g)^(private_key)) mod public_n`

#### Shared key
This is the key that both parties end up with in the end to decrypt and encrypt their messages. Of
course, they don't send them over the network.
- __shared_key:__ The private key is generated like this:
`((public_key_of_other_party)^(private_key)) mod public_n`
