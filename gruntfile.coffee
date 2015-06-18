module.exports = (grunt)->
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-autoprefixer'

	grunt.initConfig
		watch:
			coffee:
				files: 'assets/coffee/*.coffee'
				tasks: ['coffee:compile']
			js:
				files: 'assets/js/*.js'
				tasks: [ 'uglify' ]

			sass:
				files:	'assets/sass/**/*.sass'
				tasks: ['sass']

		autoprefixer:
			options:
				browsers: ['last 8 version', 'ie 8', 'ie 9']
			application:
				files: 'assets/css/application.css' : ['assets/css/application.css']

		coffee:
			compile:
				flatten: true,
				join: true,
				files:
					'assets/js/app.js' : ['assets/coffee/*.coffee']
		uglify:
			my_target:
				files:
					'assets/js/app.min.js':['assets/js/app.js']

		sass:
			dist:
				files:
					'assets/css/application.css': 'assets/sass/application.sass'


		cssmin:
			minify:
				src: 'assets/css/application.css'
				dest: 'application.min.css'


	grunt.registerTask 'default', ['coffee:compile','uglify','sass', 'autoprefixer', 'cssmin']