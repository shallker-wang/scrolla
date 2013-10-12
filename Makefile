
build: components lib/*.js css/*.css
	@rm build/build.js
	@component build
	@echo build done

all: tpl stylus build
	@echo all done

tpl: tpl/src/*.jade
	@jade --out tpl -P tpl/src/*.jade
	@component convert tpl/horizontal-scrollbar.html
	@component convert tpl/vertical-scrollbar.html

components: component.json
	@component install --dev

stylus: ./css/src/*.styl
	@stylus --out ./css/ $<

clean:
	rm -fr build components template.js

.PHONY: clean
