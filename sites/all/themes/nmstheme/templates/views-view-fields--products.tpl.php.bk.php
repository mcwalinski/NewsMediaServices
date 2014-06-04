<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */
?>
<?php $c = 1; ?>

<?php foreach ($fields as $id => $field): ?>
    <?php 
	if ($c%3==0) {
		$node = $row->_field_data['nid']['entity'];
		//print_r($node->field_tagline);
		$url = url('node/'.$row->nid);
		$title = $row->node_title;
		//print_r($node->field_thumbnail);
		$uri = $node->field_thumbnail['und'][0]['uri'];
		$thumbnail = file_create_url($uri);
		//$thumbnail = "sites/default/files/".$node->field_thumbnail['und'][0]['filename'];
		$tagline = $node->field_tagline['und'][0]['value'];
		$html = <<<__HTML__
			<div class="span3">
				<a class="product-title" href="$url">$title</a>
					<div class="product-card">
						<div class="product-image"><a href="$url"><img class="lazy" src="sites/default/files/white.gif" data-original="$thumbnail" /></a></div>
						<div class="product-text"><p>$tagline<p></div>              
					</div>
				</a>
			</div>
__HTML__;
	}
	$c++;
	?>
    <?php print $html; ?>
<?php endforeach; ?>











