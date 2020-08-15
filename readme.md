## <h3 align="center">Testing library with DOM support</h3>

## 📝 Table of Contents

- [About](#about)
- [Functions](#functions)
- [Usage](#usage)
- [Prerequisites](#prerequisites)

## 🧐 About <a name = "about"></a>

This library allows you test your apps with mocha syntax, but includes [JSDOM](https://www.npmjs.com/package/jsdom) support.  
Comparison is due to [assert](https://nodejs.org/api/assert.html) node.js global scoped function.

#### Takes `*.test.js` files to test it.

Check examples in repo please.

## 🚩 Functions <a name = "functions"></a>

| Function                            | Description                                   |
| ----------------------------------- | --------------------------------------------- |
| it(`description, callbackFunction`) | basic testing function                        |
| beforeEach(`callbackFunction`)      | function that might be call before every it() |
| render(`HTMLFileName`)              | async function for testing dom elements       |

#### You dont need to require any files

## ✔ Usage <a name = "usage"></a>

#### Just type `tme` in your project with \*.test.js files (after [linking](#prerequisites) package to global scope)

### Javascript env

```js
let numbers;
beforeEach(() => {
  numbers = [1, 2, 3];
});

it("beforeEach is ran each time", () => {
  assert.strictEqual(numbers.length, 3);
  numbers.push(5);
});

it("beforeEach is ran each time", () => {
  assert.strictEqual(numbers.length, 3);
});
```

### Webpage env

```js
it("Webpage has a text input", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");

  assert(input);
});
```

### Prerequisites <a name = "prerequisites"></a>

Use `npm` link for add command "tme" globally.
To change name, edit bin value in package.json
