<?php

class FeedController extends Zend_Controller_Action
{
	public function indexAction()
	{

	}

	public function setLikeAction()
	{
		ini_set('display_errors', 1);

		$ownerId = $this->_getParam('ownerId', null);
		$actorId = $this->_getParam('actorId', null);
		$objectId = $this->_getParam('objectId', null);
		$objectType = $this->_getParam('objectType', 'feed');
		$objectContent 	 = $this->_getParam('objectContent', null);

    	try {

    		$object = array(
    			'id' => $objectId,
    			'ownerId' => $ownerId,
    			'type' => $objectType,
    			'content' => $objectContent
    		);

    		$actor = array(
    			'id' => $actorId,
    			'username' => $actorId,
    			'avatar' => '',
    			'content' => ''
    		);

    		Application_Model_Notification::sendNotify($object, $actor, 'like', true);

    	} catch (Exception $ex) {
    		echo '<pre>';
    		print_r($ex);
    	}

		$this->_helper->json(array(
			'status' => true
		));
	}
}
