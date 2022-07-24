import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html) // Получаем доступ к нужным файлам и папкам
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // В скобках - регулярное выражение, вместо @img - будем получать img/ в пути
    .pipe(
        app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            versionNumber({
                'value': '%DT%',
                'append': {
                    'key': '_v',
                    'cover': 0,
                    'to': [
                        'css',
                        'js',
                    ]
                },
                'output': {
                    'file': 'gulp/version.json'
                }
            })
        )    
    )
    .pipe(app.gulp.dest(app.path.build.html)) // Переносим файлы
    .pipe(app.plugins.browsersync.stream());    
}