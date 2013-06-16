<?php
/**
 * @package Frank for Some Random Dude
 */
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="verify-v1" content="by1MB81PjkQUdjinZJQn73aCwjaV5erxwsvtTP7pTNE=" />
	<meta name="viewport" content="width=device-width" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

	<link rel="dns-prefetch" href="//google-analytics.com">
	<link rel="dns-prefetch" href="//www.google-analytics.com">

	<link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOBJREFUeNrkUbsKwkAQ3Fs0EbVTP05JpSD4iEUKBb9AO/ErDJJgI5bi72gv8e44Hc9Hk1Owdthib4eZG3ZFzfOISFgYY9Az89WCXBAQgJPGgC8XixidpYSBzwyLvOA+lUqtk2TQ75+yDDUMw1UcX5RyCgqYwvuw38+Xy9PxKJhni8VkNHrkdARDpEaphKbTamkpUe1mE08MQeWL30qYPTJorekL4FQhQgYI4N0NAjRRr1f58AnVfb9KtNtsxjY3MI2ibZpCACoveK3VLv65Vrsfz17GfYefD0e/4C8FNwEGAIXxbCAjm60LAAAAAElFTkSuQmCC" rel="icon" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/wp-content/themes/somerandomdude/images/apple-touch-icon.png"/>
	
	<title>
		<?php bloginfo('name'); ?> &mdash; <?php is_home() ? bloginfo('description') : wp_title(''); ?>
	</title>
	
	<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed/" />
	<link rel="pingback" href="/xmlrpc.php" />
	
	<?php wp_head(); ?>

	<!--[if lte IE 8]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js" type="text/javascript"></script>
	<![endif]-->
	
	<!--[if lt IE 7]>
	<script src="http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE7.js"></script>
	<![endif]-->
</head>
<body id="page" <?php body_class(); ?>>
<div class='container'>
	<header id="page-header" class="row">
		<h1 id="site-title" class='three columns'><a href="/">Some Random Dude</a></h1>
		<nav id="site-nav" class='nine columns'>
			<ul id="menu-primary" class="menu"><li><a href="/work/">Work</a></li>
			<li class="last"><a href="/hello/" rel="author">Hello</a></li>
			<li class="rss"><a href="/feed/">RSS</a></li>
			<li class="twitter"><a href="http://twitter.com/somerandomdude" target="_blank">Twitter</a></li>
			</ul>
		</nav>
	</header>