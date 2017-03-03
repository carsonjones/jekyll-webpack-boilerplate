# Jekyll Static Starter

## Status: In Development

```
TODO:
- [x] webpack: js modules
- [x] webpack: js dependecies in seperate file
- [x] webpack: sass compilation
- [x] webpack: css autoprefixer
- [x] webpack: env dependent settings
- [x] webpack: image compression
- [ ] page canonical in head tag
- [ ] robots.txt
- [ ] site map creation
- [ ] contentful integration
- [ ] deploy script
- [ ] improve css sitemap
- [ ] browser auto refresh (with webpack-dev-server ? )
- [ ] 404 page
```

## About

> Starter files you can use to bootstrap new projects.

Build fast. Build more. 

Here you find files to help you build better website in shorts amount of time.

Latest tech:
- Static Site Generator (Jekyll)
- Webpack asset pipeline
- Node ES2015+ React (preact maybe soon!)
- Contentful integration (so your clients can make changes!) **coming soon

Ideal for:
- Marketing teams that need to iterate website quickly
- Setting up small client projects fast
- Legitamizing business ideas
- Experimenting with 

## Set up

### Requirements
- Node    >= 6.9.5
- NPM     >= 3.10.10
- Ruby    >= 2.3.0
- Jekyll  >= 3.3.1
- Bundler >= 1.14.4

### Install

1. Fork this repo to your github account
2. Clone to your computer
3. Run set-up scripts

```bash
bundle install && npm install
```

## Usage

Starting the project
```bash
npm run dev
```

Deploy to stage **coming soon
```bash
npm run stage
```

Deploy to prod (Netlify) **coming soon
```bash
npm run deploy
```

## Notes
- Folder structure is close to jekyll-default, good for if you want to upload to Forestry or Cloudcannon. Need to remove _sass from exclude config setting to use these services. 

## Big Thanks
- generate-jekyll-vars
- react-static-boilerplate
- jekyll-webpack
- webpack team
- vscode, hypercode, iterm2 teams

---
[MIT License](http://opensource.org/licenses/MIT).
