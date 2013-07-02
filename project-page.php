<?php
/**
 * @package Frank
 */
/*
Template Name: Project Page Template
*/
?>
<?php get_header(); ?>
<div class="content fullspread">
	<main class="content-primary" role="main">
		<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
		<article id="p<?php the_ID(); ?>" <?php post_class(); ?>>
			<header class="post-header row">
				<h1 class="post-title"><?php the_title(); ?></h1>
			</header>
			<div class="content-main row">
				<section class="post-content">
					<?php the_content(); ?>
				</section>
			</div>
		</article>
		<?php endwhile; endif; ?>
	</main>
</div>
<?php get_footer(); ?>