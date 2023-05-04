<?php

$fields = require __DIR__ . '/../fields/drawers.php';
$files = require __DIR__ . '/../files/drawers.php';

return [
	// page field drawers
	'page.fields' => [
		'pattern' => '(pages/.*?)/fields/(:any)/(:all?)',
		'load'    => $fields['model']['load'],
		'submit'  => $fields['model']['submit']
	],

	// page file
	'page.file' => [
		'pattern' => '(pages/.*?)/files/(:any)',
		'load'    => $files['file']['load'],
		'submit'  => $files['file']['submit'],
	],

	// page file field drawers
	'page.file.fields' => [
		'pattern' => '(pages/.*?)/files/(:any)/fields/(:any)/(:all?)',
		'load'    => $fields['file']['load'],
		'submit'  => $fields['file']['submit'],
	],

	// site field drawers
	'site.fields' => [
		'pattern' => '(site)/fields/(:any)/(:all?)',
		'load'    => $fields['model']['load'],
		'submit'  => $fields['model']['submit'],
	],

	// site file
	'site.file' => [
		'pattern' => '(site)/files/(:any)',
		'load'    => $files['file']['load'],
		'submit'  => $files['file']['submit'],
	],

	// site file field drawers
	'site.file.fields' => [
		'pattern' => '(site)/files/(:any)/fields/(:any)/(:all?)',
		'load'    => $fields['file']['load'],
		'submit'  => $fields['file']['submit'],
	],
];
