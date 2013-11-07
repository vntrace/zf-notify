<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        
    }

    public function testAction()
    {
    	try {
	        /* Initialize action controller here */
			$user = new Application_Model_Notification();
			$user->name = 'Bob';
			$user->save();

    	} catch (Exception $ex) {
    		var_dump($ex);die;
    	}
        // action body
        // 
        die('asdfasdf');
    }

    public function indexAction()
    {
        
    }
}

