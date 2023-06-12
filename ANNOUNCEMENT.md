# Announcement

Radix Svelte has been one of the biggest surprises of my programming journey. Never would I have imagined that I’d be responsible for an open-source library that gained so much traction, love, and support. I’m so grateful for it all! Sincerely, thank you all.

When I started this project, eager to see one of my go-to libraries be present in my most loved framework, I knew I had some work cut out for myself, but I now know that was an understatement. Radix UI is such a complex piece of software, built by amazing designers & engineers. As such, porting it out (mostly) on my own is **really** challenging. And it’s getting harder as I reach the more complex components.

I’ve decided to take a really hard decision. **I’m stopping the active development of new components on my end.** But please don't be alarmed! This is not the end.

### First off, I want to detail some of the reasons why I took this decision:

- I have no context regarding the decisions that went into Radix UI’s API, technical implementation, etc. So a lot of of the porting process is guess-work which can lead to sub-par results.
- Translating React code into Svelte code is easier said than done. There are some pieces that simply can’t be converted, and instead, some re-invention needs to be made.
- I’ve had a lot of trouble trying to implement the `asChild` prop, which is, IMO, vital to Radix.
  - This is due to some Svelte component limitations, such as: not having access to slot contents, and no way to pass event listeners using spread props.
- Since this is a port, I can’t do away with creative freedom without losing the meaning behind the project.
- The complexity of the code drives out new contributors

These reasons left me feeling burnt-out at times, which is the last thing I want with Radix Svelte. I love what we’ve achieved together, and I’d like to keep it that way.

### With that out of the way, what’s happening to Radix Svelte?

I don’t want the project to die out. I’m still going to implement bug fixes and improvements where I can. And if people want to help maintain it, or contribute to it by adding new components, bug fixes, etc, I’d love that, it would be greatly appreciated.

So I’m taking the following steps:

- This announcement will be linked to in the README, together with a disclaimer about the current status of the project
- I’ve moved Radix Svelte to its own organization. This will make it easier in case volunteers want to work on the project, and need to have higher access to the repository.

Now, there’s something else I wanted to talk about. I’m going to work on my own library: Melt UI.

### Melt UI

This may be confusing for some, if I was having a hard time with Radix Svelte, why would I go and start another UI library? Well, Melt UI directly addresses the issues I’ve mentioned above.

Firstly, It’s not a port, so all decisions are 100% my own, together with the Open Source community

And the most imporant part: I’m not using Svelte Components. Instead I created a Builder API, which exposes a function that returns props. You don’t need an `asChild` prop this way, and can use any element or component you want with it, or easily create your own components. It’s also much easier to style, as it’s truly headless:

```html
<script>
	import { createCollapsible } from '@melt-ui/svelte';
	const { open, root, content, trigger } = createCollapsible();
</script>

<div {...$root}>
	<button {...$trigger}>{$open ? 'Close' : 'Open'}</button>
	<div {...$content}>Obi-Wan says: Hello there!</div>
</div>
```

Creating components this way is also much simpler. I’ve already created Accordion, Collapsible, Tabs, and Select components, and all of them showed a significant decrease in code complexity, and lines of code. I believe this will make it more approachable for newcomers.

In any case, I don’t want to make this about Melt UI, and the projects will not be associated. This is just a disclaimer in case anyone who’s reading this would like to follow a similar project, which is currently being built in its early stages, and available at https://melt-ui.com/.

Thank you for reading, and for supporting my work. I can’t overstate how happy I am with the success of Radix Svelte, and I really wish I can help build out the Svelte ecosystem.

If you have any questions, or would like to reach out, come join us in Discord: https://discord.com/invite/gQrpPs34xH

**TL;DR** I'm not actively developing new components, but will still work in fixes and improvements. Radix Svelte is still accepting contributions of all kinds. If you want to help, please reach out. I'm also working on a new UI library, [Melt UI](https://melt-ui.com/).
