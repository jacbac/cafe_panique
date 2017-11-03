Café Panique
============

Novel excerpts, photos, typography, responsive, etc.
A secluded place for own design enhancements, minor tests and "at that time" lectures and/or inspirations. 

[Demo](http://jacbac.github.io/cafe_panique/)

Fork it to propose enhancements, as it is in a `master` branch, you can show the result of your version to anyone via URLs formed like this:

    https://{GitHub_username}.github.com/cafe-panique/

Required for dev
----------------

* Git
* Node
* A browser
* npm

Install
-------

```shell
cd ~/your_workspace
git clone {YOUR_CAFE_PANIQUE_FORK}
cd cafe_panique
git checkout master
[sudo] npm install
```

Finally,

```shell
npm start
```

:metal: That's it. Up and running !

Deploy on gh-pages
------------------

Disclaimer: You mustn't work on `gh-pages` branch !
Make your change only on `master` branch, build / test under control of `browser-sync` tool then deploy.

Use [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages) for deployment on the `github pages`.

The `npm run deploy` command run the `gulp build` task before committing and pushing to gh-pages remote branch.

Test and verify your code locally:

```shell
cd cafe_panique
git checkout master
bump version in package.json
git commit -m "..."
git push

npm run deploy
```

:metal: That's it. Test online on `http://{YOUR_GITHUB_USERNAME}.github.com/cafe-panique/`

Thanks
------

Dev made possible with

* [Git](http://git-scm.com/)
* [Sublime-Text 3](http://www.sublimetext.com/3)
* [Node.js](http://nodejs.org/) & [npm](https://npmjs.org/)
* [Ish](http://bradfrostweb.com/blog/post/ish/)
* [sass](http://sass-lang.com/)
* [gulp](http://gulpjs.com/)
* [gulp-notify](https://www.npmjs.com/package/gulp-notify)
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [gulp-size](https://www.npmjs.com/package/gulp-size)
* [browser-sync](http://www.browsersync.io/)

### Assets optimization

* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

### Image optimization

* [jquery.adaptive-backgrounds](http://briangonzalez.github.io/jquery.adaptive-backgrounds.js/)
* [imagemin-jpegoptim](https://www.npmjs.com/package/imagemin-jpegoptim)
* [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)
* [imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng)
* [imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo)

### Deployment

* [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages)
