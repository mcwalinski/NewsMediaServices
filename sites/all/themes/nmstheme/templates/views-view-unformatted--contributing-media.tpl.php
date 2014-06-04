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
	<?php if ($c == 0): // this and the if statement below it insert two divs around every four items in this view so that they display 4 to a row?>
		<div class="row-fluid">
			<div class="span12">
	<?php endif; ?>

	<div class="span3">
		<?php print $row; ?>
	</div>
	<?php $c++; ?>
	
	<?php if ($c == 4): ?>
		<?php $c = 0; ?>
			</div>
		</div>
	<?php endif; ?>

	
<?php endforeach; ?>
<?php if ($c != 0): //If the number of items is not divisible by four then the logic above will leave two open divs. This closes them.?>
			</div>
		</div>
<?php endif; ?>

