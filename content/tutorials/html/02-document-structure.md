---
title: "HTML Document Structure"
description: "Understanding the basic structure of HTML documents"
order: 2
section: "Introduction"
---

# HTML Document Structure

Every HTML document has a basic structure that includes several essential elements. Understanding this structure is crucial for creating well-formed HTML pages.

## Document Declaration

The `<!DOCTYPE html>` declaration defines this document as HTML5. It must be the very first thing in your HTML document.

```html
<!DOCTYPE html>
```

## HTML Element

The `<html>` element is the root element of an HTML page. All other elements are contained within this element.

## Head Section

The `<head>` element contains meta information about the document that is not displayed on the page:

- Page title (shown in browser tab)
- Character encoding
- Viewport settings for responsive design
- Links to CSS files
- Meta descriptions for SEO

## Body Section

The `<body>` element contains all the visible content of the web page.

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document Structure</title>
  </head>
  <body>
    <header>
      <h1>Main Heading</h1>
    </header>
    <main>
      <p>Main content goes here</p>
    </main>
    <footer>
      <p>&copy; 2025 My Website</p>
    </footer>
  </body>
</html>
```

## Best Practices

- Always include the DOCTYPE declaration
- Set the language attribute on the html element
- Include proper meta tags in the head section
- Use semantic HTML elements for better structure

## Try It Yourself

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Structured Page</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p>Welcome to my structured HTML page!</p>
  </body>
</html>
```

Create your own HTML document with proper structure!
