


//inicializando GULP

var gulp = require('gulp')
    uglify = require('gulp-uglify')
    concat = require('gulp-concat')
    imagemin= require('gulp-imagemin')
    pngquant = require('imagemin-pngquant')
    clean = require('gulp-clean')
    minifyCSS = require('gulp-minify-css')
    inject = require('gulp-inject')
    htmlmin = require('gulp-htmlmin')
    streamqueue  = require('streamqueue')
    imageminSvgo = require('imagemin-svgo')
    svgmin = require('gulp-svgmin');

    var bases = {
    	app: '/',
    	dist: 'app/appmin/dist/'
    };

    //Limpia el Directorio dist
gulp.task('clean', function(){
    	gulp.src(bases.dist)
    	.pipe(clean());
});

gulp.task('minjs', ['clean'], function(){
  return streamqueue({ objectMode: true },
        gulp.src('app/scripts/jquery-1.11.0.min.js'),
          gulp.src('app/scripts/bootstrap.min.js'),
        gulp.src('app/scripts/jquery.cookie.js'),
        gulp.src('app/scripts/jquery.onepage-scroll.js'),
        gulp.src('app/scripts/*.js')
    )
	.pipe(uglify())
  .pipe(concat('app.min.js'))
	.pipe(gulp.dest(bases.dist + 'scripts'));
});

gulp.task('css', ['clean'], function(){
 //acá va la tarea para minificar el css
   gulp.src('app/styles/*.css')
  .pipe(minifyCSS({compatibility: 'ie8'}))
	.pipe(concat('app.min.css'))
	.pipe(gulp.dest(bases.dist + 'styles'));
});

gulp.task('minImg', ['clean'], function () {
	// tarea para la minificación de img
	gulp.src('app/images/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest(bases.dist + 'images'));
});

gulp.task('svgmin', ['clean'], function () {
    return gulp.src('app/images/*.svg')
        .pipe(imageminSvgo()())
        .pipe(gulp.dest(bases.dist + 'svg'));
});


gulp.task('default', ['clean', 'css', 'minjs', 'minImg', 'svgmin' ]);
