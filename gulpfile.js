const gulp = require('gulp')
const mjml = require('gulp-mjml')
const del = require('del')
const mjmlEngine = require('mjml')

const browserSync = require('browser-sync');
const server = browserSync.create();

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: 'dist'
    }
  });
  done();
}

const clean = () => del(['dist']);

const email = () => {
  // return gulp.src('./src/mjml/index.mjml')
  return gulp.src([
      'src/mjml/index.mjml',
      'src/mjml/cta.mjml',
      'src/mjml/employee-spotlight.mjml',
      'src/mjml/feature-1.mjml',
      'src/mjml/feature-2.mjml',
      'src/mjml/footer.mjml',
      'src/mjml/header.mjml',
      'src/mjml/hero.mjml',
      'src/mjml/posts.mjml',
      'src/mjml/seasonal-facts.mjml',
      'src/mjml/weekly-promo.mjml',
    ])
    // .pipe(mjml(mjmlEngine, {minify: true}))
    .pipe(mjml(mjmlEngine, {}))
    .pipe(gulp.dest('./dist'))
}

const watch = () => gulp.watch('**/*.mjml', gulp.series(email, reload));

const dev = gulp.series(clean, email, serve, watch);

gulp.task('default', dev);