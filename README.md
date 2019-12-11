# Broccoli
 a simple single-page web application.

## Demo
Check out &#8658; **[Broccoli](https://harryhpxs.github.io/Broccoli/)**

## Getting Started

### Prerequisites
To run this app, please make sure your environment has [Node.js](https://nodejs.org)
 installed.

### Installation
Download [this repo](https://github.com/harryhpxs/Broccoli/archive/master.zip) or `git clone` to your local project directory, then run:

```bash
# go to your project directory
$ cd project/Broccoli

# intall Node packages
$ npm install
```

## CLI Usage

### For development

```bash
$ npm start
```
The source codes are located in `src` folder.

### For production

```bash
$ npm run build
```

The compiled and minified files are located in `dist` folder.

```bash
$ npm run deploy
```

Use `deploy` script to deploy project to your Github pages. Need to add `"homepage": "link"` for your project in `package.json`. (see [gh-pages](https://www.npmjs.com/package/gh-pages))
## Test cases

### Form input validation

All following cases would be tested before submitting the form.

- #### Name

    Name takes 3 to 50 characters from `[A-Za-z ]` including spaces in the middle.

- #### Email

    Email input is tested by Regex pattern:

    ```javascript
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    ``` 

- #### Email matching

    Two email input fields are tested to be matched.

### DOM Event

- #### Button onClick

    All buttons have been tested to trigger correct functions, including: 
    - `Request to invite` @Main
    - `Send` @PostForm
    - `×` @PostForm
    - `OK` @DoneBox.

### Networking

- #### POST request

    The form submission POST request is handled by [axios](https://github.com/axios/axios).

    - `200 OK` &rarr; Show DoneBox
    - `400 Bad Request` &rarr; Display error message at form bottom
