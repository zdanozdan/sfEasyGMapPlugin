<?php

class sfValidatorGeocodedAddress extends sfValidatorBase
{
  protected function configure($options = array(), $messages = array())
  {
    $this->setMessage('invalid', 'Address "%address%" could not be geolocated with google maps');
  }

  /**
   * @see sfValidatorBase
   */
  protected function doClean($value)
  {
    $map = new GMap();
    $address = new GMapGeocodedAddress($value);
    if($address->geocode($map->getGMapClient()))
      {
	return $value;
      }

    throw new sfValidatorError($this, 'invalid',array('address'=>$value));
  }
}