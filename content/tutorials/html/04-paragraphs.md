---
title: "HTML Paragraphs"
description: "Understanding HTML paragraphs and text formatting"
order: 4
section: "Elements"
---

# HTML Paragraphs

The HTML `<p>` element defines a paragraph. Browsers automatically add space before and after paragraphs.

## Key Points

- Paragraphs are block-level elements
- They start on a new line
- Browsers add margin before and after paragraphs
- Multiple spaces and line breaks are collapsed into single spaces

## Basic Paragraph Example

```html
<p>This is a paragraph.</p>
<p>
  This is another paragraph with some <strong>bold text</strong> and some
  <em>italic text</em>.
</p>
<p>
  You can have multiple sentences in a paragraph. The browser will automatically
  wrap the text when it reaches the edge of the container.
</p>
```

## Text Formatting Inside Paragraphs

```html
<p>
  This paragraph contains <strong>bold text</strong>, <em>italic text</em>, and
  <u>underlined text</u>.
</p>
<p>
  You can also use <mark>highlighted text</mark> and <small>small text</small>.
</p>
<p>For code snippets, use the <code>&lt;code&gt;</code> element.</p>
```

## Line Breaks

To create a line break without starting a new paragraph, use the `<br>` tag:

```html
<p>
  This is the first line.<br />
  This is the second line.<br />
  This is the third line.
</p>
```

## Preformatted Text

Use the `<pre>` element to preserve spaces and line breaks:

```html
<pre>
This text will preserve
    all spaces
        and line breaks
exactly as written.
</pre>
```

## Try It Yourself

```html
<p>Welcome to my website!</p>
<p>
  This is a paragraph with <strong>important information</strong> and some
  <em>emphasized text</em>.
</p>
<p>
  Here's a line with a break:<br />
  And this continues on the next line.
</p>
```

Write a few paragraphs about your favorite hobby using different text formatting elements!
