## DesktopJS 

[![](https://img.shields.io/github/issues/Mouradouchane/DesktopJS)](#)
[![](https://img.shields.io/github/license/Mouradouchane/DesktopJS)](#)
[![](https://img.shields.io/badge/status-not%20stable-orange)](#)
[![](https://img.shields.io/badge/version-1-red)](#)


### About :

library for building virtual desktop environment on the web

### Benefits :
* easy-to-learn
* easy-to-use
* comprehensive
* open-source 

### Get Started :

there's two versions of this library "__development__" and "__usage__" version , choose what you want and get started .

#### __For Usage__ :

import __Desktop-min.js__ from __CDN__
```js
// min version not available yet :(
```

#### __For Development__ :

clone library

```
git clone https://github.com/Mouradouchane/DesktopJS.git
```

include library to your project 

import __Desktop Class__ from __Desktop.js__ in your js file
```js
import { desktop } from "...path/Desktop.js";
``` 

- if you want to do some **development , enhancement , contributions...** , you have to work in __dev__ folder.
- for more details [docs](../../wiki) .


### Example Of Code :
simple example for setup window "__html__" & "__css__" and using it
```js
// window html & css tempaltes
let win_html_str = "...";
let win_css_str  = "...";

// main object
const desktop = new desktop( document.body );

// set tempaltes to the desktop object
desktop.set.window.html( win_html_str );
desktop.set.window.css( win_css_str  );

// make new window
let window = desktop.new.window( ...new_window_args );

// open and make window visible
window.open();

// setup drag start event with call_back_function 
window.on.drag_start( function( window , e ) { ... } );

// check if this window is resizable or not :)
window.is.resizable();

``` 

### Documentation :
if you want to learn more about this library you can start from here at [docs](../../wiki)

### Contributions :
your welcome this repo is open for everyone , just before you start working in anything just text me first in [discussions](../../discussions) or open [issues](../../issues) 😃

