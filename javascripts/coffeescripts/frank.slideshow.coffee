###global ###

#Slideshow class
class FSS
	
	# @element=null
	# @options=null
	# @target=null
	# @container=null
	# @slides=[]
	# @navigation=null
	# @slideA=null
	# @slideB=null
	# @caption=null
	# @currentIndex=-1
	# @interval=null
	# @autoplay=true

	constructor: (el, o) ->
		@element=el
		if Object.prototype.toString.call(o) is '[object Object]'
			@options=o
		else 
			@options={}

		@init()
		@gotoslide(0)
		@play() if @autoplay

	# Public Methods

	pause: ->
		clearTimeout(@interval)
		return

	play: ->
		clearTimeout(@interval)
		@interval = setTimeout(autoNext, @duration, @)
		return

	next: ->
		index = if @currentIndex < @slides.length-1 then @currentIndex+1 else 0
		@gotoslide(index)
		return

	gotoslide: (index) ->
		return if @currentIndex is index

		a = @element.parentNode.querySelector(".visible");

		if a and a is @slideA
			@slideB.style.backgroundPosition = '0px '+String(@options.height*(index)*-1)+'px';
			@slideA.className=@slideA.className.replace(new RegExp('(\\s|^)'+'visible'+'(\\s|$)'),'');
			@slideB.className+=' visible';
		else
			@slideA.style.backgroundPosition = '0px '+String(@options.height*(index)*-1)+'px';
			@slideB.className=@slideB.className.replace(new RegExp('(\\s|^)'+'visible'+'(\\s|$)'),'');
			@slideA.className+=' visible';

		a = @navigation.querySelector('.active')
		a.removeAttribute('class') if a

		a = document.createAttribute('class');
		a.nodeValue = 'active';
		@navigation.childNodes.item(index).setAttributeNode(a);
	
		m = if @currentIndex is -1 then 0 else @currentIndex

		@slides[m].el.className=@slides[m].el.className.replace(new RegExp('(\\s|^)'+'active'+'(\\s|$)'),''); 
		@slides[index].el.className+=' active';  

		@currentIndex=index

		return

	# Private Methods

	init: ->
		context = @
		@options.width=@element.offsetWidth if not @options.width 
		@options.height=@element.offsetHeight if not @options.height

		#TEMP
		@autoplay=true
		@duration=5000
		@currentIndex=-1

		# inject FSS class name
		@element.className += ' '+'fss' if not @element.className.match(new RegExp('(\\s|^)'+'fss'+'(\\s|$)'))

	
		# find captions
		@caption = @element.querySelector('.captions')
		return if not @caption
		cap = @caption.firstChild
		n=0
		@slides=[]
		while cap
			@slides.push({ndx:n++, el:cap}) if cap and cap.nodeType != 3
			cap=cap.nextSibling
		
		# create slide container
		@container = createElement('div', 'slide-container')

		# create slide A
		@slideA = createElement('div', 'slide-a visible')

		# create slide B
		@slideB = createElement('div', 'slide-b')

		# insert elements
		@element.insertBefore(@container, @caption)
		@container.appendChild(@slideA)
		@container.appendChild(@slideB)

		# set dimensions of slides
		@slideA.style.width=@slideB.style.width=@options.width+'px';
		@slideA.style.height=@slideB.style.height=@options.height+'px';

		# create navigation
		@navigation = createElement('ul', 'fss-nav')
		for slide, i in @slides
			l = createElement('li')
			l.appendChild(document.createTextNode(String(i+1)))
			@navigation.appendChild(l)
			l.onclick = navClickHandler(l, @)
	
		@container.appendChild(@navigation)

		@container.onmouseover = (e) -> mouseOverHandler(e, context) 
		@container.onmouseout = (e) -> mouseOutHandler(e, context)
	
		return	

	createElement = (tagName, className) ->
		element = document.createElement(tagName)
		return element if not className
		
		attribute = document.createAttribute("class")
		attribute.nodeValue=className
		element.setAttributeNode(attribute)
	 
		return element

	isChild = (child, parent) ->
		return false if child is parent

		while child and child != parent
			child=child.parentNode

		return child is parent

	autoNext = (closure) ->
		return if not closure
		closure.next();
		closure.play();
		return

	# Event Handlers

	navClickHandler = (elem, closure) ->
		return () ->
			closure.pause()
			i=0
			while closure.navigation.childNodes.item(i)
				if closure.navigation.childNodes.item(i) is elem
					closure.gotoslide(i)
					return
				i++

			return

	mouseOverHandler = (e, closure) ->
		return if not e
		
		if not isChild(e.target, closure.container)
			e.cancelBubble=true
			e.stopPropagation()
			return false

		closure.pause()
		closure.navigation.className+=' active' if not closure.navigation.className.match(new RegExp('(\\s|^)'+'active'+'(\\s|$)'))

		return

	mouseOutHandler = (e, closure) ->
		
		if isChild(e.relatedTarget, closure.container)
			e.cancelBubble=true
			e.stopPropagation()
			return false
		
		closure.play()
		if closure.navigation.className.match(new RegExp('(\\s|^)'+'active'+'(\\s|$)'))
			closure.navigation.className=closure.navigation.className.replace(new RegExp('(\\s|^)'+'active'+'(\\s|$)'),'');

		return