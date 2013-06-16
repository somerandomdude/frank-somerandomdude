<?php
/*
Template Name: Franklin Street Comment Section

http://codex.wordpress.org/Function_Reference/wp_insert_post
http://codex.wordpress.org/Function_Reference/update_post_meta
http://codex.wordpress.org/Function_Reference/post_meta_Function_Examples
http://hungred.com/how-to/wordpress-templatepage-meta-key-updatepostmeta/
http://www.emanueleferonato.com/2010/04/01/loading-wordpress-posts-with-ajax-and-jquery/

*/
?>

<?php
	//$post = $_POST['id'];
	$post = get_post($_POST['id']);
?>

<?php if ($post) : ?>
	<?php setup_postdata($post); ?>
<?php comments_template(); ?>
<?php endif; ?>



<?php if ( 'open' == $post->comment_status ) : ?>

		<?php if ( get_option( 'comment_registration' ) && ! $user_ID ) : ?>
		<p>You must be <a href="<?php echo get_option( 'siteurl' ); ?>/wp-login.php?redirect_to=<?php echo urlencode( get_permalink() ); ?>">logged in</a> to post a comment.</p>

		<?php else : ?>
		<?php
		$req = get_option( 'require_name_email' );
		$aria_req = ( $req ? " aria-required='true'" : '' );

		$name_label    = __( 'Name (required)', 'frank_theme' );
		$email_label   = __( 'Email (required)', 'frank_theme' );
		$website_label = __( 'Website', 'frank_theme' );

		$fields = array(
			'author' => '<div id="comment-form-info">' .
									'<label for="author">' . __( 'Name', 'frank_theme' ) . '' . ( $req ? '<span class="required">*</span>' : '' ) . '</label> ' .
									'<input id="author" name="author" type="text" placeholder=\'' . $name_label . '\' value="' . esc_attr( $commenter['comment_author'] ) . '" size="30"' . $aria_req . ' />',
			'email'  => '<label for="email">' . __( 'Email', 'frank_theme' ) . '' . ( $req ? '<span class="required">*</span>' : '' ) . '</label> ' .
									'<input id="email" name="email" type="text" placeholder=\'' . $email_label . '\' value=""' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30"' . $aria_req . ' />',
			'url'    => '<label for="url">' . __( 'Website', 'frank_theme' ) . '</label>' .
									'<input id="url" name="url" type="text" placeholder=\'' . $website_label . '\' value=""' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" /></div>',
		);

		$comment_placeholder = __( 'Your Comment', 'frank_theme' );
		$comment_field = '<div id="comment-form-content"><label for="comment">' . _x( 'Comment', 'noun', 'frank_theme'  ) . '</label><textarea id="comment-form-textarea" placeholder="' . $comment_placeholder . '" name="comment" aria-required="true"></textarea></div>';

		$logged_in_string = __( 'Logged in as', 'frank_theme' );
		$log_out_string   = __( 'Log out?', 'frank_theme' );
		$log_out_hover    = __( 'Log out of this account', 'frank_theme' );
		$logged_in_as     = '<div id="comment-form-logged-in-as"><p>' . $logged_in_string . ' ' . sprintf( 
			'<a href="%1$s">%2$s</a>. <a href="%3$s" title="%4$s">%5$s</a>',
			admin_url( 'profile.php' ),
			$user_identity,
			wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ),
			$log_out_hover,
			$log_out_string
		) . '</p></div>';

		$html_explanation    = sprintf( __( 'You may use these %1$s tags and attributes:', 'frank_theme' ), '<abbr title="HyperText Markup Language">HTML</abbr>' );
		$comment_notes_after = '<div class="row"><div id="comment-form-allowed-tags"><p>' . $html_explanation . ' ' . '<code>' . allowed_tags() . '</code>' . '</p></div></div>';

		$reply_title = __( 'Join the Discussion', 'frank_theme' );

		comment_form(
			array(
				'id_form' => 'comment-form',
				'logged_in_as' => $logged_in_as,
				'comment_notes_before' => '',
				'comment_notes_after' => $comment_notes_after,
				'title_reply' => $reply_title,
				'fields' => $fields,
				'comment_field' => $comment_field,
			)
		);
		?>

	<?php
	endif;
endif;
?>