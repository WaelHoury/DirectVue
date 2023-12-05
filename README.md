# DirectVue

🎉 Welcome to DirectVue, the quirky and playful Vue.js directives library that's like a box of chocolates for your code - you never know what you're gonna get, but it's always delightful! Whether you're a Vue ninja or just dipping your toes into the Vue-lake, DirectVue is here to add some zing and zest to your Vue projects. Let's dive into the world of Vue, but with a little more pizzazz this time! 🚀

## What's Inside the Magic Hat? 🎩

DirectVue is packed with an eclectic mix of directives that are not just powerful, but also incredibly fun to use. Here's a sneak peek:

### `v-unless`: The Rebel

Ever felt like breaking the rules? `v-unless` is your partner in crime! It's the opposite of `v-if`, hiding elements when the condition is true.

```
<template>
  <p v-unless="someTruthyValue">You can see me if the value is false!</p>
</template>
```

### `v-hotkey`: The Keyboard Wizard

Cast spells with your keyboard! Bind magical hotkeys to your elements and make things happen with a stroke of a key.

```
<template>
  <div v-hotkey="{ 'esc': onEscape, 'ctrl+enter': onCtrlEnter }">
    Press 'esc' to vanish, 'ctrl+enter' to reappear!
  </div>
</template>
```

### `v-click-outside`: The Bubble Popper

Close that pesky popup when you click outside. It's like popping bubbles - satisfying and simple.

```
<template>
  <div v-show="isPopupVisible" v-click-outside="closePopup">
    Click outside me, and I'll go poof!
  </div>
</template>
```

### `v-clipboard`: The Copycat

Copying to clipboard has never been this easy. Click an element, and poof! Its content is on your clipboard.

```
<template>
  <button v-clipboard="textToCopy">Click to copy!</button>
</template>
```

### `v-lazy`: The Couch Potato

Lazy-load images like a pro. Perfect for when your elements want to take it slow and load at their own leisure.

```
<template>
  <img v-lazy="lazyImageUrl" alt="Lazy-loaded image">
</template>
```

### Upcoming 🔜

`v-switch`: The Decision Maker

Tired of long-winded `v-if` chains? `v-switch` is here to clean up the mess and make conditional rendering a piece of cake!

```
<template>
  <div v-switch="magicValue">
    <p v-case="'abracadabra'">Poof! It's magic!</p>
    <p v-case="'hocuspocus'">Alakazam!</p>
  </div>
</template>
```

## Getting Started 🚀

To get started, simply install DirectVue in your Vue project:

`npm install direct.vue`

Then, import and use DirectVue in your main.js:

```
import { createApp } from 'vue'
import App from './App.vue'
import DirectVue from 'direct.vue';

const app = createApp(App).use(DirectVue);
```

Voila! You're all set to sprinkle some DirectVue magic in your Vue app!

## Compatibility ✅

This package is compatible with Vue 3

## Contribute 🤝

Got a cool idea for a directive? Found a bug while doing your Vue magic? Contributions are more than welcome! Let's make DirectVue even more whimsical together.

## License 📜

DirectVue is open-sourced and lovingly maintained. It's available under the [MIT License]

Happy Vuing with a touch of DirectVue! 🌟
