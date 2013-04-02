<?php
/**
 * @package Frank for Some Random Dude
 */
?>
<?php get_header(); ?>
<main id="content" class="fourohfour" role="main">
	<div class="row">
		<header>
			<h1>
			  <?php _e('Page Not Found', 'frank_theme'); ?>
			</h1>
		</header>
	</div>
	<div class="row">
		<div id="content-primary">
			<div class="six columns">
					<p class="large">
					<?php
					  $home_link = sprintf('<a href="%s" title="%s">%s</a>',
					                      home_url(),
					                      get_bloginfo('name'),
					                      _x('home', 'home_link_text', 'frank_theme'));
					  echo sprintf(__('Unfortunately, the page you are looking for no longer exists or never existed in the first place. If you reached this page in error, you can go %s and start over.', 'frank_theme'), $home_link);
					?>
					</p>
				</div>
				<div class="six columns search">
					<p class="large">
					<?php
					  _e('If you believe this page exists, please try searching for the page in the search input below.', 'frank_theme');
					?>
					</p>
					<?php get_search_form(); ?>
				</div>
				<section id="other_projects" class='row'>
				<h1>Projects of Interest</h1>
				<ul id='projects_list' class='row'>
				<li class='three columns design'><div><h3><a href='/work/cue' id="cue"><small>Cue</small></a></h3><p> Cue is a public domain gestural icon system which focuses on legibility and symbolic representation.</p></div></li>
				<li class='three columns design'><div><h3><a href="/work/iconic/" id="projects_iconic"><small>Iconic</small></a></h3><p>Iconic is a minimal set of icons consisting of 84 marks in raster and vector formats — free for public use.</p></div></li>
				<li class='three columns design_technology'><div><h3><a href="/work/off-franklin-tumblr-theme/" id="projects_offfranklin"><small>Off Franklin Tumblr theme</small></a></h3><p>The theme is intended for media, such as videos and images, yet still flexible to handle all other content.</p></div></li>
				<li class='three columns design'><div><h3><a href="/work/sanscons/" id="projects_sanscons"><small>Sanscons</small></a></h3><p>Sanscons is a CSS-friendly version of Bitcons — allowing you to set custom backgrounds on your icons.</p></div></li>
				</ul>
			</section>
		</div>
	</div>
</main>
<?php get_footer(); ?>