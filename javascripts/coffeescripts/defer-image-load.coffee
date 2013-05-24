loadDeferredImage = (element) ->
	src = element.getAttribute('data-defer-src')
	s = document.createAttribute('src')
	s.nodeValue = src
	element.setAttributeNode(s)
	return

images = document.querySelectorAll('img[data-defer-src]')
for image in images
	loadDeferredImage(image)