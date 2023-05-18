# @vtechguys/vs

> A first-class variant API.

`@vtechguys/vs` provide a easy to use  variant API to be used in making your component. It provides a sweet API to help you build components for design-system. 

- CSS-in-JS
- Tailwind
- Style modules

## CSS-in-JS
Here is example of `vs` with `@emotion` css-in-js.

```tsx
import { GetVariantProps, vs } from "@vtechguys/vs";
import { css } from "@emotion/core";
import React, { useMemo } from "react";

const button = vs({
  base: [
    { fontWeight: 600 },
    { borderWidth: "1px" },
    { borderRadius: "0.25rem" }
  ],
  variants: {
    intent: {
      primary: [
        {
          "--tw-bg-opacity": 1,
          backgroundColor: "rgba(59,130,246,var(--tw-bg-opacity))"
        },
        {
          "--tw-text-opacity": 1,
          color: "rgba(255,255,255,var(--tw-text-opacity))"
        },
        {
          borderColor: "transparent"
        },
        {
          "&:hover": {
            "--tw-bg-opacity": 1,
            backgroundColor: "rgba(37,99,235,var(--tw-bg-opacity))"
          }
        }
      ],
      secondary: [
        {
          "--tw-bg-opacity": 1,
          backgroundColor: "rgba(255,255,255,var(--tw-bg-opacity))"
        },
        {
          "--tw-text-opacity": 1,
          color: "rgba(31,41,55,var(--tw-text-opacity))"
        },
        {
          "--tw-border-opacity": 1,
          borderColor: "rgba(156,163,175,var(--tw-border-opacity))"
        },
        {
          "--tw-text-opacity": 1,
          color: "rgba(31,41,55,var(--tw-text-opacity))"
        },
        {
          "&:hover": {
            "--tw-bg-opacity": 1,
            backgroundColor: "rgba(243,244,246,var(--tw-bg-opacity))"
          }
        }
      ]
    },
    size: {
      small: [
        {
          fontSize: ".875rem",
          lineHeight: "1.25rem"
        },
        {
          paddingTop: "0.25rem",
          paddingBottom: "0.25rem"
        },
        {
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem"
        }
      ],
      medium: [
        {
          fontSize: "1rem",
          lineHeight: "1.5rem"
        },
        {
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem"
        },
        {
          paddingLeft: "1rem",
          paddingRight: "1rem"
        }
      ]
    }
  },
  compoundVariants: [
    {
      variants: {
        intent: "primary",
        size: "medium"
      },
      styles: [
        {
          textTransform: "uppercase"
        }
      ]
    }
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium"
  }
});

export type ButtonVariantProps = GetVariantProps<typeof button>;

export function useButtonStyles(styles: ButtonVariantProps) {
  const { intent, size } = styles;

  const classes = useMemo(() => {
    const variants = button({
      intent,
      size
    });
    return css(variants);
  }, [intent, size]);

  return classes;
}

export function ButtonCSS(props: React.PropsWithChildren<ButtonVariantProps>) {
  const { intent, size, children, ...rest } = props;

  const classes = useButtonStyles(props);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
``` 

## Style Modules
Here is an example use of styles module.

```tsx
import React from "react";
import { GetVariantProps, vs } from "@vtechguys/vs";
import clsx from "clsx";

import * as styles from "./styles.module.css";

const button = vs({
  base: [styles["font-semibold"], styles["border"], styles["rounded"]],
  variants: {
    intent: {
      primary: [
        styles["bg-blue-500"],
        styles["text-white"],
        styles["border-transparent"],
        styles["hover:bg-blue-600"]
      ],
      secondary: [
        styles["bg-white"],
        styles["text-gray-800"],
        styles["border-gray-400"],
        styles["hover:bg-gray-100"]
      ]
    },
    size: {
      small: [styles["text-sm"], styles["py-1"], styles["px-2"]],
      medium: [styles["text-base"], styles["py-2"], styles["px-4"]]
    }
  },
  compoundVariants: [
    {
      variants: {
        intent: "primary",
        size: "medium"
      },
      styles: [styles["uppercase"]]
    }
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium"
  }
});

export type ButtonVariantProps = GetVariantProps<typeof button>;

export function ButtonModule(
  props: React.PropsWithChildren<ButtonVariantProps>
) {
  const { intent, size, children, ...rest } = props;

  const variants = button(props);
  const classes = clsx(variants);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```


## Tailwind
Here is example of using tailwind with `vs`.

```tsx
import { GetVariantProps, vs } from "@vtechguys/vs";
import clsx from "clsx";
import React from "react";

const button = vs({
  base: ["font-semibold", "border", "rounded"],
  variants: {
    intent: {
      primary: [
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
  compoundVariants: [
    {
      variants: {
        intent: "primary",
        size: "medium"
      },
      styles: ["uppercase"]
    }
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium"
  }
});

export type ButtonVariantProps = GetVariantProps<typeof button>;

export function ButtonTailwind(
  props: React.PropsWithChildren<ButtonVariantProps>
) {
  const { intent, size, children, ...rest } = props;

  const variants = button(props);
  const classes = clsx(variants);

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```
