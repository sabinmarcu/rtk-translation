const gulp = require("gulp");
const babel = require("gulp-babel");
const clean = require("gulp-clean");

gulp.task("clean", (): any =>
    gulp.src("lib/**/*", { read: false })
        .pipe(clean())
);

gulp.task("compile", (): any =>
    gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("lib"))
);

gulp.task("copy", (): any =>
    gulp.src([
        "src/**/*",
        "!src/**/*.js",
    ])
        .pipe(gulp.dest("lib"))
);

gulp.task("default", ["clean", "copy", "compile"]);
