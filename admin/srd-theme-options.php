<?php

// LAST UPDATED AT 3AM ON SEPTEMBER 25TH, 2012

//add_action( 'admin_menu', 'frankSettingsPageInit' );

// REGISTER NEW SETTINGS PAGE WITH WORDPRESS
/*
function frankSettingsPageInit() {

	$frankSettings = add_menu_page( 'Theme Settings', 'Theme Settings', 'edit_theme_options', 'frank-settings', 'frank_build_settings_page' );

	add_action( "load-{$frankSettings}", 'frankLoadSettingsPage' );

}
*/

// CREATE THE SETTINGS TABS IN WP ADMIN
function frank_admin_tabs($current = 'general') {

	$tabs = array( 'general' => 'General Settings', 'home' => 'Home Page Settings');

	echo '<div id="icon-themes" class="icon32"><br></div>';
	echo '<h2 class="nav-tab-wrapper">';

	foreach($tabs as $tab => $name) {

		$class = ($tab == $current) ? ' nav-tab-active' : '';

        echo "<a class='nav-tab$class' href='?page=frank-settings&tab=$tab'>$name</a>";

    }

    echo '</h2>';

}

// BUILD THE CONTENT THAT DISPLAYS IN THEME SETTINGS
function frank_build_settings_page() {
	global $pagenow;

	// SET FILE DIRECTORY
	$file_dir = get_bloginfo('template_directory');
	
	// SETUP NEEDED STYLES & SCRIPTS FOR OPTIONS PAGE
	//wp_enqueue_script('jquery-ui-sortable' );
	//wp_enqueue_script('frank-admin', $file_dir . '/admin/js/frank-utils.js', 'jquery', NULL, TRUE);
	//wp_enqueue_style('frank-admin', $file_dir . '/admin/css/frank-options.css', NULL, NULL, NULL);

	// SET DEFAULT DATA FOR FIRST RUN
	$frank_defaults = array(
		'title'             => 'Section Title',
		'caption'           => 'Section Caption',
		'num_posts'         => 10
	);

	?>

	<div class="wrap">

		<h2>Frank Theme Settings</h2>

		<?php if (isset($_GET['tab'])) { frank_admin_tabs($_GET['tab']); } else { frank_admin_tabs('general'); } ?>

		<form method="post" action="">

			<div id="settings-container"> <?php
			wp_nonce_field( 'frank_update_general', 'frank_general_key' );
			
			if ($pagenow == 'themes.php' && $_GET['page'] == 'frank-settings') {

				if (isset($_GET['tab'])) { $tab = $_GET['tab']; } else { $tab = 'general'; }

				switch ($tab) {

					// SETUP OPTIONS FOR GENERAL TAB
					case 'general' : ?>

					<h3 class="type-title">General Settings</h3>

					<?php

					$frank_updated = false;

					// PULL EXISTING SECTIONS, IF PRESENT
					$frank_general = get_option('_frank_options');

					if (!empty($_POST) && wp_verify_nonce($_POST['frank_general_key'], 'frank_update_general')) {

						$frank_general['header']					= frank_post_value_or_default('frank-general-header', '');
						$frank_general['footer']					= frank_post_value_or_default('frank-general-footer', '');
						$frank_general['devmode']					= frank_post_value_or_default('frank-general-devmode', false);
						$frank_general['inject_js']					= frank_post_value_or_default('frank-general-inject-js', false);
						$frank_general['tweet_post_button']			= frank_post_value_or_default('frank-general-tweet-post-button', false);
						$frank_general['tweet_post_attribution']	= frank_post_value_or_default('frank-general-tweet-post-attribution', '');

						update_option( '_frank_options', $frank_general );

						$frank_updated = true;

					}

					// IF THERES NOTHING, SET DEFAULTS
					if(empty($frank_general)) {

						$frank_general[] = array(
							'header'      					=> '',
							'footer'            			=> '',
							'tweet_post_button' 			=> false,
							'tweet_post_attribution' 		=> '',
							'devmode'						=> '',
							'inject_js'						=> ''
						);

					} ?>

					<div class="button-container">

						<input type="submit" name="submit"  class="save-settings" value="<?php _e('Update Settings', 'frank'); ?>" />

						<?php

						if ($frank_updated) {

							echo '<h4 class="saved-success">';
							echo '<img src="/wp-content/themes/frank/admin/images/success.png" /> Franklin Street Theme Settings Have Been Updated.';
							echo '</h4>';

						} else {

							echo '<h4 class="info">';
							echo 'Make Changes And Use The Update Settings Button To Save! &rarr;';
							echo '</h4>';

						}

						?>

					</div><!-- // BUTTON CONTAINER -->

					<!-- CUSTOM HEADER CODE -->
					<div id="first-option" class="option-container">
						<h3 class="feature-title"><?php _e('Custom Header Code', 'frank'); ?></h3>
						<div class="feature">
							<textarea name="frank-general-header" class="textarea"><?php echo stripslashes($frank_general['header']); ?></textarea>
						</div>
						<div class="feature-desc">
							This features allows you to write or copy & paste your own code straight
							into the header. Many people use this feature to include their Google Analytics
							code, or other small bits of Javascript. Feel free to use this as you wish!
						</div>
						<div style="clear:both;"></div>
					</div>


					<!-- CUSTOM FOOTER CODE -->
					<div class="option-container">
						<h3 class="feature-title"><?php _e('Custom Footer Code', 'frank'); ?></h3>
						<div class="feature">
							<textarea name="frank-general-footer" class="textarea"><?php echo stripslashes($frank_general['footer']); ?></textarea>
						</div>
						<div class="feature-desc">
							This feature allows you to write or copy & paste your own code directly
							to the footer. A lot of people use this feature to include external & internal
							Javascript files, for plugins and things of the sort. Use it as you wish!
						</div>
						<div style="clear:both;"></div>
					</div>
					<!-- TWEET THIS OPTION -->
					<div class="option-container">
						<h3 class="feature-title"><?php _e('Tweet This', 'frank'); ?></h3>
						<div class="feature">
							<input type="checkbox"
								   name="frank-general-tweet-post-button"
								   class="checkbox"
								   value="tweet_post_button" 
									<?php checked( $frank_general['tweet_post_button'], "tweet_post_button" ); ?>
								/>

							<label for="frank-general-tweet-post-button">
								<?php _e('Add a "Tweet This Post" Button to Post Templates.', 'frank'); ?>
							</label>
						</div>
						<div class="feature-desc">
							This feature gives you the option to integrate a little bit of social
							networking directly into your posts. By turning this feature on, we'll automatically
							create a "Tweet" Button people can use to share your content!
						</div>
						<div style="clear:both;"></div>
					</div>
					<!-- TWEET THIS HANDLE -->
					<div class="option-container">
						<h3 class="feature-title"><?php _e('Twitter Handle', 'frank'); ?></h3>
						<div class="feature">
							<input type="text"
								   name="frank-general-tweet-post-attribution"
								   class="text"
								   value="<?php echo stripslashes($frank_general['tweet_post_attribution']); ?>" />
						</div>
						<div class="feature-desc">
							By entering your handle once right here, you can easily reference
							this setting throughout the theme and change it later with ease, if needed.
							Refrain from using the '@' sign. An example handle: 'somerandomdude'
						</div>
						<div style="clear:both;"></div>
					</div>

					<!-- INJECT JS -->
					<div id="inject-js" class="option-container">
						<h3 class="feature-title"><?php _e('Inject JS Into Footer', 'frank'); ?></h3>
						<div class="feature">
							<input type="checkbox"
								   name="frank-general-inject-js"
								   class="checkbox"
									value="inject-js"
									<?php checked( $frank_general['inject_js'], "inject-js" ); ?>
								/>
							<label for="frank-general-inject-js"><?php _e('Inject Javascript Into Footer', 'frank'); ?></label>
						</div>
						<div class="feature-desc">
							Adds your Javascript code directly into the HTML above the closing body tag. This will save you a file request and potentially lower page load times. <strong>This setting should only be activated if you have very few unique pages and/or your Javascript file is less than 15Kb in size.</strong>
						</div>
						<div style="clear:both;"></div>	
					</div>				

					<!-- DEVELOPER MODE -->
					<div id="devmode" class="option-container">
						<h3 class="feature-title"><?php _e('Developer Mode', 'frank'); ?></h3>
						<div class="feature">
							<input type="checkbox"
								   name="frank-general-devmode"
								   class="checkbox"
									value="devmode"
									<?php checked( $frank_general['devmode'], "devmode" ); ?>
								/>
							<label for="frank-general-devmode"><?php _e('Turn Developer Mode On', 'frank'); ?></label>
						</div>
						<div class="feature-desc">
							I'm not exactly sure what this feature does, but of course you can
							edit this feature description, as well as all the feature descriptions
							above ^.
						</div>
						<div style="clear:both;"></div>
					</div> <?php
						
					break;

					case 'home' : ?>

					<h3 class="type-title">Home Page Settings</h3> <?php

					wp_nonce_field('frank_update_home_sections', 'frank_key');

					// GET EXISTING SECTIONS, IF PRESENT
					$frank_sections = get_option('_frank_options');

					if (!empty($_POST) && wp_verify_nonce($_POST['frank_key'], 'frank_update_home_sections')) {

						$frank_updated 	= false;
						$sections 		= array();

						foreach($_POST as $key => $value) {

							$keyflag = 'frank-display-type-';

							if(substr($key, 0, strlen($keyflag)) == $keyflag) {

								// FIND ID FLAG
								$frank_section_flag = substr($key, strlen($keyflag), strlen($key));

								// SINCE WE'RE PIGGY-BACKING SOME WP CORE FUNCTIONALTITY, THE POST
								// CATEGORIES HAVE A SLIGHTLY DIFFERENT ID DEPENDING ON WHAT WAS FIRST

								if($frank_section_flag == 'default') {

									echo $frank_post_category_flag = '';

								} else {

									$frank_post_category_flag = '-' . $frank_section_flag;

								}

								// ADD OUR DATA
								$sections[] = array(
									'display_type'      => $_POST['frank-display-type-' . $frank_section_flag],
									'header'             => $_POST['frank-section-header-' . $frank_section_flag],
									'title'             => $_POST['frank-section-title-' . $frank_section_flag],
									'caption'           => $_POST['frank-section-caption-' . $frank_section_flag],
									'num_posts'         => intval( $_POST['frank-section-num-posts-' . $frank_section_flag]),
									'categories'        => $_POST['post_category' . $frank_post_category_flag]
								);

							}

						} // END FOREACH LOOP

						$frank_sections['sections'] = $sections;
						update_option('_frank_options', $frank_sections);
						$frank_updated = true;

					}

					$frank_sections = $frank_sections['sections'];

					// IF NOTHING'S SET, SET DEFAULTS
					if(empty($frank_sections)) {

						$frank_sections['sections'] = array(
							'display_type'      => 'default_loop',
							'header'             => false,
							'title'             => '',
							'caption'           => '',
							'num_posts'         => '',
							'categories'        => array(),
							'default'           => true
						);

					} ?>

					<div class="button-container">

						<input type="submit" name="submit"  class="save-settings" value="<?php _e('Update Settings', 'frank'); ?>" />

						<?php

						if ($frank_updated) {

							echo '<h4 class="saved-success">';
							echo '<img src="/wp-content/themes/frank/admin/images/success.png" /> Franklin Street Theme Settings Have Been Updated.';
							echo '</h4>';

						} else {

							echo '<h4 class="info">';
							echo 'Make Changes And Use The Update Settings Button To Save! &rarr;';
							echo '</h4>';

						}

						?>

					</div><!-- // BUTTON CONTAINER --> 
					
					<div class="helper-container">
						<p class="section-helper">
							Content Sections give you the opportunity to create a dynamic homepage 
							for you to keep your readers engaged. With a vast variety of different layouts,
							you have the choice to select a look that works best for you.
						</p>
					</div>

					<div style="clear:both;"></div>

											
					<?php

					foreach($frank_sections as $frank_section_id => $frank_section) : ?>

					<div class="frank-content-sections" id="frank-street-section-<?php echo $frank_section_id; ?>">

						<h3 class="content-titles">
							<?php _e('Content Section', 'frank'); ?>
							<span class="frank-handle"></span>
							<a class="frank-content-section-delete" href="#">X</a>
						</h3>

						<div class="content-group">

							<div class="top-options-container">
	
								<?php $the_type = $frank_section['display_type']; ?>
								

								<!-- // SECTION HEADER TOGGLE -->
								<div class="display-headers">
									<input type="checkbox"
								   name="frank-section-header-<?php echo (isset($frank_section['default']) ? 'default' : $frank_section_id); ?>"
									class="checkbox"
									value="section_header"
									<?php 
									$value = !isset($frank_section['default']) ? stripslashes($frank_section['header']) : $frank_defaults['header'];
									checked( $value, "section_header" ); 
									?>
									/>
									<label>Display section header</label>
								</div>

								<!-- // SECTION TITLE -->
								<div class="display-titles">
									<h3 class="section-title"><?php _e('Section Title:', 'frank'); ?></h3>
									<input type="text"
										   class="text text-title"
										   name="frank-section-title-<?php echo (isset($frank_section['default']) ? 'default' : $frank_section_id); ?>"
										   value="<?php echo !isset($frank_section['default']) ? stripslashes($frank_section['title']) : $frank_defaults['title']; ?>" />
								</div>
								
								<!-- // POSTS TO DISPLAY -->
								<div class="display-posts">
									<h3 class="section-title"><?php _e('Number of Posts:', 'frank'); ?></h3>
									<input type="text"
										   class="text"
										   name="frank-section-num-posts-<?php echo (isset($frank_section['default']) ? 'default' : $frank_section_id); ?>"
										   value="<?php echo !isset($frank_section['default']) ? stripslashes($frank_section['num_posts']) : $frank_defaults['num_posts']; ?>" />
								</div>
								
								<!-- // DISPLAY TYPES -->
								<div class="display-types">
									<h3 class="section-title"><?php _e('Display Type:', 'frank'); ?></h3>
									<select name="frank-display-type-<?php echo (isset($frank_section['default']) ? 'default' : $frank_section_id); ?>" class="dropmenu">
										<option<?php if($the_type == 'default_loop') { ?> selected="selected"<?php } ?> value="default_loop"><?php _e('Default Loop', 'frank'); ?></option>
										<option<?php if($the_type == 'one_up_reg' ) { ?> selected="selected"<?php } ?> value="one_up_reg"><?php _e('One Up (Regular)', 'frank'); ?></option>
										<option<?php if($the_type == 'one_up_lg' ) { ?> selected="selected"<?php } ?> value="one_up_lg"><?php _e('One Up (Large)', 'frank'); ?></option>
										<option<?php if($the_type == 'two_up' ) { ?> selected="selected"<?php } ?> value="two_up"><?php _e('Two Up', 'frank'); ?></option>
										<option<?php if($the_type == 'three_up' ) { ?> selected="selected"<?php } ?> value="three_up"><?php _e('Three Up', 'frank'); ?></option>
										<option<?php if($the_type == 'four_up' ) { ?> selected="selected"<?php } ?> value="four_up"><?php _e('Four Up', 'frank'); ?></option>
										<option<?php if($the_type == 'srd_loop' ) { ?> selected="selected"<?php } ?> value="srd_loop"><?php _e('Some Random Dude Loop', 'frank'); ?></option>
									</select>
								</div>

							</div><!-- // END TOP OPTIONS CONTAINER -->
	
							<div style="clear:both;"></div>
	
							<div class="bottom-options-container">
								
								<!-- // SECTION CAPTIONS -->
								<div class="display-captions">
									<h3 class="section-title"><?php _e('Section Caption:', 'frank'); ?></h3>
									<textarea name="frank-section-caption-<?php echo (isset($frank_section['default']) ? 'default' : $frank_section_id); ?>" class="textarea"><?php echo !isset($frank_section['default']) ? stripslashes($frank_section['caption']) : $frank_defaults['caption']; ?></textarea>
								</div>
								
								
								<!-- // CATEGORIES TO DISPLAY -->
								<div class="display-categories">
									<h3 class="section-title"><?php _e('Categories to Display', 'frank'); ?></h3>
									<div class="categories-container">
										<ul class="categorychecklist">
											<?php wp_terms_checklist(); ?>
										</ul>
										
										<div style="clear:both;"></div>
										
										<ul class="frank-group">
											<li><a class="select-button frank-select" href="#"><?php _e('Select All', 'frank'); ?></a></li>
											<li><a class="select-button frank-deselect" href="#"><?php _e('Deselect All', 'frank'); ?></a></li>
										</ul>
										<div style="clear:both;"></div>
									</div>
	
									<div style="clear:both;"></div>
	
									<?php $categories = $frank_section['categories']; ?>
									
									<script type="text/javascript">
									jQuery(document).ready(function() {
										<?php if (is_array($categories)) : ?>
										<?php foreach($categories as $category) : ?>

											jQuery('#frank-street-section-<?php echo $frank_section_id; ?> .categorychecklist input').each(function(){

												if(jQuery(this).val() == <?php echo $category; ?>) {

													jQuery(this).attr('checked', true);

												}

											});

										<?php endforeach; ?>
										<?php endif; ?>

									});
									</script>
	
								</div>
	
							</div><!-- //  END BOTTOM OPTIONS CONTAINER -->
	
							<div style="clear:both;"></div>
	
						</div>
	
						<div style="clear:both;"></div>
	
					</div><!-- // FRANK CONTENT SECTIONS --> <?php 
					
					endforeach; ?>

					<div id="frank-add-content-section">
						<a href="#"><?php _e('+ Add New Section +', 'frank'); ?></a>
					</div> <?php 
					
					break;

					} // END CASE "HOME"

				} /* END SWITCH STATEMENT */ ?>

				<div class="button-container bottom">

					<input type="submit" name="submit"  class="save-settings" value="<?php _e('Update Settings', 'frank'); ?>" />

					<?php

					if ($frank_updated) {

						echo '<h4 class="saved-success">';
						echo '<img src="/wp-content/themes/frank/admin/images/success.png" /> Franklin Street Theme Settings Have Been Updated.';
						echo '</h4>';

					} else {

						echo '<h4 class="info">';
						echo 'Make Changes And Use The Update Settings Button To Save! &rarr;';
						echo '</h4>';

					}

					?>

				</div><!-- // BUTTON CONTAINER -->

			</div><!-- // SETTINGS CONTAINER -->

		</form><!-- // END FORM -->

	</div><!-- // WRAP -->

<?php } ?>