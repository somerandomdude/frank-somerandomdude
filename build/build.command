cd `dirname $0`
juicer merge -i ../js/frank.slideshow.js ../js/simplebox.js ../js/main.js --force -o ../js/somerandomdude.js -c none -m closure_compiler
echo "/* 
Theme Name:     Frank for Some Random Dude
Theme URI:      http://somerandomdude.com/work/frank 
Description:    Child theme for the Frank theme  
Author:         P.J. Onori 
Author URI:     http://somerandomdude.com/hello/  
Template:       frank  
Version:        0.1.0 
License:		Creative Commons Share Alike 3.0
License URI:	http://creativecommons.org/licenses/by-sa/3.0/us/
Tags: brown, red, white, two-columns, fixed-width, sticky-post, custom-menu 
*/"|cat - ../style.css > /tmp/out && mv /tmp/out ../style.css