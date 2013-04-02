###global FSS:true, FLB:true###
#This will be where all JS specific to SRD.com shows up

window.onload = ->
	return if not document.querySelector



	slideshows = document.querySelectorAll('#hero_slideshow .slideshow')
	if slideshows.length
		for slideshow in slideshows
			fss = new FSS(slideshow, {width: 725, height: 210}) 

	lightboxes = document.querySelectorAll('a[rel=simplebox]')
	if lightboxes.length
		for lightbox in lightboxes  
			flb = new FLB(lightbox, {});

	navClickHandler = (elem, navItems) ->
		return () ->
			a = elem.getAttribute('rel')
			for item in navItems 
				if item.className.match(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'))
					item.className = item.className.replace(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'), '') 

			projectItems = document.querySelectorAll('#projects_list li');
			for projectItem in projectItems
				projectItem.className = projectItem.className.replace(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'), '') if projectItem.className.match(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'))
				if a != 'all' and !projectItem.className.match(new RegExp('(\\s|^)' + a + '(\\s|$)'))
					if !projectItem.className.match(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'))
						projectItem.className += ' '+ 'deselected'

			elem.className = ' '+'active'
			
			return

	if document.querySelector('#p72')
		navItems = document.querySelectorAll('#projects-nav dd');
		for navItem in navItems
			navItem.onclick = navClickHandler(navItem, navItems)

	postTweet = document.querySelector('#post-tweet')
	if postTweet
		postTweet.onclick = () ->

			centerLeft = window.screen.width/2 - 550/2
			centerTop = window.screen.height/2 - 470/2
			window.open(@href, @getAttribute("target"), 'width=550, height=470, location=0, left='+centerLeft+', top='+centerTop)
			return false