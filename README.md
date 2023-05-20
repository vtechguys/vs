# Variant Styles

> A first-class typed styling variant API.

**Variant Styles** is inspired by [Stitches.js](https://stitches.dev/) which has a rich `styled` API where you can create type-safe UI components with variants, while they do all the under-the-hood work to manage the composition and mapping of styles to the different variants of the component.

...but...

All that is opinionated with CSS-in-TS(/JS) syntax 🤔, but with variant-styles(`vs`), you can use literally any styling framework 😇 and still get the benefits of *variants* in your component.

Creating component variants with the "traditional" approach can become a mammoth task; matching styles to props and manually adding types above it can be draining.

**Variant styles (`vs`)** comes to your rescue by providing all that hard labour of "mapping props to styles and adding types" wrapped into a nice little API.

- **🫶 Framework agnostic**
- **🔥 Type safe**
- **🤏 Super tiny bundle size**


# Installation 

```bash copy
npm i @vtechguys/vs
```

# Usage

Following is example usage of `vs` with css-modules.

We will start by creating variants for a button. We recommend to create a separate file for variants styling like following.

```ts filename="button.vs.js" copy
import { vs } from "@vtechguys/vs";
import styles from "./button.module.css";

export const button = vs(
// (1) variant config
{
  // (2) base styles all buttons must have
  base: styles.btn,
  // (3) variants of buttons
  variants: {
    // (4) color variants
    color: {
      // (5) values of color variants
      primary: styles["btn-color--primary"], // (6) styles applied on primary button
      secondary: styles["btn-color--secondary"]
    },
    size: {
      small: styles["btn-size--small"],
      medium: styles["btn-size--medium"]
    }
  }
});
```

1. `vs` takes a `config` argument using which it creates variant for the component-style.
2. Each component-style can have base styling which is applied by default.
3. Set of variants supported for this component-style. 
4. In this example variants are `color` and `size`.
5. `color` variant can be of two types `primary` and `secondary`. Each type is mapped to several styles.
6. For `color="primary"` style applied on button item will be `styles["btn-color--primary"]`.

Not that we have created component-style from variant config we can use it inside our component. Following is a example usage in React.js:


```jsx filename="button.jsx" {7} copy
import clsx from "clsx";
import { button } from "./button/button.vs";

export default function Button() {
  // (1) returns array of class-names for given button variant props color="primary" size="medium"
  const classes = button({ color: "primary", size: "medium" });
  // (2) merging the classes
  const className = clsx(classes)

  return (
    <div>
      <button className={className}>
        aaa
      </button>
    </div>
  );
}
```

1. component-styles `button` imported from `button.vs.js` takes in values for variants and returns the mapped styles accordingly.
2. As it return bare bone styles these need to processed. In this example it uses css modules so returns array of class names which can can be cocatenated to generate cumulative styles.


For completion sake I'm putting `button.module.css` here; please note your CSS may vary but so you can skip this file.


```css filename="button.module.css" copy
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn-color--default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.btn-color--primary {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}

.btn-color--secondary {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}

.btn-size--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.2rem;
}

.btn-size--medium {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}
```

# CSS-in-TS(/JS)

In this section I'm going to present `vs` with CSS-in-JS flavour. CSS-in-JS is popular these days and are being used almost in
every project. 

But before we start I would like to present some of the article worth reading on CSS-in-JS.
1. [Why CSS-in-JS?](https://aniketjha.dev/why-css-in-js)
2. [CSS: Isolation vs Abstraction](https://aniketjha.dev/css-isolation-vs-abstraction)

There are many popular CSS-in-JS framework these days. 
[Emotion.js](https://emotion.sh/docs/introduction) is among the top choice of css-in-js framework 
but what we are going to use in this example is something that I've built in past. It is called ***styler***. 

**[Styler](https://www.npmjs.com/package/@vtechguys/styler)** is a CSS-in-JS library with tiny bundle size and high performance benchmarks. 
It is a prefect choice as alternative to emotion css to be used in you next side projects. 
Here are some articles in case you are interseted in understaind how library like emotion work under the hood.

1. [Build your own emotion like CSS-in-JS library](https://aniketjha.dev/build-your-own-emotion-like-css-in-js-library)
2. [Extending our CSS-in-JS to support style-component syntax](https://aniketjha.dev/extending-our-css-in-js-to-support-style-component-syntax)

Enough with *self promotions* 😛, let's get started.


```ts filename="button.vs.ts" copy
import { GetVariantProps, vs } from "@vtechguys/vs";

// (1) CSS-in-JS style definations: style object
const styles = {
  btn: {
    display: "inline-block",
    marginBottom: "0",
    fontWeight: "400",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
    backgroundImage: "none",
    border: "1px solid transparent",
    padding: "6px 12px",
    fontSize: "14px",
    lineHeight: "1.42857143",
    borderRadius: "4px",
    userSelect: "none"
  },
  btnDefault: {
    color: "#333",
    backgroundColor: "#fff",
    bordercolor: "#ccc"
  },
  btnColorPrimary: {
    color: "#fff",
    backgroundColor: "#337ab7",
    borderColor: "#2e6da4"
  },

  btnColorSecondary: {
    color: "#fff",
    backgroundColor: "#f0ad4e",
    borderColor: "#eea236"
  },

  btnSizeSmall: {
    padding: "0.25rem 0.5rem",
    fontSize: "0.875rem",
    borderRadius: "0.2rem"
  },

  btnSizeMedium: {
    padding: "0.5rem 1rem",
    fontSize: "1.25rem",
    borderRadius: "0.3rem"
  }
};

// (2) creating component styles from the vs config
export const button = vs({
  base: styles.btn,
  variants: {
    color: {
      default: styles.btnDefault,
      primary: styles.btnColorPrimary,
      secondary: styles.btnColorSecondary
    },
    size: {
      small: styles.btnSizeSmall,
      medium: styles.btnSizeMedium
    }
  },
  // (3) default values of variants if nothing is passed
  defaultVariants: {
    color: "default",
    size: "medium"
  }
});

export type ButtonVariantProps = GetVariantProps<typeof button>;
```

Now let's see the use in a React component.

```tsx filename="button.component.tsx" copy
import React from "react";
import { css } from "@vtechguys/css";
import { button, ButtonVariantProps } from "./button.vs";

type ButtonOwnProps = {
    // ... some button props ...
};

type ButtonProps = React.PropsWithChildren<ButtonVariantProps & ButtonOwnProps>;

export function Button(props: ButtonProps) {
    const { color, size, children, ...rest } = props;
    
    const styles = button({ color, size });

    const className = css(styles);

    return <button className={className} {...rest}>{children}</button>
}
```

You can create a custom hook for the styles like following:

```ts filename="useButtonStyles.hooks.ts" copy
import { css } from "@vtechguys/css";
import clsx from "clsx";
import { button, ButtonVariantProps } from "./button.vs";

export function useButtonStyles(props: ButtonVariantProps) {
    const { color, size } = props;

    // you can proabably merge following useMemo into one
    const styles = useMemo(() => button({ color, size }), [color, size]);

    const className = useMemo(() => css(styles), styles)

    return className;
}
```
# Tailwind

*Tailwind* is an excellent, scaleable, first-class CSS framework. It is the choice of many, and it is my personal favourite CSS framework. `vs` provide a intergration with tailwind classes. 

```ts filename="button.vs.ts" copy
import { GetVariantProps, vs } from "@vtechguys/vs";

export const button = vs({
  // Tailwind rich classes
  base: ["font-semibold", "border", "rounded"],
  variants: {
    intent: {
      color: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600"
      ],
    secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100"
      ]
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"]
    }
  },
  defaultVariants: {
    intent: "primary",
    size: "medium"
  }
});

export type ButtonVariantProps = GetVariantProps<typeof button>;
```

Now it can be used in your component as

```tsx filename="button.component.tsx" copy
import React from "react";

type ButtonOwnProps = {
    // ... some button props ...
};

type ButtonProps = React.PropsWithChildren<ButtonVariantProps & ButtonOwnProps>;


export function ButtonTailwind(props: ButtonProps) {
  const { color, size, children, ...rest } = props;
  
  // Tailwind classes 
  const variants = button({ color, size });
  const classes = clsx(variants);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```


# API

```ts filename="api.ts" copy

const buttonBase = vs({
    base: styles.btnBase
});


const config = {
    // (1) extending the styles from another `vs`
    extend: buttonBase,
    // (2) default styles that are allways applied
    base: styles.btn,
    // (3) variants for this component-styles
    variants: {
        color: {
          primary: styles.primary, // (4) can be an array also
          secondary: styles.secondary
        },
        size: {
            small: styles.small,
            medium: styles.medium
        }
    },
    // (5) default values of variant to use when value is not passed (10)
    defaultVariants: {
        // (6) default value for `color` variant is `primary`
        color: "primary"
    },
    // (7) If combination of variant occur matching certain values what additional styles should be applied
    compoundVariants: [
        // (8) styles to apply in extra when combination of variant matches color="primary" and size="small"
        {
            variants: {
                color: "primary",
                size:  "small"
            },
            styles: styles.primarySmallExtra
        }
        // (9) styles to apply in extra when combination of variant matches color="primary" and size="medium"
        {
            variants: {
                color: "primary",
                size:  "medium"
            },
            styles: styles.primaryMediumExtra
        }
    ]
};

// (10): `vs` return a component-styles function calling which with variant-values (11) gives styles array 
const button = vs(config);

// (11) `component-styles` called with variant values return array of styles (12).
const styles = button({ size: "small" })

// (12) returned styles can be process accordingly (13)
/*
[
 // extended styles from baseButton
 styles.btnBase, 
 // base styles of button
 styles.btn,
 // default variant value of button color is primary
 styles.primary,
 // variant value supplied to `component-styles`
 styles.small
 // Note: `compoundVariants[0]` wasn't applied as `compoundVariants` needs all required variants values to be explicitly passed in 
 // component-styles, they don't assume values from `defaultVariants`
]
*/

// (13) returned styles need to be processed according to framework in question
// if `styles-modules` or `tailwind` are used which classes 
// we can use `clsx` to combine all applicable variant classes
const className = clsx(styles); 
// if using css-in-js
const className = css(styles);
// this final className can be applied on component to give styling (14)

// (14) using the final className
<button className={className}>...</button>
```

1. `extend`: A variant-styles(`vs`) can extend any other variant styles. This helps in making component styles as composition.
2. `base`: Every variant-styles(`vs`) has base or default styles that can be applied to them.
3. `variants`: Variants that this component-styles will support.
4. values for the variant can be array also i.e `primary: [styles.primaryText, styles.primaryBg]`
5. `defaultVariants`: These are variant values to be used when the there values are not supplied to `component-style`. 
6. In this example on line (11) missing `color` variant was assumed from `defaultVariants` i.e `color="primary"`.
7. `compoundVariants`: If combination of variant occurs and when such a combination is met we want to add more styles then these `compoundVariants` are usefull.
8. We can list all variants conditions that must be met for this `compoundVariants` styles to be active. These extra styles `primaryMediumExtra` are applied when `color="primary"` and `size="medium"`.
9. More combination of `compoundVariants`.
10. `vs` for a given config returns `component-styles`. 
11. `component-styles` are function that takes in combination of variants and for these variant a cumulative `styles` array is returned.
12. This array is an example of all `styles` applicable when `size="small"` is used. 
13. Now that we have evaluted which `styles` are applicable for current values of variants passed to `component-styles`. These returned styles need to be processed according to the styling framework in use.
14. The processed `styles` is a `className` which can be used on your components.  




