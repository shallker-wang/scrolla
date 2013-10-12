
build: components lib/*.js css/*.css
	@rm build/build.js
	@component build
	@echo build done

all: stylus build
	@echo all done

components: component.json
	@component install --dev

stylus: ./css/src/*.styl
	@stylus --out ./css/ $<

clean:
	rm -fr build components template.js

.PHONY: clean
