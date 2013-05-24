<?php
#add_action('wp_enqueue_scripts', 'frank_enqueue_scripts');
#add_action('wp_enqueue_scripts', 'frank_enqueue_scripts');

require_once('admin/srd-theme-options.php');
if (!is_admin()) {  
	add_action('init', 'frank_enqueue_scripts');
	add_action('init', 'frank_enqueue_styles');  
}

add_filter('content_save_pre', 'frank_add_unique_p_ids');

function frank_init() {
	wp_deregister_script( 'l10n' );
}

function frank_add_unique_p_ids($content){
	$content = apply_filters('the_content', $content);
	/*
	return preg_replace('/<p([^>]+)?>/', '<p$1 name="'.generateRandomString().'">', $content);
	*/
	//$content = preg_replace('<p(?:\s+(?!name=)\w+="[^"]*")*\s*/>', '<p $1 name="'.generateRandomString().'">', $content);

	do {
		/*
	    $content = preg_replace('/<p([^>]+)?>/', '<p$1 name="'.generateRandomString().'">', $content, 1, $count);
	    */
	    $content = preg_replace('@<p(?:(?!name=).)*?>@', '<p name="'.generateRandomString().'">', $content, 1, $count);
	    //http://stackoverflow.com/questions/13281443/regex-find-elements-with-name-attribute-but-not-id
	    //http://stackoverflow.com/questions/3472772/need-regex-for-all-html-input-tags-which-lack-a-specific-attribute
	} while ($count);

	return $content;
}

function generateRandomString($length = 5) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

function frank_theme_options() {
	frank_build_settings_page();
}

function frank_enqueue_scripts() {
	
	global $wp_scripts;
	
	wp_register_script('somerandomdude', (get_stylesheet_directory_uri().'/javascripts/somerandomdude.js'), false, '1.0', true);
	wp_enqueue_script('somerandomdude');
	
	$frank_general = get_option( '_frank_options' );
}

// Remove unneeded widgets that have undesirable query overhead

add_action( 'widgets_init', 'remove_unneeded_widgets' );
function remove_unneeded_widgets() {
    unregister_widget('WP_Widget_Pages');
    unregister_widget('WP_Widget_Calendar');
    unregister_widget('WP_Widget_Tag_Cloud');
    unregister_widget('WP_Nav_Menu_Widget');
}

function frank_enqueue_styles() {
	
	global $wp_styles;
	
	wp_register_style('frank_srd_stylesheet', get_stylesheet_directory_uri().'/style.css', null, '0.1', 'all' );
	
	wp_register_style('frank_srd_stylesheet_ie', get_stylesheet_directory_uri().'/ie.css', null, '0.1', 'all' );
	wp_register_style('frank_srd_stylesheet_ie7', get_stylesheet_directory_uri().'/ie7.css', null, '0.1', 'all' );
	
	$wp_styles->add_data('frank_srd_stylesheet_ie', 'conditional', 'IE');
	$wp_styles->add_data('frank_srd_stylesheet_ie7', 'conditional', 'IE 7');
	
	wp_enqueue_style('frank_srd_stylesheet');
	wp_enqueue_style('frank_srd_stylesheet_ie');
	wp_enqueue_style('frank_srd_stylesheet_ie7');
	
}

function frank_get_option($key) {
	$frank_options = get_option( '_frank_options' );

     /* Define the array of defaults */ 
    $defaults = array(
        'header'     									=> '',
        'footer'     									=> '',
        'devmode'											=> false,
        'inject_js'										=> false,
        'tweet_post_button'   				=> false,
        'tweet_post_attribution'     	=> '',
				'sections'      							=> array(
																					'display_type'      => 'default_loop',
																					'header'             => false,
																					'title'             => '',
																					'caption'           => '',
																					'num_posts'         => 10,
																					'categories'        => array(),
																					'default'           => true
																				)

    );

    $frank_options = wp_parse_args( $frank_options, $defaults );

    if( isset($frank_options[$key]) )
         return $frank_options[$key];

    return false;
}

?>