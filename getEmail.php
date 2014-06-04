<?php

include 'includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

$nid = $_GET['nid'];

echo "nid = $nid<br />";

//$node = node_load($nid);
//print_r($node);
?>