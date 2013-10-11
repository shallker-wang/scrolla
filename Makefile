
build: components lib/*.js css/*.css
	@component build
	@touch build/done
	@rm build/done
	@echo build/build.js
	@echo build/build.css

all: stylus build
	@echo all done

components: component.json
	@component install --dev

stylus: ./css/src/*.styl
	@stylus --out ./css/ $<

clean:
	rm -fr build components template.js

.PHONY: clean
