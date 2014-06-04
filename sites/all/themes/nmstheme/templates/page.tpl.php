<?php
/**
 * @file
 * Zen theme's implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $secondary_menu_heading: The title of the menu used by the secondary links.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['header']: Items for the header region.
 * - $page['navigation']: Items for the navigation region, below the main menu (if any).
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['footer']: Items for the footer region.
 * - $page['bottom']: Items to appear at the bottom of the page below the footer.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see zen_preprocess_page()
 * @see template_process()
 */
?>

    <!-- HEADER -->

    <header id="header" class="row-fluid">
        <div class="navbar container">
        <div class="navbar-inner">
            <div class="container">

            	<a id="logo" href="<?php print $base_path ?>">
                    <img  src="<?php print $logo ?>" />
                </a>
                
                <a href="<?php print $base_path ?>">
                 <span id="site-title"><?php print $site_name ?></span>
                </a>
                
				<?php print render($page['header']); ?>
            </div>
        </div>
        </div>
    </header>
    <!-- END HEADER -->
    

    <!-- HERO CONTAINER -->
	<?php print render($page['hero']); ?>
	
	
	
	<?php
	    // Render the sidebars to see if there's anything in them.
		$sidebar_left  = render($page['sidebar_left']);
		$content  = render($page['content']);
		$highlighted_left  = render($page['highlighted_left']);
		$subnav  = render($page['subnav']);
		$headline  = render($page['headline']);

	?>
	
	
	<div class="parallax">
			
			<?php if ($highlighted_left): ?>
            	<div class="row-fluid">
             	<?php print render($page['highlighted_left']); ?>
            	</div>
        	<?php endif; ?>


			<?php if ($subnav): ?>
              <?php print render($page['subnav']); ?>
        	<?php endif; ?>
    
			<section id="content" class="row-fluid">
				<div class="container">
					
                      
                    <?php if ($headline): ?>  
					<div class="span12 <?php print $content_offset; ?>">
						<?php print render($page['headline']); ?>
					</div>
					<?php endif; ?>
                    
                    <div class="row-fluid">
                    <div class="span12">
                    	
                        
                        
                        
                    	<?php $content_offset = ""; ?>
						<?php if ($sidebar_left): ?>
							<div class="span3">
							<?php print $sidebar_left; ?>
							</div>
							<?php $content_offset = "offset1"; ?>
						<?php endif; ?>
                    
						<?php print $messages; ?>
						<!-- <?php print render($tabs); ?> -->
						<?php if ($action_links): ?>
						<ul class="action-links"><?php print render($action_links); ?></ul>
						<?php endif; ?>
						<?php print render($page['content']); ?>
                        
                        <?php
					  	// Render the sidebars to see if there's anything in them.
					 	 $sidebar_right = render($page['sidebar_right']);
						?>
					
						<?php if ($sidebar_right): ?>
                            <div class="span4">
                            <?php print $sidebar_right; ?>
                            </div>
                        <?php endif; ?>
                        
					</div>
					</div>
			

				</div>
				<!--this and the /section below it might belong below nms_content-->
			</section>


		<?php print render($page['nms_content']); ?>
	  
	
		<?php print render($page['footer']); ?>
		
  
	</div>


<?php print render($page['bottom']); ?>
