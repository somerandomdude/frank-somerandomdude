class FLB

	constructor: (el, o) ->
		@element=el
		if Object.prototype.toString.call(o) is '[object Object]'
			@options=o
		else 
			@options={}

		@options.resizeImage=false

		@init()

	init: ->
		context=@
		@element.onclick = (e) -> clickHandler(e, context)
		return

	createOverlay: (imageURL) ->
		context=@
		@overlay = document.createElement('div');
		@overlay.setAttribute('id', 'flb-overlay')
		@overlay.innerHTML = '<div id="flb-container"><a href="#" title="Close" class="closingElement">&nbsp;</a></div><div id="flb-content"><a id="flb-image" class="closingElement" href="#" title="Close"></a><a id="flb-close" class="closingElement" href="#" title="Close">&times;</a></div>';

		document.getElementsByTagName("body")[0].appendChild(@overlay);

		# container div
		@container = document.getElementById('flb-content')
		
		@container.onclick = @overlay.onclick = (e) -> closeClickHandler(e, context)

		# define the popup image
		@imgContainer = document.getElementById('flb-image');
		@imgContainer.style.background = 'url('+imageURL+') no-repeat 50% 50%';
	
		# create the image object
		@image = new Image();
		@image.onload = (e) -> imageLoadHandler(e, context)
		@image.src = imageURL
	
		return

	# Event Handlers
	imageLoadHandler = (e, closure) ->
	# Grab image dimensions and do some resizing
		if not closure.options.resizeImage
			imgHeight = closure.image.height;
			imgWidth = closure.image.width;      
		else
			resizeHeight = document.documentElement.clientHeight-40;
			if closure.image.height<resizeHeight 
				imgHeight = closure.image.height;
				imgWidth = closure.image.width;
			else
				imgHeight = resizeHeight;
				imgWidth = Math.round(resizeHeight*closure.image.width/closure.image.height);
				closure.image.height = imgHeight;
				closure.image.width = imgWidth;
	 
		# provide new dimensions for the container
		delay = -> sizeContainer(closure.container, imgWidth, imgHeight)
		setTimeout(delay, 600)
		
		return

	sizeContainer = (container, width, height) ->
		container.style.width = width+'px';
		container.style.height = height+'px';
		container.style.margin = '-'+((height+28)/2)+'px 0 0 -'+(width/2)+'px';
		container.setAttribute('class', 'active')
		return

	clickHandler = (e, closure) ->
		closure.createOverlay(e.currentTarget.getAttribute('href'))
		e.cancelBubble=true
		e.stopPropagation()
		return false

	closeClickHandler = (e, closure) ->
		closure.container.setAttribute('class', '')
		document.getElementsByTagName("body")[0].removeChild(closure.overlay);
		return