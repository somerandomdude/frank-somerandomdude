console.log('go')

appendParagraph = (element) ->
	s = document.createElement('span')
	c = document.createAttribute('class')
	c.nodeValue = 'comment-marker'
	#s.appendChild(document.createTextNode('Comment'))
	s.setAttributeNode(c);
	element.appendChild(s);
	return

paragraphs = document.querySelectorAll('.post p[name]')
for paragraph in paragraphs
	appendParagraph(paragraph)