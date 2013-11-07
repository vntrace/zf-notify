<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	protected function _initDoctype()
    {
        $this->bootstrap('view');
        $view = $this->getResource('view');
        $view->doctype('XHTML1_STRICT');
    }

    protected function _initMongo()
    {
    	$connection = new Shanty_Mongo_Connection('mongodb://127.0.0.1:27017'); 
		Shanty_Mongo::addMaster($connection);
    }

    public function _initRedis()
    {
        $appconfig = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV);
        $redis_options = array(
                'addToManager' => true,
                'name'         => 'default',
                'namespace'    => '',
                'servers'      => $appconfig->resources->rediska->servers->toArray(),
                'serializerAdapter' => 'phpSerialize',
                'keyDistributor'    => 'consistentHashing',
                'redisVersion'      => '2.4.5',
                'profiler'          => false
        );
        Zend_Registry::set('redis_options', $redis_options);
    }
}