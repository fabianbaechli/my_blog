## About this file
The purpose of this file is to document the concepts I've learned over the span of this project.
Initially coming from the Java world, the many mindsets of the JavaScript world sometimes are
confusing to me. Often times, when I come into contact with new JS concepts, they are introduced as
'easy to grasp'. I see, where the people writing this are coming from, but for me, these higher
levels of abstraction often times result in me having to wrap my head around something, which I
understand in a lower form of abstraction in Java but not right away here.

## State
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
