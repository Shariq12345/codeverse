---
title: "What is CSS?"
description: "Introduction to CSS and styling web pages"
order: 1
section: "Introduction"
---

# What is CSS?

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. CSS controls the layout, colors, fonts, and overall visual appearance of web pages.

## What CSS Can Do

- **Styling**: Change colors, fonts, and sizes
- **Layout**: Control positioning and spacing
- **Responsive**: Adapt to different screen sizes
- **Animation**: Add movement and transitions

## CSS Syntax

CSS rules consist of a selector and a declaration block:

```css
selector {
  property: value;
  property: value;
}
```

## Basic Example

```css
/* CSS Example */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  color: #666;
  line-height: 1.6;
}
```

## How to Add CSS to HTML

There are three ways to add CSS to HTML:

1. **Inline CSS**: Using the style attribute
2. **Internal CSS**: Using the `<style>` element in the head
3. **External CSS**: Linking to an external CSS file

## Try It Yourself

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        background-color: lightblue;
      }
      h1 {
        color: red;
      }
      p {
        color: green;
      }
    </style>
  </head>
  <body>
    <h1>My Styled Page</h1>
    <p>This paragraph is styled with CSS!</p>
  </body>
</html>
```

Try changing the background color and text colors!
