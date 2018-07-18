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
      baseDir: './dist'
    }
  });
  done();
}

const clean = () => del(['dist']);

const email = () => {
  return gulp.src('./src/mjml/index.mjml')
    // .pipe(mjml(mjmlEngine, {minify: true}))
    .pipe(mjml(mjmlEngine, {}))
    .pipe(gulp.dest('./dist'))
}

const watch = () => gulp.watch('**/*.mjml', gulp.series(email, reload));

const dev = gulp.series(clean, email, serve, watch);

gulp.task('default', dev);