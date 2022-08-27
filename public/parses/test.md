# js

```js
console.log(1)
```

# js ESM

```js
import moment from 'moment'
console.log(moment().format('YYYY/MM/DD HH:mm:ss'))
```

# babel

```js
let a = 1
console.log(a)
```

# typescript

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```

# typescript ESM

```typescript
import moment from 'moment'
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  console.log(moment().format('YYYY/MM/DD HH:mm:ss'))
}
greet("Maddison", new Date());
```

# coffeescript

```coffeescript
# 赋值:
number   = 42
opposite = true

# 条件:
number = -42 if opposite

# 函数:
square = (x) -> x * x
```

# coffeescript ESM

```coffeescript
import moment from 'moment'
console.log(moment().format('YYYY/MM/DD HH:mm:ss'))

# 赋值:
number   = 42
opposite = true

# 条件:
number = -42 if opposite

# 函数:
square = (x) -> x * x
```

# livescript

```livescript
if 2 + 2 == 4
  console.log(1)
```

# css

```css
body {
    background-color: red;
}
```

# less

```less
html {
    body {
        background-color: red;
    }
}
```

# sass

```sass
$font-stack: Helvetica, sans-serif
$primary-color: red

body
  font: 100% $font-stack
  background-color: $primary-color
```

# scss

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: red;

body {
  font: 100% $font-stack;
  background-color: $primary-color;
}
```

# stylus

```stylus
ul
  li a
    display: block
    color: blue
    padding: 5px
    html.ie &
      padding: 6px
    &:hover
      color: red
```

# postcss

```postcss
:fullscreen {
}
```