let project_folder = require("path").basename(__dirname);
let source_folder = "src";
let fs = require("fs");

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
  },
  clean: "./" + project_folder + "/"
}

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass")(require('sass')),
  autoprefixer = require("gulp-autoprefixer"),
  groupmediaqueries = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  clean_js = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webphtml = require("gulp-webp-html"),
  webpcss = require("gulp-webpcss"),
  rename = require("gulp-rename"),
  svgsprite = require("gulp-svg-sprite"),
  fonter = require("gulp-fonter"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2");

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3001,
    notify: false
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function fonts() {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts));

}

function images() {
  return src(path.src.img)
    .pipe(webp({
      quality: 70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}


function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(clean_js())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}
function css() {
  return src(path.src.css)
    .pipe(scss({
      outputStyle: "expanded"
    }).on("error", scss.logError))
    .pipe(groupmediaqueries())
    .pipe(autoprefixer({
      overrideBrowsersList: ["last 5 versions"],
      cascade: true
    }))
    .pipe(webpcss({
      webpClass: ".webp",
      noWebpClass: ".no-webp"
    }))
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

gulp.task('svgSprites', () => {
  return gulp.src([source_folder + "/iconsprite/*.svg"])
    .pipe(svgsprite({
      mode: {
        stack: {
          sprite: "../icons/icons.svg",
          example: true
        }
      }
    }))
    .pipe(dest(path.build.img));
});

gulp.task('otf2ttf', () => {
  return gulp.src([source_folder + "/fonts/*.otf"])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(source_folder + "/fonts/"));
});

gulp.task('fontsStyle', () => {
  return new Promise((responce, _) => {
    let filename = source_folder + "/scss/fonts.scss"
    fs.writeFile(filename, "", () => { });
    fs.readdir(path.build.fonts, (err, items) => {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; ++i) {
          let fontname = items[i].split('.')[0];
          if (c_fontname != fontname) {
            fs.appendFile(filename, "@include font(\"" + fontname + "\", \"" + fontname + "\", 400, normal);\n", () => { });
          }
          c_fontname = fontname;
        }
      }
    });
    responce();
  })
});

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean() {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;