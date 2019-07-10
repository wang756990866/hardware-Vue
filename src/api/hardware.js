import request from '@/utils/request'

export function getHardwaresByItemsId(itemsID) {
  let param = new URLSearchParams();
  param.append('items_id', itemsID);
  return request({
    url: '/hardware/getHardwaresByItemsId',
    method: 'post',
    data: param
  });
}

export function hardwareAdd(itemsId,data,classify_id) {
  let param = new URLSearchParams();
  param.append('items_id', itemsId);
  param.append('data', data);
  param.append('classify_id', classify_id);
  return request({
    url: '/hardware/hardwareAdd',
    method: 'post',
    data: param
  });
}

export function setCode(itemsId,codeNumber,codeType) {
  let param = new URLSearchParams();
  param.append('items_id', itemsId);
  param.append('code_number', codeNumber);
  param.append('code_type', codeType);
  return request({
    url: '/hardware/codeAdd',
    method: 'post',
    data: param
  });
}


export function getclassify(classify) {
  let param = new URLSearchParams();
  param.append('classify', classify);
  return request({
    url: '/hardware/getclassify',
    method: 'post',
    data: param
  });
}

export function getCode(itemsId,classify) {
  let param = new URLSearchParams();
  param.append('items_id', itemsId);
  param.append('classify', classify);
  return request({
    url: '/hardware/getCode',
    method: 'post',
    data: param
  });
}

export function getCodeByName(queryString,itemsId,classify) {
  let param = new URLSearchParams();
  param.append('queryString', queryString);
  param.append('items_id', itemsId);
  param.append('classify', classify);
  return request({
    url: '/hardware/getCodeByName',
    method: 'post',
    data: param
  });
}


export function hardwareUpdate(data,hardware_id,itemsId,classify_id) {
  let param = new URLSearchParams();
  param.append('data', data);
  param.append('items_id', itemsId);
  param.append('hardware_id', hardware_id);
  param.append('classify', classify_id);
  return request({
    url: '/hardware/hardwareUpdate',
    method: 'post',
    data: param
  });
}

export function getHardwaresByIdAndName1(hardwareClassify,hardwareCodeType,itemsId,hardware_id,hardwareName) {
  let param = new URLSearchParams();
  param.append('hardware_classify', hardwareClassify);
  param.append('hardware_codeType', hardwareCodeType);
  param.append('hardware_name', hardwareName);
  param.append('items_id', itemsId);
  param.append('hardware_id', hardware_id);
  return request({
    url: '/hardware/getHardwaresByIdAndName',
    method: 'post',
    data: param
  });
}

export function hardwareAttributeAdd02(data) {
  let param = new URLSearchParams();
  param.append('data', data);
  return request({
    url: '/hardware/hardwareAttributeAdd',
    method: 'post',
    data: param
  });
}

export function getHardwareAttribute(data) {
  
  return request({
    url: '/hardware/getHardwareAttribute',
    method: 'get',
  });
}


export function hardwareAttributeDelete(attribute_id) {
  let param = new URLSearchParams();
  param.append('attribute_id', attribute_id);
  return request({
    url: '/hardware/hardwareAttributeDelete',
    method: 'post',
    data: param
  });
}


export function hardwareDelete(hardware_id) {
  let param = new URLSearchParams();
  param.append('hardware_id', hardware_id);
  return request({
    url: '/hardware/hardwareDelete',
    method: 'post',
    data: param
  });
}

export function hardwareAttributeClassifyAdd(data) {
  let param = new URLSearchParams();
  param.append('data', data);
  return request({
    url: '/hardware/hardwareAttributeClassifyAdd',
    method: 'post',
    data: param
  });
}

export function hardwareAttributeClassifyDelete(classifyId) {
  let param = new URLSearchParams();
  param.append('classify_id', classifyId);
  return request({
    url: '/hardware/hardwareAttributeClassifyDelete',
    method: 'post',
    data: param
  });
}