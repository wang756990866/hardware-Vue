import request from '@/utils/request'

export function getItems(items_branch,items_years) {
  let param = new URLSearchParams();
  param.append('items_branch', items_branch);
  param.append('items_years', items_years);
  return request({
    url: '/items/getItemsAll',
    method: 'post',
    data: param
  });
}

export function getHardwaresByItemsId(itemsID) {
  let param = new URLSearchParams();
  param.append('items_id', itemsID);
  return request({
    url: '/hardware/getHardwaresByItemsId',
    method: 'post',
    data: param
  });
}


export function getItemsByIdAndName(items_id,items_name,items_branch,items_years) {
  let param = new URLSearchParams();
  param.append('items_id', items_id);
  param.append('items_name', items_name);
  param.append('items_branch', items_branch);
  param.append('items_years', items_years);
  return request({
    url: '/items/getItemsByIdAndName',
    method: 'post',
    data: param
  });
}

export function setItems(data,items_branch,items_years) {
  let param = new URLSearchParams();
  param.append('data', data);
  param.append('items_branch', items_branch);
  param.append('items_years', items_years);
  return request({
    url: '/items/setItems',
    method: 'post',
    data: param
  });
}

export function itemsAttributeAdd02(data) {
  let param = new URLSearchParams();
  param.append('data', data);
  return request({
    url: '/items/itemsAttributeAdd',
    method: 'post',
    data: param
  });
}

export function getItemsAttribute(data) {
  return request({
    url: '/items/getItemsAttribute',
    method: 'get',
  });
}

export function itemAttributeDelete(attribute_id) {
  let param = new URLSearchParams();
  param.append('attribute_id', attribute_id);
  return request({
    url: '/items/itemAttributeDelete',
    method: 'post',
    data: param
  });
}


export function itemsDelete(itemsId) {
  let param = new URLSearchParams();
  param.append('items_id', itemsId);
  return request({
    url: '/items/itemsDelete',
    method: 'post',
    data: param
  });
}

export function itemAttributeUpdate01(data) {
  let param = new URLSearchParams();
  param.append('data', data);
  return request({
    url: '/items/itemAttributeUpdate',
    method: 'post',
    data: param
  });
}

export function itemsUpdate1(data,itemsId) {
  let param = new URLSearchParams();
  param.append('data', data);
  param.append('items_id', itemsId);
  return request({
    url: '/items/itemsUpdate',
    method: 'post',
    data: param
  });
}