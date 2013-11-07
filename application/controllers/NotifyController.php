<?php

class NotifyController extends Zend_Controller_Action
{
	/**
	 * Public method get notify list
	 * @return [type] [description]
	 */
	public function indexAction()
	{
		$userId = $this->_getParam('userId', null);

		if(is_null($userId)){
			$this->_helper->json(array('status' => false));
		}

		$arrNotify = Application_Model_Notification::getNotify($userId);

		$this->_helper->json(array(
			'status' => true,
			'arrNotify' => $arrNotify
		));
	}
}