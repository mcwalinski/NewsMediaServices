<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php $c = 0; ?>
<?php foreach ($rows as $id => $row): ?>
	<?php if ($c == 0): ?>
		<ul class="thumbnails">
	<?php endif; ?>

    <?php print $row; //this is just a string?>
	
	<?php $c++; ?>
	
	<?php if ($c == 4): ?>
		<?php $c = 0; ?>
			</ul>
	<?php endif; ?>

	
<?php endforeach; ?>

<?php if ($c != 0): //If the number of items is not divisible by four then the logic above will leave two open divs. This closes them.?>
	</ul>
<?php endif; ?>