<?php

/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * A QUICK OVERVIEW OF DRUPAL THEMING
 *
 *   The default HTML for all of Drupal's markup is specified by its modules.
 *   For example, the comment.module provides the default HTML markup and CSS
 *   styling that is wrapped around each comment. Fortunately, each piece of
 *   markup can optionally be overridden by the theme.
 *
 *   Drupal deals with each chunk of content using a "theme hook". The raw
 *   content is placed in PHP variables and passed through the theme hook, which
 *   can either be a template file (which you should already be familiary with)
 *   or a theme function. For example, the "comment" theme hook is implemented
 *   with a comment.tpl.php template file, but the "breadcrumb" theme hooks is
 *   implemented with a theme_breadcrumb() theme function. Regardless if the
 *   theme hook uses a template file or theme function, the template or function
 *   does the same kind of work; it takes the PHP variables passed to it and
 *   wraps the raw content with the desired HTML markup.
 *
 *   Most theme hooks are implemented with template files. Theme hooks that use
 *   theme functions do so for performance reasons - theme_field() is faster
 *   than a field.tpl.php - or for legacy reasons - theme_breadcrumb() has "been
 *   that way forever."
 *
 *   The variables used by theme functions or template files come from a handful
 *   of sources:
 *   - the contents of other theme hooks that have already been rendered into
 *     HTML. For example, the HTML from theme_breadcrumb() is put into the
 *     $breadcrumb variable of the page.tpl.php template file.
 *   - raw data provided directly by a module (often pulled from a database)
 *   - a "render element" provided directly by a module. A render element is a
 *     nested PHP array which contains both content and meta data with hints on
 *     how the content should be rendered. If a variable in a template file is a
 *     render element, it needs to be rendered with the render() function and
 *     then printed using:
 *       <?php print render($variable); ?>
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. With this file you can do three things:
 *   - Modify any theme hooks variables or add your own variables, using
 *     preprocess or process functions.
 *   - Override any theme function. That is, replace a module's default theme
 *     function with one you write.
 *   - Call hook_*_alter() functions which allow you to alter various parts of
 *     Drupal's internals, including the render elements in forms. The most
 *     useful of which include hook_form_alter(), hook_form_FORM_ID_alter(),
 *     and hook_page_alter(). See api.drupal.org for more information about
 *     _alter functions.
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   If a theme hook uses a theme function, Drupal will use the default theme
 *   function unless your theme overrides it. To override a theme function, you
 *   have to first find the theme function that generates the output. (The
 *   api.drupal.org website is a good place to find which file contains which
 *   function.) Then you can copy the original function in its entirety and
 *   paste it in this template.php file, changing the prefix from theme_ to
 *   STARTERKIT_. For example:
 *
 *     original, found in modules/field/field.module: theme_field()
 *     theme override, found in template.php: STARTERKIT_field()
 *
 *   where STARTERKIT is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_field() function.
 *
 *   Note that base themes can also override theme functions. And those
 *   overrides will be used by sub-themes unless the sub-theme chooses to
 *   override again.
 *
 *   Zen core only overrides one theme function. If you wish to override it, you
 *   should first look at how Zen core implements this function:
 *     theme_breadcrumbs()      in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called theme hook suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node--forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and theme hook suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440 and http://drupal.org/node/1089656
 */
/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  STARTERKIT_preprocess_html($variables, $hook);
  STARTERKIT_preprocess_page($variables, $hook);
  }
  // */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
  }
  // */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
  }
  // */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // STARTERKIT_preprocess_node_page() or STARTERKIT_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
  $function($variables, $hook);
  }
  }
  // */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
  }
  // */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
  }
  // */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
  function STARTERKIT_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
  }
  // */

//drupal_add_js(drupal_get_path('theme', 'nmstheme') .'/js/jquery.min.js');
//drupal_add_js('//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js');
function nmstheme_js_alter(&$javascript) {
    // Swap out jQuery to use an updated version of the library. 
    $javascript['misc/jquery.js']['data'] = drupal_get_path('theme', 'nmstheme') . '/js/jquery-1.8.3.js';
}

drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/jquery.ui-1.9.2.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/modernizr.min.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-affix.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-alert.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-dropdown.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-tooltip.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-modal.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-transition.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-button.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-popover.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-typeahead.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-carousel.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-scrollspy.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-collapse.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/vendor/bootstrap/bootstrap-tab.js');

drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/main.js');
drupal_add_js(drupal_get_path('theme', 'nmstheme') . '/js/jquery.lazyload.min.js');

function nmstheme_preprocess_page(&$vars) {
drupal_set_title('Washington Post');
}

$apple_icon = array(
    '#tag' => 'link',
    '#attributes' => array(
        'href' => 'nms_apple_icon.png',
        'rel' => 'apple-touch-icon',
    ),
);

drupal_add_html_head($apple_icon, 'apple_touch_icon');

$google_analytics = array(
    '#tag' => 'meta',
    '#attributes' => array(
        'name' => 'google-site-verification',
        'content' => 'agOEKbW1JJlxxpU6kaZXDXwlIb7qhFKZjiGzAueyNH4',
    ),
);

drupal_add_html_head($google_analytics, 'google_analytics');

function nmstheme_menu_tree($variables) {
    return '<section class="row-fluid">
        <div class="container">
            <div class="span12">
              <ul>' . $variables['tree'] . '</ul>
            </div>
        </div>
    </section>';
}

function nmstheme_menu_link($variables) {
    $element = $variables['element'];
    $sub_menu = '';

    if ($element['#below']) {
        $sub_menu = drupal_render($element['#below']);
    }
    $output = l($element['#title'], $element['#href'], $element['#localized_options']);
    return '<li>' . $output . $sub_menu . "</li>\n";
}

function nmstheme_menu_tree__menu_writers_group_sub_nav($variables) {
    return '
    <section id="catalog-menu" class="row-fluid affix-top" data-spy="affix" data-offset-top="300">
        <div class="container">
            <div class="span12">
              <ul> <li><strong>Products:</strong></li>' . $variables['tree'] . '</ul>
            </div>
        </div>
    </section>';
}

function nmstheme_menu_link__menu_writers_group_sub_nav($variables) {
    $element = $variables['element'];
    $sub_menu = '';

    if ($element['#below']) {
        $sub_menu = drupal_render($element['#below']);
    }
    return "<li><a href='javascript:smoothScroll(" . $element['#localized_options']['fragment'] . ")' >" . $element['#title'] . "</a></li>\n";
    //return "<li><a href='#" . $element['#localized_options']['fragment'] . "' >" . $element['#title'] . "</a></li>\n";
}

function nmstheme_menu_tree__menu_news_service_sub_nav($variables) {
    return '
    <section id="catalog-menu" class="row-fluid affix-top" data-spy="affix" data-offset-top="300">
        <div class="container">
            <div class="span12">
              <ul> ' . $variables['tree'] . '</ul>
            </div>
        </div>
    </section>';
}

function nmstheme_menu_link__menu_news_service_sub_nav($variables) {
    $element = $variables['element'];
    $sub_menu = '';

    if ($element['#below']) {
        $sub_menu = drupal_render($element['#below']);
    }
    $output = l($element['#title'], $element['#href'], $element['#localized_options']);

    if (strpos($element['#href'], 'http://') !== false || strpos($element['#href'], 'https://') !== false) {
        $output = str_replace('">', '" target="_blank">', $output);
    }

    return '<li>' . $output . $sub_menu . "</li>\n";
}

function nmstheme_menu_tree__main_menu($variables) {
    return '<a class="btn btn-navbar custom" data-toggle="collapse" data-target=".nav-collapse">
			Menu
		</a>               

		<!--<a id="logo" href="' . url() . '">
			<img src="' . theme_get_setting('logo') . '" />
		</a>-->
		
		<div class="nav-collapse collapse">
			<nav id="main-nav" class="nav pull-right">'
            . $variables['tree'] .
            '</nav>
		</div>';
}

