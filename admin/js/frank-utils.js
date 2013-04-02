
// LAST UPDATED AT 3AM ON SEPTEMBER 25TH, 2012

jQuery(document).ready(function(){

    // SELECT & DESELECT FUNCTIONALITY
    jQuery('.display-categories ul.frank-group li a').live('click',function() {

	    var frank_value;
	    
	    // SETUP A CONDITIONAL IN VARIABLE TO USE FOR CHECKBOXES
        if(jQuery(this).hasClass('frank-select')) { frank_value = true; } else { frank_value = false; }

        jQuery(this).parent().parent().parent().find('input').each(function(){

            jQuery(this).attr('checked', frank_value);

        });

        return false;

    });

    // APPEND NEW SECTION TO THE LIST
    jQuery('#frank-add-content-section a').click(function() {

        // WE'LL FIRST CLONE IT, THEN APPEND IT TO THE LIST
        var clonedItem = jQuery('.frank-content-sections:eq(0)').clone();
        
        // MAKE SURE NEW CONTENT SECTION LOADS BENEATH OTHERS & ABOVE THE "ADD NEW" BUTTON
        jQuery('.frank-content-sections:last').after(clonedItem);

        // NOW WE NEED TO CLEAR OUT ANY INPUT THAT CAME WITH THE CLONE
        jQuery('.frank-content-sections:last input[type=text]').val('');
        jQuery('.frank-content-sections:last textarea').val('');
        jQuery('.frank-content-sections:last input[type=checkbox]').attr('checked', false);

        // WE ALSO NEED TO MANAGE OUR INPUT ID'S TO PREVENT COLLISION
        var frankhash = new Date();
        	frankhash = frankhash.getTime();

        // DISPLAY TYPE TO USE
        jQuery('.frank-content-sections:last .display-types select')
        	.attr('name','frank-display-type-' + frankhash)
            .attr('id','frank-display-type-' + frankhash);

        // SECTION TITLE TO DISPLAY
        jQuery('.frank-content-sections:last .display-titles input')
	        .attr('name','frank-section-title-' + frankhash)
	        .attr('id','frank-section-title-' + frankhash);

        // SECTION CAPTION TO DISPLAY
        jQuery('.frank-content-sections:last .display-captions textarea')
		    .attr('name','frank-section-caption-' + frankhash)
		    .attr('id','frank-section-caption-' + frankhash);

        // NUMBER OF POSTS TO DISPLAY
        jQuery('.frank-content-sections:last .display-posts input')
	        .attr('name','frank-section-num-posts-' + frankhash)
	        .attr('id','frank-section-num-posts-' + frankhash);

        // CATEGORIES TO DISPLAY
        jQuery('.frank-content-sections:last .categorychecklist input').each(function() {

            var frankcat = jQuery(this);

            frankcat.attr('name', 'post_category-' + frankhash + '[]');
            frankcat.attr('id', frankcat.attr('id') + '-' + frankhash);

        });
        
        // MAKE SURE SORTABLE FUNCTIONALITY ACTIVATES IMMEDIATLY IF THERE ARE MORE THAN ONE CONTENT SECTIONS
        if(jQuery('.frank-content-sections').length > 1) {

            jQuery('.frank-handle').show();
            jQuery('.frank-handle:first').after('<p class="dragdrop">&larr; (Drag & Drop Content Sections to Re-Order)</p>');
            jQuery('#frank-content-sections').sortable('refresh');

        } else {

	        jQuery('.frank-handle').hide();

        }

        return false;

    });

    // DELETE SECTION BY CLICKING ON 'X' IN THE UPPER RIGHT HAND CORNER OF BLOCK
    jQuery('a.frank-content-section-delete').live('click',function(){
	    
	    // CONFIRMATION MESSAGE & FUNCTIONALITY TO DELETE CONTENT SECTIONS
        if(confirm('Are you sure you want to delete this Content Section?')) {

        	var frank_section;

            frank_section = jQuery(this).parent().parent();

            frank_section.slideUp(function() {

                frank_section.remove();

                if(jQuery('.frank-content-sections').length > 1){

                    jQuery('.frank-handle').show();
                    jQuery('.frank-handle:first').after('<p class="dragdrop">&larr; (Drag & Drop Content Sections to Re-Order)</p>');
                    jQuery('#frank-content-sections').sortable('refresh');

                } else {

                    jQuery('.frank-handle').hide();

                }

            });

        }

        return false;

    });

    // IF WE'RE LOADING SAVED SECTIONS, THE CATEGORY ID'S / NAMES AREN'T GOING TO WORK SOO...
    jQuery('.frank-content-sections').each(function(){

        if(jQuery(this).attr('id') != 'default' && !jQuery(this).hasClass('frank-content-section-default')) {

            frankhash = jQuery(this).attr('id').replace('frank-street-section-','');

            jQuery(this).find('.categorychecklist input').each(function(){

                frankcat = jQuery(this);
                frankcat.attr('name','post_category-' + frankhash + '[]');
                frankcat.attr('id',frankcat.attr('id') + '-' + frankhash);

            });

        }

    });

    // ACTIVATE HELPER TEXT & JQUERY SORTABLE IF THERE IS MORE THAN ONE CONTENT SECTION
    if(jQuery('.frank-content-sections').length > 1) {

    	jQuery('.frank-handle:first').after('<p class="dragdrop">&larr; (Drag & Drop Content Sections to Re-Order)</p>');

	    jQuery(function() {

		   jQuery('#settings-container').sortable({
	            axis: 'y',
	            containment: 'parent',
	            forceHelperSize: true,
	            helper: 'clone',
	            opacity: 0.6
	        });

	        jQuery('#settings-container').disableSelection();

	    });

    } else {

        jQuery('.frank-handle').hide();

    }

});