<?php
class Application_Model_Notification extends Shanty_Mongo_Document 
{
	protected static $_db = 'gate';
	protected static $_collection = 'notifications';

	protected static $_requirements = array(
     	'object' => array('Document', 'Required'),
        'actor' => 'DocumentSet',
       	'lastActor' => 'DocumentSet',
       	'follower' => 'DocumentSet',
       	'readBy' => 'DocumentSet'
    );

    public static function getNotify($userId, $limit = 10)
    {
    	try {

    		// Try to reset notify list
    		$set = new Rediska_Key_Set('user_notify:' . $userId);
    		$set->remove();

    		$stats = new Rediska_Key_Hash($userId);
    		$stats->_n = 0;

    		return self::all(array(
    						'follower' => array(
    							'$in' => array($userId)
    						)
    					))->sort(array('updatedAt' => -1))->limit($limit)->export();
    	} catch (Exception $ex) {
			return array();    		
    	}
    }

	/**
	 * [sendNotify description]
	 * @param  [type] $objet   [description]
	 * @param  [type] $actor   [description]
	 * @param  [type] $isSelf [description]
	 * @return [type]          [description]
	 */
    public static function sendNotify($object, $actor, $action, $isSelf, $type = "notify")
    {
    	$docNotify = self::one(array(
			'object.id' => $object['id'],
			'object.ownerId' => $object['ownerId']
		));

		if($docNotify === null) {
			$doc = array(
				'object' => $object,
    			'actor' => array($actor['id']),
    			'lastActor' => array($actor),
    			'action' => $action,
    			'reporter' => array(),
    			'follower' => array($object['ownerId']),
    			'readBy' => array(),
    			'updatedAt' => time()
			);

			if(!$isSelf) {
				$doc['follower'][] = $actor['id'];
			}

			try {
				// Push new one to db
				Application_Model_Notification::insert($doc);
			} catch (Exception $ex) {
				var_dump('<pre>', $ex);
			}
		} else {

			$doc = $docNotify->export();

			if(!in_array($actor['id'], $doc['actor'])) {
				$docNotify->addOperation('$push', 'actor', $actor['id']);
			}

			if(!$isSelf && !in_array($actor['id'], $doc['follower'])) {
				$docNotify->addOperation('$push', 'follower', $actor['id']);
			}

			$docNotify->addOperation('$set', 'updatedAt', time());

			if(count($doc['lastActor']) >= 3) {
				array_shift($doc['lastActor']);
			}

			$doc['lastActor'][] = array(
				'id' => $actor['id'],
				'username' => $actor['username'],
				'avatar' => '',
				'content' => $actor['content']
			);

			$docNotify->addOperation('$set', 'lastActor', $doc['lastActor']);

			try {
				$docNotify->save();
			} catch (Exception $ex) {
				var_dump('<pre>', $ex);
			}
		}

		// Remove current actor in follower list
		unset($doc['follower'][$actor['id']]);
		$doc['follower'] = array_splice($doc['follower'], 0, 100);

		$arrUserIdTo = array();

		foreach($doc['follower'] as $userId) {
			try {
				$stats = new Rediska_Key_Hash($userId);
				$set = new Rediska_Key_Set('user_notify:' . $userId);

				if(!$set->exists($object['id'])) {
					$set[] = $object['id'];
					$stats->increment('_n', 1);
					$arrUserIdTo[] = $userId;
				}

				if(!isset($stats->_m)) {
					$stats->_m = 0;
				}

				if(!isset($stats->_r)) {
					$stats->_r = 0;
				}
			} catch (Exception $ex) {
				var_dump('<pre>', $ex);
			}
		}

		self::_sendNotify($arrUserIdTo);
    }

    private static function _sendNotify($userIds)
	{
		$browserAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.2) Gecko/20090729 Firefox/3.5.2";

		$options = array(
			'maxredirects' => 2,
			'adapter' => 'Zend_Http_Client_Adapter_Curl',
			'curloptions' => array(
				CURLOPT_HEADER => false,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_MAXREDIRS => 5,
				CURLOPT_USERAGENT => $browserAgent,
				CURLOPT_REFERER => "",
				CURLOPT_FOLLOWLOCATION => true
			)
		);

		$api = "http://localhost:5000/api/notify?" . http_build_query(array(
			'userIds' => implode(',', $userIds)
		));

		try {
			$httpClient = new Zend_Http_Client($api, $options);
			$response = $httpClient->request();
		} catch (Exception $ex) {

		}
	}
}