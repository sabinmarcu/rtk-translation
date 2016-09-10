const gulp = require("gulp");
const babel = require("gulp-babel");
const clean = require("gulp-clean");
const copy = require("gulp-copy");

gulp.task("clean", (): any =>
    gulp.src("lib/**/*", { read: false })
        .pipe(clean())
);

gulp.task("compile", (): any =>
    gulp.src("src/modules/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("lib"))
);

gulp.task("copy", (): any =>
    gulp.src([
        "src/modules/**/*",
        "!src/modules/**/*.js",
    ])
        .pipe(babel())
        .pipe(copy("lib"))
);

gulp.task("default", ["clean", "compile", "copy"]);
