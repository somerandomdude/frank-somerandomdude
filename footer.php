<?php
/**
 * @package Frank for Some Random Dude
 */
?>
</div>
<div id="page-bottom" class="clearfix">
	<footer id='page-footer' class='container'>
		<div class="row">	
			<?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("Footer") ) : ?>
			<?php endif; ?>
			<?php if ( function_exists( 'twounter' ) ) : ?>
			<div id="twitter-follow" class='six columns'>
				<!--TODO: Pull Twitter username from options --> 
				<p><?php echo twounter('somerandomdude') ?> people follow me on Twitter. <a href="http://twitter.com/somerandomdude" class="button alt">You should too.</a></p>
				<small><span itemscope itemtype="http://data-vocabulary.org/Person"><span itemprop="name">P.J. Onori</span>, <a itemprop="url" href="http://somerandomdude.com/hello">somerandomdude.com</a></span> <em><a href='http://creativecommons.org/licenses/by-sa/3.0/'>Creative Commons Attribution-ShareAlike 3.0 Unported.</a></em></small>
			</div>
			<?php endif; ?>
		</div>
	</footer>
</div>
<?php wp_footer(); ?>
</body>
</html>